const express = require("express");
const app = express();

// Render için önemli: PORT'u environment'tan alır
const PORT = process.env.PORT || 3000;

// JSON kullanacaksan
app.use(express.json());

// Ana sayfa
app.get("/", (req, res) => {
  res.send("Server çalışıyor 🚀");
});

// Örnek API route
app.get("/api", (req, res) => {
  res.json({
    message: "API çalışıyor",
    success: true
  });
});

// 404 sayfası
app.use((req, res) => {
  res.status(404).send("Sayfa bulunamadı ❌");
});

// Server başlatma
app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
});