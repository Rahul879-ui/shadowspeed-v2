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
desc:"Bugatti is the king of speed and the fastest production car in the world."
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
/* 3D TILT EFFECT */
/* ============================= */

let tiltCards=document.querySelectorAll(".car-card");

tiltCards.forEach(card=>{

card.addEventListener("mousemove",(e)=>{

let rect=card.getBoundingClientRect();

let x=e.clientX-rect.left;
let y=e.clientY-rect.top;

let centerX=rect.width/2;
let centerY=rect.height/2;

let rotateX=-(y-centerY)/10;
let rotateY=(x-centerX)/10;

card.style.transform=`rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;

});

card.addEventListener("mouseleave",()=>{

card.style.transform="rotateX(0) rotateY(0) scale(1)";

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
/* STATS COUNTER */
/* ============================= */

function animateValue(id,start,end,duration){

let obj=document.getElementById(id);
let range=end-start;
let current=start;
let increment=end>start?1:-1;
let stepTime=Math.abs(Math.floor(duration/range));

let timer=setInterval(function(){

current+=increment;

obj.innerText=current;

if(current==end){
clearInterval(timer);
}

},stepTime);

}

window.addEventListener("scroll",function(){

let stats=document.querySelector(".stats");

if(stats.getBoundingClientRect().top<window.innerHeight-100){

animateValue("speedStat",0,420,2000);
animateValue("powerStat",0,1600,2000);
animateValue("accStat",0,2,2000);

}

});


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
// FAVORITES FUNCTION
function addFavorite(car){
console.log(car);
}


// ⭐ RATING SYSTEM

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
