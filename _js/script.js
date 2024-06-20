document.addEventListener("DOMContentLoaded", function() {
    // 버튼 클릭 시 처리
    var allButton = document.getElementById("all");
    var languageButton = document.getElementById("language");
    var frameworkButton = document.getElementById("framework");
  
    allButton.addEventListener("click", function() {
      showContent("video1");
    });
  
    languageButton.addEventListener("click", function() {
      showContent("video2");
    });
  
    frameworkButton.addEventListener("click", function() {
      showContent("video3");
    });
  
    // 초기 화면 설정
    showContent("video1"); // 초기에는 all 버튼에 해당하는 콘텐츠를 보여줌
  
    // 콘텐츠를 보여주는 함수
    function showContent(contentId) {
      var allContent = document.querySelectorAll(".content-item");
      for (var i = 0; i < allContent.length; i++) {
        allContent[i].style.display = "none"; // 모든 콘텐츠를 숨김
      }
      var selectedContent = document.getElementById(contentId);
      if (selectedContent) {
        selectedContent.style.display = "block"; // 선택한 콘텐츠만 보여줌
      }
    }
  });
  