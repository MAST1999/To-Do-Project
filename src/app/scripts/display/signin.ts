import { newElement } from "./newElement.js";

export const signinPage = newElement("div", "signin-page") as HTMLDivElement;

const h1 = newElement("h1") as HTMLHeadingElement;
h1.textContent = "Welcome Back!";

const inputContainer = newElement("div", "input-container") as HTMLDivElement;

export const signinUsername = newElement("input") as HTMLInputElement;
signinUsername.placeholder = "Username";
signinUsername.type = "text";
signinUsername.id = "signin-username";

export const signinPassword = newElement("input") as HTMLInputElement;
signinPassword.placeholder = "Password";
signinPassword.type = "password";
signinPassword.id = "signin-password";

export const signinSubmit = newElement("button") as HTMLButtonElement;
signinSubmit.textContent = "Sign in";
signinSubmit.id = "signinSubmit";

inputContainer.append(signinUsername, signinPassword, signinSubmit);

export const linkToSignup = newElement("p", "go-to") as HTMLParagraphElement;
linkToSignup.textContent = "Don't have an account? Get one here!";
linkToSignup.style.color = "blue";
linkToSignup.style.cursor = "pointer";

signinPage.append(h1, inputContainer, linkToSignup);
