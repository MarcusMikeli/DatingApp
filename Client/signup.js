let button = document.getElementById('submitbtn');
button.addEventListener('click', () => loginButton());

function loginButton() {
    let firstName = document.getElementById('first_name');
    let lastName = document.getElementById('last_name');
    let email = document.getElementById('user_email');
    let psw = document.getElementById('user_psw');
    let birthday = document.getElementById('user_birthday');
    let swagbutton = document.querySelector('input[name="gender"]:checked').value;
    //let bio = document.querySelector('input[id="bio"]');
    console.log(swagbutton);
    axios.post('http://localhost:3000/userSign/signup/', { email: email.value, password: psw.value, 
        firstName: firstName.value, lastName: lastName.value, birthday: birthday.value, gender: swagbutton, /*bio: bio.value*/})
    .then(response => {
        console.log(response)
        window.location = 'user.html';
    })
} 