
const regObj = (req) => {
  return {
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
    password: req.body.password,
  };
};

// const filePath = (req) => {
//   log
//   return `${url}/compressed-images${}`;
// };

const uploadPost = (req) => {
  return {
    title: req.body.title,
    content: req.body.content,
    topic: req.body.topic,
    image: req.file.path.split("uploads")[1],
    author: req.session.user.id || "Anonymous",
    pub_date: new Date(),
    mod_date: new Date(),
  };
};

const updatePost = (post, req) => {
  post.title = req.body.title;
  post.image = req.file.path.split("uploads")[1];
  post.content = req.body.content;
  post.topic = req.body.topic;
  post.mod_date = new Date();
};

module.exports = { regObj, uploadPost, updatePost };
