let days = document.querySelector('.days .number'),
    hours = document.querySelector('.hours .number'),
    minutes = document.querySelector('.minutes .number'),
    seconds = document.querySelector('.seconds .number'),
    //Natale
    countDownDate = new Date("Dec 24, 2022 23:59:59").getTime();

let counter = setInterval(() => {
    //Data odierna
    let dateNow = new Date().getTime();
    //Distanza tra data odierna e Natale
    let dateDiff = countDownDate - dateNow;

    //A partire dalla data ottenuta prendo giorni,ore,minuti e secondi
    let day = Math.floor(dateDiff / (1000 * 60 * 60 * 24));
    let hour = Math.floor((dateDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minute = Math.floor((dateDiff % (1000 * 60 * 60)) / (1000 * 60));
    let second = Math.floor((dateDiff % (1000 * 60)) / 1000);

    days.innerHTML = day < 10 ? `0${day}` : day;
    hours.innerHTML = hour < 10 ? `0${hour}` : hour;
    minutes.innerHTML = minute < 10 ? `0${minute}` : minute;
    seconds.innerHTML = second < 10 ? `0${second}` : second;

    if (dateDiff == 0) {
        clearInterval(counter);
    }
}, 1000);

//Funzione per il loader
function loader() {
    document.querySelector('.loader').classList.add('fade-out');
}

function fadeOut() {
    setInterval(loader, 3000);
}

window.onload = fadeOut();



//snow

let canvas = document.getElementById("snow");
let ctx = canvas.getContext("2d");
let particlesOnScreen = 245;
let particlesArray = [];
let w,h;
w = canvas.width = window.innerWidth;
h = canvas.height = window.innerHeight;

function random(min, max) {
    return min + Math.random() * (max - min + 1);
};

function clientResize(ev){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
};
window.addEventListener("resize", clientResize);

function createSnowFlakes() {
    for(let i = 0; i < particlesOnScreen; i++){
        particlesArray.push({
            x: Math.random() * w,  
            y: Math.random() * h,  
            opacity: Math.random(),  
            speedX: random(-11, 11),  
            speedY: random(2, 7),    
            radius:random(0.5, 4.2),
        })
    }
};

function drawSnowFlakes(){
    for(let i = 0; i < particlesArray.length; i++){    
        let gradient = ctx.createRadialGradient(  
            particlesArray[i].x,   
            particlesArray[i].y,   
            0,                     
            particlesArray[i].x,   
            particlesArray[i].y,   
            particlesArray[i].radius  
            );

            gradient.addColorStop(0, "rgba(255, 255, 255," + particlesArray[i].opacity + ")");  // white
            gradient.addColorStop(.8, "rgba(210, 236, 242," + particlesArray[i].opacity + ")");  // bluish
            gradient.addColorStop(1, "rgba(237, 247, 249," + particlesArray[i].opacity + ")");   // lighter bluish

            ctx.beginPath(); 
            ctx.arc(
            particlesArray[i].x,  
            particlesArray[i].y,  
            particlesArray[i].radius,  
            0,                         
            Math.PI*2,                 
            false                     
            );

        ctx.fillStyle = gradient;   
        ctx.fill();                 
    }
};

function moveSnowFlakes(){
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].x += particlesArray[i].speedX;     
        particlesArray[i].y += particlesArray[i].speedY;     

        if (particlesArray[i].y > h) {                                                                               
            particlesArray[i].x = Math.random() * w * 1.5;
            particlesArray[i].y = -50;
        }
    }
};

function updateSnowFall  () {
    ctx.clearRect(0, 0, w, h);
    drawSnowFlakes();
    moveSnowFlakes();
};

setInterval(updateSnowFall,50);
createSnowFlakes();