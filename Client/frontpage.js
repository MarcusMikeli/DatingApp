let button = document.getElementById('submitbtn');
button.addEventListener('click', () => loginButton());

function loginButton() {
    let email = document.getElementById('idEmail');
    let psw = document.getElementById('idPassword');
    axios.post('http://localhost:3000/userSign/login/', { email: email.value, password: psw.value })
    .then(response => {
        console.log(response)
    })
}