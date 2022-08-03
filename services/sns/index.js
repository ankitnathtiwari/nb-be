const AWS = require("aws-sdk");
require("dotenv").config();
const region = process.env.indusos;
const config = require("config");

var sns = new AWS.SNS({ apiVersion: "2010-03-31", region: region });

var getParams = (token) => {
  return {
    PlatformApplicationArn: config.sns.PlatformApplicationArn /* required */,
    Token: token /* required */,
    Attributes: {
      CustomUserData: "STRING_VALUE",
    },
    CustomUserData: "STRING_VALUE",
  };
};

const platformEndPoint = async (params) => {
  console.log(params);
  sns.createPlatformEndpoint(params, function (err, data) {
    if (err) {
      console.log(err, err.stack);
      return Promise.reject({ success: false, message: err.message });
    } else {
      var params2 = {
        Protocol: "application" /* required */,
        TopicArn:
          "arn:aws:sns:ap-south-1:026149613627:newsbird-notifications" /* required */,
        Endpoint: data.EndpointArn,
        ReturnSubscriptionArn: true || false,
      };
      sns.subscribe(params2, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data); // successful response
      });

      return Promise.resolve({ success: true, data });
    } // successful response
  });
};

module.exports = { platformEndPoint, getParams };
