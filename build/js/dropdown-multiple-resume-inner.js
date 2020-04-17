// FOR RESUME-INNER.HTML

// ALL JOB TYPES START


$(".dropdown-multiple-job-types-resume dt a").on('click', function () {
    $(".dropdown-multiple-job-types-resume dd ul").slideToggle('fast');
});

$(".dropdown-multiple-job-types-resume dd ul li a").on('click', function () {
    $(".dropdown-multiple-job-types-resume dd ul").hide();
});

function getSelectedValue(id) {
    return $("#" + id).find("dt a span.value").html();
}

$(document).bind('click', function (e) {
    var $clicked = $(e.target);
    if (!$clicked.parents().hasClass("dropdown-multiple-job-types-resume")) $(".dropdown-multiple-job-types-resume dd ul").hide();
});

$('.mutliSelect-job-types-resume input[type="checkbox"]').on('click', function () {
    function Populate() {
        vals = $('.mutliSelect-job-types-resume input[type="checkbox"]:checked').map(function () {
            return this.value;
        }).get().join(',');
        console.log(vals);
        $('.hidden-multiple-job-types-resume').val(vals);
      
    }
    
    $('input[type="checkbox"]').on('change', function () {
        Populate()
    }).change();

  

});
//  ALL JOB TYPES END

// POSTED TIME START
$(".dropdown-multiple-posted-time-resume dt a").on('click', function () {
    $(".dropdown-multiple-posted-time-resume dd ul").slideToggle('fast');
});

$(".dropdown-multiple-posted-time-resume dd ul li a").on('click', function () {
    $(".dropdown-multiple-posted-time-resume dd ul").hide();
});

function getSelectedValue(id) {
    return $("#" + id).find("dt a span.value").html();
}

$(document).bind('click', function (e) {
    var $clicked = $(e.target);
    if (!$clicked.parents().hasClass("dropdown-multiple-posted-time-resume")) $(".dropdown-multiple-posted-time-resume dd ul").hide();
});

$('.mutliSelect-posted-time-resume input[type="checkbox"]').on('click', function () {
    var title = $(this).val();
    function Populate() {
        vals = $('.mutliSelect-posted-time-resume input[type="checkbox"]:checked').map(function () {
            return this.value;
        }).get().join(',');
        console.log(vals);
        $('.hidden-multiple-posted-time-resume').val(vals);
    }
    
    $('input[type="checkbox"]').on('change', function () {
        Populate()
    }).change();

});
//POSTED TIME END

// LOCATION START
$(".dropdown-multiple-location-resume dt a").on('click', function () {
    $(".dropdown-multiple-location-resume dd ul").slideToggle('fast');
});

$(".dropdown-multiple-location-resume dd ul li a").on('click', function () {
    $(".dropdown-multiple-location-resume dd ul").hide();
});

function getSelectedValue(id) {
    return $("#" + id).find("dt a span.value").html();
}

$(document).bind('click', function (e) {
    var $clicked = $(e.target);
    if (!$clicked.parents().hasClass("dropdown-multiple-location-resume")) $(".dropdown-multiple-location-resume dd ul").hide();
});

$('.mutliSelect-location-resume input[type="checkbox"]').on('click', function () {
    var title = $(this).val();
    function Populate() {
        vals = $('.mutliSelect-location-resume input[type="checkbox"]:checked').map(function () {
            return this.value;
        }).get().join(',');
        console.log(vals);
        $('.hidden-multiple-location-resume').val(vals);
    }
    
    $('input[type="checkbox"]').on('change', function () {
        Populate()
    }).change();

});
//LOCATION END


// MORE START
$(".dropdown-multiple-more-resume dt a").on('click', function () {
    $(".dropdown-multiple-more-resume dd ul").slideToggle('fast');
});

$(".dropdown-multiple-more-resume dd ul li a").on('click', function () {
    $(".dropdown-multiple-more-resume dd ul").hide();
});

function getSelectedValue(id) {
    return $("#" + id).find("dt a span.value").html();
}

$(document).bind('click', function (e) {
    var $clicked = $(e.target);
    if (!$clicked.parents().hasClass("dropdown-multiple-more-resume")) $(".dropdown-multiple-more-resume dd ul").hide();
});

$('.mutliSelect-more-resume input[type="checkbox"]').on('click', function () {
    var title = $(this).val();
    function Populate() {
        vals = $('.mutliSelect-more-resume input[type="checkbox"]:checked').map(function () {
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







