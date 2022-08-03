//This file is just for referecne its of no use
const AWS = require("aws-sdk");
const region = process.env.indusos;
console.log({ region }, require("dotenv").config(), "dot env value");
var sns = new AWS.SNS({ apiVersion: "2010-03-31", region: region });

const TargetArn =
  "arn:aws:sns:ap-south-1:026149613627:endpoint/GCM/newsbird-fcm/a0c35371-c159-3a40-adf4-220cddad87aa";
let payload = {
  default: "default",
  GCM: {
    notification: {
      body: "Hey Bro  How are you",
      title: "From for loop",
    },
  },
};

payload.GCM = JSON.stringify(payload.GCM);
payload = JSON.stringify(payload);

const params_sns = (targetArn) => {
  return {
    Message: payload,
    TargetArn: targetArn,
    MessageStructure: "json",
  };
};

sns.listEndpointsByPlatformApplication(
  {
    PlatformApplicationArn:
      "arn:aws:sns:ap-south-1:026149613627:app/GCM/newsbird-fcm" /* required */,
  },
  function (err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else {
      data.Endpoints.map((item) => {
        sns.publish(params_sns(item.EndpointArn), function (err, data) {
          if (err) console.log(err, err.stack); // an error occurred
          else console.log({ data }); // successful response
        });
      });
    } // successful response
  }
);
