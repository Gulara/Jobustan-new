// ALL JOB TYPES START


$(".dropdown-multiple-job-types dt a").on('click', function () {
    $(".dropdown-multiple-job-types dd ul").slideToggle('fast');
});

$(".dropdown-multiple-job-types dd ul li a").on('click', function () {
    $(".dropdown-multiple-job-types dd ul").hide();
});

function getSelectedValue(id) {
    return $("#" + id).find("dt a span.value").html();
}

$(document).bind('click', function (e) {
    var $clicked = $(e.target);
    if (!$clicked.parents().hasClass("dropdown-multiple-job-types")) $(".dropdown-multiple-job-types dd ul").hide();
});

$('.mutliSelect-job-types input[type="checkbox"]').on('click', function () {
    function Populate() {
        vals = $('.mutliSelect-job-types input[type="checkbox"]:checked').map(function () {
            return this.value;
        }).get().join(',');
        console.log(vals);
        $('.hidden-multiple-job-types').val(vals);
      
    }
    
    $('input[type="checkbox"]').on('change', function () {
        Populate()
    }).change();

  

});
//  ALL JOB TYPES END

// POSTED TIME START
$(".dropdown-multiple-posted-time dt a").on('click', function () {
    $(".dropdown-multiple-posted-time dd ul").slideToggle('fast');
});

$(".dropdown-multiple-posted-time dd ul li a").on('click', function () {
    $(".dropdown-multiple-posted-time dd ul").hide();
});

function getSelectedValue(id) {
    return $("#" + id).find("dt a span.value").html();
}

$(document).bind('click', function (e) {
    var $clicked = $(e.target);
    if (!$clicked.parents().hasClass("dropdown-multiple-posted-time")) $(".dropdown-multiple-posted-time dd ul").hide();
});

$('.mutliSelect-posted-time input[type="checkbox"]').on('click', function () {
    var title = $(this).val();
    function Populate() {
        vals = $('.mutliSelect-posted-time input[type="checkbox"]:checked').map(function () {
            return this.value;
        }).get().join(',');
        console.log(vals);
        $('.hidden-multiple-posted-time').val(vals);
    }
    
    $('input[type="checkbox"]').on('change', function () {
        Populate()
    }).change();

});
//POSTED TIME END

// LOCATION START
$(".dropdown-multiple-location dt a").on('click', function () {
    $(".dropdown-multiple-location dd ul").slideToggle('fast');
});

$(".dropdown-multiple-location dd ul li a").on('click', function () {
    $(".dropdown-multiple-location dd ul").hide();
});

function getSelectedValue(id) {
    return $("#" + id).find("dt a span.value").html();
}

$(document).bind('click', function (e) {
    var $clicked = $(e.target);
    if (!$clicked.parents().hasClass("dropdown-multiple-location")) $(".dropdown-multiple-location dd ul").hide();
});

$('.mutliSelect-location input[type="checkbox"]').on('click', function () {
    var title = $(this).val();
    function Populate() {
        vals = $('.mutliSelect-location input[type="checkbox"]:checked').map(function () {
            return this.value;
        }).get().join(',');
        console.log(vals);
        $('.hidden-multiple-location').val(vals);
    }
    
    $('input[type="checkbox"]').on('change', function () {
        Populate()
    }).change();

});
//LOCATION END


// MORE START
$(".dropdown-multiple-more dt a").on('click', function () {
    $(".dropdown-multiple-more dd ul").slideToggle('fast');
});

$(".dropdown-multiple-more dd ul li a").on('click', function () {
    $(".dropdown-multiple-more dd ul").hide();
});

function getSelectedValue(id) {
    return $("#" + id).find("dt a span.value").html();
}

$(document).bind('click', function (e) {
    var $clicked = $(e.target);
    if (!$clicked.parents().hasClass("dropdown-multiple-more")) $(".dropdown-multiple-more dd ul").hide();
});

$('.mutliSelect-more input[type="checkbox"]').on('click', function () {
    var title = $(this).val();
    function Populate() {
        vals = $('.mutliSelect-more input[type="checkbox"]:checked').map(function () {
            return this.value;
        }).get().join(',');
        console.log(vals);
        $('.hidden-multiple-more').val(vals);
    }
    
    $('input[type="checkbox"]').on('change', function () {
        Populate()
    }).change();

});
//MORE END



