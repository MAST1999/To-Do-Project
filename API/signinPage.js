const signInContainer = document.createElement("div");
signInContainer.className = "middle";

//* title
const signinTitle = document.createElement("h1");
signinTitle.textContent = "Welcome Back!\nhope you have a great day!";
signinTitle.className = "signinTitle";

//* form from which we will sign in
const form = document.createElement("form");
form.className = "signup-form";

//* input for username
const inputUserContainer = document.createElement("div");
inputUserContainer.className = "signup-container";
const username = document.createElement("input");
username.className = "user-input";
username.type = "text";
username.placeholder = "Username";
inputUserContainer.appendChild(username);

//* input for password
const inputPassContainer = document.createElement("div");
inputPassContainer.className = "signup-container";
const password = document.createElement("input");
password.type = "password";
password.id = "pass-input";
password.placeholder = "Password";
inputPassContainer.appendChild(password);

//* submit button
const btnSubmit = document.createElement("button");
btnSubmit.textContent = "Sign In";
btnSubmit.id = "submit-signin";

//* link to create account
const link = document.createElement("a");
link.id = "go-to-signup";
link.textContent = "You don't have an account? make one here!";
link.target = "_blank";

//* append to form
form.append(inputUserContainer, inputPassContainer, btnSubmit);

//* append to the signin page
signInContainer.append(signinTitle, form, link);

export default signInContainer;
