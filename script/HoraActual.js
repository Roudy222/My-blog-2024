// Agrega la hora actual

const now = new Date();
console.log();
setInterval(() =>{
const now = new Date();
document.getElementById("hora").innerHTML= now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
}, 1);
