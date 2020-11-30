const axios = require('axios').default;

function loginButton() {
    axios.get('http://localhost:3000/login/')
    .then(response => {
        console.log(response)
    })
    }