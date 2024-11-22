var socket = io.connect("http://localhost:3000");

socket.on("timer", function(data) {
  document.getElementById("counter").innerHTML =
    "Auction starts in : " + data.countdown;
});

socket.on("bid", function(data) {
  document.getElementById("counter").innerHTML = "Time left : " + data.newCount;
  //document.getElementById("bidprice").innerHTML = "Current bid : " + data.value;
  //document.getElementsById("invalid").innerHTML = "";
});

function invalidshow() {
  document.getElementById("invalid").innerHTML = "INVALID BID TRY AGAIN";
  document.getElementById("invalid").style.color = "red";
}
var flag = 0;
socket.on("showprice", function(data) {
  flag = data.flag;
  if (data.flag === 0) {
    document.getElementById("bidprice").innerHTML =
      "Current bid : " + data.value;
    document.getElementById("invalid").innerHTML = "";
    socket.emit("reset");
  } else {
    invalidshow();
  }
});
socket.on("display", () => {
  document.getElementById("amount").style.visibility = "visible";
  document.getElementById("reset").style.visibility = "visible";
});

socket.on("win", function(data) {
  document.getElementById("winner").innerHTML = "Winner :</br> " + data.value;
  document.getElementById("winner").style.color = "lightgreen";
  if (data.value == document.getElementById("who").value) {
    var newButton = document.createElement("button");
    newButton.appendChild(document.createTextNode("Pay Amount"));
    document.getElementById("final").appendChild(newButton);
    newButton.setAttribute("type", "submit");
    newButton.setAttribute("name", "win_pay");
    newButton.setAttribute("value", "0");
    newButton.setAttribute("id", "pay");
  } else {
    var newButton = document.createElement("button");
    newButton.appendChild(document.createTextNode("Logout"));
    document.getElementById("final").appendChild(newButton);
    newButton.setAttribute("type", "submit");
    newButton.setAttribute("type", "submit");
    newButton.setAttribute("name", "win_pay");
    newButton.setAttribute("id", "pay");
    newButton.setAttribute("value", "1");
  }
});
/*
function fun() {
  document
    .getElementById("bidder")
    .setAttribute("value", document.getElementById("bidder").value);
}
*/
/*socket.on("flag", function(data) {
  if (flag) {
    document.getElementById("invalid").innerHTML = "INVALID PRICE TRY AGAIN";
  }
});*/

/*function show() {
  reset();
}

function reset() {
  if (flag === 0) {
    socket.emit("reset");
   
  }
}*/

/*var ID;
var seconds;
function print() {
  document.getElementById("time").innerHTML = "Time : " + seconds;
  seconds--;
  if (seconds == -1) {
    clearInterval(ID);
  }
}
function timer() {
  document.getElementById("time").innerHTML = "Time : 5";
  seconds = 4;
  clearInterval(ID);
  ID = setInterval(print, 1000);
}
*/
