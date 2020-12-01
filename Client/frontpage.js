let createbtn =document.getElementById("redirect");
createbtn.addEventListener('click', (event) => {
    location.href = "./signup.html";
})
    

let button = document.getElementById('submitbtn');
button.addEventListener('click', (event) => {
event.preventDefault()  
    loginButton()  
});

function loginButton() {
    let email = document.getElementById('idEmail');
    let psw = document.getElementById('idPassword');
    axios.post('http://localhost:3000/userSign/login/', { email: email.value, password: psw.value })
    .then(response => {
        console.log(response)
        localStorage.setItem('activeUser', JSON.stringify(response.data))
        window.location = 'user.html';
    })
}
