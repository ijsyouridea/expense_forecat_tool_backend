const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
let amount = 0;

app.get("/", (req, res) => {
  res.send(`${amount} tokens have been generated`);
});
app.post("/sign", (req, res) => {
  amount++;
  const memory = req.body;
  const token = jwt.sign(
    {
      data: memory,
    },
    "secret",
    { expiresIn: "1h" },
  );

  console.log("attemt", token, memory);
  res.json(token);
});
app.get("/verify/:token", (req, res) => {
  const { token } = req.params;
  //console.log(token);
  var memory = jwt.verify(token, "secret");
  console.log(memory);
  res.json(memory);
});

app.listen(443, () => console.log("working"));
