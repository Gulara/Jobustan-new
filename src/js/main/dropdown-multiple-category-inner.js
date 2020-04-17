// // FOR CATEGORY-INNER.HTML


// ALL JOB TYPES START


$(".dropdown-multiple-job-types-category dt a").on('click', function () {
    $(".dropdown-multiple-job-types-category dd ul").slideToggle('fast');
});

$(".dropdown-multiple-job-types-category dd ul li a").on('click', function () {
    $(".dropdown-multiple-job-types-category dd ul").hide();
});

function getSelectedValue(id) {
    return $("#" + id).find("dt a span.value").html();
}

$(document).bind('click', function (e) {
    var $clicked = $(e.target);
    if (!$clicked.parents().hasClass("dropdown-multiple-job-types-category")) $(".dropdown-multiple-job-types-category dd ul").hide();
});

$('.mutliSelect-job-types-category input[type="checkbox"]').on('click', function () {
    function Populate() {
        vals = $('.mutliSelect-job-types-category input[type="checkbox"]:checked').map(function () {
            return this.value;
        }).get().join(',');
        console.log(vals);
        $('.hidden-multiple-job-types-category').val(vals);
      
    }
    
    $('input[type="checkbox"]').on('change', function () {
        Populate()
    }).change();

  

});
//  ALL JOB TYPES END

// POSTED TIME START
$(".dropdown-multiple-posted-time-category dt a").on('click', function () {
    $(".dropdown-multiple-posted-time-category dd ul").slideToggle('fast');
});

$(".dropdown-multiple-posted-time-category dd ul li a").on('click', function () {
    $(".dropdown-multiple-posted-time-category dd ul").hide();
});

function getSelectedValue(id) {
    return $("#" + id).find("dt a span.value").html();
}

$(document).bind('click', function (e) {
    var $clicked = $(e.target);
    if (!$clicked.parents().hasClass("dropdown-multiple-posted-time-category")) $(".dropdown-multiple-posted-time-category dd ul").hide();
});

$('.multiSelect-posted-time-category input[type="checkbox"]').on('click', function () {
  
    function Populate() {
        vals = $('.multiSelect-posted-time-category input[type="checkbox"]:checked').map(function () {
            return this.value;
        }).get().join(',');
        console.log(vals);
        $('.hidden-multiple-posted-time-category').val(vals);
    }
    
    $('input[type="checkbox"]').on('change', function () {
        Populate()
    }).change();


});


//POSTED TIME END

// LOCATION START
$(".dropdown-multiple-location-category dt a").on('click', function () {
    $(".dropdown-multiple-location-category dd ul").slideToggle('fast');
});

$(".dropdown-multiple-location-category dd ul li a").on('click', function () {
    $(".dropdown-multiple-location-category dd ul").hide();
});

function getSelectedValue(id) {
    return $("#" + id).find("dt a span.value").html();
}

$(document).bind('click', function (e) {
    var $clicked = $(e.target);
    if (!$clicked.parents().hasClass("dropdown-multiple-location-category")) $(".dropdown-multiple-location-category dd ul").hide();
});

$('.mutliSelect-location-category input[type="checkbox"]').on('click', function () {
    var title = $(this).val();
    function Populate() {
        vals = $('.mutliSelect-location-category input[type="checkbox"]:checked').map(function () {
            return this.value;
        }).get().join(',');
        console.log(vals);
        $('.hidden-multiple-location-category').val(vals);
    }
    
    $('input[type="checkbox"]').on('change', function () {
        Populate()
    }).change();

});
//LOCATION END


// MORE START
$(".dropdown-multiple-more-category dt a").on('click', function () {
    $(".dropdown-multiple-more-category dd ul").slideToggle('fast');
});

$(".dropdown-multiple-more-category dd ul li a").on('click', function () {
    $(".dropdown-multiple-more-category dd ul").hide();
});

function getSelectedValue(id) {
    return $("#" + id).find("dt a span.value").html();
}

$(document).bind('click', function (e) {
    var $clicked = $(e.target);
    if (!$clicked.parents().hasClass("dropdown-multiple-more-category")) $(".dropdown-multiple-more-category dd ul").hide();
});

$('.mutliSelect-more-category input[type="checkbox"]').on('click', function () {
    var title = $(this).val();
    function Populate() {
        vals = $('.mutliSelect-more-category input[type="checkbox"]:checked').map(function () {
            return this.value;
        }).get().join(',');
        console.log(vals);
        $('.hidden-multiple-more-category').val(vals);
    }
    
    $('input[type="checkbox"]').on('change', function () {
        Populate()
    }).change();

});
//MORE END










