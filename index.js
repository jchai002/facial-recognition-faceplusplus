var fs = require("fs");
const fetch = require("node-fetch");
const FormData = require("form-data");

// function to encode file data to base64 encoded string
function base64_encode(file) {
  // read binary data
  var bitmap = fs.readFileSync("./images/" + file);
  // convert binary data to base64 encoded string
  return new Buffer(bitmap).toString("base64");
}
/**
 * writeTextFile write data to file on hard drive
 * @param  string  filepath   Path to file on hard drive
 * @param  sring   output     Data to be written
 */
function writeTextFile(filepath, output) {
  var txtFile = new File(filepath);
  txtFile.open("w"); //
  txtFile.writeln(output);
  txtFile.close();
}

function callApi() {
  fs.readdir("./images", function(err, files) {
    files.forEach(async function(file) {
      var base64Str = base64_encode(file);
      var csvHeaders = "name,fwhr,smile,blur";
      var csvArray = [];
      var csvRow = "";
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
      console.log(landmark);
      console.log(attributes);
      var { smile, blur } = attributes;

      if (smile.value > smile.threshold) {
        csvArray.push(1);
      } else {
        csvArray.push(0);
      }
      if (blur.blurness.value > blur.blurness.threshold) {
        csvArray.push(1);
      } else {
        csvArray.push(0);
      }
      csvString = csvArray.join(",");
      console.log(csvHeaders, csvString);
    });
  });
}

callApi();
