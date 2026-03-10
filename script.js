let cars = ["Ferrari", "Lamborghini", "Bugatti"];
let currentIndex = 0;
let autoSlide = null;

/* SHOW CAR DETAILS */

function showDetails(carName){

currentIndex = cars.indexOf(carName);

let details = "";
let img = document.getElementById("modalImage");

if(carName === "Ferrari"){
details = "Top Speed: 340 km/h 🚗\nEngine: V8 Twin Turbo\n0-100 km/h: 2.9 seconds";
img.src = "images/car1.jpg";
}

else if(carName === "Lamborghini"){
details = "Top Speed: 350 km/h 🚗\nEngine: V12\n0-100 km/h: 2.8 seconds";
img.src = "images/car2.jpg";
}

else if(carName === "Bugatti"){
details = "Top Speed: 420 km/h 🚗\nEngine: W16\n0-100 km/h: 2.4 seconds";
img.src = "images/car3.jpg";
}

document.getElementById("modalTitle").innerText = carName;
document.getElementById("modalText").innerText = details;

document.getElementById("carModal").style.display = "block";

startAutoSlide();

}

/* AUTO SLIDE INSIDE MODAL */

function startAutoSlide(){

clearInterval(autoSlide);

autoSlide = setInterval(function(){
nextCar();
},3000);

}

function nextCar(){

currentIndex++;

if(currentIndex >= cars.length){
currentIndex = 0;
}

showDetails(cars[currentIndex]);

}

function prevCar(){

currentIndex--;

if(currentIndex < 0){
currentIndex = cars.length - 1;
}

showDetails(cars[currentIndex]);

}

/* CLOSE MODAL */

function closeModal(){

document.getElementById("carModal").style.display = "none";
clearInterval(autoSlide);

}

/* DARK MODE */

function toggleMode(){

document.body.classList.toggle("dark-mode");

let btn = document.getElementById("modeBtn");

if(document.body.classList.contains("dark-mode")){
btn.innerHTML = "☀️ Light Mode";
}

else{
btn.innerHTML = "🌙 Dark Mode";
}

}

/* KEYBOARD CONTROL */

document.addEventListener("keydown", function(event){

let modal = document.getElementById("carModal");

if(event.key === "Escape"){
closeModal();
}

if(modal.style.display === "block"){

if(event.key === "ArrowRight"){
nextCar();
}

if(event.key === "ArrowLeft"){
prevCar();
}

}

});

/* SCROLL ANIMATION */

window.addEventListener("scroll", function(){

let cards = document.querySelectorAll(".car-card");

cards.forEach(function(card){

let position = card.getBoundingClientRect().top;
let screenHeight = window.innerHeight;

if(position < screenHeight - 100){
card.classList.add("show");
}

});

});

/* HERO IMAGE SLIDER */

let heroImages = [
"images/car1.jpg",
"images/car2.jpg",
"images/car3.jpg"
];

let heroIndex = 0;

function showHero(){
document.getElementById("heroImage").src = heroImages[heroIndex];
}

function nextHero(){

heroIndex++;

if(heroIndex >= heroImages.length){
heroIndex = 0;
}

showHero();

}

function prevHero(){

heroIndex--;

if(heroIndex < 0){
heroIndex = heroImages.length - 1;
}

showHero();

}

/* AUTO HERO SLIDE */

setInterval(nextHero,4000);

/* SEARCH FUNCTION */

function searchCar(){

let input = document.getElementById("searchBox").value.toLowerCase();
let cards = document.querySelectorAll(".car-card");

cards.forEach(function(card){

let title = card.querySelector("h3").innerText.toLowerCase();

if(title.includes(input)){
card.style.display = "block";
}

else{
card.style.display = "none";
}

});

}

/* LOADER */

window.addEventListener("load", function(){

let loader = document.getElementById("loader");

setTimeout(function(){
loader.style.display = "none";
},1000);

});

/* 3D TILT EFFECT */

let tiltCards = document.querySelectorAll(".car-card");

