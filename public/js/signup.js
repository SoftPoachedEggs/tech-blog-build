//new user signup handler
const signupFormHandler = async function(event) {
  event.preventDefault();

  const usernameEl = document.querySelector('#username-input-signup');
  const passwordEl = document.querySelector('#password-input-signup');


  const response = await fetch('/api/user/signup', {
    method: 'POST',
    body: JSON.stringify({
      username: usernameEl.value,
      password: passwordEl.value,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/dashboard');
    alert('New User Added');
  } else {
    alert('Failed to sign up. Please try again');
  }
};

//click handler for signup button. 
document
  .querySelector('#submit-account-button')
  .addEventListener('click', signupFormHandler);
