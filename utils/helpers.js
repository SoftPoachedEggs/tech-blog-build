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
    // Check if text is undefined or null, and provide a default value if needed
    text = text ?? "";
    var sentences = text.split(/(?<=[.?!])\s+/);
    if (sentences.length > 0) {
      // Return the first sentence
      return sentences[0];
    } else {
      return "";
    }
  },
  // Check if the input is a string
  capitalizeTopic: (text) => {
    if (typeof text === "string") {
      // Capitalize the first letter of the word
      return text.charAt(0).toUpperCase() + text.slice(1);
    }
    return text;
  },
};
