const port = 8000;
const express = require("express");
const app = express();
let pdf = require("pdf-creator-node");
let fs = require("fs");
const path = require("path");
const users = require("./users");

// Read HTML Template
let html = fs.readFileSync("./pdf.html", "utf8");
let document = {
  html: html,
  data: {
    users: users,
  },
  path: "./output.pdf",
  type: "",
};
let options = {
  format: "A4",
  orientation: "portrait",
  border: "10mm",
};

//to download pdf
app.get("/download", (req, res) => {
  pdf
    .create(document, options)
    .then(() => {
      let out = path.join(__dirname, "output.pdf");
      console.log(out);
      res.download(out);
    })
    .catch((error) => {
      console.error(error);
      res
        .json(502)
        .json({ success: false, msg: "Error! cannot get pdf", error });
    });
});

//to display pdf
app.get("/pdf", (req, res) => {
  pdf
    .create(document, options)
    .then(() => {
      let out = path.join(__dirname, "output.pdf");
      console.log(out);
      res.sendFile(out);
    })
    .catch((error) => {
      res
        .json(502)
        .json({ success: false, msg: "Error! cannot get pdf", error });
    });
});

app.listen(port, () => {
  console.log(`server listening to port ${port}`);
});
