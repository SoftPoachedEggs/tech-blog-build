const router = require('express').Router();
const User  = require('../../models/user');
const Post  = require('../../models/post');
const Comment  = require('../../models/comment');
const withAuth = require('../../utils/auth');

//cloudinary setup
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});


//~~~~~~~~~~~~~~~~~~USER ACCOUNT CREATION~~~~~~~~~~~~~~~~
//NEW USER SIGNUP REQUEST
router.post('/signup', async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = newUser.user_id;
      req.session.username = newUser.username;
      req.session.loggedIn = true;

      res.json(newUser);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//~~~~~~~~~~~~USER LOGIN REQUESTS~~~~~~~~~~~~~~~~
//login post request
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      res.status(400).json({ message: 'No user account found!' });
      return;
    }

    const validPassword = user.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'No user account found!' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = user.user_id;
      req.session.username = user.username;
      req.session.loggedIn = true;

      res.json({ user, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json({ message: 'No user account found!' });
  }
});


//~~~~~~~~~~~~~~~~USER BLOG-POST ROUTES~~~~~~~~~~~~~~~~~~ 

//USER NEW BLOG-POST REQUEST
router.post('/new-post', async (req, res) => {
  try {
    const newPost = await Post.create({
      user_id: req.session.user_id,
      post_title: req.body.post_title,
      post_body: req.body.post_body,
      post_date: req.body.post_date,
      post_topic: req.body.post_topic,
      image_url: req.body.image_url,
    });
    console.log('this is new post', newPost)
    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});
//~~~~~~~~~~~~~~~~~~~~~Edit Post~~~~~~~~~~~~~~~~~~~~~

//USER BLOG POST UPDATE REQUEST
router.put('/edit/:id', withAuth, async (req, res) => {
  try {
    const updatePost = await Post.update(req.body, {
      where: {
        post_id: req.params.id,
      },
    });
    res.status(200).json(updatePost);
  } catch (err) {
    res.status(500).json(err);
  }
});


//USER BLOG-POST DELETE REQUEST
router.delete('/delete/:id', withAuth, async (req, res) => {
  try {
    const deletePost = Post.destroy({
      where: {
        post_id: req.params.id,
      },
    });
  
} catch (err) {
  res.status(500).json(err);
}
});
//~~~~~~~~~~~~User Comment Route~~~~~~~~~~~~~~

router.post('/comment', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      user_id: req.session.user_id,
      post_id: req.body.post_id,
      comment_text: req.body.comment_text,
      comment_date: req.body.comment_date,
    });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
