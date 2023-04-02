module.exports = {
    format_time: (date) => {
      return date.toLocaleTimeString();
    },
    // changes date to MM/DD/YYYY
    format_date: (date) => {
      return `${new Date(date).getMonth() + 1}/${new Date(
        date
      ).getDate()}/${new Date(date).getFullYear()}`;
    },
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
      if (sessionData.username === blog.user.username) {
        return options.fn(this);
      }
    },
  };