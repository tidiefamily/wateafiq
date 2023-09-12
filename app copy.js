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

var data = [
  { id: 1, received: "Hello", reply: "Hi" },
  { id: 2, received: "Sorry", reply: "No problem" },
  {
    id: 3,
    received: "Can we have a call?",
    reply:
      "Please leave a voicemail. Let us connect in an hour. Kind Reards, Amir Mustafa",
  },
  {
    default:
      "Please leave a voicemail. Let us connect in an hour. Kind Reards, Amir Mustafa",
  },
];

client.on("message", (message) => {
  var data = data.find((msg) => {
    if (msg.received === message.body) {
      return true;
    }
  });
});

// test data
// const sourceMsg = 'Hello';
// const targetMsg = 'I am occupied at present. You can leave me SMS here, will call you shortly.';// send messageif(message.body === sourceMsg) {  message.reply(targetMsg);} else {  message.reply(data.default);}});
client.initialize();
