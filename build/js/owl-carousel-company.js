$(document).ready(function () {
    $(".company__owl-carousel").owlCarousel({
      loop: true,
      margin: 10,
      dots: false,
      nav: false,
      responsiveClass: true,
      responsive: {
        0: {
          items: 2,
        
        },
        400: {
          items: 3,
          nav: false
        },
        600: {
          items: 5,
          nav: false
        },
        1000: {
          items: 8,
        
          loop: false
        },
        1400: {
          items: 10,
     
          loop: false
        }
      }
    });
});