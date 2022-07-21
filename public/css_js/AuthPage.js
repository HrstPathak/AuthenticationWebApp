var absolute_heading = document.querySelector(".absolute_heading");
var absolute_para = document.querySelector(".absolute_para");
var shiftButton = document.querySelector(".Shift");
var block_1 = document.querySelector("#block_1");
var block_2 = document.querySelector("#block_2");
let SignUpMessage = document.getElementById("Signupmessage");
let LoginUserPassword = document.getElementById("LoginUserPassword");
let EyeButton = document.getElementById("EyeButton");
let EyeButton_1 = document.getElementById("EyeButton1");
let createUserPassword = document.getElementById("CreateUserPassword");

document.querySelector(".Shift").addEventListener("click", function () {
  document
    .querySelector(".absolute_block")
    .classList.toggle("absolute_block_shift");
  if (
    document.querySelector(".absolute_block").className ==
    "absolute_block absolute_block_shift"
  ) {
    block_1.classList.add("inner_block_1");
    block_2.classList.remove("inner_block_2");
    absolute_heading.innerHTML = "GET STARTED,";
    absolute_para.innerHTML = "Create your Account & Enjoy our service";
    shiftButton.innerHTML = "SIGN IN";
  } else {
    block_1.classList.remove("inner_block_1");
    block_2.classList.add("inner_block_2");
    absolute_heading.innerHTML = "HELLO, FRIENDS !";
    absolute_para.innerHTML =
      "Enter your personal details and start your journey,with us";
    shiftButton.innerHTML = "SIGN UP";
  }
});
function passwordvisiblecreate() {
  if (createUserPassword.type === "password") {
    EyeButton.classList.remove("fa-eye");
    EyeButton.classList.add("fa-eye-slash");
    createUserPassword.type = "text";
  } else {
    EyeButton.classList.remove("fa-eye-slash");
    EyeButton.classList.add("fa-eye");
    createUserPassword.type = "password";
  }
}
function PasswordVisibleLogin() {
  if (LoginUserPassword.type === "password") {
    EyeButton1.classList.remove("fa-eye");
    EyeButton1.classList.add("fa-eye-slash");
    LoginUserPassword.type = "text";
  } else {
    EyeButton1.classList.remove("fa-eye-slash");
    EyeButton1.classList.add("fa-eye");
    LoginUserPassword.type = "password";
  }
}

const warning1 = document.getElementById("warning_1");
if (
  warning1.innerText == "Invalid UserEmail/Password" ||
  warning1.innerText == "Email already exist."
) {
  if (warning1.classname == "warning1 alert alert-success") {
    warning1.classList.remove("alert-success");
  }
  warning1.classList.add("alert-danger");
  warning1.style.color = "red";
} else {
  if (warning1.classname == "warning1 alert alert-danger") {
    warning1.classList.remove("alert-danger");
  }
  warning1.classList.add("alert-success");
  warning1.style.color = "#3df58a";
}
