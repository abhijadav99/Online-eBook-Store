//create login handler object
let adminLoginHandler = {};

adminLoginHandler.btnCreateAccout = document.getElementById("BTN_CREATE_ACCOUNT");
adminLoginHandler.error = document.getElementById("ERROR");
adminLoginHandler.counterEmail = document.getElementById("COUNTER_EMAIL");
adminLoginHandler.counterPassWord = document.getElementById("COUNTER_PASSWORD");
adminLoginHandler.btnLogin = document.getElementById("BTN_LOGIN");
adminLoginHandler.Email = document.getElementById("EMAIL");
adminLoginHandler.PassWord = document.getElementById("PASSWORD");
adminLoginHandler.validationEmail = document.getElementById('VALIDATION_EMAIL');
adminLoginHandler.validationPassword = document.getElementById('VALIDATION_PASSWORD');


adminLoginHandler.Email.addEventListener("input", (e) => {
    adminLoginHandler.counterEmail.innerText = e.target.value.length + " / 32 characters";
});

adminLoginHandler.PassWord.addEventListener("input", (e) => {
    adminLoginHandler.counterPassWord.innerText = e.target.value.length + " / 8 characters";
});

//Login Feild Validation
adminLoginHandler.validateInputs = () => {
    // Reset previous validation messages
    adminLoginHandler.validationEmail.style.display = "none";
    adminLoginHandler.validationPassword.style.display = "none";
    adminLoginHandler.Email.classList.remove('invalid_edittext');
    adminLoginHandler.PassWord.classList.remove('invalid_edittext');

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(adminLoginHandler.Email.value)) {
        adminLoginHandler.setInputError('Please enter valid email address.', adminLoginHandler.validationEmail, adminLoginHandler.Email)
        return false;
    }

    if (adminLoginHandler.PassWord.value.length < 8) {
        adminLoginHandler.setInputError('Please enter Valid Password', adminLoginHandler.validationPassword, adminLoginHandler.PassWord)
        return false;
    }

    return true;
}

adminLoginHandler.setInputError = (error, validationArea, invalid_EMAIL_PASSWORD) => {
    validationArea.innerHTML = error;
    validationArea.style.display = 'block'
    invalid_EMAIL_PASSWORD.classList.add('invalid_edittext')
}

adminLoginHandler.btnLogin.addEventListener("click", (e) => {
    if (adminLoginHandler.validateInputs()) {
        fetch('http://localhost/api/adminAuth.php', {
        method: 'POST',
        headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
        body: Object.entries({
            admin_email: adminLoginHandler.Email.value,
            admin_pass: adminLoginHandler.PassWord.value            
        }).map(([k,v])=>{return k+'='+v}).join('&')
        }).then(response => response.json()).then(jsonResponse => {
                //redirect to dashboard
                if (jsonResponse.isTaskSuccess == 'true') {
                localStorage.setItem('adminName', jsonResponse.admins[0].admin_name);
                localStorage.setItem('adminEmail', jsonResponse.admins[0].admin_email);
                localStorage.setItem('adminPass', jsonResponse.admins[0].admin_pass);
                window.location.href = '../html/adminDashboard.html';
                }
                else{
                    throw new Error(jsonResponse.response_msg)
                }
        }).catch(error => adminLoginHandler.setAuthenticationError(error));

    }
});

adminLoginHandler.setAuthenticationError = (error) => {
    adminLoginHandler.error.style.display = "block";
    adminLoginHandler.error.innerHTML = error;
}