// SALARY RADIO BUTTON START
$(document).ready(function () {
    $("input[list=companyName]").focusout(function () {
        let value = $(this).val();
        let dataVal =$('#companyName [value="' + value + '"]').data('value')
        console.log(dataVal);
        $(this).siblings(".hidden-companyName").val(dataVal);
        if($(this).siblings(".hidden-companyName").val() === "") {
            $(this).siblings(".hidden-companyName").val(value)
        }
    });
    $("input[list=locationName]").focusout(function () {
        let value = $(this).val();
        let dataVal =$('#locationName [value="' + value + '"]').data('value')
        console.log(dataVal);
        $(this).siblings(".hidden-locationName").val(dataVal);
        if($(this).siblings(".hidden-locationName").val() === "") {
            $(this).siblings(".hidden-locationName").val(value)
        }
    });


    

    $('input:radio[data-item-id="qualification-salary-type"]').change(function () {

        if ($(this).is(':checked') && $(this).attr('id') == 'qualification-salary-constant') {


            $('.qualification__salary--constant-div').css({
                'display': 'block'
            });
            $('.qualification__salary--changeable-div').css({
                'display': 'none'
            });

            // let hiddenSalaryInput =  $('.hidden-salary-type');
            // hiddenSalaryInput.val = $('.qualification__salary--constant-input').val();
            // });

        } else if ($(this).is(':checked') && $(this).attr('id') == 'qualification-salary-changeable') {

            $('.qualification__salary--constant-div').css({
                'display': 'none'
            });
            $('.qualification__salary--changeable-div').css({
                'display': 'flex'
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
    $('.dropdown-money').click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).toggleClass('expanded');
        $('#' + $(e.target).attr('for')).prop('checked', true);
    });
    $(document).click(function () {
        $('.dropdown-money').removeClass('expanded');
    });


    // DROPDOWN MONEY MİN
    $('.dropdown-money-min').click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).toggleClass('expanded');
        $('#' + $(e.target).attr('for')).prop('checked', true);
    });
    $(document).click(function () {
        $('.dropdown-money-min').removeClass('expanded');
    });
    // DROPDOWN MONEY MAX
    $('.dropdown-money-max').click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).toggleClass('expanded');
        $('#' + $(e.target).attr('for')).prop('checked', true);
    });
    $(document).click(function () {
        $('.dropdown-money-max').removeClass('expanded');
    });


    // CHANGE LANGUAGE START
    $(".qualification__language--change").click(function (e) {
        e.preventDefault();
        $('.qualification__language-div').css({
            'display': 'none'
        })
        // if (maxAppend >= 10) return;

        var changeLanguageInput = $(
            " <div class='form-group qualification__form-group'> <label for='qualification-change-language'> What language will your job posting be displayed in ?</label><input type='text' name='post_changeLanguage' class='qualification__input' id='qualification-change-language'></div>");
        maxAppend++;

        $(".qualification__language").append(changeLanguageInput);
     
    });
    // CHANGE LANGUAGE END

});
// SALARY RADIO BUTTON END








