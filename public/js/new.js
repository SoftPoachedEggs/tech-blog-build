let postDate = dayjs().format("YYYY-MM-DD");

const newFormHandler = async function(event) {
  event.preventDefault();

  const postTitle = document.querySelector('#title-input');
  const postBody = document.querySelector('#content-input');
  
  console.log("post title: ", postTitle.value)
  console.log("post body: ", postBody.value)

 const newPost = await fetch(`/api/user/new-post`, {
    method: 'POST',
    body: JSON.stringify({
      post_title: postTitle.value,
      post_body: postBody.value,
      post_date: postDate,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (newPost.ok) {
    alert("New Post Created!");
    document.location.replace("/dashboard");
  } else {
    alert("New post did not save. Please try again.");
  }
};

document
  .querySelector('#submit-button')
  .addEventListener('click', newFormHandler);