const subscribeBtn = document.getElementById('subscribe-btn');
const subscribeEmail = document.getElementById('email_subscribe');
const feedbackBtn = document.getElementById('feedback_btn');
const feedbackText = document.getElementById('feedback_text');

document.addEventListener("DOMContentLoaded", () => {
  subscribeEmail.value = localStorage.getItem('userEmail');
});


subscribeBtn.addEventListener('click', function() {
  if(subscribeEmail.value.length > 0){
    alert("You have successfully subscribed with the email: " + subscribeEmail.value);
  }
  else{
    alert("Please enter valid email address.");
  }
});

feedbackBtn.addEventListener('click', function() {
  if(feedbackText.value.length > 0){
    alert("Thank you for your feedback");
  }
  else{
    alert("Please type something in feedback");
  }
  feedbackText.value = '';
});

var swiper = new Swiper(".books-slider", {
    loop:true,
    centeredSlides: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });
  var swiper = new Swiper(".featured-slider", {
    spaceBetween: 10,
    loop:true,
    centeredSlides: true,
    autoplay: {
      delay: 1000,
      disableOnInteraction: false,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      450: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      1024: {
        slidesPerView: 4,
      },
    },
  });
  var swiper = new Swiper(".reviews-slider", {
    spaceBetween: 10,
    grabCursor:true,
    loop:true,
    centeredSlides: true,
    autoplay: {
      delay: 9500,
      disableOnInteraction: false,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });
  