$(document).ready(function () {





    // EXPERIENCE START
    $(document).ready(function () {
        $('#qualificationExperience').click(function () {

            let randomClass = Math.floor(Math.random() * 100000);

            $('div.qualification__div--qualificationExperience .qualification__div--item-Experience').addClass('experience-' + randomClass + '');

            let divExperience = $('.qualification__div--qualificationExperience').html();

            $('div.qualification__div--qualificationExperience .qualification__div--item-Experience').removeClass('experience-' + randomClass + '');


            let limitExperience = document.querySelectorAll('.qualification__div--item-Experience').length;
            var des = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value');


            if (limitExperience < 5) {
                $('.qualification__div').append(divExperience);

                $('.experience-' + randomClass + ' input.hidden-experienceYears').attr('name', 'experience[experienceYears][' + limitExperience + ']');
                $('.experience-' + randomClass + ' input[list="experienceName"]').attr('name', 'experience[experience][' + limitExperience + ']');
                $('.experience-' + randomClass + ' input.checkboxExperience').attr('name', 'experience[type][' + limitExperience + ']');

                $("input[list=experienceYears]").focusout(function () {
                    let value = $(this).val();
                    let dataVal =$('#experienceYears [value="' + value + '"]').data('value')
                    console.log(dataVal);
                    $(this).siblings(".hidden-experienceYears").val(dataVal);
                    if($(this).siblings(".hidden-experienceYears").val() === "") {
                        $(this).siblings(".hidden-experienceYears").val(value)
                    }
                });
                $("input[list=experienceName]").focusout(function () {
                    let value = $(this).val();
                    let dataVal =$('#experienceName [value="' + value + '"]').data('value')
                    console.log(dataVal);
                    $(this).siblings(".hidden-experienceName").val(dataVal);
                    if($(this).siblings(".hidden-experienceName").val() === "") {
                        $(this).siblings(".hidden-experienceName").val(value)
                    }
                });




            }







            //EXPERIENCE  CHECKBOX START
            $('.checkboxExperience').click(function () {
                if ($(this).prop("checked") == true) {
                    $(this).attr("value", "Required");
                    // console.log("Required is checked.");
                } else if ($(this).prop("checked") == false) {
                    $(this).attr("value", "Preffer");
                    // console.log("Preffer is unchecked.");
                }
            });
            //EXPERIENCE  CHECKBOX END



            $(".qualification--remove-btn").click(function () {
                console.log(this);
                $(this).closest('.qualification__div--item').remove();

            });
        });
    });

    // EXPERIENCE END





    // EDUCATION START
    $(document).ready(function () {
        $('#qualificationEducation').click(function () {
            let randomClass = Math.floor(Math.random() * 100000);

            $('div.qualification__div--qualificationEducation .qualification__div--item-Education').addClass('education-' + randomClass + '');

            let divEducation = $('.qualification__div--qualificationEducation').html()

            $('div.qualification__div--qualificationEducation .qualification__div--item-Education').removeClass('education-' + randomClass + '');

            let limitEducation = document.querySelectorAll('.qualification__div--item-Education').length;

            if (limitEducation < 5) {
                $('.qualification__div').append(divEducation);

                $('.education-' + randomClass + ' input.hidden-educationLevel').attr('name', 'education[educationLevel][' + limitEducation + ']');

                $('.education-' + randomClass + ' input.checkboxEducation').attr('name', 'education[type][' + limitEducation + ']');
                $("input[list=educationLevel]").focusout(function () {
                    let value = $(this).val();
                    let dataVal =$('#educationLevel [value="' + value + '"]').data('value')
                    console.log(dataVal);
                    $(this).siblings(".hidden-educationLevel").val(dataVal);
                    if($(this).siblings(".hidden-educationLevel").val() === "") {
                        $(this).siblings(".hidden-educationLevel").val(value)
                    }
                });
            }


           


            //EDUCATION  CHECKBOX START
            $('.checkboxEducation').click(function () {
                if ($(this).prop("checked") == true) {
                    $(this).attr("value", "Required");
                    // console.log("Required is checked.");
                } else if ($(this).prop("checked") == false) {
                    $(this).attr("value", "Preffer");
                    // console.log("Preffer is unchecked.");
                }
            });
            //EDUCATION  CHECKBOX END

            $(".qualification--remove-btn").click(function () {
                console.log(this);
                $(this).closest('.qualification__div--item').remove();
            });
        });



    });

    // EDUCATION END


    // LANGUAGE START
    $(document).ready(function () {
        $('#qualificationLanguage').click(function () {
            let randomClass = Math.floor(Math.random() * 100000);
            $('div.qualification__div--qualificationLanguage .qualification__div--item-Language').addClass('lang-' + randomClass + '');
            let divLanguage = $('.qualification__div--qualificationLanguage').html();
            $('div.qualification__div--qualificationLanguage .qualification__div--item-Language').removeClass('lang-' + randomClass + '');

            let limitLanguage = document.querySelectorAll('.qualification__div--item-Language').length;
            if (limitLanguage < 5) {
                $('.qualification__div').append(divLanguage);
                $('.lang-' + randomClass + ' input.hidden-languageName').attr('name', 'lang[name][' + limitLanguage + ']')
                $('.lang-' + randomClass + ' input.checkboxLanguage').attr('name', 'lang[type][' + limitLanguage + ']')
                $('.lang-' + randomClass + ' input.hidden-languageLevel').attr('name', 'lang[level][' + limitLanguage + ']')
                $("input[list=languageName]").focusout(function () {
                    let value = $(this).val();
                    let dataVal =$('#languageName [value="' + value + '"]').data('value')
                    console.log(dataVal);
                    $(this).siblings(".hidden-languageName").val(dataVal);
                    if($(this).siblings(".hidden-languageName").val() === "") {
                        $(this).siblings(".hidden-languageName").val(value)
                    }
                });
                $("input[list=languageLevel]").focusout(function () {
                    let value = $(this).val();
                    let dataVal =$('#languageLevel [value="' + value + '"]').data('value')
                    console.log(dataVal);
                    $(this).siblings(".hidden-languageLevel").val(dataVal);
                    if($(this).siblings(".hidden-languageLevel").val() === "") {
                        $(this).siblings(".hidden-languageLevel").val(value)
                    }
                });
            }


            

            // LANGUAGE  CHECKBOX START
            $('.checkboxLanguage').click(function () {
                if ($(this).prop("checked") == true) {
                    $(this).attr("value", "Required");
                    // console.log("Required is checked.");
                } else if ($(this).prop("checked") == false) {
                    $(this).attr("value", "Preffer");
                    // console.log("Preffer is unchecked.");
                }
            });
            // LANGUAGE  CHECKBOX END
            $(".qualification--remove-btn").click(function () {
                console.log(this);
                $(this).closest('.qualification__div--item').remove();
            });
        });



    });
    // LANGUAGE END



    // LICENSE START
    $(document).ready(function () {
        $('#qualificationLicense').click(function () {
            let randomClass = Math.floor(Math.random() * 100000);
            $('div.qualification__div--qualificationLicense .qualification__div--item-License').addClass('license-' + randomClass + '');
            let divLicense = $('.qualification__div--qualificationLicense').html();
            $('div.qualification__div--qualificationLicense .qualification__div--item-License').removeClass('license-' + randomClass + '');


            let limitLicense = document.querySelectorAll('.qualification__div--item-License').length;
            if (limitLicense < 5) {
                $('.qualification__div').append(divLicense);
                $('.license-' + randomClass + ' input.hidden-licenseName').attr('name', 'license[name][' + limitLicense + ']')
                $('.license-' + randomClass + ' input.checkboxLicense').attr('name', 'license[type][' + limitLicense + ']')

                $("input[list=licenseName]").focusout(function () {
                    let value = $(this).val();
                    let dataVal =$('#licenseName [value="' + value + '"]').data('value')
                    console.log(dataVal);
                    $(this).siblings(".hidden-licenseName").val(dataVal);
                    if($(this).siblings(".hidden-licenseName").val() === "") {
                        $(this).siblings(".hidden-licenseName").val(value)
                    }
                });
            }



            // LICENSE  CHECKBOX START
            $('.checkboxLicense').click(function () {
                if ($(this).prop("checked") == true) {
                    $(this).attr("value", "Required");
                    // console.log("Required is checked.");
                } else if ($(this).prop("checked") == false) {
                    $(this).attr("value", "Preffer");
                    // console.log("Preffer is unchecked.");
                }
            });
            // LICENSE  CHECKBOX END

            $(".qualification--remove-btn").click(function () {
                console.log(this);
                $(this).closest('.qualification__div--item').remove();
            });
        });



    });
    // LICENSE END

    // WORKING DAYS START

    $(document).ready(function () {
        $('#qualificationWorkingDays').click(function () {
            let divWorkingDays = $('.qualification__div--qualificationWorkingDays').html();
            $(this).addClass("disabledbutton");
            let limitWorkingDays = document.querySelectorAll('.qualification__div--item-WorkingDays').length;
            if (limitWorkingDays < 2) {
                $('.qualification__div').append(divWorkingDays);

                $(".dropdown-multi-days dt a").on('click', function (e) {
                    e.preventDefault();
                    $(".dropdown-multi-days dd ul").slideToggle('fast');
                });

                $(".dropdown-multi-days dd ul li a").on('click', function () {
                    $(".dropdown-multi-days dd ul").hide();
                });

                function getSelectedValue(id) {
                    return $("#" + id).find("dt a span.value").html();
                }

                $(document).bind('click', function (e) {
                    var $clicked = $(e.target);
                    if (!$clicked.parents().hasClass("dropdown-multi-days")) $(".dropdown-multi-days dd ul").hide();
                });


                $("li").click(function (e) {
                    var cb = $(this).find(":checkbox")[0];
                    if (e.target != cb) cb.checked = !cb.checked;
                    var checkedVal = $(cb).val();
                    var title = $(this).closest('.mutliSelect-days').find('input[type="checkbox"]').val(),
                        checkedVal = $(cb).val() + ",";
                    $(this).toggleClass("selected", cb.checked);

                    daysArray = [];
                    $("input:checkbox[name=multiDays]:checked").each(function () {
                        daysArray.push($(this).val());
                    });
                    $(".hidden-multi-days").val(daysArray);
                    // console.log(checkedVal);
                    if ($(this).children().is(':checked')) {
                        var html = '<span title="' + checkedVal + '" value="' + checkedVal + '">' + checkedVal + '</span>';



                        $('.multiSel-days').append(html);
                        $(".hida-days").hide();

                    } else {
                        $('span[title="' + checkedVal + '"]').remove();

                        // var ret = $(".hida-days");
                        // $('.dropdown-multi-days dt a').append(ret);

                    }
                    if ($('input[data-id="multi-days"]:checked').length == 0) {
                        $(".hida-days").show();
                    }
                });
            }





            // WORKING DAYS CHECKBOX START
            $('.checkboxWorkingDays').click(function () {
                if ($(this).prop("checked") == true) {
                    $(this).attr("value", "Required");
                    // console.log("Required is checked.");
                } else if ($(this).prop("checked") == false) {
                    $(this).attr("value", "Preffer");
                    // console.log("Preffer is unchecked.");
                }
            });
            // WORKING DAYS CHECKBOX END

            $(".qualification--remove-btn-days").click(function () {
                $('.multiSel-days').html('');
                $(".hida-days").show();
                $(this).closest('.qualification__div--item').remove();
                $('#qualificationWorkingDays').removeClass("disabledbutton");
            });

        });



    });
    // WORKING DAYS END


    // BENEFITS START
    $(document).ready(function () {
        $('#qualificationBenefits').click(function () {
            $(this).addClass("disabledbutton");
            let divBenefits = $('.qualification__div--qualificationBenefits').html();
            let limitBenefits = document.querySelectorAll('.qualification__div--item-Benefits').length;
            if (limitBenefits < 2) {
                $('.qualification__div').append(divBenefits);


                $(".dropdown-multi-benefits dt a").on('click', function (e) {
                    e.preventDefault();
                    $(".dropdown-multi-benefits dd ul").slideToggle('fast');
                });

                $(".dropdown-multi-benefits dd ul li a").on('click', function () {
                    $(".dropdown-multi-benefits dd ul").hide();
                });

                function getSelectedValue(id) {
                    return $("#" + id).find("dt a span.value").html();
                }

                $(document).bind('click', function (e) {
                    var $clicked = $(e.target);
                    if (!$clicked.parents().hasClass("dropdown-multi-benefits")) $(".dropdown-multi-benefits dd ul").hide();
                });
                $("li").click(function (e) {
                    var cb = $(this).find(":checkbox")[0];
                    if (e.target != cb) cb.checked = !cb.checked;
                    var checkedVal = $(cb).val();
                    var title = $(this).closest('.mutliSelect-benefits').find('input[type="checkbox"]').val(),
                        checkedVal = $(cb).val() + ",";
                    $(this).toggleClass("selected", cb.checked);

                    benefitsArray = [];
                    $("input:checkbox[name=multiBenefits]:checked").each(function () {
                        benefitsArray.push($(this).val());
                    });
                    $(".hidden-multi-benefits").val(benefitsArray);
                    // console.log(checkedVal);
                    if ($(this).children().is(':checked')) {
                        var html = '<span title="' + checkedVal + '">' + checkedVal + '</span>';
                        $('.multiSel-benefits').append(html);
                        $(".hida-benefits").hide();
                    } else {
                        $('span[title="' + checkedVal + '"]').remove();


                    }
                    if ($('input[data-id="multi-benefits"]:checked').length == 0) {
                        $(".hida-benefits").show();
                    }
                });

            }
            // BENEFITS CHECKBOX START
            $('.checkboxBenefits').click(function () {
                if ($(this).prop("checked") == true) {
                    $(this).attr("value", "Required");
                    // console.log("Required is checked.");
                } else if ($(this).prop("checked") == false) {
                    $(this).attr("value", "Preffer");
                    // console.log("Preffer is unchecked.");
                }
            });
            // BENEFITS CHECKBOX END

            $(".qualification--remove-btn-benefits").click(function () {
                $('.multiSel-benefits').html('');
                $(".hida-benefits").show();
                $('#qualificationBenefits').removeClass("disabledbutton");
                console.log(this);
                $(this).closest('.qualification__div--item').remove();

            });
        });
    });
    //BENEFITS END


    // SKILLS START
    $(document).ready(function () {
        $('#qualificationSkills').click(function () {
            let randomClass = Math.floor(Math.random() * 100000);
            $('div.qualification__div--qualificationSkills .qualification__div--item-Skills').addClass('skills-' + randomClass + '');
            let divSkills = $('.qualification__div--qualificationSkills').html();

            $('div.qualification__div--qualificationSkills .qualification__div--item-Skills').removeClass('skills-' + randomClass + '');

            let limitSkills = document.querySelectorAll('.qualification__div--item-Skills').length;
            if (limitSkills < 5) {
                $('.qualification__div').append(divSkills);

                $('.skills-' + randomClass + ' input.hidden-skillsName').attr('name', 'skills[name][' + limitSkills + ']')
                $('.skills-' + randomClass + ' input.hidden-skillsLevel').attr('name', 'skills[level][' + limitSkills + ']')
                $('.skills-' + randomClass + ' input.checkboxSkills').attr('name', 'skills[type][' + limitSkills + ']')

                $("input[list=skillsName]").focusout(function () {
                    let value = $(this).val();
                    let dataVal =$('#skillsName [value="' + value + '"]').data('value')
                    console.log(dataVal);
                    $(this).siblings(".hidden-skillsName").val(dataVal);
                    if($(this).siblings(".hidden-skillsName").val() === "") {
                        $(this).siblings(".hidden-skillsName").val(value)
                    }
                });
                $("input[list=skillsLevel]").focusout(function () {
                    let value = $(this).val();
                    let dataVal =$('#skillsLevel [value="' + value + '"]').data('value')
                    console.log(dataVal);
                    $(this).siblings(".hidden-skillsLevel").val(dataVal);
                    if($(this).siblings(".hidden-skillsLevel").val() === "") {
                        $(this).siblings(".hidden-skillsLevel").val(value)
                    }
                });
            }
          
        

            // SKILLS CHECKBOX START
            $('.checkboxSkills').click(function () {
                if ($(this).prop("checked") == true) {
                    $(this).attr("value", "Required");
                    // console.log("Required is checked.");
                } else if ($(this).prop("checked") == false) {
                    $(this).attr("value", "Preffer");
                    // console.log("Preffer is unchecked.");
                }
            });
            // SKILLS CHECKBOX END



            $(".qualification--remove-btn").click(function () {
                console.log(this);
                $(this).closest('.qualification__div--item').remove();
                maxAppend--;
            });


        });
    });

    //  SKILLS END


    // GENDER START
    $(document).ready(function () {
        $('#qualificationGender').click(function (e) {
            e.preventDefault();
            let divGender = $('.qualification__div--qualificationGender').html();
            // let divGender = $(".qualification__div--item-Gender").parent().html();

            $(this).addClass("disabledbutton");
            let limitGender = document.querySelectorAll('.qualification__div--item-Gender').length;
            if (limitGender < 2) {
                // $('.qualification__div--qualificationGenderNew').append(divGender);
                $('.qualification__div').append(divGender);
                document.querySelectorAll('.qualification__div--item-Gender')[0].remove();

                $('.qualification__div').find("label.male-gender").attr("for", "male-gender");
                $("input.male-gender").attr("id", "male-gender");
                $("label.female-gender").attr("for", "female-gender");
                $("input.female-gender").attr("id", "female-gender");
                $("label.other-gender").attr("for", "other-gender");
                $("input.other-gender").attr("id", "other-gender");

                $('input[type=radio][name=gender]').change(function () {

                    if ($(this).attr("data-gender") == 'male') {
                        $('input[data-gender=male]').attr('checked', true);
                        $('input[data-gender=female]').attr('checked', false);
                        $('input[data-gender=other]').attr('checked', false);
                    } else if ($(this).attr("data-gender") == 'female') {
                        $('input[data-gender=female]').attr('checked', true);
                        $('input[data-gender=male]').attr('checked', false);
                        $('input[data-gender=other]').attr('checked', false);
                    } else {
                        $('input[data-gender=other]').attr('checked', true);
                        $('input[data-gender=male]').attr('checked', false);
                        $('input[data-gender=female]').attr('checked', false);
                    }
                });

            }


            $(".qualification--remove-btn").click(function () {
                // let newGender = $(".qualification__div--qualificationGenderNew").html();
                let newGender = $(".qualification__div").find(".qualification__div--item-Gender").parent().html();
                console.log(newGender);

                $(".qualification__div--qualificationGender").children().html(newGender);
                $(this).closest('.qualification__div--item').remove();
                $('#qualificationGender').removeClass("disabledbutton");
            });

        });
    });

    // GENDER END

    // AGE START
    $(document).ready(function () {
        $('#qualificationAge').click(function () {
            let divAge = $('.qualification__div--qualificationAge').html();



            let limitAge = document.querySelectorAll('.qualification__div--item-Age').length;
            $(this).addClass("disabledbutton");
            if (limitAge < 2) {
                $('.qualification__div').append(divAge);


                $("input[list=minAgeLevel]").focusout(function () {
                    let value = $(this).val();
                    let dataVal =$('#minAgeLevel [value="' + value + '"]').data('value')
                    console.log(dataVal);
                    $(this).siblings(".hidden-minAgeLevel").val(dataVal);
                    if($(this).siblings(".hidden-minAgeLevel").val() === "") {
                        $(this).siblings(".hidden-minAgeLevel").val(value)
                    }
                });

                $("input[list=maxAgeLevel]").focusout(function () {

                    let value = $(this).val();
                    let dataVal =$('#maxAgeLevel [value="' + value + '"]').data('value')
                    console.log(dataVal);
                    $(this).siblings(".hidden-maxAgeLevel").val(dataVal);
                    if($(this).siblings(".hidden-maxAgeLevel").val() === "") {
                        $(this).siblings(".hidden-maxAgeLevel").val(value)
                    }
                });

            }




            // AGE CHECKBOX START
            $('.checkboxAge').click(function () {
                if ($(this).prop("checked") == true) {
                    $(this).attr("value", "Required");
                    // console.log("Required is checked.");
                } else if ($(this).prop("checked") == false) {
                    $(this).attr("value", "Preffer");
                    // console.log("Preffer is unchecked.");
                }
            });
            // AGE CHECKBOX END


            $(".qualification--remove-btn").click(function () {

                $(this).closest('.qualification__div--item').remove();
                $('#qualificationAge').removeClass("disabledbutton");

            });
        });
    });
    // AGE END
});





// CK EDITOR START
$(document).ready(function () {
    CKEDITOR.replace('post_editor', {
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
// CK EDITOR END

//////////SELECT
