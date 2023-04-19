const router = require("express").Router();
const withAuth = require("../utils/auth");
const { Comment, Post, User } = require("../models");

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User }],
      where: {
        user_id: req.session.user_id,
      },
    });
    const userPosts = postData.map((b) => b.get({ plain: true }));

    const sessionData = {
      isLoggedIn: req.session.loggedIn,
      username: req.session.username,
    };

    res.render("dashview", { userPosts, sessionData });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

//RENDER NEW-POST FORMS TO PAGE

router.get("/new-post", withAuth, (req, res) => {
  res.render("new-post");
});

router.get("/logout", async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.error("Failed to destroy session:", err);
      } else {
        // Redirect the user to the login page or any other appropriate page
        res.redirect("/"); // Replace with the actual URL of the login page
      }
    });
  } catch (err) {
    res.status(400).json({ message: "No user account found!" });
  }
});

//EDIT STINGLE POST
router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: {
        post_id: req.params.id,
      },
    });
    const userPost = postData ? postData.get({ plain: true }) : null;
    res.render("edit-post", { userPost });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
