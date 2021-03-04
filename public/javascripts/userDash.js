const profile = document.getElementById('profile');
const bookings = document.getElementById('bookings');
const services = document.getElementById('services');
const categories = document.getElementById('categories');
const results = document.getElementById('results');
const temp = document.getElementById('temp');
const updateBtn = document.getElementById('update');
const nameVal = document.getElementById('name');
const addressVal = document.getElementById('address');
const ven = document.getElementById('vendor');
const book = document.getElementById('book');
const logout = document.getElementById('logout');
const qty1 = document.getElementById('qty');
const date = document.getElementById('date');
const time = document.getElementById('time');
const serv = document.getElementById('serv');
let venId;
profile.addEventListener('click', async function prof() {

    const res = await axios.get("http://localhost:3000/api/v1/user/Info", {
        headers: {
            Authorization: localStorage.getItem('Authorization')
        }
    });
    if (res.data.data) {
        const data = res.data.data
        results.innerHTML = "";
        results.innerHTML = `
        <div id="prof" style="margin: 100px; border: 1px solid black;padding: 10px 100px;width:50%;background-color:#0d0445; color: white">
        <h3>User Profile</h3>
        <p><span style="color: orange;">Role: </span>${res.data.data.role}</p>
        <hr style="background-color:white">
        <p id="name"><span style="color: orange; padding: 0px 10px 0 0;">Name: </span><span id="name1">${res.data.data.name}</span></p>
        <p id="email"><span style="color: orange; padding: 0px 10px 0 0;float:left">Email: </span>${res.data.data.email}</p>
        <p id="address"><span style="color: orange; padding: 0px 10px 0 0;float:left">Address: </span><span id="address1">${res.data.data.address}</span></p>
        <p id="createdAt"><span style="color: orange; padding: 0px 10px 0 0;float:left">createdAt: </span>${res.data.data.createdAt}</p>
        <p id="updatedAt"><span style="color: orange; padding: 0px 10px 0 0;float:left">updatedAt: </span><span id="updatedAt1">${res.data.data.updatedAt}</span></p>
        <button id="updateBtn" data-toggle="modal" data-target="#mymodal" style="border-radius:5%">Update</button>
        <button id="cancelBtn" style="border-radius:5%">Cancel</button>
    </div>`;

        results.querySelector('#cancelBtn').addEventListener('click', () => {
            results.innerHTML = ""
        })

        results.querySelector('#updateBtn').addEventListener('click', () => {
            nameVal.value = `${res.data.data.name}`;
            addressVal.value = `${res.data.data.address}`;

        })

        updateBtn.addEventListener('click', async () => {
            const res1 = await axios.put("http://localhost:3000/api/v1/user/update", {
                name: nameVal.value,
                address: addressVal.value
            }, {
                headers: {
                    Authorization: localStorage.getItem('Authorization')
                },
            });
            results.querySelector('#name1').textContent = nameVal.value;
            results.querySelector('#address1').textContent = addressVal.value;
            results.querySelector('#updatedAt1').textContent = res1.data.data.updatedAt;
            prof();

        })
    } else {
        alert('Session Time out, Login Again');
        location.href = '../index.html';
        localStorage.removeItem('Authorization');
    }
})

