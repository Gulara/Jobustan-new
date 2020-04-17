// JOBS-SEARCH.HTML
//IF CHECKED AD <li class="jobs__criterias-list"> ELSE REMOVE <li class="jobs__criterias-list">

$(document).ready(function() {
  $(".form-check-input").change(function() {
    var name = $(this).attr("data-name");
    var value = $(this).attr("data-id");
    var $this = $(this);
    if ($this.is(':checked')) {
                  $(".jobs__criterias").append(
                      '<li class="jobs__criterias-list" id = "'+value+'">\n' +
                      '<button class="myBtn">'+ name +
                      '<a class="delete-criterias"><i class="flaticon-cancel"></i></a>\n' +
                      '</button>\n' +
                      '\n' +
                      '</li>'
                  )
    } else  {
      $('#jobs__criterias').find('#'+value).remove();    
      $('#jobs__criterias1').find('#'+value).remove();
      $('#jobs__criterias2').find('#'+value).remove();        
    }
  });
});



//addCv
$(document).ready(function() {
  $("#blockIfCheked").change(function() {
    var $this = $(this);
    if ($this.is(':checked')) {
      $(".disabled").attr('style', 'display:block');
    } else  {
      $(".disabled").attr('style', 'display:none');
    }
  });
});

$(document).ready(function() {
  $("#d-noneIfCheked").change(function() {
    var $this = $(this);
    if ($this.is(':checked')) {
      $("#endDate").parent().attr('style', 'display:none');
    } else  {
      $("#endDate").parent().attr('style', 'display:block');
    }
  });
});

$(document).ready(function() {
  $("#minorDetails").change(function() {
    var $this = $(this);
    if ($this.is(':checked')) {
      $(".minor-details").attr('style', 'display:block');
      $( "#majorDetails" ).prop( "disabled", true );
    } else  {
      $(".minor-details").attr('style', 'display:none');
      $( "#majorDetails" ).prop( "disabled", false );
    }
  });
});

$(document).ready(function() {
  $("#majorDetails").change(function() {
    var $this = $(this);
    if ($this.is(':checked')) {
      $(".major-details").attr('style', 'display:block');
      $( "#minorDetails" ).prop( "disabled", true );
    } else  {
      $(".major-details").attr('style', 'display:none');
      $( "#minorDetails" ).prop( "disabled", false );
    }
  });
});

$(document).ready(function() {
  $("#stillStaying").change(function() {
    var $this = $(this);
    if ($this.is(':checked')) {
      $(".stillStaying").attr('style', 'display:none');
      $( "#dropout" ).prop( "disabled", true );
    } else  {
      $(".stillStaying").attr('style', 'display:block');
      $( "#dropout" ).prop( "disabled", false );
    }
  });
});
$(document).ready(function() {
  $("#dropout").change(function() {
    var $this = $(this);
    if ($this.is(':checked')) {
      $(".stillStaying").attr('style', 'display:none');
      $(".endDate").attr('style', 'display:none');
      $("#dropoutBlock").addClass("d-block");
      $( "#stillStaying" ).prop( "disabled", true );
    } else  {
      $(".stillStaying").attr('style', 'display:block');
      $(".endDate").attr('style', 'display:block');
      $("#dropoutBlock").removeClass("d-block");
      $( "#stillStaying" ).prop( "disabled", false );
    }
  });
});

$(document).ready(function() {
  $("#dropouthighSchool").change(function() {
    var $this = $(this);
    if ($this.is(':checked')) {
      $(".endDateSchool").attr('style', 'display:none');
      $( "#highSchoolContinue" ).prop( "disabled", true );
    } else  {
      $(".endDateSchool").attr('style', 'display:block');
      $( "#highSchoolContinue" ).prop( "disabled", false );
    }
  });
});

$(document).ready(function() {
  $("#advancedLevel").change(function() {
    var $this = $(this);
    var level = $(".js-example-placeholder-single30").select2();
    level.val("Advanced").trigger("change");
  
  });
});

$(document).ready(function() {
  $('#woman').click(function(){
    $(".ifWoman").addClass('d-none');
  });
  $('#man').click(function(){
    $(".ifWoman").removeClass('d-none');
  });
});



// $("input:radio").change(function () {
//   if () {
//     $("#otherGendInp").removeClass('d-none');
//   }
//   else {
//     $("#otherGendInp").addClass('d-none');
//   }
// });
$(document).ready(function() {

  $(function () {
      $('[data-toggle="popover"]').popover()
    })

  // $(document).on("click",".applied__hintLink",function() {
  //    $(this).parent().find(".applied__hint").css("display", "block");
      
  // //    $(this).parent().children("applied__hint").css("display", "block");
  // });
  // $(document).on("click",".applied__hintClose",function() {
  //     $(this).parent().css("display", "none");
  // });

});
$('.all-courses__carousel').owlCarousel({
    loop:true,
    margin:10,
   
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    }
})
$(document).ready(function () {
    $('.like-button').click(function () {
        $(this).toggleClass('is-active');
    });

    $(".category-inner__right--remove-btn").click(function () {
        $(this).parent().parent().html('')
    });

});


!function($) {
    
    "use strict";// jshint ;_;

    if (typeof ko != 'undefined' && ko.bindingHandlers && !ko.bindingHandlers.multiselect) {
        ko.bindingHandlers.multiselect = {
            init : function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {},
            update : function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                var ms = $('.multiselect-category').data('multiselect');
                if (!ms) {
                    $('.multiselect-category').multiselect(ko.utils.unwrapObservable(valueAccessor()));
                }
                else if (allBindingsAccessor().options && allBindingsAccessor().options().length !== ms.originalOptions.length) {
                    ms.updateOriginalOptions();
                    $('.multiselect-category').multiselect('rebuild');
                }
            }
        };
    }

    function Multiselect(select, options) {

        this.options = this.mergeOptions(options);
        this.$select = $('.multiselect-category');
        
        // Initialization.
        // We have to clone to create a new reference.
        this.originalOptions = this.$select.clone()[0].options;
        this.query = '';
        this.searchTimeout = null;
        
        this.options.multiple = this.$select.attr('multiple') == "multiple";
        this.options.onChange = $.proxy(this.options.onChange, this);
        
        // Build select all if enabled.
        this.buildContainer();
        this.buildButton();
        this.buildSelectAll();
        this.buildDropdown();
        this.buildDropdownOptions();
        this.buildFilter();
        this.updateButtonText();

        this.$select.hide().after(this.$container);
    };

    Multiselect.prototype = {
        
        // Default options.
        defaults: {
            // Default text function will either print 'None selected' in case no
            // option is selected, or a list of the selected options up to a length of 3 selected options.
            // If more than 3 options are selected, the number of selected options is printed.
            buttonText: function(options, select) {
                if (options.length == 0) {
                    return this.nonSelectedText + ' <b class="caret"></b>';
                }
                else {
                    
                    if (options.length > 0) {
                        return options.length + ' ' + this.nSelectedText + ' <b class="caret"></b>';
                    }
                    else {
                        var selected = '';
                        options.each(function() {
                            var label = ($(this).attr('label') !== undefined) ? $(this).attr('label') : $(this).html();
                            
                            //Hack by Victor Valencia R.
                            if($(select).hasClass('multiselect-icon')){
                                var icon = $(this).data('icon');
                                label = '<span class="glyphicon ' + icon + '"></span> ' + label;
                            }
                
                            // selected += label + ', ';
                        });
                        return selected.substr(0, selected.length - 2) + ' <b class="caret"></b>';
                    }
                }
            },
            // Like the buttonText option to update the title of the button.
            buttonTitle: function(options, select) {
                if (options.length == 0) {
                    return this.nonSelectedText;
                }
                else {
                    var selected = '';
                    options.each(function () {
                        return options.length + ' ' + this.nSelectedText ;
                        // selected += $(this).text() + ', ';
                    });
                    return selected.substr(0, selected.length - 2);
                }
            },
            // Is triggered on change of the selected options.
            onChange : function(option, checked) {

            },
            buttonClass: 'btn',
            dropRight: false,
            selectedClass: 'active',
            buttonWidth: 'auto',
            buttonContainer: '<div class="btn-group custom-btn category-inner__custom-btn" />',
            // Maximum height of the dropdown menu.
            // If maximum height is exceeded a scrollbar will be displayed.
            maxHeight: false,
            includeSelectAllOption: false,
            selectAllText: ' Select all',
            selectAllValue: 'multiselect-all',
            enableFiltering: false,
            enableCaseInsensitiveFiltering: false,
            filterPlaceholder: 'Search',
            // possible options: 'text', 'value', 'both'
            filterBehavior: 'text',
            preventInputChangeEvent: false,        
            nonSelectedText: 'Add categories',            
            nSelectedText: 'selected'
        },
        
        // Templates.
        templates: {
            button: '<button type="button" class="multiselect dropdown-toggle category-inner__dropdown-toggle form-control" data-toggle="dropdown"></button>',
            ul: '<ul class="multiselect-container dropdown-menu category-inner__dropdown-menu custom-multi category-inner__multiselect-container"></ul>',
            filter: '<div class="input-group"><span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span><input class="form-control multiselect-search" type="text"></div>',
            li: '<li><a href="javascript:void(0);" class="category-inner__multi-link"><i class="fas fa-check"></i><label></label></a></li>',
            liGroup: '<li><label class="multiselect-group"></label></li>'
        },
        
        constructor: Multiselect,
        
        buildContainer: function() {
            this.$container = $(this.options.buttonContainer);
        },
        
        buildButton: function() {
            // Build button.
            this.$button = $(this.templates.button).addClass(this.options.buttonClass);
            
            // Adopt active state.
            if (this.$select.prop('disabled')) {
                this.disable();
            }
            else {
                this.enable();
            }
           
            // Manually add button width if set.
            if (this.options.buttonWidth) {
                this.$button.css({
                    'width' : this.options.buttonWidth
                });
            }

            // Keep the tab index from the select.
            var tabindex = this.$select.attr('tabindex');
            if (tabindex) {
                this.$button.attr('tabindex', tabindex);
            }
           
            this.$container.prepend(this.$button)
        },
        
        // Build dropdown container ul.
        buildDropdown: function() {
            
            // Build ul.
            this.$ul = $(this.templates.ul);
            
            if (this.options.dropRight) {
                this.$ul.addClass('pull-right');
            }
            
            // Set max height of dropdown menu to activate auto scrollbar.
            if (this.options.maxHeight) {
                // TODO: Add a class for this option to move the css declarations.
                this.$ul.css({
                    'max-height': this.options.maxHeight + 'px',
                    'overflow-y': 'auto',
                    'overflow-x': 'hidden'
                });
            }
            
            this.$container.append(this.$ul)
        },
        
        // Build the dropdown and bind event handling.
        buildDropdownOptions: function() {
            
            this.$select.children().each($.proxy(function(index, element) {
                // Support optgroups and options without a group simultaneously.
                var tag = $(element).prop('tagName').toLowerCase();
                if (tag == 'optgroup') {
                    this.createOptgroup(element);
                }
                else if (tag == 'option') {
                    this.createOptionValue(element);
                }
                // Other illegal tags will be ignored.
            }, this));

            // Bind the change event on the dropdown elements.
            $('li input', this.$ul).on('change', $.proxy(function(event) {
                var checked = $(event.target).prop('checked') || false;
                var isSelectAllOption = $(event.target).val() == this.options.selectAllValue;

                // Apply or unapply the configured selected class.
                if (this.options.selectedClass) {
                    if (checked) {
                        $(event.target).parents('li').addClass(this.options.selectedClass);
                    }
                    else {
                        $(event.target).parents('li').removeClass(this.options.selectedClass);
                    }
                }
                
                // Get the corresponding option.
                var value = $(event.target).val();
                var $option = this.getOptionByValue(value);

                var $optionsNotThis = $('option', this.$select).not($option);
                var $checkboxesNotThis = $('input', this.$container).not($(event.target));

                // Toggle all options if the select all option was changed.
                if (isSelectAllOption) {
                    $checkboxesNotThis.filter(function() {
                        return $(this).is(':checked') != checked;
                    }).trigger('click');
                }

                if (checked) {
                    $option.prop('selected', true);

                    if (this.options.multiple) {
                        // Simply select additional option.
                        $option.prop('selected', true);
                    }
                    else {
                        // Unselect all other options and corresponding checkboxes.
                        if (this.options.selectedClass) {
                            $($checkboxesNotThis).parents('li').removeClass(this.options.selectedClass);
                        }

                        $($checkboxesNotThis).prop('checked', false);
                        $optionsNotThis.prop('selected', false);

                        // It's a single selection, so close.
                        this.$button.click();
                    }

                    if (this.options.selectedClass == "active") {
                        $optionsNotThis.parents("a").css("outline", "");
                    }
                }
                else {
                    // Unselect option.
                    $option.prop('selected', false);
                }

                this.updateButtonText();
                this.$select.change();
                this.options.onChange($option, checked);
                
                if(this.options.preventInputChangeEvent) {
                    return false;
                }
            }, this));

            $('li a', this.$ul).on('touchstart click', function(event) {
                event.stopPropagation();
                $(event.target).blur();
            });

            // Keyboard support.
            this.$container.on('keydown', $.proxy(function(event) {
                if ($('input[type="text"]', this.$container).is(':focus')) {
                    return;
                }
                if ((event.keyCode == 9 || event.keyCode == 27) && this.$container.hasClass('open')) {
                    // Close on tab or escape.
                    this.$button.click();
                }
                else {
                    var $items = $(this.$container).find("li:not(.divider):visible a");

                    if (!$items.length) {
                        return;
                    }

                    var index = $items.index($items.filter(':focus'));

                    // Navigation up.
                    if (event.keyCode == 38 && index > 0) {
                        index--;
                    }
                    // Navigate down.
                    else if (event.keyCode == 40 && index < $items.length - 1) {
                        index++;
                    }
                    else if (!~index) {
                        index = 0;
                    }

                    var $current = $items.eq(index);
                    $current.focus();

                    if (event.keyCode == 32 || event.keyCode == 13) {
                        var $checkbox = $current.find('input');

                        $checkbox.prop("checked", !$checkbox.prop("checked"));
                        $checkbox.change();
                    }

                    event.stopPropagation();
                    event.preventDefault();
                }
            }, this));
        },
        
        // Will build an dropdown element for the given option.
        createOptionValue: function(element) {
            if ($(element).is(':selected')) {
                $(element).prop('selected', true);
            }

            // Support the label attribute on options.
            var label = $(element).attr('label') || $(element).html();            
            var value = $(element).val();
                        
            //Hack by Victor Valencia R.            
            if($(element).parent().hasClass('multiselect-icon') || $(element).parent().parent().hasClass('multiselect-icon')){                                
                var icon = $(element).data('icon');
                label = '<span class="glyphicon ' + icon + '"></span> ' + label;
            } 
            
            var inputType = this.options.multiple ? "checkbox" : "radio";

            var $li = $(this.templates.li);
            $('label', $li).addClass(inputType);
            $('label', $li).append('<input type="' + inputType + '" />');
            
            //Hack by Victor Valencia R.
            if(($(element).parent().hasClass('multiselect-icon') || $(element).parent().parent().hasClass('multiselect-icon')) && inputType == 'radio'){                
                $('label', $li).css('padding-left', '0px');
                $('label', $li).find('input').css('display', 'none');
            }

            var selected = $(element).prop('selected') || false;
            var $checkbox = $('input', $li);
            $checkbox.val(value);

            if (value == this.options.selectAllValue) {
                $checkbox.parent().parent().addClass('multiselect-all');
            }

            $('label', $li).append(" " + label);

            this.$ul.append($li);

            if ($(element).is(':disabled')) {
                $checkbox.attr('disabled', 'disabled').prop('disabled', true).parents('li').addClass('disabled');
            }

            $checkbox.prop('checked', selected);

            if (selected && this.options.selectedClass) {
                $checkbox.parents('li').addClass(this.options.selectedClass);
            }
        },

        // Create optgroup.
        createOptgroup: function(group) {
            var groupName = $(group).prop('label');

            // Add a header for the group.
            var $li = $(this.templates.liGroup);
            $('label', $li).text(groupName);
            
            //Hack by Victor Valencia R.
            $li.addClass('text-primary');
            
            this.$ul.append($li);
            
            // Add the options of the group.
            $('option', group).each($.proxy(function(index, element) {                
                this.createOptionValue(element);
            }, this));
        },
        
        // Add the select all option to the select.
        buildSelectAll: function() {
            var alreadyHasSelectAll = this.$select[0][0] ? this.$select[0][0].value == this.options.selectAllValue : false;
            // If options.includeSelectAllOption === true, add the include all checkbox.
            if (this.options.includeSelectAllOption && this.options.multiple && !alreadyHasSelectAll) {
                this.$select.prepend('<option value="' + this.options.selectAllValue + '">' + this.options.selectAllText + '</option>');
            }
        },
        
        // Build and bind filter.
        buildFilter: function() {
            
            // Build filter if filtering OR case insensitive filtering is enabled and the number of options exceeds (or equals) enableFilterLength.
            if (this.options.enableFiltering || this.options.enableCaseInsensitiveFiltering) {
                var enableFilterLength = Math.max(this.options.enableFiltering, this.options.enableCaseInsensitiveFiltering);
                if (this.$select.find('option').length >= enableFilterLength) {
                    
                    this.$filter = $(this.templates.filter);
                    $('input', this.$filter).attr('placeholder', this.options.filterPlaceholder);
                    this.$ul.prepend(this.$filter);

                    this.$filter.val(this.query).on('click', function(event) {
                        event.stopPropagation();
                    }).on('keydown', $.proxy(function(event) {
                        // This is useful to catch "keydown" events after the browser has updated the control.
                        clearTimeout(this.searchTimeout);

                        this.searchTimeout = this.asyncFunction($.proxy(function() {

                            if (this.query != event.target.value) {
                                this.query = event.target.value;

                                $.each($('li', this.$ul), $.proxy(function(index, element) {
                                    var value = $('input', element).val();
                                    if (value != this.options.selectAllValue) {
                                        var text = $('label', element).text();
                                        var value = $('input', element).val();
                                        if (value && text && value != this.options.selectAllValue) {
                                            // by default lets assume that element is not
                                            // interesting for this search
                                            var showElement = false;

                                            var filterCandidate = '';
                                            if ((this.options.filterBehavior == 'text' || this.options.filterBehavior == 'both')) {
                                                filterCandidate = text;
                                            }
                                            if ((this.options.filterBehavior == 'value' || this.options.filterBehavior == 'both')) {
                                                filterCandidate = value;
                                            }

                                            if (this.options.enableCaseInsensitiveFiltering && filterCandidate.toLowerCase().indexOf(this.query.toLowerCase()) > -1) {
                                                showElement = true;
                                            }
                                            else if (filterCandidate.indexOf(this.query) > -1) {
                                                showElement = true;
                                            }

                                            if (showElement) {
                                                $(element).show();
                                            }
                                            else {
                                                $(element).hide();
                                            }
                                        }
                                    }
                                }, this));
                            }
                        }, this), 300, this);
                    }, this));
                }
            }
        },

        // Destroy - unbind - the plugin.
        destroy: function() {
            this.$container.remove();
            this.$select.show();
        },

        // Refreshs the checked options based on the current state of the select.
        refresh: function() {
            $('option', this.$select).each($.proxy(function(index, element) {
                var $input = $('li input', this.$ul).filter(function() {
                    return $(this).val() == $(element).val();
                });

                if ($(element).is(':selected')) {
                    $input.prop('checked', true);

                    if (this.options.selectedClass) {
                        $input.parents('li').addClass(this.options.selectedClass);
                    }
                }
                else {
                    $input.prop('checked', false);

                    if (this.options.selectedClass) {
                        $input.parents('li').removeClass(this.options.selectedClass);
                    }
                }

                if ($(element).is(":disabled")) {
                    $input.attr('disabled', 'disabled').prop('disabled', true).parents('li').addClass('disabled');
                }
                else {
                    $input.prop('disabled', false).parents('li').removeClass('disabled');
                }
            }, this));

            this.updateButtonText();
        },

        // Select an option by its value or multiple options using an array of values.
        select: function(selectValues) {
            if(selectValues && !$.isArray(selectValues)) {
                selectValues = [selectValues];
            }
            
            for (var i = 0; i < selectValues.length; i++) {
                
                var value = selectValues[i];
                
                var $option = this.getOptionByValue(value);
                var $checkbox = this.getInputByValue(value);

                if (this.options.selectedClass) {
                    $checkbox.parents('li').addClass(this.options.selectedClass);
                }

                $checkbox.prop('checked', true);
                $option.prop('selected', true);                
                this.options.onChange($option, true);
            }

            this.updateButtonText();
        },

        // Deselect an option by its value or using an array of values.
        deselect: function(deselectValues) {
            if(deselectValues && !$.isArray(deselectValues)) {
                deselectValues = [deselectValues];
            }

            for (var i = 0; i < deselectValues.length; i++) {
                
                var value = deselectValues[i];
                
                var $option = this.getOptionByValue(value);
                var $checkbox = this.getInputByValue(value);

                if (this.options.selectedClass) {
                    $checkbox.parents('li').removeClass(this.options.selectedClass);
                }

                $checkbox.prop('checked', false);
                $option.prop('selected', false);               
                this.options.onChange($option, false);
            }

            this.updateButtonText();
        },

        // Rebuild the whole dropdown menu.
        rebuild: function() {
            this.$ul.html('');
            
            // Remove select all option in select.
            $('option[value="' + this.options.selectAllValue + '"]', this.$select).remove();
            
            // Important to distinguish between radios and checkboxes.
            this.options.multiple = this.$select.attr('multiple') == "multiple";
            
            this.buildSelectAll();
            this.buildDropdownOptions();
            this.updateButtonText();
            this.buildFilter();
        },
        
        // Build select using the given data as options.
        dataprovider: function(dataprovider) {
            var optionDOM = "";
            dataprovider.forEach(function (option) {
                optionDOM += '<option value="' + option.value + '">' + option.label + '</option>';
            });

            this.$select.html(optionDOM);
            this.rebuild();
        },

        // Enable button.
        enable: function() {
            this.$select.prop('disabled', false);
            this.$button.prop('disabled', false)
                .removeClass('disabled');
        },

        // Disable button.
        disable: function() {
            this.$select.prop('disabled', true);
            this.$button.prop('disabled', true)
                .addClass('disabled');
        },

        // Set options.
        setOptions: function(options) {
            this.options = this.mergeOptions(options);
        },

        // Get options by merging defaults and given options.
        mergeOptions: function(options) {
            return $.extend({}, this.defaults, options);
        },
        
        // Update button text and button title.
        updateButtonText: function() {
            var options = this.getSelected();
            
            // First update the displayed button text.
            $('button', this.$container).html(this.options.buttonText(options, this.$select));            
            
            // Now update the title attribute of the button.
            $('button', this.$container).attr('title', this.options.buttonTitle(options, this.$select));
            
        },

        // Get all selected options.
        getSelected: function() {
            return $('option[value!="' + this.options.selectAllValue + '"]:selected', this.$select).filter(function() {
                return $(this).prop('selected');
            });
        },
        
        // Get the corresponding option by ts value.
        getOptionByValue: function(value) {
            return $('option', this.$select).filter(function() {
                return $(this).val() == value;
            });
        },
        
        // Get an input in the dropdown by its value.
        getInputByValue: function(value) {
            return $('li input', this.$ul).filter(function() {
                return $(this).val() == value;
            });
        },
        
        updateOriginalOptions: function() {
            this.originalOptions = this.$select.clone()[0].options;
        },

        asyncFunction: function(callback, timeout, self) {
            var args = Array.prototype.slice.call(arguments, 3);
            return setTimeout(function() {
                callback.apply(self || window, args);
            }, timeout);
        }
    };

    $.fn.multiselect = function(option, parameter) {
        return this.each(function() {
            var data = $(this).data('multiselect'), options = typeof option == 'object' && option;

            // Initialize the multiselect.
            if (!data) {
                $(this).data('multiselect', ( data = new Multiselect(this, options)));
            }

            // Call multiselect method.
            if ( typeof option == 'string') {
                data[option](parameter);
            }
        });
    };

    $.fn.multiselect.Constructor = Multiselect;
    
    // Automatically init selects by their data-role.
    $(function() {
        $("select[role='multiselect']").multiselect();
    });

}(window.jQuery);

// function copyFropInput() {
//     var nameInput = document.getElementById('candidateNameInput');
//     var lastNameInput = document.getElementById('candidateLastNameInput');
//     var adressInput = document.getElementById('candidateAdressInput');
//     var mailInput = document.getElementById('candidateMailInput');
//     var siteInput = document.getElementById('candidateSiteInput');
//     var phoneInput = document.getElementById('candidatePhoneInput');
//     var birthdayInput = document.getElementById('candidateBirthdayInput');
//     var countryInput = document.getElementById("candidateCountryInput");
//     var countryValue = countryInput.options[countryInput.selectedIndex].textContent;
//     var sityInput = document.getElementById("candidateSityInput");
//     var sityValue = sityInput.options[sityInput.selectedIndex].textContent;
    
    

//     var nameParagraph = document.getElementById('candidateName');
//     var adressParagraph = document.getElementById('candidateAdress');
//     var mailParagraph = document.getElementById('candidateMail');
//     var siteParagraph = document.getElementById('candidateSite');
//     var phoneParagraph = document.getElementById('candidatePhone');
//     var birthdayParagraph = document.getElementById('candidateBirthday');
//     var countryParagraph = document.getElementById('candidateCountry');
//     var sityParagraph = document.getElementById('candidateSity');


//     nameParagraph.textContent = nameInput.value + " "+ lastNameInput.value;
//     adressParagraph.textContent = adressInput.value;
//     mailParagraph.textContent = mailInput.value;
//     siteParagraph.textContent = siteInput.value;
//     phoneParagraph.textContent = phoneInput.value;
//     birthdayParagraph.textContent = birthdayInput.value;
//     countryParagraph.textContent = countryValue;
//     sityParagraph.textContent = sityValue;

//     document.getElementById("resume__contact-form").style.display= "none";
//   }

  
$(document).ready(function() {    
    var textarea = $("#my_textarea");
    textarea.keydown(function(event) {
        var numbOfchars = textarea.val();
        var len = numbOfchars.length;
        $(".countcharacters--live").text(len);

    });
}); 

$(document).ready(function() {    
    var textarea = $("#my_textarea1");
    textarea.keydown(function(event) {
        var numbOfchars = textarea.val();
        var len = numbOfchars.length;
        $(".countcharacters--live1").text(len);

    });
}); 
$(document).ready(function() {    
    var textarea = $("#my_textarea2");
    textarea.keydown(function(event) {
        var numbOfchars = textarea.val();
        var len = numbOfchars.length;
        $(".countcharacters--live2").text(len);

    });
}); 
$(document).ready(function() {    
    var textarea = $("#my_textarea3");
    textarea.keydown(function(event) {
        var numbOfchars = textarea.val();
        var len = numbOfchars.length;
        $(".countcharacters--live3").text(len);

    });
}); 
$(document).ready(function() {    
    var textarea = $("#my_textarea4");
    textarea.keydown(function(event) {
        var numbOfchars = textarea.val();
        var len = numbOfchars.length;
        $(".countcharacters--live4").text(len);

    });
}); 
$(document).ready(function() {    
    var textarea = $("#my_textarea5");
    textarea.keydown(function(event) {
        var numbOfchars = textarea.val();
        var len = numbOfchars.length;
        $(".countcharacters--live5").text(len);

    });
}); 

$(document).ready(function() {    
    var textarea = $(".text__count");
    textarea.keydown(function(event) {
        var numbOfchars = textarea.val();
        var len = numbOfchars.length;
        $(".countcharacters--live6").text(len);

    });
}); 
$(document).ready(function() {    
    var textarea = $("#my_textarea6");
    textarea.keydown(function(event) {
        var numbOfchars = textarea.val();
        var len = numbOfchars.length;
        $(".countcharacters--live6").text(len);

    });
}); 
$(document).ready(function() {    
    var textarea = $("#my_textarea7");
    textarea.keydown(function(event) {
        var numbOfchars = textarea.val();
        var len = numbOfchars.length;
        $(".countcharacters--live7").text(len);

    });
}); 
$(document).ready(function() {    
    var textarea = $("#my_textarea8");
    textarea.keydown(function(event) {
        var numbOfchars = textarea.val();
        var len = numbOfchars.length;
        $(".countcharacters--live8").text(len);

    });
});

$(document).ready(function() {    
    var myInput = $(".letterTitle");
    myInput.keydown(function(event) {
        var numbOfchars = myInput.val();
        var len = numbOfchars.length;
        $(".countcharacters--live9").text(len);

    });
});
// Start upload preview image
// $(".gambar").attr("src", "https://user.gadjian.com/static/images/personnel_boy.png");
// var $uploadCrop,
//     tempFilename,
//     rawImg,
//     imageId;
// function readFile(input) {
//     if (input.files && input.files[0]) {
//         var reader = new FileReader();
//         reader.onload = function (e) {
//             $('.upload-demo').addClass('ready');
//             $('#cropImagePop').modal('show');
//             rawImg = e.target.result;
//         }
//         reader.readAsDataURL(input.files[0]);
//     }
//     else {
//         swal("Sorry - you're browser doesn't support the FileReader API");
//     }
// }

// $uploadCrop = $('#upload-demo').croppie({
//     viewport: {
//         width: 160,
//         height: 160,
//         type: 'circle'
//     },
//     enforceBoundary: false,
//     enableExif: true,
//     enableOrientation: true
// });
// $('#cropImagePop').on('shown.bs.modal', function () {
//     // alert('Shown pop');
//     $uploadCrop.croppie('bind', {
//         url: rawImg,
//         orientation: 1

//     }).then(function () {
//         console.log('jQuery bind complete');
//     });
//     $('.vanilla-rotate').on('click', function(ev) {
//         $uploadCrop.croppie('rotate', parseInt($(this).data('deg')));
//     });
// });

// $('.item-img').on('change', function () {
//     imageId = $(this).data('id'); tempFilename = $(this).val();
//     $('#cancelCropBtn').data('id', imageId); readFile(this);
// });
// $('#cropImageBtn').on('click', function (ev) {
//     $uploadCrop.croppie('result', {
//         type: 'base64',
//         format: 'jpeg',
//         size: { width: 160, height: 160 }
//     }).then(function (resp) {
//         $('#item-img-output').attr('src', resp);
//         $('#cropImagePop').modal('hide');
//     });
// });
				// End upload preview image˝
//LANGUAGE DROPDOWN
var dropdownButton = document.querySelector('.lang-toggle');
var drMenuItem = document.querySelectorAll('.dropdown-item');
drMenuItem.forEach(function(item) {
    item.addEventListener("click", function(e) {
        dropdownButton.innerText = e.target.innerText;
    });
});
// Range





var acc = document.getElementsByClassName("acardion__btn");
var pluse = document.getElementsByClassName("acardion__plus");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("acardion__active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";

    } else {

      panel.style.display = "block";
    }

  });
}


$(".acardion__btn").click(function () {
  $(this).find($(".acardion__btn--icon")).toggleClass('flaticon-plus').toggleClass('flaticon-minus-symbol acardion__btn--icon-white');
})
// JOBS-SEARCH.HTML

