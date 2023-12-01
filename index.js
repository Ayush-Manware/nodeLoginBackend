const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");

const Port = 2400;

const app = express();

app.use(bodyParser.json());
app.use(cors({ origin: "*" }));

const users = [];

app.get("/", (req, res) => {
  res.send("Home");
});

app.post("/register", async (req, res) => {
  const { name, phone, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    users.push({ name, phone, email, password: hashedPassword });

    res.status(201).json({ messege: "User Registered !!" });
  } catch (error) {
    console.error("Error hashing password:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(Port, () => {
  console.log(users);
  console.log("Server Started");
});
