
// ===================== REGISTER =====================
function register(){

let user = document.getElementById("regUser")?.value;
let email = document.getElementById("regEmail")?.value;
let pass = document.getElementById("regPass")?.value;
let pass2 = document.getElementById("regPass2")?.value;

if(!user || !email || !pass || !pass2){
alert("Tüm alanları doldur!");
return;
}

if(pass !== pass2){
alert("Şifreler uyuşmuyor!");
return;
}

// TÜM KULLANICILARI AL
let users = JSON.parse(localStorage.getItem("users") || "{}");

// kullanıcı adı varsa engelle
if(users[user]){
alert("Bu kullanıcı adı zaten alınmış!");
return;
}

// yeni kullanıcı ekle
users[user] = {
email: email,
password: pass
};

// geri kaydet
localStorage.setItem("users", JSON.stringify(users));

alert("Kayıt başarılı!");
window.location = "login.html";
}


// ===================== LOGIN =====================
function login(){

let user = document.getElementById("loginUser")?.value;
let pass = document.getElementById("loginPass")?.value;

let users = JSON.parse(localStorage.getItem("users") || "{}");

if(!users[user]){
alert("Kullanıcı bulunamadı!");
return;
}

if(users[user].password !== pass){
alert("Şifre yanlış!");
return;
}

localStorage.setItem("loggedIn", "true");
localStorage.setItem("currentUser", user);

window.location = "index.html";
}


// ===================== LOGOUT =====================
function logout(){

localStorage.removeItem("loggedIn");
localStorage.removeItem("currentUser");

window.location = "index.html";
}


// ===================== HEADER =====================
function updateHeader(){

const menu = document.querySelector(".menu");
if(!menu) return;

let loggedIn = localStorage.getItem("loggedIn");
let user = localStorage.getItem("currentUser");

if(loggedIn === "true"){

menu.innerHTML = `
<a href="profile.html">Profilim (${user})</a>
<a href="#" onclick="logout()">Çıkış</a>
`;

}else{

menu.innerHTML = `
<a href="login.html">Giriş Yap</a>
<a href="register.html">Kaydol</a>
`;

}

}


// ===================== SOHBET MERKEZİ =====================
function goChat(){
window.location = "lobby.html";
}


// ===================== LOBBY =====================
function createRoom(){

let name = document.getElementById("createRoomName")?.value;
let pass = document.getElementById("createRoomPass")?.value;

if(!name || !pass){
alert("Tüm alanları doldur!");
return;
}

localStorage.setItem("room_" + name, pass);
localStorage.setItem("currentRoom", name);

window.location = "chat.html";
}

function joinRoom(){

let name = document.getElementById("joinRoomName")?.value;
let pass = document.getElementById("joinRoomPass")?.value;

let saved = localStorage.getItem("room_" + name);

if(!saved){
alert("Böyle bir grup yok!");
return;
}

if(saved !== pass){
alert("Şifre yanlış!");
return;
}

localStorage.setItem("currentRoom", name);
window.location = "chat.html";
}


// ===================== GRUPLAR =====================
function loadMyRooms(){

let container = document.getElementById("myRooms");
if(!container) return;

container.innerHTML = "";

let keys = Object.keys(localStorage);

let rooms = [];

for(let k of keys){
if(k.startsWith("room_")){
rooms.push(k.replace("room_",""));
}
}

if(rooms.length === 0){
container.innerHTML = "<p>Henüz grup yok</p>";
return;
}

rooms.forEach(room=>{

let div = document.createElement("div");
div.className = "room-item";
div.innerText = room;

div.onclick = function(){
localStorage.setItem("currentRoom", room);
window.location = "chat.html";
};

container.appendChild(div);

});

}


// ===================== CHAT =====================
function sendMsg(){

let msg = document.getElementById("msg")?.value;
if(!msg) return;

let messages = document.getElementById("messages");

let div = document.createElement("div");
div.className = "msg";

let user = localStorage.getItem("currentUser") || "Anonim";

div.innerText = user + ": " + msg;

messages.appendChild(div);

document.getElementById("msg").value = "";
}


// ===================== ODADAN ÇIK =====================
function leaveRoom(){
localStorage.removeItem("currentRoom");
window.location = "lobby.html";
}


// ===================== INIT =====================
window.onload = function(){
updateHeader();

let room = localStorage.getItem("currentRoom");
let title = document.getElementById("roomTitle");

if(room && title){
title.innerText = "Oda: " + room;
}
}