window.onload = function() {
    showUser();
}
function showUser() {
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let birthday = document.getElementById('birthday');
    let gender = document.getElementById('gender');

    let user = JSON.parse(localStorage.getItem('activeUser'));
    name.innerHTML = user.message.firstName
    email.innerHTML = user.message.email
    birthday.innerHTML = user.message.birthday
    gender.innerHTML = user.message.gender
    console.log(user);
}

