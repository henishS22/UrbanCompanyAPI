// const cons = require("consolidate");

const user = document.getElementById('email');
const pass = document.getElementById('password');
const emailErr = document.getElementById('emailErr');

const form = document.getElementById('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
})
const btn = document.getElementById('btn');
btn.addEventListener('click', async () => {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(user.value)) {
        // console.log(user.value)
        // console.log(pass.value)
        const res = await axios.put("http://localhost:3000/api/v1/user/login", {
            email: user.value,
            password: pass.value
        })
        console.log(res.data);
        if (res.data.status === 'success') {
            if (res.data.role === 'customer') {
                location.href = '../profile.html'
            } else if (res.data.role === 'vendor') {
                
            } else if (res.data.role === 'admin') {
                location.href = '../profile.html'
            }
            localStorage.setItem('Authorization', res.data.token);
        } else {
            emailErr.textContent = res.data;
        }
    }
})
