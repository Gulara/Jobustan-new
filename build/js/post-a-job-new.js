//    FOR POST-A-JOB.HTML



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


    $("input[list=jobTitle]").focusout(function () {
        let value = $(this).val();
        let dataVal =$('#jobTitle [value="' + value + '"]').data('value')
        console.log(dataVal);
        $(this).siblings(".hidden-jobTitle").val(dataVal);
        if($(this).siblings(".hidden-jobTitle").val() === "") {
            $(this).siblings(".hidden-jobTitle").val(value)
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


    $('.iq-salaryLevel ').select2();

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
                    value: 'Cambodian riel',
                    data: 'KHR'
                },

                {
                    value: 'Danish krone',
                    data: 'DKK'
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
    // CHANGE LANGUAGE END

});
// SALARY RADIO BUTTON END








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



            $('.qualification__div--item-Experience').each(function () {

                if ($('.select2 ').length != $('.qualification__div--item-Experience').length) {
                    $('.iq-experienceYears').select2();
                }

            });
            // EXPERIENCE SELECT2




            // EXPERIENCE AUTOCOMPLETE START

            $(function () {
                var experience = [{
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
                        value: 'Latvian lats',
                        data: 'LVL'
                    },
                    {
                        value: 'Lebanese lira',
                        data: 'LBP'
                    },

                    {
                        value: 'Nigerian naira',
                        data: 'NGN'
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
                        value: 'Zimbabwean dollar',
                        data: 'ZWD'
                    },
                ];

                $('.qualification__input--experience').autocomplete({
                    lookup: experience,
                    onSelect: function (suggestion) {
                        var thehtml = '<strong>Currency Name:</strong> ' + suggestion.value + ' <br> <strong>Symbol:</strong> ' + suggestion.data;
                        $('#outputcontent').html(thehtml);
                    }
                });


            });

            // AUTOCOMPLETE END
            // EXPERIENCE AUTOCOMPLETE END

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


            // EDUCATION SELECT2
            // $('.iq-localizedEduLevel').select2();


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
            $('.iq-SkillsLevel').select2();
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



            $('.iq-ageLevel').select2();


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