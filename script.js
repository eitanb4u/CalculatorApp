gsap.from(".btn", { duration: 1, width: "3900px" });
gsap.from(".btn", { duration: 1, height: "2000px" });

var start = new Audio("./Assets/Sounds/start.wav");
var click1 = new Audio("./Assets/Sounds/click.wav");
var click2 = new Audio("./Assets/Sounds/click2.wav");
var click3 = new Audio("./Assets/Sounds/click3.wav");
var click4 = new Audio("./Assets/Sounds/click4.wav");
click4.volume = 0.5;

const btn = document.querySelector(".btn");
const view = document.querySelector(".view");
const container = document.querySelector(".container");
var clicked = [];

function goToCalculateButton() {
  console.log("sadfasd");
  container.classList.remove("toggle");
  btn.classList.add("toggle");

  start.play();
  gsap.from(".headLine", { duration: 2, y: "-200%", ease: "bounce" });
  gsap.from(".view", { duration: 2, opacity: 0, ease: "bounce", delay: 1.5 });
  gsap.from(".grid-container", {
    duration: 3,
    opacity: 0,
    ease: "bounce",
    delay: 1.5,
  });
}

function buttonClicked(element) {
  text = element.textContent.replace(/(\r\n|\n|\r)/gm, "").trim();
  var yes = true;
  if (text == "+" || text == "x" || text == "%" || text == "-") {
    click1.play();
    yes = false;
  }
  if (text !== "AC") {
    if (text !== "=") {
      if (yes) click2.play();
      clicked.push(text);
      updateViewLikeClicked();
    } else {
      click4.play();
      Calculate();
      return;
    }
  } else {
    click3.play();
    clicked = [];
    updateViewLikeClicked();
  }
}

function updateViewLikeClicked() {
  view.innerHTML = "";
  clicked.forEach((element) => {
    view.innerHTML += element;
  });
  console.log(clicked);
}

var res = 0;
var endRes = 0;
function Calculate() {
  var str1 = "";
  var str2 = "";
  var sign = "";
  var oneTime = false;
  for (let i = 0; i < clicked.length + 1; i++) {
    var e = clicked[i];
    if (
      (!isNaN(e) && sign == "" && !oneTime) ||
      (e == "-" && sign == "" && !oneTime && str1 == "")
    ) {
      str1 += e;
      str2 = "";
    } else if ((e == "+" || e == "-" || e == "%" || e == "x") && !oneTime) {
      sign = e;
      str2 = "";
    } else if (!isNaN(e) && sign != "") {
      str2 += e;
      oneTime = true;
    } else if (
      e === undefined ||
      (isNaN(e) && sign != "" && str1 != "" && str2 != "")
    ) {
      switch (sign) {
        case "+":
          res = parseInt(str1) + parseInt(str2);
          break;
        case "-":
          res = parseInt(str1) - parseInt(str2);
          break;
        case "%":
          res = parseInt(str1) / parseInt(str2);
          break;
        case "x":
          res = parseInt(str1) * parseInt(str2);
          break;
      }
      str1 = res.toString();
      str2 = "";
      sign = e;
      oneTime = true;
    }
  }
  fillClicked();
  view.textContent = res.toString();
  res = 0;
}

function fillClicked() {
  clicked = [];
  var str = res.toString();
  for (let i = 0; i < str.length; i++) {
    clicked[i] = str[i];
  }
}
