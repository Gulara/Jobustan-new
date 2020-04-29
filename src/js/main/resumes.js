// FOR RESUMES.HTML

$('.filter').change(function () {

  filter_function();

  //calling filter function each select box value change

});

$('.filter-table tbody tr').show(); //intially all rows will be shown

function filter_function() {
  $('.filter-table tbody tr').hide(); //hide all rows

  var companyFlag = 0;
  var companyValue = $('#filter-company').val();
  var contactFlag = 0;
  var contactValue = $('#filter-contact').val();
  var rangeFlag = 0;
  var rangeValue = $('#filter-range').val();
  var rangeminValue = $('#filter-range').find(':selected').attr('data-min');
  var rangemaxValue = $('#filter-range').find(':selected').attr('data-max');

  //setting intial values and flags needed

  //traversing each row one by one
  $('.filter-table tr').each(function () {

    if (companyValue == 0) { //if no value then display row
      companyFlag = 1;
    } else if (companyValue == $(this).find('td.company').data('company')) {
      companyFlag = 1; //if value is same display row
    } else {
      companyFlag = 0;
    }


    if (contactValue == 0) {
      contactFlag = 1;
    } else if (contactValue == $(this).find('td.contact').data('contact')) {
      contactFlag = 1;
    } else {
      contactFlag = 0;
    }



    if (rangeValue == 0) {
      rangeFlag = 1;
    }
    //condition to display rows for a range
    else if ((rangeminValue <= $(this).find('td.range').data('min') && rangemaxValue > $(this).find('td.range').data('min')) || (
        rangeminValue < $(this).find('td.range').data('max') &&
        rangemaxValue >= $(this).find('td.range').data('max'))) {
      rangeFlag = 1;
    } else {
      rangeFlag = 0;
    }

    console.log(rangeminValue + ' ' + rangemaxValue);
    console.log($(this).find('td.range').data('min') + ' ' + $(this).find('td.range').data('max'));


    if (companyFlag && contactFlag && rangeFlag) {
      $(this).show(); //displaying row which satisfies all conditions
    }

  });

}


$(".search-table").on("keyup", function () {
  var value = $(this).val().toLowerCase();
  $(".filter-table tr").filter(function () {
    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
  });
});

// OWL CAROUSEL START
$(document).ready(function () {
  $(".owl-carousel-category").owlCarousel({
    loop: true,
    margin: 10,
    dots: false,
    responsiveClass: true,
    responsive: {
      0: {
        items: 2,
        nav: true
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
        nav: true,
        loop: false
      },
      1400: {
        items: 10,
        nav: true,
        loop: false
      }
    }
  });
  $(".owl-carousel-searchFilter").owlCarousel({
    loop: false,
    margin: 0,
    dots: false,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        nav: true
      },
      400: {
        items: 1,
        nav: false
      },
      600: {
        items: 3,
     
      },
      800: {
        items: 4,
        nav: false
      },
      1200: {
        items: 5,
        nav: true,
      
      },
     
    }
  });
});
// CATEGORY ITEM
$(document).ready(function () {
  $(".owl-carousel-category-item").owlCarousel({
    loop: true,
    margin: 10,
    dots: false,
    nav: false,
    // responsiveClass:true,
    responsive: {
      0: {
        items: 1,
        nav: true
      },
      600: {
        items: 3,
        nav: false
      },
      1000: {
        items: 12,
        nav: true,
        loop: false
      }
    }
  });
});
// FOW WHO ITEM
$(document).ready(function () {
  $(".owl-carousel-forwho-item").owlCarousel({
    loop: true,
    margin: 10,
    dots: false,
    nav: false,
    // responsiveClass:true,
    responsive: {
      0: {
        items: 1,
        nav: true
      },
      600: {
        items: 3,
        nav: false
      },
      1000: {
        items: 12,
        nav: true,
        loop: false
      }
    }
  });
});
// ADDITION ITEM
$(document).ready(function () {
  $(".owl-carousel-addition-item").owlCarousel({
    loop: true,
    margin: 10,
    dots: false,
    nav: false,
    // responsiveClass:true,
    responsive: {
      0: {
        items: 1,
        nav: true
      },
      600: {
        items: 3,
        nav: false
      },
      1000: {
        items: 12,
        nav: true,
        loop: false
      }
    }
  });
});
// HEIGHT ITEM
$(document).ready(function () {
  $(".owl-carousel-height-item").owlCarousel({
    loop: true,
    margin: 10,
    dots: false,
    nav: false,
    // responsiveClass:true,
    responsive: {
      0: {
        items: 1,
        nav: true
      },
      600: {
        items: 3,
        nav: false
      },
      1000: {
        items: 12,
        nav: true,
        loop: false
      }
    }
  });
});
// WIDTH ITEM
$(document).ready(function () {
  $(".owl-carousel-width-item").owlCarousel({
    loop: true,
    margin: 10,
    dots: false,
    nav: false,
    // responsiveClass:true,
    responsive: {
      0: {
        items: 1,
        nav: true
      },
      600: {
        items: 3,
        nav: false
      },
      1000: {
        items: 12,
        nav: true,
        loop: false
      }
    }
  });
});
// OWL CAROUSEL END
//  NUMBER OF CHECKED
$(document).ready(function () {
  var numberOfChecked = $('input:checkbox:checked').length;
  console.log()
  var totalCheckboxes = $('input:checkbox').length;
  var numberNotChecked = totalCheckboxes - numberOfChecked;
})


