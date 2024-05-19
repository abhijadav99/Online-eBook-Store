//create login handler object
let loginHandler = {};

loginHandler.btnCreateAccout = document.getElementById("BTN_CREATE_ACCOUNT");

loginHandler.error = document.getElementById("ERROR");
loginHandler.counterEmail = document.getElementById("COUNTER_EMAIL");
loginHandler.counterPassWord = document.getElementById("COUNTER_PASSWORD");
loginHandler.btnLogin = document.getElementById("BTN_LOGIN");
loginHandler.Email = document.getElementById("EMAIL");
loginHandler.PassWord = document.getElementById("PASSWORD");
loginHandler.validationEmail = document.getElementById('VALIDATION_EMAIL');
loginHandler.validationPassword = document.getElementById('VALIDATION_PASSWORD');


loginHandler.Email.addEventListener("input", (e) => {
    loginHandler.counterEmail.innerText = e.target.value.length + " / 32 characters";
});

loginHandler.PassWord.addEventListener("input", (e) => {
    loginHandler.counterPassWord.innerText = e.target.value.length + " / 8 characters";
});

//Login Feild Validation
loginHandler.validateInputs = () => {
    // Reset previous validation messages
    loginHandler.validationEmail.style.display = "none";
    loginHandler.validationPassword.style.display = "none";
    loginHandler.Email.classList.remove('invalid_edittext');
    loginHandler.PassWord.classList.remove('invalid_edittext');

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginHandler.Email.value)) {
        loginHandler.setInputError('Please enter valid email address.', loginHandler.validationEmail, loginHandler.Email)
        return false;
    }

    if (loginHandler.PassWord.value.length < 8) {
        loginHandler.setInputError('Please enter Valid Password', loginHandler.validationPassword, loginHandler.PassWord)
        return false;
    }

    return true;
}

loginHandler.setInputError = (error, validationArea, invalid_EMAIL_PASSWORD) => {
    validationArea.innerHTML = error;
    validationArea.style.display = 'block'
    invalid_EMAIL_PASSWORD.classList.add('invalid_edittext')
}

loginHandler.btnCreateAccout.addEventListener("click", (e) => {
    window.location.href = '../html/createAccount.html';
});

loginHandler.btnLogin.addEventListener("click", (e) => {
    e.preventDefault(); 
    if (loginHandler.validateInputs()) {
        fetch('http://localhost/api/userAuth.php', {
            method: 'POST',
            headers: { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" },
            body: Object.entries({
                user_email: loginHandler.Email.value,
                user_pass: loginHandler.PassWord.value

            }).map(([k, v]) => { return k + '=' + v }).join('&')

            
        }).then(response => response.json()).then(jsonResponse => {
            if (jsonResponse.isTaskSuccess == 'true') {
                localStorage.setItem('userName', jsonResponse.users[0].user_name);
                localStorage.setItem('userEmail', jsonResponse.users[0].user_email);
                localStorage.setItem('userPass', jsonResponse.users[0].user_pass);
                window.location.href = '../html/dashboard.html';
            }
            else {
                console.log(jsonResponse.response_msg);
                throw new Error(jsonResponse.response_msg);
            }
        }).catch(error => loginHandler.setAuthenticationError(error));

    }
});

loginHandler.setAuthenticationError = (error) => {
    console.log(error)
    loginHandler.error.style.display = "block";
    loginHandler.error.innerHTML = error;
}

loginHandler.togglePassword = () => {
    document.getElementById("TOGGLE_PASSWORD").addEventListener("click", function() {
        var passwordField = document.getElementById("PASSWORD");
        var toggleIcon = document.getElementById("TOGGLE_PASSWORD");

        if (passwordField.type === "password") {
            passwordField.type = "text";
            toggleIcon.classList.remove("fa-eye");
            toggleIcon.classList.add("fa-eye-slash");
        } else {
            passwordField.type = "password";
            toggleIcon.classList.remove("fa-eye-slash");
            toggleIcon.classList.add("fa-eye");
        }
    });
}

loginHandler.togglePassword(); // Call the function to set up the event listener