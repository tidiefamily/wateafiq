// create a bacis node js with espress app
const express = require("express");
const mysql = require("mysql2/promise");
const { Client, LocalAuth } = require("whatsapp-web.js");
const app = express();
// const tidieteafiq = require("./db/koneksi");
const tidiekoneksi = require("./db/tidie_koneksi");
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

// client.on("ready", () => {
//   console.log("Client is Ready");
//   client.sendMessage("6281266124230@c.us", "Uji Coba Pesan!");
//   console.log("Pesan berhasil terkirim");
// });

client.on("message", (message) => {
  console.log(message.body);
});
// Ldist of data for automatic reply

var data = require("./data/contacts.json");
var data_persidangan = require("./data/data_perkara.json");

// var data = [
//   {
//     id: 1,
//     received: "PATALU",
//     reply:
//       "Selamat Datang di Layanan Aplikasi Whatsapp Pengadilan Agama Talu\n\n List Layanan\n 1. Informasi \n 2. Pendaftaran\n 3. Kasir \n 4. Produk Peradilan \n 5. Layanan Posbakum",
//   },
//   { id: 2, received: "Sorry", reply: "No problem" },
//   {
//     id: 3,
//     received: "Can we have a call?",
//     reply:
//       "Please leave a voicemail. Let us connect in an hour. Kind Reards, Amir Mustafa",
//   },
//   {
//     default:
//       "Please leave a voicemail. Let us connect in an hour. Kind Reards, Amir Mustafa",
//   },
// ];

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

client.on("message", (message) => {
  var selectedData = data_persidangan.find((msg) => {
    if (msg.nomor_perkara === message.body) {
      return true;
    }
  });
  var sourceMsg, targetMsg;
  if (
    selectedData &&
    Object.keys(selectedData).length !== 0 &&
    selectedData.constructor === Object
  ) {
    sourceMsg = selectedData.nomor_perkara;
    targetMsg = selectedData.tgl_sidang;
  }

  if (message.body === sourceMsg) {
    message.reply(targetMsg);
  } else {
    message.reply(data.default);
  }
});

client.on("message", async (message) => {
  if (message.body.startsWith("#DAFTAR#")) {
    statusPesan = true;

    var dataArray = message.body.split("#");

    var nama = dataArray[2];
    var tanggalLahir = dataArray[3]; // Mengganti _ menjadi S:

    var nik = dataArray[4];
    var nokk = dataArray[5];
    var isValid = true;
    if (nik.length < 16 || nokk.length < 16) {
      await client.sendMessage(
        message.from,
        "NIK atau No. KK kurang dari 16 digit"
      );
    } else {
      // Mengirim pesan konfirmasi dan menunggu balasan
      var confirmationMessage = `Apakah data Anda sudah benar? \n\nNama: ${nama}\nTanggal Lahir: ${tanggalLahir}\nNIK: ${nik}\nNo. KK: ${nokk}\n\nBalas YA atau TIDAK`;
      await client.sendMessage(message.from, confirmationMessage);
      let menuConfirmationPending = true;
      // Menunggu balasan konfirmasi dari pengguna
      client.on("message", async (confirmationResponse) => {
        // Memproses balasan konfirmasi
        if (
          menuConfirmationPending &&
          confirmationResponse.body.toUpperCase() === "YA"
        ) {
          menuConfirmationPending = false;
          statusPesan = false;
          // Memasukkan data ke dalam tabel
          // // Membuat koneksi ke database
          // const connection = await mysql.createConnection({
          //   host: "localhost",
          //   user: "root",
          //   password: "wafiqu",
          //   database: "webapi",
          // });

          const connection = await tidiekoneksi;

          const insertQuery = `INSERT INTO tabel_daftar (nama, tanggal_lahir, nik, nokk) VALUES (?, ?, ?, ?)`;
          const values = [nama, tanggalLahir, nik, nokk];

          try {
            const [rows, fields] = await connection.execute(
              insertQuery,
              values
            );
            console.log(
              `${rows.affectedRows} baris telah ditambahkan ke tabel.`
            );
            await client.sendMessage(
              message.from,
              "Terima kasih, data Anda telah berhasil disimpan."
            );
          } catch (error) {
            console.log(error);
            await client.sendMessage(
              message.from,
              "Maaf, terjadi kesalahan dalam menyimpan data Anda. Silakan coba lagi nanti."
            );
          }

          // Menutup koneksi ke database
          await connection.end();
          statusPesan = false;
        } else if (confirmationResponse.body.toUpperCase() === "TIDAK") {
          menuConfirmationPending = false;

          await client.sendMessage(
            message.from,
            "Pendaftaran dibatalkan. Silakan ulangi proses pendaftaran."
          );
          statusPesan = false;
        }
      });
    }
  }
});

client.initialize();
