setTimeout(function () {
  fadeOutPreloader(document.getElementById("preloader"), 69);
}, 1500);

$(document).ready(function () {
  $(window).on("beforeunload", function () {
    window.scrollTo(0, 0);
  });

  /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
  particlesJS.load("landing", "assets/particles.json", function () {});

  // Typing Text
  var element = document.getElementById("txt-rotate");
  var toRotate = element.getAttribute("data-rotate");
  var period = element.getAttribute("data-period");
  setTimeout(function () {
    new TxtRotate(element, JSON.parse(toRotate), period);
  }, 1500);

  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = "#txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);

  // Initialize AOS
  AOS.init({
    disable: "mobile",
    offset: 200,
    duration: 600,
    easing: "ease-in-sine",
    delay: 100,
    once: true,
  });

  randomizeOrder();
});

/* FUNCTIONS */
/* Preloader */

function fadeOutPreloader(element, duration) {
  opacity = 1;

  interval = setInterval(function () {
    if (opacity <= 0) {
      element.style.zIndex = 0;
      element.style.opacity = 0;
      element.style.filter = "alpha(opacity = 0)";

      // Allow horizontal scroll
      document.documentElement.style.overflowY = "auto";

      // Remove preloader div
      document.getElementById("preloader").remove();

      clearInterval(interval);
    } else {
      opacity -= 0.1;
      element.style.opacity = opacity;
      element.style.filter = "alpha(opacity = " + opacity * 100 + ")";
    }
  }, duration);
}

/* Typing Text */

var TxtRotate = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }
  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 5;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

/* Word Cloud */

function showRandomSkill() {
  var parent = document.getElementById("skills");
  var divs = parent.getElementsByTagName("div");

  // 무작위로 하나의 div를 선택합니다.
  var randomIndex = Math.floor(Math.random() * divs.length);
  var randomDiv = divs[randomIndex];

  // 모든 div 요소를 제거합니다.
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }

  // 선택한 무작위 div만 부모 요소에 다시 추가합니다.
  parent.appendChild(randomDiv);
}
