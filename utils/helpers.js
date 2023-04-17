module.exports = {
  truncateBlog: (text) => {
    const words = text.split(" ");
    if (words.length > 40) {
      return words.slice(0, 40).join(" ");
    } else {
      return text;
    }
  },
  getFirstSentence: (text) => {
    var sentences = text.split(/(?<=[.?!])\s+/);
    if (sentences.length > 0) {
      // Return the first sentence
      return sentences[0];
    } else {
      return "";
    }
  },
  replacePTag: (text) => {
    if (text.includes('<p>')) {
      // Replace <p> tags with <br> tags
      var replacedText = text.replace(/<p>/g, '\n').replace(/<\/p>/g, '');
      return replacedText
    } else {
      return text;
    }
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