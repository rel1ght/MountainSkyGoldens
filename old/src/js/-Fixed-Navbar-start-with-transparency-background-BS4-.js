import $ from "jquery";
$(document).ready(function () {
  var stoptransparency = 120; // when to stop the transparent menu
  var hidingmenu = 2000; // when to hide the menu
  var lazyflag = false;
  var lastScrollTop = 0,
    delta = 5;
  $(this).scrollTop(0);
  $(window).on("scroll load resize", function () {
    var position = $(this).scrollTop();
    if (position > stoptransparency) {
      //
      //
      //if mobile change stoptransparency to 0
      //
      $("#transmenu").removeClass("transparency");
      lazyflag = true;
    } else {
      $("#transmenu").addClass("transparency");
      lazyflag = false;
    }
    if (Math.abs(lastScrollTop - position) <= delta) return;
    if (position > hidingmenu && position > lastScrollTop) {
      $("#transmenu").fadeOut(600);
    } else {
      $("#transmenu").fadeIn(600);
    }
    lastScrollTop = position;
  });

  $("#transmenu .dropdown").on("show.bs.dropdown", function () {
    $(this).find(".dropdown-menu").first().stop(true, true).slideDown(300);
  });

  $("#transmenu .dropdown").on("hide.bs.dropdown", function () {
    $(this).find(".dropdown-menu").first().stop(true, true).slideUp(300);
  });

  var button = document.getElementById("navbar-toggle");
  button.addEventListener("click", (e) => {
    if ($("#navbar-toggle").hasClass("collapsed")) {
      $("#transmenu").removeClass("transparency");
    } else {
      if (lazyflag === false) {
        $("#transmenu").addClass("transparency");
      }
    }
  });
});
