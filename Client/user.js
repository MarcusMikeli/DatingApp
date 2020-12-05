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
    firstName.innerHTML = user.firstName;
    lastName.innerHTML = user.lastName;
    email.innerHTML = user.email;
    birthday.innerHTML = user.birthday;
    gender.innerHTML = user.gender;
    // bio.innerHTML = user.message[0].bio;
    console.log(showUser);
}


let button = document.getElementById('deletebtn');
button.addEventListener('click', (event) => {
event.preventDefault()  
    deleteButton()  
});

function deleteButton() {
    let user = JSON.parse(localStorage.getItem('activeUser'));
    axios.delete('http://localhost:3000/userSign/' + user._id)
    .then(response => {
        console.log(response)
        localStorage.removeItem('activeUser');
        window.location = 'frontpage.html';
    })
}

let editButton = document.getElementById('editbtn');
editButton.addEventListener('click', (event) => {
    event.preventDefault();
    location.href = 'updateuser.html'
})

// Man kunne clear local storage i browseren da API'et er stateless
let logoutButton = document.getElementById('logoutbtn');
logoutButton.addEventListener('click', (event) => {
event.preventDefault()  
    logout();
    window.location = "frontpage.html"
});

function logout() {
    localStorage.removeItem('activeUser');
};