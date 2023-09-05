// create a bacis node js with espress app
const express = require("express");
const { Client, LocalAuth } = require("whatsapp-web.js");
const app = express();
const port = 3000;
const tidie = "Selamat Datang di layangan pengadilan agama talu";

app.listen(port, () => {
  console.log(`server listening on the por ${port}`);
});
//############################
const client = new Client({
  puppeteer: {
    headless: false,
  },
  authStrategy: new LocalAuth({
    clientID: "YOUR_CLIENT_ID",
  }),
});

// that means the browser

client.on("qr", (qr) => {
  console.log("QR RECEIVED", qr);
});

client.on("ready", () => {
  console.log("Client is Ready");
  client.sendMessage("6285364673038@c.us", "Uji Coba Pesan!");
  console.log("Pesan berhasil terkirim");
});

client.on("message", (message) => {
  if (message.body === "patalu") {
    message.reply("selamat datang di layangan whatsapp pengadilan agama talu");
  } else {
    message.reply("keyword anda salah, coba ulangan lagi dengan ketik patalu");
  }
});

client.initialize();
