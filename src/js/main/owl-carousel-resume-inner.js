 // OWL CAROUSEL
 $(document).ready(function(){
    $(".owl-carousel-resume-inner").owlCarousel({
      loop:false,
    margin:10,
    dots:false,
    responsiveClass:true,
    responsive:{
        0:{
            items:1,
            nav:false,
          margin:0,
    
        },
      
        500:{
            items:3,
            nav:false
        },
        1000:{
            items:4,
            nav:false
        },
        1300:{
            items:6,
            nav:false,
            loop:false
        }
    }
    });
  });