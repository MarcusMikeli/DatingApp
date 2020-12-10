let user = JSON.parse(localStorage.getItem('activeUser'));

/*document.getElementById('first_name').value = user.message[0].firstName
document.getElementById('last_name').value = user.message[0].lastName
document.getElementById('user_email').value = user.message[0].email*/
// document.getElementById('gender').value = user.message[0].gender
// document.getElementById('birthday').value = user.message[0].birthday
// document.getElementById('psw').value = user.message[0].password

let cancelButton = document.getElementById('cancelbtn');
cancelButton.addEventListener('click', (event) => {
    event.preventDefault();
    location.href = 'user.html'
})

let updateButton = document.getElementById('updatebtn');
updateButton.addEventListener('click', (event) => {
    event.preventDefault();
    update();
})

function update() {
    let firstName = document.getElementById('first_name');
    let lastName = document.getElementById('last_name');
    let email = document.getElementById('user_email');
    let birthday = document.getElementById('user_birthday');
    let gender = document.querySelector('input[name="gender"]:checked');
    let user = JSON.parse(localStorage.getItem('activeUser'));
    axios.put('http://localhost:3000/userSign/' + user._id, 
        { email: email.value,  
        firstName: firstName.value, 
        lastName: lastName.value,
        birthday: birthday.value,
        gender: gender.value })
        .then(response => {
            localStorage.setItem('activeUser', JSON.stringify(response.data))
            console.log(response);
            window.location='user.html'
        })
} 