services.addEventListener('click', async () => {
    const res = await axios.get("http://localhost:3000/api/v1/service/list-services", {
        headers: {
            Authorization: localStorage.getItem('Authorization')
        }
    });
    if (res.data.message === 'No user Found !') {
        alert('Session Time out, Login Again');
        location.href = '../index.html';
        localStorage.removeItem('Authorization');
    } else {
        results.innerHTML = "";
        console.log(res.data);
        res.data.data.forEach(el => {
            const node = temp.cloneNode(true);
            node.innerHTML = `
            <div id="boo" style="margin: 100px; border: 1px solid black;padding: 10px 100px;width:50%;background-color:#0d0445; color: white">
            <h3>Services</h3>
            <hr style="background-color:white">
            <p id="bookingDate"><span style="color: orange; padding: 0px 10px 0 0;">Name: </span><span id="name1">${el.name}</span></p>
            <p id="vendorID"><span style="color: orange; padding: 0px 10px 0 0;float:left">Description: </span>${el.description}</p>
            <p id="serviceID"><span style="color: orange; padding: 0px 10px 0 0;float:left">Price: </span><span id="address1">${el.price}</span></p>
            <p id="totalPrice"><span style="color: orange; padding: 0px 10px 0 0;float:left">service time: </span>${el.serviceTime}</p>
            <p id="qty"><span style="color: orange; padding: 0px 10px 0 0;float:left">Category: </span>${el.categoryID.name}</p>
            <p id="wow"><span  style="color: orange; padding: 0px 10px 0 0;float:left">Vendor : </span><span id="xy"></span></p>
            <br><button class= "oo" data-toggle="modal" data-target="#bookModal" style="border-radius:5%">Book
            </button>      
        </div>`;
            // console.log(el.vendorID);
            if (el.vendorID.length == 1) {


                for (let k = 0; k < el.vendorID.length; k++) {
                    console.log(el.vendorID[k].name);
                    node.content.querySelector('#wow').innerHTML += ` <p id="bookingStatus"><span id="updatedAt1">${el.vendorID[k].name}</span></p>`
                }
            } else {
                for (let k = 0; k < el.vendorID.length; k++) {
                    // const x1 = <p id="bookingStatus"><span style="color: orange; padding: 0px 10px 0 0;float:left">vendor: </span><span id="updatedAt1">${el.vendorID[k].name}</span></p>
                    if (k == el.vendorID.length - 1) {

                        node.content.querySelector('#wow #xy').innerHTML += ` <span id="bookingStatus"><span id="updatedAt1">${el.vendorID[k].name}</span></span>`
                    } else {
                        node.content.querySelector('#wow #xy').innerHTML += ` <span id="bookingStatus"><span id="updatedAt1">${el.vendorID[k].name} , </span></span>`
                    }
                }
            }

            node.content.querySelector('button').addEventListener('click', () => {
                ven.innerHTML = "";
                for (let j = 0; j < el.vendorID.length; j++) {

                    ven.innerHTML += `<option id="${el.vendorID[j]._id}" value='${el.vendorID[j]}'>${el.vendorID[j].name}</option>`

                }
                book.addEventListener('click', async () => {
                    console.log(el._id)
                    console.log(venId)
                    console.log(qty1.value)
                    console.log(date.value.toString());
                    // console.log(typeof hh)
                    console.log(time.value);

                    if (venId === undefined) {
                        venId = el.vendorID[0]._id;
                    }
                    const res2 = await axios.post("http://localhost:3000/api/v1/user/book", {
                        vendorID: venId,
                        serviceID: el._id,
                        qty: qty1.value,
                        bookingDate: date.value.toString(),
                        bookingTime: time.value
                    }, {
                        headers: {
                            Authorization: localStorage.getItem('Authorization')
                        }
                    }
                    );
                    console.log(res2)
                    if (res2.data.status === 'success') {

                        alert('Service Booked');
                    } else {
                        alert('Booking Failed, Try Again !');
                    }

                })
            })
            results.append(node.content);
        })
    }
});

function showOptions(s) {
    venId = s[s.selectedIndex].id; // get id
}

