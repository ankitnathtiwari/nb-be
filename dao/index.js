const regObj = (req) => {
  return {
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
    password: req.body.password,
  };
};

const filePath = (req) => {
  return `https://newsbird.live/compressed-images${
    req.file.path.split("uploads")[1]
  }`;
};

const uploadPost = (req) => {
  return {
    title: req.body.title,
    content: req.body.content,
    topic: req.body.topic,
    image: filePath(req),
    author: req.session.user.id || "Anonymous",
    pub_date: new Date(),
    mod_date: new Date(),
  };
};

const updatePost = (post, req) => {
  post.title = req.body.title;
  post.image = filePath(req);
  post.content = req.body.content;
  post.topic = req.body.topic;
  post.mod_date = new Date();
};

module.exports = { regObj, uploadPost, updatePost };
