let userManageHandler = {};

userManageHandler.Email = document.getElementById("EMAIL");
userManageHandler.PassWord = document.getElementById("PASSWORD");
userManageHandler.Username = document.getElementById("USERNAME");
userManageHandler.btnAddUser = document.getElementById("BTN_ADD_USER");

userManageHandler.validateInputs = () => {

    userManageHandler.Username.classList.remove('invalid_edittext');
    userManageHandler.Email.classList.remove('invalid_edittext');
    userManageHandler.PassWord.classList.remove('invalid_edittext');

    if (userManageHandler.Username.value.length < 3) {
        userManageHandler.Username.classList.add('invalid_edittext');
        return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userManageHandler.Email.value)) {
        userManageHandler.Email.classList.add('invalid_edittext');
        return false;
    }

    if (userManageHandler.PassWord.value.length < 8) {
        userManageHandler.PassWord.classList.add('invalid_edittext');
        return false;
    }

    return true;
}

userManageHandler.btnAddUser.addEventListener("click", (e) => {
    if (userManageHandler.validateInputs()) {
            fetch('http://localhost/api/adminAddNewUser.php', {
            method: 'POST',
            headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: Object.entries({
                user_name :userManageHandler.Username.value,
                user_email: userManageHandler.Email.value,
                user_pass: userManageHandler.PassWord.value            
            }).map(([k,v])=>{return k+'='+v}).join('&')

            
            }).then(response => response.json())
            
            
            .then(jsonResponse => {
                    //redirect to dashboard
                    if (jsonResponse.isTaskSuccess == 'true') {
                        userManageHandler.Username.value = '';
                        userManageHandler.Email.value = '';
                        userManageHandler.PassWord.value = '';
                    }
                    else{
                        throw new Error(jsonResponse.response_msg);
                    }
            }).catch(error => userManageHandler.setAuthenticationError(error));
    }
});

userManageHandler.setAuthenticationError = (error) => {
    alert(error);
}

document.addEventListener("DOMContentLoaded", () => {
    const booksList = document.getElementById("books-container");
    // Fetch data from API
    fetch('http://localhost/api/adminUserManagementList.php')
        .then(response => response.json())

        .then(jsonResponse => {
            jsonResponse.users.forEach(user => {
                const bookElement = document.createElement('div');
                const bookDetails = document.createElement('div');
                bookDetails.classList.add('col-4');
                bookDetails.innerHTML = `

                <div class="container_edittext margin_top">
                <i class="icon_edittext fas fa-user"></i>
                <p class="edittext" type="text" id="USERNAME" maxlength="22" placeholder="Full Name">${user.user_name}</p>
                </div>
                <div class="container_edittext margin_top">
                <i class="icon_edittext fas fa-envelope"></i>
                <p class="edittext" type="email" id="EMAIL" maxlength="32" placeholder="Email">${user.user_email}</p>
                </div>
                <div class="container_edittext margin_top">
                <i class="icon_edittext fas fa-lock"></i>
                <p class="edittext" type="password" id="PASSWORD" maxlength="16" placeholder="Password">${user.user_pass}</p>
                </div>
                <button id="BTN_ADD_USER" class="btn_pink margin_top" type="submit">Edit</button>
                <button id="BTN_DELETE_USER" class="btn_pink margin_top" type="submit">Delete</button>
                    
                `;
                bookElement.appendChild(bookDetails);
                
                booksList.appendChild(bookElement);
                //click on div and redirect to course details
                // bookElement.addEventListener("click", (e) => {
                //     //Redirect To Course Content Page
                //     window.location.href = `bookDetail.html?${new URLSearchParams(book).toString()}`;
                // });
            });
        })

});