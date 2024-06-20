setTimeout(function() {
  fadeOutPreloader(document.getElementById('preloader'), 69);
}, 1500);

$(document).ready(function() {
  $(window).on('beforeunload', function() {
    window.scrollTo(0, 0);
  });

  /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
  particlesJS.load('landing', 'assets/particles.json', function() {});

  // Typing Text
  var element = document.getElementById('txt-rotate');
  var toRotate = element.getAttribute('data-rotate');
  var period = element.getAttribute('data-period');
  setTimeout(function() {
    new TxtRotate(element, JSON.parse(toRotate), period);
  }, 1500);

  // INJECT CSS
  var css = document.createElement('style');
  css.type = 'text/css';
  css.innerHTML = '#txt-rotate > .wrap { border-right: 0.08em solid #666 }';
  document.body.appendChild(css);

  // Initialize AOS
  AOS.init({
    disable: 'mobile',
    offset: 200,
    duration: 600,
    easing: 'ease-in-sine',
    delay: 100,
    once: true
  });

  randomizeOrder();
});

/* FUNCTIONS */
/* Preloader */

function fadeOutPreloader(element, duration) {
  opacity = 1;

  interval = setInterval(function() {
    if (opacity <= 0) {
      element.style.zIndex = 0;
      element.style.opacity = 0;
      element.style.filter = 'alpha(opacity = 0)';

      // Allow horizontal scroll
      document.documentElement.style.overflowY = 'auto';

      // Remove preloader div
      document.getElementById('preloader').remove();

      clearInterval(interval);
    } else {
      opacity -= 0.1;
      element.style.opacity = opacity;
      element.style.filter = 'alpha(opacity = ' + opacity * 100 + ')';
    }
  }, duration);
}

/* Typing Text */

var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }
  this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 5;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

/* Word Cloud */


function showVideo(type) {
  const video = document.getElementById('video');
  const videoTitle = document.getElementById('video-title');
  const script = document.getElementById('script');

  if (type === 'all') {
      video.src = '/assets/video/Y2meta.app - [ 세이렌 ] 재혼황후 - 수애 _성우지망생 더빙.mp4';
      videoTitle.textContent = '네이버웹툰 : 재혼황후 - 수애';
      script.textContent = 'This is the script content for the video 1. It can be multiple paragraphs of text.';
  } else if (type === 'language') {
      video.src = '/assets/video/Y2meta.app-[ 세이렌 ] 오버워치 단편 애니메이션 - 잠입 _ 성우지망생 더빙-(720p60).mp4';
      videoTitle.textContent = '오버워치 단편 애니메이션 : 잠입 - 솜브라';
      script.textContent = 'This is the script content for the video 2. It can be multiple paragraphs of text.';
  } else if (type === 'framework') {
      video.src = '/assets/video/Y2meta.app-【더빙팀 V_L】 발로란트 시네마틱 [모두가 함께] (우리말 더빙)-(720p60).mp4';
      videoTitle.textContent = '발로란트 시네마틱 : 모두가 함께 - 세이지';
      script.textContent = 'This is the script content for the video 3. It can be multiple paragraphs of text.';
  }

  // Reload video to apply new source
  video.load();
}

