/* ============================= */
/* CAR DATA */
/* ============================= */

let cars = [

{
name:"Ferrari",
speed:"340 km/h",
power:"950 HP",
acc:"0-100 in 2.9 sec",
img:"images/car1.jpg",
desc:"Ferrari is one of the fastest supercars known for speed and luxury."
},

{
name:"Lamborghini",
speed:"350 km/h",
power:"980 HP",
acc:"0-100 in 2.8 sec",
img:"images/car2.jpg",
desc:"Lamborghini is famous for its aggressive design and insane power."
},

{
name:"Bugatti",
speed:"420 km/h",
power:"1600 HP",
acc:"0-100 in 2.4 sec",
img:"images/car3.jpg",
desc:"Bugatti is the king of speed and the fastest production car."
},

{
name:"McLaren",
speed:"330 km/h",
power:"903 HP",
acc:"0-100 in 2.7 sec",
img:"images/car4.jpg",
desc:"McLaren combines lightweight engineering with extreme performance."
},

{
name:"Porsche",
speed:"330 km/h",
power:"750 HP",
acc:"0-100 in 2.6 sec",
img:"images/car5.jpg",
desc:"Porsche is known for precision engineering and iconic design."
},

{
name:"Koenigsegg",
speed:"480 km/h",
power:"1700 HP",
acc:"0-100 in 2.5 sec",
img:"images/car6.jpg",
desc:"Koenigsegg builds some of the most advanced hypercars in the world."
},

{
name:"Pagani",
speed:"370 km/h",
power:"800 HP",
acc:"0-100 in 2.8 sec",
img:"images/car7.jpg",
desc:"Pagani cars are famous for art-like design and insane engineering."
},

{
name:"Aston Martin",
speed:"340 km/h",
power:"715 HP",
acc:"0-100 in 3.2 sec",
img:"images/car8.jpg",
desc:"Aston Martin combines luxury with powerful grand touring performance."
},

{
name:"Tesla Roadster",
speed:"400 km/h",
power:"1000 HP",
acc:"0-100 in 1.9 sec",
img:"images/car9.jpg",
desc:"Tesla Roadster is an electric hypercar with unbelievable acceleration."
},

{
name:"Nissan GT-R",
speed:"315 km/h",
power:"600 HP",
acc:"0-100 in 2.9 sec",
img:"images/car10.jpg",
desc:"Nissan GT-R is known as Godzilla for its insane performance."
}

];

let currentCarIndex = 0;


/* ============================= */
/* MODAL SYSTEM */
/* ============================= */

function showDetails(carName){

for(let i=0;i<cars.length;i++){

if(cars[i].name === carName){
currentCarIndex = i;
break;
}

}

updateModal();

document.getElementById("carModal").style.display="flex";

}

function updateModal(){

let car = cars[currentCarIndex];

document.getElementById("modalTitle").innerText = car.name;

document.getElementById("modalText").innerHTML =
"Top Speed: " + car.speed + "<br>" +
"Power: " + car.power + "<br>" +
"Acceleration: " + car.acc + "<br><br>" +
car.desc;

document.getElementById("modalImage").src = car.img;

}

function nextCar(){

currentCarIndex++;

if(currentCarIndex >= cars.length){
currentCarIndex = 0;
}

updateModal();

}

function prevCar(){

currentCarIndex--;

if(currentCarIndex < 0){
currentCarIndex = cars.length-1;
}

updateModal();

}

function closeModal(){

document.getElementById("carModal").style.display="none";

}


/* ============================= */
/* DARK MODE */
/* ============================= */

function toggleMode(){

document.body.classList.toggle("dark-mode");

let btn = document.getElementById("modeBtn");

if(document.body.classList.contains("dark-mode")){
btn.innerHTML="☀️ Light Mode";
}else{
btn.innerHTML="🌙 Dark Mode";
}

}


/* ============================= */
/* HERO SLIDER */
/* ============================= */

let heroImages=[
"images/car1.jpg",
"images/car2.jpg",
"images/car3.jpg"
];

let heroIndex=0;

function showHero(){
document.getElementById("heroImage").src=heroImages[heroIndex];
}

function nextHero(){

heroIndex++;

if(heroIndex>=heroImages.length){
heroIndex=0;
}

showHero();

}

function prevHero(){

heroIndex--;

if(heroIndex<0){
heroIndex=heroImages.length-1;
}

showHero();

}

