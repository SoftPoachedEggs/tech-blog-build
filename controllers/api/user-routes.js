const router = require('express').Router();
const User  = require('../../models/user');
const Post  = require('../../models/post');
const withAuth = require('../../utils/auth');

//~~~~~~~~~~~~~~~~~~USER ACCOUNT CREATION~~~~~~~~~~~~~~~~
//NEW USER SIGNUP REQUEST
router.post('/signup', async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.userId = newUser.user_id;
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
      req.session.userId = user.id;
      req.session.username = user.username;
      req.session.loggedIn = true;

      res.json({ user, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json({ message: 'No user account found!' });
  }
});

//Logout post request
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

//~~~~~~~~~~~~~~~~USER BLOG-POST ROUTES~~~~~~~~~~~~~~~~~~ 

//USER NEW BLOG-POST REQUEST
router.post('/new-post', async (req, res) => {
  try {
    const newPost = await Post.create({
      user_id: req.session.userId,
      post_title: req.body.post_title,
      post_body: req.body.post_body,
      post_date: req.body.post_date,
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
      post_title: req.body.post_title,
      post_body: req.body.post_body,
    });
    res.status(200).json(updatePost);
  } catch (err) {
    res.status(500).json(err);
  }
});


//USER BLOG-POST DELETE REQUEST
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const [affectedRows] = Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});




module.exports = router;
