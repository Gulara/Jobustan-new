$(document).ready(function () {
    // ////////////////
    document.getElementById('resume-desired-job-relocation').onclick = function() {
        // access properties using this keyword
        if ( this.checked ) {
            $(".resume__radio-group").slideDown();

        } else {
            // Returns false if not checked
            $(".resume__radio-group").slideUp();
            $('input[customRadioJobLocation=customRadioJobLocation]').attr('chk', '0');
            $('input[customRadioJobLocation=customRadioJobLocation]').prop('checked', false);
        }
    };

    // $('#resume-desired-job-relocation').click(function () {
    //     $(".resume__radio-group").toggle(this.checked);
    // });
    // UNCHECKED RADIO BUTTON

    InitRadio('customRadioJobLocation');

    function InitRadio(customRadioJobLocation) {
        val = 0;
        $.each($(':radio[customRadioJobLocation="' + customRadioJobLocation + '"]'), function () {

            $(this).val(val++);
            $(this).attr('chk', '0');
            $(this).on("click", function (event) {
                SetRadioButtonChkProperty($(this).val(), customRadioJobLocation);
                let checkedSiblings = $(this).parent().siblings();
                // checkedSiblings.slideToggle('slow');

            });
        });
    }

    function SetRadioButtonChkProperty(val, customRadioJobLocation) {
        $.each($(':radio[customRadioJobLocation="' + customRadioJobLocation + '"]'), function () {

            if ($(this).val() != val)
                $(this).attr('chk', '0');


            else {
                if ($(this).attr('chk') == '0')
                    $(this).attr('chk', '1');

                else {
                    $(this).attr('chk', '0');
                    $(this).prop('checked', false);
                    //  $('#driver-form-pedestrian, #driver-form, .customRadioJobLocation__icon').css({
                    //      'display': 'none'
                    //  });
                }
            }
        });
    }


    // ///////////////
    // DESIRED SALARY START
    // DROPDOWN MONEY
    $('.dropdown-desired-money').click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).toggleClass('expanded');
        $('#' + $(e.target).attr('for')).prop('checked', true);
    });
    $(document).click(function () {
        $('.dropdown-desired-money').removeClass('expanded');
    });
    // DROPDOWN MONEY TYPE
    $('.dropdown-desired-money-type').click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).toggleClass('expanded');
        $('#' + $(e.target).attr('for')).prop('checked', true);
    });
    $(document).click(function () {
        $('.dropdown-desired-money-type').removeClass('expanded');
    });


    // DESIRED SALARY END
    // DESIRED JOB TITLE DATALIST START
    $("input[list=desiredJobTitle]").focusout(function () {
        let value = $(this).val();
        let dataVal = $('#desiredJobTitle [value="' + value + '"]').data('value')

        $(this).siblings(".hidden-desiredJobTitle").val(dataVal);
        if ($(this).siblings(".hidden-desiredJobTitle").val() === "") {
            $(this).siblings(".hidden-desiredJobTitle").val(value)
        }
    });
    // DESIRED JOB TITLE DATALIST END
    // CITY DATALIST START
    $("input[list=cityName]").focusout(function () {
        let value = $(this).val();
        let dataVal = $('#cityName [value="' + value + '"]').data('value')

        $(this).siblings(".hidden-cityName").val(dataVal);
        if ($(this).siblings(".hidden-cityName").val() === "") {
            $(this).siblings(".hidden-cityName").val(value)
        }
    });
    // CITY DATALIST END
    // CITY SELECT  START
    $(function () {

        $('.resume-city-select > .caption').on('click', function () {
            $(this).parent().toggleClass('open');
        });

        $('.resume-city-select > .list > .item').on('click', function () {
            $('.resume-city-select > .list > .item').removeClass('selected');
            $(this).addClass('selected').parent().parent().removeClass('open').children('.caption').html($(this).text() + '<i class="zmdi zmdi-chevron-down"></i>');
        });

        $(document).on('keyup', function (evt) {
            if ((evt.keyCode || evt.which) === 27) {
                $('.resume-city-select').removeClass('open');
            }
        });

        $(document).on('click', function (evt) {
            if ($(evt.target).closest(".resume-city-select > .caption").length === 0) {
                $('.resume-city-select').removeClass('open');
            }
        });

    });
    // CITY SELECT  END



    // WORK EXPERIENCE START
    $(document).ready(function () {
        $('#resumeWorkExperience').click(function () {

            let randomClass = Math.floor(Math.random() * 100000);

            $("div.resume__div--WorkExperience .resume__div--item-WorkExperience").addClass(' experience-' + randomClass);
            let divExperience = $('.resume__div--WorkExperience').html();
            $("div.resume__div--WorkExperience .resume__div--item-WorkExperience").removeClass(' experience-' + randomClass);
            let limitExperience = document.querySelectorAll('.resume__div--item-WorkExperience').length;

            if (limitExperience < 5) {

                $('.resume__div__WorkExperience').append(divExperience);
                $("input[list=experienceJobTitle]").focusout(function () {
                    let value = $(this).val();
                    let dataVal = $('#experienceJobTitle [value="' + value + '"]').data('value')

                    $(this).siblings(".hidden-experienceJobTitle").val(dataVal);
                    if ($(this).siblings(".hidden-experienceJobTitle").val() === "") {
                        $(this).siblings(".hidden-experienceJobTitle").val(value)
                    }
                });
                $("input[list=experienceJobCompany]").focusout(function () {
                    let value = $(this).val();
                    let dataVal = $('#experienceJobCompany [value="' + value + '"]').data('value')

                    $(this).siblings(".hidden-experienceJobCompany").val(dataVal);
                    if ($(this).siblings(".hidden-experienceJobCompany").val() === "") {
                        $(this).siblings(".hidden-experienceJobCompany").val(value)
                    }
                });
                $("input[list=experienceJobCity]").focusout(function () {
                    let value = $(this).val();
                    let dataVal = $('#experienceJobCity [value="' + value + '"]').data('value')

                    $(this).siblings(".hidden-experienceJobCity").val(dataVal);
                    if ($(this).siblings(".hidden-experienceJobCity").val() === "") {
                        $(this).siblings(".hidden-experienceJobCity").val(value)
                    }
                });
                //EXPERIENCE  CHECKBOX START
                $('.checkboxExperienceTime').click(function () {
                    if ($(this).prop("checked") == true) {
                        $(this).attr("value", "No");
                        $(this).parent().parent().parent().siblings(".resume__form-group--right").slideUp();
                        $(this).parent().parent().parent().siblings(".resume__Present").slideDown();
                        $(this).parent().parent().parent().siblings(".resume__form-group--right").children().children('.resume-experience-to-month_val').attr("value", "");
                        $(this).parent().parent().parent().siblings(".resume__form-group--right").children().children('.resume-experience-to-year_val').attr("value", "");
                    } else if ($(this).prop("checked") == false) {
                        $(this).attr("value", "Yes");
                        $(this).parent().parent().parent().siblings(".resume__form-group--right").children().children('.resume-experience-to-month_txt').text("Month");
                        $(this).parent().parent().parent().siblings(".resume__form-group--right").children().children('.resume-experience-to-year_txt').text("Year");

                        $(this).parent().parent().parent().siblings(".resume__form-group--right").slideDown();
                        $(this).parent().parent().parent().siblings(".resume__Present").slideUp();

                    }

                });
                $(".resume-experience-from-month_val").change(function () {
                    var option = $(this).find('option:selected').val();
                    $(this).prev('.resume-experience-from-month_txt').text(option);
                    var optionId = $(this).find('option:selected').attr("data-id");
                    $(this).attr("value", optionId);
                });
                $(".resume-experience-from-year_val").change(function () {
                    var option = $(this).find('option:selected').val();
                    $(this).prev('.resume-experience-from-year_txt').text(option);
                });


                $(".resume-experience-to-month_val").change(function () {
                    var option = $(this).find('option:selected').val();

                    $(this).prev('.resume-experience-to-month_txt').text(option);
                    var optionId = $(this).find('option:selected').attr("data-id");
                    $(this).attr("value", optionId);
                });
                $(".resume-experience-to-year_val").change(function () {
                    var option = $(this).find('option:selected').val();

                    $(this).prev('.resume-experience-to-year_txt').text(option);

                });

                $("div.experience-"+randomClass+' input.hidden-experienceJobTitle').attr('name', 'experience[position]['+limitExperience+"]");
                $("div.experience-"+randomClass+' input.hidden-experienceJobCompany').attr('name', 'experience[company]['+limitExperience+"]");
                $("div.experience-"+randomClass+' input.hidden-experienceJobCity').attr('name', 'experience[city]['+limitExperience+"]");
                $("div.experience-"+randomClass+' select.resume-experience-from-month_val').attr('name', 'experience[from_month]['+limitExperience+"]");
                $("div.experience-"+randomClass+' select.resume-experience-from-year_val').attr('name', 'experience[from_year]['+limitExperience+"]");
                $("div.experience-"+randomClass+' input.checkboxExperienceTime').attr('name', 'experience[still_work]['+limitExperience+"]");

                $("div.experience-"+randomClass+' select.resume-experience-to-month_val').attr('name', 'experience[to_month]['+limitExperience+"]");
                $("div.experience-"+randomClass+' select.resume-experience-to-year_val').attr('name', 'experience[to_year]['+limitExperience+"]");
                $("div.experience-"+randomClass+' textarea.resume-job-editor').attr('name', 'experience[description]['+limitExperience+"]");

            }

            $(".resume--remove-btn").click(function () {
                console.log(this);
                $(this).closest('.resume__div--item').remove();

            });
        });
    });

    // WORK  EXPERIENCE END





    // EDUCATION START
    $(document).ready(function () {
        $('#resumeEducation').click(function () {
            let randomClass = Math.floor(Math.random() * 100000);

            $("div.resume__div--Education .resume__div--item-Education").addClass('education-' + randomClass);


            let divEducation = $('.resume__div--Education').html()


            $("div.resume__div--Education .resume__div--item-Education").removeClass('education-' + randomClass);


            let limitEducation = document.querySelectorAll('.resume__div--item-Education').length;

            if (limitEducation < 5) {
                $('.resume__div__education').append(divEducation);
                // LEVEL OF EDUCATION DATALIST START
                $("input[list=levelOfEducation]").focusout(function () {
                    let value = $(this).val();
                    let dataVal = $('#levelOfEducation [value="' + value + '"]').data('value')

                    $(this).siblings(".hidden-levelOfEducation").val(dataVal);
                    if ($(this).siblings(".hidden-levelOfEducation").val() === "") {
                        $(this).siblings(".hidden-levelOfEducation").val(value)
                    }
                });
                // LEVEL OF EDUCATION DATALIST END
                // SCHOOL DATALIST START
                $("input[list=educationSchool]").focusout(function () {
                    let value = $(this).val();
                    let dataVal = $('#educationSchool [value="' + value + '"]').data('value')

                    $(this).siblings(".hidden-educationSchool").val(dataVal);
                    if ($(this).siblings(".hidden-educationSchool").val() === "") {
                        $(this).siblings(".hidden-educationSchool").val(value)
                    }
                });
                // SCHOOL DATALIST END

                // FIELD OF STUDY DATALIST START
                $("input[list=fieldOfStudy]").focusout(function () {
                    let value = $(this).val();
                    let dataVal = $('#fieldOfStudy [value="' + value + '"]').data('value')

                    $(this).siblings(".hidden-fieldOfStudy").val(dataVal);
                    if ($(this).siblings(".hidden-fieldOfStudy").val() === "") {
                        $(this).siblings(".hidden-fieldOfStudy").val(value)
                    }
                });
                // FIELD OF STUDY DATALIST END

                // EDUCATION CITY DATALIST START
                $("input[list=educationCity]").focusout(function () {
                    let value = $(this).val();
                    let dataVal = $('#educationCity [value="' + value + '"]').data('value')

                    $(this).siblings(".hidden-educationCity").val(dataVal);
                    if ($(this).siblings(".hidden-educationCity").val() === "") {
                        $(this).siblings(".hidden-educationCity").val(value)
                    }
                });
                // EDUCATION CITY DATALIST END
                // EDUCATION LEVEL  START
                $(function () {

                    $('.resume-education-level > .caption').on('click', function () {
                        $(this).parent().toggleClass('open');
                    });

                    $('.resume-education-level > .list > .item').on('click', function () {
                        $('.resume-education-level > .list > .item').removeClass('selected');
                        $(this).addClass('selected').parent().parent().removeClass('open').children('.caption').html($(this).text() + '<i class="zmdi zmdi-chevron-down"></i>');
                    });

                    $(document).on('keyup', function (evt) {
                        if ((evt.keyCode || evt.which) === 27) {
                            $('.resume-education-level').removeClass('open');
                        }
                    });

                    $(document).on('click', function (evt) {
                        if ($(evt.target).closest(".resume-education-level > .caption").length === 0) {
                            $('.resume-education-level').removeClass('open');
                        }
                    });

                });
                // EDUCATION LEVEL END

                // CITY EDUCATION SELECT START
                $(function () {

                    $('.resume-city-education-select > .caption').on('click', function () {
                        $(this).parent().toggleClass('open');
                    });

                    $('.resume-city-education-select > .list > .item').on('click', function () {
                        $('.resume-city-education-select > .list > .item').removeClass('selected');
                        $(this).addClass('selected').parent().parent().removeClass('open').children('.caption').html($(this).text() + '<i class="zmdi zmdi-chevron-down"></i>');
                    });

                    $(document).on('keyup', function (evt) {
                        if ((evt.keyCode || evt.which) === 27) {
                            $('.resume-city-education-select').removeClass('open');
                        }
                    });

                    $(document).on('click', function (evt) {
                        if ($(evt.target).closest(".resume-city-education-select > .caption").length === 0) {
                            $('.resume-city-education-select').removeClass('open');
                        }
                    });

                });
                // CITY EDUCATION SELECT END


                //EDUCATION  CHECKBOX START
                $('.checkboxEducationTime').click(function () {
                    if ($(this).prop("checked") == true) {
                        $(this).attr("value", "No");
                        $(this).parent().parent().parent().siblings(".resume__form-group--right").slideUp();
                        $(this).parent().parent().parent().siblings(".resume__Present").slideDown();
                        $(this).parent().parent().parent().siblings(".resume__form-group--right").children().children('.resume-education-to-month_val').attr("value", "");
                        $(this).parent().parent().parent().siblings(".resume__form-group--right").children().children('.resume-education-to-year_val').attr("value", "");
                    } else if ($(this).prop("checked") == false) {
                        $(this).attr("value", "Yes");
                        $(this).parent().parent().parent().siblings(".resume__form-group--right").children().children('.resume-education-to-month_txt').text("Month");
                        $(this).parent().parent().parent().siblings(".resume__form-group--right").children().children('.resume-education-to-year_txt').text("Year");
                        $(this).parent().parent().parent().siblings(".resume__form-group--right").slideDown();
                        $(this).parent().parent().parent().siblings(".resume__Present").slideUp();


                    }
                });
                $(".resume-education-from-month_val").change(function () {
                    var option = $(this).find('option:selected').val();
                    $(this).prev('.resume-education-from-month_txt').text(option);
                    var optionId = $(this).find('option:selected').attr("data-id");
                    $(this).attr("value", optionId);
                });
                $(".resume-education-from-year_val").change(function () {
                    var option = $(this).find('option:selected').val();
                    $(this).prev('.resume-education-from-year_txt').text(option);
                });


                $(".resume-education-to-month_val").change(function () {
                    var option = $(this).find('option:selected').val();
                    $(this).prev('.resume-education-to-month_txt').text(option);
                    var optionId = $(this).find('option:selected').attr("data-id");
                    $(this).attr("value", optionId);
                });
                $(".resume-education-to-year_val").change(function () {
                    var option = $(this).find('option:selected').val();
                    $(this).prev('.resume-education-to-year_txt').text(option);
                });



                $("div.education-"+randomClass+' input.hidden-levelOfEducation').attr('name', 'education[edu_level]['+limitEducation+"]");
                $("div.education-"+randomClass+' input.hidden-educationSchool').attr('name', 'education[school]['+limitEducation+"]");
                $("div.education-"+randomClass+' input.hidden-fieldOfStudy').attr('name', 'education[edu_field]['+limitEducation+"]");
                $("div.education-"+randomClass+' input.hidden-educationCity').attr('name', 'education[city]['+limitEducation+"]");
                $("div.education-"+randomClass+' select.resume-education-from-month_val').attr('name', 'education[from_month]['+limitEducation+"]");
                $("div.education-"+randomClass+' select.resume-education-from-year_val').attr('name', 'education[from_year]['+limitEducation+"]");
                $("div.education-"+randomClass+' input.checkboxExperienceTime').attr('name', 'education[still_work]['+limitEducation+"]");

                $("div.education-"+randomClass+' select.resume-education-to-month_val').attr('name', 'education[to_month]['+limitEducation+"]");
                $("div.education-"+randomClass+' select.resume-education-to-year_val').attr('name', 'education[to_year]['+limitEducation+"]");

                $("div.education-"+randomClass+' input.checkboxEducationTime').attr('name', 'education[still_student]['+limitEducation+"]");



            }






            $(".resume--remove-btn").click(function () {
                console.log(this);
                $(this).closest('.resume__div--item').remove();
            });
        });



    });

    // EDUCATION END

    // LANGUAGE START
    $(document).ready(function () {
        $('#resumeLanguage').click(function () {
            let randomClass = Math.floor(Math.random() * 100000);

            $("div.resume__div--Language .resume__div--item-Language").addClass('lang-' + randomClass);


            let divLanguage = $('.resume__div--Language').html();


            $("div.resume__div--Language .resume__div--item-Language").removeClass('lang-' + randomClass);

            let limitLanguage = document.querySelectorAll('.resume__div--item-Language').length;
            if (limitLanguage < 5) {
                $('.resume__div__Language').append(divLanguage);

                // LANG NAME DATALIST START
                $("input[list=resumeLangName]").focusout(function () {
                    let value = $(this).val();
                    let dataVal = $('#resumeLangName [value="' + value + '"]').data('value')

                    $(this).siblings(".hidden-resumeLangName").val(dataVal);
                    if ($(this).siblings(".hidden-resumeLangName").val() === "") {
                        $(this).siblings(".hidden-resumeLangName").val(value)
                    }
                });
                // LANGNAME DATALIST END
                // LANG LEVEL DATALIST START
                $("input[list=resumeLangLevel]").focusout(function () {
                    let value = $(this).val();
                    let dataVal = $('#resumeLangLevel [value="' + value + '"]').data('value')

                    $(this).siblings(".hidden-resumeLangLevel").val(dataVal);
                    if ($(this).siblings(".hidden-resumeLangLevel").val() === "") {
                        $(this).siblings(".hidden-resumeLangLevel").val(value)
                    }
                });
                $("div.lang-"+randomClass+' input.hidden-resumeLangName').attr('name', 'lang[name]['+limitLanguage+"]");
                $("div.lang-"+randomClass+' input.hidden-resumeLangLevel').attr('name', 'lang[level]['+limitLanguage+"]");


                // LANG LEVEL DATALIST END
            }




            $(".resume--remove-btn").click(function () {
                console.log(this);
                $(this).closest('.resume__div--item').remove();
            });
        });



    });
    // LANGUAGE END

    // SKILLS START
    $(document).ready(function () {
        $('#resumeSkills').click(function () {
            let randomClass = Math.floor(Math.random() * 100000);

            $("div.resume__div--Skills .resume__div--item-Skills").addClass('skill-' + randomClass);


            let divSkills = $('.resume__div--Skills').html();


            $("div.resume__div--Skills .resume__div--item-Skills").removeClass('skill-' + randomClass);



            let limitSkills = document.querySelectorAll('.resume__div--item-Skills').length;
            if (limitSkills < 5) {
                $('.resume__div__skills').append(divSkills);
                // SKILLS NAME DATALIST START
                $("input[list=skillsName]").focusout(function () {
                    let value = $(this).val();
                    let dataVal = $('#skillsName [value="' + value + '"]').data('value')

                    $(this).siblings(".hidden-skillsName").val(dataVal);
                    if ($(this).siblings(".hidden-skillsName").val() === "") {
                        $(this).siblings(".hidden-skillsName").val(value)
                    }
                });
                // SKILLS NAME DATALIST END
                // SKILLS LEVEL DATALIST START
                $("input[list=skillsLevel]").focusout(function () {
                    let value = $(this).val();
                    let dataVal = $('#skillsLevel [value="' + value + '"]').data('value')

                    $(this).siblings(".hidden-skillsLevel").val(dataVal);
                    if ($(this).siblings(".hidden-skillsLevel").val() === "") {
                        $(this).siblings(".hidden-skillsLevel").val(value)
                    }
                });

                $("div.skill-"+randomClass+' input.hidden-skillsName').attr('name', 'skill[name]['+limitSkills+"]");
                $("div.skill-"+randomClass+' input.hidden-skillsLevel').attr('name', 'skill[level]['+limitSkills+"]");

                // SKILLS LEVEL DATALIST END
            }







            $(".resume--remove-btn").click(function () {
                console.log(this);
                $(this).closest('.resume__div--item').remove();
            });


        });
    });

    //  SKILLS END

    // JOB PREFERENCES START
    $(document).ready(function () {
        $('#resumeJobPreferences').click(function () {
            let divJobPreferences = $('.resume__div--JobPreferences').html();
            let limitJobPreferences = document.querySelectorAll('.resume__div--item-JobPreferences').length;
            if (limitJobPreferences < 5) {
                $('.resume__div__JobPreferences').append(divJobPreferences);


                // DESIRED SALARY START
                // DROPDOWN MONEY
                $('.dropdown-desired-money').click(function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    $(this).toggleClass('expanded');
                    $('#' + $(e.target).attr('for')).prop('checked', true);
                });
                $(document).click(function () {
                    $('.dropdown-desired-money').removeClass('expanded');
                });
                // DROPDOWN MONEY TYPE
                $('.dropdown-desired-money-type').click(function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    $(this).toggleClass('expanded');
                    $('#' + $(e.target).attr('for')).prop('checked', true);
                });
                $(document).click(function () {
                    $('.dropdown-desired-money-type').removeClass('expanded');
                });


                // DESIRED SALARY END



            }







            $(".resume--remove-btn").click(function () {
                console.log(this);
                $(this).closest('.resume__div--item').remove();
            });


        });
    });
    // JOB PREFERENCES END






    // LICENSE START
    $(document).ready(function () {
        $('#resumeLicense').click(function () {
            let randomClass = Math.floor(Math.random() * 100000);

            $("div.resume__div--License .resume__div--item-License").addClass('license-' + randomClass);


            let divLicense = $('.resume__div--License').html();


            $("div.resume__div--License .resume__div--item-License").removeClass('license-' + randomClass);


            let limitLicense = document.querySelectorAll('.resume__div--item-License').length;
            if (limitLicense < 5) {
                $('.resume__form-group__div').append(divLicense);
                $("input[list=licenseName]").focusout(function () {
                    let value = $(this).val();
                    let dataVal = $('#licenseName [value="' + value + '"]').data('value')

                    $(this).siblings(".hidden-licenseName").val(dataVal);
                    if ($(this).siblings(".hidden-licenseName").val() === "") {
                        $(this).siblings(".hidden-licenseName").val(value)
                    }
                });

                $("div.license-"+randomClass+' input.hidden-licenseName').attr('name', 'license[name]['+limitLicense+"]");

            }





            $(".resume--remove-btn").click(function () {
                console.log(this);
                $(this).closest('.resume__div--item').remove();
            });
        });



    });
    // LICENSE END



    // ADD MILITARY START
    $(document).ready(function () {
        $('#resumeAddMilitary').click(function (e) {
            e.preventDefault();
            let divGender = $('.resume__div--AddMilitary').html();
            // let divGender = $(".resume__div--item-Gender").parent().html();

            $(this).addClass("disabledbutton");
            let limitGender = document.querySelectorAll('.resume__div--item-AddMilitary').length;
            if (limitGender < 2) {
                // $('.resume__div--resumeGenderNew').append(divGender);
                $('.resume__form-group__div').append(divGender);
                document.querySelectorAll('.resume__div--item-AddMilitary')[0].remove();

                $('.resume__form-group__div').find("label.resume-addMilitary-constant").attr("for", "resume-addMilitary-constant");
                $("input.resume-addMilitary-constant").attr("id", "resume-addMilitary-constant");
                $("label.resume-addMilitary-changeable").attr("for", "resume-addMilitary-changeable");
                $("input.resume-addMilitary-changeable").attr("id", "resume-addMilitary-changeable");

                $('input[type=radio][name=addMilitarytype]').change(function () {

                    if ($(this).attr(" data-item-id") == 'resume-addMilitary-constant') {
                        $('input[ data-item-id=resume-addMilitary-constant]').attr('checked', true);
                        $('input[ data-item-id=resume-addMilitary-changeable]').attr('checked', false);

                    } else if ($(this).attr(" data-item-id") == 'resume-addMilitary-changeable') {
                        $('input[ data-item-id=resume-addMilitary-changeable]').attr('checked', true);
                        $('input[ data-item-id=resume-addMilitary-constant]').attr('checked', false);

                    }
                });

            }

            //ADD MILITARY  CHECKBOX START
            $('.checkboxAddMilitary').click(function () {
                if ($(this).prop("checked") == true) {
                    $(this).attr("value", "No");

                    $(".resume__addMilitary__list").slideDown();
                    $(".resume__addMilitary__list").css({
                        "display": "flex"
                    })
                    // console.log("Required is checked.");
                } else if ($(this).prop("checked") == false) {
                    $(this).attr("value", "Yes");
                    // $(".resume__addMilitary__list").css({
                    //     "display": "none"
                    // })
                    $(".resume__addMilitary__list").slideUp();
                    // console.log("Preffer is unchecked.");
                }
            });
            //ADD MILITARY  CHECKBOX END


            $(".resume--remove-btn").click(function () {
                // let newGender = $(".resume__div--resumeGenderNew").html();
                let newGender = $(".resume__form-group__div").find(".resume__div--item-AddMilitary").parent().html();
                console.log(newGender);

                $(".resume__div--AddMilitary").children().html(newGender);
                $(this).closest('.resume__div--item').remove();
                $('#resumeAddMilitary').removeClass("disabledbutton");
            });

        });
    });

    // ADD MILITARY END
    // AWARD START
    $(document).ready(function () {
        $('#resumeAwards').click(function () {
            let randomClass = Math.floor(Math.random() * 100000);

            $("div.resume__div--Awards .resume__div--item-Awards").addClass('award-' + randomClass);


            let divAwards = $('.resume__div--Awards').html();


            $("div.resume__div--Awards .resume__div--item-Awards").removeClass('award-' + randomClass);

            let limitAwards = document.querySelectorAll('.resume__div--item-Awards').length;
            if (limitAwards < 5) {
                $('.resume__form-group__div').append(divAwards);
                $("input[list=awardsName]").focusout(function () {
                    let value = $(this).val();
                    let dataVal = $('#awardsName [value="' + value + '"]').data('value')

                    $(this).siblings(".hidden-awardsName").val(dataVal);
                    if ($(this).siblings(".hidden-awardsName").val() === "") {
                        $(this).siblings(".hidden-awardsName").val(value)
                    }
                });


                $("div.award-"+randomClass+' input.hidden-awardsName').attr('name', 'award[name]['+limitAwards+"]");
                $("div.award-"+randomClass+' input[list="resumeAgeMonth"]').attr('name', 'award[month]['+limitAwards+"]");
                $("div.award-"+randomClass+' input[list="resumeAgeYear"]').attr('name', 'award[year]['+limitAwards+"]");

            }





            $(".resume--remove-btn").click(function () {
                console.log(this);
                $(this).closest('.resume__div--item').remove();
            });
        });



    });
    // AWARD END



    // GENDER START
    $(document).ready(function () {
        $('#resumeGender').click(function (e) {
            e.preventDefault();
            let divGender = $('.resume__div--Gender').html();
            // let divGender = $(".resume__div--item-Gender").parent().html();

            $(this).addClass("disabledbutton");
            let limitGender = document.querySelectorAll('.resume__div--item-Gender').length;
            if (limitGender < 2) {
                // $('.resume__div--resumeGenderNew').append(divGender);
                $('.resume__form-group__div').append(divGender);
                document.querySelectorAll('.resume__div--item-Gender')[0].remove();

                $('.resume__form-group__div').find("label.male-gender").attr("for", "male-gender");
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


            $(".resume--remove-btn").click(function () {
                // let newGender = $(".resume__div--resumeGenderNew").html();
                let newGender = $(".resume__form-group__div").find(".resume__div--item-Gender").parent().html();
                console.log(newGender);

                $(".resume__div--Gender").children().html(newGender);
                $(this).closest('.resume__div--item').remove();
                $('#resumeGender').removeClass("disabledbutton");
            });

        });
    });

    // GENDER END

    // AGE START
    $(document).ready(function () {
        $('#resumeAge').click(function () {
            let divAge = $('.resume__div--Age').html();



            let limitAge = document.querySelectorAll('.resume__div--item-Age').length;
            $(this).addClass("disabledbutton");
            if (limitAge < 2) {
                $('.resume__form-group__div').append(divAge);
                $("input[list=resumeAgeMonth]").focusout(function () {
                    let value = $(this).val();
                    let dataVal = $('#resumeAgeMonth [value="' + value + '"]').data('value')

                    $(this).siblings(".hidden-resumeAgeMonth").val(dataVal);
                    if ($(this).siblings(".hidden-resumeAgeMonth").val() === "") {
                        $(this).siblings(".hidden-resumeAgeMonth").val(value)
                    }
                });

            }



            $(".resume--remove-btn").click(function () {

                $(this).closest('.resume__div--item').remove();
                $('#resumeAge').removeClass("disabledbutton");

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