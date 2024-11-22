const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
var cookieparser = require("cookie-parser");
var upload = require("express-fileupload");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
var io = require("socket.io")(3000);

var io2 = require("socket.io")(4000);

//db connection
const db = mysql.createConnection({
  host:"localhost",
  user: "root",
  password:"123456789",
  database:"rems",
  port:3306,
  connector: "mysql",
  socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock"

});

//conect
db.connect(err => {
  if (err) {
    throw err;
  }
  console.log("rems db connected");
});
const app = express();

app.set("view engine", "ejs");

app.use(express.static("./public"));
app.listen(8000);
app.use(cookieparser());
app.use(upload());

app.get("/", function(req, res) {
  //res.sendFile(__dirname + "/public/login.html");
  console.log("hellos");

  res.render("login", { flag: 0 });
});

app.get("/register", function(req, res) {
  res.sendFile(__dirname + "/public/register.html");
});

app.post("/register", urlencodedParser, function(req, res) {
  let sql = `select * from users where username='${req.body.user}'`;
  db.query(sql, function(err, result) {
    if (err) throw err;
    if (result.length > 0) {
      console.log("account already exists. try again");
      res.redirect("/register");
    } else {
      let sql = `insert into users values('${req.body.user}','${req.body.email}','${req.body.contact}','${req.body.card}',${req.body.cvv},0)`;
      db.query(sql, function(err) {
        if (err) throw err;
        console.log("inserted into users");
      });
      sql = `insert into login(user,pass) values('${req.body.user}','${req.body.pass}')`;
      db.query(sql, function(err, result) {
        if (err) throw err;
        console.log("inserted into login");
      });
      console.log("account created.redirecting to login page");
      res.redirect("/login");
    }
  });
});

app.post("/login", urlencodedParser, function(req, res) {
  let sql = `select * from login where user='${req.body.user}'`;
  db.query(sql, function(err, result) {
    if (err) throw err;
    if (result.length > 0) {
      if (req.body.pass === result[0].pass) {
        console.log("Login successfull");
        res.cookie("user", result[0].user);
        let sql2 = `select * from users where username='${req.body.user}'`;

        db.query(sql2, function(err, result2) {
          if (err) throw err;
         let sql3 = `select * from property where owner='${req.body.user}'`;
          db.query(sql3, function(err, result) {
            if (err) throw err;
            console.log(result.length);
            if (result.length > 0) {
              if (
                result[0].status == "sold" &&
                (result[0].type == "sell" || result[0].type == "auction")
              ) {
                console.log(result[0].type, result[0].status);
                res.render("dashboard", { data: 2, name: result[0].user});
              } else {
                res.render("dashboard", {
                  data: result2[0].flag,
                  name: result[0].user
                });
              }
            } else {
              res.render("dashboard", { data: 0, name: result[0].user });
            }
          });
        });
      } else {
        console.log("incorrect password try again");
        res.render("login", { flag: 1 });
      }
    } else {
      console.log("invalid username");
      res.render("login", { flag: 2 });
    }
  });
});

app.get("/dashboard", function(req, res) {
  //console.log(" dashboard get called");
  res.render("dashboard", { data: 0, name: req.cookies.user });
});

app.post("/dashboard", urlencodedParser, function(req, res) {
  let sql = `update users set flag=0 where username='${req.cookies.owner}'`;
  db.query(sql, function(err, result) {
    if (err) throw err;
    console.log("flag is set to zero");
  });
  res.render("index", {
    type: "owner",
    user: req.cookies.user,
    amount: req.cookies.amount
  });
});

app.get("/auctionlist", function(req, res) {
  let sql = `select * from property where status='available' and type='auction'`;
  db.query(sql, function(err, result) {
    if (err) throw err;
    res.render("auctionlist", { data: result, name: req.cookies.user });
  });
});

app.post("/auctionlist", urlencodedParser, function(req, res) {
  let sql = `select * from property where regno=${req.body.regno}`;
  db.query(sql, function(err, result) {
    if (err) throw err;
    res.cookie("regno", req.body.regno);
    res.cookie("base", result[0].value);
    res.redirect("/auctiondetail");
  });
});

app.get("/auctiondetail", urlencodedParser, function(req, res) {
  let sql = `select * from property where regno=${req.cookies.regno}`;
  db.query(sql, function(err, result) {
    if (err) throw err;
    res.render("auction_detail", { data: result[0], name: req.cookies.user });
  });
});

app.post("/auctiondetail", urlencodedParser, function(req, res) {
  // res.render("auction", { base: req.cookies.base });
  res.redirect("/auction");
});

app.get("/search", function(req, res) {
  let sql = `select * from property where status='available' and type <> 'auction'`;
  db.query(sql, function(err, result) {
    if (err) throw err;
    res.render("search", { data: result, name: req.cookies.user });
  });
});

app.get("/sell", function(req, res) {
  let sql = `select * from property where regno=${req.cookies.regno}`;
  db.query(sql, function(err, result) {
    if (err) throw err;
    res.render("sell", { data: result[0], name: req.cookies.user });
  });
});

app.get("/rent", function(req, res) {
  let sql = `select * from property where regno=${req.cookies.regno}`;
  db.query(sql, function(err, result) {
    if (err) throw err;
    res.render("rent", { data: result[0], name: req.cookies.user });
  });
});

