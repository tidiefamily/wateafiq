const { Client, LocalAuth } = require("whatsapp-web.js");

// const client = new Client({
//   authStrategy: new LocalAuth(),
// });

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

client.initialize();

const api = async (req, res) => {
  const nohp = "fdsfsda";

  const kirim = client.on("message", (message) => {
    if (message.body === "patalu") {
      res.message.reply(
        "selamat datang di layangan whatsapp pengadilan agama talu"
      );
    } else {
      res.message.reply(
        "keyword anda salah, coba ulangan lagi dengan ketik patalu"
      );
    }
  });
  try {
  } catch (error) {
    res.message.rep;
  }
};

module.exports = api;
