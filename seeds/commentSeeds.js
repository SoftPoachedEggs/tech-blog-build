const { Comment } = require("../Models");

const seedData = [
  {
    comment_id: "1",
    post_id: "1",
    user_id: "2",
    comment_text:
  "Love this topic!",
  comment_date: `2023-04-18`,
  },
  {
    comment_id: "2",
    post_id: "2",
    user_id: "1",
    comment_text:
      "AI is insane!!!",
  comment_date: `2023-04-18`,
  },
  {
    comment_id: "3",
    post_id: "2",
    user_id: "2",
    comment_text: "Wow. Amazing read.",
    comment_date: `2023-04-18`,
  },
  {
    comment_id: "4",
    post_id: "2",
    user_id: "3",
    comment_text: "Can't wait to see what the future holds!",
    comment_date: `2023-04-18`,
  },
  {
    comment_id: "5",
    post_id: "2",
    user_id: "2",
    comment_text:
      "Great job!",
    comment_date: `2023-04-18`,
  },
  {
    comment_id: "6",
    post_id: "1",
    user_id: "3",
    comment_text:
      "Cool post!!!",
    comment_date: `2023-04-18`,
    },
  {
    comment_id: "7",
    post_id: "3",
    user_id: "1",
    comment_text:
      "A bit scary tbh.",
    comment_date: `2023-04-18`,
  },
  {
    comment_id: "8",
    post_id: "3",
    user_id: "2",
    comment_text: "I couldn't agree more.",
    comment_date: `2023-04-18`,
  },
];

const seedComments = () => Comment.bulkCreate(seedData);

module.exports = seedComments;
