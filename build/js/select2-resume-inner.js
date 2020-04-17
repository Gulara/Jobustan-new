// FOR RESUME-INNER.HTML

$(".job-types-select2").select2({
    closeOnSelect : false,
    placeholder: function(){
        
        $(this).data('placeholder');
    },
  
	allowHtml: true,
	// allowClear: true,
    tags: true, // создает новые опции на лету

}).on('change', function() {
    $(".job-types-select2").attr("placeholder", "Select Status");
    $(this).data('placeholder');
  }).trigger('change');


// $(".job-types-select2").attr("placeholder", "Select Status");
$(".job-posted-time-select2").select2({
    closeOnSelect : false,
    placeholder: function(){
        $(this).data('placeholder');
    },
	allowHtml: true,
	// allowClear: true,
    tags: true, // создает новые опции на лету

});
$(".job-location-select2").select2({
    closeOnSelect : false,
    placeholder: function(){
        $(this).data('placeholder');
    },
	allowHtml: true,
	// allowClear: true,
    tags: true, // создает новые опции на лету

});
$(".job-more-select2").select2({
    closeOnSelect : false,
    placeholder: function(){
        $(this).data('placeholder');
    },
	allowHtml: true,
	// allowClear: true,
    tags: true, // создает новые опции на лету

});

