(function() {
  "use strict";

  function isStrictMode() {
    return !this;
  }

  $(document).ready(function() {
    var s = 1;
    $('form fieldset').each(function() {
      $(this).attr('data-q', s++);
    });

    function goNext(el) {
  var step = el.parents('fieldset').last();
  
  // Check if the current 'fieldset' is the last one
  if (step.next().length === 0) {
    return; // Do nothing if it's the last 'fieldset'
  }
  
  step.fadeOut(function() {
    step.next().fadeIn(function() {
      $.stepanimate();
    });
  });

	  
 // Check the user's selection for the second question
    if (step.data('q') === 2) {
      var answer = el.text().toLowerCase();
      var continueCTAYes = document.getElementById('continue-cta-yes');
      var continueCTANo = document.getElementById('continue-cta-no');

      if (answer === 'yes') {
        continueCTAYes.style.display = 'block';
        continueCTANo.style.display = 'none';
      } else if (answer === 'no') {
        continueCTAYes.style.display = 'none';
        continueCTANo.style.display = 'block';
      }
    }
  }
    $(document).on('click', "button", function() {
  goNext($(this));
});

  // First Step Progress
$(".progress_box").slideDown();
var cV = $('.progress-val span');
var tS = $("fieldset").length;
var q = $('form fieldset:visible').data('q');
var p = (q) + "/" + (tS -1);
$('.progress-bar').css({
width: (q / tS) * 100 + '%'
});
cV.text(p);
});

$.stepanimate = function() {
var cV = $('.progress-val span');
var tS = $("fieldset").length;
var q = $('form fieldset:visible').data('q');
var p = (q) + "/" + (tS - 1);
$('.progress-bar').css({
width: (q / tS) * 100 + '%'
});
cV.text(p);

if (q >= 2) {
$.mainH();
}

if (q == tS) {
$.steps();


}
};


  $.steps = function() {
    var timeVar = null,
      count = 1;
    showProgress(count++);
    timeVar = setInterval(function() {
      showProgress(count++);
    }, 2000);

    function showProgress(count) {
      switch (count) {
        case 1:
          $('.step' + count).show();
          break;
        case 2:
        case 3:
          $('.step' + (count - 1)).hide();
          $('.step' + count).show();
          break;
        default:
          if (timeVar) {
            $('.steps').hide();
			$('.progress-val').text('Completed!');
            $('.result').slideDown(function() {
				
                    $('.cta-btn svg').css('display', 'inherit');
  $('.round-bg-icon').css('display', 'inherit');
  
  
            });
         
          }
		  
      }
    }
	// Timer
// function startTimer(duration, display) {
 // var timer = duration, minutes, seconds;
//  var intervalId = setInterval(function () {
 //   minutes = parseInt(timer / 60, 10);
 //   seconds = parseInt(timer % 60, 10);

 //   minutes = minutes < 10 ? "0" + minutes : minutes;
 //   seconds = seconds < 10 ? "0" + seconds : seconds;

 //   display.innerHTML = '<span style="color: #000;"> <span style="font-weight: bold;">NOTE:</span> Due to high demand, your quotes cannot be held for long.</span> ' + '<br><br><span class="timer-icon" style="color: #000; font-weight:500; ">Limited Time Offer </span><span style="color: #FF0000; font-weight:500;">' + minutes + ":" + seconds + ' </span>' ;

 //   if (timer <= 0) {
  //    clearInterval(intervalId);
  //    display.innerHTML = '<span style="color: #000;">This is your last chance to get your Free quotes</span>, <span style="color: #FF0000; font-weight:500;">Click above to continue!</span>';
 //   }

//    timer--;
//  }, 1000);
//}

//var timerElement = document.querySelector('.timer');
//var timerDuration = 120; // Set the duration of the timer in seconds

//startTimer(timerDuration, timerElement);
  };



$.mainH = function() {
    const offsetTop = $('form').offset().top - 40; 
    $('html, body').animate({
      scrollTop: offsetTop
    }, 200);
};

})();
//number of fields

var fieldsets = document.getElementsByTagName('fieldset');
var outputs = document.querySelectorAll('.survey-num');

outputs.forEach(function(output) {
  output.innerHTML = fieldsets.length - 1;
});

for (var i = 0; i < fieldsets.length; i++) {
  fieldsets[i].classList.remove('fieldset');
}

//year
var elements = document.querySelectorAll('.year');
var year = new Date().getFullYear();

elements.forEach(function(element) {
  element.textContent = year;
});


// Geo State Location	

$(document).ready(function() {
  $.ajax({
    url: 'https://get.geojs.io/v1/ip/geo.js',
    dataType: 'jsonp',
    success: function(location) {
      $('.geo_state').html(location.region + "'s ");
    },
    error: function() {
      $('.geo_state').html(" ");
    }
  });
});

// Image Scroll to Form

function scrollToForm() {
    const offsetTop = $('form').offset().top - 40; // Adjust the 20 to the desired spacing in pixels
    $('html, body').animate({
        scrollTop: offsetTop
    }, 200);
}