const hiddenPostNumber = document.querySelector('.hidden-post-number');
const postId = hiddenPostNumber.textContent

console.log("post number being updated: ", postId)

const editFormHandler = async function(event) {
  event.preventDefault();
  
  const titleEl = document.querySelector('.edit-title');
  const bodyEl = document.querySelector('.edit-content');

  let titleText = titleEl.textContent
  let bodyText = bodyEl.textContent

  console.log("this is the updated title: ", titleText)
  console.log("this is the updated body: ", bodyText)
  await fetch(`/api/edit/${postId}`, {
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

const deleteClickHandler = async function() {
  await fetch(`/api/post/${postId}`, {
    method: 'DELETE'
  });

  document.location.replace('/dashboard');
};

document
  .querySelector('#edit-post-form')
  .addEventListener('submit', editFormHandler);
document
  .querySelector('#delete-post-btn')
  .addEventListener('click', deleteClickHandler);
