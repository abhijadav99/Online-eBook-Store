let userManageHandler = {};

userManageHandler.Email = document.getElementById("EMAIL");
userManageHandler.PassWord = document.getElementById("PASSWORD");
userManageHandler.Username = document.getElementById("USERNAME");
userManageHandler.btnAddUser = document.getElementById("BTN_ADD_USER");

document.addEventListener("DOMContentLoaded", function() {
  fetchUsers();
});

function fetchUsers() {
  fetch('http://localhost/api/fetch_users.php')
      .then(response => response.json())
      .then(data => {
          displayUsers(data);
      })
      .catch(error => console.error('Error fetching users:', error));
}

function displayUsers(users) {
  let userListDiv = document.getElementById('userList');
  userListDiv.innerHTML = '';

  users.forEach(user => {
    const userElement = document.createElement('div');
    const userDetails = document.createElement('div');
    userDetails.classList.add('col-4');
    userDetails.innerHTML = `

    <div class="container_edittext">
    <i class="icon_edittext1 fas fa-user"></i>
    <p class="edittext" type="text" id="USERNAME" maxlength="22" placeholder="Full Name">${user.user_name}</p>
    </div>
    <div class="container_edittext">
    <i class="icon_edittext1 fas fa-envelope"></i>
    <p class="edittext" type="email" id="EMAIL" maxlength="32" placeholder="Email">${user.user_email}</p>
    </div>
    <div class="container_edittext">
    <i class="icon_edittext1 fas fa-lock"></i>
    <p class="edittext" type="password" id="PASSWORD" maxlength="16" placeholder="Password">${user.user_pass}</p>
    </div>
    <button id="BTN_ADD_USER" class="btn_pink" onclick="editUser(${user.id}, '${user.user_name}', '${user.user_email}')">Edit</button>
    <button id="BTN_DELETE_USER" class="btn_pink" onclick="deleteUser(${user.id})">Delete</button>
        
    `;
    userElement.appendChild(userDetails);
    
    userListDiv.appendChild(userElement);
});
}

function editUser(id,username,email) {
  document.getElementById('editId').value = id;
    document.getElementById('editUsername').value = username;
    document.getElementById('editEmail').value = email;
    document.getElementById('editForm').style.display = 'block';
}
function cancelEdit() {
  document.getElementById('editForm').style.display = 'none';
}
function updateUser() {
console.log(document.getElementById('editId').value);
 console.log(document.getElementById('editUsername').value);
 console.log(document.getElementById('editEmail').value);

  fetch('http://localhost/api/edit_user.php', {
      method: 'POST',
      headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
      body: Object.entries({
        id: document.getElementById('editId').value,
        user_name: document.getElementById('editUsername').value,
        user_email: document.getElementById('editEmail').value
    }).map(([k,v])=>{return k+'='+v}).join('&')
  })
  .then(response => response.text())
  .then(data => {
      console.log(data);
      fetchUsers(); // Refresh user list
      document.getElementById('editForm').style.display = 'none';
  })
  .catch(error => console.error('Error updating user:', error));
}

function deleteUser(id) {
  if (confirm('Are you sure you want to delete this user?')) {
    fetch('http://localhost/api/delete_user.php', {
      method: 'POST',
      headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
      body: Object.entries({
          id :id         
      }).map(([k,v])=>{return k+'='+v}).join('&')
  
      
      }).then(response => response.json())
      .then(jsonResponse => {
          console.log(jsonResponse.books);
          fetchUsers(); // Refresh user list
      })
      .catch(error => console.error('Error deleting user:', error));
  }
}
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
                      fetchUsers();
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