tiltCards.forEach(card => {

card.addEventListener("mousemove", (e) => {

let rect = card.getBoundingClientRect();

let x = e.clientX - rect.left;
let y = e.clientY - rect.top;

let centerX = rect.width / 2;
let centerY = rect.height / 2;

let rotateX = -(y - centerY) / 10;
let rotateY = (x - centerX) / 10;

card.style.transform =
`rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;

});

card.addEventListener("mouseleave", () => {

card.style.transform =
"rotateX(0) rotateY(0) scale(1)";

});

});

/* FAVORITES SYSTEM v2.1 */

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

updateFavCount();

window.addEventListener("load", function(){

let list = document.getElementById("favoriteList");

favorites.forEach(function(car){

addFavoriteToList(car);

});

});

/* ADD FAVORITE */

function addFavorite(car){

if(!favorites.includes(car)){

favorites.push(car);

localStorage.setItem("favorites", JSON.stringify(favorites));

addFavoriteToList(car);

updateFavCount();

showToast();

}

else{
alert("Already in favorites!");
}

}

/* ADD ITEM TO LIST */

function addFavoriteToList(car){

let list = document.getElementById("favoriteList");

let item = document.createElement("li");

item.innerHTML = car + 
` <button onclick="removeFavorite('${car}')">❌</button>`;

list.appendChild(item);

}

/* REMOVE FAVORITE */

function removeFavorite(car){

favorites = favorites.filter(f => f !== car);

localStorage.setItem("favorites", JSON.stringify(favorites));

location.reload();

}

/* FAVORITES COUNT */

function updateFavCount(){

let count = document.getElementById("favCount");

if(count){
count.innerText = favorites.length;
}

}

/* TOAST */

function showToast(){

let toast = document.getElementById("toast");

toast.style.display = "block";

setTimeout(function(){
toast.style.display = "none";
},2000);

}

/* CAR COMPARISON */

function compareCars(){

let car1 = document.getElementById("car1").value;
let car2 = document.getElementById("car2").value;

let data = {

Ferrari:{
speed:"340 km/h",
engine:"V8 Twin Turbo",
zero:"2.9 sec"
},

Lamborghini:{
speed:"350 km/h",
engine:"V12",
zero:"2.8 sec"
},

Bugatti:{
speed:"420 km/h",
engine:"W16",
zero:"2.4 sec"
}

};

let result = `
<h3>Comparison Result</h3>
<p><b>${car1}</b> vs <b>${car2}</b></p>
<p>Top Speed: ${data[car1].speed} | ${data[car2].speed}</p>
<p>Engine: ${data[car1].engine} | ${data[car2].engine}</p>
<p>0-100 km/h: ${data[car1].zero} | ${data[car2].zero}</p>
`;

document.getElementById("compareResult").innerHTML = result;

}

/* SPEED METER */

function showSpeed(){

let car = document.getElementById("speedCar").value;

let speeds = {
Ferrari:340,
Lamborghini:350,
Bugatti:420
};

let speed = speeds[car];

let percent = speed / 5;

let fill = document.getElementById("speedFill");

fill.style.width = percent + "%";

document.getElementById("speedText").innerText =
car + " Top Speed: " + speed + " km/h";

}
/* PARTICLES BACKGROUND */

particlesJS("particles-js",{

"particles":{

"number":{
"value":80
},

"color":{
"value":"#ff0000"
},

"shape":{
"type":"circle"
},

"opacity":{
"value":0.5
},

"size":{
"value":3
},

"line_linked":{
"enable":true,
"distance":150,
"color":"#ff0000",
"opacity":0.4,
"width":1
},

"move":{
"enable":true,
"speed":2
}

},

"interactivity":{
"events":{
"onhover":{
"enable":true,
"mode":"repulse"
}
}
}

});
/* PRO GALLERY */

let galleryIndex = 0;

function nextGallery(){

let track = document.getElementById("galleryTrack");

galleryIndex++;

if(galleryIndex > 2){
galleryIndex = 0;
}

track.style.transform = "translateX(" + (-250 * galleryIndex) + "px)";

}

function prevGallery(){

let track = document.getElementById("galleryTrack");

galleryIndex--;

if(galleryIndex < 0){
galleryIndex = 2;
}

track.style.transform = "translateX(" + (-250 * galleryIndex) + "px)";

}
/* STATS COUNTER */

function animateValue(id, start, end, duration){

let obj = document.getElementById(id);
let range = end - start;
let current = start;
let increment = end > start ? 1 : -1;
let stepTime = Math.abs(Math.floor(duration / range));

let timer = setInterval(function(){

current += increment;
obj.innerText = current;

if(current == end){
clearInterval(timer);
}

}, stepTime);

}

window.addEventListener("scroll", function(){

let stats = document.querySelector(".stats");

if(stats.getBoundingClientRect().top < window.innerHeight - 100){

animateValue("speedStat",0,420,2000);
animateValue("powerStat",0,1600,2000);
animateValue("accStat",0,2,2000);

}

});