window.Zozoweb || (window.Zozoweb = {}),
    Zozoweb.mediaDomainName = "//Zozoweb.dktcdn.net/",
    Zozoweb.each = function(a, b) {
        for (var c = 0; c < a.length; c++) b(a[c], c)
    },
    Zozoweb.getClass = function(a) {
        return Object.prototype.toString.call(a).slice(8, -1)
    },
    Zozoweb.map = function(a, b) {
        for (var c = [], d = 0; d < a.length; d++) c.push(b(a[d], d));
        return c
    },
    Zozoweb.arrayContains = function(a, b) {
        for (var c = 0; c < a.length; c++)
            if (a[c] == b) return !0;
        return !1
    },
    Zozoweb.distinct = function(a) {
        for (var b = [], c = 0; c < a.length; c++) Zozoweb.arrayContains(b, a[c]) || b.push(a[c]);
        return b
    },
    Zozoweb.getUrlParameter = function(a) {
        var b = RegExp("[?&]" + a + "=([^&]*)").exec(window.location.search);
        return b && decodeURIComponent(b[1].replace(/\+/g, " "))
    },
    Zozoweb.uniq = function(a) {
        for (var b = [], c = 0; c < a.length; c++) Zozoweb.arrayIncludes(b, a[c]) || b.push(a[c]);
        return b
    },
    Zozoweb.arrayIncludes = function(a, b) {
        for (var c = 0; c < a.length; c++)
            if (a[c] == b) return !0;
        return !1
    },
    Zozoweb.Product = function() {
        function a(a) {
            if ("undefined" != typeof a)
                for (property in a) this[property] = a[property]
        }
        return a.prototype.optionNames = function() {
                return "Array" == Zozoweb.getClass(this.options) ? this.options : []
            },
            a.prototype.optionValues = function(a) {
                if ("undefined" == typeof this.variants) return null;
                var b = Zozoweb.map(this.variants, function(b) {
                    var c = "option" + (a + 1);
                    return "undefined" == typeof b[c] ? null : b[c]
                });
                return null == b[0] ? null : Zozoweb.distinct(b)
            },
            a.prototype.getVariant = function(a) {
                var b = null;
                return a.length != this.options.length ? null : (Zozoweb.each(this.variants, function(c) {
                    for (var d = !0, e = 0; e < a.length; e++) {
                        var f = "option" + (e + 1);
                        c[f] != a[e] && (d = !1)
                    }
                    if (d) return void(b = c)
                }), b)
            }, a.prototype.getVariantById = function(a) {
                for (var b = 0; b < this.variants.length; b++) {
                    var c = this.variants[b];
                    if (c.id == a) return c
                }
                return null
            }, a.name = "Product", a
    }(), Zozoweb.money_format = "{{amount}} VND", Zozoweb.formatMoney = function(a, b) {
        function f(a, b, c, d) {
            if ("undefined" == typeof b && (b = 2), "undefined" == typeof c && (c = "."), "undefined" == typeof d && (d = ","), "undefined" == typeof a || null == a) return 0;
            a = a.toFixed(b);
            var e = a.split("."),
                f = e[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + c),
                g = e[1] ? d + e[1] : "";
            return f + g
        }
        "string" == typeof a && (a = a.replace(/\./g, ""), a = a.replace(/\,/g, ""));
        var c = "",
            d = /\{\{\s*(\w+)\s*\}\}/,
            e = b || this.money_format;
        switch (e.match(d)[1]) {
            case "amount":
                c = f(a, 2);
                break;
            case "amount_no_decimals":
                c = f(a, 0);
                break;
            case "amount_with_comma_separator":
                c = f(a, 2, ".", ",");
                break;
            case "amount_no_decimals_with_comma_separator":
                c = f(a, 0, ".", ",")
        }
        return e.replace(d, c)
    }, Zozoweb.OptionSelectors = function() {
        function a(a, b) {
            return this.selectorDivClass = "selector-wrapper", this.selectorClass = "single-option-selector", this.variantIdFieldIdSuffix = "-variant-id", this.variantIdField = null, this.selectors = [], this.domIdPrefix = a, this.product = new Zozoweb.Product(b.product), "undefined" != typeof b.onVariantSelected ? this.onVariantSelected = b.onVariantSelected : this.onVariantSelected = function() {}, this.replaceSelector(a), this.initDropdown(), !0
        }
        return a.prototype.replaceSelector = function(a) {
            var b = document.getElementById(a),
                c = b.parentNode;
            Zozoweb.each(this.buildSelectors(), function(a) {
                c.insertBefore(a, b)
            }), b.style.display = "none", this.variantIdField = b
        }, a.prototype.buildSelectors = function() {
            for (var a = 0; a < this.product.optionNames().length; a++) {
                var b = new Zozoweb.SingleOptionSelector(this, a, this.product.optionNames()[a], this.product.optionValues(a));
                b.element.disabled = !1, this.selectors.push(b)
            }
            var c = this.selectorDivClass,
                d = this.product.optionNames(),
                e = Zozoweb.map(this.selectors, function(a) {
                    var b = document.createElement("div");
                    if (b.setAttribute("class", c), d.length > 1) {
                        var e = document.createElement("label");
                        e.htmlFor = a.element.id, e.innerHTML = a.name, b.appendChild(e)
                    }
                    return b.appendChild(a.element), b
                });
            return e
        }, a.prototype.initDropdown = function() {
            var a = {
                    initialLoad: !0
                },
                b = this.selectVariantFromDropdown(a);
            if (!b) {
                var c = this;
                setTimeout(function() {
                    c.selectVariantFromParams(a) || c.selectors[0].element.onchange(a)
                })
            }
        }, a.prototype.selectVariantFromDropdown = function(a) {
            var b = document.getElementById(this.domIdPrefix).querySelector("[selected]");
            return !!b && this.selectVariant(b.value, a)
        }, a.prototype.selectVariantFromParams = function(a) {
            var b = Zozoweb.getUrlParameter("variantid");
            return null == b && (b = Zozoweb.getUrlParameter("variantId")), this.selectVariant(b, a)
        }, a.prototype.selectVariant = function(a, b) {
            var c = this.product.getVariantById(a);
            if (null == c) return !1;
            for (var d = 0; d < this.selectors.length; d++) {
                var e = this.selectors[d].element,
                    f = e.getAttribute("data-option"),
                    g = c[f];
                null != g && this.optionExistInSelect(e, g) && (e.value = g)
            }
            return "undefined" != typeof jQuery ? jQuery(this.selectors[0].element).trigger("change", b) : this.selectors[0].element.onchange(b), !0
        }, a.prototype.optionExistInSelect = function(a, b) {
            for (var c = 0; c < a.options.length; c++)
                if (a.options[c].value == b) return !0
        }, a.prototype.updateSelectors = function(a, b) {
            var c = this.selectedValues(),
                d = this.product.getVariant(c);
            d ? (this.variantIdField.disabled = !1, this.variantIdField.value = d.id) : this.variantIdField.disabled = !0, this.onVariantSelected(d, this, b), null != this.historyState && this.historyState.onVariantChange(d, this, b)
        }, a.prototype.selectedValues = function() {
            for (var a = [], b = 0; b < this.selectors.length; b++) {
                var c = this.selectors[b].element.value;
                a.push(c)
            }
            return a
        }, a.name = "OptionSelectors", a
    }(), Zozoweb.SingleOptionSelector = function(a, b, c, d) {
        this.multiSelector = a, this.values = d, this.index = b, this.name = c, this.element = document.createElement("select");
        for (var e = 0; e < d.length; e++) {
            var f = document.createElement("option");
            f.value = d[e], f.innerHTML = d[e], this.element.appendChild(f)
        }
        return this.element.setAttribute("class", this.multiSelector.selectorClass), this.element.setAttribute("data-option", "option" + (b + 1)), this.element.id = a.domIdPrefix + "-option-" + b, this.element.onchange = function(c, d) {
            d = d || {}, a.updateSelectors(b, d)
        }, !0
    }, Zozoweb.Image = {
        preload: function(a, b) {
            for (var c = 0; c < a.length; c++) {
                var d = a[c];
                this.loadImage(this.getSizedImageUrl(d, b))
            }
        },
        loadImage: function(a) {
            (new Image).src = a
        },
        switchImage: function(a, b, c) {
            if (a && b) {
                var d = this.imageSize(b.src),
                    e = this.getSizedImageUrl(a.src, d);
                c ? c(e, a, b) : b.src = e
            }
        },
        imageSize: function(a) {
            var b = a.match(/thumb\/(1024x1024|2048x2048|pico|icon|thumb|small|compact|medium|large|grande)\//);
            return null != b ? b[1] : null
        },
        getSizedImageUrl: function(a, b) {
            if (null == b) return a;
            if ("master" == b) return this.removeProtocol(a);
            var c = a.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);
            if (null != c) {
                var d = Zozoweb.mediaDomainName + "thumb/" + b + "/";
                return this.removeProtocol(a).replace(Zozoweb.mediaDomainName, d).split("?")[0]
            }
            return null
        },
        removeProtocol: function(a) {
            return a.replace(/http(s)?:/, "")
        }
    };