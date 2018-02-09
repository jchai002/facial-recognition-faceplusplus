const fs = require("fs");
const Timeout = require("await-timeout");
const fetch = require("node-fetch");
const FormData = require("form-data");
const csvWriter = require("csv-write-stream");

var attrs =
  "faces.landmark.mouth_upper_lip_left_contour2.y, faces.landmark.mouth_upper_lip_left_contour2.x, faces.landmark.mouth_upper_lip_left_contour3.y, faces.landmark.mouth_upper_lip_left_contour3.x, faces.landmark.mouth_lower_lip_right_contour3.y, faces.landmark.mouth_lower_lip_right_contour3.x, faces.landmark.mouth_upper_lip_left_contour1.y, faces.landmark.mouth_upper_lip_left_contour1.x, faces.landmark.left_eye_upper_left_quarter.y, faces.landmark.left_eye_upper_left_quarter.x, faces.landmark.left_eyebrow_lower_middle.y, faces.landmark.left_eyebrow_lower_middle.x, faces.landmark.contour_chin.y, faces.landmark.contour_chin.x, faces.landmark.left_eyebrow_lower_left_quarter.y, faces.landmark.left_eyebrow_lower_left_quarter.x, faces.landmark.right_eyebrow_lower_left_quarter.y, faces.landmark.right_eyebrow_lower_left_quarter.x, faces.landmark.mouth_lower_lip_right_contour1.y, faces.landmark.mouth_lower_lip_right_contour1.x, faces.landmark.mouth_lower_lip_left_contour2.y, faces.landmark.mouth_lower_lip_left_contour2.x, faces.landmark.left_eye_bottom.y, faces.landmark.left_eye_bottom.x, faces.landmark.mouth_lower_lip_bottom.y, faces.landmark.mouth_lower_lip_bottom.x, faces.landmark.contour_left9.y, faces.landmark.contour_left9.x, faces.landmark.mouth_lower_lip_top.y, faces.landmark.mouth_lower_lip_top.x, faces.landmark.right_eyebrow_upper_middle.y, faces.landmark.right_eyebrow_upper_middle.x, faces.landmark.right_eyebrow_left_corner.y, faces.landmark.right_eyebrow_left_corner.x, faces.landmark.right_eye_bottom.y, faces.landmark.right_eye_bottom.x, faces.landmark.contour_left7.y, faces.landmark.contour_left7.x, faces.landmark.contour_left6.y, faces.landmark.contour_left6.x, faces.landmark.contour_left5.y, faces.landmark.contour_left5.x, faces.landmark.contour_left4.y, faces.landmark.contour_left4.x, faces.landmark.contour_left3.y, faces.landmark.contour_left3.x, faces.landmark.contour_left2.y, faces.landmark.contour_left2.x, faces.landmark.contour_left1.y, faces.landmark.contour_left1.x, faces.landmark.left_eye_lower_left_quarter.y, faces.landmark.left_eye_lower_left_quarter.x, faces.landmark.mouth_upper_lip_top.y, faces.landmark.mouth_upper_lip_top.x, faces.landmark.contour_right3.y, faces.landmark.contour_right3.x, faces.landmark.contour_right2.y, faces.landmark.contour_right2.x, faces.landmark.mouth_left_corner.y, faces.landmark.mouth_left_corner.x, faces.landmark.contour_right4.y, faces.landmark.contour_right4.x, faces.landmark.contour_right7.y, faces.landmark.contour_right7.x, faces.landmark.left_eyebrow_left_corner.y, faces.landmark.left_eyebrow_left_corner.x, faces.landmark.nose_right.y, faces.landmark.nose_right.x, faces.landmark.right_eye_upper_right_quarter.y, faces.landmark.right_eye_upper_right_quarter.x, faces.landmark.nose_tip.y, faces.landmark.nose_tip.x, faces.landmark.contour_right5.y, faces.landmark.contour_right5.x, faces.landmark.nose_contour_lower_middle.y, faces.landmark.nose_contour_lower_middle.x, faces.landmark.right_eye_top.y, faces.landmark.right_eye_top.x, faces.landmark.mouth_lower_lip_left_contour3.y, faces.landmark.mouth_lower_lip_left_contour3.x, faces.landmark.right_eye_right_corner.y, faces.landmark.right_eye_right_corner.x, faces.landmark.right_eye_lower_right_quarter.y, faces.landmark.right_eye_lower_right_quarter.x, faces.landmark.mouth_upper_lip_right_contour2.y, faces.landmark.mouth_upper_lip_right_contour2.x, faces.landmark.right_eyebrow_lower_right_quarter.y, faces.landmark.right_eyebrow_lower_right_quarter.x, faces.landmark.left_eye_left_corner.y, faces.landmark.left_eye_left_corner.x, faces.landmark.mouth_right_corner.y, faces.landmark.mouth_right_corner.x, faces.landmark.mouth_upper_lip_right_contour3.y, faces.landmark.mouth_upper_lip_right_contour3.x, faces.landmark.right_eye_lower_left_quarter.y, faces.landmark.right_eye_lower_left_quarter.x, faces.landmark.left_eyebrow_right_corner.y, faces.landmark.left_eyebrow_right_corner.x, faces.landmark.left_eyebrow_lower_right_quarter.y, faces.landmark.left_eyebrow_lower_right_quarter.x, faces.landmark.right_eye_center.y, faces.landmark.right_eye_center.x, faces.landmark.left_eye_upper_right_quarter.y, faces.landmark.left_eye_upper_right_quarter.x, faces.landmark.mouth_lower_lip_left_contour1.y, faces.landmark.mouth_lower_lip_left_contour1.x, faces.landmark.contour_left8.y, faces.landmark.contour_left8.x, faces.landmark.nose_left.y, faces.landmark.nose_left.x, faces.landmark.right_eyebrow_lower_middle.y, faces.landmark.right_eyebrow_lower_middle.x, faces.landmark.left_eye_top.y, faces.landmark.left_eye_top.x, faces.landmark.left_eye_center.y, faces.landmark.left_eye_center.x, faces.landmark.left_eye_lower_right_quarter.y, faces.landmark.left_eye_lower_right_quarter.x, faces.landmark.nose_contour_right1.y, faces.landmark.nose_contour_right1.x, faces.landmark.contour_right9.y, faces.landmark.contour_right9.x, faces.landmark.right_eye_left_corner.y, faces.landmark.right_eye_left_corner.x, faces.landmark.left_eyebrow_upper_left_quarter.y, faces.landmark.left_eyebrow_upper_left_quarter.x, faces.landmark.left_eye_pupil.y, faces.landmark.left_eye_pupil.x, faces.landmark.right_eyebrow_upper_left_quarter.y, faces.landmark.right_eyebrow_upper_left_quarter.x, faces.landmark.contour_right8.y, faces.landmark.contour_right8.x, faces.landmark.right_eyebrow_right_corner.y, faces.landmark.right_eyebrow_right_corner.x, faces.landmark.right_eye_upper_left_quarter.y, faces.landmark.right_eye_upper_left_quarter.x, faces.landmark.left_eyebrow_upper_middle.y, faces.landmark.left_eyebrow_upper_middle.x, faces.landmark.right_eyebrow_upper_right_quarter.y, faces.landmark.right_eyebrow_upper_right_quarter.x, faces.landmark.nose_contour_left1.y, faces.landmark.nose_contour_left1.x, faces.landmark.nose_contour_left2.y, faces.landmark.nose_contour_left2.x, faces.landmark.mouth_upper_lip_right_contour1.y, faces.landmark.mouth_upper_lip_right_contour1.x, faces.landmark.contour_right1.y, faces.landmark.contour_right1.x, faces.landmark.nose_contour_right2.y, faces.landmark.nose_contour_right2.x, faces.landmark.mouth_lower_lip_right_contour2.y, faces.landmark.mouth_lower_lip_right_contour2.x, faces.landmark.contour_right6.y, faces.landmark.contour_right6.x, faces.landmark.nose_contour_right3.y, faces.landmark.nose_contour_right3.x, faces.landmark.nose_contour_left3.y, faces.landmark.nose_contour_left3.x, faces.landmark.left_eye_right_corner.y, faces.landmark.left_eye_right_corner.x, faces.landmark.left_eyebrow_upper_right_quarter.y, faces.landmark.left_eyebrow_upper_right_quarter.x, faces.landmark.right_eye_pupil.y, faces.landmark.right_eye_pupil.x, faces.landmark.mouth_upper_lip_bottom.y, faces.landmark.mouth_upper_lip_bottom.x, faces.attributes.emotion.sadness, faces.attributes.emotion.neutral, faces.attributes.emotion.disgust, faces.attributes.emotion.anger, faces.attributes.emotion.surprise, faces.attributes.emotion.fear, faces.attributes.emotion.happiness, faces.attributes.gender.value, faces.attributes.age.value, faces.attributes.eyestatus.left_eye_status, faces.attributes.eyestatus.right_eye_status, faces.attributes.glass.value, faces.attributes.headpose.yaw_angle, faces.attributes.headpose.pitch_angle, faces.attributes.headpose.roll_angle, faces.attributes.blur.blurness, faces.attributes.blur.motionblur, faces.attributes.blur.gaussianblur, faces.attributes.smile.threshold, faces.attributes.smile.value, faces.attributes.facequality.threshold, faces.attributes.facequality.value, faces.attributes.ethnicity.value";

