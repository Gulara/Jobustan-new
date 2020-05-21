// FOR RESUME-INNER.HTML

// ALL JOB TYPES START


// NEW NEW NEW job types resume START
function setJobTypesValues(){
    vals1 = $('.mutliSelect-job-types-resume input[type="checkbox"]:checked')
    .map(function () {
        return this.value;
    })
    .get()
    .join(',');
    $('.hidden-multiple-job-types-resume').val(vals1);
}
function setJobTimeValues(){
    vals2 = $('.mutliSelect-posted-time-resume input[type="checkbox"]:checked').map(function () {
        return this.value;
    }).get().join(',');
    $('.hidden-multiple-posted-time-resume').val(vals2);

}
function setJobLocationValues(){
    vals3 = $('.mutliSelect-location-resume input[type="checkbox"]:checked').map(function () {
        return this.value;
    }).get().join(',');
    $('.hidden-multiple-location-resume').val(vals3);
}
function setJobMoreValues(){
    vals4 = $('.mutliSelect-more-resume input[type="checkbox"]:checked').map(function () {
        return this.value;
    }).get().join(',');
    $('.hidden-multiple-more').val(vals4);
}

// NEW NEW NEW job types resume END

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
 
});
//MORE END


//  NEW NEW NEW   ALL INPUTS START

$('input[type="checkbox"]').on('change', function () {
    setJobTypesValues();
    setJobTimeValues();
    setJobLocationValues();
    setJobMoreValues()
    

   

    let outerDiv = $('<div></div>')
    let dataId = $(this).attr("data-id");
    if ($(this).is(":checked")) {
        $(outerDiv)
            .addClass("resume-inner__all-categories--item")
            .append($('<span></span>').addClass("resume-inner__all-categories--text")
                .attr("data-id", $(this).attr("data-id"))
                .html($(this).attr("data-id"))
            )
            .append($('<i></i>')
                .addClass("fas fa-times  resume-inner__remove-btn")
            );


        $(".resume-inner__all-categories--container").append(outerDiv);
        $(".resume-inner__remove-btn").click(function () {
            $(this).parent().remove()

            //console.log(this)


             removeDataId = $(this).siblings().attr("data-id")

             $(`[data-id='${removeDataId}']`).prop("checked",false);
             setJobTypesValues();
             setJobTimeValues();
             setJobLocationValues();
             setJobMoreValues()
    

        });
    } else {
        $('.resume-inner__all-categories--container').find('span:contains("' + $(this).attr("data-id")+ '")').parent().remove();
    }

  
});
