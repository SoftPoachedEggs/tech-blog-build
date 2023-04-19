let postDate = dayjs().format("YYYY-MM-DD");
let imageUrl = "";

const thumbnail = document.getElementById("upload-thumb");

//new blog post handler
const newFormHandler = async function (event) {
  event.preventDefault();

  var selectedTopic = "";

  var radios = document.getElementsByName("exampleRadios");

  // Loop through the radio buttons to find the selected one
  for (var i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      selectedTopic = radios[i].value;
      break;
    }
  }

  const postTitle = document.querySelector("#title-input");
  const postBody = document.querySelector("#content-input");

  const newPost = await fetch(`/api/user/new-post`, {
    method: "POST",
    body: JSON.stringify({
      post_title: postTitle.value,
      post_body: postBody.value,
      post_topic: selectedTopic,
      post_date: postDate,
      image_url: imageUrl,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (newPost.ok) {
    alert("New Post Created!");
    document.location.replace("/dashboard");
  } else {
    alert("New post did not save. Please try again.");
  }
};

//Couldinary widget
var myWidget = cloudinary.createUploadWidget(
  {
    cloudName: "dusaigbyn",
    uploadPreset: "tstxkivf",
  },
  (error, result) => {
    if (!error && result && result.event === "success") {
      imageUrl = result.info.secure_url;
      displayThumb(imageUrl);
    }
  }
);

//set thumb image uploaded
const displayThumb = (imageUrl) => {
  thumbnail.setAttribute("src", imageUrl);
  thumbnail.setAttribute("style", "block");
};

document.getElementById("upload_widget").addEventListener(
  "click",
  function () {
    myWidget.open();
  },
  false
);
document
  .querySelector("#submit-button")
  .addEventListener("click", newFormHandler);