setInterval(nextHero,4000);


/* ============================= */
/* SEARCH */
/* ============================= */

function searchCar(){

let input=document.getElementById("searchBox").value.toLowerCase();

let cards=document.querySelectorAll(".car-card");

cards.forEach(function(card){

let title=card.querySelector("h3").innerText.toLowerCase();

if(title.includes(input)){
card.style.display="block";
}else{
card.style.display="none";
}

});

}


/* ============================= */
/* LOADER */
/* ============================= */

window.addEventListener("load",function(){

let loader=document.getElementById("loader");

setTimeout(function(){
loader.style.display="none";
},1000);

});


/* ============================= */
/* SCROLL ANIMATION */
/* ============================= */

window.addEventListener("scroll",function(){

let cards=document.querySelectorAll(".car-card");

cards.forEach(function(card){

let position=card.getBoundingClientRect().top;
let screenHeight=window.innerHeight;

if(position<screenHeight-100){
card.classList.add("show");
}

});

});


/* ============================= */
/* FAVORITES */
/* ============================= */

let favorites=JSON.parse(localStorage.getItem("favorites"))||[];

updateFavCount();

window.addEventListener("load",function(){

let list=document.getElementById("favoriteList");

favorites.forEach(function(car){
addFavoriteToList(car);
});

});

function addFavorite(car){

if(!favorites.includes(car)){

favorites.push(car);

localStorage.setItem("favorites",JSON.stringify(favorites));

addFavoriteToList(car);

updateFavCount();

showToast();

}else{

alert("Already in favorites!");

}

}

function addFavoriteToList(car){

let list=document.getElementById("favoriteList");

let item=document.createElement("li");

item.innerHTML=car+` <button onclick="removeFavorite('${car}')">❌</button>`;

list.appendChild(item);

}

function removeFavorite(car){

favorites=favorites.filter(f=>f!==car);

localStorage.setItem("favorites",JSON.stringify(favorites));

location.reload();

}

function updateFavCount(){

let count=document.getElementById("favCount");

if(count){
count.innerText=favorites.length;
}

}


/* ============================= */
/* TOAST */
/* ============================= */

function showToast(){

let toast=document.getElementById("toast");

toast.style.display="block";

setTimeout(function(){
toast.style.display="none";
},2000);

}


/* ============================= */
/* CAR COMPARISON */
/* ============================= */

function compareCars(){

let car1=document.getElementById("car1").value;
let car2=document.getElementById("car2").value;

let data={

Ferrari:{speed:"340 km/h",engine:"V8",zero:"2.9 sec"},
Lamborghini:{speed:"350 km/h",engine:"V12",zero:"2.8 sec"},
Bugatti:{speed:"420 km/h",engine:"W16",zero:"2.4 sec"}

};

let result=`
<h3>Comparison Result</h3>
<p><b>${car1}</b> vs <b>${car2}</b></p>
<p>Top Speed: ${data[car1].speed} | ${data[car2].speed}</p>
<p>Engine: ${data[car1].engine} | ${data[car2].engine}</p>
<p>0-100 km/h: ${data[car1].zero} | ${data[car2].zero}</p>
`;

document.getElementById("compareResult").innerHTML=result;

}


/* ============================= */
/* GALLERY */
/* ============================= */

let galleryIndex=0;

function nextGallery(){

let track=document.getElementById("galleryTrack");

galleryIndex++;

if(galleryIndex>2){
galleryIndex=0;
}

track.style.transform="translateX("+(-250*galleryIndex)+"px)";

}

function prevGallery(){

let track=document.getElementById("galleryTrack");

galleryIndex--;

if(galleryIndex<0){
galleryIndex=2;
}

track.style.transform="translateX("+(-250*galleryIndex)+"px)";

}


/* ============================= */
/* RATING */
/* ============================= */

function rateCar(star, rating) {

let stars = star.parentElement.querySelectorAll("span");

stars.forEach((s, index) => {

if(index < rating){
s.classList.add("active");
}else{
s.classList.remove("active");
}

});

}


/* ============================= */
/* PARTICLES */
/* ============================= */

particlesJS("particles-js",{

particles:{
number:{value:80},
color:{value:"#ff0000"},
shape:{type:"circle"},
opacity:{value:0.5},
size:{value:3},
line_linked:{
enable:true,
distance:150,
color:"#ff0000",
opacity:0.4,
width:1
},
move:{
enable:true,
speed:2
}
},

interactivity:{
events:{
onhover:{
enable:true,
mode:"repulse"
}
}
}

});


