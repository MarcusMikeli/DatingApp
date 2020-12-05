let button = document.getElementById('submitbtn');
button.addEventListener('click', () => signupButton());

function signupButton() {
    let firstName = document.getElementById('first_name');
    let lastName = document.getElementById('last_name');
    let email = document.getElementById('user_email');
    let psw = document.getElementById('user_psw');
    let birthday = document.getElementById('user_birthday');
    let swagbutton = document.querySelector('input[name="gender"]:checked').value;
    //let bio = document.querySelector('input[id="bio"]');
    console.log(signupButton);

    axios.post('http://localhost:3000/userSign/signup', { email: email.value, password: psw.value, 
        firstName: firstName.value, lastName: lastName.value, birthday: birthday.value, gender: swagbutton, /*bio: bio.value*/})
    .then(response => {
        console.log(response)
        localStorage.setItem('activeUser', JSON.stringify(response.data.message))
        window.location = 'user.html';
    })
} 