app.post("/rent", urlencodedParser, function(req, res) {
  let sql = `select * from property where regno=${req.cookies.regno}`;
  db.query(sql, function(err, result) {
    if (err) throw err;
    res.cookie("owner", result[0].owner);
    let sql2 = `update users set flag=1 where username='${result[0].owner}'`;
    db.query(sql2, function(err, result) {
      if (err) throw err;
      console.log("owner notified");
    });
    res.render("index", {
      type: "tenant",
      user: req.cookies.user,
      amount: req.cookies.amount
    });
    //res.redirect("/chat");
  });
});

app.post("/search", urlencodedParser, function(req, res) {
  console.log(req.body.regno);

  let sql = `select * from property where regno=${req.body.regno}`;
  db.query(sql, function(err, result) {
    if (err) throw err;
    res.cookie("regno", req.body.regno);
    res.cookie("amount", result[0].value);
    if (result[0].type === "sell") {
      res.redirect("/sell");
    } else {
      res.redirect("/rent");
    }
  });
});

app.get("/upload", function(req, res) {
  res.sendFile(__dirname + "/public/upload.html");
});

app.post("/upload", urlencodedParser, function(req, res) {
  console.log(req.body);
  var file = req.files.image;
  console.log(file.name);
  let sql = `insert into property(regno,owner,location,image,value,type,status) values(${req.body.regno},'${req.cookies.user}','${req.body.location}','${file.name}',${req.body.value},'${req.body.type}','available')`;
  db.query(sql, function(err) {
    if (err) throw err;
    console.log("inserted into property");
  });
  res.redirect("/dashboard");
});

app.get("/payment", function(req, res) {
  let sql = `select * from users where username='${req.cookies.user}'`;
  db.query(sql, function(err, result) {
    if (err) throw err;
    console.log(result);
    res.render("payment", { data: result[0], amount: req.cookies.amount });
  });
});

app.post("/payment", urlencodedParser, function(req, res) {
  let sql = `select * from users where username='${req.cookies.user}'`;
  db.query(sql, function(err, result) {
    if (err) throw err;
    console.log(result[0].cvv);

    if (result[0].cvv == req.body.cvv) {
      console.log("payment success");
      let sql1 = `update property set status='sold' where regno=${req.cookies.regno}`;
      db.query(sql1, function(err, result) {
        if (err) throw err;
        console.log("STATUS UPDATED");
      });
      let sql2 = `select * from property where regno=${req.cookies.regno}`;
      db.query(sql2, function(err, result) {
        if (err) throw err;
        let sql3 = `insert into sold values('${result[0].owner}','${req.cookies.user}',${req.cookies.amount},${req.cookies.regno})`;
        db.query(sql3, function(err, result1) {
          if (err) throw err;
          console.log("inserted into sold table");
        });
      });

      res.redirect("/success");
    } else {
      console.log("Invalid cvv.Try again");
      res.redirect("/payment");
    }
  });
});

app.get("/success", function(req, res) {
  res.sendFile(__dirname + "/public/success.html");
});

app.get("/chat", function(req, res) {
  // console.log(req.cookies.owner);
  res.render("index");
});

app.post("/chat", urlencodedParser, function(req, res) {
  if (req.cookies.user == req.body.who) {
    res.cookie("amount", req.body.rent_amount);
    res.redirect("/dashboard");
  } else {
    res.cookie("user", req.body.who);
    res.redirect("/payment");
  }
});

app.get("/logout", function(req, res) {
  res.sendFile(__dirname + "/public/logout.html");
});

//auction

var m = new Map();

app.get("/auction", function(req, res) {
  //console.log(req.cookies.user);
  res.render("auction", { base: req.cookies.base });
  uname = req.cookies.user;
});

var current,
  maxValue,
  flag = 0;
var winner;
var basecount = 0;
app.post("/auction", urlencodedParser, function(req, res) {
  if (req.body.win_pay == 0) {
    res.cookie("amount", maxValue);
    res.cookie("user", winner);
    res.redirect("/payment");
  } else if (req.body.win_pay == 1) {
    res.redirect("/logout");
  } else {
    current = parseInt(req.body.bidvalue);
    if (basecount == 0) {
      maxValue = req.cookies.base;
      basecount = 1;
    }
    if (current < maxValue) {
      flag = 1;
      io.to(m[req.body.bidder]).emit("showprice", {
        value: maxValue,
        flag: flag
      });
    } else {
      flag = 0;
      maxValue = current;
      winner = req.body.bidder;
      io.sockets.emit("showprice", { value: maxValue, flag: flag });
    }
  }
});

var countdown = 40;
function startTime() {
  var ID = setInterval(function() {
    countdown--;
    io.sockets.emit("timer", { countdown: countdown });
    if (countdown == 0) {
      clearInterval(ID);
      io.sockets.emit("display");
      var newID = setInterval(function() {
        newCount--;
        io.sockets.emit("bid", { newCount: newCount });
        if (newCount == 0) {
          clearInterval(newID);
          io.sockets.emit("win", { value: winner });
        }
      }, 1000);
    }
  }, 1000);
}
var first_bidder = 0;
var newCount = 20;
var socketID;
io.sockets.on("connection", function(socket) {
  console.log("made socket connection", socket.id);
  if (first_bidder == 0) {
    startTime();
    first_bidder = 1;
  }
  socketID = socket.id;
  m[uname] = socketID;
  console.log(m);

  socket.on("reset", function(data) {
    newCount = 20;
    io.sockets.emit("bid", { newCount: newCount });
  });
  //chat
});

// negotiation chat

io2.on("connection", function(socket) {
  console.log("made socket connection", socket.id);
  socket.on("chat", function(data) {
    io2.sockets.emit("chat", data);
  });

  socket.on("typing", function(data) {
    //broadcast to all others except sender
    socket.broadcast.emit("typing", data);
  });
});