/* ============================= */
/* NAVBAR ACTIVE LINK */
/* ============================= */

let sections=document.querySelectorAll("section[id]");
let navLinks=document.querySelectorAll(".nav-links a");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(section=>{

let sectionTop=section.offsetTop-250;
let sectionHeight=section.offsetHeight;

if(window.scrollY>=sectionTop && window.scrollY<sectionTop+sectionHeight){
current=section.getAttribute("id");
}

});

navLinks.forEach(link=>{

link.classList.remove("active");

if(link.getAttribute("href").includes(current)){
link.classList.add("active");
}

});

});
/* ============================= */
/* ENGINE SOUND */
/* ============================= */

function playEngine(){

let sound = document.getElementById("engineSound");

sound.currentTime = 0;

sound.play();

/* CAR SHAKE */

let cards = document.querySelectorAll(".car-card");

cards.forEach(card=>{
card.classList.add("engine-start");

setTimeout(()=>{
card.classList.remove("engine-start");
},1500);

});

/* SPEED METER */

let speed = document.getElementById("speedFill");

if(speed){

speed.style.width="100%";

setTimeout(()=>{
speed.style.width="0%";
},2000);

}

}
/* ============================= */
/* STATS COUNTER */
/* ============================= */

let statsStarted = false;

window.addEventListener("scroll", function(){

let statsSection = document.querySelector(".stats");

if(!statsSection) return;

let position = statsSection.getBoundingClientRect().top;

let screenHeight = window.innerHeight;

if(position < screenHeight && !statsStarted){

statsStarted = true;

animateStat("speedStat",420);
animateStat("powerStat",1600);
animateStat("accStat",2.4);

}

});

function animateStat(id,target){

let element = document.getElementById(id);

let count = 0;

let step = target / 50;

let interval = setInterval(function(){

count += step;

if(count >= target){

element.innerText = target;

clearInterval(interval);

}else{

element.innerText = Math.floor(count);

}

},40);

}
/* ============================= */
/* IMAGE VIEWER */
/* ============================= */

function openImage(src){

let viewer = document.getElementById("imageViewer");
let img = document.getElementById("fullImage");

img.src = src;

viewer.style.display = "flex";

}

function closeImage(){

document.getElementById("imageViewer").style.display = "none";

}
function playEngine(){

let speed = 0;

let meter = document.getElementById("speedFill");
let text = document.getElementById("speedText");

let engine = document.getElementById("engineSound");

engine.play();

let interval = setInterval(()=>{

speed += 5;

meter.style.width = speed/3 + "%";

text.innerText = speed + " km/h";

if(speed >= 300){
clearInterval(interval);
}

},50);

}
function filterCars(type){

let cars = document.querySelectorAll(".car-card");

cars.forEach(car=>{

if(type === "all"){
car.style.display="block";
}
else if(car.classList.contains(type)){
car.style.display="block";
}
else{
car.style.display="none";
}

});

}
function filterCars(type){

let cars = document.querySelectorAll(".car-card");

cars.forEach(car=>{

if(type === "all"){
car.style.display="block";
}
else if(car.classList.contains(type)){
car.style.display="block";
}
else{
car.style.display="none";
}

});

}
/* SECRET SHADOW MODE */

let secretCode = "";
let shadowWord = "shadow";

document.addEventListener("keydown", function(e){

secretCode += e.key.toLowerCase();

if(secretCode.includes(shadowWord)){

document.body.classList.toggle("shadow-mode");

showToast("⚡ Shadow Mode Activated");

secretCode = "";

}

});
function showToast(msg){

let toast = document.getElementById("toast");

toast.innerText = msg;

toast.style.display = "block";

setTimeout(()=>{
toast.style.display="none";
},2000);

}
/* ================= SPEED METER ================= */

let speed = 0;

function playEngine(){

let audio = document.getElementById("engineSound");

audio.currentTime = 0;

audio.play();

let interval = setInterval(()=>{

speed += 10;

if(speed > 420){
clearInterval(interval);
}

let percent = speed / 4.2;

document.getElementById("speedFill").style.width = percent + "%";

document.getElementById("speedText").innerText = speed + " km/h";

},100);

}
