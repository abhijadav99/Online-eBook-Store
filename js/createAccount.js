let createAccountHandler = {};

createAccountHandler.btnCreateAccout = document.getElementById("BTN_CREATE_ACCOUNT");
createAccountHandler.btnLogin = document.getElementById("BTN_LOGIN");
createAccountHandler.error = document.getElementById("ERROR");
createAccountHandler.counterUserName = document.getElementById("COUNTER_USERNAME");
createAccountHandler.counterEmail = document.getElementById("COUNTER_EMAIL");
createAccountHandler.counterPassWord = document.getElementById("COUNTER_PASSWORD");
createAccountHandler.btnBackToLogin = document.getElementById("BTN_BACK_LOGIN");
createAccountHandler.Email = document.getElementById("EMAIL");
createAccountHandler.PassWord = document.getElementById("PASSWORD");
createAccountHandler.Username = document.getElementById("USERNAME");
createAccountHandler.validationEmail = document.getElementById('VALIDATION_EMAIL');
createAccountHandler.validationPassword = document.getElementById('VALIDATION_PASSWORD');
createAccountHandler.validationUsername = document.getElementById('VALIDATION_USERNAME');

createAccountHandler.Username.addEventListener("input", (e) => {
    createAccountHandler.counterUserName.innerText = e.target.value.length + " / 3 characters";
});

createAccountHandler.Email.addEventListener("input", (e) => {
    createAccountHandler.counterEmail.innerText = e.target.value.length + " / 32 characters";
});

createAccountHandler.PassWord.addEventListener("input", (e) => {
    createAccountHandler.counterPassWord.innerText = e.target.value.length + " / 16 characters";
});

//Login Feild Validation
createAccountHandler.validateInputs = () => {
    // Reset previous validation messages
    createAccountHandler.validationEmail.style.display = "none";
    createAccountHandler.validationPassword.style.display = "none";
    createAccountHandler.validationUsername.style.display = "none";

    createAccountHandler.Username.classList.remove('invalid_edittext');
    createAccountHandler.Email.classList.remove('invalid_edittext');
    createAccountHandler.PassWord.classList.remove('invalid_edittext');

    if (createAccountHandler.Username.value.length < 3) {
        createAccountHandler.setInputError('Please enter Valid Username', createAccountHandler.validationUsername, createAccountHandler.Username)
        return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(createAccountHandler.Email.value)) {
        createAccountHandler.setInputError('Please enter valid email address.', createAccountHandler.validationEmail, createAccountHandler.Email)
        return false;
    }

    if (createAccountHandler.PassWord.value.length < 8) {
        createAccountHandler.setInputError('Please enter Valid Password', createAccountHandler.validationPassword, createAccountHandler.PassWord)
        return false;
    }

    return true;
}

createAccountHandler.setInputError = (error, validationArea, invalid_EMAIL_PASSWORD) => {
    validationArea.innerHTML = error;
    validationArea.style.display = 'block'
    invalid_EMAIL_PASSWORD.classList.add('invalid_edittext')
}
createAccountHandler.btnBackToLogin.addEventListener("click", (e) => {
    window.location.href = '../html/login.html'
});

createAccountHandler.btnCreateAccout.addEventListener("click", (e) => {
    e.preventDefault(); //Stop Form Submission    
    if (createAccountHandler.validateInputs()) {
            fetch('http://localhost/api/userAccNew.php', {
            method: 'POST',
            headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: Object.entries({
                user_name :createAccountHandler.Username.value,
                user_email: createAccountHandler.Email.value,
                user_pass: createAccountHandler.PassWord.value            
            }).map(([k,v])=>{return k+'='+v}).join('&')

            
            }).then(response => response.json())
            
            
            .then(jsonResponse => {
                    //redirect to dashboard
                    if (jsonResponse.isTaskSuccess == 'true') {
                    window.location.href = '../html/login.html';
                    }
                    else{
                        throw new Error(jsonResponse.response_msg)
                    }
            }).catch(error => createAccountHandler.setAuthenticationError(error));
    }
});

createAccountHandler.setAuthenticationError = (error) => {
    createAccountHandler.error.style.display = "block";
    createAccountHandler.error.innerHTML = error;
}