const hiddenPostNumber = document.querySelector('.hidden-post-number');
const postId = hiddenPostNumber.textContent
const titleEl = document.querySelector('#edit-title');
const bodyEl = document.querySelector('#edit-content');

console.log("post number being updated: ", postId)

//edit post handlers. 
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
  }).then(redirectDashboard());
};

//delete post handler
const deleteClickHandler = async () => {
  const confirmDelete = confirm("Are you sure you want to delete this post?");
  if (confirmDelete) {
    await fetch(`/api/user/delete/${postId}`, {
      method: "DELETE"
    })
    .then(redirectDashboard())
}};

//redirect function for cancel / delete. 
let redirectDashboard = () => {
  document.location.replace('/dashboard');
}
//query selectors for click events
document
  .querySelector('#cancel-btn')
  .addEventListener('click', redirectDashboard);
document
  .querySelector('#update-btn')
  .addEventListener('click', editFormHandler);
document
  .querySelector('#delete-post-btn')
  .addEventListener('click', deleteClickHandler);
