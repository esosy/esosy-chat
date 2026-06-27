const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

io.on("connection", (socket) => {

console.log("Kullanıcı bağlandı:", socket.id);

// odaya katıl
socket.on("joinRoom", (room) => {
socket.join(room);
});

// mesaj gönder
socket.on("message", (data) => {
io.to(data.room).emit("message", {
user: data.user,
text: data.text
});
});

// çıkış
socket.on("disconnect", () => {
console.log("Kullanıcı çıktı:", socket.id);
});

});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Esosy Chat çalışıyor: ${PORT}`);
});