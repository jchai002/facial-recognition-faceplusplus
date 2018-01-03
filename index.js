var fs = require("fs");
const fetch = require("node-fetch");
const FormData = require("form-data");
const csvWriter = require("csv-write-stream");
const writer = csvWriter({ headers: ["name", "fwhr", "smile", "blur"] });
// function to encode file data to base64 encoded string
function base64_encode(file) {
  // read binary data
  var bitmap = fs.readFileSync("./images/" + file);
  // convert binary data to base64 encoded string
  return new Buffer(bitmap).toString("base64");
}

function calculateFwhr1(landmark) {
  var {
    contour_left1,
    contour_right1,
    left_eyebrow_right_corner,
    right_eyebrow_right_corner,
    mouth_upper_lip_top
  } = landmark;
  var fwhr1 =
    Math.sqrt(
      (contour_left1.y - contour_right1.y) ** 2 +
        (contour_left1.x - contour_right1.x) ** 2
    ) /
    Math.sqrt(
      ((left_eyebrow_right_corner.y + right_eyebrow_right_corner.y) / 2 -
        mouth_upper_lip_top.y) **
        2 +
        ((left_eyebrow_right_corner.x + right_eyebrow_right_corner.x) / 2 -
          mouth_upper_lip_top.x) **
          2
    );

  return fwhr1;
}
function callApi() {
  // make file
  writer.pipe(fs.createWriteStream("out.csv"));
  var processed = 0;
  const proc = new Promise(() => {
    fs.readdir("./images", function(err, files) {
      files.forEach(async function(file) {
        var base64Str = base64_encode(file);
        var form = new FormData();
        form.append("image_base64", base64Str);
        form.append("return_landmark", 1);
        form.append("return_attributes", "smiling,blur");

        var res = await fetch(
          "https://api-us.faceplusplus.com/facepp/v3/detect?api_key=cjf6uSKR0oJAs6Gcwrh8PPSFzEATZjOa&api_secret=REithMdH9Bfbxy4oGTGK7flkD5AKekT-",
          {
            method: "POST",
            body: form
          }
        );
        var json = await res.json();
        var { landmark, attributes } = json.faces[0];
        var { smile, blur } = attributes;
        var csvRow = [];

        // record name
        csvRow.push(file.replace(/[^a-zA-Z ]/g, " ").replace("png", ""));

        // record fwhr
        csvRow.push(calculateFwhr1(landmark));

        // record smile
        csvRow.push(smile.value);

        // record blur
        csvRow.push(blur.blurness.value);
        writer.write(csvRow);
        processed++;
        console.log(processed);
      });
    });
  });
  // end stream
  proc.then(() => {
    writer.end();
  });
}

callApi();
