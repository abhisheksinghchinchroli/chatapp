const socket = io("https://chatapp-uebu.onrender.com"); //ye apne jo bhi wifi se connect ho usko aip address dal do

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".box");

var audio = new Audio('ringtone.mp3');

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerHTML = message;
    messageElement.classList.add("message");
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position == 'left') {
        audio.play();
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`<span class="username">You:</span> ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = "";

})

// const name = prompt("Enter your name to join");
// socket.emit('new-user-joined', name);   // isko comment krne ka mtlb ye hai kyuki null joined the chat aa rha hai starting mein isliye 


// let name;
// while (!name) {
//     name = prompt("Enter your name to join");
// }
// socket.emit("new-user-joined", name);   // ihs se starting m jese hi prompt cancel hoga to null vgra bilkul nhi aayega type kiya hua name hi aayega 

// let name = prompt("Enter your name to join");

// if (!name || name.trim() === "") {
//     name = "Guest";
// }

// socket.emit("new-user-joined", name); // ye vaps se ihsliye change kiya kyuki ye krne se ab mobile mein bhi chalu ho jayega iske bina prompt dhng se kam nhi  kr rha tha

let name;
while (!name || name.trim() === "") {
    name = prompt("Enter your name to join"); // keeps asking until user enters something
}
socket.emit("new-user-joined", name);





socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'right')
});

socket.on('receive', data => {
    append(`<span class="username">${data.name}:</span> ${data.message}`, 'left') //yha span ke use se vo chij bold ho gyi
});

socket.on('left', name => {
    append(`${name} left the chat`, 'right')
});