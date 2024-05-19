
let profileInfoHandler = {};

profileInfoHandler.emailId = document.getElementById("EMAIL");
profileInfoHandler.extUsername = document.getElementById("USERNAME");
profileInfoHandler.extPassword = document.getElementById("PASSWORD");
profileInfoHandler.btnAppyDetails = document.getElementById("BTN_APPLYDETAILS");
profileInfoHandler.backToDashboard = document.getElementById("BTN_BACK_TO_DASHBOARD");
profileInfoHandler.btnEditUsernameIcon = document.getElementById('BTN_EDIT_USERNAME');
profileInfoHandler.btnEditPasswordIcon = document.getElementById('BTN_EDIT_PASSWORD');
profileInfoHandler.validationUsername = document.getElementById("VALIDATION_USERNAME");
profileInfoHandler.validationPassword = document.getElementById("VALIDATION_PASSWORD");

//Back to Dashboard button
profileInfoHandler.backToDashboard.addEventListener("click", (e) => {
    window.location.href = '../html/dashboard.html'
});
  // Ensure the DOM is fully loaded before running our function
  document.addEventListener('DOMContentLoaded', (event) => {
    loadAndSetUsername();
});
function loadAndSetUsername() {
profileInfoHandler.extUsername.value = localStorage.getItem('userName');
profileInfoHandler.emailId.value = localStorage.getItem('userEmail');
profileInfoHandler.extPassword.value = localStorage.getItem('userPass');
}
profileInfoHandler.validateInputs = () => {
    // Reset previous validation messages
    profileInfoHandler.validationUsername.style.display = "none";
    profileInfoHandler.validationPassword.style.display = "none";
    profileInfoHandler.extUsername.classList.remove('invalid_edittext');
    profileInfoHandler.extPassword.classList.remove('invalid_edittext');
  
    if (profileInfoHandler.extUsername.value.length < 3) {
      profileInfoHandler.setInputError('Please enter Valid Username', profileInfoHandler.validationUsername, profileInfoHandler.extUsername)
      return false;
    }
  
    if (profileInfoHandler.extPassword.value.length < 8) {
      profileInfoHandler.setInputError('Minimum 8 character required', profileInfoHandler.validationPassword, profileInfoHandler.extPassword)
      return false;
    }
  
    return true;
  }
  
  profileInfoHandler.setInputError = (error, validationArea, etx) => {
    validationArea.innerHTML = error;
    validationArea.style.display = 'block'
    etx.classList.add('invalid_edittext')
  }
  
  profileInfoHandler.btnAppyDetails.addEventListener("click", (e) => {
  
    e.preventDefault(); 
      if (profileInfoHandler.validateInputs()) {
        fetch('http://localhost/api/userUpdateProfile.php', {
        method: 'POST',
        headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
        body: Object.entries({
            user_email: profileInfoHandler.emailId.value,
            user_name: profileInfoHandler.extUsername.value,
            user_pass: profileInfoHandler.extPassword.value            
        }).map(([k,v])=>{return k+'='+v}).join('&')
        }).then(response => response.json()).then(jsonResponse => {
        
            if (jsonResponse.isTaskSuccess == 'true') {
                localStorage.setItem('userEmail', jsonResponse.users[0].user_email);
                localStorage.setItem('userPass', jsonResponse.users[0].user_pass);
                localStorage.setItem('userName', jsonResponse.users[0].user_name);
                alert("Update successful!");
                window.location.href = '../html/dashboard.html';
                }
                else{
                    throw new Error(jsonResponse.response_msg)
                }
        }).catch(error => console.log(error));
      }
    });


 function toggleEditableState(input) {
    input.readOnly = !input.readOnly;
    if (!input.readOnly) {
      input.focus();
    }
  }
  
  profileInfoHandler.btnEditUsernameIcon.addEventListener('click', () => {
    toggleEditableState(profileInfoHandler.extUsername);
  });
  
  profileInfoHandler.btnEditPasswordIcon.addEventListener('click', () => {
    toggleEditableState(profileInfoHandler.extPassword);
  });
