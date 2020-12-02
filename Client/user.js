window.onload = function() {
    showUser();
}
function showUser() {
    let firstName = document.getElementById('firstName');
    let lastName = document.getElementById('lastName');
    let email = document.getElementById('email');
    let birthday = document.getElementById('birthday');
    let gender = document.getElementById('gender');
    // let bio = document.getElementById('bio');

    let user = JSON.parse(localStorage.getItem('activeUser'));
    firstName.innerHTML = user.message[0].firstName;
    lastName.innerHTML = user.message[0].lastName;
    email.innerHTML = user.message[0].email;
    birthday.innerHTML = user.message[0].birthday;
    gender.innerHTML = user.message[0].gender;
    // bio.innerHTML = user.message[0].bio;
    console.log(user);
}

let button = document.getElementById('deletebtn');
button.addEventListener('click', (event) => {
event.preventDefault()  
    deleteButton()  
});

function deleteButton() {
    let user = JSON.parse(localStorage.getItem('activeUser'));
    axios.delete('http://localhost:3000/userSign/' + user.message[0]._id)
    .then(response => {
        console.log(response)
        window.location = 'frontpage.html';
    })
}

let logoutButton = document.getElementById('logoutbtn');
logoutButton.addEventListener('click', (event) => {
event.preventDefault()  
    deleteButton()  
});

function logout() {
    axios.get('http://localhost:3000/userSign/logout')
    .then(respone => {
        console.log(response)
    })
}

