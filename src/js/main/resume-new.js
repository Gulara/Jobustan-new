$(document).ready(function () {


    //  ALL AUTOCOMPLETE FUNCTION START
    (function (e) {
        "function" === typeof define && define.amd ? define(["jquery"], e) : e(jQuery)
    })
    (function (e) {
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

    //  ALL AUTOCOMPLETE FUNCTION END



    // EXPERIENCE START
    $(document).ready(function () {
        $('#resumeWorkExperience').click(function () {


            let divExperience = $('.resume__div--WorkExperience').html();

            let limitExperience = document.querySelectorAll('.resume__div--item-WorkExperience').length;

            if (limitExperience < 5) {
                $('.resume__div__WorkExperience').append(divExperience);

                // AUTOCOMPLETE JOB TITLE START
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
                    $('.resume-job-title').autocomplete({
                      lookup: jobTitle,
                      onSelect: function (suggestion) {
                        var thehtml = '<strong>Currency Name:</strong> ' + suggestion.value + ' <br> <strong>Symbol:</strong> ' + suggestion.data;
                        $('#outputcontent').html(thehtml);
                      }
                    });
                    
                  
                  });
                // AUTOCOMPLETE JOB TITLE END
                // AUTOCOMPLETE JOB COMPANY
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
                    $('.resume-job-company').autocomplete({
                      lookup: jobCompany,
                      onSelect: function (suggestion) {
                        var thehtml = '<strong>Currency Name:</strong> ' + suggestion.value + ' <br> <strong>Symbol:</strong> ' + suggestion.data;
                        $('#outputcontent').html(thehtml);
                      }
                    });
                    
                  
                  });
                // JOB COMPANY END
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


                //  CITY AUTOCOMPLETE START
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
                    $('.resume-city').autocomplete({
                      lookup: city,
                      onSelect: function (suggestion) {
                        var thehtml = '<strong>Currency Name:</strong> ' + suggestion.value + ' <br> <strong>Symbol:</strong> ' + suggestion.data;
                        $('#outputcontent').html(thehtml);
                      }
                    });
                    
                  
                  });
              // CITY AUTOCOMPLETE END

            }






            // EXPERIENCE AUTOCOMPLETE START

            // EXPERIENCE AUTOCOMPLETE END





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
            let divEducation = $('.qualification__div--qualificationEducation').html()
            let limitEducation = document.querySelectorAll('.qualification__div--item-Education').length;

            if (limitEducation < 5) {
                $('.qualification__div').append(divEducation);
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
            let divLanguage = $('.qualification__div--qualificationLanguage').html();
            let limitLanguage = document.querySelectorAll('.qualification__div--item-Language').length;
            if (limitLanguage < 5) {
                $('.qualification__div').append(divLanguage);
            }

            // LANGUAGE AUTOCOMPLETE START

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
                        value: 'Bolivian boliviano',
                        data: 'BOB'
                    },
                    {
                        value: 'Nicaraguan cordoba',
                        data: 'NIO'
                    },

                    {
                        value: 'Zimbabwean dollar',
                        data: 'ZWD'
                    },
                ];

                $('.qualificationLang').autocomplete({
                    lookup: languages,
                    onSelect: function (suggestion) {
                        var thehtml = '<strong>Currency Name:</strong> ' + suggestion.value + ' <br> <strong>Symbol:</strong> ' + suggestion.data;
                        $('#outputcontent').html(thehtml);
                    }
                });


            });

            // LANGUAGE AUTOCOMPLETE END

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
            let divLicense = $('.qualification__div--qualificationLicense').html();
            let limitLicense = document.querySelectorAll('.qualification__div--item-License').length;
            if (limitLicense < 5) {
                $('.qualification__div').append(divLicense);
            }


            // LICENSE AUTOCOMPLETE START
            $(function () {
                var license = [{
                        value: 'Afghan afghani',
                        data: 'AFN'
                    },
                    {
                        value: 'Albanian lek',
                        data: 'ALL'
                    },
                    {
                        value: 'Bolivian boliviano',
                        data: 'BOB'
                    },
                    {
                        value: 'Nicaraguan cordoba',
                        data: 'NIO'
                    },

                    {
                        value: 'Zimbabwean dollar',
                        data: 'ZWD'
                    },
                ];

                $('.qualificationInputLicense').autocomplete({
                    lookup: license,
                    onSelect: function (suggestion) {
                        var thehtml = '<strong>Currency Name:</strong> ' + suggestion.value + ' <br> <strong>Symbol:</strong> ' + suggestion.data;
                        $('#outputcontent').html(thehtml);
                    }
                });


            });
            // LICENSE AUTOCOMPLETE END

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

                $('.mutliSelect-days input[type="checkbox"]').on('click', function () {

                    var title = $(this).closest('.mutliSelect-days').find('input[type="checkbox"]').val(),
                        title = $(this).val() + ",";

                    if ($(this).is(':checked')) {
                        var html = '<span title="' + title + '">' + title + '</span>';
                        $('.multiSel-days').append(html);
                        $(".hida-days").hide();
                    } else {
                        $('span[title="' + title + '"]').remove();
                        var ret = $(".hida");
                        $('.dropdown-multi-days dt a').append(ret);

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

                $('.mutliSelect-benefits input[type="checkbox"]').on('click', function () {

                    var title = $(this).closest('.mutliSelect-benefits').find('input[type="checkbox"]').val(),
                        title = $(this).val() + ",";

                    if ($(this).is(':checked')) {
                        var html = '<span title="' + title + '">' + title + '</span>';
                        $('.multiSel-benefits').append(html);
                        $(".hida-benefits").hide();
                    } else {
                        $('span[title="' + title + '"]').remove();
                        var ret = $(".hida");
                        $('.dropdown-multi-benefits dt a').append(ret);

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
            let divSkills = $('.qualification__div--qualificationSkills').html();
            let limitSkills = document.querySelectorAll('.qualification__div--item-Skills').length;
            if (limitSkills < 5) {
                $('.qualification__div').append(divSkills);
            }

            // SKILLS AUTOCOMPLETE START
            $(function () {
                var skills = [{

                        value: 'Albanian lek',
                        data: 'ALL'
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
                        value: 'Zambian kwacha',
                        data: 'ZMK'
                    },
                    {
                        value: 'Zimbabwean dollar',
                        data: 'ZWD'
                    },
                ];

                $('.qualificationInputSkills').autocomplete({
                    lookup: skills,
                    onSelect: function (suggestion) {
                        var thehtml = '<strong>Currency Name:</strong> ' + suggestion.value + ' <br> <strong>Symbol:</strong> ' + suggestion.data;
                        $('#outputcontent').html(thehtml);
                    }
                });


            });

            // SKILLS AUTOCOMPLETE END

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



// SKILLS AUTOCOMPLETE END
$('input[data-list]').each(function () {
    var availableTags = [{

            value: 'Albanian lek',
            data: 'ALL'
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
            value: 'Zambian kwacha',
            data: 'ZMK'
        },
        {
            value: 'Zimbabwean dollar',
            data: 'ZWD'
        },
    ];

    var availableTags = $('#' + $(this).attr("data-list")).find('option').map(function () {
        return this.value;
    }).get();

    $(this).autocomplete({
        source: availableTags
    }).on('focus', function () {
        $(this).autocomplete('search', ' ');
    }).on('search', function () {
        if ($(this).val() === '') {
            $(this).autocomplete('search', ' ');
        }
    });
});