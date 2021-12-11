const regObj = (req) => {
  return {
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
    password: req.body.password,
  };
};

const uploadPost = (req, postImage) => {
  console.log(postImage);
  return {
    title: req.body.title,
    content: req.body.content,
    topic: req.body.topic,
    image: postImage.key,
    author: req.session.user ? req.session.user.id : "Anonymous",
    pub_date: new Date(),
    mod_date: new Date(),
  };
};

const updatePost = (post, req, postImage) => {
  post.title = req.body.title;
  post.content = req.body.content;
  post.topic = req.body.topic;
  post.image = postImage.key;
  post.mod_date = new Date();
};

module.exports = { regObj, uploadPost, updatePost };
