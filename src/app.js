const express = require("express");
const alert = require("alert");
// const path=require('path');
const htpp = require("http");
const app = express();
const socketio = require("socket.io");
const server = htpp.createServer(app);
const PORT = 80 || process.env.PORT;
const hostname = "127.0.0.1";
const io = socketio(server);

const users = {};
const sports = {};
const drama = {};
const webDev = {};
const appDev = {};
const cp = {};

// for general chat
io.on("connection", (socket) => {
  socket.on("new-user-joined-general", (name) => {
    users[socket.id] = name;
    socket.broadcast.emit("user-joined-general", name);
  });
  socket.on("send-general", (message) => {
    socket.broadcast.emit("recieve-general", {
      message: message,
      name: users[socket.id],
    });
  });
});

// for sports chat
io.on("connection", (socket) => {
  socket.on("new-user-joined-sports", (name) => {
    sports[socket.id] = name;
    socket.broadcast.emit("user-joined-sports", name);
  });
  socket.on("send-sports", (message) => {
    socket.broadcast.emit("recieve-sports", {
      message: message,
      name: sports[socket.id],
    });
  });
});

// for drama chat
io.on("connection", (socket) => {
  socket.on("new-user-joined-drama", (name) => {
    drama[socket.id] = name;
    socket.broadcast.emit("user-joined-drama", name);
  });
  socket.on("send-drama", (message) => {
    socket.broadcast.emit("recieve-drama", {
      message: message,
      name: drama[socket.id],
    });
  });
});
// for webDev chat
io.on("connection", (socket) => {
  socket.on("new-user-joined-web", (name) => {
    webDev[socket.id] = name;
    socket.broadcast.emit("user-joined-web", name);
  });
  socket.on("send-web", (message) => {
    socket.broadcast.emit("recieve-web", {
      message: message,
      name: webDev[socket.id],
    });
  });
});
// for appDev chat
io.on("connection", (socket) => {
  socket.on("new-user-joined-app", (name) => {
    appDev[socket.id] = name;
    socket.broadcast.emit("user-joined-app", name);
  });
  socket.on("send-app", (message) => {
    socket.broadcast.emit("recieve-app", {
      message: message,
      name: appDev[socket.id],
    });
  });
});
// for cp chat
io.on("connection", (socket) => {
  socket.on("new-user-joined-cp", (name) => {
    cp[socket.id] = name;
    socket.broadcast.emit("user-joined-cp", name);
  });
  socket.on("send-cp", (message) => {
    socket.broadcast.emit("recieve-cp", {
      message: message,
      name: cp[socket.id],
    });
  });
});

require("./db/conn");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static("../public"));
const Register = require("./models/registers");
app.use(express.static("../public/images"));
app.use(express.static("../public/css"));
app.use(express.static("../public/script"));
app.use("/loginPage.css", express.static("loginPage.css"));
app.get("/", (req, res) => {
  res.send("error");
});
app.post("/signUp", async (req, res) => {
  try {
    const name = req.body.fullName;
    const email = req.body.email;
    const password = req.body.password;
    const cpassword = req.body.confirmPassword;

    if (password === cpassword) {
      const registerEmployee = new Register({
        fullName: name,
        email: email,
        password: password,
        confirmPassword: cpassword,
      });

      const registered = registerEmployee.save();
      return res.redirect("/welcome");
    } else {
      alert("password and confirm password are not matching");
    }
  } catch (error) {
    res.send(error);
  }
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});

app.get("/homeWebApp", (req, res) => {
  res.sendFile(__dirname + "/homeWebApp.html");
});
app.get("/chatPage", (req, res) => {
  res.sendFile(__dirname + "/chatPage.html");
});
app.get("/groupPage", (req, res) => {
  res.sendFile(__dirname + "/groupPage.html");
});
app.get("/sports", (req, res) => {
  res.sendFile(__dirname + "/sports.html");
});
app.get("/webDev", (req, res) => {
  res.sendFile(__dirname + "/webDev.html");
});
app.get("/appDev", (req, res) => {
  res.sendFile(__dirname + "/appDev.html");
});
app.get("/drama", (req, res) => {
  res.sendFile(__dirname + "/drama.html");
});
app.get("/cp", (req, res) => {
  res.sendFile(__dirname + "/cp.html");
});
app.get("/welcome", (req, res) => {
  res.sendFile(__dirname + "/welcome.html");
});

app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const usermail = await Register.findOne({ email: email });
    if (usermail.password === password) {
      return res.redirect("/welcome");
    } else {
      alert(
        "invalid credentials,please create an account if not yet created!!!"
      );
    }
  } catch (error) {
    alert("invalid credentials,please create an account if not yet created!!!");
  }
});

server.listen(PORT, () => {
  console.log(`The application has started on port http://${hostname}:${PORT}`);
});
