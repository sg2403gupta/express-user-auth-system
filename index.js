const express = require("express");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "shubhamgupta2403";
const app = express();

app.use(express.json());

const users = [];

// function generateToken() {
//   const options = [
//     "a",
//     "b",
//     "c",
//     "d",
//     "e",
//     "f",
//     "g",
//     "h",
//     "i",
//     "j",
//     "k",
//     "l",
//     "m",
//     "n",
//     "o",
//     "p",
//     "q",
//     "r",
//     "s",
//     "t",
//     "u",
//     "v",
//     "w",
//     "x",
//     "y",
//     "z",
//     "A",
//     "B",
//     "C",
//     "D",
//     "E",
//     "F",
//     "G",
//     "H",
//     "I",
//     "J",
//     "K",
//     "L",
//     "M",
//     "N",
//     "O",
//     "P",
//     "Q",
//     "R",
//     "S",
//     "T",
//     "U",
//     "V",
//     "W",
//     "X",
//     "Y",
//     "Z",
//     "0",
//     "1",
//     "2",
//     "3",
//     "4",
//     "5",
//     "6",
//     "7",
//     "8",
//     "9",
//   ];
//   let token = "";
//   for (let i = 0; i < 32; i++) {
//     token += options[Math.floor(Math.random() * options.length)];
//   }
//   return token;
// }

app.post("/signup", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (users.find((u) => u.username === username)) {
    return res.json({
      message: "User already existed...",
    });
  }
  users.push({
    username: username,
    password: password,
  });

  res.json({
    message: "You have signed successfully..",
  });
  console.log(users);
});

app.post("/signin", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  const foundUser = users.find((u) => {
    if (u.username == username && u.password == password) {
      return true;
    } else {
      return false;
    }
  });

  if (foundUser) {
    const token = jwt.sign(
      {
        username: username,
      },
      JWT_SECRET
    ); //convert {username into jwt token}
    // foundUser.token = token;

    res.json({
      token: token,
    });
  } else {
    res.status(403).send({
      message: "User not found",
    });
  }
  console.log(users);
});

app.get("/me", function (req, res) {
  const token = req.headers.token;

  const decodeInformation = jwt.verify(token, JWT_SECRET); //(converts {username: "sgupta4850@gmail.com"})
  const username = decodeInformation.username;

  let foundUser = users.find((u) => {
    if (u.username == username) {
      return true;
    } else {
      false;
    }
  });

  if (foundUser) {
    res.json({
      username: foundUser.username,
      password: foundUser.password,
    });
  } else {
    res.json({
      message: "invalid token",
    });
  }
  console.log(users);
});
app.listen(3000);
