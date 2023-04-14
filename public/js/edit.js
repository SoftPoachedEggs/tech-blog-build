const hiddenPostNumber = document.querySelector('.hidden-post-number');
const postId = hiddenPostNumber.textContent
const titleEl = document.querySelector('#edit-title');
const bodyEl = document.querySelector('#edit-content');

console.log("post number being updated: ", postId)

const editFormHandler = async function() {
  console.log('edit btn clicked: ')

  let titleText = titleEl.value
  let bodyText = bodyEl.value

  await fetch(`/api/user/edit/${postId}`, {
    method: 'PUT',
    body: JSON.stringify({
      post_title: titleText,
      post_body: bodyText
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  document.location.replace('/dashboard');
};

const deleteClickHandler = async function () {
  try {
    const confirmDelete = confirm("Are you sure you want to delete this post?");
    if (confirmDelete) {

      const response = await fetch(`/api/user/edit/${postId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        document.location.replace("/dashboard");
        alert("Post Deleted!");
      } else {
        alert("Failed to delete post.");
      }
    } else {
      return;
    }
  } catch (err) {
    console.log(err);
  }
};

document
  .querySelector('#update-btn')
  .addEventListener('click', editFormHandler);
document
  .querySelector('#delete-post-btn')
  .addEventListener('click', deleteClickHandler);
