const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");

const Port = 2400;

const app = express();

app.use(express.json())

app.use(bodyParser.json());
app.use(cors({ origin: "*" }));

const users = [];

app.get("/", (req, res) => {
  res.send("Home");
});

app.post("/register", async (req, res) => {
  const { name, phone, email, password } = req.body;
  console.log(req.body)
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    users.push({ name, phone, email, password: hashedPassword });

    res.status(201).json({ messege: "User Registered !!" });
  } catch (error) {
    console.error("Error hashing password:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);
  const findPswd = users.find((u)=> u.password === password)

  if((user) && (findPswd)){
    console.log("Login Matched")
  }

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: "User is not registered" });
  }

  const token = jwt.sign({ email: user.email }, "secretKey");

  res.json({ message: "User has logged in successfully", token });
});

app.listen(Port, () => {
  console.log(users);
  console.log("Server Started");
});


