// const router = require("express").Router();
// const withAuth = require("../utils/auth");
// const { Comment, Post, User } = require("../models");




// // router.get('/edit/:id', withAuth, async (req, res) => {
//   try {
//     // what should we pass here? we need to get some data passed via the request body
//     const postId = req.params.id;
//     const postData = await Post.findByPk(postId);

//     if (postData) {
//       // serializing the data
//       const post = postData.get({ plain: true });
//       // which view should we render if we want to edit a post?
//       res.render('edit-post', {
//         layout: 'dashboard',
//         post,
//       });
//     } else {
//       res.status(404).end();
//     }
//   } catch (err) {
//     res.redirect('login');
//   }
// });

module.exports = router;
