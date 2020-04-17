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
                    }, 200, function () {
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
                }, 200);
            }, 400);
        });

        $(document).on('click', '.selectMultipleBenefits > div', function (e) {
            $(this).parent().toggleClass('open');
        });

        $(".qualification--remove-btn-benefits").click(function () {
            console.log(this);
            $(this).closest('.qualification__div--item').remove();
            UpdateRemainingSkills(false);
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
            " <div class='qualification--remove-btn qualification--remove-btn-skill'><i class='fas fa-times'></i></div></div>");
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

        $(".qualification--remove-btn-skill").click(function () {
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