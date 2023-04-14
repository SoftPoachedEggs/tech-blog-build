let commentDate = dayjs().format("YYYY-MM-DD");
console.log('comment date: ', commentDate)


const postEl = document.querySelector('#post-id')
const postID = parseInt(postEl.textContent)

console.log('post ID: ', typeof postID)

const textEl = document.querySelector('#comment-text')
let textContent = textEl.value

const commentFormHandler = async function() {

  const textEl = document.querySelector('#comment-text')
  let textContent = textEl.value

  try {
    const newComment = await fetch('/api/user/comment', {
      method: 'POST',
      body: JSON.stringify({
        post_id: postID,
        comment_text: textContent,
        comment_date: commentDate,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log("this is the newComment", newComment);
    if (newComment.ok) {
      alert("New comment created!");
    }
  } catch (err) {
    console.log(err);
  }
};


document
  .querySelector('#post-comment-btn')
  .addEventListener('click', commentFormHandler);