const headerArray = attrs.split(",");
const writer = csvWriter({ headers: ["test1", "test2"] });
// function to encode file data to base64 encoded string
function base64_encode(file) {
  // read binary data
  var bitmap = fs.readFileSync("./images/" + file);
  // convert binary data to base64 encoded string
  return new Buffer(bitmap).toString("base64");
}

async function makeOneCall() {
  console.log("calling api");
  const timeout = new Timeout();
  try {
  } catch (e) {
    console.error(e);
  } finally {
    timeout.clear();
  }
}

function callApi() {
  const proc = new Promise(() => {
    var offset = 0;
    writer.pipe(fs.createWriteStream("out.csv"));
    fs.readdir("./images", function(err, files) {
      files.map(function(file) {
        setTimeout(async function() {
          var base64Str = base64_encode(file);
          var form = new FormData();
          form.append("image_base64", base64Str);
          form.append("return_landmark", 1);
          form.append(
            "return_attributes",
            "gender,age,smiling,headpose,facequality,blur,eyestatus,emotion,ethnicity,beauty,mouthstatus,eyegaze,skinstatus"
          );
          var res = await fetch(
            "https://api-us.faceplusplus.com/facepp/v3/detect?api_key=cjf6uSKR0oJAs6Gcwrh8PPSFzEATZjOa&api_secret=REithMdH9Bfbxy4oGTGK7flkD5AKekT-",
            {
              method: "POST",
              body: form
            }
          );
          if (res) {
            var csvRow = [];
            var json = await res.json();
            if (json && json.faces) {
              var { landmark, attributes } = json.faces[0];
              // record name
              csvRow.push(file.replace(/[^a-zA-Z ]/g, " ").replace("png", ""));

              // record attrs
              // csvRow.push(landmark.mouth_upper_lip_left_contour2.y);
              // csvRow.push(landmark.mouth_upper_lip_left_contour2.x);
              // csvRow.push(landmark.mouth_upper_lip_left_contour3.y);
              // csvRow.push(landmark.mouth_upper_lip_left_contour3.x);
              // csvRow.push(landmark.mouth_lower_lip_right_contour3.y);
              // csvRow.push(landmark.mouth_lower_lip_right_contour3.x);
              // csvRow.push(landmark.mouth_upper_lip_left_contour1.y);
              // csvRow.push(landmark.mouth_upper_lip_left_contour1.x);
              // csvRow.push(landmark.left_eye_upper_left_quarter.y);
              // csvRow.push(landmark.left_eye_upper_left_quarter.x);
              // csvRow.push(landmark.left_eyebrow_lower_middle.y);
              // csvRow.push(landmark.left_eyebrow_lower_middle.x);
              // csvRow.push(landmark.contour_chin.y);
              // csvRow.push(landmark.contour_chin.x);
              // csvRow.push(landmark.left_eyebrow_lower_left_quarter.y);
              // csvRow.push(landmark.left_eyebrow_lower_left_quarter.x);
              // csvRow.push(landmark.right_eyebrow_lower_left_quarter.y);
              // csvRow.push(landmark.right_eyebrow_lower_left_quarter.x);
              // csvRow.push(landmark.mouth_lower_lip_right_contour1.y);
              // csvRow.push(landmark.mouth_lower_lip_right_contour1.x);
              // csvRow.push(landmark.mouth_lower_lip_left_contour2.y);
              // csvRow.push(landmark.mouth_lower_lip_left_contour2.x);
              // csvRow.push(landmark.left_eye_bottom.y);
              // csvRow.push(landmark.left_eye_bottom.x);
              // csvRow.push(landmark.mouth_lower_lip_bottom.y);
              // csvRow.push(landmark.mouth_lower_lip_bottom.x);
              // csvRow.push(landmark.contour_left9.y);
              // csvRow.push(landmark.contour_left9.x);
              // csvRow.push(landmark.mouth_lower_lip_top.y);
              // csvRow.push(landmark.mouth_lower_lip_top.x);
              // csvRow.push(landmark.right_eyebrow_upper_middle.y);
              // csvRow.push(landmark.right_eyebrow_upper_middle.x);
              // csvRow.push(landmark.right_eyebrow_left_corner.y);
              // csvRow.push(landmark.right_eyebrow_left_corner.x);
              // csvRow.push(landmark.right_eye_bottom.y);
              // csvRow.push(landmark.right_eye_bottom.x);
              // csvRow.push(landmark.contour_left7.y);
              // csvRow.push(landmark.contour_left7.x);
              // csvRow.push(landmark.contour_left6.y);
              // csvRow.push(landmark.contour_left6.x);
              // csvRow.push(landmark.contour_left5.y);
              // csvRow.push(landmark.contour_left5.x);
              // csvRow.push(landmark.contour_left4.y);
              // csvRow.push(landmark.contour_left4.x);
              // csvRow.push(landmark.contour_left3.y);
              // csvRow.push(landmark.contour_left3.x);
              // csvRow.push(landmark.contour_left2.y);
              // csvRow.push(landmark.contour_left2.x);
              // csvRow.push(landmark.contour_left1.y);
              // csvRow.push(landmark.contour_left1.x);
              // csvRow.push(landmark.left_eye_lower_left_quarter.y);
              // csvRow.push(landmark.left_eye_lower_left_quarter.x);
              // csvRow.push(landmark.mouth_upper_lip_top.y);
              // csvRow.push(landmark.mouth_upper_lip_top.x);
              // csvRow.push(landmark.contour_right3.y);
              // csvRow.push(landmark.contour_right3.x);
              // csvRow.push(landmark.contour_right2.y);
              // csvRow.push(landmark.contour_right2.x);
              // csvRow.push(landmark.mouth_left_corner.y);
              // csvRow.push(landmark.mouth_left_corner.x);
              // csvRow.push(landmark.contour_right4.y);
              // csvRow.push(landmark.contour_right4.x);
              // csvRow.push(landmark.contour_right7.y);
              // csvRow.push(landmark.contour_right7.x);
              // csvRow.push(landmark.left_eyebrow_left_corner.y);
              // csvRow.push(landmark.left_eyebrow_left_corner.x);
              // csvRow.push(landmark.nose_right.y);
              // csvRow.push(landmark.nose_right.x);
              // csvRow.push(landmark.right_eye_upper_right_quarter.y);
              // csvRow.push(landmark.right_eye_upper_right_quarter.x);
              // csvRow.push(landmark.nose_tip.y);
              // csvRow.push(landmark.nose_tip.x);
              // csvRow.push(landmark.contour_right5.y);
              // csvRow.push(landmark.contour_right5.x);
              // csvRow.push(landmark.nose_contour_lower_middle.y);
              // csvRow.push(landmark.nose_contour_lower_middle.x);
              // csvRow.push(landmark.right_eye_top.y);
              // csvRow.push(landmark.right_eye_top.x);
              // csvRow.push(landmark.mouth_lower_lip_left_contour3.y);
              // csvRow.push(landmark.mouth_lower_lip_left_contour3.x);
              // csvRow.push(landmark.right_eye_right_corner.y);
              // csvRow.push(landmark.right_eye_right_corner.x);
              // csvRow.push(landmark.right_eye_lower_right_quarter.y);
              // csvRow.push(landmark.right_eye_lower_right_quarter.x);
              // csvRow.push(landmark.mouth_upper_lip_right_contour2.y);
              // csvRow.push(landmark.mouth_upper_lip_right_contour2.x);
              // csvRow.push(landmark.right_eyebrow_lower_right_quarter.y);
              // csvRow.push(landmark.right_eyebrow_lower_right_quarter.x);
              // csvRow.push(landmark.left_eye_left_corner.y);
              // csvRow.push(landmark.left_eye_left_corner.x);
              // csvRow.push(landmark.mouth_right_corner.y);
              // csvRow.push(landmark.mouth_right_corner.x);
              // csvRow.push(landmark.mouth_upper_lip_right_contour3.y);
              // csvRow.push(landmark.mouth_upper_lip_right_contour3.x);
              // csvRow.push(landmark.right_eye_lower_left_quarter.y);
              // csvRow.push(landmark.right_eye_lower_left_quarter.x);
              // csvRow.push(landmark.left_eyebrow_right_corner.y);
              // csvRow.push(landmark.left_eyebrow_right_corner.x);
              // csvRow.push(landmark.left_eyebrow_lower_right_quarter.y);
              // csvRow.push(landmark.left_eyebrow_lower_right_quarter.x);
              // csvRow.push(landmark.right_eye_center.y);
              // csvRow.push(landmark.right_eye_center.x);
              // csvRow.push(landmark.left_eye_upper_right_quarter.y);
              // csvRow.push(landmark.left_eye_upper_right_quarter.x);
              // csvRow.push(landmark.mouth_lower_lip_left_contour1.y);
              // csvRow.push(landmark.mouth_lower_lip_left_contour1.x);
              // csvRow.push(landmark.contour_left8.y);
              // csvRow.push(landmark.contour_left8.x);
              // csvRow.push(landmark.nose_left.y);
              // csvRow.push(landmark.nose_left.x);
              // csvRow.push(landmark.right_eyebrow_lower_middle.y);
              // csvRow.push(landmark.right_eyebrow_lower_middle.x);
              // csvRow.push(landmark.left_eye_top.y);
              // csvRow.push(landmark.left_eye_top.x);
              // csvRow.push(landmark.left_eye_center.y);
              // csvRow.push(landmark.left_eye_center.x);
              // csvRow.push(landmark.left_eye_lower_right_quarter.y);
              // csvRow.push(landmark.left_eye_lower_right_quarter.x);
              // csvRow.push(landmark.nose_contour_right1.y);
              // csvRow.push(landmark.nose_contour_right1.x);
              // csvRow.push(landmark.contour_right9.y);
              // csvRow.push(landmark.contour_right9.x);
              // csvRow.push(landmark.right_eye_left_corner.y);
              // csvRow.push(landmark.right_eye_left_corner.x);
              // csvRow.push(landmark.left_eyebrow_upper_left_quarter.y);
              // csvRow.push(landmark.left_eyebrow_upper_left_quarter.x);
              // csvRow.push(landmark.left_eye_pupil.y);
              // csvRow.push(landmark.left_eye_pupil.x);
              // csvRow.push(landmark.right_eyebrow_upper_left_quarter.y);
              // csvRow.push(landmark.right_eyebrow_upper_left_quarter.x);
              // csvRow.push(landmark.contour_right8.y);
              // csvRow.push(landmark.contour_right8.x);
              // csvRow.push(landmark.right_eyebrow_right_corner.y);
              // csvRow.push(landmark.right_eyebrow_right_corner.x);
              // csvRow.push(landmark.right_eye_upper_left_quarter.y);
              // csvRow.push(landmark.right_eye_upper_left_quarter.x);
              // csvRow.push(landmark.left_eyebrow_upper_middle.y);
              // csvRow.push(landmark.left_eyebrow_upper_middle.x);
              // csvRow.push(landmark.right_eyebrow_upper_right_quarter.y);
              // csvRow.push(landmark.right_eyebrow_upper_right_quarter.x);
              // csvRow.push(landmark.nose_contour_left1.y);
              // csvRow.push(landmark.nose_contour_left1.x);
              // csvRow.push(landmark.nose_contour_left2.y);
              // csvRow.push(landmark.nose_contour_left2.x);
              // csvRow.push(landmark.mouth_upper_lip_right_contour1.y);
              // csvRow.push(landmark.mouth_upper_lip_right_contour1.x);
              // csvRow.push(landmark.contour_right1.y);
              // csvRow.push(landmark.contour_right1.x);
              // csvRow.push(landmark.nose_contour_right2.y);
              // csvRow.push(landmark.nose_contour_right2.x);
              // csvRow.push(landmark.mouth_lower_lip_right_contour2.y);
              // csvRow.push(landmark.mouth_lower_lip_right_contour2.x);
              // csvRow.push(landmark.contour_right6.y);
              // csvRow.push(landmark.contour_right6.x);
              // csvRow.push(landmark.nose_contour_right3.y);
              // csvRow.push(landmark.nose_contour_right3.x);
              // csvRow.push(landmark.nose_contour_left3.y);
              // csvRow.push(landmark.nose_contour_left3.x);
              // csvRow.push(landmark.left_eye_right_corner.y);
              // csvRow.push(landmark.left_eye_right_corner.x);
              // csvRow.push(landmark.left_eyebrow_upper_right_quarter.y);
              // csvRow.push(landmark.left_eyebrow_upper_right_quarter.x);
              // csvRow.push(landmark.right_eye_pupil.y);
              // csvRow.push(landmark.right_eye_pupil.x);
              // csvRow.push(landmark.mouth_upper_lip_bottom.y);
              // csvRow.push(landmark.mouth_upper_lip_bottom.x);
              // csvRow.push(attributes.emotion.sadness);
              // csvRow.push(attributes.emotion.neutral);
              // csvRow.push(attributes.emotion.disgust);
              // csvRow.push(attributes.emotion.anger);
              // csvRow.push(attributes.emotion.surprise);
              // csvRow.push(attributes.emotion.fear);
              // csvRow.push(attributes.emotion.happiness);
              // csvRow.push(attributes.gender.value);
              // csvRow.push(attributes.age.value);
              // csvRow.push(attributes.eyestatus.left_eye_status);
              // csvRow.push(attributes.eyestatus.right_eye_status);
              // csvRow.push(attributes.glass.value);
              // csvRow.push(attributes.headpose.yaw_angle);
              // csvRow.push(attributes.headpose.pitch_angle);
              // csvRow.push(attributes.headpose.roll_angle);
              // csvRow.push(attributes.blur.blurness);
              // csvRow.push(attributes.blur.motionblur);
              // csvRow.push(attributes.blur.gaussianblur);
              // csvRow.push(attributes.smile.threshold);
              // csvRow.push(attributes.smile.value);
              // csvRow.push(attributes.facequality.threshold);
              // csvRow.push(attributes.facequality.value);
              // csvRow.push(attributes.ethnicity.value);
              // writer.write(csvRow);
            }
          }
        }, 500 + offset);
        offset += 500;
      });
    });
  });

  proc.then(() => {
    // end stream
    writer.end();
  });
}

callApi();