categories.addEventListener('click', async () => {
    const res = await axios.get("http://localhost:3000/api/v1/category/list-categories", {
        headers: {
            Authorization: localStorage.getItem('Authorization')
        }
    });
    console.log(res.data);



    if (!res.data.data) {
        alert('Session Time out, Login Again');
        location.href = '../index.html';
        localStorage.removeItem('Authorization');
    } else {
        results.innerHTML = ""
        res.data.data.forEach(el => {
            const node = temp.cloneNode(true);
            // results.innerHTML = "";
            // for (let i = 0; i < res.data.data.length; i++) {
            //     console.log(i);
            node.innerHTML += `
    <div id="cat" style="margin: 10px 10px 0px 10px; border: 1px solid black;padding: 10px 50px;background-color:#0d0445; color: white">
    <h3>Categories</h3>
    <hr style="background-color:white">
    <p id="category"><span style="color: orange; padding: 0px 10px 0 0;">Name: </span><span id="cat">${el.name}</span></p>
    
    
</div>`;
            node.content.querySelector('#category').addEventListener('click', async () => {
                
                const res5 = await axios.get(`http://localhost:3000/api/v1/service/get-category-services?id=${el._id}`, {

                    headers: {
                        Authorization: localStorage.getItem('Authorization')
                    }
                }
                );

                res5.data.data.forEach(el1 => {

                    node.innerHTML += `
                    <div id="cat" style="margin: 10px 10px 0 10px; border: 1px solid black;padding: 10px 10px;background-color:#a8b2e6; color: black">
                    <h3>${el.name}</h3>
                    <hr style="background-color:white">
                    <p id="service"><span style="color: #; padding: 0px 10px 0 0;">Service: </span><span id="cat">${el1.name}</span></p>
                    </div>`
                })
                
                
                serv.append(node.content);
                    
                
            console.log(res5);
        })
        results.append(node.content);
    })
    }
});


bookings.addEventListener('click', async () => {
    const res = await axios.get("http://localhost:3000/api/v1/user/bookings", {
        headers: {
            Authorization: localStorage.getItem('Authorization')
        }
    });
    console.log(res);
    if (res.data.data) {
        results.innerHTML = "";
        res.data.data.forEach(el => {
            const node = temp.cloneNode(true);

            node.innerHTML += `
    <div id="boo" style="margin: 100px; border: 1px solid black;padding: 10px 100px;width:50%;background-color:#0d0445; color: white">
    <h3>Bookings</h3>
    <hr style="background-color:white">
    <p id="bookingDate"><span style="color: orange; padding: 0px 10px 0 0;">bookingDate: </span><span id="name1">${el.bookingDate}</span></p>
    <p id="bookingTime"><span style="color: orange; padding: 0px 10px 0 0;">bookingTime: </span><span id="name1">${el.bookingTime}</span></p>
    <p id="vendorID"><span style="color: orange; padding: 0px 10px 0 0;float:left">vendorID: </span>${el.vendorID}</p>
    <p id="serviceID"><span style="color: orange; padding: 0px 10px 0 0;float:left">serviceID: </span><span id="address1">${el.serviceID}</span></p>
    <p id="totalPrice"><span style="color: orange; padding: 0px 10px 0 0;float:left">totalPrice: </span>${el.totalPrice}</p>
    <p id="qty"><span style="color: orange; padding: 0px 10px 0 0;float:left">Qty: </span>${el.qty}</p>
    <p id="bookingStatus"><span style="color: orange; padding: 0px 10px 0 0;float:left">bookingStatus: </span><span id="updatedAt1">${el.bookingStatus}</span></p>
    <p id="cancelBtn" style="display:none;"><button id="cancelBook">Cancel Booking</button>
</div>`;

            if (el.bookingStatus === 'pending') {
                node.content.querySelector('#cancelBtn').style.display = 'block';
                node.content.querySelector('#cancelBtn').addEventListener('click', async () => {
                    const res4 = await axios.put("http://localhost:3000/api/v1/user/cancel", {
                        bookingId: el._id
                    }, {
                        headers: {
                            Authorization: localStorage.getItem('Authorization')
                        }
                    });
                    if (res4.data === 'Booking Cancel') {
                        alert('Booking Cancelled');
                    } else {
                        alert("Failed, Try Again !");
                    }
                })
            }
            results.append(node.content);

        })
    }
    else {
        results.innerHTML = "";
        alert('Session TIme out, Login Again !');
        localStorage.removeItem('Authorization');
        location.href = '../index.html';
    }
})

logout.addEventListener('click', async () => {
    location.href = '../index.html'
    localStorage.removeItem('Authorization');

})