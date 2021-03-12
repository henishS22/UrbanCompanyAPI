// const cons = require("consolidate");
const user = document.getElementById('email');
const pass = document.getElementById('password');
const emailErr = document.getElementById('emailErr');
const links = document.getElementById('links')
const form = document.getElementById('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
})
const btn = document.getElementById('btn');
btn.addEventListener('click', async () => {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(user.value)) {
        // console.log(user.value)
        // console.log(pass.value)
        const res = await axios.put(`${window.location.origin}/api/v1/user/login`, {
            email: user.value,
            password: pass.value
        })
        console.log(res.data);
        if (res.data.status === 'success') {
            if (res.data.role === 'customer') {
                location.href = '/profile'
                // form.action = '/pages/profile'
                // form.method = 'get'

            } else if (res.data.role === 'vendor') {
                
            } else if (res.data.role === 'admin') {
                // location.href = '../views/pages/profile.ejs'
                location.href = '/admin'
            }
            localStorage.setItem('Authorization', res.data.token);
        } else {
            emailErr.textContent = res.data;
        }
    }
})
