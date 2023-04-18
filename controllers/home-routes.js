const router = require("express").Router();
const withAuth = require("../utils/auth");
const { Comment, Post, User } = require("../Models");

// get all posts for homepage
router.get("/", async (req, res) => {
  try {
      const postData = await Post.findAll({
      include: [{ model: User }],
    });
    // serialize the data
    const posts = postData.map((post) => post.get({ plain: true }));
    const sessionData = {
      isLoggedIn: req.session.loggedIn,
      username: req.session.username,
      user_id: req.session.user_id,
    };
    res.render("homeview", { posts, sessionData });
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET STINGLE POST ------TODO Render clicked blog post on page with comments
router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: {
        post_id: req.params.id,
      },
      include: [{ model: User, as: "user" }],
    });
    const commentData = await Comment.findAll({
      include: [{ model: User }],
      where: {
        post_id: req.params.id,
      },
    });

    const userPost = postData ? postData.get({ plain: true }) : null;
    
    const userComments = commentData.map((comment) =>
      comment.get({ plain: true })
    );

    console.log(`user post: `, userPost);
    console.log("userComments: ", userComments);

    const sessionData = {
      isLoggedIn: req.session.loggedIn,
      username: req.session.username,
    };
    res.render("blogpost", { userPost, sessionData, userComments });
  } catch (err) {
    res.status(500).json(err);
  }
});

//topic page list route
router.get("/topic/:topic", async (req, res) => {
  try {
    const topic = req.params.topic;
    const postData = await Post.findAll({
      where: {
        post_topic: req.params.topic,
      },
      include: [{ model: User }],
    });
        // serialize the data
        const posts = postData.map((post) => post.get({ plain: true }));
        // we should render all the posts here
        const sessionData = {
          isLoggedIn: req.session.loggedIn,
          username: req.session.username,
          user_id: req.session.user_id,
        };
        res.render("topicview", { posts, sessionData, topic });
      } catch (err) {
        res.status(500).json(err);
      }
    });


//~~~~~LOGIN GET ROUTE~~~~~~~~~~
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

module.exports = router;
