const { Client, LocalAuth } = require("whatsapp-web.js");
// const qrcode = require("qrcode-terminal");

// Get QR code to scan WhatsAPP

const client = new Client({
  puppeteer: {
    headless: false,
  },
  authStrategy: new LocalAuth({
    clientID: "YOUR_CLIENT_ID",
  }),
});

client.on("qr", (qr) => {
  console.log("QR RECEIVED", qr);
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("message", (message) => {
  console.log(message.body);
});
// List of data for automatic reply
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

client.on("ready", () => {
  console.log("Client is Ready");
  if (data.id === "1") {
    client.sendMessage("6281266124230@c.us", "Uji Coba Pesan!");
    console.log("Berhasil Mengirim Pesan");
  }
});

client.on("message", (message) => {
  var selectedData = data.find((msg) => {
    if (msg.received === message.body) {
      return true;
    }
  });
  var sourceMsg, targetMsg;
  if (
    selectedData &&
    Object.keys(selectedData).length !== 0 &&
    selectedData.constructor === Object
  ) {
    sourceMsg = selectedData.received;
    targetMsg = selectedData.reply;
  }

  if (message.body === sourceMsg) {
    message.reply(targetMsg);
  } else {
    message.reply(data.default);
  }
});

client.initialize();
