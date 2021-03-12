const categories = document.getElementById('categories');
const services = document.getElementById('service11');
const name1 = document.getElementById('name');
const price = document.getElementById('price');
const desc = document.getElementById('desc');
const time = document.getElementById('time');
const add = document.getElementById('add');
const catOption = document.getElementById('catOption');
const logout = document.getElementById('logout1');
const p2 = document.getElementById('p2');
const showDiv = document.getElementById('showDiv');
const catName = document.getElementById('catName');
const s1 = document.getElementById('s1')
const s2 = document.getElementById('s2')
const s3 = document.getElementById('s3')
const s4 = document.getElementById('s4')
const s5 = document.getElementById('s5')
const name2 = document.getElementById('name3')
const email =document.getElementById('email')
const address = document.getElementById('address')
const searchUser = document.getElementById('searchUser');
const searchOption = document.getElementById('searchOption');

let re2;
let catId;
let res1;
let count = 0;

async function showProfile() {
     re2 = await axios.get(`${window.location.origin}/api/v1/user/Info`, {
        headers: {
            Authorization: localStorage.getItem('Authorization')
        }
    })
    console.log(re2);
    location.href = `/admin-profile?id=${re2.data.data._id}`
}

async function updateProfile(id) {
    const e1 = await axios.put(`${window.location.origin}/api/v1/user/update`, {
        name: name2.value,
        email: email.value,
        address:address.value
    },{
        headers: {
            Authorization: localStorage.getItem('Authorization')
        }
    })
    location.href = `/admin-profile?id=${id}`
}


async function showUsers() {
    location.href = '/all-users'
}

async function search() {
    const id = searchUser.value;
    await axios.get(`${window.location.origin}/api/v1/user/Info?id=${id}`, {
        headers: {
            Authorization: localStorage.getItem('Authorization')
        }
    })
    location.href = `/all-users?id=${id}`
}


async function searchStat() {
    console.log(searchOption.value);
    location.href = `/bookings?status=${searchOption.value}`
}

async function searchVen() {
    location.href = `/all-users?search=vendors`
}

async function searchCus() {
    location.href = `/all-users?search=customers`
}

services.addEventListener('click', async () => {
    count++;
    res1 = await axios.get(`${window.location.origin}/api/v1/category/list-categories`,
        {
            headers: {
                Authorization: localStorage.getItem('Authorization')
            }
        }
    );
    console.log(res1.data);
    if (count == 1) {
        res1.data.data.forEach(el => {
            catOption.innerHTML += `<option id="${el._id}">${el.name}</option>`
        })
    }
})

add.addEventListener('click', async () => {

    if (catId === undefined) {
        catId = res1.data.data[0]._id;
    }
    const res = await axios.post(`${window.location.origin}/api/v1/service/add-service`,
        {
            name: name1.value,
            price: price.value,
            description: desc.value,
            serviceTime: time.value,
            categoryID: catId
        },
        {
            headers: {
                Authorization: localStorage.getItem('Authorization')
            }
        },
    );
    if (res.data.message == 'Service Added') {
        alert('Service Added Succesfully');
        location.href = '/services'
    }
})


async function showCategories() {
    location.href = '/categories';
}

async function showCat(id) {
    location.href = `/category-detail?id=${id}`;
    // alert(id);
}

async function updateCat(id) {
    const ree = await axios.put(`${window.location.origin}/api/v1/category/update?id=${id}`, {
        name: p2.value
    }, {
        headers: {
            Authorization: localStorage.getItem('Authorization')
        }
    });
    console.log(ree);
    location.href = `/category-detail?id=${id}`;
}

async function deleteCat(id) {
    await axios.delete(`${window.location.origin}/api/v1/category/delete-category?id=${id}`, {
        headers: {
            Authorization: localStorage.getItem('Authorization')
        }
    })
    location.href = `/categories`;
}

async function addCategory() {
    showDiv.style.display = 'block';
}

async function addCat() {
    await axios.post(`${window.location.origin}/api/v1/category/add-category`, {
        name: catName.value
    },
        {
            headers: {
                Authorization: localStorage.getItem('Authorization')
            }
        })
    location.href = '/categories';
}

async function showBook() {
    location.href = '/bookings'
}


async function showServices() {
    location.href = '/services'
}

async function showServ(id) {
    location.href = `/service-detail?id=${id}`
}

async function updateServ(id) {
    console.log(s1.value);
    console.log(id);
    const rees = await axios.put(`${window.location.origin}/api/v1/service/update?id=${id}`, {
        name: s1.value,
        price: s2.value,
        description: s3.value,
        serviceTime: s4.value
    },{
        headers: {
            Authorization: localStorage.getItem('Authorization')
        }
    });
    console.log(rees);
    location.href = `/service-detail?id=${id}`
}

async function deleteServ(id) {
    await axios.delete(`${window.location.origin}/api/v1/service/delete-service?id=${id}`, {
        headers: {
            Authorization: localStorage.getItem('Authorization')
        }
    })
    location.href = '/services'
}

function logout1(){
    location.href = '/';
    localStorage.removeItem('Authorization');
}

function showOptions(s) {
    catId = s[s.selectedIndex].id; // get id
}