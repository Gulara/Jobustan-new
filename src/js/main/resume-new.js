$(document).ready(function () {
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



    // WORK EXPERIENCE START
    $(document).ready(function () {
        $('#resumeWorkExperience').click(function () {


            let divExperience = $('.resume__div--WorkExperience').html();

            let limitExperience = document.querySelectorAll('.resume__div--item-WorkExperience').length;

            if (limitExperience < 5) {
                $('.resume__div__WorkExperience').append(divExperience);

                // AUTOCOMPLETE JOB TITLE START
                $(function () {
                    var jobTitle = [{
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
                            value: 'Azerbaijani manat',
                            data: 'AZN'
                        },
                        {
                            value: 'Bahamian dollar',
                            data: 'BSD'
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
                            value: 'United Arab Emirates dirham',
                            data: 'AED'
                        },

                        {
                            value: 'Zimbabwean dollar',
                            data: 'ZWD'
                        },
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
                $(function () {
                    var jobCompany = [{
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
                            value: 'Azerbaijani manat',
                            data: 'AZN'
                        },
                        {
                            value: 'Bahamian dollar',
                            data: 'BSD'
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
                            value: 'United Arab Emirates dirham',
                            data: 'AED'
                        },

                        {
                            value: 'Zimbabwean dollar',
                            data: 'ZWD'
                        },
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



                //  CITY AUTOCOMPLETE START
                $(function () {
                    var city = [{
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
                            value: 'Azerbaijani manat',
                            data: 'AZN'
                        },
                        {
                            value: 'Bahamian dollar',
                            data: 'BSD'
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
                            value: 'Zimbabwean dollar',
                            data: 'ZWD'
                        },
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
                // JOB CITY  START
                $(function () {

                    $('.resume-city-job > .caption').on('click', function () {
                        $(this).parent().toggleClass('open');
                    });

                    $('.resume-city-job > .list > .item').on('click', function () {
                        $('.resume-city-job > .list > .item').removeClass('selected');
                        $(this).addClass('selected').parent().parent().removeClass('open').children('.caption').html($(this).text() + '<i class="zmdi zmdi-chevron-down"></i>');
                    });

                    $(document).on('keyup', function (evt) {
                        if ((evt.keyCode || evt.which) === 27) {
                            $('.resume-city-job').removeClass('open');
                        }
                    });

                    $(document).on('click', function (evt) {
                        if ($(evt.target).closest(".resume-city-job > .caption").length === 0) {
                            $('.resume-city-job').removeClass('open');
                        }
                    });

                });
                // JOB CITY END
                // MONTH FROM JOB
                $(function () {

                    $('.resume-job-from-month > .caption').on('click', function () {
                        $(this).parent().toggleClass('open');
                    });

                    $('.resume-job-from-month > .list > .item').on('click', function () {
                        $('.resume-job-from-month > .list > .item').removeClass('selected');
                        $(this).addClass('selected').parent().parent().removeClass('open').children('.caption').html($(this).text() + '<i class="zmdi zmdi-chevron-down"></i>');
                    });

                    $(document).on('keyup', function (evt) {
                        if ((evt.keyCode || evt.which) === 27) {
                            $('.resume-job-from-month').removeClass('open');
                        }
                    });

                    $(document).on('click', function (evt) {
                        if ($(evt.target).closest(".resume-job-from-month > .caption").length === 0) {
                            $('.resume-job-from-month').removeClass('open');
                        }
                    });

                });
                //  YEAR FROM JOB
                $(function () {

                    $('.resume-job-from-year > .caption').on('click', function () {
                        $(this).parent().toggleClass('open');
                    });

                    $('.resume-job-from-year > .list > .item').on('click', function () {
                        $('.resume-job-from-year > .list > .item').removeClass('selected');
                        $(this).addClass('selected').parent().parent().removeClass('open').children('.caption').html($(this).text() + '<i class="zmdi zmdi-chevron-down"></i>');
                    });

                    $(document).on('keyup', function (evt) {
                        if ((evt.keyCode || evt.which) === 27) {
                            $('.resume-job-from-year').removeClass('open');
                        }
                    });

                    $(document).on('click', function (evt) {
                        if ($(evt.target).closest(".resume-job-from-year > .caption").length === 0) {
                            $('.resume-job-from-year').removeClass('open');
                        }
                    });

                });

                // MONTH TO JOB
                $(function () {

                    $('.resume-job-to-month > .caption').on('click', function () {
                        $(this).parent().toggleClass('open');
                    });

                    $('.resume-job-to-month > .list > .item').on('click', function () {
                        $('.resume-job-to-month > .list > .item').removeClass('selected');
                        $(this).addClass('selected').parent().parent().removeClass('open').children('.caption').html($(this).text() + '<i class="zmdi zmdi-chevron-down"></i>');
                    });

                    $(document).on('keyup', function (evt) {
                        if ((evt.keyCode || evt.which) === 27) {
                            $('.resume-job-to-month').removeClass('open');
                        }
                    });

                    $(document).on('click', function (evt) {
                        if ($(evt.target).closest(".resume-job-to-month > .caption").length === 0) {
                            $('.resume-job-to-month').removeClass('open');
                        }
                    });

                });
                //  YEAR TO JOB
                $(function () {

                    $('.resume-job-to-year > .caption').on('click', function () {
                        $(this).parent().toggleClass('open');
                    });

                    $('.resume-job-to-year > .list > .item').on('click', function () {
                        $('.resume-job-to-year > .list > .item').removeClass('selected');
                        $(this).addClass('selected').parent().parent().removeClass('open').children('.caption').html($(this).text() + '<i class="zmdi zmdi-chevron-down"></i>');
                    });

                    $(document).on('keyup', function (evt) {
                        if ((evt.keyCode || evt.which) === 27) {
                            $('.resume-job-to-year').removeClass('open');
                        }
                    });

                    $(document).on('click', function (evt) {
                        if ($(evt.target).closest(".resume-job-to-year > .caption").length === 0) {
                            $('.resume-job-to-year').removeClass('open');
                        }
                    });

                });



                //  CK EDITOR
                // CKEDITOR.replace('resume-job-editor', {
                //     skin: 'moono',
                //     enterMode: CKEDITOR.ENTER_BR,
                //     shiftEnterMode: CKEDITOR.ENTER_P,
                //     toolbar: [


                //         {
                //             name: 'paragraph',
                //             groups: ['list', 'indent'],
                //             items: ['NumberedList', 'BulletedList']
                //         },

                //     ],
                // });

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
            let divEducation = $('.resume__div--Education').html()
            let limitEducation = document.querySelectorAll('.resume__div--item-Education').length;

            if (limitEducation < 5) {
                $('.resume__div__education').append(divEducation);
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

                // AUTOCOMPLETE CITY EDUCATION START
                $(function () {
                    var cityEducation = [{
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
                            value: 'Azerbaijani manat',
                            data: 'AZN'
                        },
                        {
                            value: 'Bahamian dollar',
                            data: 'BSD'
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
                            value: 'United Arab Emirates dirham',
                            data: 'AED'
                        },

                        {
                            value: 'Zimbabwean dollar',
                            data: 'ZWD'
                        },
                    ];

                    // setup autocomplete function pulling from currencies[] array
                    $('.resume-cityEducation').autocomplete({
                        lookup: cityEducation,
                        onSelect: function (suggestion) {
                            var thehtml = '<strong>Currency Name:</strong> ' + suggestion.value + ' <br> <strong>Symbol:</strong> ' + suggestion.data;
                            $('#outputcontent').html(thehtml);
                        }
                    });


                });
                // AUTOCOMPLETE CITY EDUCATION END
                $(function () {
                    var school = [{
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
                            value: 'Azerbaijani manat',
                            data: 'AZN'
                        },
                        {
                            value: 'Bahamian dollar',
                            data: 'BSD'
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
                            value: 'United Arab Emirates dirham',
                            data: 'AED'
                        },

                        {
                            value: 'Zimbabwean dollar',
                            data: 'ZWD'
                        },
                    ];

                    // setup autocomplete function pulling from currencies[] array
                    $('.resume-school').autocomplete({
                        lookup: school,
                        onSelect: function (suggestion) {
                            var thehtml = '<strong>Currency Name:</strong> ' + suggestion.value + ' <br> <strong>Symbol:</strong> ' + suggestion.data;
                            $('#outputcontent').html(thehtml);
                        }
                    });


                });
                // CITY AUTOCOMPLETE END
                // MONTH FROM EDUCATION
                $(function () {

                    $('.resume-education-from-month > .caption').on('click', function () {
                        $(this).parent().toggleClass('open');
                    });

                    $('.resume-education-from-month > .list > .item').on('click', function () {
                        $('.resume-education-from-month > .list > .item').removeClass('selected');
                        $(this).addClass('selected').parent().parent().removeClass('open').children('.caption').html($(this).text() + '<i class="zmdi zmdi-chevron-down"></i>');
                    });

                    $(document).on('keyup', function (evt) {
                        if ((evt.keyCode || evt.which) === 27) {
                            $('.resume-education-from-month').removeClass('open');
                        }
                    });

                    $(document).on('click', function (evt) {
                        if ($(evt.target).closest(".resume-education-from-month > .caption").length === 0) {
                            $('.resume-education-from-month').removeClass('open');
                        }
                    });

                });
                //  YEAR FROM EDUCATION
                $(function () {

                    $('.resume-education-from-year > .caption').on('click', function () {
                        $(this).parent().toggleClass('open');
                    });

                    $('.resume-education-from-year > .list > .item').on('click', function () {
                        $('.resume-education-from-year > .list > .item').removeClass('selected');
                        $(this).addClass('selected').parent().parent().removeClass('open').children('.caption').html($(this).text() + '<i class="zmdi zmdi-chevron-down"></i>');
                    });

                    $(document).on('keyup', function (evt) {
                        if ((evt.keyCode || evt.which) === 27) {
                            $('.resume-education-from-year').removeClass('open');
                        }
                    });

                    $(document).on('click', function (evt) {
                        if ($(evt.target).closest(".resume-education-from-year > .caption").length === 0) {
                            $('.resume-education-from-year').removeClass('open');
                        }
                    });

                });

                // MONTH TO EDUCATION
                $(function () {

                    $('.resume-education-to-month > .caption').on('click', function () {
                        $(this).parent().toggleClass('open');
                    });

                    $('.resume-education-to-month > .list > .item').on('click', function () {
                        $('.resume-education-to-month > .list > .item').removeClass('selected');
                        $(this).addClass('selected').parent().parent().removeClass('open').children('.caption').html($(this).text() + '<i class="zmdi zmdi-chevron-down"></i>');
                    });

                    $(document).on('keyup', function (evt) {
                        if ((evt.keyCode || evt.which) === 27) {
                            $('.resume-education-to-month').removeClass('open');
                        }
                    });

                    $(document).on('click', function (evt) {
                        if ($(evt.target).closest(".resume-education-to-month > .caption").length === 0) {
                            $('.resume-education-to-month').removeClass('open');
                        }
                    });

                });
                //  YEAR TO EDUCATION
                $(function () {

                    $('.resume-education-to-year > .caption').on('click', function () {
                        $(this).parent().toggleClass('open');
                    });

                    $('.resume-education-to-year > .list > .item').on('click', function () {
                        $('.resume-education-to-year > .list > .item').removeClass('selected');
                        $(this).addClass('selected').parent().parent().removeClass('open').children('.caption').html($(this).text() + '<i class="zmdi zmdi-chevron-down"></i>');
                    });

                    $(document).on('keyup', function (evt) {
                        if ((evt.keyCode || evt.which) === 27) {
                            $('.resume-education-to-year').removeClass('open');
                        }
                    });

                    $(document).on('click', function (evt) {
                        if ($(evt.target).closest(".resume-education-to-year > .caption").length === 0) {
                            $('.resume-education-to-year').removeClass('open');
                        }
                    });

                });

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
            let divLanguage = $('.resume__div--Language').html();
            let limitLanguage = document.querySelectorAll('.resume__div--item-Language').length;
            if (limitLanguage < 5) {
                $('.resume__div__Language').append(divLanguage);
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

                $('.resumeLang').autocomplete({
                    lookup: languages,
                    onSelect: function (suggestion) {
                        var thehtml = '<strong>Currency Name:</strong> ' + suggestion.value + ' <br> <strong>Symbol:</strong> ' + suggestion.data;
                        $('#outputcontent').html(thehtml);
                    }
                });


            });

            // LANGUAGE AUTOCOMPLETE END

            
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
            let divSkills = $('.resume__div--Skills').html();
            let limitSkills = document.querySelectorAll('.resume__div--item-Skills').length;
            if (limitSkills < 5) {
                $('.resume__div__skills').append(divSkills);
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

                $('.resumeInputSkills').autocomplete({
                    lookup: skills,
                    onSelect: function (suggestion) {
                        var thehtml = '<strong>Currency Name:</strong> ' + suggestion.value + ' <br> <strong>Symbol:</strong> ' + suggestion.data;
                        $('#outputcontent').html(thehtml);
                    }
                });


            });

            // SKILLS AUTOCOMPLETE END





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
                // AUTOCOMPLETE DESIRED JOB TITLE START
                $(function () {
                    var desiredJobTitle = [{
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
                            value: 'Azerbaijani manat',
                            data: 'AZN'
                        },
                        {
                            value: 'Bahamian dollar',
                            data: 'BSD'
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
                            value: 'United Arab Emirates dirham',
                            data: 'AED'
                        },

                        {
                            value: 'Zimbabwean dollar',
                            data: 'ZWD'
                        },
                    ];

                    // setup autocomplete function pulling from currencies[] array
                    $('.resume-desired-job-title').autocomplete({
                        lookup: desiredJobTitle,
                        onSelect: function (suggestion) {
                            var thehtml = '<strong>Currency Name:</strong> ' + suggestion.value + ' <br> <strong>Symbol:</strong> ' + suggestion.data;
                            $('#outputcontent').html(thehtml);
                        }
                    });


                });


                // AUTOCOMPLETE  DESIRED JOB TITLE END// 

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


                // AUTOCOMPLETE DESIRED JOB
                $(function(){
                    var desiredJobLocation = [
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
                    $('.resume-desired-job-location-first').autocomplete({
                      lookup: desiredJobLocation,
                      onSelect: function (suggestion) {
                        var thehtml = '<strong>Currency Name:</strong> ' + suggestion.value + ' <br> <strong>Symbol:</strong> ' + suggestion.data;
                        $('#outputcontent').html(thehtml);
                      }
                    });
                       // setup autocomplete function pulling from currencies[] array
                       $('.resume-desired-job-location-second').autocomplete({
                        lookup: desiredJobLocation,
                        onSelect: function (suggestion) {
                          var thehtml = '<strong>Currency Name:</strong> ' + suggestion.value + ' <br> <strong>Symbol:</strong> ' + suggestion.data;
                          $('#outputcontent').html(thehtml);
                        }
                      });
                         // setup autocomplete function pulling from currencies[] array
                    $('.resume-desired-job-location-third').autocomplete({
                      lookup: desiredJobLocation,
                      onSelect: function (suggestion) {
                        var thehtml = '<strong>Currency Name:</strong> ' + suggestion.value + ' <br> <strong>Symbol:</strong> ' + suggestion.data;
                        $('#outputcontent').html(thehtml);
                      }
                    });
                    
                  
                  });
                
                
                // DESIRED JOB TITLE END// 
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
            let divLicense = $('.resume__div--License').html();
            let limitLicense = document.querySelectorAll('.resume__div--item-License').length;
            if (limitLicense < 5) {
                $('.resume__form-group__all-div').append(divLicense);
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

                $('.resumeInputLicense').autocomplete({
                    lookup: license,
                    onSelect: function (suggestion) {
                        var thehtml = '<strong>Currency Name:</strong> ' + suggestion.value + ' <br> <strong>Symbol:</strong> ' + suggestion.data;
                        $('#outputcontent').html(thehtml);
                    }
                });


            });
            // LICENSE AUTOCOMPLETE END

            

            $(".resume--remove-btn").click(function () {
                console.log(this);
                $(this).closest('.resume__div--item').remove();
            });
        });



    });
    // LICENSE END
    // ADD MILITARY START
    $(document).ready(function () {
        $('#resumeAddMilitary').click(function () {
            let divAddMilitary = $('.resume__div--AddMilitary').html();
            let limitAddMilitary = document.querySelectorAll('.resume__div--item-AddMilitary').length;
            if (limitAddMilitary < 5) {
                $('.resume__form-group__all-div').append(divAddMilitary);
            }

            $(".resume--remove-btn").click(function () {
                console.log(this);
                $(this).closest('.resume__div--item').remove();
            });
        });



    });
    // ADD MILITARY END
     // AWARD START
     $(document).ready(function () {
        $('#resumeAwards').click(function () {
            let divAwards = $('.resume__div--Awards').html();
            let limitAwards = document.querySelectorAll('.resume__div--item-Awards').length;
            if (limitAwards < 5) {
                $('.resume__form-group__all-div').append(divAwards);
            }


            // Awards AUTOCOMPLETE START
            $(function () {
                var Awards = [{
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

                $('.resumeInputAwards').autocomplete({
                    lookup: Awards,
                    onSelect: function (suggestion) {
                        var thehtml = '<strong>Currency Name:</strong> ' + suggestion.value + ' <br> <strong>Symbol:</strong> ' + suggestion.data;
                        $('#outputcontent').html(thehtml);
                    }
                });


            });
            // Awards AUTOCOMPLETE END

            

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
                $('.resume__form-group__all-div').append(divGender);
                document.querySelectorAll('.resume__div--item-Gender')[0].remove();

                $('.resume__form-group__all-div').find("label.male-gender").attr("for", "male-gender");
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
                let newGender = $(".resume__form-group__all-div").find(".resume__div--item-Gender").parent().html();
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
                $('.resume__form-group__all-div').append(divAge);

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