function myFunction() {
    var input, filter, ul, li, div, i, txtValue;
    input = document.getElementById("filterForCheckbox");
    filter = input.value.toUpperCase();
    ul = document.getElementById("checkbox-list");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
       var div = li[i].getElementsByClassName("form-check")[0];
       var txtValue = div.getAttribute('data-name');
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

function myFunction1() {
    var input, filter, ul, li, div, i, txtValue;
    input = document.getElementById("filterForCheckbox1");
    filter = input.value.toUpperCase();
    ul = document.getElementById("checkbox-list1");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
       var div = li[i].getElementsByClassName("form-check")[0];
       var txtValue = div.getAttribute('data-name');
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

function myFunction2() {
    var input, filter, ul, li, div, i, txtValue;
    input = document.getElementById("filterForCheckbox2");
    filter = input.value.toUpperCase();
    ul = document.getElementById("checkbox-list2");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
       var div = li[i].getElementsByClassName("form-check")[0];
       var txtValue = div.getAttribute('data-name');
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

function myFunction3() {
    var input, filter, ul, li, div, i, txtValue;
    input = document.getElementById("filterForCheckbox3");
    filter = input.value.toUpperCase();
    ul = document.getElementById("checkbox-list3");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
       var div = li[i].getElementsByClassName("form-check")[0];
       var txtValue = div.getAttribute('data-name');
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}
function myFunction4() {
    var input, filter, ul, li, div, i, txtValue;
    input = document.getElementById("filterForCheckbox4");
    filter = input.value.toUpperCase();
    ul = document.getElementById("checkbox-list4");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
       var div = li[i].getElementsByClassName("form-check")[0];
       var txtValue = div.getAttribute('data-name');
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

function myFunction5() {
    var input, filter, ul, li, div, i, txtValue;
    input = document.getElementById("filterForCheckbox5");
    filter = input.value.toUpperCase();
    ul = document.getElementById("checkbox-list5");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
       var div = li[i].getElementsByClassName("form-check")[0];
       var txtValue = div.getAttribute('data-name');
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}
function myFunction6() {
    var input, filter, ul, li, div, i, txtValue;
    input = document.getElementById("filterForCheckbox6");
    filter = input.value.toUpperCase();
    ul = document.getElementById("checkbox-list6");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
       var div = li[i].getElementsByClassName("form-check")[0];
       var txtValue = div.getAttribute('data-name');
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

function myFunction7() {
    var input, filter, ul, li, div, i, txtValue;
    input = document.getElementById("filterForCheckbox7");
    filter = input.value.toUpperCase();
    ul = document.getElementById("checkbox-list7");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
       var div = li[i].getElementsByClassName("form-check")[0];
       var txtValue = div.getAttribute('data-name');
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

function myFunction8() {
    var input, filter, ul, li, div, i, txtValue;
    input = document.getElementById("filterForCheckbox8");
    filter = input.value.toUpperCase();
    ul = document.getElementById("checkbox-list8");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
       var div = li[i].getElementsByClassName("form-check")[0];
       var txtValue = div.getAttribute('data-name');
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

function myFunction9() {
    var input, filter, ul, li, div, i, txtValue;
    input = document.getElementById("filterForCheckbox9");
    filter = input.value.toUpperCase();
    ul = document.getElementById("checkbox-list9");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
       var div = li[i].getElementsByClassName("form-check")[0];
       var txtValue = div.getAttribute('data-name');
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

function myFunctionCompany() {
    var input, filter, ul, li, div, i, txtValue;
    input = document.getElementById("filterForCheckbox10");
    filter = input.value.toUpperCase();
    ul = document.getElementById("checkbox-list10");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
       var div = li[i].getElementsByClassName("form-check")[0];
       var txtValue = div.getAttribute('data-name');
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}


  Inputmask({ alias: "datetime", inputFormat: "dd/mm/yyyy" }).mask(".qwerty");

  $("#phone").inputmask({"mask": "+999 (99) - 999 - 99 - 99"});


  $('#taxid').keypress(function(event){
    
    if(event.which != 8 && isNaN(String.fromCharCode(event.which))){
    event.preventDefault();   
    } 
    if(this.value.length==10) {
      return false;
    }
});

function openNav() {
    document.getElementById("mySidenav").style.width = "280px";

}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("jobs__phone-criteriasCategory").style.width = "0";
    document.getElementById("jobs__phone-criteriasSubcategory").style.width = "0";
    document.getElementById("jobs__phone-criteriasEmploymentType").style.width = "0";
    document.getElementById("jobs__phone-criteriasExperience").style.width = "0";
    document.getElementById("jobs__phone-criteriasBackground").style.width = "0";
    document.getElementById("jobs__phone-criteriasLocation").style.width = "0";
    document.getElementById("jobs__phone-criteriasPosition").style.width = "0";
    document.getElementById("jobs__phone-criteriasAnnouncement").style.width = "0";
    document.getElementById("jobs__phone-criteriasDate").style.width = "0";
    document.getElementById("jobs__phone-criteriasRequired").style.width = "0";
    
   
    
}

function openNav1() {
    
    document.getElementById("jobs__phone-criteriasCategory").style.width = "280px";
}

function closeNav1() {

    document.getElementById("jobs__phone-criteriasCategory").style.width = "0";
}
function openNav2() {
    
    document.getElementById("jobs__phone-criteriasSubcategory").style.width = "280px";
}

function closeNav2() {

    document.getElementById("jobs__phone-criteriasSubcategory").style.width = "0";
}

function openNav3() {
    
    document.getElementById("jobs__phone-criteriasPosition").style.width = "280px";
}

function closeNav3() {

    document.getElementById("jobs__phone-criteriasPosition").style.width = "0";
}
function openNav5() {
    
    document.getElementById("jobs__phone-criteriasEmploymentType").style.width = "280px";
}

function closeNav5() {

    document.getElementById("jobs__phone-criteriasEmploymentType").style.width = "0";
}
function openNav6() {
    
    document.getElementById("jobs__phone-criteriasExperience").style.width = "280px";
}

function closeNav6() {

    document.getElementById("jobs__phone-criteriasExperience").style.width = "0";
}
function openNav7() {
    
    document.getElementById("jobs__phone-criteriasBackground").style.width = "280px";
}

function closeNav7() {

    document.getElementById("jobs__phone-criteriasBackground").style.width = "0";
}
function openNav8() {
    
    document.getElementById("jobs__phone-criteriasLocation").style.width = "280px";
}

function closeNav8() {

    document.getElementById("jobs__phone-criteriasLocation").style.width = "0";
}
function openNav9() {
    
    document.getElementById("jobs__phone-criteriasAnnouncement").style.width = "280px";
}

function closeNav9() {

    document.getElementById("jobs__phone-criteriasAnnouncement").style.width = "0";
}
function openNav10() {
    
    document.getElementById("jobs__phone-criteriasDate").style.width = "280px";
}

function closeNav10() {

    document.getElementById("jobs__phone-criteriasDate").style.width = "0";
}
function openNav11() {
    
    document.getElementById("jobs__phone-criteriasRequired").style.width = "280px";
}

function closeNav11() {

    document.getElementById("jobs__phone-criteriasRequired").style.width = "0";
}



$( "#addFilter" ).on( "click",  function() {
    $("#mySidenav").css({"width": "0"});
  });

//   $(document).ready(function(){
//     $("#addDate").click(function(){
    	
//         var today = new Date();
//         var dd = today.getDate();
//         var mm = today.getMonth() + 1; //January is 0!
//         var yyyy = today.getFullYear();

//         if (dd < 10) {
//         dd = '0' + dd;
//         }
//         if (mm < 10) {
//         mm = '0' + mm;
//         }
//         today = mm + '/' + dd + '/' + yyyy;
//     // document.write(today);
//         document.getElementById("date").innerHTML = "Last update :" +today;
// })	

// });
  
// $('i.like-unlike').on('click', function() {
//     $(this).toggleClass('flaticon-like flaticon-favorite-heart-button')
//   });
$(document).ready(function () {
    $(".load-btn").on('click', function (e) {
        $(this).find('.nav__icon').removeClass("flaticon-plus");
        $(this).find('.nav__icon').addClass("fas fa-circle-notch fa-spin");
    });
});
//login-register.html
//rotate form
// $(document).ready(function(){
//     $("#rotateToSignUP").click(function(){
//     	$(".login-register-card__side--front").attr('style', 'transform: rotateX(180deg)');
//     	$(".login-register-card__side--back").attr('style', 'transform: rotateX(0)');
//         $(".signInText").attr('style', 'display:none');
//         $(".signUpText").attr('style', 'display:block');
//         $("#rotateToSignUP1").addClass("d-none"); 
//         $(".get-password").attr('style', 'display: none');   
//         $(".register").attr('style', 'display: block');        
// })
//     $("#rotateToSignUP1").click(function(){
//         $(".login-register-card__side--front").attr('style', 'transform: rotateX(180deg)');
//         $(".login-register-card__side--back").attr('style', 'transform: rotateX(0)');
//         $(".signInText").attr('style', 'display:none');
//         $(".signUpText").attr('style', 'display:block');
//         $("#rotateToSignUP1").addClass('d-none');  
//         $(".get-password").attr('style', 'display: none');   
//         $(".register").attr('style', 'display: block');   
// })		
//     $("#rotateToLogIn").click(function(){
//         $(".login-register-card__side--front").attr('style', 'transform: rotateX(0)');
//         $(".login-register-card__side--back").attr('style', 'transform: rotateX(180deg)');
//         $(".signInText").attr('style', 'display:block');
//         $(".signUpText").attr('style', 'display:none');
//     	$("#rotateToSignUP1").removeClass("d-none");        
// })
// $(".forgot__pass").click(function(){
//     $(".login-register-card__side--front").attr('style', 'transform: rotateX(180deg)');
//     $(".login-register-card__side--back").attr('style', 'transform: rotateX(0)'); 
//     $(".register").attr('style', 'display: none');
//     $(".refresh-password").attr('style', 'display:none');
//     $(".get-password").attr('style', 'display: block');
         
// })
// $(".rotateToLogIn").click(function(){
//     $(".login-register-card__side--front").attr('style', 'transform: rotateX(0)');
//     $(".login-register-card__side--back").attr('style', 'transform: rotateX(180deg)');
//     $(".signInText").attr('style', 'display:block');
//     $(".signUpText").attr('style', 'display:none');
//     $("#rotateToSignUP1").removeClass("d-none");    
    
// })
// $(".request").click(function(){
//     $(".login-register-card__side--front").attr('style', 'transform: rotateX(180deg)');
//     $(".login-register-card__side--back").attr('style', 'transform: rotateX(0)'); 
//     $(".register").attr('style', 'display: none');
//     $(".refresh-password").attr('style', 'display:block');
//     $(".get-password").attr('style', 'display:none');
// })
// // addCV.html
// //  resume__header -rotate icon 
// $(".rotate-icon").click(function(){
//     $(this).toggleClass("down")  ; 
//    });
// });




// $(function() {
 
//     $("body").css({padding:0,margin:0});
//       var f = function() {
//         $(".content").css({position:"relative"});
//         var h1 = $("body").height();
//         var h2 = $(window).height();
//         var d = h2 - h1;
//         var h = $(".content").height() + d;    
//         var ruler = $("<div>").appendTo(".content");       
//         h = Math.max(ruler.position().top,h);
//         ruler.remove();    
//         $(".content").height(h);
//       };
//       setInterval(f,1000);
//       $(window).resize(f);
//       f();
     
//     });


//NAVBAR MOBILE VERSION
$( document ).ready(function() {
    $( "#openHeader" ).click(function() {
        $("#sideMenu").css("width", "80%");
        $("body").css("background-color", "rgba(0,0,0,0.5)");

      });
      $( "#closeHeader" ).click(function() {
        $("#sideMenu").css("width", "0");
        $("body").css("background-color", "unset");
      });
});

var dropdown = document.getElementsByClassName("dropdown-btn");
var i;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
  this.classList.toggle("nav__side--link-active");
  var dropdownContent = this.nextElementSibling;
  if (dropdownContent.style.display === "block") {
  dropdownContent.style.display = "none";
  } else {
  dropdownContent.style.display = "block";
  }
  });
}




let selector = '.messages__list--box a';

$(selector).on('click', function(){
   
    $(this).addClass('message__active');
    $(".messages__list").css("display", "none");
    $(".messages__inner").css("display", "block");
});
$(document).on('click','.messages__back', function(){
    $('.messages__inner').css("display", "none");
    $('.messages__list').css("display", "block");
    $(selector).removeClass('message__active');

});


//NICE SELECT

$(document).ready(function() {
    $('.select-language').niceSelect();
});
//addcv.html

  $(document).ready(function(){
    $(".resume__contact-body").on("click","div", function (event) {   
      var content = $(this).parent().parent();
      var contentId = ('#' + $(content).attr('id'));
      var bodyId = contentId +'Body';
      var formId = contentId +'Form';
      $(bodyId).css("display","none");
      $(formId).css("display","block");
     
      $('.forMyResumeList').click(function(){
        $(this).data('clicked', true);
        $(bodyId).css("display","block");
        $(formId).css("display","none");
      });

    });
  });

  $(document).ready(function(){
    $('#resumeSection').click(function(){
      $('#mySidenav').css("width","250px");
    });
    $('#closeResumeSection').click(function(){
      $('#mySidenav').css("width","0");
    });
  });




  
// toggle password visibility



// POPUP

$(document).ready(function () {
  $("#popup__addResume--show").click(function () {
    $("#popup__addResume").show();
  });
  $("#popupClose").click(function () {
    $("#popup__addResume").hide();
  });
  $("#popup__addResume--cansel").click(function () {
    $("#popup__addResume").hide();
  });
  $("#popupCover--show").click(function () {
    $("#popupCover").show();
  });
  $("#popupCover--close").click(function () {
    $('#coverletterForm')[0].reset();
    $("#popupCover").hide();
  });
  $("#popupCover--cansel").click(function () {
    $('#coverletterForm')[0].reset();
    $("#popupCover").hide();
  });
  // $(document).on('click', ".myResume__addCoverLetter--listIcon",function(){
  //   var letterTitleText = $(this).parent().text();
  //   var letterTitle = $(this).parent();
  //   var letterContect = letterTitle.next().text();
  //   $("input[type=text]#cvName").val(letterTitleText);
  //   $("textarea[type=text]#my__textarea").val(letterContect);
  //   $("textarea#my__textarea").val(letterContect);
  //   $("#popupCover").show();
  // });
  $("#popupCover--close").click(function () {
    $('#coverletterForm')[0].reset();
    $("#popupCover").hide();
  });
  $("#popupApply__show").click(function () {
    $("#popupApply").show();
  });
  $("#popupApply--close").click(function () {
    $("#popupApply").hide();
  });
  $("#coverLetter__new").click(function () {
    $("#popupCover").show();
  });
  $("#remove__letter").click(function () {
    $("#popupRemoveLetter").show();
  });
  $(".popupRemoveLetter__close").click(function () {
    $("#popupRemoveLetter").hide();
  });
  $("#edit__letter").click(function () {
    $(".popupCover").show();
  });
  $("#editPopup__close").click(function () {
    $("popupCover").hide();
  });
  



  // rename cv
  // $(document).on('click', ".rename",function(){

  //   $(".ThertyPopup").fadeToggle( "slow", "linear" );
  //   var primaryDiv = $(this).closest( ".myResume__box" );
  //   var renameParagraf = $(primaryDiv).find(".myResume__title--name");

  //   $(".ThertyPopup__content--btn-link").click(function () {
  //     var inputVal =  $("input[type=text]#renameCv").val();
  //     $(renameParagraf).text(inputVal);
  //     $(".ThertyPopup").hide();
  //   });
  // });
  // $(".ThertyPopup__content--header-icon").click(function(){
  //   $(".ThertyPopup").hide();
  // });


  // remove cv

  // $(document).on('click', ".removeThisResume",function(){

  //   $(".SecondPopup").fadeToggle( "slow", "linear" );
  //   var primaryDiv = $(this).closest( ".myResume__box" );


  //   $(".removeResume").click(function () {

  //     $(primaryDiv).remove();
  //     $(".SecondPopup").hide();
  //   });
  //   $(".SecondPopup__content--header-icon").click(function(){
  //     $(".SecondPopup").hide();
  //   });
  //   $(".closeRemovePopup").click(function(){
  //     $(".SecondPopup").hide();
  //   });
  // });


});
   // SALARY RADIO BUTTON START
   $(document).ready(function () {
   
    $('input:radio[data-item-id="qualification-salary-type"]').change(function () {

            if ($(this).is(':checked') && $(this).attr('id') == 'qualification-salary-constant') {
          
              
                $('.qualification__salary--constant-div').css({
                    'display': 'block'
                });
                $('.qualification__salary--changeable-div').css({
                    'display': 'none'
                });


            } else if ($(this).is(':checked') && $(this).attr('id') == 'qualification-salary-changeable') {
              
                $('.qualification__salary--constant-div').css({
                    'display': 'none'
                });
                $('.qualification__salary--changeable-div').css({
                    'display': 'block'
                });

            } else if ($(this).is(':checked') && $(this).attr('id') == 'qualification-salary-agreement') {
             
                $('.qualification__salary--constant-div').css({
                    'display': 'none'
                });
                $('.qualification__salary--changeable-div').css({
                    'display': 'none'
                });

            }
        });


        // DROPDOWN MONEY
        $('.dropdown-money').click(function(e) {
            e.preventDefault();
            e.stopPropagation();
            $(this).toggleClass('expanded');
            $('#'+$(e.target).attr('for')).prop('checked',true);
          });
          $(document).click(function() {
            $('.dropdown-money').removeClass('expanded');
          });

});
 // SALARY RADIO BUTTON END

//SALARY RANGE SLIDER START
$(document).ready(function () {
 
    var keypressSlider = document.querySelector(".slider-keypress");
    var input0 = document.querySelector(".input-with-keypress-0");
    var input1 = document.querySelector(".input-with-keypress-1");
    var inputs = [input0, input1];

    noUiSlider.create(keypressSlider, {
        start: [300, 1800],

        connect: true,
        step: 1,
        range: {
            min: [0],
            max: [3000]
        }
    });

    /* end Inputs  */
    keypressSlider.noUiSlider.on("update", function (values, handle) {
        inputs[handle].value = values[handle];

        /* begin Listen to keypress on the input */
        function setSliderHandle(i, value) {
            var r = [null, null];
            r[i] = value;
            keypressSlider.noUiSlider.set(r);
        }

        // Listen to keydown events on the input field.
        inputs.forEach(function (input, handle) {
            input.addEventListener("change", function () {
                setSliderHandle(handle, this.value);
            });

            input.addEventListener("keydown", function (e) {
                var values = keypressSlider.noUiSlider.get();
                var value = Number(values[handle])

                // [[handle0_down, handle0_up], [handle1_down, handle1_up]]
                var steps = keypressSlider.noUiSlider.steps();

                // [down, up]
                var step = steps[handle];

                var position;

                // 13 is enter,
                // 38 is key up,
                // 40 is key down.
                switch (e.which) {
                    case 13:
                        setSliderHandle(handle, this.value);
                        break;

                    case 38:
                        // Get step to go increase slider value (up)
                        position = step[1];

                        // false = no step is set
                        if (position === false) {
                            position = 1;
                        }

                        // null = edge of slider
                        if (position !== null) {
                            setSliderHandle(handle, value + position);
                        }

                        break;

                    case 40:
                        position = step[0];

                        if (position === false) {
                            position = 1;
                        }

                        if (position !== null) {
                            setSliderHandle(handle, value - position);
                        }

                        break;
                }
            });
        });
        /* end Listen to keypress on the input */
    });



    $("#input-with-keypress-0").on("keyup", function (e) {
        count = $(this).val();

    });

    $(".minus-0").on("click", function (e) {
        var count = $("#input-with-keypress-0").val();
        if (count != 0) {
            count = count - 1;
        }
        $("#input-with-keypress-0").val(count);

    });

    $(".plus-0").on("click", function (e) {
        var count = $("#input-with-keypress-0").val();
        count = count + 1;
        $("#input-with-keypress-0").val(count);

    });
});
//SALARY RANGE SLIDER END

  // JOB TITLE LOCATION .ETC START
$(document).ready(function () {
  

    (function (e) {
        "function" === typeof define && define.amd ? define(["jquery"], e) : e(jQuery)
    })(function (e) {
        function g(a, b) {
            var c = function () {},
                c = {
                    autoSelectFirst: !1,
                    appendTo: "body",
                    serviceUrl: null,
                    lookup: null,
                    onSelect: null,
                    width: "auto",
                    minChars: 1,
                    maxHeight: 300,
                    deferRequestBy: 0,
                    params: {},
                    formatResult: g.formatResult,
                    delimiter: null,
                    zIndex: 9999,
                    type: "GET",
                    noCache: !1,
                    onSearchStart: c,
                    onSearchComplete: c,
                    containerClass: "autocomplete-suggestions",
                    tabDisabled: !1,
                    dataType: "text",
                    lookupFilter: function (a, b, c) {
                        return -1 !==
                            a.value.toLowerCase().indexOf(c)
                    },
                    paramName: "query",
                    transformResult: function (a) {
                        return "string" === typeof a ? e.parseJSON(a) : a
                    }
                };
            this.element = a;
            this.el = e(a);
            this.suggestions = [];
            this.badQueries = [];
            this.selectedIndex = -1;
            this.currentValue = this.element.value;
            this.intervalId = 0;
            this.cachedResponse = [];
            this.onChange = this.onChangeInterval = null;
            this.isLocal = this.ignoreValueChange = !1;
            this.suggestionsContainer = null;
            this.options = e.extend({}, c, b);
            this.classes = {
                selected: "autocomplete-selected",
                suggestion: "autocomplete-suggestion"
            };
            this.initialize();
            this.setOptions(b)
        }
        var h = {
            extend: function (a, b) {
                return e.extend(a, b)
            },
            createNode: function (a) {
                var b = document.createElement("div");
                b.innerHTML = a;
                return b.firstChild
            }
        };
        g.utils = h;
        e.Autocomplete = g;
        g.formatResult = function (a, b) {
            var c = "(" + b.replace(RegExp("(\\/|\\.|\\*|\\+|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\\\)", "g"), "\\$1") + ")";
            return a.value.replace(RegExp(c, "gi"), "<strong>$1</strong>")
        };
        g.prototype = {
            killerFn: null,
            initialize: function () {
                var a = this,
                    b = "." + a.classes.suggestion,
                    c = a.classes.selected,
                    d = a.options,
                    f;
                a.element.setAttribute("autocomplete", "off");
                a.killerFn = function (b) {
                    0 === e(b.target).closest("." + a.options.containerClass).length && (a.killSuggestions(), a.disableKillerFn())
                };
                if (!d.width || "auto" === d.width) d.width = a.el.outerWidth();
                a.suggestionsContainer = g.utils.createNode('<div class="' + d.containerClass + '" style="position: absolute; display: none;"></div>');
                f = e(a.suggestionsContainer);
                f.appendTo(d.appendTo).width(d.width);
                f.on("mouseover.autocomplete", b, function () {
                    a.activate(e(this).data("index"))
                });
                f.on("mouseout.autocomplete", function () {
                    a.selectedIndex = -1;
                    f.children("." + c).removeClass(c)
                });
                f.on("click.autocomplete", b, function () {
                    a.select(e(this).data("index"), !1)
                });
                a.fixPosition();
                if (window.opera) a.el.on("keypress.autocomplete", function (b) {
                    a.onKeyPress(b)
                });
                else a.el.on("keydown.autocomplete", function (b) {
                    a.onKeyPress(b)
                });
                a.el.on("keyup.autocomplete", function (b) {
                    a.onKeyUp(b)
                });
                a.el.on("blur.autocomplete", function () {
                    a.onBlur()
                });
                a.el.on("focus.autocomplete", function () {
                    a.fixPosition()
                })
            },
            onBlur: function () {
                this.enableKillerFn()
            },
            setOptions: function (a) {
                var b = this.options;
                h.extend(b, a);
                if (this.isLocal = e.isArray(b.lookup)) b.lookup = this.verifySuggestionsFormat(b.lookup);
                e(this.suggestionsContainer).css({
                    "max-height": b.maxHeight + "px",
                    width: b.width + "px",
                    "z-index": b.zIndex
                })
            },
            clearCache: function () {
                this.cachedResponse = [];
                this.badQueries = []
            },
            clear: function () {
                this.clearCache();
                this.currentValue = null;
                this.suggestions = []
            },
            disable: function () {
                this.disabled = !0
            },
            enable: function () {
                this.disabled = !1
            },
            fixPosition: function () {
                var a;
                "body" === this.options.appendTo &&
                    (a = this.el.offset(), e(this.suggestionsContainer).css({
                        top: a.top + this.el.outerHeight() + "px",
                        left: a.left + "px"
                    }))
            },
            enableKillerFn: function () {
                e(document).on("click.autocomplete", this.killerFn)
            },
            disableKillerFn: function () {
                e(document).off("click.autocomplete", this.killerFn)
            },
            killSuggestions: function () {
                var a = this;
                a.stopKillSuggestions();
                a.intervalId = window.setInterval(function () {
                    a.hide();
                    a.stopKillSuggestions()
                }, 300)
            },
            stopKillSuggestions: function () {
                window.clearInterval(this.intervalId)
            },
            onKeyPress: function (a) {
                if (!this.disabled &&
                    !this.visible && 40 === a.keyCode && this.currentValue) this.suggest();
                else if (!this.disabled && this.visible) {
                    switch (a.keyCode) {
                        case 27:
                            this.el.val(this.currentValue);
                            this.hide();
                            break;
                        case 9:
                        case 13:
                            if (-1 === this.selectedIndex) {
                                this.hide();
                                return
                            }
                            this.select(this.selectedIndex, 13 === a.keyCode);
                            if (9 === a.keyCode && !1 === this.options.tabDisabled) return;
                            break;
                        case 38:
                            this.moveUp();
                            break;
                        case 40:
                            this.moveDown();
                            break;
                        default:
                            return
                    }
                    a.stopImmediatePropagation();
                    a.preventDefault()
                }
            },
            onKeyUp: function (a) {
                var b = this;
                if (!b.disabled) {
                    switch (a.keyCode) {
                        case 38:
                        case 40:
                            return
                    }
                    clearInterval(b.onChangeInterval);
                    if (b.currentValue !== b.el.val())
                        if (0 < b.options.deferRequestBy) b.onChangeInterval = setInterval(function () {
                            b.onValueChange()
                        }, b.options.deferRequestBy);
                        else b.onValueChange()
                }
            },
            onValueChange: function () {
                var a;
                clearInterval(this.onChangeInterval);
                this.currentValue = this.element.value;
                a = this.getQuery(this.currentValue);
                this.selectedIndex = -1;
                this.ignoreValueChange ? this.ignoreValueChange = !1 : a.length < this.options.minChars ?
                    this.hide() : this.getSuggestions(a)
            },
            getQuery: function (a) {
                var b = this.options.delimiter;
                if (!b) return e.trim(a);
                a = a.split(b);
                return e.trim(a[a.length - 1])
            },
            getSuggestionsLocal: function (a) {
                var b = a.toLowerCase(),
                    c = this.options.lookupFilter;
                return {
                    suggestions: e.grep(this.options.lookup, function (d) {
                        return c(d, a, b)
                    })
                }
            },
            getSuggestions: function (a) {
                var b, c = this,
                    d = c.options,
                    f = d.serviceUrl;
                (b = c.isLocal ? c.getSuggestionsLocal(a) : c.cachedResponse[a]) && e.isArray(b.suggestions) ? (c.suggestions = b.suggestions, c.suggest()) :
                    c.isBadQuery(a) || (d.params[d.paramName] = a, !1 !== d.onSearchStart.call(c.element, d.params) && (e.isFunction(d.serviceUrl) && (f = d.serviceUrl.call(c.element, a)), e.ajax({
                        url: f,
                        data: d.ignoreParams ? null : d.params,
                        type: d.type,
                        dataType: d.dataType
                    }).done(function (b) {
                        c.processResponse(b, a);
                        d.onSearchComplete.call(c.element, a)
                    })))
            },
            isBadQuery: function (a) {
                for (var b = this.badQueries, c = b.length; c--;)
                    if (0 === a.indexOf(b[c])) return !0;
                return !1
            },
            hide: function () {
                this.visible = !1;
                this.selectedIndex = -1;
                e(this.suggestionsContainer).hide()
            },
            suggest: function () {
                if (0 === this.suggestions.length) this.hide();
                else {
                    var a = this.options.formatResult,
                        b = this.getQuery(this.currentValue),
                        c = this.classes.suggestion,
                        d = this.classes.selected,
                        f = e(this.suggestionsContainer),
                        g = "";
                    e.each(this.suggestions, function (d, e) {
                        g += '<div class="' + c + '" data-index="' + d + '">' + a(e, b) + "</div>"
                    });
                    f.html(g).show();
                    this.visible = !0;
                    this.options.autoSelectFirst && (this.selectedIndex = 0, f.children().first().addClass(d))
                }
            },
            verifySuggestionsFormat: function (a) {
                return a.length && "string" ===
                    typeof a[0] ? e.map(a, function (a) {
                        return {
                            value: a,
                            data: null
                        }
                    }) : a
            },
            processResponse: function (a, b) {
                var c = this.options,
                    d = c.transformResult(a, b);
                d.suggestions = this.verifySuggestionsFormat(d.suggestions);
                c.noCache || (this.cachedResponse[d[c.paramName]] = d, 0 === d.suggestions.length && this.badQueries.push(d[c.paramName]));
                b === this.getQuery(this.currentValue) && (this.suggestions = d.suggestions, this.suggest())
            },
            activate: function (a) {
                var b = this.classes.selected,
                    c = e(this.suggestionsContainer),
                    d = c.children();
                c.children("." +
                    b).removeClass(b);
                this.selectedIndex = a;
                return -1 !== this.selectedIndex && d.length > this.selectedIndex ? (a = d.get(this.selectedIndex), e(a).addClass(b), a) : null
            },
            select: function (a, b) {
                var c = this.suggestions[a];
                c && (this.el.val(c), this.ignoreValueChange = b, this.hide(), this.onSelect(a))
            },
            moveUp: function () {
                -1 !== this.selectedIndex && (0 === this.selectedIndex ? (e(this.suggestionsContainer).children().first().removeClass(this.classes.selected), this.selectedIndex = -1, this.el.val(this.currentValue)) : this.adjustScroll(this.selectedIndex -
                    1))
            },
            moveDown: function () {
                this.selectedIndex !== this.suggestions.length - 1 && this.adjustScroll(this.selectedIndex + 1)
            },
            adjustScroll: function (a) {
                var b = this.activate(a),
                    c, d;
                b && (b = b.offsetTop, c = e(this.suggestionsContainer).scrollTop(), d = c + this.options.maxHeight - 25, b < c ? e(this.suggestionsContainer).scrollTop(b) : b > d && e(this.suggestionsContainer).scrollTop(b - this.options.maxHeight + 25), this.el.val(this.getValue(this.suggestions[a].value)))
            },
            onSelect: function (a) {
                var b = this.options.onSelect;
                a = this.suggestions[a];
                this.el.val(this.getValue(a.value));
                e.isFunction(b) && b.call(this.element, a)
            },
            getValue: function (a) {
                var b = this.options.delimiter,
                    c;
                if (!b) return a;
                c = this.currentValue;
                b = c.split(b);
                return 1 === b.length ? a : c.substr(0, c.length - b[b.length - 1].length) + a
            },
            dispose: function () {
                this.el.off(".autocomplete").removeData("autocomplete");
                this.disableKillerFn();
                e(this.suggestionsContainer).remove()
            }
        };
        e.fn.autocomplete = function (a, b) {
            return 0 === arguments.length ? this.first().data("autocomplete") : this.each(function () {
                var c =
                    e(this),
                    d = c.data("autocomplete");
                if ("string" === typeof a) {
                    if (d && "function" === typeof d[a]) d[a](b)
                } else d && d.dispose && d.dispose(), d = new g(this, a), c.data("autocomplete", d)
            })
        }
    });

    $(function () {
        var currency = [{
                value: 'Afghan afghani',
                data: 'AFN'
            },
            {
                value: 'Albanian lek',
                data: 'ALL'
            },
            {
                value: 'Algerian dinar',
                data: 'DZD'
            },
            {
                value: 'European euro',
                data: 'EUR'
            },
            {
                value: 'Angolan kwanza',
                data: 'AOA'
            },
            {
                value: 'East Caribbean dollar',
                data: 'XCD'
            },
            {
                value: 'Argentine peso',
                data: 'ARS'
            },
           
          
            {
                value: 'Yemeni rial',
                data: 'YER'
            },
            {
                value: 'Zambian kwacha',
                data: 'ZMK'
            },
            {
                value: 'Zimbabwean dollar',
                data: 'ZWD'
            },
        ];

        $('#qualification-job-title').autocomplete({
            lookup: currency,
            onSelect: function (suggestion) {
                //   var thehtml = '<strong>Currency Name:</strong> ' + suggestion.value + ' <br> <strong>Symbol:</strong> ' + suggestion.data;
                //   $('#outputcontent').html(thehtml);
            }
        });

        $('#qualification-location').autocomplete({
            lookup: currency,
            onSelect: function (suggestion) {
                //   var thehtml = '<strong>Currency Name:</strong> ' + suggestion.value + ' <br> <strong>Symbol:</strong> ' + suggestion.data;
                //   $('#outputcontent').html(thehtml);
            }
        });
        $('#qualification-language').autocomplete({
            lookup: currency,
            onSelect: function (suggestion) {
                //   var thehtml = '<strong>Currency Name:</strong> ' + suggestion.value + ' <br> <strong>Symbol:</strong> ' + suggestion.data;
                //   $('#outputcontent').html(thehtml);
            }
        });

    });










    ////////////////////////////////////////////////////////////////////////////////////////////////////
    var maxAppend = 0;
    let remainingWorkingDays = 1;
    let remainingBenefits = 1;
    let remainingSkills = 1;
    let remainingGender = 1;

    function UpdateRemainingWorkingDays(isAdd) {
        if (isAdd) {
            remainingWorkingDays = remainingWorkingDays - 1;
        } else {
            remainingWorkingDays = remainingWorkingDays + 1;
        }


        if (remainingWorkingDays == 0) {
            $('#qualificationWorkingDays').prop("disabled", true);
            $('#qualificationWorkingDays').css({
                'opacity': '0.3'
            });
        } else {
            $('#qualificationWorkingDays').prop("disabled", false);
            $('#qualificationWorkingDays').css({
                'opacity': '1'
            })

        }
    }

    function UpdateRemainingBenefits(isAdd2) {
        if (isAdd2) {
            remainingBenefits = remainingBenefits - 1;
        } else {
            remainingBenefits = remainingBenefits + 1;
        }


        if (remainingBenefits == 0) {
            $('#qualificationBenefits').prop("disabled", true);
            $('#qualificationBenefits').css({
                'opacity': '0.3'
            });
        } else {
            $('#qualificationBenefits').prop("disabled", false);
            $('#qualificationBenefits').css({
                'opacity': '1'
            })

        }
    }

    function UpdateRemainingSkills(isAdd3) {
        if (isAdd3) {
            remainingSkills = remainingSkills - 1;
        } else {
            remainingSkills = remainingSkills + 1;
        }


        if (remainingSkills == 0) {
            $('#qualificationSkills').prop("disabled", true);
            $('#qualificationSkills').css({
                'opacity': '0.3'
            });
        } else {
            $('#qualificationSkills').prop("disabled", false);
            $('#qualificationSkills').css({
                'opacity': '1'
            })

        }
    }

    function UpdateRemainingGender(isAdd4) {
        if (isAdd4) {
            remainingGender = remainingGender - 1;
        } else {
            remainingGender = remainingGender + 1;
        }


        if (remainingGender == 0) {
            $('#qualificationGender').prop("disabled", true);
            $('#qualificationGender').css({
                'opacity': '0.3'
            });
        } else {
            $('#qualificationGender').prop("disabled", false);
            $('#qualificationGender').css({
                'opacity': '1'
            })

        }
    }


    // CHANGE LANGUAGE
    $(".qualification__language--change").click(function (e) {
        e.preventDefault();
        $('.qualification__language-div').css({
            'display': 'none'
        })
        // if (maxAppend >= 10) return;

        var changeLanguageInput = $(
            " <div class='form-group qualification__form-group'> <label for='qualification-change-language'> What language will your job posting be displayed in ?</label><input type='text' name='currency' class='qualification__input' id='qualification-change-language'></div>");
        maxAppend++;

        $(".qualification__language").append(changeLanguageInput);
        // AUTOCOMPLETE START
        (function (e) {
            "function" === typeof define && define.amd ? define(["jquery"], e) : e(jQuery)
        })(function (e) {
            function g(a, b) {
                var c = function () {},
                    c = {
                        autoSelectFirst: !1,
                        appendTo: "body",
                        serviceUrl: null,
                        lookup: null,
                        onSelect: null,
                        width: "auto",
                        minChars: 1,
                        maxHeight: 300,
                        deferRequestBy: 0,
                        params: {},
                        formatResult: g.formatResult,
                        delimiter: null,
                        zIndex: 9999,
                        type: "GET",
                        noCache: !1,
                        onSearchStart: c,
                        onSearchComplete: c,
                        containerClass: "autocomplete-suggestions",
                        tabDisabled: !1,
                        dataType: "text",
                        lookupFilter: function (a, b, c) {
                            return -1 !==
                                a.value.toLowerCase().indexOf(c)
                        },
                        paramName: "query",
                        transformResult: function (a) {
                            return "string" === typeof a ? e.parseJSON(a) : a
                        }
                    };
                this.element = a;
                this.el = e(a);
                this.suggestions = [];
                this.badQueries = [];
                this.selectedIndex = -1;
                this.currentValue = this.element.value;
                this.intervalId = 0;
                this.cachedResponse = [];
                this.onChange = this.onChangeInterval = null;
                this.isLocal = this.ignoreValueChange = !1;
                this.suggestionsContainer = null;
                this.options = e.extend({}, c, b);
                this.classes = {
                    selected: "autocomplete-selected",
                    suggestion: "autocomplete-suggestion"
                };
                this.initialize();
                this.setOptions(b)
            }
            var h = {
                extend: function (a, b) {
                    return e.extend(a, b)
                },
                createNode: function (a) {
                    var b = document.createElement("div");
                    b.innerHTML = a;
                    return b.firstChild
                }
            };
            g.utils = h;
            e.Autocomplete = g;
            g.formatResult = function (a, b) {
                var c = "(" + b.replace(RegExp("(\\/|\\.|\\*|\\+|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\\\)", "g"), "\\$1") + ")";
                return a.value.replace(RegExp(c, "gi"), "<strong>$1</strong>")
            };
            g.prototype = {
                killerFn: null,
                initialize: function () {
                    var a = this,
                        b = "." + a.classes.suggestion,
                        c = a.classes.selected,
                        d = a.options,
                        f;
                    a.element.setAttribute("autocomplete", "off");
                    a.killerFn = function (b) {
                        0 === e(b.target).closest("." + a.options.containerClass).length && (a.killSuggestions(), a.disableKillerFn())
                    };
                    if (!d.width || "auto" === d.width) d.width = a.el.outerWidth();
                    a.suggestionsContainer = g.utils.createNode('<div class="' + d.containerClass + '" style="position: absolute; display: none;"></div>');
                    f = e(a.suggestionsContainer);
                    f.appendTo(d.appendTo).width(d.width);
                    f.on("mouseover.autocomplete", b, function () {
                        a.activate(e(this).data("index"))
                    });
                    f.on("mouseout.autocomplete", function () {
                        a.selectedIndex = -1;
                        f.children("." + c).removeClass(c)
                    });
                    f.on("click.autocomplete", b, function () {
                        a.select(e(this).data("index"), !1)
                    });
                    a.fixPosition();
                    if (window.opera) a.el.on("keypress.autocomplete", function (b) {
                        a.onKeyPress(b)
                    });
                    else a.el.on("keydown.autocomplete", function (b) {
                        a.onKeyPress(b)
                    });
                    a.el.on("keyup.autocomplete", function (b) {
                        a.onKeyUp(b)
                    });
                    a.el.on("blur.autocomplete", function () {
                        a.onBlur()
                    });
                    a.el.on("focus.autocomplete", function () {
                        a.fixPosition()
                    })
                },
                onBlur: function () {
                    this.enableKillerFn()
                },
                setOptions: function (a) {
                    var b = this.options;
                    h.extend(b, a);
                    if (this.isLocal = e.isArray(b.lookup)) b.lookup = this.verifySuggestionsFormat(b.lookup);
                    e(this.suggestionsContainer).css({
                        "max-height": b.maxHeight + "px",
                        width: b.width + "px",
                        "z-index": b.zIndex
                    })
                },
                clearCache: function () {
                    this.cachedResponse = [];
                    this.badQueries = []
                },
                clear: function () {
                    this.clearCache();
                    this.currentValue = null;
                    this.suggestions = []
                },
                disable: function () {
                    this.disabled = !0
                },
                enable: function () {
                    this.disabled = !1
                },
                fixPosition: function () {
                    var a;
                    "body" === this.options.appendTo &&
                        (a = this.el.offset(), e(this.suggestionsContainer).css({
                            top: a.top + this.el.outerHeight() + "px",
                            left: a.left + "px"
                        }))
                },
                enableKillerFn: function () {
                    e(document).on("click.autocomplete", this.killerFn)
                },
                disableKillerFn: function () {
                    e(document).off("click.autocomplete", this.killerFn)
                },
                killSuggestions: function () {
                    var a = this;
                    a.stopKillSuggestions();
                    a.intervalId = window.setInterval(function () {
                        a.hide();
                        a.stopKillSuggestions()
                    }, 300)
                },
                stopKillSuggestions: function () {
                    window.clearInterval(this.intervalId)
                },
                onKeyPress: function (a) {
                    if (!this.disabled &&
                        !this.visible && 40 === a.keyCode && this.currentValue) this.suggest();
                    else if (!this.disabled && this.visible) {
                        switch (a.keyCode) {
                            case 27:
                                this.el.val(this.currentValue);
                                this.hide();
                                break;
                            case 9:
                            case 13:
                                if (-1 === this.selectedIndex) {
                                    this.hide();
                                    return
                                }
                                this.select(this.selectedIndex, 13 === a.keyCode);
                                if (9 === a.keyCode && !1 === this.options.tabDisabled) return;
                                break;
                            case 38:
                                this.moveUp();
                                break;
                            case 40:
                                this.moveDown();
                                break;
                            default:
                                return
                        }
                        a.stopImmediatePropagation();
                        a.preventDefault()
                    }
                },
                onKeyUp: function (a) {
                    var b = this;
                    if (!b.disabled) {
                        switch (a.keyCode) {
                            case 38:
                            case 40:
                                return
                        }
                        clearInterval(b.onChangeInterval);
                        if (b.currentValue !== b.el.val())
                            if (0 < b.options.deferRequestBy) b.onChangeInterval = setInterval(function () {
                                b.onValueChange()
                            }, b.options.deferRequestBy);
                            else b.onValueChange()
                    }
                },
                onValueChange: function () {
                    var a;
                    clearInterval(this.onChangeInterval);
                    this.currentValue = this.element.value;
                    a = this.getQuery(this.currentValue);
                    this.selectedIndex = -1;
                    this.ignoreValueChange ? this.ignoreValueChange = !1 : a.length < this.options.minChars ?
                        this.hide() : this.getSuggestions(a)
                },
                getQuery: function (a) {
                    var b = this.options.delimiter;
                    if (!b) return e.trim(a);
                    a = a.split(b);
                    return e.trim(a[a.length - 1])
                },
                getSuggestionsLocal: function (a) {
                    var b = a.toLowerCase(),
                        c = this.options.lookupFilter;
                    return {
                        suggestions: e.grep(this.options.lookup, function (d) {
                            return c(d, a, b)
                        })
                    }
                },
                getSuggestions: function (a) {
                    var b, c = this,
                        d = c.options,
                        f = d.serviceUrl;
                    (b = c.isLocal ? c.getSuggestionsLocal(a) : c.cachedResponse[a]) && e.isArray(b.suggestions) ? (c.suggestions = b.suggestions, c.suggest()) :
                        c.isBadQuery(a) || (d.params[d.paramName] = a, !1 !== d.onSearchStart.call(c.element, d.params) && (e.isFunction(d.serviceUrl) && (f = d.serviceUrl.call(c.element, a)), e.ajax({
                            url: f,
                            data: d.ignoreParams ? null : d.params,
                            type: d.type,
                            dataType: d.dataType
                        }).done(function (b) {
                            c.processResponse(b, a);
                            d.onSearchComplete.call(c.element, a)
                        })))
                },
                isBadQuery: function (a) {
                    for (var b = this.badQueries, c = b.length; c--;)
                        if (0 === a.indexOf(b[c])) return !0;
                    return !1
                },
                hide: function () {
                    this.visible = !1;
                    this.selectedIndex = -1;
                    e(this.suggestionsContainer).hide()
                },
                suggest: function () {
                    if (0 === this.suggestions.length) this.hide();
                    else {
                        var a = this.options.formatResult,
                            b = this.getQuery(this.currentValue),
                            c = this.classes.suggestion,
                            d = this.classes.selected,
                            f = e(this.suggestionsContainer),
                            g = "";
                        e.each(this.suggestions, function (d, e) {
                            g += '<div class="' + c + '" data-index="' + d + '">' + a(e, b) + "</div>"
                        });
                        f.html(g).show();
                        this.visible = !0;
                        this.options.autoSelectFirst && (this.selectedIndex = 0, f.children().first().addClass(d))
                    }
                },
                verifySuggestionsFormat: function (a) {
                    return a.length && "string" ===
                        typeof a[0] ? e.map(a, function (a) {
                            return {
                                value: a,
                                data: null
                            }
                        }) : a
                },
                processResponse: function (a, b) {
                    var c = this.options,
                        d = c.transformResult(a, b);
                    d.suggestions = this.verifySuggestionsFormat(d.suggestions);
                    c.noCache || (this.cachedResponse[d[c.paramName]] = d, 0 === d.suggestions.length && this.badQueries.push(d[c.paramName]));
                    b === this.getQuery(this.currentValue) && (this.suggestions = d.suggestions, this.suggest())
                },
                activate: function (a) {
                    var b = this.classes.selected,
                        c = e(this.suggestionsContainer),
                        d = c.children();
                    c.children("." +
                        b).removeClass(b);
                    this.selectedIndex = a;
                    return -1 !== this.selectedIndex && d.length > this.selectedIndex ? (a = d.get(this.selectedIndex), e(a).addClass(b), a) : null
                },
                select: function (a, b) {
                    var c = this.suggestions[a];
                    c && (this.el.val(c), this.ignoreValueChange = b, this.hide(), this.onSelect(a))
                },
                moveUp: function () {
                    -1 !== this.selectedIndex && (0 === this.selectedIndex ? (e(this.suggestionsContainer).children().first().removeClass(this.classes.selected), this.selectedIndex = -1, this.el.val(this.currentValue)) : this.adjustScroll(this.selectedIndex -
                        1))
                },
                moveDown: function () {
                    this.selectedIndex !== this.suggestions.length - 1 && this.adjustScroll(this.selectedIndex + 1)
                },
                adjustScroll: function (a) {
                    var b = this.activate(a),
                        c, d;
                    b && (b = b.offsetTop, c = e(this.suggestionsContainer).scrollTop(), d = c + this.options.maxHeight - 25, b < c ? e(this.suggestionsContainer).scrollTop(b) : b > d && e(this.suggestionsContainer).scrollTop(b - this.options.maxHeight + 25), this.el.val(this.getValue(this.suggestions[a].value)))
                },
                onSelect: function (a) {
                    var b = this.options.onSelect;
                    a = this.suggestions[a];
                    this.el.val(this.getValue(a.value));
                    e.isFunction(b) && b.call(this.element, a)
                },
                getValue: function (a) {
                    var b = this.options.delimiter,
                        c;
                    if (!b) return a;
                    c = this.currentValue;
                    b = c.split(b);
                    return 1 === b.length ? a : c.substr(0, c.length - b[b.length - 1].length) + a
                },
                dispose: function () {
                    this.el.off(".autocomplete").removeData("autocomplete");
                    this.disableKillerFn();
                    e(this.suggestionsContainer).remove()
                }
            };
            e.fn.autocomplete = function (a, b) {
                return 0 === arguments.length ? this.first().data("autocomplete") : this.each(function () {
                    var c =
                        e(this),
                        d = c.data("autocomplete");
                    if ("string" === typeof a) {
                        if (d && "function" === typeof d[a]) d[a](b)
                    } else d && d.dispose && d.dispose(), d = new g(this, a), c.data("autocomplete", d)
                })
            }
        });

        $(function () {
            var languages = [{
                    value: 'Afghan afghani',
                    data: 'AFN'
                },
                {
                    value: 'Albanian lek',
                    data: 'ALL'
                },
                {
                    value: 'Algerian dinar',
                    data: 'DZD'
                },
                {
                    value: 'European euro',
                    data: 'EUR'
                },
                {
                    value: 'Angolan kwanza',
                    data: 'AOA'
                },
                {
                    value: 'East Caribbean dollar',
                    data: 'XCD'
                },
                {
                    value: 'Argentine peso',
                    data: 'ARS'
                },
                {
                    value: 'Armenian dram',
                    data: 'AMD'
                },
                {
                    value: 'Aruban florin',
                    data: 'AWG'
                },
                {
                    value: 'Australian dollar',
                    data: 'AUD'
                },
                {
                    value: 'Azerbaijani manat',
                    data: 'AZN'
                },
                {
                    value: 'Bahamian dollar',
                    data: 'BSD'
                },
                {
                    value: 'Bahraini dinar',
                    data: 'BHD'
                },
                {
                    value: 'Bangladeshi taka',
                    data: 'BDT'
                },
                {
                    value: 'Barbadian dollar',
                    data: 'BBD'
                },
                {
                    value: 'Belarusian ruble',
                    data: 'BYR'
                },
                {
                    value: 'Belize dollar',
                    data: 'BZD'
                },
                {
                    value: 'West African CFA franc',
                    data: 'XOF'
                },
                {
                    value: 'Bhutanese ngultrum',
                    data: 'BTN'
                },
                {
                    value: 'Bolivian boliviano',
                    data: 'BOB'
                },
                {
                    value: 'Bosnia-Herzegovina konvertibilna marka',
                    data: 'BAM'
                },
                {
                    value: 'Botswana pula',
                    data: 'BWP'
                },
                {
                    value: 'Brazilian real',
                    data: 'BRL'
                },
                {
                    value: 'Brunei dollar',
                    data: 'BND'
                },
                {
                    value: 'Bulgarian lev',
                    data: 'BGN'
                },
                {
                    value: 'Burundi franc',
                    data: 'BIF'
                },
                {
                    value: 'Cambodian riel',
                    data: 'KHR'
                },

                {
                    value: 'Danish krone',
                    data: 'DKK'
                },
                {
                    value: 'Djiboutian franc',
                    data: 'DJF'
                },
                {
                    value: 'Dominican peso',
                    data: 'DOP'
                },
                {
                    value: 'Egyptian pound',
                    data: 'EGP'
                },
                {
                    value: 'Central African CFA franc',
                    data: 'GQE'
                },
                {
                    value: 'Eritrean nakfa',
                    data: 'ERN'
                },
                {
                    value: 'Estonian kroon',
                    data: 'EEK'
                },
                {
                    value: 'Ethiopian birr',
                    data: 'ETB'
                },
                {
                    value: 'Falkland Islands pound',
                    data: 'FKP'
                },
                {
                    value: 'Fijian dollar',
                    data: 'FJD'
                },
                {
                    value: 'CFP franc',
                    data: 'XPF'
                },
                {
                    value: 'Gambian dalasi',
                    data: 'GMD'
                },
                {
                    value: 'Georgian lari',
                    data: 'GEL'
                },
                {
                    value: 'Ghanaian cedi',
                    data: 'GHS'
                },
                {
                    value: 'Gibraltar pound',
                    data: 'GIP'
                },
                {
                    value: 'Guatemalan quetzal',
                    data: 'GTQ'
                },

                {
                    value: 'Indonesian rupiah',
                    data: 'IDR'
                },
                {
                    value: 'Iranian rial',
                    data: 'IRR'
                },
                {
                    value: 'Iraqi dinar',
                    data: 'IQD'
                },
                {
                    value: 'Israeli new sheqel',
                    data: 'ILS'
                },
                {
                    value: 'Jamaican dollar',
                    data: 'JMD'
                },
                {
                    value: 'Japanese yen',
                    data: 'JPY'
                },
                {
                    value: 'Jordanian dinar',
                    data: 'JOD'
                },

                {
                    value: 'Lao kip',
                    data: 'LAK'
                },
                {
                    value: 'Latvian lats',
                    data: 'LVL'
                },
                {
                    value: 'Lebanese lira',
                    data: 'LBP'
                },
                {
                    value: 'Lesotho loti',
                    data: 'LSL'
                },
                {
                    value: 'Liberian dollar',
                    data: 'LRD'
                },
                {
                    value: 'Libyan dinar',
                    data: 'LYD'
                },
                {
                    value: 'Lithuanian litas',
                    data: 'LTL'
                },
                {
                    value: 'Macanese pataca',
                    data: 'MOP'
                },
                {
                    value: 'Macedonian denar',
                    data: 'MKD'
                },
                {
                    value: 'Malagasy ariary',
                    data: 'MGA'
                },

                {
                    value: 'Moroccan dirham',
                    data: 'MAD'
                },
                {
                    value: 'Mozambican metical',
                    data: 'MZM'
                },
                {
                    value: 'Myanma kyat',
                    data: 'MMK'
                },
                {
                    value: 'Namibian dollar',
                    data: 'NAD'
                },
                {
                    value: 'Nepalese rupee',
                    data: 'NPR'
                },
                {
                    value: 'Netherlands Antillean gulden',
                    data: 'ANG'
                },
                {
                    value: 'New Zealand dollar',
                    data: 'NZD'
                },
                {
                    value: 'Nicaraguan cordoba',
                    data: 'NIO'
                },
                {
                    value: 'Nigerian naira',
                    data: 'NGN'
                },

                {
                    value: 'Philippine peso',
                    data: 'PHP'
                },
                {
                    value: 'Polish zloty',
                    data: 'PLN'
                },
                {
                    value: 'Qatari riyal',
                    data: 'QAR'
                },
                {
                    value: 'Romanian leu',
                    data: 'RON'
                },
                {
                    value: 'Russian ruble',
                    data: 'RUB'
                },
                {
                    value: 'Rwandan franc',
                    data: 'RWF'
                },
                {
                    value: 'Saint Helena pound',
                    data: 'SHP'
                },
                {
                    value: 'Samoan tala',
                    data: 'WST'
                },
                {
                    value: 'Sao Tome and Principe dobra',
                    data: 'STD'
                },

                {
                    value: 'Sudanese pound',
                    data: 'SDG'
                },
                {
                    value: 'Sri Lankan rupee',
                    data: 'LKR'
                },
                {
                    value: 'Sudanese pound',
                    data: 'SDG'
                },
                {
                    value: 'Surinamese dollar',
                    data: 'SRD'
                },
                {
                    value: 'Swazi lilangeni',
                    data: 'SZL'
                },
                {
                    value: 'Swedish krona',
                    data: 'SEK'
                },
                {
                    value: 'Swiss franc',
                    data: 'CHF'
                },
                {
                    value: 'Syrian pound',
                    data: 'SYP'
                },
                {
                    value: 'New Taiwan dollar',
                    data: 'TWD'
                },
                {
                    value: 'Tajikistani somoni',
                    data: 'TJS'
                },

                {
                    value: 'Turkish new lira',
                    data: 'TRY'
                },
                {
                    value: 'Turkmen manat',
                    data: 'TMM'
                },
                {
                    value: 'Ugandan shilling',
                    data: 'UGX'
                },
                {
                    value: 'Ukrainian hryvnia',
                    data: 'UAH'
                },
                {
                    value: 'United Arab Emirates dirham',
                    data: 'AED'
                },
                {
                    value: 'British pound',
                    data: 'GBP'
                },
                {
                    value: 'United States dollar',
                    data: 'USD'
                },
                {
                    value: 'Uruguayan peso',
                    data: 'UYU'
                },
                {
                    value: 'Uzbekistani som',
                    data: 'UZS'
                },
                {
                    value: 'Vanuatu vatu',
                    data: 'VUV'
                },
                {
                    value: 'Venezuelan bolivar',
                    data: 'VEB'
                },
                {
                    value: 'Vietnamese dong',
                    data: 'VND'
                },
                {
                    value: 'Yemeni rial',
                    data: 'YER'
                },
                {
                    value: 'Zambian kwacha',
                    data: 'ZMK'
                },
                {
                    value: 'Zimbabwean dollar',
                    data: 'ZWD'
                },
            ];

            $('#qualification-change-language').autocomplete({
                lookup: languages,
                onSelect: function (suggestion) {
                    var thehtml = '<strong>Currency Name:</strong> ' + suggestion.value + ' <br> <strong>Symbol:</strong> ' + suggestion.data;
                    $('#outputcontent').html(thehtml);
                }
            });


        });

        // AUTOCOMPLETE END
    });

    // EXPERIENCE
    $("#qualificationExperience").click(function () {
        if (maxAppend >= 10) return;

        var experienceInput = $(
            "<div class='qualification__div--item'><div class='qualification__div--top'>" +
            "<span class='mr-2'>Minimum of </span>" +
            "<div class='qualification-select-div qualification__select--experience'><select class='iq-experienceYears qualification__select' name='experienceYears'><option class='experienceYears_option' value='1' selected=''>1 year</option><option class='experienceYears_option' value='2'>2 years</option><option class='experienceYears_option' value='3'>3 years</option><option class='experienceYears_option' value='4'>4 years</option><option class='experienceYears_option' value='5'>5 years</option><option class='experienceYears_option' value='6'>6 years</option><option class='experienceYears_option' value='7'>7 years</option><option class='experienceYears_option' value='8'>8 years</option><option class='experienceYears_option' value='9'>9 years</option><option class='experienceYears_option' value='10'>10 years</option></select></div>" +
            "<span class='mx-2'> of </span><input type='text' class=' qualification__input qualification__input--experience'><span class='mx-2 mt-phone'> experience </span> </div>  " +
            "<div class='qualification__div--bottom'>" +
            "<div class='switch-block'>" +
            "<label class='switch-light switch-candy'>" +
            "<input type='checkbox' name='' id='' />" +
            "<span>" +
            "<span>Preffered</span>" +
            " <span>Required</span>" +
            "<a></a>" +
            "</span>" +
            "</label>" +
            "</div>" +
            "</div>" +
            " <div class='qualification--remove-btn'><i class='fas fa-times'></i></div></div>");
        maxAppend++;

        $(".qualification__div").append(experienceInput);

        // $('.iq-experienceYears').select2();


        $('.qualification__select').select2();

        $(".qualification--remove-btn").click(function () {
            console.log(this);
            $(this).closest('.qualification__div--item').remove();
            maxAppend--;
        });
    });
    // EDUCATION
    $("#qualificationEducation").click(function () {
        // if (maxAppend >= 10) return;

        var educationInput = $(
            "<div class='qualification__div--item'><div class='qualification__div--top'>" +
            "<span class='mr-2'>Minimum level of education: </span>" +
            "<div class='qualification-select-div m-t-10 mr-auto'><select class='iq-localizedEduLevel qualification__select' name='localizedEduLevel'><option class='localizedEduLevel_option' value='12' selected=''>High school</option><option class='localizedEduLevel_option' value='14'>Associate</option><option class='localizedEduLevel_option' value='16'>Bachelor's</option><option class='localizedEduLevel_option' value='18'>Master's</option><option class='localizedEduLevel_option' value='22'>Doctorate</option></select></div>" +
            " </div>  " +
            "<div class='qualification__div--bottom'>" +
            "<div class='switch-block'>" +
            "<label class='switch-light switch-candy'>" +
            "<input type='checkbox' name='' id='' />" +
            "<span>" +
            "<span>Preffered</span>" +
            " <span>Required</span>" +
            "<a></a>" +
            "</span>" +
            "</label>" +
            "</div>" +
            "</div>" +
            " <div class='qualification--remove-btn'><i class='fas fa-times'></i></div></div>");
        maxAppend++;

        $(".qualification__div").append(educationInput);
        $('.qualification__select').select2();

        $(".qualification--remove-btn").click(function () {
            console.log(this);
            $(this).closest('.qualification__div--item').remove();
            maxAppend--;
        });
    });

    // LANGUAGE
    $("#qualificationLanguage").click(function () {
        // if (maxAppend >= 10) return;
        var languageInput = $(
            "<div class='qualification__div--item'><div class='qualification__div--top'>" +
            "<div id='searchfield' class='searchfield'> <form><label class='mr-2' for='qualificationLang'>Language:</label><input type='text' name='currency' class='biginput ' id='qualificationLang' class='qualificationLang'><label class='mx-2 m-t-10'> Level: </label> <div class='qualification-select-div m-t-10'> <select class='iq-languageLevel qualification__select' name='languageLevel'><option class='languageLevel_option' value='beginner' selected=''>Beginner</option><option class='languageLevel_option' value='elementary'>Elementary</option><option class='languageLevel_option' value='intermediate'>Intermediate</option><option class='languageLevel_option' value='upperIntermediate'>Upper Intermediate</option><option class='languageLevel_option' value='advanced'>Advanced</option><option class='experienceYears_option' value='proficient'>Proficient</option></select></div></form></div></div>" +
            "<div class='qualification__div--bottom'>" +
            "<div class='switch-block'>" +
            "<label class='switch-light switch-candy'>" +
            "<input type='checkbox' name='' id='' />" +
            "<span>" +
            "<span>Preffered</span>" +
            " <span>Required</span>" +
            "<a></a>" +
            "</span>" +
            "</label>" +
            "</div>" +
            "</div>" +
            " <div class='qualification--remove-btn'><i class='fas fa-times'></i></div></div>");
        maxAppend++;

        $(".qualification__div").append(languageInput);

        $('.qualification__select').select2();

        // AUTOCOMPLETE START
        (function (e) {
            "function" === typeof define && define.amd ? define(["jquery"], e) : e(jQuery)
        })(function (e) {
            function g(a, b) {
                var c = function () {},
                    c = {
                        autoSelectFirst: !1,
                        appendTo: "body",
                        serviceUrl: null,
                        lookup: null,
                        onSelect: null,
                        width: "auto",
                        minChars: 1,
                        maxHeight: 300,
                        deferRequestBy: 0,
                        params: {},
                        formatResult: g.formatResult,
                        delimiter: null,
                        zIndex: 9999,
                        type: "GET",
                        noCache: !1,
                        onSearchStart: c,
                        onSearchComplete: c,
                        containerClass: "autocomplete-suggestions",
                        tabDisabled: !1,
                        dataType: "text",
                        lookupFilter: function (a, b, c) {
                            return -1 !==
                                a.value.toLowerCase().indexOf(c)
                        },
                        paramName: "query",
                        transformResult: function (a) {
                            return "string" === typeof a ? e.parseJSON(a) : a
                        }
                    };
                this.element = a;
                this.el = e(a);
                this.suggestions = [];
                this.badQueries = [];
                this.selectedIndex = -1;
                this.currentValue = this.element.value;
                this.intervalId = 0;
                this.cachedResponse = [];
                this.onChange = this.onChangeInterval = null;
                this.isLocal = this.ignoreValueChange = !1;
                this.suggestionsContainer = null;
                this.options = e.extend({}, c, b);
                this.classes = {
                    selected: "autocomplete-selected",
                    suggestion: "autocomplete-suggestion"
                };
                this.initialize();
                this.setOptions(b)
            }
            var h = {
                extend: function (a, b) {
                    return e.extend(a, b)
                },
                createNode: function (a) {
                    var b = document.createElement("div");
                    b.innerHTML = a;
                    return b.firstChild
                }
            };
            g.utils = h;
            e.Autocomplete = g;
            g.formatResult = function (a, b) {
                var c = "(" + b.replace(RegExp("(\\/|\\.|\\*|\\+|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\\\)", "g"), "\\$1") + ")";
                return a.value.replace(RegExp(c, "gi"), "<strong>$1</strong>")
            };
            g.prototype = {
                killerFn: null,
                initialize: function () {
                    var a = this,
                        b = "." + a.classes.suggestion,
                        c = a.classes.selected,
                        d = a.options,
                        f;
                    a.element.setAttribute("autocomplete", "off");
                    a.killerFn = function (b) {
                        0 === e(b.target).closest("." + a.options.containerClass).length && (a.killSuggestions(), a.disableKillerFn())
                    };
                    if (!d.width || "auto" === d.width) d.width = a.el.outerWidth();
                    a.suggestionsContainer = g.utils.createNode('<div class="' + d.containerClass + '" style="position: absolute; display: none;"></div>');
                    f = e(a.suggestionsContainer);
                    f.appendTo(d.appendTo).width(d.width);
                    f.on("mouseover.autocomplete", b, function () {
                        a.activate(e(this).data("index"))
                    });
                    f.on("mouseout.autocomplete", function () {
                        a.selectedIndex = -1;
                        f.children("." + c).removeClass(c)
                    });
                    f.on("click.autocomplete", b, function () {
                        a.select(e(this).data("index"), !1)
                    });
                    a.fixPosition();
                    if (window.opera) a.el.on("keypress.autocomplete", function (b) {
                        a.onKeyPress(b)
                    });
                    else a.el.on("keydown.autocomplete", function (b) {
                        a.onKeyPress(b)
                    });
                    a.el.on("keyup.autocomplete", function (b) {
                        a.onKeyUp(b)
                    });
                    a.el.on("blur.autocomplete", function () {
                        a.onBlur()
                    });
                    a.el.on("focus.autocomplete", function () {
                        a.fixPosition()
                    })
                },
                onBlur: function () {
                    this.enableKillerFn()
                },
                setOptions: function (a) {
                    var b = this.options;
                    h.extend(b, a);
                    if (this.isLocal = e.isArray(b.lookup)) b.lookup = this.verifySuggestionsFormat(b.lookup);
                    e(this.suggestionsContainer).css({
                        "max-height": b.maxHeight + "px",
                        width: b.width + "px",
                        "z-index": b.zIndex
                    })
                },
                clearCache: function () {
                    this.cachedResponse = [];
                    this.badQueries = []
                },
                clear: function () {
                    this.clearCache();
                    this.currentValue = null;
                    this.suggestions = []
                },
                disable: function () {
                    this.disabled = !0
                },
                enable: function () {
                    this.disabled = !1
                },
                fixPosition: function () {
                    var a;
                    "body" === this.options.appendTo &&
                        (a = this.el.offset(), e(this.suggestionsContainer).css({
                            top: a.top + this.el.outerHeight() + "px",
                            left: a.left + "px"
                        }))
                },
                enableKillerFn: function () {
                    e(document).on("click.autocomplete", this.killerFn)
                },
                disableKillerFn: function () {
                    e(document).off("click.autocomplete", this.killerFn)
                },
                killSuggestions: function () {
                    var a = this;
                    a.stopKillSuggestions();
                    a.intervalId = window.setInterval(function () {
                        a.hide();
                        a.stopKillSuggestions()
                    }, 300)
                },
                stopKillSuggestions: function () {
                    window.clearInterval(this.intervalId)
                },
                onKeyPress: function (a) {
                    if (!this.disabled &&
                        !this.visible && 40 === a.keyCode && this.currentValue) this.suggest();
                    else if (!this.disabled && this.visible) {
                        switch (a.keyCode) {
                            case 27:
                                this.el.val(this.currentValue);
                                this.hide();
                                break;
                            case 9:
                            case 13:
                                if (-1 === this.selectedIndex) {
                                    this.hide();
                                    return
                                }
                                this.select(this.selectedIndex, 13 === a.keyCode);
                                if (9 === a.keyCode && !1 === this.options.tabDisabled) return;
                                break;
                            case 38:
                                this.moveUp();
                                break;
                            case 40:
                                this.moveDown();
                                break;
                            default:
                                return
                        }
                        a.stopImmediatePropagation();
                        a.preventDefault()
                    }
                },
                onKeyUp: function (a) {
                    var b = this;
                    if (!b.disabled) {
                        switch (a.keyCode) {
                            case 38:
                            case 40:
                                return
                        }
                        clearInterval(b.onChangeInterval);
                        if (b.currentValue !== b.el.val())
                            if (0 < b.options.deferRequestBy) b.onChangeInterval = setInterval(function () {
                                b.onValueChange()
                            }, b.options.deferRequestBy);
                            else b.onValueChange()
                    }
                },
                onValueChange: function () {
                    var a;
                    clearInterval(this.onChangeInterval);
                    this.currentValue = this.element.value;
                    a = this.getQuery(this.currentValue);
                    this.selectedIndex = -1;
                    this.ignoreValueChange ? this.ignoreValueChange = !1 : a.length < this.options.minChars ?
                        this.hide() : this.getSuggestions(a)
                },
                getQuery: function (a) {
                    var b = this.options.delimiter;
                    if (!b) return e.trim(a);
                    a = a.split(b);
                    return e.trim(a[a.length - 1])
                },
                getSuggestionsLocal: function (a) {
                    var b = a.toLowerCase(),
                        c = this.options.lookupFilter;
                    return {
                        suggestions: e.grep(this.options.lookup, function (d) {
                            return c(d, a, b)
                        })
                    }
                },
                getSuggestions: function (a) {
                    var b, c = this,
                        d = c.options,
                        f = d.serviceUrl;
                    (b = c.isLocal ? c.getSuggestionsLocal(a) : c.cachedResponse[a]) && e.isArray(b.suggestions) ? (c.suggestions = b.suggestions, c.suggest()) :
                        c.isBadQuery(a) || (d.params[d.paramName] = a, !1 !== d.onSearchStart.call(c.element, d.params) && (e.isFunction(d.serviceUrl) && (f = d.serviceUrl.call(c.element, a)), e.ajax({
                            url: f,
                            data: d.ignoreParams ? null : d.params,
                            type: d.type,
                            dataType: d.dataType
                        }).done(function (b) {
                            c.processResponse(b, a);
                            d.onSearchComplete.call(c.element, a)
                        })))
                },
                isBadQuery: function (a) {
                    for (var b = this.badQueries, c = b.length; c--;)
                        if (0 === a.indexOf(b[c])) return !0;
                    return !1
                },
                hide: function () {
                    this.visible = !1;
                    this.selectedIndex = -1;
                    e(this.suggestionsContainer).hide()
                },
                suggest: function () {
                    if (0 === this.suggestions.length) this.hide();
                    else {
                        var a = this.options.formatResult,
                            b = this.getQuery(this.currentValue),
                            c = this.classes.suggestion,
                            d = this.classes.selected,
                            f = e(this.suggestionsContainer),
                            g = "";
                        e.each(this.suggestions, function (d, e) {
                            g += '<div class="' + c + '" data-index="' + d + '">' + a(e, b) + "</div>"
                        });
                        f.html(g).show();
                        this.visible = !0;
                        this.options.autoSelectFirst && (this.selectedIndex = 0, f.children().first().addClass(d))
                    }
                },
                verifySuggestionsFormat: function (a) {
                    return a.length && "string" ===
                        typeof a[0] ? e.map(a, function (a) {
                            return {
                                value: a,
                                data: null
                            }
                        }) : a
                },
                processResponse: function (a, b) {
                    var c = this.options,
                        d = c.transformResult(a, b);
                    d.suggestions = this.verifySuggestionsFormat(d.suggestions);
                    c.noCache || (this.cachedResponse[d[c.paramName]] = d, 0 === d.suggestions.length && this.badQueries.push(d[c.paramName]));
                    b === this.getQuery(this.currentValue) && (this.suggestions = d.suggestions, this.suggest())
                },
                activate: function (a) {
                    var b = this.classes.selected,
                        c = e(this.suggestionsContainer),
                        d = c.children();
                    c.children("." +
                        b).removeClass(b);
                    this.selectedIndex = a;
                    return -1 !== this.selectedIndex && d.length > this.selectedIndex ? (a = d.get(this.selectedIndex), e(a).addClass(b), a) : null
                },
                select: function (a, b) {
                    var c = this.suggestions[a];
                    c && (this.el.val(c), this.ignoreValueChange = b, this.hide(), this.onSelect(a))
                },
                moveUp: function () {
                    -1 !== this.selectedIndex && (0 === this.selectedIndex ? (e(this.suggestionsContainer).children().first().removeClass(this.classes.selected), this.selectedIndex = -1, this.el.val(this.currentValue)) : this.adjustScroll(this.selectedIndex -
                        1))
                },
                moveDown: function () {
                    this.selectedIndex !== this.suggestions.length - 1 && this.adjustScroll(this.selectedIndex + 1)
                },
                adjustScroll: function (a) {
                    var b = this.activate(a),
                        c, d;
                    b && (b = b.offsetTop, c = e(this.suggestionsContainer).scrollTop(), d = c + this.options.maxHeight - 25, b < c ? e(this.suggestionsContainer).scrollTop(b) : b > d && e(this.suggestionsContainer).scrollTop(b - this.options.maxHeight + 25), this.el.val(this.getValue(this.suggestions[a].value)))
                },
                onSelect: function (a) {
                    var b = this.options.onSelect;
                    a = this.suggestions[a];
                    this.el.val(this.getValue(a.value));
                    e.isFunction(b) && b.call(this.element, a)
                },
                getValue: function (a) {
                    var b = this.options.delimiter,
                        c;
                    if (!b) return a;
                    c = this.currentValue;
                    b = c.split(b);
                    return 1 === b.length ? a : c.substr(0, c.length - b[b.length - 1].length) + a
                },
                dispose: function () {
                    this.el.off(".autocomplete").removeData("autocomplete");
                    this.disableKillerFn();
                    e(this.suggestionsContainer).remove()
                }
            };
            e.fn.autocomplete = function (a, b) {
                return 0 === arguments.length ? this.first().data("autocomplete") : this.each(function () {
                    var c =
                        e(this),
                        d = c.data("autocomplete");
                    if ("string" === typeof a) {
                        if (d && "function" === typeof d[a]) d[a](b)
                    } else d && d.dispose && d.dispose(), d = new g(this, a), c.data("autocomplete", d)
                })
            }
        });

        $(function () {
            var languages = [{
                    value: 'Afghan afghani',
                    data: 'AFN'
                },
                {
                    value: 'Albanian lek',
                    data: 'ALL'
                },
                {
                    value: 'Algerian dinar',
                    data: 'DZD'
                },
                {
                    value: 'European euro',
                    data: 'EUR'
                },
                {
                    value: 'Angolan kwanza',
                    data: 'AOA'
                },
                {
                    value: 'East Caribbean dollar',
                    data: 'XCD'
                },
                {
                    value: 'Argentine peso',
                    data: 'ARS'
                },
                {
                    value: 'Armenian dram',
                    data: 'AMD'
                },
                {
                    value: 'Aruban florin',
                    data: 'AWG'
                },
                {
                    value: 'Australian dollar',
                    data: 'AUD'
                },
                {
                    value: 'Azerbaijani manat',
                    data: 'AZN'
                },
                {
                    value: 'Bahamian dollar',
                    data: 'BSD'
                },
                {
                    value: 'Bahraini dinar',
                    data: 'BHD'
                },
                {
                    value: 'Bangladeshi taka',
                    data: 'BDT'
                },
                {
                    value: 'Barbadian dollar',
                    data: 'BBD'
                },
                {
                    value: 'Belarusian ruble',
                    data: 'BYR'
                },
                {
                    value: 'Belize dollar',
                    data: 'BZD'
                },
                {
                    value: 'West African CFA franc',
                    data: 'XOF'
                },
                {
                    value: 'Bhutanese ngultrum',
                    data: 'BTN'
                },
                {
                    value: 'Bolivian boliviano',
                    data: 'BOB'
                },
                {
                    value: 'Bosnia-Herzegovina konvertibilna marka',
                    data: 'BAM'
                },
                {
                    value: 'Botswana pula',
                    data: 'BWP'
                },
                {
                    value: 'Brazilian real',
                    data: 'BRL'
                },
                {
                    value: 'Brunei dollar',
                    data: 'BND'
                },
                {
                    value: 'Bulgarian lev',
                    data: 'BGN'
                },
                {
                    value: 'Burundi franc',
                    data: 'BIF'
                },
                {
                    value: 'Cambodian riel',
                    data: 'KHR'
                },
                {
                    value: 'Central African CFA franc',
                    data: 'XAF'
                },
                {
                    value: 'Canadian dollar',
                    data: 'CAD'
                },
                {
                    value: 'Cape Verdean escudo',
                    data: 'CVE'
                },
                {
                    value: 'Cayman Islands dollar',
                    data: 'KYD'
                },
                {
                    value: 'Chilean peso',
                    data: 'CLP'
                },
                {
                    value: 'Chinese renminbi',
                    data: 'CNY'
                },
                {
                    value: 'Colombian peso',
                    data: 'COP'
                },
                {
                    value: 'Comorian franc',
                    data: 'KMF'
                },
                {
                    value: 'Congolese franc',
                    data: 'CDF'
                },
                {
                    value: 'Costa Rican colon',
                    data: 'CRC'
                },
                {
                    value: 'Croatian kuna',
                    data: 'HRK'
                },
                {
                    value: 'Cuban peso',
                    data: 'CUC'
                },
                {
                    value: 'Czech koruna',
                    data: 'CZK'
                },
                {
                    value: 'Danish krone',
                    data: 'DKK'
                },
                {
                    value: 'Djiboutian franc',
                    data: 'DJF'
                },
                {
                    value: 'Dominican peso',
                    data: 'DOP'
                },
                {
                    value: 'Egyptian pound',
                    data: 'EGP'
                },
                {
                    value: 'Central African CFA franc',
                    data: 'GQE'
                },
                {
                    value: 'Eritrean nakfa',
                    data: 'ERN'
                },
                {
                    value: 'Estonian kroon',
                    data: 'EEK'
                },
                {
                    value: 'Ethiopian birr',
                    data: 'ETB'
                },
                {
                    value: 'Falkland Islands pound',
                    data: 'FKP'
                },
                {
                    value: 'Fijian dollar',
                    data: 'FJD'
                },
                {
                    value: 'CFP franc',
                    data: 'XPF'
                },
                {
                    value: 'Gambian dalasi',
                    data: 'GMD'
                },
                {
                    value: 'Georgian lari',
                    data: 'GEL'
                },
                {
                    value: 'Ghanaian cedi',
                    data: 'GHS'
                },
                {
                    value: 'Gibraltar pound',
                    data: 'GIP'
                },
                {
                    value: 'Guatemalan quetzal',
                    data: 'GTQ'
                },
                {
                    value: 'Guinean franc',
                    data: 'GNF'
                },
                {
                    value: 'Guyanese dollar',
                    data: 'GYD'
                },
                {
                    value: 'Haitian gourde',
                    data: 'HTG'
                },
                {
                    value: 'Honduran lempira',
                    data: 'HNL'
                },
                {
                    value: 'Hong Kong dollar',
                    data: 'HKD'
                },
                {
                    value: 'Hungarian forint',
                    data: 'HUF'
                },
                {
                    value: 'Icelandic krona',
                    data: 'ISK'
                },
                {
                    value: 'Indian rupee',
                    data: 'INR'
                },
                {
                    value: 'Indonesian rupiah',
                    data: 'IDR'
                },
                {
                    value: 'Iranian rial',
                    data: 'IRR'
                },
                {
                    value: 'Iraqi dinar',
                    data: 'IQD'
                },
                {
                    value: 'Israeli new sheqel',
                    data: 'ILS'
                },
                {
                    value: 'Jamaican dollar',
                    data: 'JMD'
                },
                {
                    value: 'Japanese yen',
                    data: 'JPY'
                },
                {
                    value: 'Jordanian dinar',
                    data: 'JOD'
                },
                {
                    value: 'Kazakhstani tenge',
                    data: 'KZT'
                },
                {
                    value: 'Kenyan shilling',
                    data: 'KES'
                },
                {
                    value: 'North Korean won',
                    data: 'KPW'
                },
                {
                    value: 'South Korean won',
                    data: 'KRW'
                },
                {
                    value: 'Kuwaiti dinar',
                    data: 'KWD'
                },
                {
                    value: 'Kyrgyzstani som',
                    data: 'KGS'
                },
                {
                    value: 'Lao kip',
                    data: 'LAK'
                },
                {
                    value: 'Latvian lats',
                    data: 'LVL'
                },
                {
                    value: 'Lebanese lira',
                    data: 'LBP'
                },
                {
                    value: 'Lesotho loti',
                    data: 'LSL'
                },
                {
                    value: 'Liberian dollar',
                    data: 'LRD'
                },
                {
                    value: 'Libyan dinar',
                    data: 'LYD'
                },
                {
                    value: 'Lithuanian litas',
                    data: 'LTL'
                },
                {
                    value: 'Macanese pataca',
                    data: 'MOP'
                },
                {
                    value: 'Macedonian denar',
                    data: 'MKD'
                },
                {
                    value: 'Malagasy ariary',
                    data: 'MGA'
                },
                {
                    value: 'Malawian kwacha',
                    data: 'MWK'
                },
                {
                    value: 'Malaysian ringgit',
                    data: 'MYR'
                },
                {
                    value: 'Maldivian rufiyaa',
                    data: 'MVR'
                },
                {
                    value: 'Mauritanian ouguiya',
                    data: 'MRO'
                },
                {
                    value: 'Mauritian rupee',
                    data: 'MUR'
                },
                {
                    value: 'Mexican peso',
                    data: 'MXN'
                },
                {
                    value: 'Moldovan leu',
                    data: 'MDL'
                },
                {
                    value: 'Mongolian tugrik',
                    data: 'MNT'
                },
                {
                    value: 'Moroccan dirham',
                    data: 'MAD'
                },
                {
                    value: 'Mozambican metical',
                    data: 'MZM'
                },
                {
                    value: 'Myanma kyat',
                    data: 'MMK'
                },
                {
                    value: 'Namibian dollar',
                    data: 'NAD'
                },
                {
                    value: 'Nepalese rupee',
                    data: 'NPR'
                },
                {
                    value: 'Netherlands Antillean gulden',
                    data: 'ANG'
                },
                {
                    value: 'New Zealand dollar',
                    data: 'NZD'
                },
                {
                    value: 'Nicaraguan cordoba',
                    data: 'NIO'
                },
                {
                    value: 'Nigerian naira',
                    data: 'NGN'
                },
                {
                    value: 'Norwegian krone',
                    data: 'NOK'
                },
                {
                    value: 'Omani rial',
                    data: 'OMR'
                },
                {
                    value: 'Pakistani rupee',
                    data: 'PKR'
                },
                {
                    value: 'Panamanian balboa',
                    data: 'PAB'
                },
                {
                    value: 'Papua New Guinean kina',
                    data: 'PGK'
                },
                {
                    value: 'Paraguayan guarani',
                    data: 'PYG'
                },
                {
                    value: 'Peruvian nuevo sol',
                    data: 'PEN'
                },
                {
                    value: 'Philippine peso',
                    data: 'PHP'
                },
                {
                    value: 'Polish zloty',
                    data: 'PLN'
                },
                {
                    value: 'Qatari riyal',
                    data: 'QAR'
                },
                {
                    value: 'Romanian leu',
                    data: 'RON'
                },
                {
                    value: 'Russian ruble',
                    data: 'RUB'
                },
                {
                    value: 'Rwandan franc',
                    data: 'RWF'
                },
                {
                    value: 'Saint Helena pound',
                    data: 'SHP'
                },
                {
                    value: 'Samoan tala',
                    data: 'WST'
                },
                {
                    value: 'Sao Tome and Principe dobra',
                    data: 'STD'
                },
                {
                    value: 'Saudi riyal',
                    data: 'SAR'
                },
                {
                    value: 'Serbian dinar',
                    data: 'RSD'
                },
                {
                    value: 'Seychellois rupee',
                    data: 'SCR'
                },
                {
                    value: 'Sierra Leonean leone',
                    data: 'SLL'
                },
                {
                    value: 'Singapore dollar',
                    data: 'SGD'
                },
                {
                    value: 'Slovak koruna',
                    data: 'SKK'
                },
                {
                    value: 'Solomon Islands dollar',
                    data: 'SBD'
                },
                {
                    value: 'Somali shilling',
                    data: 'SOS'
                },
                {
                    value: 'South African rand',
                    data: 'ZAR'
                },
                {
                    value: 'Sudanese pound',
                    data: 'SDG'
                },
                {
                    value: 'Sri Lankan rupee',
                    data: 'LKR'
                },
                {
                    value: 'Sudanese pound',
                    data: 'SDG'
                },
                {
                    value: 'Surinamese dollar',
                    data: 'SRD'
                },
                {
                    value: 'Swazi lilangeni',
                    data: 'SZL'
                },
                {
                    value: 'Swedish krona',
                    data: 'SEK'
                },
                {
                    value: 'Swiss franc',
                    data: 'CHF'
                },
                {
                    value: 'Syrian pound',
                    data: 'SYP'
                },
                {
                    value: 'New Taiwan dollar',
                    data: 'TWD'
                },
                {
                    value: 'Tajikistani somoni',
                    data: 'TJS'
                },
                {
                    value: 'Tanzanian shilling',
                    data: 'TZS'
                },
                {
                    value: 'Thai baht',
                    data: 'THB'
                },
                {
                    value: 'Paanga',
                    data: 'TOP'
                },
                {
                    value: 'Trinidad and Tobago dollar',
                    data: 'TTD'
                },
                {
                    value: 'Tunisian dinar',
                    data: 'TND'
                },
                {
                    value: 'Turkish new lira',
                    data: 'TRY'
                },
                {
                    value: 'Turkmen manat',
                    data: 'TMM'
                },
                {
                    value: 'Ugandan shilling',
                    data: 'UGX'
                },
                {
                    value: 'Ukrainian hryvnia',
                    data: 'UAH'
                },
                {
                    value: 'United Arab Emirates dirham',
                    data: 'AED'
                },
                {
                    value: 'British pound',
                    data: 'GBP'
                },
                {
                    value: 'United States dollar',
                    data: 'USD'
                },
                {
                    value: 'Uruguayan peso',
                    data: 'UYU'
                },
                {
                    value: 'Uzbekistani som',
                    data: 'UZS'
                },
                {
                    value: 'Vanuatu vatu',
                    data: 'VUV'
                },
                {
                    value: 'Venezuelan bolivar',
                    data: 'VEB'
                },
                {
                    value: 'Vietnamese dong',
                    data: 'VND'
                },
                {
                    value: 'Yemeni rial',
                    data: 'YER'
                },
                {
                    value: 'Zambian kwacha',
                    data: 'ZMK'
                },
                {
                    value: 'Zimbabwean dollar',
                    data: 'ZWD'
                },
            ];

            $('#qualificationLang').autocomplete({
                lookup: languages,
                onSelect: function (suggestion) {
                    var thehtml = '<strong>Currency Name:</strong> ' + suggestion.value + ' <br> <strong>Symbol:</strong> ' + suggestion.data;
                    $('#outputcontent').html(thehtml);
                }
            });


        });

        // AUTOCOMPLETE END

        $(".qualification--remove-btn").click(function () {
            console.log(this);
            $(this).closest('.qualification__div--item').remove();
            maxAppend--;
        });
    });


    // LICENSE
    $("#qualificationLicense").click(function () {
        // if (maxAppend >= 10) return;

        var languageInput = $(
            "<div class='qualification__div--item'><div class='qualification__div--top'>" +
            "<div id='searchfield'> <form><label class='mr-2' for='qualificationLicense'>Valid </label><input type='text' name='currency' class='biginput mr-auto' id='qualificationLicense' class='qualificationLicense'><span class='mx-2 m-t-10' for='qualificationLicense'> license or certification </span></form></div></div>" +

            "<div class='qualification__div--bottom'>" +
            "<div class='switch-block'>" +
            "<label class='switch-light switch-candy'>" +
            "<input type='checkbox' name='' id='' />" +
            "<span>" +
            "<span>Preffered</span>" +
            " <span>Required</span>" +
            "<a></a>" +
            "</span>" +
            "</label>" +
            "</div>" +
            "</div>" +
            " <div class='qualification--remove-btn'><i class='fas fa-times'></i></div></div>");
        maxAppend++;

        $(".qualification__div").append(languageInput);

        // AUTOCOMPLETE START


        (function (e) {
            "function" === typeof define && define.amd ? define(["jquery"], e) : e(jQuery)
        })(function (e) {
            function g(a, b) {
                var c = function () {},
                    c = {
                        autoSelectFirst: !1,
                        appendTo: "body",
                        serviceUrl: null,
                        lookup: null,
                        onSelect: null,
                        width: "auto",
                        minChars: 1,
                        maxHeight: 300,
                        deferRequestBy: 0,
                        params: {},
                        formatResult: g.formatResult,
                        delimiter: null,
                        zIndex: 9999,
                        type: "GET",
                        noCache: !1,
                        onSearchStart: c,
                        onSearchComplete: c,
                        containerClass: "autocomplete-suggestions",
                        tabDisabled: !1,
                        dataType: "text",
                        lookupFilter: function (a, b, c) {
                            return -1 !==
                                a.value.toLowerCase().indexOf(c)
                        },
                        paramName: "query",
                        transformResult: function (a) {
                            return "string" === typeof a ? e.parseJSON(a) : a
                        }
                    };
                this.element = a;
                this.el = e(a);
                this.suggestions = [];
                this.badQueries = [];
                this.selectedIndex = -1;
                this.currentValue = this.element.value;
                this.intervalId = 0;
                this.cachedResponse = [];
                this.onChange = this.onChangeInterval = null;
                this.isLocal = this.ignoreValueChange = !1;
                this.suggestionsContainer = null;
                this.options = e.extend({}, c, b);
                this.classes = {
                    selected: "autocomplete-selected",
                    suggestion: "autocomplete-suggestion"
                };
                this.initialize();
                this.setOptions(b)
            }
            var h = {
                extend: function (a, b) {
                    return e.extend(a, b)
                },
                createNode: function (a) {
                    var b = document.createElement("div");
                    b.innerHTML = a;
                    return b.firstChild
                }
            };
            g.utils = h;
            e.Autocomplete = g;
            g.formatResult = function (a, b) {
                var c = "(" + b.replace(RegExp("(\\/|\\.|\\*|\\+|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\\\)", "g"), "\\$1") + ")";
                return a.value.replace(RegExp(c, "gi"), "<strong>$1</strong>")
            };
            g.prototype = {
                killerFn: null,
                initialize: function () {
                    var a = this,
                        b = "." + a.classes.suggestion,
                        c = a.classes.selected,
                        d = a.options,
                        f;
                    a.element.setAttribute("autocomplete", "off");
                    a.killerFn = function (b) {
                        0 === e(b.target).closest("." + a.options.containerClass).length && (a.killSuggestions(), a.disableKillerFn())
                    };
                    if (!d.width || "auto" === d.width) d.width = a.el.outerWidth();
                    a.suggestionsContainer = g.utils.createNode('<div class="' + d.containerClass + '" style="position: absolute; display: none;"></div>');
                    f = e(a.suggestionsContainer);
                    f.appendTo(d.appendTo).width(d.width);
                    f.on("mouseover.autocomplete", b, function () {
                        a.activate(e(this).data("index"))
                    });
                    f.on("mouseout.autocomplete", function () {
                        a.selectedIndex = -1;
                        f.children("." + c).removeClass(c)
                    });
                    f.on("click.autocomplete", b, function () {
                        a.select(e(this).data("index"), !1)
                    });
                    a.fixPosition();
                    if (window.opera) a.el.on("keypress.autocomplete", function (b) {
                        a.onKeyPress(b)
                    });
                    else a.el.on("keydown.autocomplete", function (b) {
                        a.onKeyPress(b)
                    });
                    a.el.on("keyup.autocomplete", function (b) {
                        a.onKeyUp(b)
                    });
                    a.el.on("blur.autocomplete", function () {
                        a.onBlur()
                    });
                    a.el.on("focus.autocomplete", function () {
                        a.fixPosition()
                    })
                },
                onBlur: function () {
                    this.enableKillerFn()
                },
                setOptions: function (a) {
                    var b = this.options;
                    h.extend(b, a);
                    if (this.isLocal = e.isArray(b.lookup)) b.lookup = this.verifySuggestionsFormat(b.lookup);
                    e(this.suggestionsContainer).css({
                        "max-height": b.maxHeight + "px",
                        width: b.width + "px",
                        "z-index": b.zIndex
                    })
                },
                clearCache: function () {
                    this.cachedResponse = [];
                    this.badQueries = []
                },
                clear: function () {
                    this.clearCache();
                    this.currentValue = null;
                    this.suggestions = []
                },
                disable: function () {
                    this.disabled = !0
                },
                enable: function () {
                    this.disabled = !1
                },
                fixPosition: function () {
                    var a;
                    "body" === this.options.appendTo &&
                        (a = this.el.offset(), e(this.suggestionsContainer).css({
                            top: a.top + this.el.outerHeight() + "px",
                            left: a.left + "px"
                        }))
                },
                enableKillerFn: function () {
                    e(document).on("click.autocomplete", this.killerFn)
                },
                disableKillerFn: function () {
                    e(document).off("click.autocomplete", this.killerFn)
                },
                killSuggestions: function () {
                    var a = this;
                    a.stopKillSuggestions();
                    a.intervalId = window.setInterval(function () {
                        a.hide();
                        a.stopKillSuggestions()
                    }, 300)
                },
                stopKillSuggestions: function () {
                    window.clearInterval(this.intervalId)
                },
                onKeyPress: function (a) {
                    if (!this.disabled &&
                        !this.visible && 40 === a.keyCode && this.currentValue) this.suggest();
                    else if (!this.disabled && this.visible) {
                        switch (a.keyCode) {
                            case 27:
                                this.el.val(this.currentValue);
                                this.hide();
                                break;
                            case 9:
                            case 13:
                                if (-1 === this.selectedIndex) {
                                    this.hide();
                                    return
                                }
                                this.select(this.selectedIndex, 13 === a.keyCode);
                                if (9 === a.keyCode && !1 === this.options.tabDisabled) return;
                                break;
                            case 38:
                                this.moveUp();
                                break;
                            case 40:
                                this.moveDown();
                                break;
                            default:
                                return
                        }
                        a.stopImmediatePropagation();
                        a.preventDefault()
                    }
                },
                onKeyUp: function (a) {
                    var b = this;
                    if (!b.disabled) {
                        switch (a.keyCode) {
                            case 38:
                            case 40:
                                return
                        }
                        clearInterval(b.onChangeInterval);
                        if (b.currentValue !== b.el.val())
                            if (0 < b.options.deferRequestBy) b.onChangeInterval = setInterval(function () {
                                b.onValueChange()
                            }, b.options.deferRequestBy);
                            else b.onValueChange()
                    }
                },
                onValueChange: function () {
                    var a;
                    clearInterval(this.onChangeInterval);
                    this.currentValue = this.element.value;
                    a = this.getQuery(this.currentValue);
                    this.selectedIndex = -1;
                    this.ignoreValueChange ? this.ignoreValueChange = !1 : a.length < this.options.minChars ?
                        this.hide() : this.getSuggestions(a)
                },
                getQuery: function (a) {
                    var b = this.options.delimiter;
                    if (!b) return e.trim(a);
                    a = a.split(b);
                    return e.trim(a[a.length - 1])
                },
                getSuggestionsLocal: function (a) {
                    var b = a.toLowerCase(),
                        c = this.options.lookupFilter;
                    return {
                        suggestions: e.grep(this.options.lookup, function (d) {
                            return c(d, a, b)
                        })
                    }
                },
                getSuggestions: function (a) {
                    var b, c = this,
                        d = c.options,
                        f = d.serviceUrl;
                    (b = c.isLocal ? c.getSuggestionsLocal(a) : c.cachedResponse[a]) && e.isArray(b.suggestions) ? (c.suggestions = b.suggestions, c.suggest()) :
                        c.isBadQuery(a) || (d.params[d.paramName] = a, !1 !== d.onSearchStart.call(c.element, d.params) && (e.isFunction(d.serviceUrl) && (f = d.serviceUrl.call(c.element, a)), e.ajax({
                            url: f,
                            data: d.ignoreParams ? null : d.params,
                            type: d.type,
                            dataType: d.dataType
                        }).done(function (b) {
                            c.processResponse(b, a);
                            d.onSearchComplete.call(c.element, a)
                        })))
                },
                isBadQuery: function (a) {
                    for (var b = this.badQueries, c = b.length; c--;)
                        if (0 === a.indexOf(b[c])) return !0;
                    return !1
                },
                hide: function () {
                    this.visible = !1;
                    this.selectedIndex = -1;
                    e(this.suggestionsContainer).hide()
                },
                suggest: function () {
                    if (0 === this.suggestions.length) this.hide();
                    else {
                        var a = this.options.formatResult,
                            b = this.getQuery(this.currentValue),
                            c = this.classes.suggestion,
                            d = this.classes.selected,
                            f = e(this.suggestionsContainer),
                            g = "";
                        e.each(this.suggestions, function (d, e) {
                            g += '<div class="' + c + '" data-index="' + d + '">' + a(e, b) + "</div>"
                        });
                        f.html(g).show();
                        this.visible = !0;
                        this.options.autoSelectFirst && (this.selectedIndex = 0, f.children().first().addClass(d))
                    }
                },
                verifySuggestionsFormat: function (a) {
                    return a.length && "string" ===
                        typeof a[0] ? e.map(a, function (a) {
                            return {
                                value: a,
                                data: null
                            }
                        }) : a
                },
                processResponse: function (a, b) {
                    var c = this.options,
                        d = c.transformResult(a, b);
                    d.suggestions = this.verifySuggestionsFormat(d.suggestions);
                    c.noCache || (this.cachedResponse[d[c.paramName]] = d, 0 === d.suggestions.length && this.badQueries.push(d[c.paramName]));
                    b === this.getQuery(this.currentValue) && (this.suggestions = d.suggestions, this.suggest())
                },
                activate: function (a) {
                    var b = this.classes.selected,
                        c = e(this.suggestionsContainer),
                        d = c.children();
                    c.children("." +
                        b).removeClass(b);
                    this.selectedIndex = a;
                    return -1 !== this.selectedIndex && d.length > this.selectedIndex ? (a = d.get(this.selectedIndex), e(a).addClass(b), a) : null
                },
                select: function (a, b) {
                    var c = this.suggestions[a];
                    c && (this.el.val(c), this.ignoreValueChange = b, this.hide(), this.onSelect(a))
                },
                moveUp: function () {
                    -1 !== this.selectedIndex && (0 === this.selectedIndex ? (e(this.suggestionsContainer).children().first().removeClass(this.classes.selected), this.selectedIndex = -1, this.el.val(this.currentValue)) : this.adjustScroll(this.selectedIndex -
                        1))
                },
                moveDown: function () {
                    this.selectedIndex !== this.suggestions.length - 1 && this.adjustScroll(this.selectedIndex + 1)
                },
                adjustScroll: function (a) {
                    var b = this.activate(a),
                        c, d;
                    b && (b = b.offsetTop, c = e(this.suggestionsContainer).scrollTop(), d = c + this.options.maxHeight - 25, b < c ? e(this.suggestionsContainer).scrollTop(b) : b > d && e(this.suggestionsContainer).scrollTop(b - this.options.maxHeight + 25), this.el.val(this.getValue(this.suggestions[a].value)))
                },
                onSelect: function (a) {
                    var b = this.options.onSelect;
                    a = this.suggestions[a];
                    this.el.val(this.getValue(a.value));
                    e.isFunction(b) && b.call(this.element, a)
                },
                getValue: function (a) {
                    var b = this.options.delimiter,
                        c;
                    if (!b) return a;
                    c = this.currentValue;
                    b = c.split(b);
                    return 1 === b.length ? a : c.substr(0, c.length - b[b.length - 1].length) + a
                },
                dispose: function () {
                    this.el.off(".autocomplete").removeData("autocomplete");
                    this.disableKillerFn();
                    e(this.suggestionsContainer).remove()
                }
            };
            e.fn.autocomplete = function (a, b) {
                return 0 === arguments.length ? this.first().data("autocomplete") : this.each(function () {
                    var c =
                        e(this),
                        d = c.data("autocomplete");
                    if ("string" === typeof a) {
                        if (d && "function" === typeof d[a]) d[a](b)
                    } else d && d.dispose && d.dispose(), d = new g(this, a), c.data("autocomplete", d)
                })
            }
        });

        $(function () {
            var licenses = [{
                    value: 'Afghan afghani',
                    data: 'AFN'
                },
                {
                    value: 'Albanian lek',
                    data: 'ALL'
                },
                {
                    value: 'Algerian dinar',
                    data: 'DZD'
                },
                {
                    value: 'European euro',
                    data: 'EUR'
                },
                {
                    value: 'Angolan kwanza',
                    data: 'AOA'
                },
                {
                    value: 'East Caribbean dollar',
                    data: 'XCD'
                },
                {
                    value: 'Argentine peso',
                    data: 'ARS'
                },
                {
                    value: 'Armenian dram',
                    data: 'AMD'
                },
                {
                    value: 'Aruban florin',
                    data: 'AWG'
                },
                {
                    value: 'Australian dollar',
                    data: 'AUD'
                },
                {
                    value: 'Azerbaijani manat',
                    data: 'AZN'
                },
                {
                    value: 'Bahamian dollar',
                    data: 'BSD'
                },
                {
                    value: 'Bahraini dinar',
                    data: 'BHD'
                },
                {
                    value: 'Bangladeshi taka',
                    data: 'BDT'
                },
                {
                    value: 'Barbadian dollar',
                    data: 'BBD'
                },
                {
                    value: 'Belarusian ruble',
                    data: 'BYR'
                },
                {
                    value: 'Belize dollar',
                    data: 'BZD'
                },
                {
                    value: 'West African CFA franc',
                    data: 'XOF'
                },
                {
                    value: 'Bhutanese ngultrum',
                    data: 'BTN'
                },
                {
                    value: 'Bolivian boliviano',
                    data: 'BOB'
                },
                {
                    value: 'Bosnia-Herzegovina konvertibilna marka',
                    data: 'BAM'
                },
                {
                    value: 'Botswana pula',
                    data: 'BWP'
                },
                {
                    value: 'Brazilian real',
                    data: 'BRL'
                },
                {
                    value: 'Brunei dollar',
                    data: 'BND'
                },
                {
                    value: 'Bulgarian lev',
                    data: 'BGN'
                },
                {
                    value: 'Burundi franc',
                    data: 'BIF'
                },
                {
                    value: 'Cambodian riel',
                    data: 'KHR'
                },
                {
                    value: 'Central African CFA franc',
                    data: 'XAF'
                },
                {
                    value: 'Canadian dollar',
                    data: 'CAD'
                },
                {
                    value: 'Cape Verdean escudo',
                    data: 'CVE'
                },
                {
                    value: 'Cayman Islands dollar',
                    data: 'KYD'
                },
                {
                    value: 'Chilean peso',
                    data: 'CLP'
                },
                {
                    value: 'Chinese renminbi',
                    data: 'CNY'
                },
                {
                    value: 'Colombian peso',
                    data: 'COP'
                },
                {
                    value: 'Comorian franc',
                    data: 'KMF'
                },
                {
                    value: 'Congolese franc',
                    data: 'CDF'
                },
                {
                    value: 'Costa Rican colon',
                    data: 'CRC'
                },
                {
                    value: 'Croatian kuna',
                    data: 'HRK'
                },
                {
                    value: 'Cuban peso',
                    data: 'CUC'
                },
                {
                    value: 'Czech koruna',
                    data: 'CZK'
                },
                {
                    value: 'Danish krone',
                    data: 'DKK'
                },
                {
                    value: 'Djiboutian franc',
                    data: 'DJF'
                },
                {
                    value: 'Dominican peso',
                    data: 'DOP'
                },
                {
                    value: 'Egyptian pound',
                    data: 'EGP'
                },
                {
                    value: 'Central African CFA franc',
                    data: 'GQE'
                },
                {
                    value: 'Eritrean nakfa',
                    data: 'ERN'
                },
                {
                    value: 'Estonian kroon',
                    data: 'EEK'
                },
                {
                    value: 'Ethiopian birr',
                    data: 'ETB'
                },
                {
                    value: 'Falkland Islands pound',
                    data: 'FKP'
                },
                {
                    value: 'Fijian dollar',
                    data: 'FJD'
                },
                {
                    value: 'CFP franc',
                    data: 'XPF'
                },
                {
                    value: 'Gambian dalasi',
                    data: 'GMD'
                },
                {
                    value: 'Georgian lari',
                    data: 'GEL'
                },
                {
                    value: 'Ghanaian cedi',
                    data: 'GHS'
                },
                {
                    value: 'Gibraltar pound',
                    data: 'GIP'
                },
                {
                    value: 'Guatemalan quetzal',
                    data: 'GTQ'
                },
                {
                    value: 'Guinean franc',
                    data: 'GNF'
                },
                {
                    value: 'Guyanese dollar',
                    data: 'GYD'
                },
                {
                    value: 'Haitian gourde',
                    data: 'HTG'
                },
                {
                    value: 'Honduran lempira',
                    data: 'HNL'
                },
                {
                    value: 'Hong Kong dollar',
                    data: 'HKD'
                },
                {
                    value: 'Hungarian forint',
                    data: 'HUF'
                },
                {
                    value: 'Icelandic krona',
                    data: 'ISK'
                },
                {
                    value: 'Indian rupee',
                    data: 'INR'
                },
                {
                    value: 'Indonesian rupiah',
                    data: 'IDR'
                },
                {
                    value: 'Iranian rial',
                    data: 'IRR'
                },
                {
                    value: 'Iraqi dinar',
                    data: 'IQD'
                },
                {
                    value: 'Israeli new sheqel',
                    data: 'ILS'
                },
                {
                    value: 'Jamaican dollar',
                    data: 'JMD'
                },
                {
                    value: 'Japanese yen',
                    data: 'JPY'
                },
                {
                    value: 'Jordanian dinar',
                    data: 'JOD'
                },
                {
                    value: 'Kazakhstani tenge',
                    data: 'KZT'
                },
                {
                    value: 'Kenyan shilling',
                    data: 'KES'
                },
                {
                    value: 'North Korean won',
                    data: 'KPW'
                },
                {
                    value: 'South Korean won',
                    data: 'KRW'
                },
                {
                    value: 'Kuwaiti dinar',
                    data: 'KWD'
                },
                {
                    value: 'Kyrgyzstani som',
                    data: 'KGS'
                },
                {
                    value: 'Lao kip',
                    data: 'LAK'
                },
                {
                    value: 'Latvian lats',
                    data: 'LVL'
                },
                {
                    value: 'Lebanese lira',
                    data: 'LBP'
                },
                {
                    value: 'Lesotho loti',
                    data: 'LSL'
                },
                {
                    value: 'Liberian dollar',
                    data: 'LRD'
                },
                {
                    value: 'Libyan dinar',
                    data: 'LYD'
                },
                {
                    value: 'Lithuanian litas',
                    data: 'LTL'
                },
                {
                    value: 'Macanese pataca',
                    data: 'MOP'
                },
                {
                    value: 'Macedonian denar',
                    data: 'MKD'
                },
                {
                    value: 'Malagasy ariary',
                    data: 'MGA'
                },
                {
                    value: 'Malawian kwacha',
                    data: 'MWK'
                },
                {
                    value: 'Malaysian ringgit',
                    data: 'MYR'
                },
                {
                    value: 'Maldivian rufiyaa',
                    data: 'MVR'
                },
                {
                    value: 'Mauritanian ouguiya',
                    data: 'MRO'
                },
                {
                    value: 'Mauritian rupee',
                    data: 'MUR'
                },
                {
                    value: 'Mexican peso',
                    data: 'MXN'
                },
                {
                    value: 'Moldovan leu',
                    data: 'MDL'
                },
                {
                    value: 'Mongolian tugrik',
                    data: 'MNT'
                },
                {
                    value: 'Moroccan dirham',
                    data: 'MAD'
                },
                {
                    value: 'Mozambican metical',
                    data: 'MZM'
                },
                {
                    value: 'Myanma kyat',
                    data: 'MMK'
                },
                {
                    value: 'Namibian dollar',
                    data: 'NAD'
                },
                {
                    value: 'Nepalese rupee',
                    data: 'NPR'
                },
                {
                    value: 'Netherlands Antillean gulden',
                    data: 'ANG'
                },
                {
                    value: 'New Zealand dollar',
                    data: 'NZD'
                },
                {
                    value: 'Nicaraguan cordoba',
                    data: 'NIO'
                },
                {
                    value: 'Nigerian naira',
                    data: 'NGN'
                },
                {
                    value: 'Norwegian krone',
                    data: 'NOK'
                },
                {
                    value: 'Omani rial',
                    data: 'OMR'
                },
                {
                    value: 'Pakistani rupee',
                    data: 'PKR'
                },
                {
                    value: 'Panamanian balboa',
                    data: 'PAB'
                },
                {
                    value: 'Papua New Guinean kina',
                    data: 'PGK'
                },
                {
                    value: 'Paraguayan guarani',
                    data: 'PYG'
                },
                {
                    value: 'Peruvian nuevo sol',
                    data: 'PEN'
                },
                {
                    value: 'Philippine peso',
                    data: 'PHP'
                },
                {
                    value: 'Polish zloty',
                    data: 'PLN'
                },
                {
                    value: 'Qatari riyal',
                    data: 'QAR'
                },
                {
                    value: 'Romanian leu',
                    data: 'RON'
                },
                {
                    value: 'Russian ruble',
                    data: 'RUB'
                },
                {
                    value: 'Rwandan franc',
                    data: 'RWF'
                },
                {
                    value: 'Saint Helena pound',
                    data: 'SHP'
                },
                {
                    value: 'Samoan tala',
                    data: 'WST'
                },
                {
                    value: 'Sao Tome and Principe dobra',
                    data: 'STD'
                },
                {
                    value: 'Saudi riyal',
                    data: 'SAR'
                },
                {
                    value: 'Serbian dinar',
                    data: 'RSD'
                },
                {
                    value: 'Seychellois rupee',
                    data: 'SCR'
                },
                {
                    value: 'Sierra Leonean leone',
                    data: 'SLL'
                },
                {
                    value: 'Singapore dollar',
                    data: 'SGD'
                },
                {
                    value: 'Slovak koruna',
                    data: 'SKK'
                },
                {
                    value: 'Solomon Islands dollar',
                    data: 'SBD'
                },
                {
                    value: 'Somali shilling',
                    data: 'SOS'
                },
                {
                    value: 'South African rand',
                    data: 'ZAR'
                },
                {
                    value: 'Sudanese pound',
                    data: 'SDG'
                },
                {
                    value: 'Sri Lankan rupee',
                    data: 'LKR'
                },
                {
                    value: 'Sudanese pound',
                    data: 'SDG'
                },
                {
                    value: 'Surinamese dollar',
                    data: 'SRD'
                },
                {
                    value: 'Swazi lilangeni',
                    data: 'SZL'
                },
                {
                    value: 'Swedish krona',
                    data: 'SEK'
                },
                {
                    value: 'Swiss franc',
                    data: 'CHF'
                },
                {
                    value: 'Syrian pound',
                    data: 'SYP'
                },
                {
                    value: 'New Taiwan dollar',
                    data: 'TWD'
                },
                {
                    value: 'Tajikistani somoni',
                    data: 'TJS'
                },
                {
                    value: 'Tanzanian shilling',
                    data: 'TZS'
                },
                {
                    value: 'Thai baht',
                    data: 'THB'
                },
                {
                    value: 'Paanga',
                    data: 'TOP'
                },
                {
                    value: 'Trinidad and Tobago dollar',
                    data: 'TTD'
                },
                {
                    value: 'Tunisian dinar',
                    data: 'TND'
                },
                {
                    value: 'Turkish new lira',
                    data: 'TRY'
                },
                {
                    value: 'Turkmen manat',
                    data: 'TMM'
                },
                {
                    value: 'Ugandan shilling',
                    data: 'UGX'
                },
                {
                    value: 'Ukrainian hryvnia',
                    data: 'UAH'
                },
                {
                    value: 'United Arab Emirates dirham',
                    data: 'AED'
                },
                {
                    value: 'British pound',
                    data: 'GBP'
                },
                {
                    value: 'United States dollar',
                    data: 'USD'
                },
                {
                    value: 'Uruguayan peso',
                    data: 'UYU'
                },
                {
                    value: 'Uzbekistani som',
                    data: 'UZS'
                },
                {
                    value: 'Vanuatu vatu',
                    data: 'VUV'
                },
                {
                    value: 'Venezuelan bolivar',
                    data: 'VEB'
                },
                {
                    value: 'Vietnamese dong',
                    data: 'VND'
                },
                {
                    value: 'Yemeni rial',
                    data: 'YER'
                },
                {
                    value: 'Zambian kwacha',
                    data: 'ZMK'
                },
                {
                    value: 'Zimbabwean dollar',
                    data: 'ZWD'
                },
            ];

            $('#qualificationLicense').autocomplete({
                lookup: licenses,
                onSelect: function (suggestion) {
                    var thehtml = '<strong>Currency Name:</strong> ' + suggestion.value + ' <br> <strong>Symbol:</strong> ' + suggestion.data;
                    $('#outputcontent').html(thehtml);
                }
            });


        });
        // AUTOCOMPLETE END


        $(".qualification--remove-btn").click(function () {
            console.log(this);
            $(this).closest('.qualification__div--item').remove();
            maxAppend--;
        });
    });

    //  WORKING DAYS
    $("#qualificationWorkingDays").click(function () {

        // if (maxAppend > 1) return;




        var daysInput = $(
            "<div class='qualification__div--item'><div class='qualification__div--top'>" +
            "<span class='mr-2'>Available to work the following days: </span> </div>" +
            "<div class='qualification__div--middle'>" +
            "<select multiple class='working-days-select' data-placeholder='Add Working Days'>" +
            "<option class='workDays'>Monday</option>" +
            "<option class='workDays'>Tuesday</option>" +
            "<option class='workDays'>Wednesday</option>" +
            "<option class='workDays'>Thursday</option>" +
            "<option class='workDays'>Friday</option>" +
            "<option class='workDays'>Saturday</option>" +
            "<option class='workDays'>Sunday</option>" +
            "</select>" +
            "</div>  " +
            "<div class='qualification__div--bottom'>" +
            "<div class='switch-block'>" +
            "<label class='switch-light switch-candy'>" +
            "<input type='checkbox' name='' id='' />" +
            "<span>" +
            "<span>Preffered</span>" +
            " <span>Required</span>" +
            "<a></a>" +
            "</span>" +
            "</label>" +
            "</div>" +
            "</div>" +
            " <div class='qualification--remove-btn qualification--remove-btn-days'><i class='fas fa-times'></i></div></div>");
        // maxAppend++;

        UpdateRemainingWorkingDays(true);
        $(".qualification__div").append(daysInput);
        var select = $('.working-days-select');
        var options = select.find('option');

        var div = $('<div />').addClass('selectMultipleWorkingDays');
        var active = $('<div />');
        var list = $('<ul />');
        var placeholder = select.data('placeholder');

        var span = $('<span />').text(placeholder).appendTo(active);
        options.each(function () {
            var text = $(this).text();
            if ($(this).is(':selected')) {
                active.append($('<a />').html('<em>' + text + '</em><i></i>'));
                span.addClass('hide');
            } else {
                list.append($('<li />').html(text));
            }
        });

        active.append($('<div />').addClass('arrow'));
        div.append(active).append(list);

        select.wrap(div);

        $(document).on('click', '.selectMultipleWorkingDays ul li', function (e) {
            var select = $(this).parent().parent();
            var li = $(this);
            if (!select.hasClass('clicked')) {
                select.addClass('clicked');
                li.prev().addClass('beforeRemove');
                li.next().addClass('afterRemove');
                li.addClass('remove');
                var a = $('<a />').addClass('notShown').html('<em>' + li.text() + '</em><i></i>').hide().appendTo(select.children('div'));
                a.slideDown(400, function () {
                    setTimeout(function () {
                        a.addClass('shown');
                        select.children('div').children('span').addClass('hide');
                        select.find('option:contains(' + li.text() + ')').prop('selected', true);
                    }, 500);
                });
                setTimeout(function () {
                    if (li.prev().is(':last-child')) {
                        li.prev().removeClass('beforeRemove');
                    }
                    if (li.next().is(':first-child')) {
                        li.next().removeClass('afterRemove');
                    }
                    setTimeout(function () {
                        li.prev().removeClass('beforeRemove');
                        li.next().removeClass('afterRemove');
                    }, 200);

                    li.slideUp(400, function () {
                        li.remove();
                        select.removeClass('clicked');
                    });
                }, 600);
            }
        });

        $(document).on('click', '.selectMultipleWorkingDays > div a', function (e) {
            var select = $(this).parent().parent();
            var self = $(this);
            self.removeClass().addClass('remove');
            select.addClass('open');
            setTimeout(function () {
                self.addClass('disappear');
                setTimeout(function () {
                    self.animate({
                        width: 0,
                        height: 0,
                        padding: 0,
                        margin: 0
                    }, 300, function () {
                        var li = $('<li />').text(self.children('em').text()).addClass('notShown').appendTo(select.find('ul'));
                        li.slideDown(400, function () {
                            li.addClass('show');
                            setTimeout(function () {
                                select.find('option:contains(' + self.children('em').text() + ')').prop('selected', false);
                                if (!select.find('option:selected').length) {
                                    select.children('div').children('span').removeClass('hide');
                                }
                                li.removeClass();
                            }, 400);
                        });
                        self.remove();
                    })
                }, 300);
            }, 400);
        });

        $(document).on('click', '.selectMultipleWorkingDays > div ', function (e) {
            $(this).parent().toggleClass('open');
        });

        $(".qualification--remove-btn-days").click(function () {
            console.log(this);
            $(this).closest('.qualification__div--item').remove();
            UpdateRemainingWorkingDays(false);
        });

    });


    //  BENEFITS
    $("#qualificationBenefits").click(function () {

        // if (maxAppend > 1) return;




        var benefitsInput = $(
            "<div class='qualification__div--item'><div class='qualification__div--top'>" +
            "<span class='mr-2'>Are any of the following benefits offered? </span> </div>" +
            "<div class='qualification__div--middle'>" +
            "<select multiple class='benefits-select-multiple' data-placeholder='Add Benefits'>" +
            "<option class='benefits-option'>Health insurance</option>" +
            "<option class='benefits-option'>Dental insurance</option>" +
            "<option class='benefits-option'>Vision insurance</option>" +
            "<option class='benefits-option'>Retirement plan</option>" +
            "<option class='benefits-option'>Signing bonus</option>" +
            "<option class='benefits-option'>Paid time off</option>" +
            "<option class='benefits-option'>Flexible schedule</option>" +
            "<option class='benefits-option'>Parental leave</option>" +
            "<option class='benefits-option'>Relocation assistance</option>" +
            "<option class='benefits-option'>Professional development assistance</option>" +
            "<option class='benefits-option'>Tuition reimbursement</option>" +
            "<option class='benefits-option'>Other</option>" +
            "<option class='benefits-option'>None</option>" +
            "</select>" +
            "</div>  " +
            "<div class='qualification__div--bottom'>" +
            "<div class='switch-block'>" +
            "<label class='switch-light switch-candy'>" +
            "<input type='checkbox' name='' id='' />" +
            "<span>" +
            "<span>Preffered</span>" +
            " <span>Required</span>" +
            "<a></a>" +
            "</span>" +
            "</label>" +
            "</div>" +
            "</div>" +
            " <div class='qualification--remove-btn qualification--remove-btn-benefits'><i class='fas fa-times'></i></div></div>");
        // maxAppend++;

        UpdateRemainingBenefits(true);
        $(".qualification__div").append(benefitsInput);
        var select2 = $('.benefits-select-multiple');
        var options2 = select2.find('option');

        var div2 = $('<div />').addClass('selectMultipleBenefits');
        var active2 = $('<div />');
        var list2 = $('<ul />');
        var placeholder2 = select2.data('placeholder');

        var span2 = $('<span />').text(placeholder2).appendTo(active2);
        options2.each(function () {
            var text2 = $(this).text();
            if ($(this).is(':selected')) {
                active2.append($('<a />').html('<em>' + text2 + '</em><i></i>'));
                span2.addClass('hide');
            } else {
                list2.append($('<li />').html(text2));
            }
        });

        active2.append($('<div />').addClass('arrow'));
        div2.append(active2).append(list2);

        select2.wrap(div2);

        $(document).on('click', '.selectMultipleBenefits ul li', function (e) {
            var select2 = $(this).parent().parent();
            var li2 = $(this);
            if (!select2.hasClass('clicked')) {
                select2.addClass('clicked');
                li2.prev().addClass('beforeRemove');
                li2.next().addClass('afterRemove');
                li2.addClass('remove');
                var a2 = $('<a />').addClass('notShown').html('<em>' + li2.text() + '</em><i></i>').hide().appendTo(select2.children('div'));
                a2.slideDown(400, function () {
                    setTimeout(function () {
                        a2.addClass('shown');
                        select2.children('div').children('span').addClass('hide');
                        select2.find('option:contains(' + li2.text() + ')').prop('selected', true);
                    }, 500);
                });
                setTimeout(function () {
                    if (li2.prev().is(':last-child')) {
                        li2.prev().removeClass('beforeRemove');
                    }
                    if (li2.next().is(':first-child')) {
                        li2.next().removeClass('afterRemove');
                    }
                    setTimeout(function () {
                        li2.prev().removeClass('beforeRemove');
                        li2.next().removeClass('afterRemove');
                    }, 200);

                    li2.slideUp(400, function () {
                        li2.remove();
                        select2.removeClass('clicked');
                    });
                }, 600);
            }
        });

        $(document).on('click', '.selectMultipleBenefits > div a', function (e) {
            var select2 = $(this).parent().parent();
            var self2 = $(this);
            self2.removeClass().addClass('remove');
            select2.addClass('open');
            setTimeout(function () {
                self2.addClass('disappear');
                setTimeout(function () {
                    self2.animate({
                        width: 0,
                        height: 0,
                        padding: 0,
                        margin: 0
                    }, 300, function () {
                        var li2 = $('<li />').text(self.children('em').text()).addClass('notShown').appendTo(select2.find('ul'));
                        li2.slideDown(400, function () {
                            li2.addClass('show');
                            setTimeout(function () {
                                select2.find('option:contains(' + self2.children('em').text() + ')').prop('selected', false);
                                if (!select2.find('option:selected').length) {
                                    select2.children('div').children('span').removeClass('hide');
                                }
                                li.removeClass();
                            }, 400);
                        });
                        self2.remove();
                    })
                }, 300);
            }, 400);
        });

        $(document).on('click', '.selectMultipleBenefits > div', function (e) {
            $(this).parent().parent().toggleClass('open');
        });

        $(".qualification--remove-btn-benefits").click(function () {
            console.log(this);
            $(this).closest('.qualification__div--item').remove();
            UpdateRemainingBenefits(false);
        });

    });
    // SKİLLS
    $("#qualificationSkills").click(function () {





        var skillsInput = $(
            "<div class='qualification__div--item'><div class='qualification__div--top'>" +
            "<span class='mr-2'>Do you have any skills? </span> </div>" +
            "<div class='qualification__div--middle'>" +
            "<select multiple class='skills-select-multiple' data-placeholder='Add Skills'>" +
            "<option class='skills-option'>Liderlik</option>" +
            "<option class='skills-option'>Komandada işləmə</option>" +
            "<option class='skills-option'>Problemləri həll etmə</option>" +
            "<option class='skills-option'>Davamlı öyrənmə</option>" +
            "<option class='skills-option'>Multi- tasking</option>" +
            "</select>" +
            "</div>  " +
            "<div class='qualification__div--bottom'>" +
            "<div class='switch-block'>" +
            "<label class='switch-light switch-candy'>" +
            "<input type='checkbox' name='' id='' />" +
            "<span>" +
            "<span>Preffered</span>" +
            " <span>Required</span>" +
            "<a></a>" +
            "</span>" +
            "</label>" +
            "</div>" +
            "</div>" +
            " <div class='qualification--remove-btn qualification--remove-btn-benefits'><i class='fas fa-times'></i></div></div>");
        // maxAppend++;

        UpdateRemainingSkills(true);
        $(".qualification__div").append(skillsInput);
        var select3 = $('.skills-select-multiple');
        var options3 = select3.find('option');

        var div3 = $('<div />').addClass('selectMultipleSkills');
        var active3 = $('<div />');
        var list3 = $('<ul />');
        var placeholder3 = select3.data('placeholder');

        var span3 = $('<span />').text(placeholder3).appendTo(active3);
        options3.each(function () {
            var text3 = $(this).text();
            if ($(this).is(':selected')) {
                active3.append($('<a />').html('<em>' + text3 + '</em><i></i>'));
                span3.addClass('hide');
            } else {
                list3.append($('<li />').html(text3));
            }
        });

        active3.append($('<div />').addClass('arrow'));
        div3.append(active3).append(list3);

        select3.wrap(div3);

        $(document).on('click', '.selectMultipleSkills ul li', function (e) {
            var select3 = $(this).parent().parent();
            var li3 = $(this);
            if (!select3.hasClass('clicked')) {
                select3.addClass('clicked');
                li3.prev().addClass('beforeRemove');
                li3.next().addClass('afterRemove');
                li3.addClass('remove');
                var a3 = $('<a />').addClass('notShown').html('<em>' + li3.text() + '</em><i></i>').hide().appendTo(select3.children('div'));
                a3.slideDown(400, function () {
                    setTimeout(function () {
                        a3.addClass('shown');
                        select3.children('div').children('span').addClass('hide');
                        select3.find('option:contains(' + li2.text() + ')').prop('selected', true);
                    }, 500);
                });
                setTimeout(function () {
                    if (li3.prev().is(':last-child')) {
                        li3.prev().removeClass('beforeRemove');
                    }
                    if (li3.next().is(':first-child')) {
                        li3.next().removeClass('afterRemove');
                    }
                    setTimeout(function () {
                        li3.prev().removeClass('beforeRemove');
                        li3.next().removeClass('afterRemove');
                    }, 200);

                    li3.slideUp(400, function () {
                        li3.remove();
                        select3.removeClass('clicked');
                    });
                }, 600);
            }
        });

        $(document).on('click', '.selectMultipleSkills > div a', function (e) {
            var select3 = $(this).parent().parent();
            var self3 = $(this);
            self3.removeClass().addClass('remove');
            select3.addClass('open');
            setTimeout(function () {
                self3.addClass('disappear');
                setTimeout(function () {
                    self3.animate({
                        width: 0,
                        height: 0,
                        padding: 0,
                        margin: 0
                    }, 300, function () {
                        var li3 = $('<li />').text(self.children('em').text()).addClass('notShown').appendTo(select3.find('ul'));
                        li3.slideDown(400, function () {
                            li3.addClass('show');
                            setTimeout(function () {
                                select3.find('option:contains(' + self3.children('em').text() + ')').prop('selected', false);
                                if (!select3.find('option:selected').length) {
                                    select3.children('div').children('span').removeClass('hide');
                                }
                                li.removeClass();
                            }, 400);
                        });
                        self3.remove();
                    })
                }, 300);
            }, 400);
        });

        $(document).on('click', '.selectMultipleSkills > div', function (e) {
            $(this).parent().toggleClass('open');
        });

        $(".qualification--remove-btn-benefits").click(function () {
            console.log(this);
            $(this).closest('.qualification__div--item').remove();
            UpdateRemainingSkills(false);
        });

    });

    // GENDER
    $("#qualificationGender").click(function () {
        if (maxAppend >= 10) return;

        var experienceInput = $(
            "<div class='qualification__div--item'><div class='qualification__div--top'>" +
            "<span class='mr-2'>Your Gender: </span> </div>" +

            "<div class='qualification__div--bottom'>" +

            "<div class='switch-toggle switch-candy switch-block switch-gender'>" +
            "<input id='male' name='view' type='radio' checked>" +
            "<label for='male' onclick=''>Male</label>" +

            "<input id='female' name='view' type='radio'>" +
            "<label for='female' onclick=''>Female</label>" +

            "<input id='other' name='view' type='radio'>" +
            "<label for='other' onclick=''>No needs</label>" +

            "<a></a>" +
            "</div>" +
            "</div>" +
            " <div class='qualification--remove-btn'><i class='fas fa-times'></i></div></div>");

        UpdateRemainingGender(true);
        $(".qualification__div").append(experienceInput);

        // $('.iq-experienceYears').select2();

        $(".qualification--remove-btn").click(function () {
            console.log(this);
            $(this).closest('.qualification__div--item').remove();
            UpdateRemainingGender(false);
        });
    });


    // CK EDITOR
    CKEDITOR.replace('qualification-editor', {
        skin: 'moono',
        enterMode: CKEDITOR.ENTER_BR,
        shiftEnterMode: CKEDITOR.ENTER_P,
        toolbar: [{
                name: 'basicstyles',
                groups: ['basicstyles'],
                items: ['Bold', 'Italic', 'BulletedList']
            },






        ],
    });


});

  // JOB TITLE LOCATION .ETC END

//JOBS-SEARCH.HTML
//JS FOR RANGE(MIN -MAX SALARY)

// $(document).ready(function() {
//     $("#range").ionRangeSlider({
//         type: "double",
//         grid: true,
//         min: 0,
//         max: 10000,
//         from: 400,
//         to: 800,
//         step:50,
//         onFinish: function (data) {
//             // Called every time handle position is changed
//             // alert(data.from,data.to);
//             $('input[type=hidden].range-min-value').val(data.from);
//             $('input[type=hidden].range-max-value').val(data.to);
//         },
        
//     });
// });
// $('.owl-carousel').owlCarousel({
//     loop:true,
//     margin:10,
   
//     responsive:{
//         0:{
//             items:1
//         },
//         600:{
//             items:3
//         },
//         1000:{
//             items:3
//         }
//     }
// })

$( document ).ready(function() {
    $(".vacance__details--text dd,.vacance__details--text dd span,.vacance__details--text dd strong, .vacance__details--text dd strong span, .vacance__details--text dt,.vacance__details--text dt span,.vacance__details--text dt strong, .vacance__details--text dt strong span, .vacance__details--text p,.vacance__details--text p span, .vacance__details--text p strong, .vacance__details--text p strong span").each(function() {
        var $this = $(this);
        if($this.html().replace(/\s|&nbsp;/g, '','.').length <= 1)
            $this.remove();
    });
    $(".vacance__details--text dd,.vacance__details--text dd span,.vacance__details--text dd strong, .vacance__details--text dd strong span, .vacance__details--text dt,.vacance__details--text dt span,.vacance__details--text dt strong, .vacance__details--text dt strong span, .vacance__details--text p,.vacance__details--text p span, .vacance__details--text p strong, .vacance__details--text p strong span").each(function() {
        var $this = $(this);
        if($this.html().replace(/\s|&nbsp;/g, '','.').length <= 1)
            $this.remove();
    });
    $(".vacance__details--text dd,.vacance__details--text dd span,.vacance__details--text dd strong, .vacance__details--text dd strong span, .vacance__details--text dt,.vacance__details--text dt span,.vacance__details--text dt strong, .vacance__details--text dt strong span, .vacance__details--text p,.vacance__details--text p span, .vacance__details--text p strong, .vacance__details--text p strong span").each(function() {
        var $this = $(this);
        if($this.html().replace(/\s|&nbsp;/g, '','.').length <= 1)
            $this.remove();
    });
    $(".vacance__details--text dd,.vacance__details--text dd span,.vacance__details--text dd strong, .vacance__details--text dd strong span, .vacance__details--text dt,.vacance__details--text dt span,.vacance__details--text dt strong, .vacance__details--text dt strong span, .vacance__details--text p,.vacance__details--text p span, .vacance__details--text p strong, .vacance__details--text p strong span").each(function() {
        var $this = $(this);
        if($this.html().replace(/\s|&nbsp;/g, '','.').length <= 1)
            $this.remove();
    });
    $(".vacance__details--text dd,.vacance__details--text dt,.vacance__details--text p,.vacance__details--text span,.vacance__details--text strong, .vacance__details--text ul li, .vacance__details--text h1, .vacance__details--text h2, .vacance__details--text h3, .vacance__details--text h4, .vacance__details--text h5, .vacance__details--text h6").find("a,p,span,strong,h1,h2,h3,h4,h5,h6,dd,dt").contents().unwrap();
    $(".vacance__details--text dd,.vacance__details--text dt,.vacance__details--text p,.vacance__details--text span,.vacance__details--text strong, .vacance__details--text ul li,.vacance__details--text h1, .vacance__details--text h2, .vacance__details--text h3, .vacance__details--text h4, .vacance__details--text h5, .vacance__details--text h6").removeAttr("style");
    

});

// $( document ).ready(function() {
//     $(".select-language option[value='ru']").remove();
//     $(".select-language option").filter("[value='ru']").remove();
// });
//JOBS-SEARCH.HTML
//REMOVE <li class="jobs__criterias-list">
$(document).ready(function(){
    $(document).on('click','.delete-criterias',function(){
        var liElement = $(this).parent().parent();
        liElement.remove(); 
        var liElementId = liElement.attr("id");
        $("#defaultCheck" + liElementId).prop("checked", false);
    })
  });


 
  $(document).ready(function(){
	$("#toAdd").on("click","a", function (event) {
				var liElements = $(this).parent();
				var icon = $(liElements).children("i");
				icon.removeClass('flaticon-add').addClass('flaticon-tick');
        $("#myResume").append(liElements);
		//отменяем стандартную обработку нажатия по ссылке
				event.preventDefault();
		//забираем идентификатор бока с атрибута href
				var linkId = $(this).attr('href');
				var btnId = linkId +'Btn';
				
				var firstView = linkId +'FirstView';
				var form = linkId +'Form';
				var body = linkId +'Body';
				$(form).css("display","block");
				if ( $(linkId).is('.initiallyHidden') ) {
					//do something it does have the protected class!
					$(linkId).removeClass('d-none');
					$(body).addClass('d-none');
				}
				
				$(btnId).removeClass('d-none');
				$('.forMyResumeList').addClass('d-none');
					
				if ($(linkId).has( firstView )) {
					$(firstView).addClass('d-none');
				} 
								
				var linkId  = $(this).attr('href'),
			
		//узнаем высоту от начала страницы до блока на который ссылается якорь
				top = $(linkId).offset().top;
				 top = top - 100;
		//анимируем переход на расстояние - top за 1500 мс
		$('body,html').animate({scrollTop: top}, 1500);
		$(btnId).click(function(){
			$(this).data('clicked', true);
			
			icon.removeClass('flaticon-tick').addClass('flaticon-add');
			$("#toAdd").prepend(liElements);
			if ($(linkId).has( firstView )) {
				$(firstView).removeClass('d-none');
			} 
			if ( $(linkId).is('.initiallyHidden') ) {
				$(linkId).addClass('d-none');
				$(body).removeClass('d-none');
			}
			$(form).css("display","none");
		});
	});
});

 
$(document).ready(function(){
	$("#toAddd").on("click","a", function (event) {
				var liElementss = $(this).parent();
				var icons	=	$(liElementss).children("i");
				icons.removeClass('flaticon-add').addClass('flaticon-tick');
        $("#myResumee").append(liElementss);
		//отменяем стандартную обработку нажатия по ссылке
				event.preventDefault();
		//забираем идентификатор бока с атрибута href
				var linkIdd = $(this).attr('href');
				var btnIdd = linkIdd +'Btn';
				
				var firstVieww = linkIdd +'FirstView';
				var formm = linkIdd +'Form';
				var bodyy = linkIdd +'Body';
				$(formm).css("display","block");
				if ( $(linkIdd).is('.initiallyHidden') ) {
					//do something it does have the protected class!
					$(linkIdd).removeClass('d-none');
					$(bodyy).addClass('d-none');
				}
				
				$(btnIdd).removeClass('d-none');
				$('.forMyResumeList').addClass('d-none');
					
				if ($(linkIdd).has( firstVieww )) {
					$(firstVieww).addClass('d-none');
				} 
								
				var linkIdd  = $(this).attr('href'),
			
		//узнаем высоту от начала страницы до блока на который ссылается якорь
				topp = $(linkIdd).offset().top;
				 topp = topp - 100; 
		//анимируем переход на расстояние - top за 1500 мс
		$('body,html').animate({scrollTop: topp}, 1500);
		$(btnIdd).click(function(){
			$(this).data('clicked', true);
			
			icons.removeClass('flaticon-tick').addClass('flaticon-add');
			$("#toAdd").prepend(liElementss);
			if ($(linkIdd).has( firstVieww )) {
				$(firstVieww).removeClass('d-none');
			} 
			if ( $(linkIdd).is('.initiallyHidden') ) {
				$(linkIdd).addClass('d-none');
				$(bodyy).removeClass('d-none');
			}
			$(formm).css("display","none");
		});
	});

});


$(document).ready(function(){
	$("#myResume").on("click","a", function (event) {   
		//отменяем стандартную обработку нажатия по ссылке
				event.preventDefault();
		//забираем идентификатор бока с атрибута href
				var linkId  = $(this).attr('href'),
		//узнаем высоту от начала страницы до блока на который ссылается якорь
				top = $(linkId).offset().top;
				 top = top - 100;
		//анимируем переход на расстояние - top за 1500 мс
		$('body,html').animate({scrollTop: top}, 1500);
		
	});

});


// CITY SELECT  START
$(function() {
  
  $('.resume-city-select > .caption').on('click', function() {
    $(this).parent().toggleClass('open');
  });
  
  $('.resume-city-select > .list > .item').on('click', function() {
    $('.resume-city-select > .list > .item').removeClass('selected');
    $(this).addClass('selected').parent().parent().removeClass('open').children('.caption').html( $(this).text() +'<i class="zmdi zmdi-chevron-down"></i>' );
  });
  
  $(document).on('keyup', function(evt) {
    if ( (evt.keyCode || evt.which) === 27 ) {
      $('.resume-city-select').removeClass('open');
    }
  });
  
  $(document).on('click', function(evt) {
    if ( $(evt.target).closest(".resume-city-select > .caption").length === 0 ) {
      $('.resume-city-select').removeClass('open');
    }
  });
  
});
// CITY SELECT  END

// CITY AUTOCOMPLETE START

(function(e){"function"===typeof define&&define.amd?define(["jquery"],e):e(jQuery)})(function(e){function g(a,b){var c=function(){},c={autoSelectFirst:!1,appendTo:"body",serviceUrl:null,lookup:null,onSelect:null,width:"auto",minChars:1,maxHeight:300,deferRequestBy:0,params:{},formatResult:g.formatResult,delimiter:null,zIndex:9999,type:"GET",noCache:!1,onSearchStart:c,onSearchComplete:c,containerClass:"autocomplete-suggestions",tabDisabled:!1,dataType:"text",lookupFilter:function(a,b,c){return-1!==
    a.value.toLowerCase().indexOf(c)},paramName:"query",transformResult:function(a){return"string"===typeof a?e.parseJSON(a):a}};this.element=a;this.el=e(a);this.suggestions=[];this.badQueries=[];this.selectedIndex=-1;this.currentValue=this.element.value;this.intervalId=0;this.cachedResponse=[];this.onChange=this.onChangeInterval=null;this.isLocal=this.ignoreValueChange=!1;this.suggestionsContainer=null;this.options=e.extend({},c,b);this.classes={selected:"autocomplete-selected",suggestion:"autocomplete-suggestion"};
    this.initialize();this.setOptions(b)}var h={extend:function(a,b){return e.extend(a,b)},createNode:function(a){var b=document.createElement("div");b.innerHTML=a;return b.firstChild}};g.utils=h;e.Autocomplete=g;g.formatResult=function(a,b){var c="("+b.replace(RegExp("(\\/|\\.|\\*|\\+|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\\\)","g"),"\\$1")+")";return a.value.replace(RegExp(c,"gi"),"<strong>$1</strong>")};g.prototype={killerFn:null,initialize:function(){var a=this,b="."+a.classes.suggestion,c=a.classes.selected,
    d=a.options,f;a.element.setAttribute("autocomplete","off");a.killerFn=function(b){0===e(b.target).closest("."+a.options.containerClass).length&&(a.killSuggestions(),a.disableKillerFn())};if(!d.width||"auto"===d.width)d.width=a.el.outerWidth();a.suggestionsContainer=g.utils.createNode('<div class="'+d.containerClass+'" style="position: absolute; display: none;"></div>');f=e(a.suggestionsContainer);f.appendTo(d.appendTo).width(d.width);f.on("mouseover.autocomplete",b,function(){a.activate(e(this).data("index"))});
    f.on("mouseout.autocomplete",function(){a.selectedIndex=-1;f.children("."+c).removeClass(c)});f.on("click.autocomplete",b,function(){a.select(e(this).data("index"),!1)});a.fixPosition();if(window.opera)a.el.on("keypress.autocomplete",function(b){a.onKeyPress(b)});else a.el.on("keydown.autocomplete",function(b){a.onKeyPress(b)});a.el.on("keyup.autocomplete",function(b){a.onKeyUp(b)});a.el.on("blur.autocomplete",function(){a.onBlur()});a.el.on("focus.autocomplete",function(){a.fixPosition()})},onBlur:function(){this.enableKillerFn()},
    setOptions:function(a){var b=this.options;h.extend(b,a);if(this.isLocal=e.isArray(b.lookup))b.lookup=this.verifySuggestionsFormat(b.lookup);e(this.suggestionsContainer).css({"max-height":b.maxHeight+"px",width:b.width+"px","z-index":b.zIndex})},clearCache:function(){this.cachedResponse=[];this.badQueries=[]},clear:function(){this.clearCache();this.currentValue=null;this.suggestions=[]},disable:function(){this.disabled=!0},enable:function(){this.disabled=!1},fixPosition:function(){var a;"body"===this.options.appendTo&&
    (a=this.el.offset(),e(this.suggestionsContainer).css({top:a.top+this.el.outerHeight()+"px",left:a.left+"px"}))},enableKillerFn:function(){e(document).on("click.autocomplete",this.killerFn)},disableKillerFn:function(){e(document).off("click.autocomplete",this.killerFn)},killSuggestions:function(){var a=this;a.stopKillSuggestions();a.intervalId=window.setInterval(function(){a.hide();a.stopKillSuggestions()},300)},stopKillSuggestions:function(){window.clearInterval(this.intervalId)},onKeyPress:function(a){if(!this.disabled&&
    !this.visible&&40===a.keyCode&&this.currentValue)this.suggest();else if(!this.disabled&&this.visible){switch(a.keyCode){case 27:this.el.val(this.currentValue);this.hide();break;case 9:case 13:if(-1===this.selectedIndex){this.hide();return}this.select(this.selectedIndex,13===a.keyCode);if(9===a.keyCode&&!1===this.options.tabDisabled)return;break;case 38:this.moveUp();break;case 40:this.moveDown();break;default:return}a.stopImmediatePropagation();a.preventDefault()}},onKeyUp:function(a){var b=this;
    if(!b.disabled){switch(a.keyCode){case 38:case 40:return}clearInterval(b.onChangeInterval);if(b.currentValue!==b.el.val())if(0<b.options.deferRequestBy)b.onChangeInterval=setInterval(function(){b.onValueChange()},b.options.deferRequestBy);else b.onValueChange()}},onValueChange:function(){var a;clearInterval(this.onChangeInterval);this.currentValue=this.element.value;a=this.getQuery(this.currentValue);this.selectedIndex=-1;this.ignoreValueChange?this.ignoreValueChange=!1:a.length<this.options.minChars?
    this.hide():this.getSuggestions(a)},getQuery:function(a){var b=this.options.delimiter;if(!b)return e.trim(a);a=a.split(b);return e.trim(a[a.length-1])},getSuggestionsLocal:function(a){var b=a.toLowerCase(),c=this.options.lookupFilter;return{suggestions:e.grep(this.options.lookup,function(d){return c(d,a,b)})}},getSuggestions:function(a){var b,c=this,d=c.options,f=d.serviceUrl;(b=c.isLocal?c.getSuggestionsLocal(a):c.cachedResponse[a])&&e.isArray(b.suggestions)?(c.suggestions=b.suggestions,c.suggest()):
    c.isBadQuery(a)||(d.params[d.paramName]=a,!1!==d.onSearchStart.call(c.element,d.params)&&(e.isFunction(d.serviceUrl)&&(f=d.serviceUrl.call(c.element,a)),e.ajax({url:f,data:d.ignoreParams?null:d.params,type:d.type,dataType:d.dataType}).done(function(b){c.processResponse(b,a);d.onSearchComplete.call(c.element,a)})))},isBadQuery:function(a){for(var b=this.badQueries,c=b.length;c--;)if(0===a.indexOf(b[c]))return!0;return!1},hide:function(){this.visible=!1;this.selectedIndex=-1;e(this.suggestionsContainer).hide()},
    suggest:function(){if(0===this.suggestions.length)this.hide();else{var a=this.options.formatResult,b=this.getQuery(this.currentValue),c=this.classes.suggestion,d=this.classes.selected,f=e(this.suggestionsContainer),g="";e.each(this.suggestions,function(d,e){g+='<div class="'+c+'" data-index="'+d+'">'+a(e,b)+"</div>"});f.html(g).show();this.visible=!0;this.options.autoSelectFirst&&(this.selectedIndex=0,f.children().first().addClass(d))}},verifySuggestionsFormat:function(a){return a.length&&"string"===
    typeof a[0]?e.map(a,function(a){return{value:a,data:null}}):a},processResponse:function(a,b){var c=this.options,d=c.transformResult(a,b);d.suggestions=this.verifySuggestionsFormat(d.suggestions);c.noCache||(this.cachedResponse[d[c.paramName]]=d,0===d.suggestions.length&&this.badQueries.push(d[c.paramName]));b===this.getQuery(this.currentValue)&&(this.suggestions=d.suggestions,this.suggest())},activate:function(a){var b=this.classes.selected,c=e(this.suggestionsContainer),d=c.children();c.children("."+
    b).removeClass(b);this.selectedIndex=a;return-1!==this.selectedIndex&&d.length>this.selectedIndex?(a=d.get(this.selectedIndex),e(a).addClass(b),a):null},select:function(a,b){var c=this.suggestions[a];c&&(this.el.val(c),this.ignoreValueChange=b,this.hide(),this.onSelect(a))},moveUp:function(){-1!==this.selectedIndex&&(0===this.selectedIndex?(e(this.suggestionsContainer).children().first().removeClass(this.classes.selected),this.selectedIndex=-1,this.el.val(this.currentValue)):this.adjustScroll(this.selectedIndex-
    1))},moveDown:function(){this.selectedIndex!==this.suggestions.length-1&&this.adjustScroll(this.selectedIndex+1)},adjustScroll:function(a){var b=this.activate(a),c,d;b&&(b=b.offsetTop,c=e(this.suggestionsContainer).scrollTop(),d=c+this.options.maxHeight-25,b<c?e(this.suggestionsContainer).scrollTop(b):b>d&&e(this.suggestionsContainer).scrollTop(b-this.options.maxHeight+25),this.el.val(this.getValue(this.suggestions[a].value)))},onSelect:function(a){var b=this.options.onSelect;a=this.suggestions[a];
    this.el.val(this.getValue(a.value));e.isFunction(b)&&b.call(this.element,a)},getValue:function(a){var b=this.options.delimiter,c;if(!b)return a;c=this.currentValue;b=c.split(b);return 1===b.length?a:c.substr(0,c.length-b[b.length-1].length)+a},dispose:function(){this.el.off(".autocomplete").removeData("autocomplete");this.disableKillerFn();e(this.suggestionsContainer).remove()}};e.fn.autocomplete=function(a,b){return 0===arguments.length?this.first().data("autocomplete"):this.each(function(){var c=
    e(this),d=c.data("autocomplete");if("string"===typeof a){if(d&&"function"===typeof d[a])d[a](b)}else d&&d.dispose&&d.dispose(),d=new g(this,a),c.data("autocomplete",d)})}});
    
    $(function(){
      var city = [
        { value: 'Afghan afghani', data: 'AFN' },
        { value: 'Albanian lek', data: 'ALL' },
        { value: 'Algerian dinar', data: 'DZD' },
        { value: 'European euro', data: 'EUR' },
    
        { value: 'Azerbaijani manat', data: 'AZN' },
        { value: 'Bahamian dollar', data: 'BSD' },
     
        { value: 'Peruvian nuevo sol', data: 'PEN' },
        { value: 'Philippine peso', data: 'PHP' },
        { value: 'Polish zloty', data: 'PLN' },
        { value: 'Qatari riyal', data: 'QAR' },
        { value: 'Romanian leu', data: 'RON' },

        { value: 'Saudi riyal', data: 'SAR' },
        { value: 'Serbian dinar', data: 'RSD' },
        { value: 'Seychellois rupee', data: 'SCR' },
        { value: 'Sierra Leonean leone', data: 'SLL' },
        { value: 'Singapore dollar', data: 'SGD' },
        { value: 'Slovak koruna', data: 'SKK' },
        { value: 'Solomon Islands dollar', data: 'SBD' },
        { value: 'Somali shilling', data: 'SOS' },
        { value: 'South African rand', data: 'ZAR' },
        { value: 'Sudanese pound', data: 'SDG' },
        { value: 'Sri Lankan rupee', data: 'LKR' },

        { value: 'Ugandan shilling', data: 'UGX' },
        { value: 'Ukrainian hryvnia', data: 'UAH' },
        { value: 'United Arab Emirates dirham', data: 'AED' },
      
        { value: 'Zimbabwean dollar', data: 'ZWD' },
      ];
      
      // setup autocomplete function pulling from currencies[] array
      $('#resume-city').autocomplete({
        lookup: city,
        onSelect: function (suggestion) {
          var thehtml = '<strong>Currency Name:</strong> ' + suggestion.value + ' <br> <strong>Symbol:</strong> ' + suggestion.data;
          $('#outputcontent').html(thehtml);
        }
      });
      
    
    });
// CITY AUTOCOMPLETE END


// CITY AUTOCOMPLETE START

(function(e){"function"===typeof define&&define.amd?define(["jquery"],e):e(jQuery)})(function(e){function g(a,b){var c=function(){},c={autoSelectFirst:!1,appendTo:"body",serviceUrl:null,lookup:null,onSelect:null,width:"auto",minChars:1,maxHeight:300,deferRequestBy:0,params:{},formatResult:g.formatResult,delimiter:null,zIndex:9999,type:"GET",noCache:!1,onSearchStart:c,onSearchComplete:c,containerClass:"autocomplete-suggestions",tabDisabled:!1,dataType:"text",lookupFilter:function(a,b,c){return-1!==
  a.value.toLowerCase().indexOf(c)},paramName:"query",transformResult:function(a){return"string"===typeof a?e.parseJSON(a):a}};this.element=a;this.el=e(a);this.suggestions=[];this.badQueries=[];this.selectedIndex=-1;this.currentValue=this.element.value;this.intervalId=0;this.cachedResponse=[];this.onChange=this.onChangeInterval=null;this.isLocal=this.ignoreValueChange=!1;this.suggestionsContainer=null;this.options=e.extend({},c,b);this.classes={selected:"autocomplete-selected",suggestion:"autocomplete-suggestion"};
  this.initialize();this.setOptions(b)}var h={extend:function(a,b){return e.extend(a,b)},createNode:function(a){var b=document.createElement("div");b.innerHTML=a;return b.firstChild}};g.utils=h;e.Autocomplete=g;g.formatResult=function(a,b){var c="("+b.replace(RegExp("(\\/|\\.|\\*|\\+|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\\\)","g"),"\\$1")+")";return a.value.replace(RegExp(c,"gi"),"<strong>$1</strong>")};g.prototype={killerFn:null,initialize:function(){var a=this,b="."+a.classes.suggestion,c=a.classes.selected,
  d=a.options,f;a.element.setAttribute("autocomplete","off");a.killerFn=function(b){0===e(b.target).closest("."+a.options.containerClass).length&&(a.killSuggestions(),a.disableKillerFn())};if(!d.width||"auto"===d.width)d.width=a.el.outerWidth();a.suggestionsContainer=g.utils.createNode('<div class="'+d.containerClass+'" style="position: absolute; display: none;"></div>');f=e(a.suggestionsContainer);f.appendTo(d.appendTo).width(d.width);f.on("mouseover.autocomplete",b,function(){a.activate(e(this).data("index"))});
  f.on("mouseout.autocomplete",function(){a.selectedIndex=-1;f.children("."+c).removeClass(c)});f.on("click.autocomplete",b,function(){a.select(e(this).data("index"),!1)});a.fixPosition();if(window.opera)a.el.on("keypress.autocomplete",function(b){a.onKeyPress(b)});else a.el.on("keydown.autocomplete",function(b){a.onKeyPress(b)});a.el.on("keyup.autocomplete",function(b){a.onKeyUp(b)});a.el.on("blur.autocomplete",function(){a.onBlur()});a.el.on("focus.autocomplete",function(){a.fixPosition()})},onBlur:function(){this.enableKillerFn()},
  setOptions:function(a){var b=this.options;h.extend(b,a);if(this.isLocal=e.isArray(b.lookup))b.lookup=this.verifySuggestionsFormat(b.lookup);e(this.suggestionsContainer).css({"max-height":b.maxHeight+"px",width:b.width+"px","z-index":b.zIndex})},clearCache:function(){this.cachedResponse=[];this.badQueries=[]},clear:function(){this.clearCache();this.currentValue=null;this.suggestions=[]},disable:function(){this.disabled=!0},enable:function(){this.disabled=!1},fixPosition:function(){var a;"body"===this.options.appendTo&&
  (a=this.el.offset(),e(this.suggestionsContainer).css({top:a.top+this.el.outerHeight()+"px",left:a.left+"px"}))},enableKillerFn:function(){e(document).on("click.autocomplete",this.killerFn)},disableKillerFn:function(){e(document).off("click.autocomplete",this.killerFn)},killSuggestions:function(){var a=this;a.stopKillSuggestions();a.intervalId=window.setInterval(function(){a.hide();a.stopKillSuggestions()},300)},stopKillSuggestions:function(){window.clearInterval(this.intervalId)},onKeyPress:function(a){if(!this.disabled&&
  !this.visible&&40===a.keyCode&&this.currentValue)this.suggest();else if(!this.disabled&&this.visible){switch(a.keyCode){case 27:this.el.val(this.currentValue);this.hide();break;case 9:case 13:if(-1===this.selectedIndex){this.hide();return}this.select(this.selectedIndex,13===a.keyCode);if(9===a.keyCode&&!1===this.options.tabDisabled)return;break;case 38:this.moveUp();break;case 40:this.moveDown();break;default:return}a.stopImmediatePropagation();a.preventDefault()}},onKeyUp:function(a){var b=this;
  if(!b.disabled){switch(a.keyCode){case 38:case 40:return}clearInterval(b.onChangeInterval);if(b.currentValue!==b.el.val())if(0<b.options.deferRequestBy)b.onChangeInterval=setInterval(function(){b.onValueChange()},b.options.deferRequestBy);else b.onValueChange()}},onValueChange:function(){var a;clearInterval(this.onChangeInterval);this.currentValue=this.element.value;a=this.getQuery(this.currentValue);this.selectedIndex=-1;this.ignoreValueChange?this.ignoreValueChange=!1:a.length<this.options.minChars?
  this.hide():this.getSuggestions(a)},getQuery:function(a){var b=this.options.delimiter;if(!b)return e.trim(a);a=a.split(b);return e.trim(a[a.length-1])},getSuggestionsLocal:function(a){var b=a.toLowerCase(),c=this.options.lookupFilter;return{suggestions:e.grep(this.options.lookup,function(d){return c(d,a,b)})}},getSuggestions:function(a){var b,c=this,d=c.options,f=d.serviceUrl;(b=c.isLocal?c.getSuggestionsLocal(a):c.cachedResponse[a])&&e.isArray(b.suggestions)?(c.suggestions=b.suggestions,c.suggest()):
  c.isBadQuery(a)||(d.params[d.paramName]=a,!1!==d.onSearchStart.call(c.element,d.params)&&(e.isFunction(d.serviceUrl)&&(f=d.serviceUrl.call(c.element,a)),e.ajax({url:f,data:d.ignoreParams?null:d.params,type:d.type,dataType:d.dataType}).done(function(b){c.processResponse(b,a);d.onSearchComplete.call(c.element,a)})))},isBadQuery:function(a){for(var b=this.badQueries,c=b.length;c--;)if(0===a.indexOf(b[c]))return!0;return!1},hide:function(){this.visible=!1;this.selectedIndex=-1;e(this.suggestionsContainer).hide()},
  suggest:function(){if(0===this.suggestions.length)this.hide();else{var a=this.options.formatResult,b=this.getQuery(this.currentValue),c=this.classes.suggestion,d=this.classes.selected,f=e(this.suggestionsContainer),g="";e.each(this.suggestions,function(d,e){g+='<div class="'+c+'" data-index="'+d+'">'+a(e,b)+"</div>"});f.html(g).show();this.visible=!0;this.options.autoSelectFirst&&(this.selectedIndex=0,f.children().first().addClass(d))}},verifySuggestionsFormat:function(a){return a.length&&"string"===
  typeof a[0]?e.map(a,function(a){return{value:a,data:null}}):a},processResponse:function(a,b){var c=this.options,d=c.transformResult(a,b);d.suggestions=this.verifySuggestionsFormat(d.suggestions);c.noCache||(this.cachedResponse[d[c.paramName]]=d,0===d.suggestions.length&&this.badQueries.push(d[c.paramName]));b===this.getQuery(this.currentValue)&&(this.suggestions=d.suggestions,this.suggest())},activate:function(a){var b=this.classes.selected,c=e(this.suggestionsContainer),d=c.children();c.children("."+
  b).removeClass(b);this.selectedIndex=a;return-1!==this.selectedIndex&&d.length>this.selectedIndex?(a=d.get(this.selectedIndex),e(a).addClass(b),a):null},select:function(a,b){var c=this.suggestions[a];c&&(this.el.val(c),this.ignoreValueChange=b,this.hide(),this.onSelect(a))},moveUp:function(){-1!==this.selectedIndex&&(0===this.selectedIndex?(e(this.suggestionsContainer).children().first().removeClass(this.classes.selected),this.selectedIndex=-1,this.el.val(this.currentValue)):this.adjustScroll(this.selectedIndex-
  1))},moveDown:function(){this.selectedIndex!==this.suggestions.length-1&&this.adjustScroll(this.selectedIndex+1)},adjustScroll:function(a){var b=this.activate(a),c,d;b&&(b=b.offsetTop,c=e(this.suggestionsContainer).scrollTop(),d=c+this.options.maxHeight-25,b<c?e(this.suggestionsContainer).scrollTop(b):b>d&&e(this.suggestionsContainer).scrollTop(b-this.options.maxHeight+25),this.el.val(this.getValue(this.suggestions[a].value)))},onSelect:function(a){var b=this.options.onSelect;a=this.suggestions[a];
  this.el.val(this.getValue(a.value));e.isFunction(b)&&b.call(this.element,a)},getValue:function(a){var b=this.options.delimiter,c;if(!b)return a;c=this.currentValue;b=c.split(b);return 1===b.length?a:c.substr(0,c.length-b[b.length-1].length)+a},dispose:function(){this.el.off(".autocomplete").removeData("autocomplete");this.disableKillerFn();e(this.suggestionsContainer).remove()}};e.fn.autocomplete=function(a,b){return 0===arguments.length?this.first().data("autocomplete"):this.each(function(){var c=
  e(this),d=c.data("autocomplete");if("string"===typeof a){if(d&&"function"===typeof d[a])d[a](b)}else d&&d.dispose&&d.dispose(),d=new g(this,a),c.data("autocomplete",d)})}});
  
  $(function(){
    var school = [
      { value: 'Afghan afghani', data: 'AFN' },
      { value: 'Albanian lek', data: 'ALL' },
      { value: 'Algerian dinar', data: 'DZD' },
      { value: 'European euro', data: 'EUR' },
  
      { value: 'Azerbaijani manat', data: 'AZN' },
      { value: 'Bahamian dollar', data: 'BSD' },
   
    
      { value: 'Moldovan leu', data: 'MDL' },
      { value: 'Mongolian tugrik', data: 'MNT' },
      { value: 'Moroccan dirham', data: 'MAD' },
      { value: 'Mozambican metical', data: 'MZM' },
      { value: 'Myanma kyat', data: 'MMK' },

      { value: 'Omani rial', data: 'OMR' },
      { value: 'Pakistani rupee', data: 'PKR' },
      { value: 'Panamanian balboa', data: 'PAB' },
      { value: 'Papua New Guinean kina', data: 'PGK' },
      { value: 'Paraguayan guarani', data: 'PYG' },
      { value: 'Peruvian nuevo sol', data: 'PEN' },
      { value: 'Philippine peso', data: 'PHP' },
      { value: 'Polish zloty', data: 'PLN' },
     

      { value: 'United Arab Emirates dirham', data: 'AED' },
    
      { value: 'Zimbabwean dollar', data: 'ZWD' },
    ];
    
    // setup autocomplete function pulling from currencies[] array
    $('#resume-school').autocomplete({
      lookup: school,
      onSelect: function (suggestion) {
        var thehtml = '<strong>Currency Name:</strong> ' + suggestion.value + ' <br> <strong>Symbol:</strong> ' + suggestion.data;
        $('#outputcontent').html(thehtml);
      }
    });
    
  
  });
// CITY AUTOCOMPLETE END


// EDUCATION LEVEL  START
$(function() {
  
  $('.resume-education-level > .caption').on('click', function() {
    $(this).parent().toggleClass('open');
  });
  
  $('.resume-education-level > .list > .item').on('click', function() {
    $('.resume-education-level > .list > .item').removeClass('selected');
    $(this).addClass('selected').parent().parent().removeClass('open').children('.caption').html( $(this).text() +'<i class="zmdi zmdi-chevron-down"></i>' );
  });
  
  $(document).on('keyup', function(evt) {
    if ( (evt.keyCode || evt.which) === 27 ) {
      $('.resume-education-level').removeClass('open');
    }
  });
  
  $(document).on('click', function(evt) {
    if ( $(evt.target).closest(".resume-education-level > .caption").length === 0 ) {
      $('.resume-education-level').removeClass('open');
    }
  });
  
});
// EDUCATION LEVEL END



// CITY EDUCATION SELECT START
$(function() {
  
  $('.resume-city-education-select > .caption').on('click', function() {
    $(this).parent().toggleClass('open');
  });
  
  $('.resume-city-education-select > .list > .item').on('click', function() {
    $('.resume-city-education-select > .list > .item').removeClass('selected');
    $(this).addClass('selected').parent().parent().removeClass('open').children('.caption').html( $(this).text() +'<i class="zmdi zmdi-chevron-down"></i>' );
  });
  
  $(document).on('keyup', function(evt) {
    if ( (evt.keyCode || evt.which) === 27 ) {
      $('.resume-city-education-select').removeClass('open');
    }
  });
  
  $(document).on('click', function(evt) {
    if ( $(evt.target).closest(".resume-city-education-select > .caption").length === 0 ) {
      $('.resume-city-education-select').removeClass('open');
    }
  });
  
});
// CITY EDUCATION SELECT END

// CITY EDUCATION AUTOCOMPLETE START

(function(e){"function"===typeof define&&define.amd?define(["jquery"],e):e(jQuery)})(function(e){function g(a,b){var c=function(){},c={autoSelectFirst:!1,appendTo:"body",serviceUrl:null,lookup:null,onSelect:null,width:"auto",minChars:1,maxHeight:300,deferRequestBy:0,params:{},formatResult:g.formatResult,delimiter:null,zIndex:9999,type:"GET",noCache:!1,onSearchStart:c,onSearchComplete:c,containerClass:"autocomplete-suggestions",tabDisabled:!1,dataType:"text",lookupFilter:function(a,b,c){return-1!==
  a.value.toLowerCase().indexOf(c)},paramName:"query",transformResult:function(a){return"string"===typeof a?e.parseJSON(a):a}};this.element=a;this.el=e(a);this.suggestions=[];this.badQueries=[];this.selectedIndex=-1;this.currentValue=this.element.value;this.intervalId=0;this.cachedResponse=[];this.onChange=this.onChangeInterval=null;this.isLocal=this.ignoreValueChange=!1;this.suggestionsContainer=null;this.options=e.extend({},c,b);this.classes={selected:"autocomplete-selected",suggestion:"autocomplete-suggestion"};
  this.initialize();this.setOptions(b)}var h={extend:function(a,b){return e.extend(a,b)},createNode:function(a){var b=document.createElement("div");b.innerHTML=a;return b.firstChild}};g.utils=h;e.Autocomplete=g;g.formatResult=function(a,b){var c="("+b.replace(RegExp("(\\/|\\.|\\*|\\+|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\\\)","g"),"\\$1")+")";return a.value.replace(RegExp(c,"gi"),"<strong>$1</strong>")};g.prototype={killerFn:null,initialize:function(){var a=this,b="."+a.classes.suggestion,c=a.classes.selected,
  d=a.options,f;a.element.setAttribute("autocomplete","off");a.killerFn=function(b){0===e(b.target).closest("."+a.options.containerClass).length&&(a.killSuggestions(),a.disableKillerFn())};if(!d.width||"auto"===d.width)d.width=a.el.outerWidth();a.suggestionsContainer=g.utils.createNode('<div class="'+d.containerClass+'" style="position: absolute; display: none;"></div>');f=e(a.suggestionsContainer);f.appendTo(d.appendTo).width(d.width);f.on("mouseover.autocomplete",b,function(){a.activate(e(this).data("index"))});
  f.on("mouseout.autocomplete",function(){a.selectedIndex=-1;f.children("."+c).removeClass(c)});f.on("click.autocomplete",b,function(){a.select(e(this).data("index"),!1)});a.fixPosition();if(window.opera)a.el.on("keypress.autocomplete",function(b){a.onKeyPress(b)});else a.el.on("keydown.autocomplete",function(b){a.onKeyPress(b)});a.el.on("keyup.autocomplete",function(b){a.onKeyUp(b)});a.el.on("blur.autocomplete",function(){a.onBlur()});a.el.on("focus.autocomplete",function(){a.fixPosition()})},onBlur:function(){this.enableKillerFn()},
  setOptions:function(a){var b=this.options;h.extend(b,a);if(this.isLocal=e.isArray(b.lookup))b.lookup=this.verifySuggestionsFormat(b.lookup);e(this.suggestionsContainer).css({"max-height":b.maxHeight+"px",width:b.width+"px","z-index":b.zIndex})},clearCache:function(){this.cachedResponse=[];this.badQueries=[]},clear:function(){this.clearCache();this.currentValue=null;this.suggestions=[]},disable:function(){this.disabled=!0},enable:function(){this.disabled=!1},fixPosition:function(){var a;"body"===this.options.appendTo&&
  (a=this.el.offset(),e(this.suggestionsContainer).css({top:a.top+this.el.outerHeight()+"px",left:a.left+"px"}))},enableKillerFn:function(){e(document).on("click.autocomplete",this.killerFn)},disableKillerFn:function(){e(document).off("click.autocomplete",this.killerFn)},killSuggestions:function(){var a=this;a.stopKillSuggestions();a.intervalId=window.setInterval(function(){a.hide();a.stopKillSuggestions()},300)},stopKillSuggestions:function(){window.clearInterval(this.intervalId)},onKeyPress:function(a){if(!this.disabled&&
  !this.visible&&40===a.keyCode&&this.currentValue)this.suggest();else if(!this.disabled&&this.visible){switch(a.keyCode){case 27:this.el.val(this.currentValue);this.hide();break;case 9:case 13:if(-1===this.selectedIndex){this.hide();return}this.select(this.selectedIndex,13===a.keyCode);if(9===a.keyCode&&!1===this.options.tabDisabled)return;break;case 38:this.moveUp();break;case 40:this.moveDown();break;default:return}a.stopImmediatePropagation();a.preventDefault()}},onKeyUp:function(a){var b=this;
  if(!b.disabled){switch(a.keyCode){case 38:case 40:return}clearInterval(b.onChangeInterval);if(b.currentValue!==b.el.val())if(0<b.options.deferRequestBy)b.onChangeInterval=setInterval(function(){b.onValueChange()},b.options.deferRequestBy);else b.onValueChange()}},onValueChange:function(){var a;clearInterval(this.onChangeInterval);this.currentValue=this.element.value;a=this.getQuery(this.currentValue);this.selectedIndex=-1;this.ignoreValueChange?this.ignoreValueChange=!1:a.length<this.options.minChars?
  this.hide():this.getSuggestions(a)},getQuery:function(a){var b=this.options.delimiter;if(!b)return e.trim(a);a=a.split(b);return e.trim(a[a.length-1])},getSuggestionsLocal:function(a){var b=a.toLowerCase(),c=this.options.lookupFilter;return{suggestions:e.grep(this.options.lookup,function(d){return c(d,a,b)})}},getSuggestions:function(a){var b,c=this,d=c.options,f=d.serviceUrl;(b=c.isLocal?c.getSuggestionsLocal(a):c.cachedResponse[a])&&e.isArray(b.suggestions)?(c.suggestions=b.suggestions,c.suggest()):
  c.isBadQuery(a)||(d.params[d.paramName]=a,!1!==d.onSearchStart.call(c.element,d.params)&&(e.isFunction(d.serviceUrl)&&(f=d.serviceUrl.call(c.element,a)),e.ajax({url:f,data:d.ignoreParams?null:d.params,type:d.type,dataType:d.dataType}).done(function(b){c.processResponse(b,a);d.onSearchComplete.call(c.element,a)})))},isBadQuery:function(a){for(var b=this.badQueries,c=b.length;c--;)if(0===a.indexOf(b[c]))return!0;return!1},hide:function(){this.visible=!1;this.selectedIndex=-1;e(this.suggestionsContainer).hide()},
  suggest:function(){if(0===this.suggestions.length)this.hide();else{var a=this.options.formatResult,b=this.getQuery(this.currentValue),c=this.classes.suggestion,d=this.classes.selected,f=e(this.suggestionsContainer),g="";e.each(this.suggestions,function(d,e){g+='<div class="'+c+'" data-index="'+d+'">'+a(e,b)+"</div>"});f.html(g).show();this.visible=!0;this.options.autoSelectFirst&&(this.selectedIndex=0,f.children().first().addClass(d))}},verifySuggestionsFormat:function(a){return a.length&&"string"===
  typeof a[0]?e.map(a,function(a){return{value:a,data:null}}):a},processResponse:function(a,b){var c=this.options,d=c.transformResult(a,b);d.suggestions=this.verifySuggestionsFormat(d.suggestions);c.noCache||(this.cachedResponse[d[c.paramName]]=d,0===d.suggestions.length&&this.badQueries.push(d[c.paramName]));b===this.getQuery(this.currentValue)&&(this.suggestions=d.suggestions,this.suggest())},activate:function(a){var b=this.classes.selected,c=e(this.suggestionsContainer),d=c.children();c.children("."+
  b).removeClass(b);this.selectedIndex=a;return-1!==this.selectedIndex&&d.length>this.selectedIndex?(a=d.get(this.selectedIndex),e(a).addClass(b),a):null},select:function(a,b){var c=this.suggestions[a];c&&(this.el.val(c),this.ignoreValueChange=b,this.hide(),this.onSelect(a))},moveUp:function(){-1!==this.selectedIndex&&(0===this.selectedIndex?(e(this.suggestionsContainer).children().first().removeClass(this.classes.selected),this.selectedIndex=-1,this.el.val(this.currentValue)):this.adjustScroll(this.selectedIndex-
  1))},moveDown:function(){this.selectedIndex!==this.suggestions.length-1&&this.adjustScroll(this.selectedIndex+1)},adjustScroll:function(a){var b=this.activate(a),c,d;b&&(b=b.offsetTop,c=e(this.suggestionsContainer).scrollTop(),d=c+this.options.maxHeight-25,b<c?e(this.suggestionsContainer).scrollTop(b):b>d&&e(this.suggestionsContainer).scrollTop(b-this.options.maxHeight+25),this.el.val(this.getValue(this.suggestions[a].value)))},onSelect:function(a){var b=this.options.onSelect;a=this.suggestions[a];
  this.el.val(this.getValue(a.value));e.isFunction(b)&&b.call(this.element,a)},getValue:function(a){var b=this.options.delimiter,c;if(!b)return a;c=this.currentValue;b=c.split(b);return 1===b.length?a:c.substr(0,c.length-b[b.length-1].length)+a},dispose:function(){this.el.off(".autocomplete").removeData("autocomplete");this.disableKillerFn();e(this.suggestionsContainer).remove()}};e.fn.autocomplete=function(a,b){return 0===arguments.length?this.first().data("autocomplete"):this.each(function(){var c=
  e(this),d=c.data("autocomplete");if("string"===typeof a){if(d&&"function"===typeof d[a])d[a](b)}else d&&d.dispose&&d.dispose(),d=new g(this,a),c.data("autocomplete",d)})}});
  
  $(function(){
    var cityEducation = [
      { value: 'Afghan afghani', data: 'AFN' },
      { value: 'Albanian lek', data: 'ALL' },
      { value: 'Algerian dinar', data: 'DZD' },
      { value: 'European euro', data: 'EUR' },
  
      { value: 'Azerbaijani manat', data: 'AZN' },
      { value: 'Bahamian dollar', data: 'BSD' },
   
    
      { value: 'Moldovan leu', data: 'MDL' },
      { value: 'Mongolian tugrik', data: 'MNT' },
      { value: 'Moroccan dirham', data: 'MAD' },
      { value: 'Mozambican metical', data: 'MZM' },
      { value: 'Myanma kyat', data: 'MMK' },

      { value: 'Omani rial', data: 'OMR' },
      { value: 'Pakistani rupee', data: 'PKR' },
      { value: 'Panamanian balboa', data: 'PAB' },
      { value: 'Papua New Guinean kina', data: 'PGK' },
      { value: 'Paraguayan guarani', data: 'PYG' },
      { value: 'Peruvian nuevo sol', data: 'PEN' },
      { value: 'Philippine peso', data: 'PHP' },
      { value: 'Polish zloty', data: 'PLN' },
     

      { value: 'United Arab Emirates dirham', data: 'AED' },
    
      { value: 'Zimbabwean dollar', data: 'ZWD' },
    ];
    
    // setup autocomplete function pulling from currencies[] array
    $('#resume-cityEducation').autocomplete({
      lookup: cityEducation,
      onSelect: function (suggestion) {
        var thehtml = '<strong>Currency Name:</strong> ' + suggestion.value + ' <br> <strong>Symbol:</strong> ' + suggestion.data;
        $('#outputcontent').html(thehtml);
      }
    });
    
  
  });
// CITY EDUCATION AUTOCOMPLETE END

// JOB CITY  START
$(function() {
  
  $('.resume-city-job > .caption').on('click', function() {
    $(this).parent().toggleClass('open');
  });
  
  $('.resume-city-job > .list > .item').on('click', function() {
    $('.resume-city-job > .list > .item').removeClass('selected');
    $(this).addClass('selected').parent().parent().removeClass('open').children('.caption').html( $(this).text() +'<i class="zmdi zmdi-chevron-down"></i>' );
  });
  
  $(document).on('keyup', function(evt) {
    if ( (evt.keyCode || evt.which) === 27 ) {
      $('.resume-city-job').removeClass('open');
    }
  });
  
  $(document).on('click', function(evt) {
    if ( $(evt.target).closest(".resume-city-job > .caption").length === 0 ) {
      $('.resume-city-job').removeClass('open');
    }
  });
  
});
// JOB CITY END


// MONTH FROM EDUCATION
$(function() {
  
  $('.resume-education-from-month > .caption').on('click', function() {
    $(this).parent().toggleClass('open');
  });
  
  $('.resume-education-from-month > .list > .item').on('click', function() {
    $('.resume-education-from-month > .list > .item').removeClass('selected');
    $(this).addClass('selected').parent().parent().removeClass('open').children('.caption').html( $(this).text() +'<i class="zmdi zmdi-chevron-down"></i>' );
  });
  
  $(document).on('keyup', function(evt) {
    if ( (evt.keyCode || evt.which) === 27 ) {
      $('.resume-education-from-month').removeClass('open');
    }
  });
  
  $(document).on('click', function(evt) {
    if ( $(evt.target).closest(".resume-education-from-month > .caption").length === 0 ) {
      $('.resume-education-from-month').removeClass('open');
    }
  });
  
});
//  YEAR FROM EDUCATION
$(function() {
  
  $('.resume-education-from-year > .caption').on('click', function() {
    $(this).parent().toggleClass('open');
  });
  
  $('.resume-education-from-year > .list > .item').on('click', function() {
    $('.resume-education-from-year > .list > .item').removeClass('selected');
    $(this).addClass('selected').parent().parent().removeClass('open').children('.caption').html( $(this).text() +'<i class="zmdi zmdi-chevron-down"></i>' );
  });
  
  $(document).on('keyup', function(evt) {
    if ( (evt.keyCode || evt.which) === 27 ) {
      $('.resume-education-from-year').removeClass('open');
    }
  });
  
  $(document).on('click', function(evt) {
    if ( $(evt.target).closest(".resume-education-from-year > .caption").length === 0 ) {
      $('.resume-education-from-year').removeClass('open');
    }
  });
  
});

// MONTH TO EDUCATION
$(function() {
  
  $('.resume-education-to-month > .caption').on('click', function() {
    $(this).parent().toggleClass('open');
  });
  
  $('.resume-education-to-month > .list > .item').on('click', function() {
    $('.resume-education-to-month > .list > .item').removeClass('selected');
    $(this).addClass('selected').parent().parent().removeClass('open').children('.caption').html( $(this).text() +'<i class="zmdi zmdi-chevron-down"></i>' );
  });
  
  $(document).on('keyup', function(evt) {
    if ( (evt.keyCode || evt.which) === 27 ) {
      $('.resume-education-to-month').removeClass('open');
    }
  });
  
  $(document).on('click', function(evt) {
    if ( $(evt.target).closest(".resume-education-to-month > .caption").length === 0 ) {
      $('.resume-education-to-month').removeClass('open');
    }
  });
  
});
//  YEAR TO EDUCATION
$(function() {
  
  $('.resume-education-to-year > .caption').on('click', function() {
    $(this).parent().toggleClass('open');
  });
  
  $('.resume-education-to-year > .list > .item').on('click', function() {
    $('.resume-education-to-year > .list > .item').removeClass('selected');
    $(this).addClass('selected').parent().parent().removeClass('open').children('.caption').html( $(this).text() +'<i class="zmdi zmdi-chevron-down"></i>' );
  });
  
  $(document).on('keyup', function(evt) {
    if ( (evt.keyCode || evt.which) === 27 ) {
      $('.resume-education-to-year').removeClass('open');
    }
  });
  
  $(document).on('click', function(evt) {
    if ( $(evt.target).closest(".resume-education-to-year > .caption").length === 0 ) {
      $('.resume-education-to-year').removeClass('open');
    }
  });
  
});





// JOB TITLE AUTOCOMPLETE START

(function(e){"function"===typeof define&&define.amd?define(["jquery"],e):e(jQuery)})(function(e){function g(a,b){var c=function(){},c={autoSelectFirst:!1,appendTo:"body",serviceUrl:null,lookup:null,onSelect:null,width:"auto",minChars:1,maxHeight:300,deferRequestBy:0,params:{},formatResult:g.formatResult,delimiter:null,zIndex:9999,type:"GET",noCache:!1,onSearchStart:c,onSearchComplete:c,containerClass:"autocomplete-suggestions",tabDisabled:!1,dataType:"text",lookupFilter:function(a,b,c){return-1!==
  a.value.toLowerCase().indexOf(c)},paramName:"query",transformResult:function(a){return"string"===typeof a?e.parseJSON(a):a}};this.element=a;this.el=e(a);this.suggestions=[];this.badQueries=[];this.selectedIndex=-1;this.currentValue=this.element.value;this.intervalId=0;this.cachedResponse=[];this.onChange=this.onChangeInterval=null;this.isLocal=this.ignoreValueChange=!1;this.suggestionsContainer=null;this.options=e.extend({},c,b);this.classes={selected:"autocomplete-selected",suggestion:"autocomplete-suggestion"};
  this.initialize();this.setOptions(b)}var h={extend:function(a,b){return e.extend(a,b)},createNode:function(a){var b=document.createElement("div");b.innerHTML=a;return b.firstChild}};g.utils=h;e.Autocomplete=g;g.formatResult=function(a,b){var c="("+b.replace(RegExp("(\\/|\\.|\\*|\\+|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\\\)","g"),"\\$1")+")";return a.value.replace(RegExp(c,"gi"),"<strong>$1</strong>")};g.prototype={killerFn:null,initialize:function(){var a=this,b="."+a.classes.suggestion,c=a.classes.selected,
  d=a.options,f;a.element.setAttribute("autocomplete","off");a.killerFn=function(b){0===e(b.target).closest("."+a.options.containerClass).length&&(a.killSuggestions(),a.disableKillerFn())};if(!d.width||"auto"===d.width)d.width=a.el.outerWidth();a.suggestionsContainer=g.utils.createNode('<div class="'+d.containerClass+'" style="position: absolute; display: none;"></div>');f=e(a.suggestionsContainer);f.appendTo(d.appendTo).width(d.width);f.on("mouseover.autocomplete",b,function(){a.activate(e(this).data("index"))});
  f.on("mouseout.autocomplete",function(){a.selectedIndex=-1;f.children("."+c).removeClass(c)});f.on("click.autocomplete",b,function(){a.select(e(this).data("index"),!1)});a.fixPosition();if(window.opera)a.el.on("keypress.autocomplete",function(b){a.onKeyPress(b)});else a.el.on("keydown.autocomplete",function(b){a.onKeyPress(b)});a.el.on("keyup.autocomplete",function(b){a.onKeyUp(b)});a.el.on("blur.autocomplete",function(){a.onBlur()});a.el.on("focus.autocomplete",function(){a.fixPosition()})},onBlur:function(){this.enableKillerFn()},
  setOptions:function(a){var b=this.options;h.extend(b,a);if(this.isLocal=e.isArray(b.lookup))b.lookup=this.verifySuggestionsFormat(b.lookup);e(this.suggestionsContainer).css({"max-height":b.maxHeight+"px",width:b.width+"px","z-index":b.zIndex})},clearCache:function(){this.cachedResponse=[];this.badQueries=[]},clear:function(){this.clearCache();this.currentValue=null;this.suggestions=[]},disable:function(){this.disabled=!0},enable:function(){this.disabled=!1},fixPosition:function(){var a;"body"===this.options.appendTo&&
  (a=this.el.offset(),e(this.suggestionsContainer).css({top:a.top+this.el.outerHeight()+"px",left:a.left+"px"}))},enableKillerFn:function(){e(document).on("click.autocomplete",this.killerFn)},disableKillerFn:function(){e(document).off("click.autocomplete",this.killerFn)},killSuggestions:function(){var a=this;a.stopKillSuggestions();a.intervalId=window.setInterval(function(){a.hide();a.stopKillSuggestions()},300)},stopKillSuggestions:function(){window.clearInterval(this.intervalId)},onKeyPress:function(a){if(!this.disabled&&
  !this.visible&&40===a.keyCode&&this.currentValue)this.suggest();else if(!this.disabled&&this.visible){switch(a.keyCode){case 27:this.el.val(this.currentValue);this.hide();break;case 9:case 13:if(-1===this.selectedIndex){this.hide();return}this.select(this.selectedIndex,13===a.keyCode);if(9===a.keyCode&&!1===this.options.tabDisabled)return;break;case 38:this.moveUp();break;case 40:this.moveDown();break;default:return}a.stopImmediatePropagation();a.preventDefault()}},onKeyUp:function(a){var b=this;
  if(!b.disabled){switch(a.keyCode){case 38:case 40:return}clearInterval(b.onChangeInterval);if(b.currentValue!==b.el.val())if(0<b.options.deferRequestBy)b.onChangeInterval=setInterval(function(){b.onValueChange()},b.options.deferRequestBy);else b.onValueChange()}},onValueChange:function(){var a;clearInterval(this.onChangeInterval);this.currentValue=this.element.value;a=this.getQuery(this.currentValue);this.selectedIndex=-1;this.ignoreValueChange?this.ignoreValueChange=!1:a.length<this.options.minChars?
  this.hide():this.getSuggestions(a)},getQuery:function(a){var b=this.options.delimiter;if(!b)return e.trim(a);a=a.split(b);return e.trim(a[a.length-1])},getSuggestionsLocal:function(a){var b=a.toLowerCase(),c=this.options.lookupFilter;return{suggestions:e.grep(this.options.lookup,function(d){return c(d,a,b)})}},getSuggestions:function(a){var b,c=this,d=c.options,f=d.serviceUrl;(b=c.isLocal?c.getSuggestionsLocal(a):c.cachedResponse[a])&&e.isArray(b.suggestions)?(c.suggestions=b.suggestions,c.suggest()):
  c.isBadQuery(a)||(d.params[d.paramName]=a,!1!==d.onSearchStart.call(c.element,d.params)&&(e.isFunction(d.serviceUrl)&&(f=d.serviceUrl.call(c.element,a)),e.ajax({url:f,data:d.ignoreParams?null:d.params,type:d.type,dataType:d.dataType}).done(function(b){c.processResponse(b,a);d.onSearchComplete.call(c.element,a)})))},isBadQuery:function(a){for(var b=this.badQueries,c=b.length;c--;)if(0===a.indexOf(b[c]))return!0;return!1},hide:function(){this.visible=!1;this.selectedIndex=-1;e(this.suggestionsContainer).hide()},
  suggest:function(){if(0===this.suggestions.length)this.hide();else{var a=this.options.formatResult,b=this.getQuery(this.currentValue),c=this.classes.suggestion,d=this.classes.selected,f=e(this.suggestionsContainer),g="";e.each(this.suggestions,function(d,e){g+='<div class="'+c+'" data-index="'+d+'">'+a(e,b)+"</div>"});f.html(g).show();this.visible=!0;this.options.autoSelectFirst&&(this.selectedIndex=0,f.children().first().addClass(d))}},verifySuggestionsFormat:function(a){return a.length&&"string"===
  typeof a[0]?e.map(a,function(a){return{value:a,data:null}}):a},processResponse:function(a,b){var c=this.options,d=c.transformResult(a,b);d.suggestions=this.verifySuggestionsFormat(d.suggestions);c.noCache||(this.cachedResponse[d[c.paramName]]=d,0===d.suggestions.length&&this.badQueries.push(d[c.paramName]));b===this.getQuery(this.currentValue)&&(this.suggestions=d.suggestions,this.suggest())},activate:function(a){var b=this.classes.selected,c=e(this.suggestionsContainer),d=c.children();c.children("."+
  b).removeClass(b);this.selectedIndex=a;return-1!==this.selectedIndex&&d.length>this.selectedIndex?(a=d.get(this.selectedIndex),e(a).addClass(b),a):null},select:function(a,b){var c=this.suggestions[a];c&&(this.el.val(c),this.ignoreValueChange=b,this.hide(),this.onSelect(a))},moveUp:function(){-1!==this.selectedIndex&&(0===this.selectedIndex?(e(this.suggestionsContainer).children().first().removeClass(this.classes.selected),this.selectedIndex=-1,this.el.val(this.currentValue)):this.adjustScroll(this.selectedIndex-
  1))},moveDown:function(){this.selectedIndex!==this.suggestions.length-1&&this.adjustScroll(this.selectedIndex+1)},adjustScroll:function(a){var b=this.activate(a),c,d;b&&(b=b.offsetTop,c=e(this.suggestionsContainer).scrollTop(),d=c+this.options.maxHeight-25,b<c?e(this.suggestionsContainer).scrollTop(b):b>d&&e(this.suggestionsContainer).scrollTop(b-this.options.maxHeight+25),this.el.val(this.getValue(this.suggestions[a].value)))},onSelect:function(a){var b=this.options.onSelect;a=this.suggestions[a];
  this.el.val(this.getValue(a.value));e.isFunction(b)&&b.call(this.element,a)},getValue:function(a){var b=this.options.delimiter,c;if(!b)return a;c=this.currentValue;b=c.split(b);return 1===b.length?a:c.substr(0,c.length-b[b.length-1].length)+a},dispose:function(){this.el.off(".autocomplete").removeData("autocomplete");this.disableKillerFn();e(this.suggestionsContainer).remove()}};e.fn.autocomplete=function(a,b){return 0===arguments.length?this.first().data("autocomplete"):this.each(function(){var c=
  e(this),d=c.data("autocomplete");if("string"===typeof a){if(d&&"function"===typeof d[a])d[a](b)}else d&&d.dispose&&d.dispose(),d=new g(this,a),c.data("autocomplete",d)})}});
  
  $(function(){
    var jobTitle = [
      { value: 'Afghan afghani', data: 'AFN' },
      { value: 'Albanian lek', data: 'ALL' },
      { value: 'Algerian dinar', data: 'DZD' },
      { value: 'European euro', data: 'EUR' },
  
      { value: 'Azerbaijani manat', data: 'AZN' },
      { value: 'Bahamian dollar', data: 'BSD' },
   
    
      { value: 'Moldovan leu', data: 'MDL' },
      { value: 'Mongolian tugrik', data: 'MNT' },
      { value: 'Moroccan dirham', data: 'MAD' },
      { value: 'Mozambican metical', data: 'MZM' },
      { value: 'Myanma kyat', data: 'MMK' },

      { value: 'Omani rial', data: 'OMR' },
      { value: 'Pakistani rupee', data: 'PKR' },
      { value: 'Panamanian balboa', data: 'PAB' },
      { value: 'Papua New Guinean kina', data: 'PGK' },
      { value: 'Paraguayan guarani', data: 'PYG' },
      { value: 'Peruvian nuevo sol', data: 'PEN' },
      { value: 'Philippine peso', data: 'PHP' },
      { value: 'Polish zloty', data: 'PLN' },
     

      { value: 'United Arab Emirates dirham', data: 'AED' },
    
      { value: 'Zimbabwean dollar', data: 'ZWD' },
    ];
    
    // setup autocomplete function pulling from currencies[] array
    $('#resume-job-title').autocomplete({
      lookup: jobTitle,
      onSelect: function (suggestion) {
        var thehtml = '<strong>Currency Name:</strong> ' + suggestion.value + ' <br> <strong>Symbol:</strong> ' + suggestion.data;
        $('#outputcontent').html(thehtml);
      }
    });
    
  
  });
// JOB TITLE END

// JOB COMPANY AUTOCOMPLETE START

(function(e){"function"===typeof define&&define.amd?define(["jquery"],e):e(jQuery)})(function(e){function g(a,b){var c=function(){},c={autoSelectFirst:!1,appendTo:"body",serviceUrl:null,lookup:null,onSelect:null,width:"auto",minChars:1,maxHeight:300,deferRequestBy:0,params:{},formatResult:g.formatResult,delimiter:null,zIndex:9999,type:"GET",noCache:!1,onSearchStart:c,onSearchComplete:c,containerClass:"autocomplete-suggestions",tabDisabled:!1,dataType:"text",lookupFilter:function(a,b,c){return-1!==
  a.value.toLowerCase().indexOf(c)},paramName:"query",transformResult:function(a){return"string"===typeof a?e.parseJSON(a):a}};this.element=a;this.el=e(a);this.suggestions=[];this.badQueries=[];this.selectedIndex=-1;this.currentValue=this.element.value;this.intervalId=0;this.cachedResponse=[];this.onChange=this.onChangeInterval=null;this.isLocal=this.ignoreValueChange=!1;this.suggestionsContainer=null;this.options=e.extend({},c,b);this.classes={selected:"autocomplete-selected",suggestion:"autocomplete-suggestion"};
  this.initialize();this.setOptions(b)}var h={extend:function(a,b){return e.extend(a,b)},createNode:function(a){var b=document.createElement("div");b.innerHTML=a;return b.firstChild}};g.utils=h;e.Autocomplete=g;g.formatResult=function(a,b){var c="("+b.replace(RegExp("(\\/|\\.|\\*|\\+|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\\\)","g"),"\\$1")+")";return a.value.replace(RegExp(c,"gi"),"<strong>$1</strong>")};g.prototype={killerFn:null,initialize:function(){var a=this,b="."+a.classes.suggestion,c=a.classes.selected,
  d=a.options,f;a.element.setAttribute("autocomplete","off");a.killerFn=function(b){0===e(b.target).closest("."+a.options.containerClass).length&&(a.killSuggestions(),a.disableKillerFn())};if(!d.width||"auto"===d.width)d.width=a.el.outerWidth();a.suggestionsContainer=g.utils.createNode('<div class="'+d.containerClass+'" style="position: absolute; display: none;"></div>');f=e(a.suggestionsContainer);f.appendTo(d.appendTo).width(d.width);f.on("mouseover.autocomplete",b,function(){a.activate(e(this).data("index"))});
  f.on("mouseout.autocomplete",function(){a.selectedIndex=-1;f.children("."+c).removeClass(c)});f.on("click.autocomplete",b,function(){a.select(e(this).data("index"),!1)});a.fixPosition();if(window.opera)a.el.on("keypress.autocomplete",function(b){a.onKeyPress(b)});else a.el.on("keydown.autocomplete",function(b){a.onKeyPress(b)});a.el.on("keyup.autocomplete",function(b){a.onKeyUp(b)});a.el.on("blur.autocomplete",function(){a.onBlur()});a.el.on("focus.autocomplete",function(){a.fixPosition()})},onBlur:function(){this.enableKillerFn()},
  setOptions:function(a){var b=this.options;h.extend(b,a);if(this.isLocal=e.isArray(b.lookup))b.lookup=this.verifySuggestionsFormat(b.lookup);e(this.suggestionsContainer).css({"max-height":b.maxHeight+"px",width:b.width+"px","z-index":b.zIndex})},clearCache:function(){this.cachedResponse=[];this.badQueries=[]},clear:function(){this.clearCache();this.currentValue=null;this.suggestions=[]},disable:function(){this.disabled=!0},enable:function(){this.disabled=!1},fixPosition:function(){var a;"body"===this.options.appendTo&&
  (a=this.el.offset(),e(this.suggestionsContainer).css({top:a.top+this.el.outerHeight()+"px",left:a.left+"px"}))},enableKillerFn:function(){e(document).on("click.autocomplete",this.killerFn)},disableKillerFn:function(){e(document).off("click.autocomplete",this.killerFn)},killSuggestions:function(){var a=this;a.stopKillSuggestions();a.intervalId=window.setInterval(function(){a.hide();a.stopKillSuggestions()},300)},stopKillSuggestions:function(){window.clearInterval(this.intervalId)},onKeyPress:function(a){if(!this.disabled&&
  !this.visible&&40===a.keyCode&&this.currentValue)this.suggest();else if(!this.disabled&&this.visible){switch(a.keyCode){case 27:this.el.val(this.currentValue);this.hide();break;case 9:case 13:if(-1===this.selectedIndex){this.hide();return}this.select(this.selectedIndex,13===a.keyCode);if(9===a.keyCode&&!1===this.options.tabDisabled)return;break;case 38:this.moveUp();break;case 40:this.moveDown();break;default:return}a.stopImmediatePropagation();a.preventDefault()}},onKeyUp:function(a){var b=this;
  if(!b.disabled){switch(a.keyCode){case 38:case 40:return}clearInterval(b.onChangeInterval);if(b.currentValue!==b.el.val())if(0<b.options.deferRequestBy)b.onChangeInterval=setInterval(function(){b.onValueChange()},b.options.deferRequestBy);else b.onValueChange()}},onValueChange:function(){var a;clearInterval(this.onChangeInterval);this.currentValue=this.element.value;a=this.getQuery(this.currentValue);this.selectedIndex=-1;this.ignoreValueChange?this.ignoreValueChange=!1:a.length<this.options.minChars?
  this.hide():this.getSuggestions(a)},getQuery:function(a){var b=this.options.delimiter;if(!b)return e.trim(a);a=a.split(b);return e.trim(a[a.length-1])},getSuggestionsLocal:function(a){var b=a.toLowerCase(),c=this.options.lookupFilter;return{suggestions:e.grep(this.options.lookup,function(d){return c(d,a,b)})}},getSuggestions:function(a){var b,c=this,d=c.options,f=d.serviceUrl;(b=c.isLocal?c.getSuggestionsLocal(a):c.cachedResponse[a])&&e.isArray(b.suggestions)?(c.suggestions=b.suggestions,c.suggest()):
  c.isBadQuery(a)||(d.params[d.paramName]=a,!1!==d.onSearchStart.call(c.element,d.params)&&(e.isFunction(d.serviceUrl)&&(f=d.serviceUrl.call(c.element,a)),e.ajax({url:f,data:d.ignoreParams?null:d.params,type:d.type,dataType:d.dataType}).done(function(b){c.processResponse(b,a);d.onSearchComplete.call(c.element,a)})))},isBadQuery:function(a){for(var b=this.badQueries,c=b.length;c--;)if(0===a.indexOf(b[c]))return!0;return!1},hide:function(){this.visible=!1;this.selectedIndex=-1;e(this.suggestionsContainer).hide()},
  suggest:function(){if(0===this.suggestions.length)this.hide();else{var a=this.options.formatResult,b=this.getQuery(this.currentValue),c=this.classes.suggestion,d=this.classes.selected,f=e(this.suggestionsContainer),g="";e.each(this.suggestions,function(d,e){g+='<div class="'+c+'" data-index="'+d+'">'+a(e,b)+"</div>"});f.html(g).show();this.visible=!0;this.options.autoSelectFirst&&(this.selectedIndex=0,f.children().first().addClass(d))}},verifySuggestionsFormat:function(a){return a.length&&"string"===
  typeof a[0]?e.map(a,function(a){return{value:a,data:null}}):a},processResponse:function(a,b){var c=this.options,d=c.transformResult(a,b);d.suggestions=this.verifySuggestionsFormat(d.suggestions);c.noCache||(this.cachedResponse[d[c.paramName]]=d,0===d.suggestions.length&&this.badQueries.push(d[c.paramName]));b===this.getQuery(this.currentValue)&&(this.suggestions=d.suggestions,this.suggest())},activate:function(a){var b=this.classes.selected,c=e(this.suggestionsContainer),d=c.children();c.children("."+
  b).removeClass(b);this.selectedIndex=a;return-1!==this.selectedIndex&&d.length>this.selectedIndex?(a=d.get(this.selectedIndex),e(a).addClass(b),a):null},select:function(a,b){var c=this.suggestions[a];c&&(this.el.val(c),this.ignoreValueChange=b,this.hide(),this.onSelect(a))},moveUp:function(){-1!==this.selectedIndex&&(0===this.selectedIndex?(e(this.suggestionsContainer).children().first().removeClass(this.classes.selected),this.selectedIndex=-1,this.el.val(this.currentValue)):this.adjustScroll(this.selectedIndex-
  1))},moveDown:function(){this.selectedIndex!==this.suggestions.length-1&&this.adjustScroll(this.selectedIndex+1)},adjustScroll:function(a){var b=this.activate(a),c,d;b&&(b=b.offsetTop,c=e(this.suggestionsContainer).scrollTop(),d=c+this.options.maxHeight-25,b<c?e(this.suggestionsContainer).scrollTop(b):b>d&&e(this.suggestionsContainer).scrollTop(b-this.options.maxHeight+25),this.el.val(this.getValue(this.suggestions[a].value)))},onSelect:function(a){var b=this.options.onSelect;a=this.suggestions[a];
  this.el.val(this.getValue(a.value));e.isFunction(b)&&b.call(this.element,a)},getValue:function(a){var b=this.options.delimiter,c;if(!b)return a;c=this.currentValue;b=c.split(b);return 1===b.length?a:c.substr(0,c.length-b[b.length-1].length)+a},dispose:function(){this.el.off(".autocomplete").removeData("autocomplete");this.disableKillerFn();e(this.suggestionsContainer).remove()}};e.fn.autocomplete=function(a,b){return 0===arguments.length?this.first().data("autocomplete"):this.each(function(){var c=
  e(this),d=c.data("autocomplete");if("string"===typeof a){if(d&&"function"===typeof d[a])d[a](b)}else d&&d.dispose&&d.dispose(),d=new g(this,a),c.data("autocomplete",d)})}});
  
  $(function(){
    var jobCompany = [
      { value: 'Afghan afghani', data: 'AFN' },
      { value: 'Albanian lek', data: 'ALL' },
      { value: 'Algerian dinar', data: 'DZD' },
      { value: 'European euro', data: 'EUR' },
  
      { value: 'Azerbaijani manat', data: 'AZN' },
      { value: 'Bahamian dollar', data: 'BSD' },
   
    
      { value: 'Moldovan leu', data: 'MDL' },
      { value: 'Mongolian tugrik', data: 'MNT' },
      { value: 'Moroccan dirham', data: 'MAD' },
      { value: 'Mozambican metical', data: 'MZM' },
      { value: 'Myanma kyat', data: 'MMK' },

      { value: 'Omani rial', data: 'OMR' },
      { value: 'Pakistani rupee', data: 'PKR' },
      { value: 'Panamanian balboa', data: 'PAB' },
      { value: 'Papua New Guinean kina', data: 'PGK' },
      { value: 'Paraguayan guarani', data: 'PYG' },
      { value: 'Peruvian nuevo sol', data: 'PEN' },
      { value: 'Philippine peso', data: 'PHP' },
      { value: 'Polish zloty', data: 'PLN' },
     

      { value: 'United Arab Emirates dirham', data: 'AED' },
    
      { value: 'Zimbabwean dollar', data: 'ZWD' },
    ];
    
    // setup autocomplete function pulling from currencies[] array
    $('#resume-job-company').autocomplete({
      lookup: jobCompany,
      onSelect: function (suggestion) {
        var thehtml = '<strong>Currency Name:</strong> ' + suggestion.value + ' <br> <strong>Symbol:</strong> ' + suggestion.data;
        $('#outputcontent').html(thehtml);
      }
    });
    
  
  });
// JOB COMPANY END





// CITY JOB AUTOCOMPLETE START

(function(e){"function"===typeof define&&define.amd?define(["jquery"],e):e(jQuery)})(function(e){function g(a,b){var c=function(){},c={autoSelectFirst:!1,appendTo:"body",serviceUrl:null,lookup:null,onSelect:null,width:"auto",minChars:1,maxHeight:300,deferRequestBy:0,params:{},formatResult:g.formatResult,delimiter:null,zIndex:9999,type:"GET",noCache:!1,onSearchStart:c,onSearchComplete:c,containerClass:"autocomplete-suggestions",tabDisabled:!1,dataType:"text",lookupFilter:function(a,b,c){return-1!==
  a.value.toLowerCase().indexOf(c)},paramName:"query",transformResult:function(a){return"string"===typeof a?e.parseJSON(a):a}};this.element=a;this.el=e(a);this.suggestions=[];this.badQueries=[];this.selectedIndex=-1;this.currentValue=this.element.value;this.intervalId=0;this.cachedResponse=[];this.onChange=this.onChangeInterval=null;this.isLocal=this.ignoreValueChange=!1;this.suggestionsContainer=null;this.options=e.extend({},c,b);this.classes={selected:"autocomplete-selected",suggestion:"autocomplete-suggestion"};
  this.initialize();this.setOptions(b)}var h={extend:function(a,b){return e.extend(a,b)},createNode:function(a){var b=document.createElement("div");b.innerHTML=a;return b.firstChild}};g.utils=h;e.Autocomplete=g;g.formatResult=function(a,b){var c="("+b.replace(RegExp("(\\/|\\.|\\*|\\+|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\\\)","g"),"\\$1")+")";return a.value.replace(RegExp(c,"gi"),"<strong>$1</strong>")};g.prototype={killerFn:null,initialize:function(){var a=this,b="."+a.classes.suggestion,c=a.classes.selected,
  d=a.options,f;a.element.setAttribute("autocomplete","off");a.killerFn=function(b){0===e(b.target).closest("."+a.options.containerClass).length&&(a.killSuggestions(),a.disableKillerFn())};if(!d.width||"auto"===d.width)d.width=a.el.outerWidth();a.suggestionsContainer=g.utils.createNode('<div class="'+d.containerClass+'" style="position: absolute; display: none;"></div>');f=e(a.suggestionsContainer);f.appendTo(d.appendTo).width(d.width);f.on("mouseover.autocomplete",b,function(){a.activate(e(this).data("index"))});
  f.on("mouseout.autocomplete",function(){a.selectedIndex=-1;f.children("."+c).removeClass(c)});f.on("click.autocomplete",b,function(){a.select(e(this).data("index"),!1)});a.fixPosition();if(window.opera)a.el.on("keypress.autocomplete",function(b){a.onKeyPress(b)});else a.el.on("keydown.autocomplete",function(b){a.onKeyPress(b)});a.el.on("keyup.autocomplete",function(b){a.onKeyUp(b)});a.el.on("blur.autocomplete",function(){a.onBlur()});a.el.on("focus.autocomplete",function(){a.fixPosition()})},onBlur:function(){this.enableKillerFn()},
  setOptions:function(a){var b=this.options;h.extend(b,a);if(this.isLocal=e.isArray(b.lookup))b.lookup=this.verifySuggestionsFormat(b.lookup);e(this.suggestionsContainer).css({"max-height":b.maxHeight+"px",width:b.width+"px","z-index":b.zIndex})},clearCache:function(){this.cachedResponse=[];this.badQueries=[]},clear:function(){this.clearCache();this.currentValue=null;this.suggestions=[]},disable:function(){this.disabled=!0},enable:function(){this.disabled=!1},fixPosition:function(){var a;"body"===this.options.appendTo&&
  (a=this.el.offset(),e(this.suggestionsContainer).css({top:a.top+this.el.outerHeight()+"px",left:a.left+"px"}))},enableKillerFn:function(){e(document).on("click.autocomplete",this.killerFn)},disableKillerFn:function(){e(document).off("click.autocomplete",this.killerFn)},killSuggestions:function(){var a=this;a.stopKillSuggestions();a.intervalId=window.setInterval(function(){a.hide();a.stopKillSuggestions()},300)},stopKillSuggestions:function(){window.clearInterval(this.intervalId)},onKeyPress:function(a){if(!this.disabled&&
  !this.visible&&40===a.keyCode&&this.currentValue)this.suggest();else if(!this.disabled&&this.visible){switch(a.keyCode){case 27:this.el.val(this.currentValue);this.hide();break;case 9:case 13:if(-1===this.selectedIndex){this.hide();return}this.select(this.selectedIndex,13===a.keyCode);if(9===a.keyCode&&!1===this.options.tabDisabled)return;break;case 38:this.moveUp();break;case 40:this.moveDown();break;default:return}a.stopImmediatePropagation();a.preventDefault()}},onKeyUp:function(a){var b=this;
  if(!b.disabled){switch(a.keyCode){case 38:case 40:return}clearInterval(b.onChangeInterval);if(b.currentValue!==b.el.val())if(0<b.options.deferRequestBy)b.onChangeInterval=setInterval(function(){b.onValueChange()},b.options.deferRequestBy);else b.onValueChange()}},onValueChange:function(){var a;clearInterval(this.onChangeInterval);this.currentValue=this.element.value;a=this.getQuery(this.currentValue);this.selectedIndex=-1;this.ignoreValueChange?this.ignoreValueChange=!1:a.length<this.options.minChars?
  this.hide():this.getSuggestions(a)},getQuery:function(a){var b=this.options.delimiter;if(!b)return e.trim(a);a=a.split(b);return e.trim(a[a.length-1])},getSuggestionsLocal:function(a){var b=a.toLowerCase(),c=this.options.lookupFilter;return{suggestions:e.grep(this.options.lookup,function(d){return c(d,a,b)})}},getSuggestions:function(a){var b,c=this,d=c.options,f=d.serviceUrl;(b=c.isLocal?c.getSuggestionsLocal(a):c.cachedResponse[a])&&e.isArray(b.suggestions)?(c.suggestions=b.suggestions,c.suggest()):
  c.isBadQuery(a)||(d.params[d.paramName]=a,!1!==d.onSearchStart.call(c.element,d.params)&&(e.isFunction(d.serviceUrl)&&(f=d.serviceUrl.call(c.element,a)),e.ajax({url:f,data:d.ignoreParams?null:d.params,type:d.type,dataType:d.dataType}).done(function(b){c.processResponse(b,a);d.onSearchComplete.call(c.element,a)})))},isBadQuery:function(a){for(var b=this.badQueries,c=b.length;c--;)if(0===a.indexOf(b[c]))return!0;return!1},hide:function(){this.visible=!1;this.selectedIndex=-1;e(this.suggestionsContainer).hide()},
  suggest:function(){if(0===this.suggestions.length)this.hide();else{var a=this.options.formatResult,b=this.getQuery(this.currentValue),c=this.classes.suggestion,d=this.classes.selected,f=e(this.suggestionsContainer),g="";e.each(this.suggestions,function(d,e){g+='<div class="'+c+'" data-index="'+d+'">'+a(e,b)+"</div>"});f.html(g).show();this.visible=!0;this.options.autoSelectFirst&&(this.selectedIndex=0,f.children().first().addClass(d))}},verifySuggestionsFormat:function(a){return a.length&&"string"===
  typeof a[0]?e.map(a,function(a){return{value:a,data:null}}):a},processResponse:function(a,b){var c=this.options,d=c.transformResult(a,b);d.suggestions=this.verifySuggestionsFormat(d.suggestions);c.noCache||(this.cachedResponse[d[c.paramName]]=d,0===d.suggestions.length&&this.badQueries.push(d[c.paramName]));b===this.getQuery(this.currentValue)&&(this.suggestions=d.suggestions,this.suggest())},activate:function(a){var b=this.classes.selected,c=e(this.suggestionsContainer),d=c.children();c.children("."+
  b).removeClass(b);this.selectedIndex=a;return-1!==this.selectedIndex&&d.length>this.selectedIndex?(a=d.get(this.selectedIndex),e(a).addClass(b),a):null},select:function(a,b){var c=this.suggestions[a];c&&(this.el.val(c),this.ignoreValueChange=b,this.hide(),this.onSelect(a))},moveUp:function(){-1!==this.selectedIndex&&(0===this.selectedIndex?(e(this.suggestionsContainer).children().first().removeClass(this.classes.selected),this.selectedIndex=-1,this.el.val(this.currentValue)):this.adjustScroll(this.selectedIndex-
  1))},moveDown:function(){this.selectedIndex!==this.suggestions.length-1&&this.adjustScroll(this.selectedIndex+1)},adjustScroll:function(a){var b=this.activate(a),c,d;b&&(b=b.offsetTop,c=e(this.suggestionsContainer).scrollTop(),d=c+this.options.maxHeight-25,b<c?e(this.suggestionsContainer).scrollTop(b):b>d&&e(this.suggestionsContainer).scrollTop(b-this.options.maxHeight+25),this.el.val(this.getValue(this.suggestions[a].value)))},onSelect:function(a){var b=this.options.onSelect;a=this.suggestions[a];
  this.el.val(this.getValue(a.value));e.isFunction(b)&&b.call(this.element,a)},getValue:function(a){var b=this.options.delimiter,c;if(!b)return a;c=this.currentValue;b=c.split(b);return 1===b.length?a:c.substr(0,c.length-b[b.length-1].length)+a},dispose:function(){this.el.off(".autocomplete").removeData("autocomplete");this.disableKillerFn();e(this.suggestionsContainer).remove()}};e.fn.autocomplete=function(a,b){return 0===arguments.length?this.first().data("autocomplete"):this.each(function(){var c=
  e(this),d=c.data("autocomplete");if("string"===typeof a){if(d&&"function"===typeof d[a])d[a](b)}else d&&d.dispose&&d.dispose(),d=new g(this,a),c.data("autocomplete",d)})}});
  
  $(function(){
    var cityJob = [
      { value: 'Afghan afghani', data: 'AFN' },
      { value: 'Albanian lek', data: 'ALL' },
      { value: 'Algerian dinar', data: 'DZD' },
      { value: 'European euro', data: 'EUR' },
  
      { value: 'Azerbaijani manat', data: 'AZN' },
      { value: 'Bahamian dollar', data: 'BSD' },
   
    
      { value: 'Moldovan leu', data: 'MDL' },
      { value: 'Mongolian tugrik', data: 'MNT' },
      { value: 'Moroccan dirham', data: 'MAD' },
      { value: 'Mozambican metical', data: 'MZM' },
      { value: 'Myanma kyat', data: 'MMK' },

      { value: 'Omani rial', data: 'OMR' },
      { value: 'Pakistani rupee', data: 'PKR' },
      { value: 'Panamanian balboa', data: 'PAB' },
      { value: 'Papua New Guinean kina', data: 'PGK' },
      { value: 'Paraguayan guarani', data: 'PYG' },
      { value: 'Peruvian nuevo sol', data: 'PEN' },
      { value: 'Philippine peso', data: 'PHP' },
      { value: 'Polish zloty', data: 'PLN' },
     

      { value: 'United Arab Emirates dirham', data: 'AED' },
    
      { value: 'Zimbabwean dollar', data: 'ZWD' },
    ];
    
    // setup autocomplete function pulling from currencies[] array
    $('#resume-cityJob').autocomplete({
      lookup: cityJob,
      onSelect: function (suggestion) {
        var thehtml = '<strong>Currency Name:</strong> ' + suggestion.value + ' <br> <strong>Symbol:</strong> ' + suggestion.data;
        $('#outputcontent').html(thehtml);
      }
    });
    
  
  });
// CITY JOB AUTOCOMPLETE END


// MONTH FROM JOB
$(function() {
  
  $('.resume-job-from-month > .caption').on('click', function() {
    $(this).parent().toggleClass('open');
  });
  
  $('.resume-job-from-month > .list > .item').on('click', function() {
    $('.resume-job-from-month > .list > .item').removeClass('selected');
    $(this).addClass('selected').parent().parent().removeClass('open').children('.caption').html( $(this).text() +'<i class="zmdi zmdi-chevron-down"></i>' );
  });
  
  $(document).on('keyup', function(evt) {
    if ( (evt.keyCode || evt.which) === 27 ) {
      $('.resume-job-from-month').removeClass('open');
    }
  });
  
  $(document).on('click', function(evt) {
    if ( $(evt.target).closest(".resume-job-from-month > .caption").length === 0 ) {
      $('.resume-job-from-month').removeClass('open');
    }
  });
  
});
//  YEAR FROM JOB
$(function() {
  
  $('.resume-job-from-year > .caption').on('click', function() {
    $(this).parent().toggleClass('open');
  });
  
  $('.resume-job-from-year > .list > .item').on('click', function() {
    $('.resume-job-from-year > .list > .item').removeClass('selected');
    $(this).addClass('selected').parent().parent().removeClass('open').children('.caption').html( $(this).text() +'<i class="zmdi zmdi-chevron-down"></i>' );
  });
  
  $(document).on('keyup', function(evt) {
    if ( (evt.keyCode || evt.which) === 27 ) {
      $('.resume-job-from-year').removeClass('open');
    }
  });
  
  $(document).on('click', function(evt) {
    if ( $(evt.target).closest(".resume-job-from-year > .caption").length === 0 ) {
      $('.resume-job-from-year').removeClass('open');
    }
  });
  
});

// MONTH TO JOB
$(function() {
  
  $('.resume-job-to-month > .caption').on('click', function() {
    $(this).parent().toggleClass('open');
  });
  
  $('.resume-job-to-month > .list > .item').on('click', function() {
    $('.resume-job-to-month > .list > .item').removeClass('selected');
    $(this).addClass('selected').parent().parent().removeClass('open').children('.caption').html( $(this).text() +'<i class="zmdi zmdi-chevron-down"></i>' );
  });
  
  $(document).on('keyup', function(evt) {
    if ( (evt.keyCode || evt.which) === 27 ) {
      $('.resume-job-to-month').removeClass('open');
    }
  });
  
  $(document).on('click', function(evt) {
    if ( $(evt.target).closest(".resume-job-to-month > .caption").length === 0 ) {
      $('.resume-job-to-month').removeClass('open');
    }
  });
  
});
//  YEAR TO JOB
$(function() {
  
  $('.resume-job-to-year > .caption').on('click', function() {
    $(this).parent().toggleClass('open');
  });
  
  $('.resume-job-to-year > .list > .item').on('click', function() {
    $('.resume-job-to-year > .list > .item').removeClass('selected');
    $(this).addClass('selected').parent().parent().removeClass('open').children('.caption').html( $(this).text() +'<i class="zmdi zmdi-chevron-down"></i>' );
  });
  
  $(document).on('keyup', function(evt) {
    if ( (evt.keyCode || evt.which) === 27 ) {
      $('.resume-job-to-year').removeClass('open');
    }
  });
  
  $(document).on('click', function(evt) {
    if ( $(evt.target).closest(".resume-job-to-year > .caption").length === 0 ) {
      $('.resume-job-to-year').removeClass('open');
    }
  });
  
});


//  CK EDITOR
CKEDITOR.replace('resume-job-editor', {
  skin: 'moono',
  enterMode: CKEDITOR.ENTER_BR,
  shiftEnterMode:CKEDITOR.ENTER_P,
  toolbar: [
   
           
             { name: 'paragraph', groups: [ 'list', 'indent' ], items: [ 'NumberedList', 'BulletedList'] },
            
             ],
});


// SKILL MULTIPLE 
$(document).ready(function() {

  var select = $('.resume-skill');
  var options = select.find('option');

  var div = $('<div />').addClass('skillSelectMultiple');
  var active = $('<div />');
  var list = $('<ul />');
  var placeholder = select.data('placeholder');

  var span = $('<span />').text(placeholder).appendTo(active);

  options.each(function() {
      var text = $(this).text();
      if($(this).is(':selected')) {
          active.append($('<a />').html('<em>' + text + '</em><i></i>'));
          span.addClass('hide');
      } else {
          list.append($('<li />').html(text));
      }
  });

  active.append($('<div />').addClass('arrow'));
  div.append(active).append(list);

  select.wrap(div);

  $(document).on('click', '.skillSelectMultiple ul li', function(e) {
      var select = $(this).parent().parent();
      var li = $(this);
      if(!select.hasClass('clicked')) {
          select.addClass('clicked');
          li.prev().addClass('beforeRemove');
          li.next().addClass('afterRemove');
          li.addClass('remove');
          var a = $('<a />').addClass('notShown').html('<em>' + li.text() + '</em><i></i>').hide().appendTo(select.children('div'));
          a.slideDown(400, function() {
              setTimeout(function() {
                  a.addClass('shown');
                  select.children('div').children('span').addClass('hide');
                  select.find('option:contains(' + li.text() + ')').prop('selected', true);
              }, 500);
          });
          setTimeout(function() {
              if(li.prev().is(':last-child')) {
                  li.prev().removeClass('beforeRemove');
              }
              if(li.next().is(':first-child')) {
                  li.next().removeClass('afterRemove');
              }
              setTimeout(function() {
                  li.prev().removeClass('beforeRemove');
                  li.next().removeClass('afterRemove');
              }, 200);

              li.slideUp(400, function() {
                  li.remove();
                  select.removeClass('clicked');
              });
          }, 600);
      }
  });

  $(document).on('click', '.skillSelectMultiple > div a', function(e) {
      var select = $(this).parent().parent();
      var self = $(this);
      self.removeClass().addClass('remove');
      select.addClass('open');
      setTimeout(function() {
          self.addClass('disappear');
          setTimeout(function() {
              self.animate({
                  width: 0,
                  height: 0,
                  padding: 0,
                  margin: 0
              }, 300, function() {
                  var li = $('<li />').text(self.children('em').text()).addClass('notShown').appendTo(select.find('ul'));
                  li.slideDown(400, function() {
                      li.addClass('show');
                      setTimeout(function() {
                          select.find('option:contains(' + self.children('em').text() + ')').prop('selected', false);
                          if(!select.find('option:selected').length) {
                              select.children('div').children('span').removeClass('hide');
                          }
                          li.removeClass();
                      }, 400);
                  });
                  self.remove();
              })
          }, 300);
      }, 400);
  });

  $(document).on('click', '.skillSelectMultiple > div .arrow, .skillSelectMultiple > div span', function(e) {
      $(this).parent().parent().toggleClass('open');
  });

});
////////////////////////////////////////
//////// JOB PREFERENCES    ///////////
///////////////////////////////////////

// DESIRED  JOB TITLE AUTOCOMPLETE START

(function(e){"function"===typeof define&&define.amd?define(["jquery"],e):e(jQuery)})(function(e){function g(a,b){var c=function(){},c={autoSelectFirst:!1,appendTo:"body",serviceUrl:null,lookup:null,onSelect:null,width:"auto",minChars:1,maxHeight:300,deferRequestBy:0,params:{},formatResult:g.formatResult,delimiter:null,zIndex:9999,type:"GET",noCache:!1,onSearchStart:c,onSearchComplete:c,containerClass:"autocomplete-suggestions",tabDisabled:!1,dataType:"text",lookupFilter:function(a,b,c){return-1!==
  a.value.toLowerCase().indexOf(c)},paramName:"query",transformResult:function(a){return"string"===typeof a?e.parseJSON(a):a}};this.element=a;this.el=e(a);this.suggestions=[];this.badQueries=[];this.selectedIndex=-1;this.currentValue=this.element.value;this.intervalId=0;this.cachedResponse=[];this.onChange=this.onChangeInterval=null;this.isLocal=this.ignoreValueChange=!1;this.suggestionsContainer=null;this.options=e.extend({},c,b);this.classes={selected:"autocomplete-selected",suggestion:"autocomplete-suggestion"};
  this.initialize();this.setOptions(b)}var h={extend:function(a,b){return e.extend(a,b)},createNode:function(a){var b=document.createElement("div");b.innerHTML=a;return b.firstChild}};g.utils=h;e.Autocomplete=g;g.formatResult=function(a,b){var c="("+b.replace(RegExp("(\\/|\\.|\\*|\\+|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\\\)","g"),"\\$1")+")";return a.value.replace(RegExp(c,"gi"),"<strong>$1</strong>")};g.prototype={killerFn:null,initialize:function(){var a=this,b="."+a.classes.suggestion,c=a.classes.selected,
  d=a.options,f;a.element.setAttribute("autocomplete","off");a.killerFn=function(b){0===e(b.target).closest("."+a.options.containerClass).length&&(a.killSuggestions(),a.disableKillerFn())};if(!d.width||"auto"===d.width)d.width=a.el.outerWidth();a.suggestionsContainer=g.utils.createNode('<div class="'+d.containerClass+'" style="position: absolute; display: none;"></div>');f=e(a.suggestionsContainer);f.appendTo(d.appendTo).width(d.width);f.on("mouseover.autocomplete",b,function(){a.activate(e(this).data("index"))});
  f.on("mouseout.autocomplete",function(){a.selectedIndex=-1;f.children("."+c).removeClass(c)});f.on("click.autocomplete",b,function(){a.select(e(this).data("index"),!1)});a.fixPosition();if(window.opera)a.el.on("keypress.autocomplete",function(b){a.onKeyPress(b)});else a.el.on("keydown.autocomplete",function(b){a.onKeyPress(b)});a.el.on("keyup.autocomplete",function(b){a.onKeyUp(b)});a.el.on("blur.autocomplete",function(){a.onBlur()});a.el.on("focus.autocomplete",function(){a.fixPosition()})},onBlur:function(){this.enableKillerFn()},
  setOptions:function(a){var b=this.options;h.extend(b,a);if(this.isLocal=e.isArray(b.lookup))b.lookup=this.verifySuggestionsFormat(b.lookup);e(this.suggestionsContainer).css({"max-height":b.maxHeight+"px",width:b.width+"px","z-index":b.zIndex})},clearCache:function(){this.cachedResponse=[];this.badQueries=[]},clear:function(){this.clearCache();this.currentValue=null;this.suggestions=[]},disable:function(){this.disabled=!0},enable:function(){this.disabled=!1},fixPosition:function(){var a;"body"===this.options.appendTo&&
  (a=this.el.offset(),e(this.suggestionsContainer).css({top:a.top+this.el.outerHeight()+"px",left:a.left+"px"}))},enableKillerFn:function(){e(document).on("click.autocomplete",this.killerFn)},disableKillerFn:function(){e(document).off("click.autocomplete",this.killerFn)},killSuggestions:function(){var a=this;a.stopKillSuggestions();a.intervalId=window.setInterval(function(){a.hide();a.stopKillSuggestions()},300)},stopKillSuggestions:function(){window.clearInterval(this.intervalId)},onKeyPress:function(a){if(!this.disabled&&
  !this.visible&&40===a.keyCode&&this.currentValue)this.suggest();else if(!this.disabled&&this.visible){switch(a.keyCode){case 27:this.el.val(this.currentValue);this.hide();break;case 9:case 13:if(-1===this.selectedIndex){this.hide();return}this.select(this.selectedIndex,13===a.keyCode);if(9===a.keyCode&&!1===this.options.tabDisabled)return;break;case 38:this.moveUp();break;case 40:this.moveDown();break;default:return}a.stopImmediatePropagation();a.preventDefault()}},onKeyUp:function(a){var b=this;
  if(!b.disabled){switch(a.keyCode){case 38:case 40:return}clearInterval(b.onChangeInterval);if(b.currentValue!==b.el.val())if(0<b.options.deferRequestBy)b.onChangeInterval=setInterval(function(){b.onValueChange()},b.options.deferRequestBy);else b.onValueChange()}},onValueChange:function(){var a;clearInterval(this.onChangeInterval);this.currentValue=this.element.value;a=this.getQuery(this.currentValue);this.selectedIndex=-1;this.ignoreValueChange?this.ignoreValueChange=!1:a.length<this.options.minChars?
  this.hide():this.getSuggestions(a)},getQuery:function(a){var b=this.options.delimiter;if(!b)return e.trim(a);a=a.split(b);return e.trim(a[a.length-1])},getSuggestionsLocal:function(a){var b=a.toLowerCase(),c=this.options.lookupFilter;return{suggestions:e.grep(this.options.lookup,function(d){return c(d,a,b)})}},getSuggestions:function(a){var b,c=this,d=c.options,f=d.serviceUrl;(b=c.isLocal?c.getSuggestionsLocal(a):c.cachedResponse[a])&&e.isArray(b.suggestions)?(c.suggestions=b.suggestions,c.suggest()):
  c.isBadQuery(a)||(d.params[d.paramName]=a,!1!==d.onSearchStart.call(c.element,d.params)&&(e.isFunction(d.serviceUrl)&&(f=d.serviceUrl.call(c.element,a)),e.ajax({url:f,data:d.ignoreParams?null:d.params,type:d.type,dataType:d.dataType}).done(function(b){c.processResponse(b,a);d.onSearchComplete.call(c.element,a)})))},isBadQuery:function(a){for(var b=this.badQueries,c=b.length;c--;)if(0===a.indexOf(b[c]))return!0;return!1},hide:function(){this.visible=!1;this.selectedIndex=-1;e(this.suggestionsContainer).hide()},
  suggest:function(){if(0===this.suggestions.length)this.hide();else{var a=this.options.formatResult,b=this.getQuery(this.currentValue),c=this.classes.suggestion,d=this.classes.selected,f=e(this.suggestionsContainer),g="";e.each(this.suggestions,function(d,e){g+='<div class="'+c+'" data-index="'+d+'">'+a(e,b)+"</div>"});f.html(g).show();this.visible=!0;this.options.autoSelectFirst&&(this.selectedIndex=0,f.children().first().addClass(d))}},verifySuggestionsFormat:function(a){return a.length&&"string"===
  typeof a[0]?e.map(a,function(a){return{value:a,data:null}}):a},processResponse:function(a,b){var c=this.options,d=c.transformResult(a,b);d.suggestions=this.verifySuggestionsFormat(d.suggestions);c.noCache||(this.cachedResponse[d[c.paramName]]=d,0===d.suggestions.length&&this.badQueries.push(d[c.paramName]));b===this.getQuery(this.currentValue)&&(this.suggestions=d.suggestions,this.suggest())},activate:function(a){var b=this.classes.selected,c=e(this.suggestionsContainer),d=c.children();c.children("."+
  b).removeClass(b);this.selectedIndex=a;return-1!==this.selectedIndex&&d.length>this.selectedIndex?(a=d.get(this.selectedIndex),e(a).addClass(b),a):null},select:function(a,b){var c=this.suggestions[a];c&&(this.el.val(c),this.ignoreValueChange=b,this.hide(),this.onSelect(a))},moveUp:function(){-1!==this.selectedIndex&&(0===this.selectedIndex?(e(this.suggestionsContainer).children().first().removeClass(this.classes.selected),this.selectedIndex=-1,this.el.val(this.currentValue)):this.adjustScroll(this.selectedIndex-
  1))},moveDown:function(){this.selectedIndex!==this.suggestions.length-1&&this.adjustScroll(this.selectedIndex+1)},adjustScroll:function(a){var b=this.activate(a),c,d;b&&(b=b.offsetTop,c=e(this.suggestionsContainer).scrollTop(),d=c+this.options.maxHeight-25,b<c?e(this.suggestionsContainer).scrollTop(b):b>d&&e(this.suggestionsContainer).scrollTop(b-this.options.maxHeight+25),this.el.val(this.getValue(this.suggestions[a].value)))},onSelect:function(a){var b=this.options.onSelect;a=this.suggestions[a];
  this.el.val(this.getValue(a.value));e.isFunction(b)&&b.call(this.element,a)},getValue:function(a){var b=this.options.delimiter,c;if(!b)return a;c=this.currentValue;b=c.split(b);return 1===b.length?a:c.substr(0,c.length-b[b.length-1].length)+a},dispose:function(){this.el.off(".autocomplete").removeData("autocomplete");this.disableKillerFn();e(this.suggestionsContainer).remove()}};e.fn.autocomplete=function(a,b){return 0===arguments.length?this.first().data("autocomplete"):this.each(function(){var c=
  e(this),d=c.data("autocomplete");if("string"===typeof a){if(d&&"function"===typeof d[a])d[a](b)}else d&&d.dispose&&d.dispose(),d=new g(this,a),c.data("autocomplete",d)})}});
  
  $(function(){
    var desiredJobTitle = [
      { value: 'Afghan afghani', data: 'AFN' },
      { value: 'Albanian lek', data: 'ALL' },
      { value: 'Algerian dinar', data: 'DZD' },
      { value: 'European euro', data: 'EUR' },
  
      { value: 'Azerbaijani manat', data: 'AZN' },
      { value: 'Bahamian dollar', data: 'BSD' },
   
    
      { value: 'Moldovan leu', data: 'MDL' },
      { value: 'Mongolian tugrik', data: 'MNT' },
      { value: 'Moroccan dirham', data: 'MAD' },
      { value: 'Mozambican metical', data: 'MZM' },
      { value: 'Myanma kyat', data: 'MMK' },

      { value: 'Omani rial', data: 'OMR' },
      { value: 'Pakistani rupee', data: 'PKR' },
      { value: 'Panamanian balboa', data: 'PAB' },
      { value: 'Papua New Guinean kina', data: 'PGK' },
      { value: 'Paraguayan guarani', data: 'PYG' },
      { value: 'Peruvian nuevo sol', data: 'PEN' },
      { value: 'Philippine peso', data: 'PHP' },
      { value: 'Polish zloty', data: 'PLN' },
     

      { value: 'United Arab Emirates dirham', data: 'AED' },
    
      { value: 'Zimbabwean dollar', data: 'ZWD' },
    ];
    
    // setup autocomplete function pulling from currencies[] array
    $('#resume-desired-job-title').autocomplete({
      lookup: desiredJobTitle,
      onSelect: function (suggestion) {
        var thehtml = '<strong>Currency Name:</strong> ' + suggestion.value + ' <br> <strong>Symbol:</strong> ' + suggestion.data;
        $('#outputcontent').html(thehtml);
      }
    });
    
  
  });


// DESIRED JOB TITLE END// 

// DESIRED SALARY START
        // DROPDOWN MONEY
        $('.dropdown-desired-money').click(function(e) {
          e.preventDefault();
          e.stopPropagation();
          $(this).toggleClass('expanded');
          $('#'+$(e.target).attr('for')).prop('checked',true);
        });
        $(document).click(function() {
          $('.dropdown-desired-money').removeClass('expanded');
        });
         // DROPDOWN MONEY TYPE
         $('.dropdown-desired-money-type').click(function(e) {
          e.preventDefault();
          e.stopPropagation();
          $(this).toggleClass('expanded');
          $('#'+$(e.target).attr('for')).prop('checked',true);
        });
        $(document).click(function() {
          $('.dropdown-desired-money-type').removeClass('expanded');
        });


// DESIRED SALARY END




// $(document).ready(function () {
//   $('.header').on('click', '.search-toggle', function (e) {
//     var selector = $(this).data('selector');

//     $(selector).toggleClass('show').find('.search-input').focus();
//     $(this).toggleClass('active');

//     e.preventDefault();
//   });
// });
$(document).ready(function() {

    $('.select-cv__carousel').owlCarousel({
        loop:false,
        margin:10,
        nav:true,
        dots:false,
        navText: [
            '<i class="flaticon-back" aria-hidden="true"></i>',
            '<i class="flaticon-right-arrow" aria-hidden="true"></i>'
        ],
        navContainer: '.select-cv__carouselBox .custom-nav',
        responsive:{
            0:{
                items:1
            },
            600:{
                items:3
            },
            1000:{
                items:5
            }
        }
    })


    $('.select-cv__carousel--1').owlCarousel({
        loop:false,
        margin:10,
        nav:true,
        dots:false,
        navText: [
            '<i class="flaticon-back" aria-hidden="true"></i>',
            '<i class="flaticon-right-arrow" aria-hidden="true"></i>'
        ],
        navContainer: '.select-cv__carouselBox--1 .custom-nav',
        responsive:{
            0:{
                items:1
            },
            600:{
                items:3
            },
            1000:{
                items:5
            }
        }
    })

  });




  $(document).ready(function() {

    $('.select-cv__carousel--1').owlCarousel({
        loop:false,
        margin:10,
        nav:true,
        dots:false,
        navText: [
            '<i class="flaticon-back" aria-hidden="true"></i>',
            '<i class="flaticon-right-arrow" aria-hidden="true"></i>'
        ],
        navContainer: '.select-cv__carouselBox--1 .custom-nav--1',
        responsive:{
            0:{
                items:1
            },
            600:{
                items:3
            },
            1000:{
                items:5
            }
        }
    })

  });

$(document).ready(function() {

    $('.myRadio-resume').click(function(){
        $('.myRadio-resume').removeClass("myRadio__active");
        $(this).addClass("myRadio__active");
    });

    $('.myRadio-cover').click(function(){
        $('.myRadio-cover').removeClass("myRadio__active");
        $(this).addClass("myRadio__active");
    });

  });

  $(document).ready(function() {
    //This condition will check if form with id 'select-cv__form' is exist then only form reset code will execute.
    if($('#select-cv__form').length>0){
        $('#select-cv__form')[0].reset(); 
    }
});
// $(document).ready(function() {
   
//     $(".js-example-placeholder-single").select2({
//         placeholder: "Country",
//         allowClear: true,
//         tags: ['a', 'b', 'c'],
        
//         escapeMarkup : function(markup) { return markup; }
//     });
//     $(".js-example-placeholder-single1").select2({
//         placeholder: "Sity",
//         allowClear: true,
//         tags: true
//     });
//     $(".js-example-placeholder-single2").select2({
//         placeholder: "Nationality",
//         allowClear: true,
//         tags: true
//     });
//     $(".js-example-placeholder-single3").select2({
//         placeholder: "Salary",
//         allowClear: true,
//         tags: true
//     });
//     $(".js-example-placeholder-single4").select2({
//         placeholder: "Driver's license",
//         allowClear: true,
//         tags: true
//     });
//     $(".select5").select2({
//         placeholder: "Military service",
//         allowClear: true,
//         tags: true
//     });
//     $(".js-example-placeholder-single6").select2({
//         placeholder: "Category",
//         allowClear: true,
//         tags: true
//     });
//     $(".js-example-placeholder-single7").select2({
//         placeholder: "Percent",
//         allowClear: true,
//         tags: true
//     });
//     $(".js-example-placeholder-single8").select2({
//         placeholder: "Company name",
//         allowClear: true,
//         tags: true
//     });
//     $(".js-example-placeholder-single9").select2({
//         placeholder: "Title",
//         allowClear: true,
//         tags: true
//     });
//     $(".js-example-placeholder-single10").select2({
//         placeholder: "Company sector",
//         allowClear: true,
//         tags: true
//     });
//     $(".js-example-placeholder-single11").select2({
//         placeholder: "Business Field ",
//         allowClear: true,
//         tags: true
//     });
//     $(".js-example-placeholder-single12").select2({
//         placeholder: "Job type ",
//         allowClear: true,
//         tags: true
//     });
//     $(".js-example-placeholder-single13").select2({
//         placeholder: "Sity ",
//         allowClear: true,
//         tags: true
//     });
//     $(".js-example-placeholder-single14").select2({
//         placeholder: "Education level ",
//         allowClear: true,
//         tags: true
//     });
//     $(".js-example-placeholder-single15").select2({
//         placeholder: "Graduation Degree Max* ",
//         allowClear: true,
//         tags: true
//     });
//     $(".js-example-placeholder-single16").select2({
//         placeholder: "Graduation Degree ",
//         allowClear: true,
//         tags: true
//     });
//     $(".js-example-placeholder-single17").select2({
//         placeholder: "University* ",
//         allowClear: true,
//         tags: true
//     });
//     $(".js-example-placeholder-single18").select2({
//         placeholder: "Faculty ",
//         allowClear: true,
//         tags: true
//     });
//     $(".js-example-placeholder-single19").select2({
//         placeholder: "Department ",
//         allowClear: true,
//         tags: true
//     });
//     $(".js-example-placeholder-single20").select2({
//         placeholder: "Education type* ",
//         allowClear: true,
//         tags: true
//     });
//     $(".js-example-placeholder-single21").select2({
//         placeholder: "Education Language ",
//         allowClear: true,
//         tags: true
//     });
//     $(".js-example-placeholder-single22").select2({
//         placeholder: "Scholarship Type*",
//         allowClear: true,
//         tags: true
//     });
//     $(".js-example-placeholder-single23").select2({
//         placeholder: "Scholarship Rate ",
//         allowClear: true,
//         tags: true
//     });
//     $(".js-example-placeholder-single24").select2({
//         placeholder: "Minor Program* ",
//         allowClear: true,
//         tags: true
//     });
//     $(".js-example-placeholder-single25").select2({
//         placeholder: "Graduation Degree* ",
//         allowClear: true,
//         tags: true
//     });
//     $(".js-example-placeholder-single26").select2({
//         placeholder: "Double Major Faculty* ",
//         allowClear: true,
//         tags: true
//     });
//     $(".js-example-placeholder-single27").select2({
//         placeholder: "Minor Program* ",
//         allowClear: true,
//         tags: true
//     });
//     $(".js-example-placeholder-single28").select2({
//         placeholder: "Graduation Degree* ",
//         allowClear: true,
//         tags: true
//     });
//     $(".js-example-basic-multiple").select2({
//         placeholder: "You can edit your skills in your resume. ",
//         allowClear: true,
//         tags: true
//     });
//     $(".js-example-placeholder-single29").select2({
//         placeholder: "Language* ",
//         allowClear: true,
//         tags: true
//     });
//     $(".js-example-placeholder-single30").select2({
//         placeholder: "Level* ",
//         allowClear: true,
//         tags: true
//     });
//     $(".js-example-placeholder-single31").select2({
//         placeholder: "Exam name ",
//         allowClear: true,
//         tags: true
//     });
//     $(".js-example-placeholder-single32").select2({
//         placeholder: "Certificates name ",
//         allowClear: true,
//         tags: true
//     });
//     $(".js-example-placeholder-single33").select2({
//         placeholder: "Reference type ",
//         allowClear: true,
//         tags: true
//     });
//     $(".js-example-placeholder-single34").select2({
//         placeholder: "Language ",
//         allowClear: true,
//         tags: true
//     });
//     $(".js-example-placeholder-single35").select2({
//         placeholder: "Title ",
//         allowClear: true,
//         tags: true
//     });
//     $(".js-example-placeholder-single36").select2({
//         placeholder: "Company Sector ",
//         allowClear: true,
//         tags: true
//     });
//     $(".js-example-placeholder-single37").select2({
//         placeholder: "High school type ",
//         allowClear: true,
//         tags: true
//     });
//     $(".js-example-placeholder-single38").select2({
//         placeholder: "High school departament ",
//         allowClear: true,
//         tags: true
//     });
//     $(".popup__select1").select2({
//         placeholder: "Choose CV ",
//         allowClear: true,
        
//     });
//     $(".popup__select2").select2({
//         placeholder: "Choose cover letter",
//         allowClear: true,
        
//     });
//     $(".salary").select2({
//         placeholder: "Choose salary",
//         allowClear: true,
        
//     });
//     $(".select-resume").select2({
//         placeholder: "Select your CV ",
//         allowClear: true,
//         tags: true
//     });
//     $(".cv").select2({
//         placeholder: "Select",
//         allowClear: true,
//     });
//     $(".applications").select2({
//         placeholder: "Select",
//         allowClear: true,
//     });
    
// });


$(document).ready(function(){
    $(".js-example-placeholder-single22").change(function(){
        if ($(".js-example-placeholder-single22").val() === "noScholarship") {
            $(".scholarshipRate").attr('style', 'display:none');
        } else  {
            $(".scholarshipRate").attr('style', 'display:block');
           
          }
    })

    $(".js-example-placeholder-single14").change(function(){
        if ($(".js-example-placeholder-single14").val() === "highSchool") {
            $(".highSchool").addClass("d-none");
            $(".highSchoolElements").removeClass("d-none");
        } else  {
            $(".highSchool").removeClass("d-none");
            $(".highSchoolElements").addClass("d-none");
          }
    })
    // $(".popup__select2").change(function(){
    //     if ($(".popup__select2").val() === "newCoverLetter") {
    //         $("#popupCoverLetter").show();
    //         $("#popupCoverLetter--close").click(function(){
    //             $("#popupCoverLetter").hide();
    //           });
           
    //     } else  {
    //         $(".highSchool").removeClass("d-none");
    //         $(".highSchoolElements").addClass("d-none");
    //       }
    // })
    
    $(".select5").change(function(){
        if ($(".select5").val() === "Exempt") {
            $(".exempt").removeClass("d-none");
        } else  {
            $(".exempt").addClass("d-none");
          }
    })
    $(".select5").change(function(){
        if ($(".select5").val() === "Postponed") {
            $(".postponed").removeClass("d-none");
        } else  {
            $(".postponed").addClass("d-none");
          }
    })
})




$(document).ready(function(){

    $('select').change(function(){
        var select = $(this)
        var selectId = select.attr('id');
        var label = $("label[for='"+selectId+"']");
        console.log(label);
        if (select.val() == '') {
            
            label.css({"display": "none"});
        }
        else{
            label.css({"display": "block"});
        }
    }); 



    // $("select").change(function(){
    //     var selectId = $(this).attr("id")
    //     var label = selectId.prev();
    //     console.log(label);
    //     console.log(mthis);
    //     if($(this).val() == "")
    //          label.css({"display": "none"});
    //     else
    //          label.css({"display": "block"});
    // })
})


// $("#candidateBirthdayInput").flatpickr({
//     enableTime: false,
//     dateFormat: "Y-m-d"
// });

// $("#candidateDateOfDelayInput").flatpickr({
//     enableTime: false,
//     dateFormat: "Y-m-d"
// });

//TABLE

$(document).ready(function() {
    var table = $('#example').DataTable({
        // "paging":   false,        
        "info":     false,
        "scrollX": true,
        "language": {
            "search": ""
          },
        
        // initComplete : function() {
        //     var input = $('.dataTables_filter input').unbind(),
        //         self = this.api(),
        //         $searchButton = $('<button class="flaticon-magnifying-glass icon"></button>')
        //                 //    .text('search')
        //                    .click(function() {
        //                       self.search(input.val()).draw();
        //                    })
               
        //     $('.dataTables_filter').append($searchButton);
        // }            
    }) 
} );


 
$(document).ready(function () {
    // This WILL work because we are listening on the 'document', 
    // for a click on an element with an ID of #test-element
    $(".form__customInput").on("change", function () {
        let fileName = $(this).val().split("\\").pop();
        let parentInp = $(this).parent();
        parentInp.find( ".form__customInpTitle" ).addClass("form__customInpTitle--label");
        parentInp.find( ".form__customLabel" ).css('color', '#686868');

        $(this).siblings(".form__customLabel").addClass("selected").text(fileName);

    });

    $(document).on("click", ".clearValue", function () {
        let parent = $(this).parent();
        let placeholder = parent.find('.form__customInpTitle').text();
        console.log(placeholder);
        parent.find('.form__customInput').val('');
        parent.find('.form__customInpTitle').removeClass("form__customInpTitle--label");
        parent.find( ".form__customLabel" ).css('color', 'transparent');
        parent.find('.form__customLabel').removeClass("selected").text(placeholder);
    });

});
$(document).ready(function () {
    $(".account__edit-link").click(function () {
        $(this).parent().css("display", "none")
                .next().css("display", "block");
    });

    $(".account__cancel").click(function () {
        $(this).parent().parent().css("display", "none")
            .prev().css("display", "flex");
    });

    $(".account__update").click(function () {
        $(this).parent().parent().css("display", "none")
            .prev().css("display", "flex");
    });

    // $(".account__update--1").click(function(){
    //     if($(".account__edit--surname").val() != ""){
    //         $(".account__info--surname").text($(".account__edit--surname").val())
    //     }
    //     else{
    //         $(".account__info--surname").text();
    //     }
    //     if($(".account__edit--name").val() != ""){
    //         $(".account__info--name").text($(".account__edit--name").val())
    //     }
    //     else{
    //         $(".account__info--name").text();
    //     }
    // });

    // $(".account__update--2").click(function(){
    //     if($(".account__edit--email")){
    //         $(".account__info--email").text($(".account__edit--email").val());
    //     }
    // });
});
$(document).ready(function () {

    
  
});
$(document).ready(function(){

    // Initialize Select2
    $('#sel_users').select2();
  
    // Set option selected onchange
    $('#selectCV').change(function(){
      
        let selectResume = $(this).val();
        if (selectResume != 0){
            $('.viewCV').css("display", "block");
        }
        else{
            $('.viewCV').css("display", "none");
        }
  
    });
  });