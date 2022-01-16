const config = require("config");

const titleValidate = (data) => {
  return data.split(" ").length > 1;
};

const contentValidate = (data) => {
  return data.split(" ").length > 4;
};

const topicValidation = (data) => {
  console.log(data, "data");
  return config.topics.includes(data);
};

const loginValidation = (req) => {
  //data validation currently not applied much
  if (!req.body.email || !req.body.password) {
    return false;
  } else {
    return true;
  }
};

const regValidation = (req) => {
  if (req.body.email && req.body.password && req.body.name && req.body.age) {
    if (req.body.email.split("@")[1] === "gmail.com") {
      if (config.authUsers.includes(req.body.email)) {
        return {
          status: true,
          message: "Validated",
        };
      }
      return {
        status: false,
        message: "You Are Not Authorized To Register ",
      };
    } else {
      return {
        status: false,
        message: "Please Provide Valid Email Address",
      };
    }
  } else {
    return {
      status: false,
      message: "Please Provide All The details",
    };
  }
};

const postValidation = (req) => {
  //check for all the fields(content, title, file, author)
  //check for topic, title, content and file validation,

  // if (
  //   req.body.topic &&
  //   req.body.title &&
  //   req.body.content &&
  //   req.session.user &&
  //   req.file
  // ) {
  //   if (
  //     !titleValidate(req.body.title) ||
  //     !contentValidate(req.body.content) ||
  //     !topicValidation(req.body.topic)
  //   ) {
  //     return {
  //       status: false,
  //       reason: "Title Or Content Or Topic Other Than The Recommended Value",
  //     };
  //   } else {
  return {
    status: true,
    reason: "VALIDATION_SUCCESS",
  };
  //   }
  // } else {
  //   return { status: false, reason: "Please Provide All The details" };
  // }
};

module.exports = {
  loginValidation,
  regValidation,
  postValidation,
  topicValidation,
  titleValidate,
  contentValidate,
};
