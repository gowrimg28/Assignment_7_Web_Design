const validateEmail = () => {
    const email = $("#email").val();
    const emailErrorElement = $("#email-error");
    emailErrorElement.empty().hide();
  
    if (email.trim() === "") {
      emailErrorElement.text("Email field is required").show();
    } else if (email.length > 50) {
      emailErrorElement.text("Email cannot be more than 50 characters").show();
    }  else if (email.length < 18) {
      emailErrorElement.text("Email cannot be less than 18 characters").show();
    } else if (!email.endsWith("@northeastern.edu")) {
      emailErrorElement.text("Email must end with @northeastern.edu").show();
    } else if (!/^[a-zA-Z]/.test(email)) {
      emailErrorElement.text("Email must start with a letter").show();
    } else {
      emailErrorElement.hide();
    }
    validateForm();
  };
  
  const validateUsername = () => {
    const username = $("#username").val();
    const usernameErrorElement = $("#username-error");
    usernameErrorElement.empty().hide();
  
    if (username.trim() === "") {
      usernameErrorElement.text("Username field is required").show();
    } else {
      const usernameRegex = /^[a-zA-Z0-9@_\-\.]{3,20}$/;
      if (!username.match(usernameRegex)) {
        usernameErrorElement.text("username can only have letters, numbers, @, _, - and .").show();
      } else if (username.length < 3) {
        usernameErrorElement.text("username must have minimum of 3 characters").show();
      } else if (username.length > 30) {
        usernameErrorElement.text("username can't be more than 30 characters").show();
      } else {
        usernameErrorElement.hide();
      }
    }
    validateForm();
  };
  
  const validatePassword = () => {
    const password = $("#password").val();
    const passwordErrorElement = $("#password-error");
    passwordErrorElement.empty().hide();
  
    if (password.trim() === "") {
      passwordErrorElement.text("Password field is required").show();
    } else {
      if (password.length < 5) {
        passwordErrorElement.text("Password must have a minimum of 5 characters").show();
      } else if (password.length > 20) {
        passwordErrorElement.text("Password can't be more than 20 characters").show();
      } else {
        if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password)) {
          passwordErrorElement.text("Password requires at least 1 special character").show();
        } else if (!/[A-Z]/.test(password)) {
          passwordErrorElement.text("Password requires at least 1 uppercase character").show();
        } else if (!/\d/.test(password)) {
          passwordErrorElement.text("Password requires at least 1 number character").show();
        }
      }
    }
  
    validateForm();
  };
  
  const validateConfirmPassword = () => {
    const confirmPassword = $("#confirm-password").val();
    const confirmPasswordErrorElement = $("#confirm-password-error");
    confirmPasswordErrorElement.empty().hide();
  
    if (confirmPassword.trim() === "") {
      confirmPasswordErrorElement.text("This field is required").show();
    } else {
      const password = $("#password").val();
      if (confirmPassword !== password) {
        confirmPasswordErrorElement.text("Passwords do not match").show();
      } else {
        confirmPasswordErrorElement.hide();
      }
    }
  
    validateForm();
  };
  
  const validateForm = () => {
    const emailError = $("#email-error").text() === "";
    const usernameError = $("#username-error").text() === "";
    const passwordError = $("#password-error").text() === "";
    const confirmPasswordError = $("#confirm-password-error").text() === "";
  
    const allFieldsFilled =
      $("#email").val().trim() !== "" &&
      $("#username").val().trim() !== "" &&
      $("#password").val().trim() !== "" &&
      $("#confirm-password").val().trim() !== "";
  
    $("#login-button").prop(
      "disabled", !(emailError && usernameError && passwordError && confirmPasswordError) || !allFieldsFilled
    );
  };
  
  $("#login-button").click(() => {
    if (
      $("#email-error").text() === "" &&
      $("#username-error").text() === "" &&
      $("#password-error").text() === "" &&
      $("#confirm-password-error").text() === ""
    ) {
      const username = $("#username").val();
      localStorage.setItem("username", username);
      window.location.href = "calculator.html";
    } else {
      $("#error-message").text("Please fix the errors in the form.");
    }
  });