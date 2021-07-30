const titleValidate = (data) => {
  return data.split(" ").length > 10;
};

const contentValidate = (data) => {
  return data.split(" ").length > 40;
};

const topicValidation = (data) => {
  const topics = [
    "",
    "all",
    "politics",
    "scienceandtech",
    "entertainment",
    "sports",
    "international",
    "national",
    "world",
    "business",
  ];
  return topics.includes(data);
};

const loginValidation = (req) => {
  if (!req.body.email || !req.body.password) {
    return false;
  } else {
    return true;
  }
};

const regValidation = (req) => {
  if (req.body.email && req.body.password && req.body.name && req.body.age) {
    if (req.body.email.split("@")[1] === "gmail.com") {
      return {
        regStatus: true,
        message: "Validated",
      };
    } else {
      return {
        regStatus: false,
        message: "Please Provide Valid Email Address",
      };
    }
  } else {
    return {
      regStatus: false,
      message: "Please Provide All The details",
    };
  }
};

const postValidation = (req) => {
  //check for all the fields(content, title, file, author)
  //check for topic, title, content and file validation,

  if (
    req.body.topic &&
    req.body.title &&
    req.body.content &&
    req.session.user &&
    req.file
  ) {
    if (
      !titleValidate(req.body.title) ||
      !contentValidate(req.body.content) ||
      !topicValidation(req.body.topic)
    ) {
      return {
        status: false,
        reason: "Title Or Content Or Topic Other Than The Recommended Value",
      };
    } else {
      return {
        status: true,
        reason: "VALIDATION_SUCCESS",
      };
    }
  } else {
    return { status: false, reason: "Please Provide All The details" };
  }
};

module.exports = {
  loginValidation,
  regValidation,
  postValidation,
  topicValidation,
  titleValidate,
  contentValidate,
};
