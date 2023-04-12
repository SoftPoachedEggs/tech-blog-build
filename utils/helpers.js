module.exports = {
    // returns only the first 40 words of an article for preview in cards
    truncateWords: (text) => {
      const words = text.split(" ");
      return words.slice(0, 40).join(" ");
    },
    checkUser: (sessionData, blog, options) => {
      console.log(
        "This is the sessionData and blog from the helper",
        sessionData,
        blog
      );
      if (sessionData.username === blog.post.username) {
        return options.fn(this);
      }
    },
  };