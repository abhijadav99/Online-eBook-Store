const userManagement = document.getElementById("userManagementBox");
const bookManagement = document.getElementById("bookManagementBox");
userManagement.addEventListener('click',(e) => {
    window.location.href = '../html/userManagement.html';
});
bookManagement.addEventListener('click',(e) => {
    window.location.href = '../html/bookManagement.html';
})