function update_sticky() {
    if ($("body.sticky-header").length == 0) return;
    var e = $(".homeslider").parent(),
        t = $(".site-header"),
        n;
    n = e.next(".section");
    if (n.length) {
        n = n.offset().top;
        $(window).on("scroll", function () {
            var e = $(window).scrollTop();
            if (e > n) {
                t.addClass("sticky")
            } else {
                t.removeClass("sticky")
            }
        })
    }
}
if ("undefined" == typeof jQuery) throw new Error("Bootstrap requires jQuery"); +
function (e) {
    "use strict";

    function t() {
        var e = document.createElement("bootstrap"),
            t = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
        for (var n in t) if (void 0 !== e.style[n]) return {
            end: t[n]
        }
    }
    e.fn.emulateTransitionEnd = function (t) {
        var n = !1,
            r = this;
        e(this).one(e.support.transition.end, function () {
            n = !0
        });
        var i = function () {
                n || e(r).trigger(e.support.transition.end)
            };
        return setTimeout(i, t), this
    }, e(function () {
        e.support.transition = t()
    })
}(jQuery), +
function (e) {
    "use strict";
    var t = '[data-dismiss="alert"]',
        n = function (n) {
            e(n).on("click", t, this.close)
        };
    n.prototype.close = function (t) {
        function n() {
            s.trigger("closed.bs.alert").remove()
        }
        var r = e(this),
            i = r.attr("data-target");
        i || (i = r.attr("href"), i = i && i.replace(/.*(?=#[^\s]*$)/, ""));
        var s = e(i);
        t && t.preventDefault(), s.length || (s = r.hasClass("alert") ? r : r.parent()), s.trigger(t = e.Event("close.bs.alert")), t.isDefaultPrevented() || (s.removeClass("in"), e.support.transition && s.hasClass("fade") ? s.one(e.support.transition.end, n).emulateTransitionEnd(150) : n())
    };
    var r = e.fn.alert;
    e.fn.alert = function (t) {
        return this.each(function () {
            var r = e(this),
                i = r.data("bs.alert");
            i || r.data("bs.alert", i = new n(this)), "string" == typeof t && i[t].call(r)
        })
    }, e.fn.alert.Constructor = n, e.fn.alert.noConflict = function () {
        return e.fn.alert = r, this
    }, e(document).on("click.bs.alert.data-api", t, n.prototype.close)
}(jQuery), +
function (e) {
    "use strict";
    var t = function (n, r) {
            this.$element = e(n), this.options = e.extend({}, t.DEFAULTS, r)
        };
    t.DEFAULTS = {
        loadingText: "loading..."
    }, t.prototype.setState = function (e) {
        var t = "disabled",
            n = this.$element,
            r = n.is("input") ? "val" : "html",
            i = n.data();
        e += "Text", i.resetText || n.data("resetText", n[r]()), n[r](i[e] || this.options[e]), setTimeout(function () {
            "loadingText" == e ? n.addClass(t).attr(t, t) : n.removeClass(t).removeAttr(t)
        }, 0)
    }, t.prototype.toggle = function () {
        var e = this.$element.closest('[data-toggle="buttons"]');
        if (e.length) {
            var t = this.$element.find("input").prop("checked", !this.$element.hasClass("active")).trigger("change");
            "radio" === t.prop("type") && e.find(".active").removeClass("active")
        }
        this.$element.toggleClass("active")
    };
    var n = e.fn.button;
    e.fn.button = function (n) {
        return this.each(function () {
            var r = e(this),
                i = r.data("bs.button"),
                s = "object" == typeof n && n;
            i || r.data("bs.button", i = new t(this, s)), "toggle" == n ? i.toggle() : n && i.setState(n)
        })
    }, e.fn.button.Constructor = t, e.fn.button.noConflict = function () {
        return e.fn.button = n, this
    }, e(document).on("click.bs.button.data-api", "[data-toggle^=button]", function (t) {
        var n = e(t.target);
        n.hasClass("btn") || (n = n.closest(".btn")), n.button("toggle"), t.preventDefault()
    })
}(jQuery), +
function (e) {
    "use strict";
    var t = function (t, n) {
            this.$element = e(t), this.$indicators = this.$element.find(".carousel-indicators"), this.options = n, this.paused = this.sliding = this.interval = this.$active = this.$items = null, "hover" == this.options.pause && this.$element.on("mouseenter", e.proxy(this.pause, this)).on("mouseleave", e.proxy(this.cycle, this))
        };
    t.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0
    }, t.prototype.cycle = function (t) {
        return t || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(e.proxy(this.next, this), this.options.interval)), this
    }, t.prototype.getActiveIndex = function () {
        return this.$active = this.$element.find(".item.active"), this.$items = this.$active.parent().children(), this.$items.index(this.$active)
    }, t.prototype.to = function (t) {
        var n = this,
            r = this.getActiveIndex();
        return t > this.$items.length - 1 || 0 > t ? void 0 : this.sliding ? this.$element.one("slid", function () {
            n.to(t)
        }) : r == t ? this.pause().cycle() : this.slide(t > r ? "next" : "prev", e(this.$items[t]))
    }, t.prototype.pause = function (t) {
        return t || (this.paused = !0), this.$element.find(".next, .prev").length && e.support.transition.end && (this.$element.trigger(e.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    }, t.prototype.next = function () {
        return this.sliding ? void 0 : this.slide("next")
    }, t.prototype.prev = function () {
        return this.sliding ? void 0 : this.slide("prev")
    }, t.prototype.slide = function (t, n) {
        var r = this.$element.find(".item.active"),
            i = n || r[t](),
            s = this.interval,
            o = "next" == t ? "left" : "right",
            u = "next" == t ? "first" : "last",
            f = this;
        if (!i.length) {
            if (!this.options.wrap) return;
            i = this.$element.find(".item")[u]()
        }
        this.sliding = !0, s && this.pause();
        var l = e.Event("slide.bs.carousel", {
            relatedTarget: i[0],
            direction: o
        });
        if (!i.hasClass("active")) {
            if (this.$indicators.length && (this.$indicators.find(".active").removeClass("active"), this.$element.one("slid", function () {
                var t = e(f.$indicators.children()[f.getActiveIndex()]);
                t && t.addClass("active")
            })), e.support.transition && this.$element.hasClass("slide")) {
                if (this.$element.trigger(l), l.isDefaultPrevented()) return;
                i.addClass(t), i[0].offsetWidth, r.addClass(o), i.addClass(o), r.one(e.support.transition.end, function () {
                    i.removeClass([t, o].join(" ")).addClass("active"), r.removeClass(["active", o].join(" ")), f.sliding = !1, setTimeout(function () {
                        f.$element.trigger("slid")
                    }, 0)
                }).emulateTransitionEnd(600)
            } else {
                if (this.$element.trigger(l), l.isDefaultPrevented()) return;
                r.removeClass("active"), i.addClass("active"), this.sliding = !1, this.$element.trigger("slid")
            }
            return s && this.cycle(), this
        }
    };
    var n = e.fn.carousel;
    e.fn.carousel = function (n) {
        return this.each(function () {
            var r = e(this),
                i = r.data("bs.carousel"),
                s = e.extend({}, t.DEFAULTS, r.data(), "object" == typeof n && n),
                o = "string" == typeof n ? n : s.slide;
            i || r.data("bs.carousel", i = new t(this, s)), "number" == typeof n ? i.to(n) : o ? i[o]() : s.interval && i.pause().cycle()
        })
    }, e.fn.carousel.Constructor = t, e.fn.carousel.noConflict = function () {
        return e.fn.carousel = n, this
    }, e(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]", function (t) {
        var n, r = e(this),
            i = e(r.attr("data-target") || (n = r.attr("href")) && n.replace(/.*(?=#[^\s]+$)/, "")),
            s = e.extend({}, i.data(), r.data()),
            o = r.attr("data-slide-to");
        o && (s.interval = !1), i.carousel(s), (o = r.attr("data-slide-to")) && i.data("bs.carousel").to(o), t.preventDefault()
    }), e(window).on("load", function () {
        e('[data-ride="carousel"]').each(function () {
            var t = e(this);
            t.carousel(t.data())
        })
    })
}(jQuery), +
function (e) {
    "use strict";
    var t = function (n, r) {
            this.$element = e(n), this.options = e.extend({}, t.DEFAULTS, r), this.transitioning = null, this.options.parent && (this.$parent = e(this.options.parent)), this.options.toggle && this.toggle()
        };
    t.DEFAULTS = {
        toggle: !0
    }, t.prototype.dimension = function () {
        var e = this.$element.hasClass("width");
        return e ? "width" : "height"
    }, t.prototype.show = function () {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var t = e.Event("show.bs.collapse");
            if (this.$element.trigger(t), !t.isDefaultPrevented()) {
                var n = this.$parent && this.$parent.find("> .panel > .in");
                if (n && n.length) {
                    var r = n.data("bs.collapse");
                    if (r && r.transitioning) return;
                    n.collapse("hide"), r || n.data("bs.collapse", null)
                }
                var i = this.dimension();
                this.$element.removeClass("collapse").addClass("collapsing")[i](0), this.transitioning = 1;
                var s = function () {
                        this.$element.removeClass("collapsing").addClass("in")[i]("auto"), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                    };
                if (!e.support.transition) return s.call(this);
                var o = e.camelCase(["scroll", i].join("-"));
                this.$element.one(e.support.transition.end, e.proxy(s, this)).emulateTransitionEnd(350)[i](this.$element[0][o])
            }
        }
    }, t.prototype.hide = function () {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var t = e.Event("hide.bs.collapse");
            if (this.$element.trigger(t), !t.isDefaultPrevented()) {
                var n = this.dimension();
                this.$element[n](this.$element[n]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"), this.transitioning = 1;
                var r = function () {
                        this.transitioning = 0, this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")
                    };
                return e.support.transition ? (this.$element[n](0).one(e.support.transition.end, e.proxy(r, this)).emulateTransitionEnd(350), void 0) : r.call(this)
            }
        }
    }, t.prototype.toggle = function () {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    };
    var n = e.fn.collapse;
    e.fn.collapse = function (n) {
        return this.each(function () {
            var r = e(this),
                i = r.data("bs.collapse"),
                s = e.extend({}, t.DEFAULTS, r.data(), "object" == typeof n && n);
            i || r.data("bs.collapse", i = new t(this, s)), "string" == typeof n && i[n]()
        })
    }, e.fn.collapse.Constructor = t, e.fn.collapse.noConflict = function () {
        return e.fn.collapse = n, this
    }, e(document).on("click.bs.collapse.data-api", "[data-toggle=collapse]", function (t) {
        var n, r = e(this),
            i = r.attr("data-target") || t.preventDefault() || (n = r.attr("href")) && n.replace(/.*(?=#[^\s]+$)/, ""),
            s = e(i),
            o = s.data("bs.collapse"),
            u = o ? "toggle" : r.data(),
            f = r.attr("data-parent"),
            l = f && e(f);
        o && o.transitioning || (l && l.find('[data-toggle=collapse][data-parent="' + f + '"]').not(r).addClass("collapsed"), r[s.hasClass("in") ? "addClass" : "removeClass"]("collapsed")), s.collapse(u)
    })
}(jQuery), +
function (e) {
    "use strict";

    function t() {
        e(r).remove(), e(i).each(function (t) {
            var r = n(e(this));
            r.hasClass("open") && (r.trigger(t = e.Event("hide.bs.dropdown")), t.isDefaultPrevented() || r.removeClass("open").trigger("hidden.bs.dropdown"))
        })
    }
    function n(t) {
        var n = t.attr("data-target");
        n || (n = t.attr("href"), n = n && /#/.test(n) && n.replace(/.*(?=#[^\s]*$)/, ""));
        var r = n && e(n);
        return r && r.length ? r : t.parent()
    }
    var r = ".dropdown-backdrop",
        i = "[data-toggle=dropdown]",
        s = function (t) {
            e(t).on("click.bs.dropdown", this.toggle)
        };
    s.prototype.toggle = function (r) {
        var i = e(this);
        if (!i.is(".disabled, :disabled")) {
            var s = n(i),
                o = s.hasClass("open");
            if (t(), !o) {
                if ("ontouchstart" in document.documentElement && !s.closest(".navbar-nav").length && e('<div class="dropdown-backdrop"/>').insertAfter(e(this)).on("click", t), s.trigger(r = e.Event("show.bs.dropdown")), r.isDefaultPrevented()) return;
                s.toggleClass("open").trigger("shown.bs.dropdown"), i.focus()
            }
            return !1
        }
    }, s.prototype.keydown = function (t) {
        if (/(38|40|27)/.test(t.keyCode)) {
            var r = e(this);
            if (t.preventDefault(), t.stopPropagation(), !r.is(".disabled, :disabled")) {
                var s = n(r),
                    o = s.hasClass("open");
                if (!o || o && 27 == t.keyCode) return 27 == t.which && s.find(i).focus(), r.click();
                var u = e("[role=menu] li:not(.divider):visible a", s);
                if (u.length) {
                    var f = u.index(u.filter(":focus"));
                    38 == t.keyCode && f > 0 && f--, 40 == t.keyCode && f < u.length - 1 && f++, ~f || (f = 0), u.eq(f).focus()
                }
            }
        }
    };
    var o = e.fn.dropdown;
    e.fn.dropdown = function (t) {
        return this.each(function () {
            var n = e(this),
                r = n.data("dropdown");
            r || n.data("dropdown", r = new s(this)), "string" == typeof t && r[t].call(n)
        })
    }, e.fn.dropdown.Constructor = s, e.fn.dropdown.noConflict = function () {
        return e.fn.dropdown = o, this
    }, e(document).on("click.bs.dropdown.data-api", t).on("click.bs.dropdown.data-api", ".dropdown form", function (e) {
        e.stopPropagation()
    }).on("click.bs.dropdown.data-api", i, s.prototype.toggle).on("keydown.bs.dropdown.data-api", i + ", [role=menu]", s.prototype.keydown)
}(jQuery), +
function (e) {
    "use strict";
    var t = function (t, n) {
            this.options = n, this.$element = e(t), this.$backdrop = this.isShown = null, this.options.remote && this.$element.load(this.options.remote)
        };
    t.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, t.prototype.toggle = function (e) {
        return this[this.isShown ? "hide" : "show"](e)
    }, t.prototype.show = function (t) {
        var n = this,
            r = e.Event("show.bs.modal", {
                relatedTarget: t
            });
        this.$element.trigger(r), this.isShown || r.isDefaultPrevented() || (this.isShown = !0, this.escape(), this.$element.on("click.dismiss.modal", '[data-dismiss="modal"]', e.proxy(this.hide, this)), this.backdrop(function () {
            var r = e.support.transition && n.$element.hasClass("fade");
            n.$element.parent().length || n.$element.appendTo(document.body), n.$element.show(), r && n.$element[0].offsetWidth, n.$element.addClass("in").attr("aria-hidden", !1), n.enforceFocus();
            var i = e.Event("shown.bs.modal", {
                relatedTarget: t
            });
            r ? n.$element.find(".modal-dialog").one(e.support.transition.end, function () {
                n.$element.focus().trigger(i)
            }).emulateTransitionEnd(300) : n.$element.focus().trigger(i)
        }))
    }, t.prototype.hide = function (t) {
        t && t.preventDefault(), t = e.Event("hide.bs.modal"), this.$element.trigger(t), this.isShown && !t.isDefaultPrevented() && (this.isShown = !1, this.escape(), e(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.modal"), e.support.transition && this.$element.hasClass("fade") ? this.$element.one(e.support.transition.end, e.proxy(this.hideModal, this)).emulateTransitionEnd(300) : this.hideModal())
    }, t.prototype.enforceFocus = function () {
        e(document).off("focusin.bs.modal").on("focusin.bs.modal", e.proxy(function (e) {
            this.$element[0] === e.target || this.$element.has(e.target).length || this.$element.focus()
        }, this))
    }, t.prototype.escape = function () {
        this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.bs.modal", e.proxy(function (e) {
            27 == e.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keyup.dismiss.bs.modal")
    }, t.prototype.hideModal = function () {
        var e = this;
        this.$element.hide(), this.backdrop(function () {
            e.removeBackdrop(), e.$element.trigger("hidden.bs.modal")
        })
    }, t.prototype.removeBackdrop = function () {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
    }, t.prototype.backdrop = function (t) {
        var n = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var r = e.support.transition && n;
            if (this.$backdrop = e('<div class="modal-backdrop ' + n + '" />').appendTo(document.body), this.$element.on("click.dismiss.modal", e.proxy(function (e) {
                e.target === e.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this))
            }, this)), r && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !t) return;
            r ? this.$backdrop.one(e.support.transition.end, t).emulateTransitionEnd(150) : t()
        } else!this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), e.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(e.support.transition.end, t).emulateTransitionEnd(150) : t()) : t && t()
    };
    var n = e.fn.modal;
    e.fn.modal = function (n, r) {
        return this.each(function () {
            var i = e(this),
                s = i.data("bs.modal"),
                o = e.extend({}, t.DEFAULTS, i.data(), "object" == typeof n && n);
            s || i.data("bs.modal", s = new t(this, o)), "string" == typeof n ? s[n](r) : o.show && s.show(r)
        })
    }, e.fn.modal.Constructor = t, e.fn.modal.noConflict = function () {
        return e.fn.modal = n, this
    }, e(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (t) {
        var n = e(this),
            r = n.attr("href"),
            i = e(n.attr("data-target") || r && r.replace(/.*(?=#[^\s]+$)/, "")),
            s = i.data("modal") ? "toggle" : e.extend({
                remote: !/#/.test(r) && r
            }, i.data(), n.data());
        t.preventDefault(), i.modal(s, this).one("hide", function () {
            n.is(":visible") && n.focus()
        })
    }), e(document).on("show.bs.modal", ".modal", function () {
        e(document.body).addClass("modal-open")
    }).on("hidden.bs.modal", ".modal", function () {
        e(document.body).removeClass("modal-open")
    })
}(jQuery), +
function (e) {
    "use strict";
    var t = function (e, t) {
            this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null, this.init("tooltip", e, t)
        };
    t.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1
    }, t.prototype.init = function (t, n, r) {
        this.enabled = !0, this.type = t, this.$element = e(n), this.options = this.getOptions(r);
        for (var i = this.options.trigger.split(" "), s = i.length; s--;) {
            var o = i[s];
            if ("click" == o) this.$element.on("click." + this.type, this.options.selector, e.proxy(this.toggle, this));
            else if ("manual" != o) {
                var u = "hover" == o ? "mouseenter" : "focus",
                    f = "hover" == o ? "mouseleave" : "blur";
                this.$element.on(u + "." + this.type, this.options.selector, e.proxy(this.enter, this)), this.$element.on(f + "." + this.type, this.options.selector, e.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = e.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }, t.prototype.getDefaults = function () {
        return t.DEFAULTS
    }, t.prototype.getOptions = function (t) {
        return t = e.extend({}, this.getDefaults(), this.$element.data(), t), t.delay && "number" == typeof t.delay && (t.delay = {
            show: t.delay,
            hide: t.delay
        }), t
    }, t.prototype.getDelegateOptions = function () {
        var t = {},
            n = this.getDefaults();
        return this._options && e.each(this._options, function (e, r) {
            n[e] != r && (t[e] = r)
        }), t
    }, t.prototype.enter = function (t) {
        var n = t instanceof this.constructor ? t : e(t.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
        return clearTimeout(n.timeout), n.hoverState = "in", n.options.delay && n.options.delay.show ? (n.timeout = setTimeout(function () {
            "in" == n.hoverState && n.show()
        }, n.options.delay.show), void 0) : n.show()
    }, t.prototype.leave = function (t) {
        var n = t instanceof this.constructor ? t : e(t.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
        return clearTimeout(n.timeout), n.hoverState = "out", n.options.delay && n.options.delay.hide ? (n.timeout = setTimeout(function () {
            "out" == n.hoverState && n.hide()
        }, n.options.delay.hide), void 0) : n.hide()
    }, t.prototype.show = function () {
        var t = e.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            if (this.$element.trigger(t), t.isDefaultPrevented()) return;
            var n = this.tip();
            this.setContent(), this.options.animation && n.addClass("fade");
            var r = "function" == typeof this.options.placement ? this.options.placement.call(this, n[0], this.$element[0]) : this.options.placement,
                i = /\s?auto?\s?/i,
                s = i.test(r);
            s && (r = r.replace(i, "") || "top"), n.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(r), this.options.container ? n.appendTo(this.options.container) : n.insertAfter(this.$element);
            var o = this.getPosition(),
                u = n[0].offsetWidth,
                f = n[0].offsetHeight;
            if (s) {
                var l = this.$element.parent(),
                    c = r,
                    h = document.documentElement.scrollTop || document.body.scrollTop,
                    p = "body" == this.options.container ? window.innerWidth : l.outerWidth(),
                    d = "body" == this.options.container ? window.innerHeight : l.outerHeight(),
                    v = "body" == this.options.container ? 0 : l.offset().left;
                r = "bottom" == r && o.top + o.height + f - h > d ? "top" : "top" == r && o.top - h - f < 0 ? "bottom" : "right" == r && o.right + u > p ? "left" : "left" == r && o.left - u < v ? "right" : r, n.removeClass(c).addClass(r)
            }
            var m = this.getCalculatedOffset(r, o, u, f);
            this.applyPlacement(m, r), this.$element.trigger("shown.bs." + this.type)
        }
    }, t.prototype.applyPlacement = function (e, t) {
        var n, r = this.tip(),
            i = r[0].offsetWidth,
            s = r[0].offsetHeight,
            o = parseInt(r.css("margin-top"), 10),
            u = parseInt(r.css("margin-left"), 10);
        isNaN(o) && (o = 0), isNaN(u) && (u = 0), e.top = e.top + o, e.left = e.left + u, r.offset(e).addClass("in");
        var a = r[0].offsetWidth,
            f = r[0].offsetHeight;
        if ("top" == t && f != s && (n = !0, e.top = e.top + s - f), /bottom|top/.test(t)) {
            var l = 0;
            e.left < 0 && (l = -2 * e.left, e.left = 0, r.offset(e), a = r[0].offsetWidth, f = r[0].offsetHeight), this.replaceArrow(l - i + a, a, "left")
        } else this.replaceArrow(f - s, f, "top");
        n && r.offset(e)
    }, t.prototype.replaceArrow = function (e, t, n) {
        this.arrow().css(n, e ? 50 * (1 - e / t) + "%" : "")
    }, t.prototype.setContent = function () {
        var e = this.tip(),
            t = this.getTitle();
        e.find(".tooltip-inner")[this.options.html ? "html" : "text"](t), e.removeClass("fade in top bottom left right")
    }, t.prototype.hide = function () {
        function t() {
            "in" != n.hoverState && r.detach()
        }
        var n = this,
            r = this.tip(),
            i = e.Event("hide.bs." + this.type);
        return this.$element.trigger(i), i.isDefaultPrevented() ? void 0 : (r.removeClass("in"), e.support.transition && this.$tip.hasClass("fade") ? r.one(e.support.transition.end, t).emulateTransitionEnd(150) : t(), this.$element.trigger("hidden.bs." + this.type), this)
    }, t.prototype.fixTitle = function () {
        var e = this.$element;
        (e.attr("title") || "string" != typeof e.attr("data-original-title")) && e.attr("data-original-title", e.attr("title") || "").attr("title", "")
    }, t.prototype.hasContent = function () {
        return this.getTitle()
    }, t.prototype.getPosition = function () {
        var t = this.$element[0];
        return e.extend({}, "function" == typeof t.getBoundingClientRect ? t.getBoundingClientRect() : {
            width: t.offsetWidth,
            height: t.offsetHeight
        }, this.$element.offset())
    }, t.prototype.getCalculatedOffset = function (e, t, n, r) {
        return "bottom" == e ? {
            top: t.top + t.height,
            left: t.left + t.width / 2 - n / 2
        } : "top" == e ? {
            top: t.top - r,
            left: t.left + t.width / 2 - n / 2
        } : "left" == e ? {
            top: t.top + t.height / 2 - r / 2,
            left: t.left - n
        } : {
            top: t.top + t.height / 2 - r / 2,
            left: t.left + t.width
        }
    }, t.prototype.getTitle = function () {
        var e, t = this.$element,
            n = this.options;
        return e = t.attr("data-original-title") || ("function" == typeof n.title ? n.title.call(t[0]) : n.title)
    }, t.prototype.tip = function () {
        return this.$tip = this.$tip || e(this.options.template)
    }, t.prototype.arrow = function () {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, t.prototype.validate = function () {
        this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
    }, t.prototype.enable = function () {
        this.enabled = !0
    }, t.prototype.disable = function () {
        this.enabled = !1
    }, t.prototype.toggleEnabled = function () {
        this.enabled = !this.enabled
    }, t.prototype.toggle = function (t) {
        var n = t ? e(t.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type) : this;
        n.tip().hasClass("in") ? n.leave(n) : n.enter(n)
    }, t.prototype.destroy = function () {
        this.hide().$element.off("." + this.type).removeData("bs." + this.type)
    };
    var n = e.fn.tooltip;
    e.fn.tooltip = function (n) {
        return this.each(function () {
            var r = e(this),
                i = r.data("bs.tooltip"),
                s = "object" == typeof n && n;
            i || r.data("bs.tooltip", i = new t(this, s)), "string" == typeof n && i[n]()
        })
    }, e.fn.tooltip.Constructor = t, e.fn.tooltip.noConflict = function () {
        return e.fn.tooltip = n, this
    }
}(jQuery), +
function (e) {
    "use strict";
    var t = function (e, t) {
            this.init("popover", e, t)
        };
    if (!e.fn.tooltip) throw new Error("Popover requires tooltip.js");
    t.DEFAULTS = e.extend({}, e.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), t.prototype = e.extend({}, e.fn.tooltip.Constructor.prototype), t.prototype.constructor = t, t.prototype.getDefaults = function () {
        return t.DEFAULTS
    }, t.prototype.setContent = function () {
        var e = this.tip(),
            t = this.getTitle(),
            n = this.getContent();
        e.find(".popover-title")[this.options.html ? "html" : "text"](t), e.find(".popover-content")[this.options.html ? "html" : "text"](n), e.removeClass("fade top bottom left right in"), e.find(".popover-title").html() || e.find(".popover-title").hide()
    }, t.prototype.hasContent = function () {
        return this.getTitle() || this.getContent()
    }, t.prototype.getContent = function () {
        var e = this.$element,
            t = this.options;
        return e.attr("data-content") || ("function" == typeof t.content ? t.content.call(e[0]) : t.content)
    }, t.prototype.arrow = function () {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    }, t.prototype.tip = function () {
        return this.$tip || (this.$tip = e(this.options.template)), this.$tip
    };
    var n = e.fn.popover;
    e.fn.popover = function (n) {
        return this.each(function () {
            var r = e(this),
                i = r.data("bs.popover"),
                s = "object" == typeof n && n;
            i || r.data("bs.popover", i = new t(this, s)), "string" == typeof n && i[n]()
        })
    }, e.fn.popover.Constructor = t, e.fn.popover.noConflict = function () {
        return e.fn.popover = n, this
    }
}(jQuery), +
function (e) {
    "use strict";

    function t(n, r) {
        var i, s = e.proxy(this.process, this);
        this.$element = e(n).is("body") ? e(window) : e(n), this.$body = e("body"), this.$scrollElement = this.$element.on("scroll.bs.scroll-spy.data-api", s), this.options = e.extend({}, t.DEFAULTS, r), this.selector = (this.options.target || (i = e(n).attr("href")) && i.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a", this.offsets = e([]), this.targets = e([]), this.activeTarget = null, this.refresh(), this.process()
    }
    t.DEFAULTS = {
        offset: 10
    }, t.prototype.refresh = function () {
        var t = this.$element[0] == window ? "offset" : "position";
        this.offsets = e([]), this.targets = e([]);
        var n = this;
        this.$body.find(this.selector).map(function () {
            var r = e(this),
                i = r.data("target") || r.attr("href"),
                s = /^#\w/.test(i) && e(i);
            return s && s.length && [
                [s[t]().top + (!e.isWindow(n.$scrollElement.get(0)) && n.$scrollElement.scrollTop()), i]
            ] || null
        }).sort(function (e, t) {
            return e[0] - t[0]
        }).each(function () {
            n.offsets.push(this[0]), n.targets.push(this[1])
        })
    }, t.prototype.process = function () {
        var e, t = this.$scrollElement.scrollTop() + this.options.offset,
            n = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight,
            r = n - this.$scrollElement.height(),
            i = this.offsets,
            s = this.targets,
            o = this.activeTarget;
        if (t >= r) return o != (e = s.last()[0]) && this.activate(e);
        for (e = i.length; e--;) o != s[e] && t >= i[e] && (!i[e + 1] || t <= i[e + 1]) && this.activate(s[e])
    }, t.prototype.activate = function (t) {
        this.activeTarget = t, e(this.selector).parents(".active").removeClass("active");
        var n = this.selector + '[data-target="' + t + '"],' + this.selector + '[href="' + t + '"]',
            r = e(n).parents("li").addClass("active");
        r.parent(".dropdown-menu").length && (r = r.closest("li.dropdown").addClass("active")), r.trigger("activate")
    };
    var n = e.fn.scrollspy;
    e.fn.scrollspy = function (n) {
        return this.each(function () {
            var r = e(this),
                i = r.data("bs.scrollspy"),
                s = "object" == typeof n && n;
            i || r.data("bs.scrollspy", i = new t(this, s)), "string" == typeof n && i[n]()
        })
    }, e.fn.scrollspy.Constructor = t, e.fn.scrollspy.noConflict = function () {
        return e.fn.scrollspy = n, this
    }, e(window).on("load", function () {
        e('[data-spy="scroll"]').each(function () {
            var t = e(this);
            t.scrollspy(t.data())
        })
    })
}(jQuery), +
function (e) {
    "use strict";
    var t = function (t) {
            this.element = e(t)
        };
    t.prototype.show = function () {
        var t = this.element,
            n = t.closest("ul:not(.dropdown-menu)"),
            r = t.data("target");
        if (r || (r = t.attr("href"), r = r && r.replace(/.*(?=#[^\s]*$)/, "")), !t.parent("li").hasClass("active")) {
            var i = n.find(".active:last a")[0],
                s = e.Event("show.bs.tab", {
                    relatedTarget: i
                });
            if (t.trigger(s), !s.isDefaultPrevented()) {
                var o = e(r);
                this.activate(t.parent("li"), n), this.activate(o, o.parent(), function () {
                    t.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: i
                    })
                })
            }
        }
    }, t.prototype.activate = function (t, n, r) {
        function i() {
            s.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), t.addClass("active"), o ? (t[0].offsetWidth, t.addClass("in")) : t.removeClass("fade"), t.parent(".dropdown-menu") && t.closest("li.dropdown").addClass("active"), r && r()
        }
        var s = n.find("> .active"),
            o = r && e.support.transition && s.hasClass("fade");
        o ? s.one(e.support.transition.end, i).emulateTransitionEnd(150) : i(), s.removeClass("in")
    };
    var n = e.fn.tab;
    e.fn.tab = function (n) {
        return this.each(function () {
            var r = e(this),
                i = r.data("bs.tab");
            i || r.data("bs.tab", i = new t(this)), "string" == typeof n && i[n]()
        })
    }, e.fn.tab.Constructor = t, e.fn.tab.noConflict = function () {
        return e.fn.tab = n, this
    }, e(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function (t) {
        t.preventDefault(), e(this).tab("show")
    })
}(jQuery), +
function (e) {
    "use strict";
    var t = function (n, r) {
            this.options = e.extend({}, t.DEFAULTS, r), this.$window = e(window).on("scroll.bs.affix.data-api", e.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", e.proxy(this.checkPositionWithEventLoop, this)), this.$element = e(n), this.affixed = this.unpin = null, this.checkPosition()
        };
    t.RESET = "affix affix-top affix-bottom", t.DEFAULTS = {
        offset: 0
    }, t.prototype.checkPositionWithEventLoop = function () {
        setTimeout(e.proxy(this.checkPosition, this), 1)
    }, t.prototype.checkPosition = function () {
        if (this.$element.is(":visible")) {
            var n = e(document).height(),
                r = this.$window.scrollTop(),
                i = this.$element.offset(),
                s = this.options.offset,
                o = s.top,
                u = s.bottom;
            "object" != typeof s && (u = o = s), "function" == typeof o && (o = s.top()), "function" == typeof u && (u = s.bottom());
            var f = null != this.unpin && r + this.unpin <= i.top ? !1 : null != u && i.top + this.$element.height() >= n - u ? "bottom" : null != o && o >= r ? "top" : !1;
            this.affixed !== f && (this.unpin && this.$element.css("top", ""), this.affixed = f, this.unpin = "bottom" == f ? i.top - r : null, this.$element.removeClass(t.RESET).addClass("affix" + (f ? "-" + f : "")), "bottom" == f && this.$element.offset({
                top: document.body.offsetHeight - u - this.$element.height()
            }))
        }
    };
    var n = e.fn.affix;
    e.fn.affix = function (n) {
        return this.each(function () {
            var r = e(this),
                i = r.data("bs.affix"),
                s = "object" == typeof n && n;
            i || r.data("bs.affix", i = new t(this, s)), "string" == typeof n && i[n]()
        })
    }, e.fn.affix.Constructor = t, e.fn.affix.noConflict = function () {
        return e.fn.affix = n, this
    }, e(window).on("load", function () {
        e('[data-spy="affix"]').each(function () {
            var t = e(this),
                n = t.data();
            n.offset = n.offset || {}, n.offsetBottom && (n.offset.bottom = n.offsetBottom), n.offsetTop && (n.offset.top = n.offsetTop), t.affix(n)
        })
    })
}(jQuery);
!
function (e) {
    var t = "waitForImages";
    e.waitForImages = {
        hasImageProperties: ["backgroundImage", "listStyleImage", "borderImage", "borderCornerImage", "cursor"]
    }, e.expr[":"].uncached = function (t) {
        if (!e(t).is('img[src!=""]')) return !1;
        var n = new Image;
        return n.src = t.src, !n.complete
    }, e.fn.waitForImages = function (n, r, i) {
        var s = 0,
            o = 0;
        if (e.isPlainObject(arguments[0]) && (i = arguments[0].waitForAll, r = arguments[0].each, n = arguments[0].finished), n = n || e.noop, r = r || e.noop, i = !! i, !e.isFunction(n) || !e.isFunction(r)) throw new TypeError("An invalid callback was supplied.");
        return this.each(function () {
            var u = e(this),
                l = [],
                h = e.waitForImages.hasImageProperties || [],
                p = /url\(\s*(['"]?)(.*?)\1\s*\)/g;
            i ? u.find("*").addBack().each(function () {
                var t = e(this);
                t.is("img:uncached") && l.push({
                    src: t.attr("src"),
                    element: t[0]
                }), e.each(h, function (e, n) {
                    var r, i = t.css(n);
                    if (!i) return !0;
                    for (; r = p.exec(i);) l.push({
                        src: r[2],
                        element: t[0]
                    })
                })
            }) : u.find("img:uncached").each(function () {
                l.push({
                    src: this.src,
                    element: this
                })
            }), s = l.length, o = 0, 0 === s && n.call(u[0]), e.each(l, function (i, l) {
                var h = new Image;
                e(h).on("load." + t + " error." + t, function (e) {
                    return o++, r.call(l.element, o, s, "load" == e.type), o == s ? (n.call(u[0]), !1) : void 0
                }), h.src = l.src
            })
        })
    }
}(jQuery);
(function (e) {
    var t = e(window);
    var n = t.height();
    t.resize(function () {
        n = t.height()
    });
    e.fn.parallax = function (r, i, s) {
        function l() {
            var s = t.scrollTop();
            o.each(function () {
                var t = e(this);
                var f = t.offset().top;
                var l = u(t);
                if (f + l < s || f > s + n) {
                    return
                }
                o.css("backgroundPosition", r + " " + Math.round((a - s) * i) + "px")
            })
        }
        var o = e(this);
        var u;
        var a;
        var f = 0;
        o.each(function () {
            a = o.offset().top
        });
        if (s) {
            u = function (e) {
                return e.outerHeight(true)
            }
        } else {
            u = function (e) {
                return e.height()
            }
        }
        if (arguments.length < 1 || r === null) r = "50%";
        if (arguments.length < 2 || i === null) i = .1;
        if (arguments.length < 3 || s === null) s = true;
        t.bind("scroll", l).resize(l);
        l()
    }
})(jQuery);
(function (e) {
    function t() {
        i = false;
        for (var t = 0; t < n.length; t++) {
            var r = e(n[t]).filter(function () {
                return e(this).is(":appeared")
            });
            r.trigger("appear", [r]);
            if (u) {
                var s = u.not(r);
                s.trigger("disappear", [s])
            }
            u = r
        }
    }
    var n = [];
    var r = false;
    var i = false;
    var s = {
        interval: 250,
        force_process: false
    };
    var o = e(window);
    var u;
    e.expr[":"]["appeared"] = function (t) {
        var n = e(t);
        if (!n.is(":visible")) {
            return false
        }
        var r = o.scrollLeft();
        var i = o.scrollTop();
        var s = n.offset();
        var u = s.left;
        var a = s.top;
        if (a + n.height() >= i && a - (n.data("appear-top-offset") || 0) <= i + o.height() && u + n.width() >= r && u - (n.data("appear-left-offset") || 0) <= r + o.width()) {
            return true
        } else {
            return false
        }
    };
    e.fn.extend({
        appear: function (o) {
            var u = e.extend({}, s, o || {});
            var a = this.selector || this;
            if (!r) {
                var f = function () {
                        if (i) {
                            return
                        }
                        i = true;
                        setTimeout(t, u.interval)
                    };
                e(window).scroll(f).resize(f);
                r = true
            }
            if (u.force_process) {
                setTimeout(t, u.interval)
            }
            n.push(a);
            return e(a)
        }
    });
    e.extend({
        force_appear: function () {
            if (r) {
                t();
                return true
            }
            return false
        }
    })
})(jQuery);
(function (e) {
    function n(e) {
        return typeof e == "object" ? e : {
            top: e,
            left: e
        }
    }
    var t = e.scrollTo = function (t, n, r) {
            e(window).scrollTo(t, n, r)
        };
    t.defaults = {
        axis: "xy",
        duration: parseFloat(e.fn.jquery) >= 1.3 ? 0 : 1,
        limit: true
    };
    t.window = function (t) {
        return e(window)._scrollable()
    };
    e.fn._scrollable = function () {
        return this.map(function () {
            var t = this,
                n = !t.nodeName || e.inArray(t.nodeName.toLowerCase(), ["iframe", "#document", "html", "body"]) != -1;
            if (!n) return t;
            var r = (t.contentWindow || t).document || t.ownerDocument || t;
            return /webkit/i.test(navigator.userAgent) || r.compatMode == "BackCompat" ? r.body : r.documentElement
        })
    };
    e.fn.scrollTo = function (r, i, s) {
        if (typeof i == "object") {
            s = i;
            i = 0
        }
        if (typeof s == "function") s = {
            onAfter: s
        };
        if (r == "max") r = 9e9;
        s = e.extend({}, t.defaults, s);
        i = i || s.duration;
        s.queue = s.queue && s.axis.length > 1;
        if (s.queue) i /= 2;
        s.offset = n(s.offset);
        s.over = n(s.over);
        return this._scrollable().each(function () {
            function d(e) {
                u.animate(c, i, s.easing, e &&
                function () {
                    e.call(this, a, s)
                })
            }
            if (r == null) return;
            var o = this,
                u = e(o),
                a = r,
                l, c = {},
                p = u.is("html,body");
            switch (typeof a) {
            case "number":
            case "string":
                if (/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(a)) {
                    a = n(a);
                    break
                }
                a = e(a, this);
                if (!a.length) return;
            case "object":
                if (a.is || a.style) l = (a = e(a)).offset()
            }
            e.each(s.axis.split(""), function (e, n) {
                var r = n == "x" ? "Left" : "Top",
                    i = r.toLowerCase(),
                    f = "scroll" + r,
                    v = o[f],
                    m = t.max(o, n);
                if (l) {
                    c[f] = l[i] + (p ? 0 : v - u.offset()[i]);
                    if (s.margin) {
                        c[f] -= parseInt(a.css("margin" + r)) || 0;
                        c[f] -= parseInt(a.css("border" + r + "Width")) || 0
                    }
                    c[f] += s.offset[i] || 0;
                    if (s.over[i]) c[f] += a[n == "x" ? "width" : "height"]() * s.over[i]
                } else {
                    var y = a[i];
                    c[f] = y.slice && y.slice(-1) == "%" ? parseFloat(y) / 100 * m : y
                }
                if (s.limit && /^\d+$/.test(c[f])) c[f] = c[f] <= 0 ? 0 : Math.min(c[f], m);
                if (!e && s.queue) {
                    if (v != c[f]) d(s.onAfterFirst);
                    delete c[f]
                }
            });
            d(s.onAfter)
        }).end()
    };
    t.max = function (t, n) {
        var r = n == "x" ? "Width" : "Height",
            i = "scroll" + r;
        if (!e(t).is("html,body")) return t[i] - e(t)[r.toLowerCase()]();
        var s = "client" + r,
            o = t.ownerDocument.documentElement,
            u = t.ownerDocument.body;
        return Math.max(o[i], u[i]) - Math.min(o[s], u[s])
    }
})(jQuery);
(function () {
    var e = [].indexOf ||
    function (e) {
        for (var t = 0, n = this.length; t < n; t++) {
            if (t in this && this[t] === e) return t
        }
        return -1
    }, t = [].slice;
    (function (e, t) {
        if (typeof define === "function" && define.amd) {
            return define("waypoints", ["jquery"], function (n) {
                return t(n, e)
            })
        } else {
            return t(e.jQuery, e)
        }
    })(this, function (n, r) {
        var i, s, o, u, a, f, l, c, h, p, d, v, m, g, y, b;
        i = n(r);
        c = e.call(r, "ontouchstart") >= 0;
        u = {
            horizontal: {},
            vertical: {}
        };
        a = 1;
        l = {};
        f = "waypoints-context-id";
        d = "resize.waypoints";
        v = "scroll.waypoints";
        m = 1;
        g = "waypoints-waypoint-ids";
        y = "waypoint";
        b = "waypoints";
        s = function () {
            function e(e) {
                var t = this;
                this.$element = e;
                this.element = e[0];
                this.didResize = false;
                this.didScroll = false;
                this.id = "context" + a++;
                this.oldScroll = {
                    x: e.scrollLeft(),
                    y: e.scrollTop()
                };
                this.waypoints = {
                    horizontal: {},
                    vertical: {}
                };
                e.data(f, this.id);
                l[this.id] = this;
                e.bind(v, function () {
                    var e;
                    if (!(t.didScroll || c)) {
                        t.didScroll = true;
                        e = function () {
                            t.doScroll();
                            return t.didScroll = false
                        };
                        return r.setTimeout(e, n[b].settings.scrollThrottle)
                    }
                });
                e.bind(d, function () {
                    var e;
                    if (!t.didResize) {
                        t.didResize = true;
                        e = function () {
                            n[b]("refresh");
                            return t.didResize = false
                        };
                        return r.setTimeout(e, n[b].settings.resizeThrottle)
                    }
                })
            }
            e.prototype.doScroll = function () {
                var e, t = this;
                e = {
                    horizontal: {
                        newScroll: this.$element.scrollLeft(),
                        oldScroll: this.oldScroll.x,
                        forward: "right",
                        backward: "left"
                    },
                    vertical: {
                        newScroll: this.$element.scrollTop(),
                        oldScroll: this.oldScroll.y,
                        forward: "down",
                        backward: "up"
                    }
                };
                if (c && (!e.vertical.oldScroll || !e.vertical.newScroll)) {
                    n[b]("refresh")
                }
                n.each(e, function (e, r) {
                    var i, s, o;
                    o = [];
                    s = r.newScroll > r.oldScroll;
                    i = s ? r.forward : r.backward;
                    n.each(t.waypoints[e], function (e, t) {
                        var n, i;
                        if (r.oldScroll < (n = t.offset) && n <= r.newScroll) {
                            return o.push(t)
                        } else if (r.newScroll < (i = t.offset) && i <= r.oldScroll) {
                            return o.push(t)
                        }
                    });
                    o.sort(function (e, t) {
                        return e.offset - t.offset
                    });
                    if (!s) {
                        o.reverse()
                    }
                    return n.each(o, function (e, t) {
                        if (t.options.continuous || e === o.length - 1) {
                            return t.trigger([i])
                        }
                    })
                });
                return this.oldScroll = {
                    x: e.horizontal.newScroll,
                    y: e.vertical.newScroll
                }
            };
            e.prototype.refresh = function () {
                var e, t, r, i = this;
                r = n.isWindow(this.element);
                t = this.$element.offset();
                this.doScroll();
                e = {
                    horizontal: {
                        contextOffset: r ? 0 : t.left,
                        contextScroll: r ? 0 : this.oldScroll.x,
                        contextDimension: this.$element.width(),
                        oldScroll: this.oldScroll.x,
                        forward: "right",
                        backward: "left",
                        offsetProp: "left"
                    },
                    vertical: {
                        contextOffset: r ? 0 : t.top,
                        contextScroll: r ? 0 : this.oldScroll.y,
                        contextDimension: r ? n[b]("viewportHeight") : this.$element.height(),
                        oldScroll: this.oldScroll.y,
                        forward: "down",
                        backward: "up",
                        offsetProp: "top"
                    }
                };
                return n.each(e, function (e, t) {
                    return n.each(i.waypoints[e], function (e, r) {
                        var i, s, o, u, a;
                        i = r.options.offset;
                        o = r.offset;
                        s = n.isWindow(r.element) ? 0 : r.$element.offset()[t.offsetProp];
                        if (n.isFunction(i)) {
                            i = i.apply(r.element)
                        } else if (typeof i === "string") {
                            i = parseFloat(i);
                            if (r.options.offset.indexOf("%") > -1) {
                                i = Math.ceil(t.contextDimension * i / 100)
                            }
                        }
                        r.offset = s - t.contextOffset + t.contextScroll - i;
                        if (r.options.onlyOnScroll && o != null || !r.enabled) {
                            return
                        }
                        if (o !== null && o < (u = t.oldScroll) && u <= r.offset) {
                            return r.trigger([t.backward])
                        } else if (o !== null && o > (a = t.oldScroll) && a >= r.offset) {
                            return r.trigger([t.forward])
                        } else if (o === null && t.oldScroll >= r.offset) {
                            return r.trigger([t.forward])
                        }
                    })
                })
            };
            e.prototype.checkEmpty = function () {
                if (n.isEmptyObject(this.waypoints.horizontal) && n.isEmptyObject(this.waypoints.vertical)) {
                    this.$element.unbind([d, v].join(" "));
                    return delete l[this.id]
                }
            };
            return e
        }();
        o = function () {
            function e(e, t, r) {
                var i, s;
                r = n.extend({}, n.fn[y].defaults, r);
                if (r.offset === "bottom-in-view") {
                    r.offset = function () {
                        var e;
                        e = n[b]("viewportHeight");
                        if (!n.isWindow(t.element)) {
                            e = t.$element.height()
                        }
                        return e - n(this).outerHeight()
                    }
                }
                this.$element = e;
                this.element = e[0];
                this.axis = r.horizontal ? "horizontal" : "vertical";
                this.callback = r.handler;
                this.context = t;
                this.enabled = r.enabled;
                this.id = "waypoints" + m++;
                this.offset = null;
                this.options = r;
                t.waypoints[this.axis][this.id] = this;
                u[this.axis][this.id] = this;
                i = (s = e.data(g)) != null ? s : [];
                i.push(this.id);
                e.data(g, i)
            }
            e.prototype.trigger = function (e) {
                if (!this.enabled) {
                    return
                }
                if (this.callback != null) {
                    this.callback.apply(this.element, e)
                }
                if (this.options.triggerOnce) {
                    return this.destroy()
                }
            };
            e.prototype.disable = function () {
                return this.enabled = false
            };
            e.prototype.enable = function () {
                this.context.refresh();
                return this.enabled = true
            };
            e.prototype.destroy = function () {
                delete u[this.axis][this.id];
                delete this.context.waypoints[this.axis][this.id];
                return this.context.checkEmpty()
            };
            e.getWaypointsByElement = function (e) {
                var t, r;
                r = n(e).data(g);
                if (!r) {
                    return []
                }
                t = n.extend({}, u.horizontal, u.vertical);
                return n.map(r, function (e) {
                    return t[e]
                })
            };
            return e
        }();
        p = {
            init: function (e, t) {
                var r;
                if (t == null) {
                    t = {}
                }
                if ((r = t.handler) == null) {
                    t.handler = e
                }
                this.each(function () {
                    var e, r, i, u;
                    e = n(this);
                    i = (u = t.context) != null ? u : n.fn[y].defaults.context;
                    if (!n.isWindow(i)) {
                        i = e.closest(i)
                    }
                    i = n(i);
                    r = l[i.data(f)];
                    if (!r) {
                        r = new s(i)
                    }
                    return new o(e, r, t)
                });
                n[b]("refresh");
                return this
            },
            disable: function () {
                return p._invoke(this, "disable")
            },
            enable: function () {
                return p._invoke(this, "enable")
            },
            destroy: function () {
                return p._invoke(this, "destroy")
            },
            prev: function (e, t) {
                return p._traverse.call(this, e, t, function (e, t, n) {
                    if (t > 0) {
                        return e.push(n[t - 1])
                    }
                })
            },
            next: function (e, t) {
                return p._traverse.call(this, e, t, function (e, t, n) {
                    if (t < n.length - 1) {
                        return e.push(n[t + 1])
                    }
                })
            },
            _traverse: function (e, t, i) {
                var s, o;
                if (e == null) {
                    e = "vertical"
                }
                if (t == null) {
                    t = r
                }
                o = h.aggregate(t);
                s = [];
                this.each(function () {
                    var t;
                    t = n.inArray(this, o[e]);
                    return i(s, t, o[e])
                });
                return this.pushStack(s)
            },
            _invoke: function (e, t) {
                e.each(function () {
                    var e;
                    e = o.getWaypointsByElement(this);
                    return n.each(e, function (e, n) {
                        n[t]();
                        return true
                    })
                });
                return this
            }
        };
        n.fn[y] = function () {
            var e, r;
            r = arguments[0], e = 2 <= arguments.length ? t.call(arguments, 1) : [];
            if (p[r]) {
                return p[r].apply(this, e)
            } else if (n.isFunction(r)) {
                return p.init.apply(this, arguments)
            } else if (n.isPlainObject(r)) {
                return p.init.apply(this, [null, r])
            } else if (!r) {
                return n.error("jQuery Waypoints needs a callback function or handler option.")
            } else {
                return n.error("The " + r + " method does not exist in jQuery Waypoints.")
            }
        };
        n.fn[y].defaults = {
            context: r,
            continuous: true,
            enabled: true,
            horizontal: false,
            offset: 0,
            triggerOnce: false
        };
        h = {
            refresh: function () {
                return n.each(l, function (e, t) {
                    return t.refresh()
                })
            },
            viewportHeight: function () {
                var e;
                return (e = r.innerHeight) != null ? e : i.height()
            },
            aggregate: function (e) {
                var t, r, i;
                t = u;
                if (e) {
                    t = (i = l[n(e).data(f)]) != null ? i.waypoints : void 0
                }
                if (!t) {
                    return []
                }
                r = {
                    horizontal: [],
                    vertical: []
                };
                n.each(r, function (e, i) {
                    n.each(t[e], function (e, t) {
                        return i.push(t)
                    });
                    i.sort(function (e, t) {
                        return e.offset - t.offset
                    });
                    r[e] = n.map(i, function (e) {
                        return e.element
                    });
                    return r[e] = n.unique(r[e])
                });
                return r
            },
            above: function (e) {
                if (e == null) {
                    e = r
                }
                return h._filter(e, "vertical", function (e, t) {
                    return t.offset <= e.oldScroll.y
                })
            },
            below: function (e) {
                if (e == null) {
                    e = r
                }
                return h._filter(e, "vertical", function (e, t) {
                    return t.offset > e.oldScroll.y
                })
            },
            left: function (e) {
                if (e == null) {
                    e = r
                }
                return h._filter(e, "horizontal", function (e, t) {
                    return t.offset <= e.oldScroll.x
                })
            },
            right: function (e) {
                if (e == null) {
                    e = r
                }
                return h._filter(e, "horizontal", function (e, t) {
                    return t.offset > e.oldScroll.x
                })
            },
            enable: function () {
                return h._invoke("enable")
            },
            disable: function () {
                return h._invoke("disable")
            },
            destroy: function () {
                return h._invoke("destroy")
            },
            extendFn: function (e, t) {
                return p[e] = t
            },
            _invoke: function (e) {
                var t;
                t = n.extend({}, u.vertical, u.horizontal);
                return n.each(t, function (t, n) {
                    n[e]();
                    return true
                })
            },
            _filter: function (e, t, r) {
                var i, s;
                i = l[n(e).data(f)];
                if (!i) {
                    return []
                }
                s = [];
                n.each(i.waypoints[t], function (e, t) {
                    if (r(i, t)) {
                        return s.push(t)
                    }
                });
                s.sort(function (e, t) {
                    return e.offset - t.offset
                });
                return n.map(s, function (e) {
                    return e.element
                })
            }
        };
        n[b] = function () {
            var e, n;
            n = arguments[0], e = 2 <= arguments.length ? t.call(arguments, 1) : [];
            if (h[n]) {
                return h[n].apply(null, e)
            } else {
                return h.aggregate.call(null, n)
            }
        };
        n[b].settings = {
            resizeThrottle: 100,
            scrollThrottle: 30
        };
        return i.load(function () {
            return n[b]("refresh")
        })
    })
}).call(this);
(function (e) {
    e.fn.hoverIntent = function (t, n, r) {
        var i = {
            interval: 100,
            sensitivity: 7,
            timeout: 0
        };
        if (typeof t === "object") {
            i = e.extend(i, t)
        } else if (e.isFunction(n)) {
            i = e.extend(i, {
                over: t,
                out: n,
                selector: r
            })
        } else {
            i = e.extend(i, {
                over: t,
                out: t,
                selector: n
            })
        }
        var s, o, u, a;
        var f = function (e) {
                s = e.pageX;
                o = e.pageY
            };
        var l = function (t, n) {
                n.hoverIntent_t = clearTimeout(n.hoverIntent_t);
                if (Math.abs(u - s) + Math.abs(a - o) < i.sensitivity) {
                    e(n).off("mousemove.hoverIntent", f);
                    n.hoverIntent_s = 1;
                    return i.over.apply(n, [t])
                } else {
                    u = s;
                    a = o;
                    n.hoverIntent_t = setTimeout(function () {
                        l(t, n)
                    }, i.interval)
                }
            };
        var c = function (e, t) {
                t.hoverIntent_t = clearTimeout(t.hoverIntent_t);
                t.hoverIntent_s = 0;
                return i.out.apply(t, [e])
            };
        var h = function (t) {
                var n = jQuery.extend({}, t);
                var r = this;
                if (r.hoverIntent_t) {
                    r.hoverIntent_t = clearTimeout(r.hoverIntent_t)
                }
                if (t.type == "mouseenter") {
                    u = n.pageX;
                    a = n.pageY;
                    e(r).on("mousemove.hoverIntent", f);
                    if (r.hoverIntent_s != 1) {
                        r.hoverIntent_t = setTimeout(function () {
                            l(n, r)
                        }, i.interval)
                    }
                } else {
                    e(r).off("mousemove.hoverIntent", f);
                    if (r.hoverIntent_s == 1) {
                        r.hoverIntent_t = setTimeout(function () {
                            c(n, r)
                        }, i.timeout)
                    }
                }
            };
        return this.on({
            "mouseenter.hoverIntent": h,
            "mouseleave.hoverIntent": h
        }, i.selector)
    }
})(jQuery);
jQuery.easing["jswing"] = jQuery.easing["swing"];
jQuery.extend(jQuery.easing, {
    def: "easeOutQuad",
    swing: function (e, t, n, r, i) {
        return jQuery.easing[jQuery.easing.def](e, t, n, r, i)
    },
    easeInQuad: function (e, t, n, r, i) {
        return r * (t /= i) * t + n
    },
    easeOutQuad: function (e, t, n, r, i) {
        return -r * (t /= i) * (t - 2) + n
    },
    easeInOutQuad: function (e, t, n, r, i) {
        if ((t /= i / 2) < 1) return r / 2 * t * t + n;
        return -r / 2 * (--t * (t - 2) - 1) + n
    },
    easeInCubic: function (e, t, n, r, i) {
        return r * (t /= i) * t * t + n
    },
    easeOutCubic: function (e, t, n, r, i) {
        return r * ((t = t / i - 1) * t * t + 1) + n
    },
    easeInOutCubic: function (e, t, n, r, i) {
        if ((t /= i / 2) < 1) return r / 2 * t * t * t + n;
        return r / 2 * ((t -= 2) * t * t + 2) + n
    },
    easeInQuart: function (e, t, n, r, i) {
        return r * (t /= i) * t * t * t + n
    },
    easeOutQuart: function (e, t, n, r, i) {
        return -r * ((t = t / i - 1) * t * t * t - 1) + n
    },
    easeInOutQuart: function (e, t, n, r, i) {
        if ((t /= i / 2) < 1) return r / 2 * t * t * t * t + n;
        return -r / 2 * ((t -= 2) * t * t * t - 2) + n
    },
    easeInQuint: function (e, t, n, r, i) {
        return r * (t /= i) * t * t * t * t + n
    },
    easeOutQuint: function (e, t, n, r, i) {
        return r * ((t = t / i - 1) * t * t * t * t + 1) + n
    },
    easeInOutQuint: function (e, t, n, r, i) {
        if ((t /= i / 2) < 1) return r / 2 * t * t * t * t * t + n;
        return r / 2 * ((t -= 2) * t * t * t * t + 2) + n
    },
    easeInSine: function (e, t, n, r, i) {
        return -r * Math.cos(t / i * (Math.PI / 2)) + r + n
    },
    easeOutSine: function (e, t, n, r, i) {
        return r * Math.sin(t / i * (Math.PI / 2)) + n
    },
    easeInOutSine: function (e, t, n, r, i) {
        return -r / 2 * (Math.cos(Math.PI * t / i) - 1) + n
    },
    easeInExpo: function (e, t, n, r, i) {
        return t == 0 ? n : r * Math.pow(2, 10 * (t / i - 1)) + n
    },
    easeOutExpo: function (e, t, n, r, i) {
        return t == i ? n + r : r * (-Math.pow(2, -10 * t / i) + 1) + n
    },
    easeInOutExpo: function (e, t, n, r, i) {
        if (t == 0) return n;
        if (t == i) return n + r;
        if ((t /= i / 2) < 1) return r / 2 * Math.pow(2, 10 * (t - 1)) + n;
        return r / 2 * (-Math.pow(2, -10 * --t) + 2) + n
    },
    easeInCirc: function (e, t, n, r, i) {
        return -r * (Math.sqrt(1 - (t /= i) * t) - 1) + n
    },
    easeOutCirc: function (e, t, n, r, i) {
        return r * Math.sqrt(1 - (t = t / i - 1) * t) + n
    },
    easeInOutCirc: function (e, t, n, r, i) {
        if ((t /= i / 2) < 1) return -r / 2 * (Math.sqrt(1 - t * t) - 1) + n;
        return r / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + n
    },
    easeInElastic: function (e, t, n, r, i) {
        var s = 1.70158;
        var o = 0;
        var u = r;
        if (t == 0) return n;
        if ((t /= i) == 1) return n + r;
        if (!o) o = i * .3;
        if (u < Math.abs(r)) {
            u = r;
            var s = o / 4
        } else var s = o / (2 * Math.PI) * Math.asin(r / u);
        return -(u * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * i - s) * 2 * Math.PI / o)) + n
    },
    easeOutElastic: function (e, t, n, r, i) {
        var s = 1.70158;
        var o = 0;
        var u = r;
        if (t == 0) return n;
        if ((t /= i) == 1) return n + r;
        if (!o) o = i * .3;
        if (u < Math.abs(r)) {
            u = r;
            var s = o / 4
        } else var s = o / (2 * Math.PI) * Math.asin(r / u);
        return u * Math.pow(2, -10 * t) * Math.sin((t * i - s) * 2 * Math.PI / o) + r + n
    },
    easeInOutElastic: function (e, t, n, r, i) {
        var s = 1.70158;
        var o = 0;
        var u = r;
        if (t == 0) return n;
        if ((t /= i / 2) == 2) return n + r;
        if (!o) o = i * .3 * 1.5;
        if (u < Math.abs(r)) {
            u = r;
            var s = o / 4
        } else var s = o / (2 * Math.PI) * Math.asin(r / u);
        if (t < 1) return -.5 * u * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * i - s) * 2 * Math.PI / o) + n;
        return u * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * i - s) * 2 * Math.PI / o) * .5 + r + n
    },
    easeInBack: function (e, t, n, r, i, s) {
        if (s == undefined) s = 1.70158;
        return r * (t /= i) * t * ((s + 1) * t - s) + n
    },
    easeOutBack: function (e, t, n, r, i, s) {
        if (s == undefined) s = 1.70158;
        return r * ((t = t / i - 1) * t * ((s + 1) * t + s) + 1) + n
    },
    easeInOutBack: function (e, t, n, r, i, s) {
        if (s == undefined) s = 1.70158;
        if ((t /= i / 2) < 1) return r / 2 * t * t * (((s *= 1.525) + 1) * t - s) + n;
        return r / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + n
    },
    easeInBounce: function (e, t, n, r, i) {
        return r - jQuery.easing.easeOutBounce(e, i - t, 0, r, i) + n
    },
    easeOutBounce: function (e, t, n, r, i) {
        if ((t /= i) < 1 / 2.75) {
            return r * 7.5625 * t * t + n
        } else if (t < 2 / 2.75) {
            return r * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + n
        } else if (t < 2.5 / 2.75) {
            return r * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + n
        } else {
            return r * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + n
        }
    },
    easeInOutBounce: function (e, t, n, r, i) {
        if (t < i / 2) return jQuery.easing.easeInBounce(e, t * 2, 0, r, i) * .5 + n;
        return jQuery.easing.easeOutBounce(e, t * 2 - i, 0, r, i) * .5 + r * .5 + n
    }
});
(function (e) {
    var t = e.event,
        n, r = {
            _: 0
        },
        i = 0,
        s, o;
    n = t.special.throttledresize = {
        setup: function () {
            e(this).on("resize", n.handler)
        },
        teardown: function () {
            e(this).off("resize", n.handler)
        },
        handler: function (u, a) {
            var f = this,
                l = arguments;
            s = true;
            if (!o) {
                setInterval(function () {
                    i++;
                    if (i > n.threshold && s || a) {
                        u.type = "throttledresize";
                        t.dispatch.apply(f, l);
                        s = false;
                        i = 0
                    }
                    if (i > 9) {
                        e(r).stop();
                        o = false;
                        i = 0
                    }
                }, 30);
                o = true
            }
        },
        threshold: 0
    }
})(jQuery);
(function (e) {
    var t = e.event,
        n, r;
    n = t.special.debouncedresize = {
        setup: function () {
            e(this).on("resize", n.handler)
        },
        teardown: function () {
            e(this).off("resize", n.handler)
        },
        handler: function (e, i) {
            var s = this,
                o = arguments,
                u = function () {
                    e.type = "debouncedresize";
                    t.dispatch.apply(s, o)
                };
            if (r) {
                clearTimeout(r)
            }
            i ? u() : r = setTimeout(u, n.threshold)
        },
        threshold: 150
    }
})(jQuery);
(function () {
    function e(e) {
        this.path = e;
        var t = this.path.split("."),
            n = t.slice(0, t.length - 1).join("."),
            r = t[t.length - 1];
        this.at_2x_path = n + "@2x." + r
    }
    function t(t) {
        this.el = t, this.path = new e(this.el.getAttribute("src"));
        var n = this;
        this.path.check_2x_variant(function (e) {
            e && n.swap()
        })
    }
    var n = typeof exports == "undefined" ? window : exports;
    n.RetinaImagePath = e, e.confirmed_paths = [], e.prototype.is_external = function () {
        return !!this.path.match(/^https?\:/i) && !this.path.match("//" + document.domain)
    }, e.prototype.check_2x_variant = function (t) {
        var n, r = this;
        if (this.is_external()) return t(!1);
        if (this.at_2x_path in e.confirmed_paths) return t(!0);
        n = new XMLHttpRequest, n.open("HEAD", this.at_2x_path), n.onreadystatechange = function () {
            return n.readyState != 4 ? t(!1) : n.status >= 200 && n.status <= 399 ? (e.confirmed_paths.push(r.at_2x_path), t(!0)) : t(!1)
        }, n.send()
    }, n.RetinaImage = t, t.prototype.swap = function (e) {
        function t() {
            n.el.complete ? (n.el.setAttribute("width", n.el.offsetWidth), n.el.setAttribute("height", n.el.offsetHeight), n.el.setAttribute("src", e)) : setTimeout(t, 5)
        }
        typeof e == "undefined" && (e = this.path.at_2x_path);
        var n = this;
        t()
    }, n.devicePixelRatio > 1 && (window.onload = function () {
        var e = document.getElementsByTagName("img"),
            n = [],
            r, i;
        for (r = 0; r < e.length; r++) i = e[r], n.push(new t(i))
    })
})();
(function (e) {
    e.extend({
        browserSelector: function () {
            var e = navigator.userAgent,
                t = e.toLowerCase(),
                n = function (e) {
                    return t.indexOf(e) > -1
                },
                r = "gecko",
                i = "webkit",
                s = "safari",
                o = "opera",
                u = document.documentElement,
                a = [!/opera|webtv/i.test(t) && /msie\s(\d)/.test(t) ? "ie ie" + parseFloat(navigator.appVersion.split("MSIE")[1]) : n("firefox/2") ? r + " ff2" : n("firefox/3.5") ? r + " ff3 ff3_5" : n("firefox/3") ? r + " ff3" : n("gecko/") ? r : n("opera") ? o + (/version\/(\d+)/.test(t) ? " " + o + RegExp.jQuery1 : /opera(\s|\/)(\d+)/.test(t) ? " " + o + RegExp.jQuery2 : "") : n("konqueror") ? "konqueror" : n("chrome") ? i + " chrome" : n("iron") ? i + " iron" : n("applewebkit/") ? i + " " + s + (/version\/(\d+)/.test(t) ? " " + s + RegExp.jQuery1 : "") : n("mozilla/") ? r : "", n("j2me") ? "mobile" : n("iphone") ? "iphone" : n("ipod") ? "ipod" : n("mac") ? "mac" : n("darwin") ? "mac" : n("webtv") ? "webtv" : n("win") ? "win" : n("freebsd") ? "freebsd" : n("x11") || n("linux") ? "linux" : "", "js"];
            c = a.join(" ");
            u.className += " " + c
        },
        smoothScroll: function () {
            function e() {
                var e = false;
                if (document.URL.indexOf("google.com/reader/view") > -1) {
                    e = true
                }
                if (g.excluded) {
                    var t = g.excluded.split(/[,\n] ?/);
                    t.push("mail.google.com");
                    for (var n = t.length; n--;) {
                        if (document.URL.indexOf(t[n]) > -1) {
                            T && T.disconnect();
                            f("mousewheel", r);
                            e = true;
                            y = true;
                            break
                        }
                    }
                }
                if (e) {
                    f("keydown", i)
                }
                if (g.keyboardSupport && !e) {
                    a("keydown", i)
                }
            }
            function t() {
                if (!document.body) return;
                var t = document.body;
                var n = document.documentElement;
                var r = window.innerHeight;
                var i = t.scrollHeight;
                S = document.compatMode.indexOf("CSS") >= 0 ? n : t;
                x = t;
                e();
                E = true;
                if (top != self) {
                    b = true
                } else if (i > r && (t.offsetHeight <= r || n.offsetHeight <= r)) {
                    var s = false;
                    var o = function () {
                            if (!s && n.scrollHeight != document.height) {
                                s = true;
                                setTimeout(function () {
                                    n.style.height = document.height + "px";
                                    s = false
                                }, 500)
                            }
                        };
                    n.style.height = "auto";
                    setTimeout(o, 10);
                    var u = {
                        attributes: true,
                        childList: true,
                        characterData: false
                    };
                    T = new P(o);
                    T.observe(t, u);
                    if (S.offsetHeight <= r) {
                        var a = document.createElement("div");
                        a.style.clear = "both";
                        t.appendChild(a)
                    }
                }
                if (document.URL.indexOf("mail.google.com") > -1) {
                    var f = document.createElement("style");
                    f.innerHTML = ".iu { visibility: hidden }";
                    (document.getElementsByTagName("head")[0] || n).appendChild(f)
                } else if (document.URL.indexOf("www.facebook.com") > -1) {
                    var l = document.getElementById("home_stream");
                    l && (l.style.webkitTransform = "translateZ(0)")
                }
                if (!g.fixedBackground && !y) {
                    t.style.backgroundAttachment = "scroll";
                    n.style.backgroundAttachment = "scroll"
                }
            }
            function n(e, t, n, r) {
                r || (r = 1e3);
                c(t, n);
                if (g.accelerationMax != 1) {
                    var i = +(new Date);
                    var s = i - A;
                    if (s < g.accelerationDelta) {
                        var o = (1 + 30 / s) / 2;
                        if (o > 1) {
                            o = Math.min(o, g.accelerationMax);
                            t *= o;
                            n *= o
                        }
                    }
                    A = +(new Date)
                }
                k.push({
                    x: t,
                    y: n,
                    lastX: t < 0 ? .99 : -.99,
                    lastY: n < 0 ? .99 : -.99,
                    start: +(new Date)
                });
                if (L) {
                    return
                }
                var u = e === document.body;
                var a = function (i) {
                        var s = +(new Date);
                        var o = 0;
                        var f = 0;
                        for (var l = 0; l < k.length; l++) {
                            var c = k[l];
                            var h = s - c.start;
                            var p = h >= g.animationTime;
                            var d = p ? 1 : h / g.animationTime;
                            if (g.pulseAlgorithm) {
                                d = v(d)
                            }
                            var m = c.x * d - c.lastX >> 0;
                            var y = c.y * d - c.lastY >> 0;
                            o += m;
                            f += y;
                            c.lastX += m;
                            c.lastY += y;
                            if (p) {
                                k.splice(l, 1);
                                l--
                            }
                        }
                        if (u) {
                            window.scrollBy(o, f)
                        } else {
                            if (o) e.scrollLeft += o;
                            if (f) e.scrollTop += f
                        }
                        if (!t && !n) {
                            k = []
                        }
                        if (k.length) {
                            D(a, e, r / g.frameRate + 1)
                        } else {
                            L = false
                        }
                    };
                D(a, e, 0);
                L = true
            }
            function r(e) {
                if (!E) {
                    t()
                }
                var r = e.target;
                var i = u(r);
                if (!i || e.defaultPrevented || l(x, "embed") || l(r, "embed") && /\.pdf/i.test(r.src)) {
                    return true
                }
                var s = e.wheelDeltaX || 0;
                var o = e.wheelDeltaY || 0;
                if (!s && !o) {
                    o = e.wheelDelta || 0
                }
                if (!g.touchpadSupport && h(o)) {
                    return true
                }
                if (Math.abs(s) > 1.2) {
                    s *= g.stepSize / 120
                }
                if (Math.abs(o) > 1.2) {
                    o *= g.stepSize / 120
                }
                n(i, -s, -o);
                e.preventDefault()
            }
            function i(e) {
                var t = e.target;
                var r = e.ctrlKey || e.altKey || e.metaKey || e.shiftKey && e.keyCode !== C.spacebar;
                if (/input|textarea|select|embed/i.test(t.nodeName) || t.isContentEditable || e.defaultPrevented || r) {
                    return true
                }
                if (l(t, "button") && e.keyCode === C.spacebar) {
                    return true
                }
                var i, s = 0,
                    o = 0;
                var a = u(x);
                var f = a.clientHeight;
                if (a == document.body) {
                    f = window.innerHeight
                }
                switch (e.keyCode) {
                case C.up:
                    o = -g.arrowScroll;
                    break;
                case C.down:
                    o = g.arrowScroll;
                    break;
                case C.spacebar:
                    i = e.shiftKey ? 1 : -1;
                    o = -i * f * .9;
                    break;
                case C.pageup:
                    o = -f * .9;
                    break;
                case C.pagedown:
                    o = f * .9;
                    break;
                case C.home:
                    o = -a.scrollTop;
                    break;
                case C.end:
                    var c = a.scrollHeight - a.scrollTop - f;
                    o = c > 0 ? c + 10 : 0;
                    break;
                case C.left:
                    s = -g.arrowScroll;
                    break;
                case C.right:
                    s = g.arrowScroll;
                    break;
                default:
                    return true
                }
                n(a, s, o);
                e.preventDefault()
            }
            function s(e) {
                x = e.target
            }
            function o(e, t) {
                for (var n = e.length; n--;) O[M(e[n])] = t;
                return t
            }
            function u(e) {
                var t = [];
                var n = S.scrollHeight;
                do {
                    var r = O[M(e)];
                    if (r) {
                        return o(t, r)
                    }
                    t.push(e);
                    if (n === e.scrollHeight) {
                        if (!b || S.clientHeight + 10 < n) {
                            return o(t, document.body)
                        }
                    } else if (e.clientHeight + 10 < e.scrollHeight) {
                        overflow = getComputedStyle(e, "").getPropertyValue("overflow-y");
                        if (overflow === "scroll" || overflow === "auto") {
                            return o(t, e)
                        }
                    }
                } while (e = e.parentNode)
            }
            function a(e, t, n) {
                window.addEventListener(e, t, n || false)
            }
            function f(e, t, n) {
                window.removeEventListener(e, t, n || false)
            }
            function l(e, t) {
                return (e.nodeName || "").toLowerCase() === t.toLowerCase()
            }
            function c(e, t) {
                e = e > 0 ? 1 : -1;
                t = t > 0 ? 1 : -1;
                if (w.x !== e || w.y !== t) {
                    w.x = e;
                    w.y = t;
                    k = [];
                    A = 0
                }
            }
            function h(e) {
                if (!e) return;
                e = Math.abs(e);
                N.push(e);
                N.shift();
                clearTimeout(_);
                var t = N[0] == N[1] && N[1] == N[2];
                var n = p(N[0], 120) && p(N[1], 120) && p(N[2], 120);
                return !(t || n)
            }
            function p(e, t) {
                return Math.floor(e / t) == e / t
            }
            function d(e) {
                var t, n, r;
                e = e * g.pulseScale;
                if (e < 1) {
                    t = e - (1 - Math.exp(-e))
                } else {
                    n = Math.exp(-1);
                    e -= 1;
                    r = 1 - Math.exp(-e);
                    t = n + r * (1 - n)
                }
                return t * g.pulseNormalize
            }
            function v(e) {
                if (e >= 1) return 1;
                if (e <= 0) return 0;
                if (g.pulseNormalize == 1) {
                    g.pulseNormalize /= d(1)
                }
                return d(e)
            }
            var m = {
                frameRate: 150,
                animationTime: 700,
                stepSize: 120,
                pulseAlgorithm: true,
                pulseScale: 8,
                pulseNormalize: 1,
                accelerationDelta: 20,
                accelerationMax: 1,
                keyboardSupport: true,
                arrowScroll: 50,
                touchpadSupport: true,
                fixedBackground: true,
                excluded: ""
            };
            var g = m;
            var y = false;
            var b = false;
            var w = {
                x: 0,
                y: 0
            };
            var E = false;
            var S = document.documentElement;
            var x;
            var T;
            var N = [120, 120, 120];
            var C = {
                left: 37,
                up: 38,
                right: 39,
                down: 40,
                spacebar: 32,
                pageup: 33,
                pagedown: 34,
                end: 35,
                home: 36
            };
            var k = [];
            var L = false;
            var A = +(new Date);
            var O = {};
            setInterval(function () {
                O = {}
            }, 10 * 1e3);
            var M = function () {
                    var e = 0;
                    return function (t) {
                        return t.uniqueID || (t.uniqueID = e++)
                    }
                }();
            var _;
            var D = function () {
                    return window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
                    function (e, t, n) {
                        window.setTimeout(e, n || 1e3 / 60)
                    }
                }();
            var P = window.MutationObserver || window.WebKitMutationObserver;
            a("mousedown", s);
            a("mousewheel", r);
            a("load", t)
        }
    })
})(jQuery);
(function (e, t) {
    function i() {
        if (!n) {
            n = {
                verbose: false,
                queryLimit: {
                    attempt: 5,
                    delay: 250,
                    random: 250
                },
                classes: {
                    Map: google.maps.Map,
                    Marker: google.maps.Marker,
                    InfoWindow: google.maps.InfoWindow,
                    Circle: google.maps.Circle,
                    Rectangle: google.maps.Rectangle,
                    OverlayView: google.maps.OverlayView,
                    StreetViewPanorama: google.maps.StreetViewPanorama,
                    KmlLayer: google.maps.KmlLayer,
                    TrafficLayer: google.maps.TrafficLayer,
                    BicyclingLayer: google.maps.BicyclingLayer,
                    GroundOverlay: google.maps.GroundOverlay,
                    StyledMapType: google.maps.StyledMapType,
                    ImageMapType: google.maps.ImageMapType
                },
                map: {
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    center: [-32.834218, 2.457275],
                    zoom: 2
                },
                overlay: {
                    pane: "floatPane",
                    content: "",
                    offset: {
                        x: 0,
                        y: 0
                    }
                },
                geoloc: {
                    getCurrentPosition: {
                        maximumAge: 6e4,
                        timeout: 5e3
                    }
                }
            }
        }
    }
    function s(e, n) {
        return e !== t ? e : "gmap3_" + (n ? r + 1 : ++r)
    }
    function o(e) {
        var t = function (e) {
                return parseInt(e, 10)
            },
            n = google.maps.version.split(".").map(t),
            r;
        e = e.split(".").map(t);
        for (r = 0; r < e.length; r++) {
            if (n.hasOwnProperty(r)) {
                if (n[r] < e[r]) {
                    return false
                }
            } else {
                return false
            }
        }
        return true
    }
    function u(t, n, r, i, s) {
        if (n.todo.events || n.todo.onces) {
            var o = {
                id: i,
                data: n.todo.data,
                tag: n.todo.tag
            };
            if (n.todo.events) {
                e.each(n.todo.events, function (n, i) {
                    var u = t,
                        a = i;
                    if (e.isArray(i)) {
                        u = i[0];
                        a = i[1]
                    }
                    google.maps.event.addListener(r, n, function (e) {
                        a.apply(u, [s ? s : r, e, o])
                    })
                })
            }
            if (n.todo.onces) {
                e.each(n.todo.onces, function (n, i) {
                    var u = t,
                        a = i;
                    if (e.isArray(i)) {
                        u = i[0];
                        a = i[1]
                    }
                    google.maps.event.addListenerOnce(r, n, function (e) {
                        a.apply(u, [s ? s : r, e, o])
                    })
                })
            }
        }
    }
    function a() {
        var e = [];
        this.empty = function () {
            return !e.length
        };
        this.add = function (t) {
            e.push(t)
        };
        this.get = function () {
            return e.length ? e[0] : false
        };
        this.ack = function () {
            e.shift()
        }
    }
    function f(t, r, i) {
        function f(e) {
            var t = {};
            t[e] = {};
            return t
        }
        function l() {
            var e;
            for (e in i) {
                if (e in s) {
                    continue
                }
                return e
            }
        }
        var s = {},
            o = this,
            u, a = {
                latLng: {
                    map: false,
                    marker: false,
                    infowindow: false,
                    circle: false,
                    overlay: false,
                    getlatlng: false,
                    getmaxzoom: false,
                    getelevation: false,
                    streetviewpanorama: false,
                    getaddress: true
                },
                geoloc: {
                    getgeoloc: true
                }
            };
        if (typeof i === "string") {
            i = f(i)
        }
        this.run = function () {
            var o, f;
            while (o = l()) {
                if (typeof t[o] === "function") {
                    u = o;
                    f = e.extend(true, {}, n[o] || {}, i[o].options || {});
                    if (o in a.latLng) {
                        if (i[o].values) {
                            D(i[o].values, t, t[o], {
                                todo: i[o],
                                opts: f,
                                session: s
                            })
                        } else {
                            _(t, t[o], a.latLng[o], {
                                todo: i[o],
                                opts: f,
                                session: s
                            })
                        }
                    } else {
                        if (o in a.geoloc) {
                            P(t, t[o], {
                                todo: i[o],
                                opts: f,
                                session: s
                            })
                        } else {
                            t[o].apply(t, [{
                                todo: i[o],
                                opts: f,
                                session: s
                            }])
                        }
                    }
                    return
                } else {
                    s[o] = null
                }
            }
            r.apply(t, [i, s])
        };
        this.ack = function (e) {
            s[u] = e;
            o.run.apply(o, [])
        }
    }
    function l(e) {
        var t, n = [];
        for (t in e) {
            n.push(t)
        }
        return n
    }
    function c(t, n) {
        var r = {};
        if (t.todo) {
            for (var i in t.todo) {
                if (i !== "options" && i !== "values") {
                    r[i] = t.todo[i]
                }
            }
        }
        var s, o = ["data", "tag", "id", "events", "onces"];
        for (s = 0; s < o.length; s++) {
            h(r, o[s], n, t.todo)
        }
        r.options = e.extend({}, t.opts || {}, n.options || {});
        return r
    }
    function h(e, t) {
        for (var n = 2; n < arguments.length; n++) {
            if (t in arguments[n]) {
                e[t] = arguments[n][t];
                return
            }
        }
    }
    function p() {
        var e = [];
        this.get = function (t) {
            if (e.length) {
                var n, r, i, s, o, u = l(t);
                for (n = 0; n < e.length; n++) {
                    s = e[n];
                    o = u.length == s.keys.length;
                    for (r = 0; r < u.length && o; r++) {
                        i = u[r];
                        o = i in s.request;
                        if (o) {
                            if (typeof t[i] === "object" && "equals" in t[i] && typeof t[i] === "function") {
                                o = t[i].equals(s.request[i])
                            } else {
                                o = t[i] === s.request[i]
                            }
                        }
                    }
                    if (o) {
                        return s.results
                    }
                }
            }
        };
        this.store = function (t, n) {
            e.push({
                request: t,
                keys: l(t),
                results: n
            })
        }
    }
    function d(t, r, i, s) {
        var o = this,
            u = [];
        n.classes.OverlayView.call(this);
        this.setMap(t);
        this.onAdd = function () {
            var t = this.getPanes();
            if (r.pane in t) {
                e(t[r.pane]).append(s)
            }
            e.each("dblclick click mouseover mousemove mouseout mouseup mousedown".split(" "), function (t, n) {
                u.push(google.maps.event.addDomListener(s[0], n, function (t) {
                    e.Event(t).stopPropagation();
                    google.maps.event.trigger(o, n, [t]);
                    o.draw()
                }))
            });
            u.push(google.maps.event.addDomListener(s[0], "contextmenu", function (t) {
                e.Event(t).stopPropagation();
                google.maps.event.trigger(o, "rightclick", [t]);
                o.draw()
            }))
        };
        this.getPosition = function () {
            return i
        };
        this.draw = function () {
            var e = this.getProjection().fromLatLngToDivPixel(i);
            s.css("left", e.x + r.offset.x + "px").css("top", e.y + r.offset.y + "px")
        };
        this.onRemove = function () {
            for (var e = 0; e < u.length; e++) {
                google.maps.event.removeListener(u[e])
            }
            s.remove()
        };
        this.hide = function () {
            s.hide()
        };
        this.show = function () {
            s.show()
        };
        this.toggle = function () {
            if (s) {
                if (s.is(":visible")) {
                    this.show()
                } else {
                    this.hide()
                }
            }
        };
        this.toggleDOM = function () {
            if (this.getMap()) {
                this.setMap(null)
            } else {
                this.setMap(t)
            }
        };
        this.getDOMElement = function () {
            return s[0]
        }
    }
    function v(e, t) {
        function r() {
            this.onAdd = function () {};
            this.onRemove = function () {};
            this.draw = function () {};
            return n.classes.OverlayView.apply(this, [])
        }
        r.prototype = n.classes.OverlayView.prototype;
        var i = new r;
        i.setMap(e);
        return i
    }
    function m(t, r, i) {
        function k(e) {
            if (!y[e]) {
                delete b[e].options.map;
                y[e] = new n.classes.Marker(b[e].options);
                u(t, {
                    todo: b[e]
                }, y[e], b[e].id)
            }
        }
        function L() {
            x = E.getProjection();
            if (!x) {
                setTimeout(function () {
                    L.apply(h, [])
                }, 25);
                return
            }
            l = true;
            p.push(google.maps.event.addListener(r, "zoom_changed", function () {
                P()
            }));
            p.push(google.maps.event.addListener(r, "bounds_changed", function () {
                P()
            }));
            B()
        }
        function O(e) {
            if (typeof d[e] === "object") {
                if (typeof d[e].obj.setMap === "function") {
                    d[e].obj.setMap(null)
                }
                if (typeof d[e].obj.remove === "function") {
                    d[e].obj.remove()
                }
                if (typeof d[e].shadow.remove === "function") {
                    d[e].obj.remove()
                }
                if (typeof d[e].shadow.setMap === "function") {
                    d[e].shadow.setMap(null)
                }
                delete d[e].obj;
                delete d[e].shadow
            } else {
                if (y[e]) {
                    y[e].setMap(null)
                }
            }
            delete d[e]
        }
        function M() {
            var e, t, n, r, i, s, o, u;
            if (arguments[0] instanceof google.maps.LatLng) {
                e = arguments[0].lat();
                n = arguments[0].lng();
                if (arguments[1] instanceof google.maps.LatLng) {
                    t = arguments[1].lat();
                    r = arguments[1].lng()
                } else {
                    t = arguments[1];
                    r = arguments[2]
                }
            } else {
                e = arguments[0];
                n = arguments[1];
                if (arguments[2] instanceof google.maps.LatLng) {
                    t = arguments[2].lat();
                    r = arguments[2].lng()
                } else {
                    t = arguments[2];
                    r = arguments[3]
                }
            }
            i = Math.PI * e / 180;
            s = Math.PI * n / 180;
            o = Math.PI * t / 180;
            u = Math.PI * r / 180;
            return 1e3 * 6371 * Math.acos(Math.min(Math.cos(i) * Math.cos(o) * Math.cos(s) * Math.cos(u) + Math.cos(i) * Math.sin(s) * Math.cos(o) * Math.sin(u) + Math.sin(i) * Math.sin(o), 1))
        }
        function _() {
            var e = M(r.getCenter(), r.getBounds().getNorthEast()),
                t = new google.maps.Circle({
                    center: r.getCenter(),
                    radius: 1.25 * e
                });
            return t.getBounds()
        }
        function D() {
            var e = {},
                t;
            for (t in d) {
                e[t] = true
            }
            return e
        }
        function P() {
            clearTimeout(S);
            S = setTimeout(function () {
                B()
            }, 25)
        }
        function H(e) {
            var t = x.fromLatLngToDivPixel(e),
                n = x.fromDivPixelToLatLng(new google.maps.Point(t.x + i.radius, t.y - i.radius)),
                r = x.fromDivPixelToLatLng(new google.maps.Point(t.x - i.radius, t.y + i.radius));
            return new google.maps.LatLngBounds(r, n)
        }
        function B() {
            if (o || f || !l) {
                return
            }
            var t = [],
                n = {},
                s = r.getZoom(),
                u = "maxZoom" in i && s > i.maxZoom,
                h = D(),
                p, v, m, g, y = false,
                E, S, x, C, k, L, A;
            a = false;
            if (s > 3) {
                E = _();
                y = E.getSouthWest().lng() < E.getNorthEast().lng()
            }
            for (p = 0; p < b.length; p++) {
                if (b[p] && (!y || E.contains(b[p].options.position)) && (!T || T(w[p]))) {
                    t.push(p)
                }
            }
            while (1) {
                p = 0;
                while (n[p] && p < t.length) {
                    p++
                }
                if (p == t.length) {
                    break
                }
                g = [];
                if (c && !u) {
                    A = 10;
                    do {
                        C = g;
                        g = [];
                        A--;
                        if (C.length) {
                            x = E.getCenter()
                        } else {
                            x = b[t[p]].options.position
                        }
                        E = H(x);
                        for (v = p; v < t.length; v++) {
                            if (n[v]) {
                                continue
                            }
                            if (E.contains(b[t[v]].options.position)) {
                                g.push(v)
                            }
                        }
                    } while (C.length < g.length && g.length > 1 && A)
                } else {
                    for (v = p; v < t.length; v++) {
                        if (n[v]) {
                            continue
                        }
                        g.push(v);
                        break
                    }
                }
                S = {
                    indexes: [],
                    ref: []
                };
                k = L = 0;
                for (m = 0; m < g.length; m++) {
                    n[g[m]] = true;
                    S.indexes.push(t[g[m]]);
                    S.ref.push(t[g[m]]);
                    k += b[t[g[m]]].options.position.lat();
                    L += b[t[g[m]]].options.position.lng()
                }
                k /= g.length;
                L /= g.length;
                S.latLng = new google.maps.LatLng(k, L);
                S.ref = S.ref.join("-");
                if (S.ref in h) {
                    delete h[S.ref]
                } else {
                    if (g.length === 1) {
                        d[S.ref] = true
                    }
                    N(S)
                }
            }
            e.each(h, function (e) {
                O(e)
            });
            f = false
        }
        var o = false,
            a = false,
            f = false,
            l = false,
            c = true,
            h = this,
            p = [],
            d = {},
            m = {},
            g = {},
            y = [],
            b = [],
            w = [],
            E = v(r, i.radius),
            S, x, T, N, C;
        L();
        this.getById = function (e) {
            if (e in m) {
                k(m[e]);
                return y[m[e]]
            }
            return false
        };
        this.rm = function (e) {
            var t = m[e];
            if (y[t]) {
                y[t].setMap(null)
            }
            delete y[t];
            y[t] = false;
            delete b[t];
            b[t] = false;
            delete w[t];
            w[t] = false;
            delete m[e];
            delete g[t];
            a = true
        };
        this.clearById = function (e) {
            if (e in m) {
                this.rm(e);
                return true
            }
        };
        this.clear = function (e, t, n) {
            var r, i, s, o, u, a = [],
                f = A(n);
            if (e) {
                r = b.length - 1;
                i = -1;
                s = -1
            } else {
                r = 0;
                i = b.length;
                s = 1
            }
            for (o = r; o != i; o += s) {
                if (b[o]) {
                    if (!f || f(b[o].tag)) {
                        a.push(g[o]);
                        if (t || e) {
                            break
                        }
                    }
                }
            }
            for (u = 0; u < a.length; u++) {
                this.rm(a[u])
            }
        };
        this.add = function (e, t) {
            e.id = s(e.id);
            this.clearById(e.id);
            m[e.id] = y.length;
            g[y.length] = e.id;
            y.push(null);
            b.push(e);
            w.push(t);
            a = true
        };
        this.addMarker = function (e, n) {
            n = n || {};
            n.id = s(n.id);
            this.clearById(n.id);
            if (!n.options) {
                n.options = {}
            }
            n.options.position = e.getPosition();
            u(t, {
                todo: n
            }, e, n.id);
            m[n.id] = y.length;
            g[y.length] = n.id;
            y.push(e);
            b.push(n);
            w.push(n.data || {});
            a = true
        };
        this.todo = function (e) {
            return b[e]
        };
        this.value = function (e) {
            return w[e]
        };
        this.marker = function (e) {
            if (e in y) {
                k(e);
                return y[e]
            }
            return false
        };
        this.markerIsSet = function (e) {
            return Boolean(y[e])
        };
        this.setMarker = function (e, t) {
            y[e] = t
        };
        this.store = function (e, t, n) {
            d[e.ref] = {
                obj: t,
                shadow: n
            }
        };
        this.free = function () {
            for (var t = 0; t < p.length; t++) {
                google.maps.event.removeListener(p[t])
            }
            p = [];
            e.each(d, function (e) {
                O(e)
            });
            d = {};
            e.each(b, function (e) {
                b[e] = null
            });
            b = [];
            e.each(y, function (e) {
                if (y[e]) {
                    y[e].setMap(null);
                    delete y[e]
                }
            });
            y = [];
            e.each(w, function (e) {
                delete w[e]
            });
            w = [];
            m = {};
            g = {}
        };
        this.filter = function (e) {
            T = e;
            B()
        };
        this.enable = function (e) {
            if (c != e) {
                c = e;
                B()
            }
        };
        this.display = function (e) {
            N = e
        };
        this.error = function (e) {
            C = e
        };
        this.beginUpdate = function () {
            o = true
        };
        this.endUpdate = function () {
            o = false;
            if (a) {
                B()
            }
        };
        this.autofit = function (e) {
            for (var t = 0; t < b.length; t++) {
                if (b[t]) {
                    e.extend(b[t].options.position)
                }
            }
        }
    }
    function g(e, t) {
        this.id = function () {
            return e
        };
        this.filter = function (e) {
            t.filter(e)
        };
        this.enable = function () {
            t.enable(true)
        };
        this.disable = function () {
            t.enable(false)
        };
        this.add = function (e, n, r) {
            if (!r) {
                t.beginUpdate()
            }
            t.addMarker(e, n);
            if (!r) {
                t.endUpdate()
            }
        };
        this.getById = function (e) {
            return t.getById(e)
        };
        this.clearById = function (e, n) {
            var r;
            if (!n) {
                t.beginUpdate()
            }
            r = t.clearById(e);
            if (!n) {
                t.endUpdate()
            }
            return r
        };
        this.clear = function (e, n, r, i) {
            if (!i) {
                t.beginUpdate()
            }
            t.clear(e, n, r);
            if (!i) {
                t.endUpdate()
            }
        }
    }
    function y() {
        function i(e) {
            return {
                id: e.id,
                name: e.name,
                object: e.obj,
                tag: e.tag,
                data: e.data
            }
        }
        function o(e) {
            if (typeof e.setMap === "function") {
                e.setMap(null)
            }
            if (typeof e.remove === "function") {
                e.remove()
            }
            if (typeof e.free === "function") {
                e.free()
            }
            e = null
        }
        var n = {},
            r = {};
        this.add = function (e, t, i, o) {
            var u = e.todo || {},
                a = s(u.id);
            if (!n[t]) {
                n[t] = []
            }
            if (a in r) {
                this.clearById(a)
            }
            r[a] = {
                obj: i,
                sub: o,
                name: t,
                id: a,
                tag: u.tag,
                data: u.data
            };
            n[t].push(a);
            return a
        };
        this.getById = function (e, t, n) {
            if (e in r) {
                if (t) {
                    return r[e].sub
                } else {
                    if (n) {
                        return i(r[e])
                    }
                }
                return r[e].obj
            }
            return false
        };
        this.get = function (e, t, s, o) {
            var u, a, f = A(s);
            if (!n[e] || !n[e].length) {
                return null
            }
            u = n[e].length;
            while (u) {
                u--;
                a = n[e][t ? u : n[e].length - u - 1];
                if (a && r[a]) {
                    if (f && !f(r[a].tag)) {
                        continue
                    }
                    return o ? i(r[a]) : r[a].obj
                }
            }
            return null
        };
        this.all = function (e, s, o) {
            var u = [],
                a = A(s),
                f = function (e) {
                    var t, s;
                    for (t = 0; t < n[e].length; t++) {
                        s = n[e][t];
                        if (s && r[s]) {
                            if (a && !a(r[s].tag)) {
                                continue
                            }
                            u.push(o ? i(r[s]) : r[s].obj)
                        }
                    }
                };
            if (e in n) {
                f(e)
            } else {
                if (e === t) {
                    for (e in n) {
                        f(e)
                    }
                }
            }
            return u
        };
        this.rm = function (e, t, i) {
            var s, o;
            if (!n[e]) {
                return false
            }
            if (t) {
                if (i) {
                    for (s = n[e].length - 1; s >= 0; s--) {
                        o = n[e][s];
                        if (t(r[o].tag)) {
                            break
                        }
                    }
                } else {
                    for (s = 0; s < n[e].length; s++) {
                        o = n[e][s];
                        if (t(r[o].tag)) {
                            break
                        }
                    }
                }
            } else {
                s = i ? n[e].length - 1 : 0
            }
            if (!(s in n[e])) {
                return false
            }
            return this.clearById(n[e][s], s)
        };
        this.clearById = function (e, i) {
            if (e in r) {
                var s, u = r[e].name;
                for (s = 0; i === t && s < n[u].length; s++) {
                    if (e === n[u][s]) {
                        i = s
                    }
                }
                o(r[e].obj);
                if (r[e].sub) {
                    o(r[e].sub)
                }
                delete r[e];
                n[u].splice(i, 1);
                return true
            }
            return false
        };
        this.objGetById = function (e) {
            var t;
            if (n.clusterer) {
                for (var i in n.clusterer) {
                    if ((t = r[n.clusterer[i]].obj.getById(e)) !== false) {
                        return t
                    }
                }
            }
            return false
        };
        this.objClearById = function (e) {
            if (n.clusterer) {
                for (var t in n.clusterer) {
                    if (r[n.clusterer[t]].obj.clearById(e)) {
                        return true
                    }
                }
            }
            return null
        };
        this.clear = function (e, t, r, i) {
            var s, o, u, a = A(i);
            if (!e || !e.length) {
                e = [];
                for (s in n) {
                    e.push(s)
                }
            } else {
                e = L(e)
            }
            for (o = 0; o < e.length; o++) {
                u = e[o];
                if (t) {
                    this.rm(u, a, true)
                } else {
                    if (r) {
                        this.rm(u, a, false)
                    } else {
                        while (this.rm(u, a, false)) {}
                    }
                }
            }
        };
        this.objClear = function (t, i, s, o) {
            if (n.clusterer && (e.inArray("marker", t) >= 0 || !t.length)) {
                for (var u in n.clusterer) {
                    r[n.clusterer[u]].obj.clear(i, s, o)
                }
            }
        }
    }
    function E() {
        if (!b.geocoder) {
            b.geocoder = new google.maps.Geocoder
        }
        return b.geocoder
    }
    function S() {
        if (!b.directionsService) {
            b.directionsService = new google.maps.DirectionsService
        }
        return b.directionsService
    }
    function x() {
        if (!b.elevationService) {
            b.elevationService = new google.maps.ElevationService
        }
        return b.elevationService
    }
    function T() {
        if (!b.maxZoomService) {
            b.maxZoomService = new google.maps.MaxZoomService
        }
        return b.maxZoomService
    }
    function N() {
        if (!b.distanceMatrixService) {
            b.distanceMatrixService = new google.maps.DistanceMatrixService
        }
        return b.distanceMatrixService
    }
    function C() {
        if (n.verbose) {
            var e, t = [];
            if (window.console && typeof console.error === "function") {
                for (e = 0; e < arguments.length; e++) {
                    t.push(arguments[e])
                }
                console.error.apply(console, t)
            } else {
                t = "";
                for (e = 0; e < arguments.length; e++) {
                    t += arguments[e].toString() + " "
                }
                alert(t)
            }
        }
    }
    function k(e) {
        return (typeof e === "number" || typeof e === "string") && e !== "" && !isNaN(e)
    }
    function L(e) {
        var n, r = [];
        if (e !== t) {
            if (typeof e === "object") {
                if (typeof e.length === "number") {
                    r = e
                } else {
                    for (n in e) {
                        r.push(e[n])
                    }
                }
            } else {
                r.push(e)
            }
        }
        return r
    }
    function A(n) {
        if (n) {
            if (typeof n === "function") {
                return n
            }
            n = L(n);
            return function (r) {
                if (r === t) {
                    return false
                }
                if (typeof r === "object") {
                    for (var i = 0; i < r.length; i++) {
                        if (e.inArray(r[i], n) >= 0) {
                            return true
                        }
                    }
                    return false
                }
                return e.inArray(r, n) >= 0
            }
        }
    }
    function O(t, n, r) {
        var i = n ? t : null;
        if (!t || typeof t === "string") {
            return i
        }
        if (t.latLng) {
            return O(t.latLng)
        }
        if (t instanceof google.maps.LatLng) {
            return t
        } else {
            if (k(t.lat)) {
                return new google.maps.LatLng(t.lat, t.lng)
            } else {
                if (!r && e.isArray(t)) {
                    if (!k(t[0]) || !k(t[1])) {
                        return i
                    }
                    return new google.maps.LatLng(t[0], t[1])
                }
            }
        }
        return i
    }
    function M(t) {
        var n, r;
        if (!t || t instanceof google.maps.LatLngBounds) {
            return t || null
        }
        if (e.isArray(t)) {
            if (t.length == 2) {
                n = O(t[0]);
                r = O(t[1])
            } else {
                if (t.length == 4) {
                    n = O([t[0], t[1]]);
                    r = O([t[2], t[3]])
                }
            }
        } else {
            if ("ne" in t && "sw" in t) {
                n = O(t.ne);
                r = O(t.sw)
            } else {
                if ("n" in t && "e" in t && "s" in t && "w" in t) {
                    n = O([t.n, t.e]);
                    r = O([t.s, t.w])
                }
            }
        }
        if (n && r) {
            return new google.maps.LatLngBounds(r, n)
        }
        return null
    }
    function _(e, t, r, i, s) {
        var o = r ? O(i.todo, false, true) : false,
            u = o ? {
                latLng: o
            } : i.todo.address ? typeof i.todo.address === "string" ? {
                address: i.todo.address
            } : i.todo.address : false,
            a = u ? w.get(u) : false,
            f = this;
        if (u) {
            s = s || 0;
            if (a) {
                i.latLng = a.results[0].geometry.location;
                i.results = a.results;
                i.status = a.status;
                t.apply(e, [i])
            } else {
                if (u.location) {
                    u.location = O(u.location)
                }
                if (u.bounds) {
                    u.bounds = M(u.bounds)
                }
                E().geocode(u, function (o, a) {
                    if (a === google.maps.GeocoderStatus.OK) {
                        w.store(u, {
                            results: o,
                            status: a
                        });
                        i.latLng = o[0].geometry.location;
                        i.results = o;
                        i.status = a;
                        t.apply(e, [i])
                    } else {
                        if (a === google.maps.GeocoderStatus.OVER_QUERY_LIMIT && s < n.queryLimit.attempt) {
                            setTimeout(function () {
                                _.apply(f, [e, t, r, i, s + 1])
                            }, n.queryLimit.delay + Math.floor(Math.random() * n.queryLimit.random))
                        } else {
                            C("geocode failed", a, u);
                            i.latLng = i.results = false;
                            i.status = a;
                            t.apply(e, [i])
                        }
                    }
                })
            }
        } else {
            i.latLng = O(i.todo, false, true);
            t.apply(e, [i])
        }
    }
    function D(t, n, r, i) {
        function u() {
            do {
                o++
            } while (o < t.length && !("address" in t[o]));
            if (o >= t.length) {
                r.apply(n, [i]);
                return
            }
            _(s, function (n) {
                delete n.todo;
                e.extend(t[o], n);
                u.apply(s, [])
            }, true, {
                todo: t[o]
            })
        }
        var s = this,
            o = -1;
        u()
    }
    function P(e, t, n) {
        var r = false;
        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (i) {
                if (r) {
                    return
                }
                r = true;
                n.latLng = new google.maps.LatLng(i.coords.latitude, i.coords.longitude);
                t.apply(e, [n])
            }, function () {
                if (r) {
                    return
                }
                r = true;
                n.latLng = false;
                t.apply(e, [n])
            }, n.opts.getCurrentPosition)
        } else {
            n.latLng = false;
            t.apply(e, [n])
        }
    }
    function H(r) {
        function b() {
            if (!v && (v = l.get())) {
                v.run()
            }
        }
        function w() {
            v = null;
            l.ack();
            b.call(i)
        }
        function E(t) {
            if (t.todo.callback) {
                var n = Array.prototype.slice.call(arguments, 1);
                if (typeof t.todo.callback === "function") {
                    t.todo.callback.apply(r, n)
                } else {
                    if (e.isArray(t.todo.callback)) {
                        if (typeof t.todo.callback[1] === "function") {
                            t.todo.callback[1].apply(t.todo.callback[0], n)
                        }
                    }
                }
            }
        }
        function k(e, t, n) {
            if (n) {
                u(r, e, t, n)
            }
            E(e, t);
            v.ack(t)
        }
        function A(t, i) {
            i = i || {};
            if (p) {
                if (i.todo && i.todo.options) {
                    if (i.todo.options.center) {
                        i.todo.options.center = O(i.todo.options.center)
                    }
                    p.setOptions(i.todo.options)
                }
            } else {
                var s = i.opts || e.extend(true, {}, n.map, i.todo && i.todo.options ? i.todo.options : {});
                s.center = t || O(s.center);
                p = new n.classes.Map(r.get(0), s)
            }
        }
        function _(t, n, i) {
            var s = [],
                o = "values" in t.todo;
            if (!o) {
                t.todo.values = [{
                    options: t.opts
                }]
            }
            if (!t.todo.values.length) {
                k(t, false);
                return
            }
            A();
            e.each(t.todo.values, function (o, a) {
                var f, l, d, v, m = c(t, a);
                if (m.options[i]) {
                    if (m.options[i][0][0] && e.isArray(m.options[i][0][0])) {
                        for (l = 0; l < m.options[i].length; l++) {
                            for (d = 0; d < m.options[i][l].length; d++) {
                                m.options[i][l][d] = O(m.options[i][l][d])
                            }
                        }
                    } else {
                        for (l = 0; l < m.options[i].length; l++) {
                            m.options[i][l] = O(m.options[i][l])
                        }
                    }
                }
                m.options.map = p;
                v = new google.maps[n](m.options);
                s.push(v);
                f = h.add({
                    todo: m
                }, n.toLowerCase(), v);
                u(r, {
                    todo: m
                }, v, f)
            });
            k(t, o ? s : s[0])
        }
        function D(n) {
            var s = new m(r, p, n),
                o = {},
                a = {},
                f = [],
                l = /^[0-9]+$/,
                c, h;
            for (h in n) {
                if (l.test(h)) {
                    f.push(1 * h);
                    a[h] = n[h];
                    a[h].width = a[h].width || 0;
                    a[h].height = a[h].height || 0
                } else {
                    o[h] = n[h]
                }
            }
            f.sort(function (e, t) {
                return e > t
            });
            if (o.calculator) {
                c = function (t) {
                    var n = [];
                    e.each(t, function (e, t) {
                        n.push(s.value(t))
                    });
                    return o.calculator.apply(r, [n])
                }
            } else {
                c = function (e) {
                    return e.length
                }
            }
            s.error(function () {
                C.apply(i, arguments)
            });
            s.display(function (l) {
                var h, d, v, m, g, y = c(l.indexes);
                if (n.force || y > 1) {
                    for (h = 0; h < f.length; h++) {
                        if (f[h] <= y) {
                            d = a[f[h]]
                        }
                    }
                }
                if (d) {
                    g = d.offset || [-d.width / 2, -d.height / 2];
                    v = e.extend({}, o);
                    v.options = e.extend({
                        pane: "overlayLayer",
                        content: d.content ? d.content.replace("CLUSTER_COUNT", y) : "",
                        offset: {
                            x: ("x" in g ? g.x : g[0]) || 0,
                            y: ("y" in g ? g.y : g[1]) || 0
                        }
                    }, o.options || {});
                    m = i.overlay({
                        todo: v,
                        opts: v.options,
                        latLng: O(l)
                    }, true);
                    v.options.pane = "floatShadow";
                    v.options.content = e(document.createElement("div")).width(d.width + "px").height(d.height + "px").css({
                        cursor: "pointer"
                    });
                    shadow = i.overlay({
                        todo: v,
                        opts: v.options,
                        latLng: O(l)
                    }, true);
                    o.data = {
                        latLng: O(l),
                        markers: []
                    };
                    e.each(l.indexes, function (e, t) {
                        o.data.markers.push(s.value(t));
                        if (s.markerIsSet(t)) {
                            s.marker(t).setMap(null)
                        }
                    });
                    u(r, {
                        todo: o
                    }, shadow, t, {
                        main: m,
                        shadow: shadow
                    });
                    s.store(l, m, shadow)
                } else {
                    e.each(l.indexes, function (e, t) {
                        s.marker(t).setMap(p)
                    })
                }
            });
            return s
        }
        var i = this,
            l = new a,
            h = new y,
            p = null,
            v;
        this._plan = function (e) {
            for (var t = 0; t < e.length; t++) {
                l.add(new f(i, w, e[t]))
            }
            b()
        };
        this.map = function (e) {
            A(e.latLng, e);
            u(r, e, p);
            k(e, p)
        };
        this.destroy = function (e) {
            h.clear();
            r.empty();
            if (p) {
                p = null
            }
            k(e, true)
        };
        this.infowindow = function (i) {
            var s = [],
                o = "values" in i.todo;
            if (!o) {
                if (i.latLng) {
                    i.opts.position = i.latLng
                }
                i.todo.values = [{
                    options: i.opts
                }]
            }
            e.each(i.todo.values, function (e, a) {
                var f, l, d = c(i, a);
                d.options.position = d.options.position ? O(d.options.position) : O(a.latLng);
                if (!p) {
                    A(d.options.position)
                }
                l = new n.classes.InfoWindow(d.options);
                if (l && (d.open === t || d.open)) {
                    if (o) {
                        l.open(p, d.anchor ? d.anchor : t)
                    } else {
                        l.open(p, d.anchor ? d.anchor : i.latLng ? t : i.session.marker ? i.session.marker : t)
                    }
                }
                s.push(l);
                f = h.add({
                    todo: d
                }, "infowindow", l);
                u(r, {
                    todo: d
                }, l, f)
            });
            k(i, o ? s : s[0])
        };
        this.circle = function (t) {
            var i = [],
                s = "values" in t.todo;
            if (!s) {
                t.opts.center = t.latLng || O(t.opts.center);
                t.todo.values = [{
                    options: t.opts
                }]
            }
            if (!t.todo.values.length) {
                k(t, false);
                return
            }
            e.each(t.todo.values, function (e, s) {
                var o, a, f = c(t, s);
                f.options.center = f.options.center ? O(f.options.center) : O(s);
                if (!p) {
                    A(f.options.center)
                }
                f.options.map = p;
                a = new n.classes.Circle(f.options);
                i.push(a);
                o = h.add({
                    todo: f
                }, "circle", a);
                u(r, {
                    todo: f
                }, a, o)
            });
            k(t, s ? i : i[0])
        };
        this.overlay = function (t, i) {
            var s = [],
                o = "values" in t.todo;
            if (!o) {
                t.todo.values = [{
                    latLng: t.latLng,
                    options: t.opts
                }]
            }
            if (!t.todo.values.length) {
                k(t, false);
                return
            }
            if (!d.__initialised) {
                d.prototype = new n.classes.OverlayView;
                d.__initialised = true
            }
            e.each(t.todo.values, function (n, o) {
                var a, f, l = c(t, o),
                    v = e(document.createElement("div")).css({
                        border: "none",
                        borderWidth: "0px",
                        position: "absolute"
                    });
                v.append(l.options.content);
                f = new d(p, l.options, O(l) || O(o), v);
                s.push(f);
                v = null;
                if (!i) {
                    a = h.add(t, "overlay", f);
                    u(r, {
                        todo: l
                    }, f, a)
                }
            });
            if (i) {
                return s[0]
            }
            k(t, o ? s : s[0])
        };
        this.getaddress = function (e) {
            E(e, e.results, e.status);
            v.ack()
        };
        this.getlatlng = function (e) {
            E(e, e.results, e.status);
            v.ack()
        };
        this.getmaxzoom = function (e) {
            T().getMaxZoomAtLatLng(e.latLng, function (t) {
                E(e, t.status === google.maps.MaxZoomStatus.OK ? t.zoom : false, status);
                v.ack()
            })
        };
        this.getelevation = function (e) {
            var t, n = [],
                r = function (t, n) {
                    E(e, n === google.maps.ElevationStatus.OK ? t : false, n);
                    v.ack()
                };
            if (e.latLng) {
                n.push(e.latLng)
            } else {
                n = L(e.todo.locations || []);
                for (t = 0; t < n.length; t++) {
                    n[t] = O(n[t])
                }
            }
            if (n.length) {
                x().getElevationForLocations({
                    locations: n
                }, r)
            } else {
                if (e.todo.path && e.todo.path.length) {
                    for (t = 0; t < e.todo.path.length; t++) {
                        n.push(O(e.todo.path[t]))
                    }
                }
                if (n.length) {
                    x().getElevationAlongPath({
                        path: n,
                        samples: e.todo.samples
                    }, r)
                } else {
                    v.ack()
                }
            }
        };
        this.defaults = function (t) {
            e.each(t.todo, function (t, r) {
                if (typeof n[t] === "object") {
                    n[t] = e.extend({}, n[t], r)
                } else {
                    n[t] = r
                }
            });
            v.ack(true)
        };
        this.rectangle = function (t) {
            var i = [],
                s = "values" in t.todo;
            if (!s) {
                t.todo.values = [{
                    options: t.opts
                }]
            }
            if (!t.todo.values.length) {
                k(t, false);
                return
            }
            e.each(t.todo.values, function (e, s) {
                var o, a, f = c(t, s);
                f.options.bounds = f.options.bounds ? M(f.options.bounds) : M(s);
                if (!p) {
                    A(f.options.bounds.getCenter())
                }
                f.options.map = p;
                a = new n.classes.Rectangle(f.options);
                i.push(a);
                o = h.add({
                    todo: f
                }, "rectangle", a);
                u(r, {
                    todo: f
                }, a, o)
            });
            k(t, s ? i : i[0])
        };
        this.polyline = function (e) {
            _(e, "Polyline", "path")
        };
        this.polygon = function (e) {
            _(e, "Polygon", "paths")
        };
        this.trafficlayer = function (e) {
            A();
            var t = h.get("trafficlayer");
            if (!t) {
                t = new n.classes.TrafficLayer;
                t.setMap(p);
                h.add(e, "trafficlayer", t)
            }
            k(e, t)
        };
        this.bicyclinglayer = function (e) {
            A();
            var t = h.get("bicyclinglayer");
            if (!t) {
                t = new n.classes.BicyclingLayer;
                t.setMap(p);
                h.add(e, "bicyclinglayer", t)
            }
            k(e, t)
        };
        this.groundoverlay = function (e) {
            e.opts.bounds = M(e.opts.bounds);
            if (e.opts.bounds) {
                A(e.opts.bounds.getCenter())
            }
            var t, r = new n.classes.GroundOverlay(e.opts.url, e.opts.bounds, e.opts.opts);
            r.setMap(p);
            t = h.add(e, "groundoverlay", r);
            k(e, r, t)
        };
        this.streetviewpanorama = function (t) {
            if (!t.opts.opts) {
                t.opts.opts = {}
            }
            if (t.latLng) {
                t.opts.opts.position = t.latLng
            } else {
                if (t.opts.opts.position) {
                    t.opts.opts.position = O(t.opts.opts.position)
                }
            }
            if (t.todo.divId) {
                t.opts.container = document.getElementById(t.todo.divId)
            } else {
                if (t.opts.container) {
                    t.opts.container = e(t.opts.container).get(0)
                }
            }
            var r, i = new n.classes.StreetViewPanorama(t.opts.container, t.opts.opts);
            if (i) {
                p.setStreetView(i)
            }
            r = h.add(t, "streetviewpanorama", i);
            k(t, i, r)
        };
        this.kmllayer = function (t) {
            var i = [],
                s = "values" in t.todo;
            if (!s) {
                t.todo.values = [{
                    options: t.opts
                }]
            }
            if (!t.todo.values.length) {
                k(t, false);
                return
            }
            e.each(t.todo.values, function (e, s) {
                var a, f, l, d = c(t, s);
                if (!p) {
                    A()
                }
                l = d.options;
                if (d.options.opts) {
                    l = d.options.opts;
                    if (d.options.url) {
                        l.url = d.options.url
                    }
                }
                l.map = p;
                if (o("3.10")) {
                    f = new n.classes.KmlLayer(l)
                } else {
                    f = new n.classes.KmlLayer(l.url, l)
                }
                i.push(f);
                a = h.add({
                    todo: d
                }, "kmllayer", f);
                u(r, {
                    todo: d
                }, f, a)
            });
            k(t, s ? i : i[0])
        };
        this.panel = function (n) {
            A();
            var i, s = 0,
                o = 0,
                u, a = e(document.createElement("div"));
            a.css({
                position: "absolute",
                zIndex: 1e3,
                visibility: "hidden"
            });
            if (n.opts.content) {
                u = e(n.opts.content);
                a.append(u);
                r.first().prepend(a);
                if (n.opts.left !== t) {
                    s = n.opts.left
                } else {
                    if (n.opts.right !== t) {
                        s = r.width() - u.width() - n.opts.right
                    } else {
                        if (n.opts.center) {
                            s = (r.width() - u.width()) / 2
                        }
                    }
                }
                if (n.opts.top !== t) {
                    o = n.opts.top
                } else {
                    if (n.opts.bottom !== t) {
                        o = r.height() - u.height() - n.opts.bottom
                    } else {
                        if (n.opts.middle) {
                            o = (r.height() - u.height()) / 2
                        }
                    }
                }
                a.css({
                    top: o,
                    left: s,
                    visibility: "visible"
                })
            }
            i = h.add(n, "panel", a);
            k(n, a, i);
            a = null
        };
        this.marker = function (t) {
            var o = "values" in t.todo,
                a = !p;
            if (!o) {
                t.opts.position = t.latLng || O(t.opts.position);
                t.todo.values = [{
                    options: t.opts
                }]
            }
            if (!t.todo.values.length) {
                k(t, false);
                return
            }
            if (a) {
                A()
            }
            if (t.todo.cluster && !p.getBounds()) {
                google.maps.event.addListenerOnce(p, "bounds_changed", function () {
                    i.marker.apply(i, [t])
                });
                return
            }
            if (t.todo.cluster) {
                var f, l;
                if (t.todo.cluster instanceof g) {
                    f = t.todo.cluster;
                    l = h.getById(f.id(), true)
                } else {
                    l = D(t.todo.cluster);
                    f = new g(s(t.todo.id, true), l);
                    h.add(t, "clusterer", f, l)
                }
                l.beginUpdate();
                e.each(t.todo.values, function (e, n) {
                    var r = c(t, n);
                    r.options.position = r.options.position ? O(r.options.position) : O(n);
                    r.options.map = p;
                    if (a) {
                        p.setCenter(r.options.position);
                        a = false
                    }
                    l.add(r, n)
                });
                l.endUpdate();
                k(t, f)
            } else {
                var d = [];
                e.each(t.todo.values, function (e, i) {
                    var s, o, f = c(t, i);
                    f.options.position = f.options.position ? O(f.options.position) : O(i);
                    f.options.map = p;
                    if (a) {
                        p.setCenter(f.options.position);
                        a = false
                    }
                    o = new n.classes.Marker(f.options);
                    d.push(o);
                    s = h.add({
                        todo: f
                    }, "marker", o);
                    u(r, {
                        todo: f
                    }, o, s)
                });
                k(t, o ? d : d[0])
            }
        };
        this.getroute = function (e) {
            e.opts.origin = O(e.opts.origin, true);
            e.opts.destination = O(e.opts.destination, true);
            S().route(e.opts, function (t, n) {
                E(e, n == google.maps.DirectionsStatus.OK ? t : false, n);
                v.ack()
            })
        };
        this.directionsrenderer = function (t) {
            t.opts.map = p;
            var n, r = new google.maps.DirectionsRenderer(t.opts);
            if (t.todo.divId) {
                r.setPanel(document.getElementById(t.todo.divId))
            } else {
                if (t.todo.container) {
                    r.setPanel(e(t.todo.container).get(0))
                }
            }
            n = h.add(t, "directionsrenderer", r);
            k(t, r, n)
        };
        this.getgeoloc = function (e) {
            k(e, e.latLng)
        };
        this.styledmaptype = function (e) {
            A();
            var t = new n.classes.StyledMapType(e.todo.styles, e.opts);
            p.mapTypes.set(e.todo.id, t);
            k(e, t)
        };
        this.imagemaptype = function (e) {
            A();
            var t = new n.classes.ImageMapType(e.opts);
            p.mapTypes.set(e.todo.id, t);
            k(e, t)
        };
        this.autofit = function (t) {
            var n = new google.maps.LatLngBounds;
            e.each(h.all(), function (e, t) {
                if (t.getPosition) {
                    n.extend(t.getPosition())
                } else {
                    if (t.getBounds) {
                        n.extend(t.getBounds().getNorthEast());
                        n.extend(t.getBounds().getSouthWest())
                    } else {
                        if (t.getPaths) {
                            t.getPaths().forEach(function (e) {
                                e.forEach(function (e) {
                                    n.extend(e)
                                })
                            })
                        } else {
                            if (t.getPath) {
                                t.getPath().forEach(function (e) {
                                    n.extend(e);
                                    ""
                                })
                            } else {
                                if (t.getCenter) {
                                    n.extend(t.getCenter())
                                } else {
                                    if (t instanceof g) {
                                        t = h.getById(t.id(), true);
                                        if (t) {
                                            t.autofit(n)
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            });
            if (!n.isEmpty() && (!p.getBounds() || !p.getBounds().equals(n))) {
                if ("maxZoom" in t.todo) {
                    google.maps.event.addListenerOnce(p, "bounds_changed", function () {
                        if (this.getZoom() > t.todo.maxZoom) {
                            this.setZoom(t.todo.maxZoom)
                        }
                    })
                }
                p.fitBounds(n)
            }
            k(t, true)
        };
        this.clear = function (t) {
            if (typeof t.todo === "string") {
                if (h.clearById(t.todo) || h.objClearById(t.todo)) {
                    k(t, true);
                    return
                }
                t.todo = {
                    name: t.todo
                }
            }
            if (t.todo.id) {
                e.each(L(t.todo.id), function (e, t) {
                    h.clearById(t) || h.objClearById(t)
                })
            } else {
                h.clear(L(t.todo.name), t.todo.last, t.todo.first, t.todo.tag);
                h.objClear(L(t.todo.name), t.todo.last, t.todo.first, t.todo.tag)
            }
            k(t, true)
        };
        this.exec = function (t) {
            var n = this;
            e.each(L(t.todo.func), function (i, s) {
                e.each(n.get(t.todo, true, t.todo.hasOwnProperty("full") ? t.todo.full : true), function (e, t) {
                    s.call(r, t)
                })
            });
            k(t, true)
        };
        this.get = function (n, r, i) {
            var s, o, u = r ? n : n.todo;
            if (!r) {
                i = u.full
            }
            if (typeof u === "string") {
                o = h.getById(u, false, i) || h.objGetById(u);
                if (o === false) {
                    s = u;
                    u = {}
                }
            } else {
                s = u.name
            }
            if (s === "map") {
                o = p
            }
            if (!o) {
                o = [];
                if (u.id) {
                    e.each(L(u.id), function (e, t) {
                        o.push(h.getById(t, false, i) || h.objGetById(t))
                    });
                    if (!e.isArray(u.id)) {
                        o = o[0]
                    }
                } else {
                    e.each(s ? L(s) : [t], function (t, n) {
                        var r;
                        if (u.first) {
                            r = h.get(n, false, u.tag, i);
                            if (r) {
                                o.push(r)
                            }
                        } else {
                            if (u.all) {
                                e.each(h.all(n, u.tag, i), function (e, t) {
                                    o.push(t)
                                })
                            } else {
                                r = h.get(n, true, u.tag, i);
                                if (r) {
                                    o.push(r)
                                }
                            }
                        }
                    });
                    if (!u.all && !e.isArray(s)) {
                        o = o[0]
                    }
                }
            }
            o = e.isArray(o) || !u.all ? o : [o];
            if (r) {
                return o
            } else {
                k(n, o)
            }
        };
        this.getdistance = function (e) {
            var t;
            e.opts.origins = L(e.opts.origins);
            for (t = 0; t < e.opts.origins.length; t++) {
                e.opts.origins[t] = O(e.opts.origins[t], true)
            }
            e.opts.destinations = L(e.opts.destinations);
            for (t = 0; t < e.opts.destinations.length; t++) {
                e.opts.destinations[t] = O(e.opts.destinations[t], true)
            }
            N().getDistanceMatrix(e.opts, function (t, n) {
                E(e, n === google.maps.DistanceMatrixStatus.OK ? t : false, n);
                v.ack()
            })
        };
        this.trigger = function (t) {
            if (typeof t.todo === "string") {
                google.maps.event.trigger(p, t.todo)
            } else {
                var n = [p, t.todo.eventName];
                if (t.todo.var_args) {
                    e.each(t.todo.var_args, function (e, t) {
                        n.push(t)
                    })
                }
                google.maps.event.trigger.apply(google.maps.event, n)
            }
            E(t);
            v.ack()
        }
    }
    function B(e) {
        var t;
        if (!typeof e === "object" || !e.hasOwnProperty("get")) {
            return false
        }
        for (t in e) {
            if (t !== "get") {
                return false
            }
        }
        return !e.get.hasOwnProperty("callback")
    }
    var n, r = 0;
    var b = {},
        w = new p;
    e.fn.gmap3 = function () {
        var t, n = [],
            r = true,
            s = [];
        i();
        for (t = 0; t < arguments.length; t++) {
            if (arguments[t]) {
                n.push(arguments[t])
            }
        }
        if (!n.length) {
            n.push("map")
        }
        e.each(this, function () {
            var t = e(this),
                i = t.data("gmap3");
            r = false;
            if (!i) {
                i = new H(t);
                t.data("gmap3", i)
            }
            if (n.length === 1 && (n[0] === "get" || B(n[0]))) {
                if (n[0] === "get") {
                    s.push(i.get("map", true))
                } else {
                    s.push(i.get(n[0].get, true, n[0].get.full))
                }
            } else {
                i._plan(n)
            }
        });
        if (s.length) {
            if (s.length === 1) {
                return s[0]
            } else {
                return s
            }
        }
        return this
    }
})(jQuery);
(function (e) {
    e.flexslider = function (t, n) {
        var r = e(t);
        r.vars = e.extend({}, e.flexslider.defaults, n);
        var i = r.vars.namespace,
            s = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
            o = ("ontouchstart" in window || s || window.DocumentTouch && document instanceof DocumentTouch) && r.vars.touch,
            u = "click touchend MSPointerUp",
            a = "",
            f, l = r.vars.direction === "vertical",
            c = r.vars.reverse,
            h = r.vars.itemWidth > 0,
            p = r.vars.animation === "fade",
            d = r.vars.asNavFor !== "",
            v = {},
            m = !0;
        e.data(t, "flexslider", r);
        v = {
            init: function () {
                r.animating = !1;
                r.currentSlide = parseInt(r.vars.startAt ? r.vars.startAt : 0);
                isNaN(r.currentSlide) && (r.currentSlide = 0);
                r.animatingTo = r.currentSlide;
                r.atEnd = r.currentSlide === 0 || r.currentSlide === r.last;
                r.containerSelector = r.vars.selector.substr(0, r.vars.selector.search(" "));
                r.slides = e(r.vars.selector, r);
                r.container = e(r.containerSelector, r);
                r.count = r.slides.length;
                r.syncExists = e(r.vars.sync).length > 0;
                r.vars.animation === "slide" && (r.vars.animation = "swing");
                r.prop = l ? "top" : "marginLeft";
                r.args = {};
                r.manualPause = !1;
                r.stopped = !1;
                r.started = !1;
                r.startTimeout = null;
                r.transitions = !r.vars.video && !p && r.vars.useCSS &&
                function () {
                    var e = document.createElement("div"),
                        t = ["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"];
                    for (var n in t) if (e.style[t[n]] !== undefined) {
                        r.pfx = t[n].replace("Perspective", "").toLowerCase();
                        r.prop = "-" + r.pfx + "-transform";
                        return !0
                    }
                    return !1
                }();
                r.vars.controlsContainer !== "" && (r.controlsContainer = e(r.vars.controlsContainer).length > 0 && e(r.vars.controlsContainer));
                r.vars.manualControls !== "" && (r.manualControls = e(r.vars.manualControls).length > 0 && e(r.vars.manualControls));
                if (r.vars.randomize) {
                    r.slides.sort(function () {
                        return Math.round(Math.random()) - .5
                    });
                    r.container.empty().append(r.slides)
                }
                r.doMath();
                r.setup("init");
                r.vars.controlNav && v.controlNav.setup();
                r.vars.directionNav && v.directionNav.setup();
                r.vars.keyboard && (e(r.containerSelector).length === 1 || r.vars.multipleKeyboard) && e(document).bind("keyup", function (e) {
                    var t = e.keyCode;
                    if (!r.animating && (t === 39 || t === 37)) {
                        var n = t === 39 ? r.getTarget("next") : t === 37 ? r.getTarget("prev") : !1;
                        r.flexAnimate(n, r.vars.pauseOnAction)
                    }
                });
                r.vars.mousewheel && r.bind("mousewheel", function (e, t, n, i) {
                    e.preventDefault();
                    var s = t < 0 ? r.getTarget("next") : r.getTarget("prev");
                    r.flexAnimate(s, r.vars.pauseOnAction)
                });
                r.vars.pausePlay && v.pausePlay.setup();
                r.vars.slideshow && r.vars.pauseInvisible && v.pauseInvisible.init();
                if (r.vars.slideshow) {
                    r.vars.pauseOnHover && r.hover(function () {
                        !r.manualPlay && !r.manualPause && r.pause()
                    }, function () {
                        !r.manualPause && !r.manualPlay && !r.stopped && r.play()
                    });
                    if (!r.vars.pauseInvisible || !v.pauseInvisible.isHidden()) r.vars.initDelay > 0 ? r.startTimeout = setTimeout(r.play, r.vars.initDelay) : r.play()
                }
                d && v.asNav.setup();
                o && r.vars.touch && v.touch();
                (!p || p && r.vars.smoothHeight) && e(window).bind("resize orientationchange focus", v.resize);
                r.find("img").attr("draggable", "false");
                setTimeout(function () {
                    r.vars.start(r)
                }, 200)
            },
            asNav: {
                setup: function () {
                    r.asNav = !0;
                    r.animatingTo = Math.floor(r.currentSlide / r.move);
                    r.currentItem = r.currentSlide;
                    r.slides.removeClass(i + "active-slide").eq(r.currentItem).addClass(i + "active-slide");
                    if (!s) r.slides.click(function (t) {
                        t.preventDefault();
                        var n = e(this),
                            s = n.index(),
                            o = n.offset().left - e(r).scrollLeft();
                        if (o <= 0 && n.hasClass(i + "active-slide")) r.flexAnimate(r.getTarget("prev"), !0);
                        else if (!e(r.vars.asNavFor).data("flexslider").animating && !n.hasClass(i + "active-slide")) {
                            r.direction = r.currentItem < s ? "next" : "prev";
                            r.flexAnimate(s, r.vars.pauseOnAction, !1, !0, !0)
                        }
                    });
                    else {
                        t._slider = r;
                        r.slides.each(function () {
                            var t = this;
                            t._gesture = new MSGesture;
                            t._gesture.target = t;
                            t.addEventListener("MSPointerDown", function (e) {
                                e.preventDefault();
                                e.currentTarget._gesture && e.currentTarget._gesture.addPointer(e.pointerId)
                            }, !1);
                            t.addEventListener("MSGestureTap", function (t) {
                                t.preventDefault();
                                var n = e(this),
                                    i = n.index();
                                if (!e(r.vars.asNavFor).data("flexslider").animating && !n.hasClass("active")) {
                                    r.direction = r.currentItem < i ? "next" : "prev";
                                    r.flexAnimate(i, r.vars.pauseOnAction, !1, !0, !0)
                                }
                            })
                        })
                    }
                }
            },
            controlNav: {
                setup: function () {
                    r.manualControls ? v.controlNav.setupManual() : v.controlNav.setupPaging()
                },
                setupPaging: function () {
                    var t = r.vars.controlNav === "thumbnails" ? "control-thumbs" : "control-paging",
                        n = 1,
                        s, o;
                    r.controlNavScaffold = e('<ol class="' + i + "control-nav " + i + t + '"></ol>');
                    if (r.pagingCount > 1) for (var f = 0; f < r.pagingCount; f++) {
                        o = r.slides.eq(f);
                        s = r.vars.controlNav === "thumbnails" ? '<img src="' + o.attr("data-thumb") + '"/>' : "<a>" + n + "</a>";
                        if ("thumbnails" === r.vars.controlNav && !0 === r.vars.thumbCaptions) {
                            var l = o.attr("data-thumbcaption");
                            "" != l && undefined != l && (s += '<span class="' + i + 'caption">' + l + "</span>")
                        }
                        r.controlNavScaffold.append("<li>" + s + "</li>");
                        n++
                    }
                    r.controlsContainer ? e(r.controlsContainer).append(r.controlNavScaffold) : r.append(r.controlNavScaffold);
                    v.controlNav.set();
                    v.controlNav.active();
                    r.controlNavScaffold.delegate("a, img", u, function (t) {
                        t.preventDefault();
                        if (a === "" || a === t.type) {
                            var n = e(this),
                                s = r.controlNav.index(n);
                            if (!n.hasClass(i + "active")) {
                                r.direction = s > r.currentSlide ? "next" : "prev";
                                r.flexAnimate(s, r.vars.pauseOnAction)
                            }
                        }
                        a === "" && (a = t.type);
                        v.setToClearWatchedEvent()
                    })
                },
                setupManual: function () {
                    r.controlNav = r.manualControls;
                    v.controlNav.active();
                    r.controlNav.bind(u, function (t) {
                        t.preventDefault();
                        if (a === "" || a === t.type) {
                            var n = e(this),
                                s = r.controlNav.index(n);
                            if (!n.hasClass(i + "active")) {
                                s > r.currentSlide ? r.direction = "next" : r.direction = "prev";
                                r.flexAnimate(s, r.vars.pauseOnAction)
                            }
                        }
                        a === "" && (a = t.type);
                        v.setToClearWatchedEvent()
                    })
                },
                set: function () {
                    var t = r.vars.controlNav === "thumbnails" ? "img" : "a";
                    r.controlNav = e("." + i + "control-nav li " + t, r.controlsContainer ? r.controlsContainer : r)
                },
                active: function () {
                    r.controlNav.removeClass(i + "active").eq(r.animatingTo).addClass(i + "active")
                },
                update: function (t, n) {
                    r.pagingCount > 1 && t === "add" ? r.controlNavScaffold.append(e("<li><a>" + r.count + "</a></li>")) : r.pagingCount === 1 ? r.controlNavScaffold.find("li").remove() : r.controlNav.eq(n).closest("li").remove();
                    v.controlNav.set();
                    r.pagingCount > 1 && r.pagingCount !== r.controlNav.length ? r.update(n, t) : v.controlNav.active()
                }
            },
            directionNav: {
                setup: function () {
                    var t = e('<ul class="' + i + 'direction-nav"><li><a class="' + i + 'prev" href="#">' + r.vars.prevText + '</a></li><li><a class="' + i + 'next" href="#">' + r.vars.nextText + "</a></li></ul>");
                    if (r.controlsContainer) {
                        e(r.controlsContainer).append(t);
                        r.directionNav = e("." + i + "direction-nav li a", r.controlsContainer)
                    } else {
                        r.append(t);
                        r.directionNav = e("." + i + "direction-nav li a", r)
                    }
                    v.directionNav.update();
                    r.directionNav.bind(u, function (t) {
                        t.preventDefault();
                        var n;
                        if (a === "" || a === t.type) {
                            n = e(this).hasClass(i + "next") ? r.getTarget("next") : r.getTarget("prev");
                            r.flexAnimate(n, r.vars.pauseOnAction)
                        }
                        a === "" && (a = t.type);
                        v.setToClearWatchedEvent()
                    })
                },
                update: function () {
                    var e = i + "disabled";
                    r.pagingCount === 1 ? r.directionNav.addClass(e).attr("tabindex", "-1") : r.vars.animationLoop ? r.directionNav.removeClass(e).removeAttr("tabindex") : r.animatingTo === 0 ? r.directionNav.removeClass(e).filter("." + i + "prev").addClass(e).attr("tabindex", "-1") : r.animatingTo === r.last ? r.directionNav.removeClass(e).filter("." + i + "next").addClass(e).attr("tabindex", "-1") : r.directionNav.removeClass(e).removeAttr("tabindex")
                }
            },
            pausePlay: {
                setup: function () {
                    var t = e('<div class="' + i + 'pauseplay"><a></a></div>');
                    if (r.controlsContainer) {
                        r.controlsContainer.append(t);
                        r.pausePlay = e("." + i + "pauseplay a", r.controlsContainer)
                    } else {
                        r.append(t);
                        r.pausePlay = e("." + i + "pauseplay a", r)
                    }
                    v.pausePlay.update(r.vars.slideshow ? i + "pause" : i + "play");
                    r.pausePlay.bind(u, function (t) {
                        t.preventDefault();
                        if (a === "" || a === t.type) if (e(this).hasClass(i + "pause")) {
                            r.manualPause = !0;
                            r.manualPlay = !1;
                            r.pause()
                        } else {
                            r.manualPause = !1;
                            r.manualPlay = !0;
                            r.play()
                        }
                        a === "" && (a = t.type);
                        v.setToClearWatchedEvent()
                    })
                },
                update: function (e) {
                    e === "play" ? r.pausePlay.removeClass(i + "pause").addClass(i + "play").html(r.vars.playText) : r.pausePlay.removeClass(i + "play").addClass(i + "pause").html(r.vars.pauseText)
                }
            },
            touch: function () {
                var e, n, i, o, u, a, f = !1,
                    d = 0,
                    v = 0,
                    m = 0;
                if (!s) {
                    t.addEventListener("touchstart", g, !1);

                    function g(s) {
                        if (r.animating) s.preventDefault();
                        else if (window.navigator.msPointerEnabled || s.touches.length === 1) {
                            r.pause();
                            o = l ? r.h : r.w;
                            a = Number(new Date);
                            d = s.touches[0].pageX;
                            v = s.touches[0].pageY;
                            i = h && c && r.animatingTo === r.last ? 0 : h && c ? r.limit - (r.itemW + r.vars.itemMargin) * r.move * r.animatingTo : h && r.currentSlide === r.last ? r.limit : h ? (r.itemW + r.vars.itemMargin) * r.move * r.currentSlide : c ? (r.last - r.currentSlide + r.cloneOffset) * o : (r.currentSlide + r.cloneOffset) * o;
                            e = l ? v : d;
                            n = l ? d : v;
                            t.addEventListener("touchmove", y, !1);
                            t.addEventListener("touchend", b, !1)
                        }
                    }
                    function y(t) {
                        d = t.touches[0].pageX;
                        v = t.touches[0].pageY;
                        u = l ? e - v : e - d;
                        f = l ? Math.abs(u) < Math.abs(d - n) : Math.abs(u) < Math.abs(v - n);
                        var s = 500;
                        if (!f || Number(new Date) - a > s) {
                            t.preventDefault();
                            if (!p && r.transitions) {
                                r.vars.animationLoop || (u /= r.currentSlide === 0 && u < 0 || r.currentSlide === r.last && u > 0 ? Math.abs(u) / o + 2 : 1);
                                r.setProps(i + u, "setTouch")
                            }
                        }
                    }
                    function b(s) {
                        t.removeEventListener("touchmove", y, !1);
                        if (r.animatingTo === r.currentSlide && !f && u !== null) {
                            var l = c ? -u : u,
                                h = l > 0 ? r.getTarget("next") : r.getTarget("prev");
                            r.canAdvance(h) && (Number(new Date) - a < 550 && Math.abs(l) > 50 || Math.abs(l) > o / 2) ? r.flexAnimate(h, r.vars.pauseOnAction) : p || r.flexAnimate(r.currentSlide, r.vars.pauseOnAction, !0)
                        }
                        t.removeEventListener("touchend", b, !1);
                        e = null;
                        n = null;
                        u = null;
                        i = null
                    }
                } else {
                    t.style.msTouchAction = "none";
                    t._gesture = new MSGesture;
                    t._gesture.target = t;
                    t.addEventListener("MSPointerDown", w, !1);
                    t._slider = r;
                    t.addEventListener("MSGestureChange", E, !1);
                    t.addEventListener("MSGestureEnd", S, !1);

                    function w(e) {
                        e.stopPropagation();
                        if (r.animating) e.preventDefault();
                        else {
                            r.pause();
                            t._gesture.addPointer(e.pointerId);
                            m = 0;
                            o = l ? r.h : r.w;
                            a = Number(new Date);
                            i = h && c && r.animatingTo === r.last ? 0 : h && c ? r.limit - (r.itemW + r.vars.itemMargin) * r.move * r.animatingTo : h && r.currentSlide === r.last ? r.limit : h ? (r.itemW + r.vars.itemMargin) * r.move * r.currentSlide : c ? (r.last - r.currentSlide + r.cloneOffset) * o : (r.currentSlide + r.cloneOffset) * o
                        }
                    }
                    function E(e) {
                        e.stopPropagation();
                        var n = e.target._slider;
                        if (!n) return;
                        var r = -e.translationX,
                            s = -e.translationY;
                        m += l ? s : r;
                        u = m;
                        f = l ? Math.abs(m) < Math.abs(-r) : Math.abs(m) < Math.abs(-s);
                        if (e.detail === e.MSGESTURE_FLAG_INERTIA) {
                            setImmediate(function () {
                                t._gesture.stop()
                            });
                            return
                        }
                        if (!f || Number(new Date) - a > 500) {
                            e.preventDefault();
                            if (!p && n.transitions) {
                                n.vars.animationLoop || (u = m / (n.currentSlide === 0 && m < 0 || n.currentSlide === n.last && m > 0 ? Math.abs(m) / o + 2 : 1));
                                n.setProps(i + u, "setTouch")
                            }
                        }
                    }
                    function S(t) {
                        t.stopPropagation();
                        var r = t.target._slider;
                        if (!r) return;
                        if (r.animatingTo === r.currentSlide && !f && u !== null) {
                            var s = c ? -u : u,
                                l = s > 0 ? r.getTarget("next") : r.getTarget("prev");
                            r.canAdvance(l) && (Number(new Date) - a < 550 && Math.abs(s) > 50 || Math.abs(s) > o / 2) ? r.flexAnimate(l, r.vars.pauseOnAction) : p || r.flexAnimate(r.currentSlide, r.vars.pauseOnAction, !0)
                        }
                        e = null;
                        n = null;
                        u = null;
                        i = null;
                        m = 0
                    }
                }
            },
            resize: function () {
                if (!r.animating && r.is(":visible")) {
                    h || r.doMath();
                    if (p) v.smoothHeight();
                    else if (h) {
                        r.slides.width(r.computedW);
                        r.update(r.pagingCount);
                        r.setProps()
                    } else if (l) {
                        r.viewport.height(r.h);
                        r.setProps(r.h, "setTotal")
                    } else {
                        r.vars.smoothHeight && v.smoothHeight();
                        r.newSlides.width(r.computedW);
                        r.setProps(r.computedW, "setTotal")
                    }
                }
            },
            smoothHeight: function (e) {
                if (!l || p) {
                    var t = p ? r : r.viewport;
                    e ? t.animate({
                        height: r.slides.eq(r.animatingTo).height()
                    }, e) : t.height(r.slides.eq(r.animatingTo).height())
                }
            },
            sync: function (t) {
                var n = e(r.vars.sync).data("flexslider"),
                    i = r.animatingTo;
                switch (t) {
                case "animate":
                    n.flexAnimate(i, r.vars.pauseOnAction, !1, !0);
                    break;
                case "play":
                    !n.playing && !n.asNav && n.play();
                    break;
                case "pause":
                    n.pause()
                }
            },
            pauseInvisible: {
                visProp: null,
                init: function () {
                    var e = ["webkit", "moz", "ms", "o"];
                    if ("hidden" in document) return "hidden";
                    for (var t = 0; t < e.length; t++) e[t] + "Hidden" in document && (v.pauseInvisible.visProp = e[t] + "Hidden");
                    if (v.pauseInvisible.visProp) {
                        var n = v.pauseInvisible.visProp.replace(/[H|h]idden/, "") + "visibilitychange";
                        document.addEventListener(n, function () {
                            v.pauseInvisible.isHidden() ? r.startTimeout ? clearTimeout(r.startTimeout) : r.pause() : r.started ? r.play() : r.vars.initDelay > 0 ? setTimeout(r.play, r.vars.initDelay) : r.play()
                        })
                    }
                },
                isHidden: function () {
                    return document[v.pauseInvisible.visProp] || !1
                }
            },
            setToClearWatchedEvent: function () {
                clearTimeout(f);
                f = setTimeout(function () {
                    a = ""
                }, 3e3)
            }
        };
        r.flexAnimate = function (t, n, s, u, a) {
            !r.vars.animationLoop && t !== r.currentSlide && (r.direction = t > r.currentSlide ? "next" : "prev");
            d && r.pagingCount === 1 && (r.direction = r.currentItem < t ? "next" : "prev");
            if (!r.animating && (r.canAdvance(t, a) || s) && r.is(":visible")) {
                if (d && u) {
                    var f = e(r.vars.asNavFor).data("flexslider");
                    r.atEnd = t === 0 || t === r.count - 1;
                    f.flexAnimate(t, !0, !1, !0, a);
                    r.direction = r.currentItem < t ? "next" : "prev";
                    f.direction = r.direction;
                    if (Math.ceil((t + 1) / r.visible) - 1 === r.currentSlide || t === 0) {
                        r.currentItem = t;
                        r.slides.removeClass(i + "active-slide").eq(t).addClass(i + "active-slide");
                        return !1
                    }
                    r.currentItem = t;
                    r.slides.removeClass(i + "active-slide").eq(t).addClass(i + "active-slide");
                    t = Math.floor(t / r.visible)
                }
                r.animating = !0;
                r.animatingTo = t;
                n && r.pause();
                r.vars.before(r);
                r.syncExists && !a && v.sync("animate");
                r.vars.controlNav && v.controlNav.active();
                h || r.slides.removeClass(i + "active-slide").eq(t).addClass(i + "active-slide");
                r.atEnd = t === 0 || t === r.last;
                r.vars.directionNav && v.directionNav.update();
                if (t === r.last) {
                    r.vars.end(r);
                    r.vars.animationLoop || r.pause()
                }
                if (!p) {
                    var m = l ? r.slides.filter(":first").height() : r.computedW,
                        g, y, b;
                    if (h) {
                        g = r.vars.itemMargin;
                        b = (r.itemW + g) * r.move * r.animatingTo;
                        y = b > r.limit && r.visible !== 1 ? r.limit : b
                    } else r.currentSlide === 0 && t === r.count - 1 && r.vars.animationLoop && r.direction !== "next" ? y = c ? (r.count + r.cloneOffset) * m : 0 : r.currentSlide === r.last && t === 0 && r.vars.animationLoop && r.direction !== "prev" ? y = c ? 0 : (r.count + 1) * m : y = c ? (r.count - 1 - t + r.cloneOffset) * m : (t + r.cloneOffset) * m;
                    r.setProps(y, "", r.vars.animationSpeed);
                    if (r.transitions) {
                        if (!r.vars.animationLoop || !r.atEnd) {
                            r.animating = !1;
                            r.currentSlide = r.animatingTo
                        }
                        r.container.unbind("webkitTransitionEnd transitionend");
                        r.container.bind("webkitTransitionEnd transitionend", function () {
                            r.wrapup(m)
                        })
                    } else r.container.animate(r.args, r.vars.animationSpeed, r.vars.easing, function () {
                        r.wrapup(m)
                    })
                } else if (!o) {
                    r.slides.eq(r.currentSlide).css({
                        zIndex: 1
                    }).animate({
                        opacity: 0
                    }, r.vars.animationSpeed, r.vars.easing);
                    r.slides.eq(t).css({
                        zIndex: 2
                    }).animate({
                        opacity: 1
                    }, r.vars.animationSpeed, r.vars.easing, r.wrapup)
                } else {
                    r.slides.eq(r.currentSlide).css({
                        opacity: 0,
                        zIndex: 1
                    });
                    r.slides.eq(t).css({
                        opacity: 1,
                        zIndex: 2
                    });
                    r.wrapup(m)
                }
                r.vars.smoothHeight && v.smoothHeight(r.vars.animationSpeed)
            }
        };
        r.wrapup = function (e) {
            !p && !h && (r.currentSlide === 0 && r.animatingTo === r.last && r.vars.animationLoop ? r.setProps(e, "jumpEnd") : r.currentSlide === r.last && r.animatingTo === 0 && r.vars.animationLoop && r.setProps(e, "jumpStart"));
            r.animating = !1;
            r.currentSlide = r.animatingTo;
            r.vars.after(r)
        };
        r.animateSlides = function () {
            !r.animating && m && r.flexAnimate(r.getTarget("next"))
        };
        r.pause = function () {
            clearInterval(r.animatedSlides);
            r.animatedSlides = null;
            r.playing = !1;
            r.vars.pausePlay && v.pausePlay.update("play");
            r.syncExists && v.sync("pause")
        };
        r.play = function () {
            r.playing && clearInterval(r.animatedSlides);
            r.animatedSlides = r.animatedSlides || setInterval(r.animateSlides, r.vars.slideshowSpeed);
            r.started = r.playing = !0;
            r.vars.pausePlay && v.pausePlay.update("pause");
            r.syncExists && v.sync("play")
        };
        r.stop = function () {
            r.pause();
            r.stopped = !0
        };
        r.canAdvance = function (e, t) {
            var n = d ? r.pagingCount - 1 : r.last;
            return t ? !0 : d && r.currentItem === r.count - 1 && e === 0 && r.direction === "prev" ? !0 : d && r.currentItem === 0 && e === r.pagingCount - 1 && r.direction !== "next" ? !1 : e === r.currentSlide && !d ? !1 : r.vars.animationLoop ? !0 : r.atEnd && r.currentSlide === 0 && e === n && r.direction !== "next" ? !1 : r.atEnd && r.currentSlide === n && e === 0 && r.direction === "next" ? !1 : !0
        };
        r.getTarget = function (e) {
            r.direction = e;
            return e === "next" ? r.currentSlide === r.last ? 0 : r.currentSlide + 1 : r.currentSlide === 0 ? r.last : r.currentSlide - 1
        };
        r.setProps = function (e, t, n) {
            var i = function () {
                    var n = e ? e : (r.itemW + r.vars.itemMargin) * r.move * r.animatingTo,
                        i = function () {
                            if (h) return t === "setTouch" ? e : c && r.animatingTo === r.last ? 0 : c ? r.limit - (r.itemW + r.vars.itemMargin) * r.move * r.animatingTo : r.animatingTo === r.last ? r.limit : n;
                            switch (t) {
                            case "setTotal":
                                return c ? (r.count - 1 - r.currentSlide + r.cloneOffset) * e : (r.currentSlide + r.cloneOffset) * e;
                            case "setTouch":
                                return c ? e : e;
                            case "jumpEnd":
                                return c ? e : r.count * e;
                            case "jumpStart":
                                return c ? r.count * e : e;
                            default:
                                return e
                            }
                        }();
                    return i * -1 + "px"
                }();
            if (r.transitions) {
                i = l ? "translate3d(0," + i + ",0)" : "translate3d(" + i + ",0,0)";
                n = n !== undefined ? n / 1e3 + "s" : "0s";
                r.container.css("-" + r.pfx + "-transition-duration", n)
            }
            r.args[r.prop] = i;
            (r.transitions || n === undefined) && r.container.css(r.args)
        };
        r.setup = function (t) {
            if (!p) {
                var n, s;
                if (t === "init") {
                    r.viewport = e('<div class="' + i + 'viewport"></div>').css({
                        overflow: "hidden",
                        position: "relative"
                    }).appendTo(r).append(r.container);
                    r.cloneCount = 0;
                    r.cloneOffset = 0;
                    if (c) {
                        s = e.makeArray(r.slides).reverse();
                        r.slides = e(s);
                        r.container.empty().append(r.slides)
                    }
                }
                if (r.vars.animationLoop && !h) {
                    r.cloneCount = 2;
                    r.cloneOffset = 1;
                    t !== "init" && r.container.find(".clone").remove();
                    r.container.append(r.slides.first().clone().addClass("clone").attr("aria-hidden", "true")).prepend(r.slides.last().clone().addClass("clone").attr("aria-hidden", "true"))
                }
                r.newSlides = e(r.vars.selector, r);
                n = c ? r.count - 1 - r.currentSlide + r.cloneOffset : r.currentSlide + r.cloneOffset;
                if (l && !h) {
                    r.container.height((r.count + r.cloneCount) * 200 + "%").css("position", "absolute").width("100%");
                    setTimeout(function () {
                        r.newSlides.css({
                            display: "block"
                        });
                        r.doMath();
                        r.viewport.height(r.h);
                        r.setProps(n * r.h, "init")
                    }, t === "init" ? 100 : 0)
                } else {
                    r.container.width((r.count + r.cloneCount) * 200 + "%");
                    r.setProps(n * r.computedW, "init");
                    setTimeout(function () {
                        r.doMath();
                        r.newSlides.css({
                            width: r.computedW,
                            "float": "left",
                            display: "block"
                        });
                        r.vars.smoothHeight && v.smoothHeight()
                    }, t === "init" ? 100 : 0)
                }
            } else {
                r.slides.css({
                    width: "100%",
                    "float": "left",
                    marginRight: "-100%",
                    position: "relative"
                });
                t === "init" && (o ? r.slides.css({
                    opacity: 0,
                    display: "block",
                    webkitTransition: "opacity " + r.vars.animationSpeed / 1e3 + "s ease",
                    zIndex: 1
                }).eq(r.currentSlide).css({
                    opacity: 1,
                    zIndex: 2
                }) : r.slides.css({
                    opacity: 0,
                    display: "block",
                    zIndex: 1
                }).eq(r.currentSlide).css({
                    zIndex: 2
                }).animate({
                    opacity: 1
                }, r.vars.animationSpeed, r.vars.easing));
                r.vars.smoothHeight && v.smoothHeight()
            }
            h || r.slides.removeClass(i + "active-slide").eq(r.currentSlide).addClass(i + "active-slide")
        };
        r.doMath = function () {
            var e = r.slides.first(),
                t = r.vars.itemMargin,
                n = r.vars.minItems,
                i = r.vars.maxItems;
            r.w = r.viewport === undefined ? r.width() : r.viewport.width();
            r.h = e.height();
            r.boxPadding = e.outerWidth() - e.width();
            if (h) {
                r.itemT = r.vars.itemWidth + t;
                r.minW = n ? n * r.itemT : r.w;
                r.maxW = i ? i * r.itemT - t : r.w;
                r.itemW = r.minW > r.w ? (r.w - t * (n - 1)) / n : r.maxW < r.w ? (r.w - t * (i - 1)) / i : r.vars.itemWidth > r.w ? r.w : r.vars.itemWidth;
                r.visible = Math.floor(r.w / r.itemW);
                r.move = r.vars.move > 0 && r.vars.move < r.visible ? r.vars.move : r.visible;
                r.pagingCount = Math.ceil((r.count - r.visible) / r.move + 1);
                r.last = r.pagingCount - 1;
                r.limit = r.pagingCount === 1 ? 0 : r.vars.itemWidth > r.w ? r.itemW * (r.count - 1) + t * (r.count - 1) : (r.itemW + t) * r.count - r.w - t
            } else {
                r.itemW = r.w;
                r.pagingCount = r.count;
                r.last = r.count - 1
            }
            r.computedW = r.itemW - r.boxPadding
        };
        r.update = function (e, t) {
            r.doMath();
            if (!h) {
                e < r.currentSlide ? r.currentSlide += 1 : e <= r.currentSlide && e !== 0 && (r.currentSlide -= 1);
                r.animatingTo = r.currentSlide
            }
            if (r.vars.controlNav && !r.manualControls) if (t === "add" && !h || r.pagingCount > r.controlNav.length) v.controlNav.update("add");
            else if (t === "remove" && !h || r.pagingCount < r.controlNav.length) {
                if (h && r.currentSlide > r.last) {
                    r.currentSlide -= 1;
                    r.animatingTo -= 1
                }
                v.controlNav.update("remove", r.last)
            }
            r.vars.directionNav && v.directionNav.update()
        };
        r.addSlide = function (t, n) {
            var i = e(t);
            r.count += 1;
            r.last = r.count - 1;
            l && c ? n !== undefined ? r.slides.eq(r.count - n).after(i) : r.container.prepend(i) : n !== undefined ? r.slides.eq(n).before(i) : r.container.append(i);
            r.update(n, "add");
            r.slides = e(r.vars.selector + ":not(.clone)", r);
            r.setup();
            r.vars.added(r)
        };
        r.removeSlide = function (t) {
            var n = isNaN(t) ? r.slides.index(e(t)) : t;
            r.count -= 1;
            r.last = r.count - 1;
            isNaN(t) ? e(t, r.slides).remove() : l && c ? r.slides.eq(r.last).remove() : r.slides.eq(t).remove();
            r.doMath();
            r.update(n, "remove");
            r.slides = e(r.vars.selector + ":not(.clone)", r);
            r.setup();
            r.vars.removed(r)
        };
        v.init()
    };
    e(window).blur(function (e) {
        focused = !1
    }).focus(function (e) {
        focused = !0
    });
    e.flexslider.defaults = {
        namespace: "flex-",
        selector: ".slides > li",
        animation: "fade",
        easing: "swing",
        direction: "horizontal",
        reverse: !1,
        animationLoop: !0,
        smoothHeight: !1,
        startAt: 0,
        slideshow: !0,
        slideshowSpeed: 7e3,
        animationSpeed: 600,
        initDelay: 0,
        randomize: !1,
        thumbCaptions: !1,
        pauseOnAction: !0,
        pauseOnHover: !1,
        pauseInvisible: !0,
        useCSS: !0,
        touch: !0,
        video: !1,
        controlNav: !0,
        directionNav: !0,
        prevText: "Previous",
        nextText: "Next",
        keyboard: !0,
        multipleKeyboard: !1,
        mousewheel: !1,
        pausePlay: !1,
        pauseText: "Pause",
        playText: "Play",
        controlsContainer: "",
        manualControls: "",
        sync: "",
        asNavFor: "",
        itemWidth: 0,
        itemMargin: 0,
        minItems: 1,
        maxItems: 0,
        move: 0,
        allowOneSlide: !0,
        start: function () {},
        before: function () {},
        after: function () {},
        end: function () {},
        added: function () {},
        removed: function () {}
    };
    e.fn.flexslider = function (t) {
        t === undefined && (t = {});
        if (typeof t == "object") return this.each(function () {
            var n = e(this),
                r = t.selector ? t.selector : ".slides > li",
                i = n.find(r);
            if (i.length === 1 && t.allowOneSlide === !0 || i.length === 0) {
                i.fadeIn(400);
                t.start && t.start(n)
            } else n.data("flexslider") === undefined && new e.flexslider(this, t)
        });
        var n = e(this).data("flexslider");
        switch (t) {
        case "play":
            n.play();
            break;
        case "pause":
            n.pause();
            break;
        case "stop":
            n.stop();
            break;
        case "next":
            n.flexAnimate(n.getTarget("next"), !0);
            break;
        case "prev":
        case "previous":
            n.flexAnimate(n.getTarget("prev"), !0);
            break;
        default:
            typeof t == "number" && n.flexAnimate(t, !0)
        }
    }
})(jQuery);
(function (e) {
    function t(t, r, o, u, a) {
        function f() {
            m.unbind("webkitTransitionEnd transitionend otransitionend oTransitionEnd");
            r && n(r, o, u, a);
            a.startOrder = [];
            a.newOrder = [];
            a.origSort = [];
            a.checkSort = [];
            v.removeStyle(a.prefix + "filter, filter, " + a.prefix + "transform, transform, opacity, display").css(a.clean).removeAttr("data-checksum");
            window.atob || v.css({
                display: "none",
                opacity: "0"
            });
            m.removeStyle(a.prefix + "transition, transition, " + a.prefix + "perspective, perspective, " + a.prefix + "perspective-origin, perspective-origin, " + (a.resizeContainer ? "height" : ""));
            "list" == a.layoutMode ? (g.css({
                display: a.targetDisplayList,
                opacity: "1"
            }), a.origDisplay = a.targetDisplayList) : (g.css({
                display: a.targetDisplayGrid,
                opacity: "1"
            }), a.origDisplay = a.targetDisplayGrid);
            a.origLayout = a.layoutMode;
            setTimeout(function () {
                v.removeStyle(a.prefix + "transition, transition");
                a.mixing = !1;
                if ("function" == typeof a.onMixEnd) {
                    var e = a.onMixEnd.call(this, a);
                    a = e ? e : a
                }
            })
        }
        clearInterval(a.failsafe);
        a.mixing = !0;
        a.filter = t;
        if ("function" == typeof a.onMixStart) {
            var l = a.onMixStart.call(this, a);
            a = l ? l : a
        }
        for (var c = a.transitionSpeed, l = 0; 2 > l; l++) {
            var h = 0 == l ? h = a.prefix : "";
            a.transition[h + "transition"] = "all " + c + "ms linear";
            a.transition[h + "transform"] = h + "translate3d(0,0,0)";
            a.perspective[h + "perspective"] = a.perspectiveDistance + "px";
            a.perspective[h + "perspective-origin"] = a.perspectiveOrigin
        }
        var p = a.targetSelector,
            v = u.find(p);
        v.each(function () {
            this.data = {}
        });
        var m = v.parent();
        m.css(a.perspective);
        a.easingFallback = "ease-in-out";
        "smooth" == a.easing && (a.easing = "cubic-bezier(0.25, 0.46, 0.45, 0.94)");
        "snap" == a.easing && (a.easing = "cubic-bezier(0.77, 0, 0.175, 1)");
        "windback" == a.easing && (a.easing = "cubic-bezier(0.175, 0.885, 0.320, 1.275)", a.easingFallback = "cubic-bezier(0.175, 0.885, 0.320, 1)");
        "windup" == a.easing && (a.easing = "cubic-bezier(0.6, -0.28, 0.735, 0.045)", a.easingFallback = "cubic-bezier(0.6, 0.28, 0.735, 0.045)");
        l = "list" == a.layoutMode && null != a.listEffects ? a.listEffects : a.effects;
        Array.prototype.indexOf && (a.fade = -1 < l.indexOf("fade") ? "0" : "", a.scale = -1 < l.indexOf("scale") ? "scale(.01)" : "", a.rotateZ = -1 < l.indexOf("rotateZ") ? "rotate(180deg)" : "", a.rotateY = -1 < l.indexOf("rotateY") ? "rotateY(90deg)" : "", a.rotateX = -1 < l.indexOf("rotateX") ? "rotateX(90deg)" : "", a.blur = -1 < l.indexOf("blur") ? "blur(8px)" : "", a.grayscale = -1 < l.indexOf("grayscale") ? "grayscale(100%)" : "");
        var g = e(),
            y = e(),
            b = [],
            w = !1;
        "string" === typeof t ? b = s(t) : (w = !0, e.each(t, function (e) {
            b[e] = s(this)
        }));
        "or" == a.filterLogic ? ("" == b[0] && b.shift(), 1 > b.length ? y = y.add(u.find(p + ":visible")) : v.each(function () {
            var t = e(this);
            if (w) {
                var n = 0;
                e.each(b, function (e) {
                    this.length ? t.is("." + this.join(", .")) && n++ : 0 < n && n++
                });
                n == b.length ? g = g.add(t) : y = y.add(t)
            } else t.is("." + b.join(", .")) ? g = g.add(t) : y = y.add(t)
        })) : (g = g.add(m.find(p + "." + b.join("."))), y = y.add(m.find(p + ":not(." + b.join(".") + "):visible")));
        t = g.length;
        var E = e(),
            S = e(),
            T = e();
        y.each(function () {
            var t = e(this);
            "none" != t.css("display") && (E = E.add(t), T = T.add(t))
        });
        if (g.filter(":visible").length == t && !E.length && !r) {
            if (a.origLayout == a.layoutMode) return f(), !1;
            if (1 == g.length) return "list" == a.layoutMode ? (u.addClass(a.listClass), u.removeClass(a.gridClass), T.css("display", a.targetDisplayList)) : (u.addClass(a.gridClass), u.removeClass(a.listClass), T.css("display", a.targetDisplayGrid)), f(), !1
        }
        a.origHeight = m.height();
        if (g.length) {
            u.removeClass(a.failClass);
            g.each(function () {
                var t = e(this);
                "none" == t.css("display") ? S = S.add(t) : T = T.add(t)
            });
            if (a.origLayout != a.layoutMode && !1 == a.animateGridList) return "list" == a.layoutMode ? (u.addClass(a.listClass), u.removeClass(a.gridClass), T.css("display", a.targetDisplayList)) : (u.addClass(a.gridClass), u.removeClass(a.listClass), T.css("display", a.targetDisplayGrid)), f(), !1;
            if (!window.atob) return f(), !1;
            v.css(a.clean);
            T.each(function () {
                this.data.origPos = e(this).offset()
            });
            "list" == a.layoutMode ? (u.addClass(a.listClass), u.removeClass(a.gridClass), S.css("display", a.targetDisplayList)) : (u.addClass(a.gridClass), u.removeClass(a.listClass), S.css("display", a.targetDisplayGrid));
            S.each(function () {
                this.data.showInterPos = e(this).offset()
            });
            E.each(function () {
                this.data.hideInterPos = e(this).offset()
            });
            T.each(function () {
                this.data.preInterPos = e(this).offset()
            });
            "list" == a.layoutMode ? T.css("display", a.targetDisplayList) : T.css("display", a.targetDisplayGrid);
            r && n(r, o, u, a);
            if (r && i(a.origSort, a.checkSort)) return f(), !1;
            E.hide();
            S.each(function (t) {
                this.data.finalPos = e(this).offset()
            });
            T.each(function () {
                this.data.finalPrePos = e(this).offset()
            });
            a.newHeight = m.height();
            r && n("reset", null, u, a);
            S.hide();
            T.css("display", a.origDisplay);
            "block" == a.origDisplay ? (u.addClass(a.listClass), S.css("display", a.targetDisplayList)) : (u.removeClass(a.listClass), S.css("display", a.targetDisplayGrid));
            a.resizeContainer && m.css("height", a.origHeight + "px");
            t = {};
            for (l = 0; 2 > l; l++) h = 0 == l ? h = a.prefix : "", t[h + "transform"] = a.scale + " " + a.rotateX + " " + a.rotateY + " " + a.rotateZ, t[h + "filter"] = a.blur + " " + a.grayscale;
            S.css(t);
            T.each(function () {
                var t = this.data,
                    n = e(this);
                n.hasClass("mix_tohide") ? (t.preTX = t.origPos.left - t.hideInterPos.left, t.preTY = t.origPos.top - t.hideInterPos.top) : (t.preTX = t.origPos.left - t.preInterPos.left, t.preTY = t.origPos.top - t.preInterPos.top);
                for (var r = {}, i = 0; 2 > i; i++) {
                    var s = 0 == i ? s = a.prefix : "";
                    r[s + "transform"] = "translate(" + t.preTX + "px," + t.preTY + "px)"
                }
                n.css(r)
            });
            "list" == a.layoutMode ? (u.addClass(a.listClass), u.removeClass(a.gridClass)) : (u.addClass(a.gridClass), u.removeClass(a.listClass));
            setTimeout(function () {
                if (a.resizeContainer) {
                    for (var t = {}, n = 0; 2 > n; n++) {
                        var r = 0 == n ? r = a.prefix : "";
                        t[r + "transition"] = "all " + c + "ms ease-in-out";
                        t.height = a.newHeight + "px"
                    }
                    m.css(t)
                }
                E.css("opacity", a.fade);
                S.css("opacity", 1);
                S.each(function () {
                    var t = this.data;
                    t.tX = t.finalPos.left - t.showInterPos.left;
                    t.tY = t.finalPos.top - t.showInterPos.top;
                    for (var n = {}, r = 0; 2 > r; r++) {
                        var i = 0 == r ? i = a.prefix : "";
                        n[i + "transition-property"] = i + "transform, " + i + "filter, opacity";
                        n[i + "transition-timing-function"] = a.easing + ", linear, linear";
                        n[i + "transition-duration"] = c + "ms";
                        n[i + "transition-delay"] = "0";
                        n[i + "transform"] = "translate(" + t.tX + "px," + t.tY + "px)";
                        n[i + "filter"] = "none"
                    }
                    e(this).css("-webkit-transition", "all " + c + "ms " + a.easingFallback).css(n)
                });
                T.each(function () {
                    var t = this.data;
                    t.tX = 0 != t.finalPrePos.left ? t.finalPrePos.left - t.preInterPos.left : 0;
                    t.tY = 0 != t.finalPrePos.left ? t.finalPrePos.top - t.preInterPos.top : 0;
                    for (var n = {}, r = 0; 2 > r; r++) {
                        var i = 0 == r ? i = a.prefix : "";
                        n[i + "transition"] = "all " + c + "ms " + a.easing;
                        n[i + "transform"] = "translate(" + t.tX + "px," + t.tY + "px)"
                    }
                    e(this).css("-webkit-transition", "all " + c + "ms " + a.easingFallback).css(n)
                });
                t = {};
                for (n = 0; 2 > n; n++) r = 0 == n ? r = a.prefix : "", t[r + "transition"] = "all " + c + "ms " + a.easing + ", " + r + "filter " + c + "ms linear, opacity " + c + "ms linear", t[r + "transform"] = a.scale + " " + a.rotateX + " " + a.rotateY + " " + a.rotateZ, t[r + "filter"] = a.blur + " " + a.grayscale, t.opacity = a.fade;
                E.css(t);
                m.bind("webkitTransitionEnd transitionend otransitionend oTransitionEnd", function (t) {
                    if (-1 < t.originalEvent.propertyName.indexOf("transform") || -1 < t.originalEvent.propertyName.indexOf("opacity")) - 1 < p.indexOf(".") ? e(t.target).hasClass(p.replace(".", "")) && f() : e(t.target).is(p) && f()
                })
            }, 10);
            a.failsafe = setTimeout(function () {
                a.mixing && f()
            }, c + 400)
        } else {
            a.resizeContainer && m.css("height", a.origHeight + "px");
            if (!window.atob) return f(), !1;
            E = y;
            setTimeout(function () {
                m.css(a.perspective);
                if (a.resizeContainer) {
                    for (var e = {}, t = 0; 2 > t; t++) {
                        var n = 0 == t ? n = a.prefix : "";
                        e[n + "transition"] = "height " + c + "ms ease-in-out";
                        e.height = a.minHeight + "px"
                    }
                    m.css(e)
                }
                v.css(a.transition);
                if (y.length) {
                    e = {};
                    for (t = 0; 2 > t; t++) n = 0 == t ? n = a.prefix : "", e[n + "transform"] = a.scale + " " + a.rotateX + " " + a.rotateY + " " + a.rotateZ, e[n + "filter"] = a.blur + " " + a.grayscale, e.opacity = a.fade;
                    E.css(e);
                    m.bind("webkitTransitionEnd transitionend otransitionend oTransitionEnd", function (e) {
                        if (-1 < e.originalEvent.propertyName.indexOf("transform") || -1 < e.originalEvent.propertyName.indexOf("opacity")) u.addClass(a.failClass), f()
                    })
                } else a.mixing = !1
            }, 10)
        }
    }
    function n(t, n, r, i) {
        function s(e, n) {
            var r = isNaN(1 * e.attr(t)) ? e.attr(t).toLowerCase() : 1 * e.attr(t),
                i = isNaN(1 * n.attr(t)) ? n.attr(t).toLowerCase() : 1 * n.attr(t);
            return r < i ? -1 : r > i ? 1 : 0
        }
        function o(e) {
            "asc" == n ? a.prepend(e).prepend(" ") : a.append(e).append(" ")
        }
        function u(e) {
            e = e.slice();
            for (var t = e.length, n = t; n--;) {
                var r = parseInt(Math.random() * t),
                    i = e[n];
                e[n] = e[r];
                e[r] = i
            }
            return e
        }
        r.find(i.targetSelector).wrapAll('<div class="mix_sorter"/>');
        var a = r.find(".mix_sorter");
        i.origSort.length || a.find(i.targetSelector + ":visible").each(function () {
            e(this).wrap("<s/>");
            i.origSort.push(e(this).parent().html().replace(/\s+/g, ""));
            e(this).unwrap()
        });
        a.empty();
        if ("reset" == t) e.each(i.startOrder, function () {
            a.append(this).append(" ")
        });
        else if ("default" == t) e.each(i.origOrder, function () {
            o(this)
        });
        else if ("random" == t) i.newOrder.length || (i.newOrder = u(i.startOrder)), e.each(i.newOrder, function () {
            a.append(this).append(" ")
        });
        else if ("custom" == t) e.each(n, function () {
            o(this)
        });
        else {
            if ("undefined" === typeof i.origOrder[0].attr(t)) return console.log("No such attribute found. Terminating"), !1;
            i.newOrder.length || (e.each(i.origOrder, function () {
                i.newOrder.push(e(this))
            }), i.newOrder.sort(s));
            e.each(i.newOrder, function () {
                o(this)
            })
        }
        i.checkSort = [];
        a.find(i.targetSelector + ":visible").each(function (t) {
            var n = e(this);
            0 == t && n.attr("data-checksum", "1");
            n.wrap("<s/>");
            i.checkSort.push(n.parent().html().replace(/\s+/g, ""));
            n.unwrap()
        });
        r.find(i.targetSelector).unwrap()
    }
    function r(e) {
        for (var t = ["Webkit", "Moz", "O", "ms"], n = 0; n < t.length; n++) if (t[n] + "Transition" in e.style) return t[n];
        return "transition" in e.style ? "" : !1
    }
    function i(e, t) {
        if (e.length != t.length) return !1;
        for (var n = 0; n < t.length; n++) if (e[n].compare && !e[n].compare(t[n]) || e[n] !== t[n]) return !1;
        return !0
    }
    function s(t) {
        t = t.replace(/\s{2,}/g, " ");
        var n = t.split(" ");
        e.each(n, function (e) {
            "all" == this && (n[e] = "mix_all")
        });
        "" == n[0] && n.shift();
        return n
    }
    var o = {
        init: function (i) {
            return this.each(function () {
                var s = window.navigator.appVersion.match(/Chrome\/(\d+)\./),
                    s = s ? parseInt(s[1], 10) : !1,
                    o = function (e) {
                        e = document.getElementById(e);
                        var t = e.parentElement,
                            n = document.createElement("div"),
                            r = document.createDocumentFragment();
                        t.insertBefore(n, e);
                        r.appendChild(e);
                        t.replaceChild(e, n)
                    };
                (s && 31 == s || 32 == s) && o(this.id);
                var u = {
                    targetSelector: ".mix",
                    filterSelector: ".filter",
                    sortSelector: ".sort",
                    buttonEvent: "click",
                    effects: ["fade", "scale"],
                    listEffects: null,
                    easing: "smooth",
                    layoutMode: "grid",
                    targetDisplayGrid: "inline-block",
                    targetDisplayList: "block",
                    listClass: "",
                    gridClass: "",
                    transitionSpeed: 600,
                    showOnLoad: "all",
                    sortOnLoad: !1,
                    multiFilter: !1,
                    filterLogic: "or",
                    resizeContainer: !0,
                    minHeight: 0,
                    failClass: "fail",
                    perspectiveDistance: "3000",
                    perspectiveOrigin: "50% 50%",
                    animateGridList: !0,
                    onMixLoad: null,
                    onMixStart: null,
                    onMixEnd: null,
                    container: null,
                    origOrder: [],
                    startOrder: [],
                    newOrder: [],
                    origSort: [],
                    checkSort: [],
                    filter: "",
                    mixing: !1,
                    origDisplay: "",
                    origLayout: "",
                    origHeight: 0,
                    newHeight: 0,
                    isTouch: !1,
                    resetDelay: 0,
                    failsafe: null,
                    prefix: "",
                    easingFallback: "ease-in-out",
                    transition: {},
                    perspective: {},
                    clean: {},
                    fade: "1",
                    scale: "",
                    rotateX: "",
                    rotateY: "",
                    rotateZ: "",
                    blur: "",
                    grayscale: ""
                };
                i && e.extend(u, i);
                this.config = u;
                e.support.touch = "ontouchend" in document;
                e.support.touch && (u.isTouch = !0, u.resetDelay = 350);
                u.container = e(this);
                var a = u.container;
                u.prefix = r(a[0]);
                u.prefix = u.prefix ? "-" + u.prefix.toLowerCase() + "-" : "";
                a.find(u.targetSelector).each(function () {
                    u.origOrder.push(e(this))
                });
                if (u.sortOnLoad) {
                    var f;
                    e.isArray(u.sortOnLoad) ? (s = u.sortOnLoad[0], f = u.sortOnLoad[1], e(u.sortSelector + "[data-sort=" + u.sortOnLoad[0] + "][data-order=" + u.sortOnLoad[1] + "]").addClass("active")) : (e(u.sortSelector + "[data-sort=" + u.sortOnLoad + "]").addClass("active"), s = u.sortOnLoad, u.sortOnLoad = "desc");
                    n(s, f, a, u)
                }
                for (f = 0; 2 > f; f++) s = 0 == f ? s = u.prefix : "", u.transition[s + "transition"] = "all " + u.transitionSpeed + "ms ease-in-out", u.perspective[s + "perspective"] = u.perspectiveDistance + "px", u.perspective[s + "perspective-origin"] = u.perspectiveOrigin;
                for (f = 0; 2 > f; f++) s = 0 == f ? s = u.prefix : "", u.clean[s + "transition"] = "none";
                "list" == u.layoutMode ? (a.addClass(u.listClass), u.origDisplay = u.targetDisplayList) : (a.addClass(u.gridClass), u.origDisplay = u.targetDisplayGrid);
                u.origLayout = u.layoutMode;
                f = u.showOnLoad.split(" ");
                e.each(f, function () {
                    e(u.filterSelector + '[data-filter="' + this + '"]').addClass("active")
                });
                a.find(u.targetSelector).addClass("mix_all");
                "all" == f[0] && (f[0] = "mix_all", u.showOnLoad = "mix_all");
                var l = e();
                e.each(f, function () {
                    l = l.add(e("." + this))
                });
                l.each(function () {
                    var t = e(this);
                    "list" == u.layoutMode ? t.css("display", u.targetDisplayList) : t.css("display", u.targetDisplayGrid);
                    t.css(u.transition)
                });
                setTimeout(function () {
                    u.mixing = !0;
                    l.css("opacity", "1");
                    setTimeout(function () {
                        "list" == u.layoutMode ? l.removeStyle(u.prefix + "transition, transition").css({
                            display: u.targetDisplayList,
                            opacity: 1
                        }) : l.removeStyle(u.prefix + "transition, transition").css({
                            display: u.targetDisplayGrid,
                            opacity: 1
                        });
                        u.mixing = !1;
                        if ("function" == typeof u.onMixLoad) {
                            var e = u.onMixLoad.call(this, u);
                            u = e ? e : u
                        }
                    }, u.transitionSpeed)
                }, 10);
                u.filter = u.showOnLoad;
                e(u.sortSelector).bind(u.buttonEvent, function () {
                    if (!u.mixing) {
                        var n = e(this),
                            r = n.attr("data-sort"),
                            i = n.attr("data-order");
                        if (!n.hasClass("active")) e(u.sortSelector).removeClass("active"), n.addClass("active");
                        else if ("random" != r) return !1;
                        a.find(u.targetSelector).each(function () {
                            u.startOrder.push(e(this))
                        });
                        t(u.filter, r, i, a, u)
                    }
                });
                e(u.filterSelector).bind(u.buttonEvent, function () {
                    if (!u.mixing) {
                        var n = e(this);
                        if (!1 == u.multiFilter) e(u.filterSelector).removeClass("active"), n.addClass("active"), u.filter = n.attr("data-filter"), e(u.filterSelector + '[data-filter="' + u.filter + '"]').addClass("active");
                        else {
                            var r = n.attr("data-filter");
                            n.hasClass("active") ? (n.removeClass("active"), u.filter = u.filter.replace(RegExp("(\\s|^)" + r), "")) : (n.addClass("active"), u.filter = u.filter + " " + r)
                        }
                        t(u.filter, null, null, a, u)
                    }
                })
            })
        },
        toGrid: function () {
            return this.each(function () {
                var n = this.config;
                "grid" != n.layoutMode && (n.layoutMode = "grid", t(n.filter, null, null, e(this), n))
            })
        },
        toList: function () {
            return this.each(function () {
                var n = this.config;
                "list" != n.layoutMode && (n.layoutMode = "list", t(n.filter, null, null, e(this), n))
            })
        },
        filter: function (n) {
            return this.each(function () {
                var r = this.config;
                r.mixing || (e(r.filterSelector).removeClass("active"), e(r.filterSelector + '[data-filter="' + n + '"]').addClass("active"), t(n, null, null, e(this), r))
            })
        },
        sort: function (n) {
            return this.each(function () {
                var r = this.config,
                    i = e(this);
                if (!r.mixing) {
                    e(r.sortSelector).removeClass("active");
                    if (e.isArray(n)) {
                        var s = n[0],
                            o = n[1];
                        e(r.sortSelector + '[data-sort="' + n[0] + '"][data-order="' + n[1] + '"]').addClass("active")
                    } else e(r.sortSelector + '[data-sort="' + n + '"]').addClass("active"), s = n, o = "desc";
                    i.find(r.targetSelector).each(function () {
                        r.startOrder.push(e(this))
                    });
                    t(r.filter, s, o, i, r)
                }
            })
        },
        multimix: function (n) {
            return this.each(function () {
                var r = this.config,
                    i = e(this);
                multiOut = {
                    filter: r.filter,
                    sort: null,
                    order: "desc",
                    layoutMode: r.layoutMode
                };
                e.extend(multiOut, n);
                r.mixing || (e(r.filterSelector).add(r.sortSelector).removeClass("active"), e(r.filterSelector + '[data-filter="' + multiOut.filter + '"]').addClass("active"), "undefined" !== typeof multiOut.sort && (e(r.sortSelector + '[data-sort="' + multiOut.sort + '"][data-order="' + multiOut.order + '"]').addClass("active"), i.find(r.targetSelector).each(function () {
                    r.startOrder.push(e(this))
                })), r.layoutMode = multiOut.layoutMode, t(multiOut.filter, multiOut.sort, multiOut.order, i, r))
            })
        },
        remix: function (n) {
            return this.each(function () {
                var r = this.config,
                    i = e(this);
                r.origOrder = [];
                i.find(r.targetSelector).each(function () {
                    var t = e(this);
                    t.addClass("mix_all");
                    r.origOrder.push(t)
                });
                r.mixing || "undefined" === typeof n || (e(r.filterSelector).removeClass("active"), e(r.filterSelector + '[data-filter="' + n + '"]').addClass("active"), t(n, null, null, i, r))
            })
        }
    };
    e.fn.mixitup = function (e, t) {
        if (o[e]) return o[e].apply(this, Array.prototype.slice.call(arguments, 1));
        if ("object" === typeof e || !e) return o.init.apply(this, arguments)
    };
    e.fn.removeStyle = function (t) {
        return this.each(function () {
            var n = e(this);
            t = t.replace(/\s+/g, "");
            var r = t.split(",");
            e.each(r, function () {
                var e = RegExp(this.toString() + "[^;]+;?", "g");
                n.attr("style", function (t, n) {
                    if (n) return n.replace(e, "")
                })
            })
        })
    }
})(jQuery);
jQuery(function (e) {
    function n(n) {
        t.find(".slides > li:eq(" + n + ") .themina-caption").each(function () {
            var n = e(this),
                r = e(this).data("positions");
            if (r.left == "center") {
                r.left = (t.width() - n.width()) / 2;
                n.css("left", r.left + "px");
                n.data("positions", r)
            }
            if (r.top == "center") {
                r.top = (t.height() - n.height()) / 2;
                n.css("left", r.top + "px");
                n.data("positions", r)
            }
        })
    }
    var t = e(".homeslider > .flexslider");
    t.find(".themina-caption").each(function () {
        var n = e(this);
        var r = {
            left: n.data("x"),
            top: n.data("y"),
            speed: n.data("speed") + "ms",
            delay: n.data("start") + "ms"
        };
        if (r.left == "center" && n.width() !== 0) {
            r.left = (t.width() - n.width()) / 2
        }
        if (r.top == "center" && n.height() !== 0) {
            r.top = (t.height() - n.height()) / 2
        }
        n.data("positions", r);
        n.css({
            left: r.left + "px",
            top: r.top + "px",
            "animation-duration": r.speed,
            "animation-delay": r.delay
        })
    });
    e(window).on("resize", function () {
        var t = e(window).width(),
            n = t >= 1170 ? 1 : t / 960;
        e(".themina-caption").css("zoom", n)
    });
    e(window).trigger("resize");
    t.waitForImages(function () {
        t.flexslider({
            animation: "slide",
            easing: "easeInQuad",
            slideshow: false,
            animationSpeed: 900,
            slideshowSpeed: 7e3,
            smoothHeight: true,
            prevText: '<i class="si-arrow-left"></i>',
            nextText: '<i class="si-arrow-right"></i>',
            start: function () {
                t.removeClass("loading");
                n(1);
                setTimeout(function () {
                    update_sticky()
                }, 150)
            },
            before: function (r) {
                t.find(".slides li .animation-done").each(function () {
                    e(this).removeClass("animation-done");
                    var t = e(this).attr("data-animation");
                    e(this).removeClass(t)
                });
                n(r.animatingTo + 1)
            },
            after: function () {
                t.find(".flex-active-slide .animated").each(function () {
                    var t = e(this).attr("data-animation");
                    e(this).addClass("animation-done").addClass(t)
                })
            }
        })
    })
});
var $ = jQuery.noConflict();
$(document).ready(function (e) {
    "use strict";

    function t(t) {
        var n = e(t.target);
        var r, i, s = new Array;
        n.find("input, textarea").each(function () {
            r = e(this).data("validate");
            if (!r) return;
            i = e(this).val();
            if (!i.match(r)) {
                s.push(this)
            }
        });
        return s
    }
	
    function n(t) {
        var n = e(t.target),
            r = n.find("button"),
            i = r.text();
		return;
		/*
		e.ajax({
            url: "mail.php",
            data: n.serialize(),
            dataType: "json",
            type: "POST",
            beforeSend: function () {
                e("#contact_fail .alert-inner").empty();
                e("#contact_fail").hide();
                r.attr("disabled", "disabled").addClass("btn-disabled").css("cursor", "wait").text("Sending...")
            },
            success: function (t) {
                if (typeof t.success == "undefined") {
                    for (var n in t) {
                        e("#contact_fail .alert-inner").append("<p>" + t[n] + "</p>")
                    }
                    e("#contact_fail").fadeIn()
                } else {
					alert("Mensaje Enviado");
					$("#contact-name").val('');
					$("#contact-email").val('');
					$("#contact-subject").val('');
					$("#contact-message").val('');
                    e("#contact_success").fadeIn(700, function () {
                        var t = e(this);
                        setTimeout(function () {
                            t.fadeOut()
                        }, 5e3)
                    })
                }
            },
            complete: function () {
                r.removeAttr("disabled", "disabled").removeClass("btn-disabled").css("cursor", "pointer").html(i)
            },
            error: function (t, n, r) {
                switch (t.status) {
                case 404:
                    alert("We're Sorry... The file you are looking for is not found :(");
                    break;
                case 500:
                    e("#contact_fail .alert-inner").append("<p>Oops, something went wrong and we couldn't send your message :(</p>");
                    e("#contact_fail").fadeIn();
                    break;
                default:
                    console.log(t, n, r)
                }
            }
        })
		*/
    }
    function o(t, n) {
        var r;
        t = t.substring(2);
        e.ajax({
            type: "get",
            url: t,
            beforeSend: function () {
                r = false;
                s.empty().hide();
                e("body").addClass("portfolio-view");
                i.hide();
                e("#ajax_loading").addClass("loading")
            },
            success: function (t) {
                e(t).waitForImages({
                    finished: function () {
                        if (r) return false;
                        r = true;
                        s.html(t);
                        var i = typeof n == "undefined" ? e('.portfolio-item .hover > a[href="' + window.location.hash + '"]') : e(n.target);
                        var o = i.closest(".portfolio-item").parent().next().find(".hover > a");
                        var u = i.closest(".portfolio-item").parent().prev().find(".hover > a");
                        var a = e("#next-project");
                        var f = e("#prev-project");
                        if (o.length) {
                            a.removeClass("disabled").attr("href", o.attr("href"))
                        } else {
                            a.addClass("disabled").attr("href", "javascript:void(0);")
                        }
                        if (u.length) {
                            f.removeClass("disabled").attr("href", u.attr("href"))
                        } else {
                            f.addClass("disabled").attr("href", "javascript:void(0);")
                        }
                        e("#ajax_loading").removeClass("loading");
                        s.fadeIn(300, function () {
                            e("body").scrollTo(0, 200, {
                                easing: "easeInQuad"
                            })
                        })
                    }
                })
            },
            statusCode: {
                404: function () {}
            },
            complete: function () {},
            error: function (e, t, n) {}
        })
    }
    function u() {
        e.waypoints("destroy");
        e(".waypoint").waypoint({
            handler: function (t) {
                var n = e(this);
                if (t === "up") n = n.prev();
                e(".main-menu").find(".active").removeClass("active");
                e(".main-menu").find('a[href="#' + n[0].id + '"]').parent().addClass("active")
            },
            offset: "15%"
        });
        update_sticky();
        if (e(window).width() > 981) {
            e("body").removeClass("mobile")
        } else {
            e("body").addClass("mobile")
        }
    }
    function a() {
        e(window).bind("hashchange", function (t) {
            t.preventDefault();
            var n, r;
            try {
                n = window.location.hash;
                if (n.indexOf("#!") === -1) {
                    n = "#" + window.location.hash.substring(1), r = e(n)
                } else {
                    o(n);
                    return false
                }
            } catch (t) {}
            if (r === undefined || !n || r.length == 0) return false;
            e("body").scrollTo(r, 500, {
                offset: f(),
                easing: "easeInQuad"
            }, function () {
                u()
            });
            return false
        });
        e(".main-menu li > a, .scrollto").on("click", function (t) {
            if (e(t.target) === undefined || e(t.target).length == 0) return false;
            e("body").scrollTo(e(this).attr("href"), 500, {
                offset: f(),
                easing: "easeInQuad"
            })
        })
    }
    function f() {
        var t = e(".site-header"),
            n = t.height();
        n = -1 * parseInt(n);
        return n
    }
    e('[data-toggle="tooltip"]').tooltip();
    e("#contact-form").on("submit", function (r) {
        r.preventDefault();
        e(this).find(".error").removeClass("error");
        e(this).find(".err_msg").fadeOut(200);
        var i = t(r);
        for (var s = 0; s < i.length; s++) {
            e(i[s]).addClass("error")
        }
        if (i.length) {
            e("body, html").animate({
                scrollTop: e(i[0]).offset().top - 100
            }, "easeInCube", function () {
                e(this).select()
            });
            return false
        } else {
            n(r);
            return true
        }
    });
    try {
        e.browserSelector();
        if (e("html").hasClass("chrome")) {
            e.smoothScroll()
        }
    } catch (r) {}
    try {
        e(".panel-group .panel-collapse.in").closest(".panel").addClass("active");
        e(".panel-group").on("shown.bs.collapse", function (t) {
            e(this).find(".panel.active").removeClass("active");
            e(t.target).closest(".panel").addClass("active")
        });
        e(".panel-group").on("hide.bs.collapse", function (t) {
            e(this).find(".panel.active").removeClass("active")
        })
    } catch (r) {}
    var i = e("#page-wrapper"),
        s = e("#ajax");
    e(".portfolio-item .hover > a").on("click", function () {
        var t = e(this),
            n = t.attr("href");
        o(n, event)
    });
    e(document).on("click", "#close-project", function () {
        s.fadeOut(500, function () {
            e("body").removeClass("portfolio-view");
            i.show();
            e("body").scrollTo(e("#s-portfolio"), 500, {
                offset: f(),
                easing: "easeInQuad"
            })
        })
    });
    u();
    e(window).on("resize", function () {
        u()
    });
    a();
    e(window).waitForImages(function () {
        e(window).trigger("hashchange")
    });
    var l = e(".list-portfolio");
    try {
        l.mixitup({
            effects: ["fade", "blur", "rotateZ"],
            easing: "snap",
            onMixEnd: function () {
                u()
            }
        })
    } catch (r) {}
    var c = e(".flexslider.flex-carousel");
    try {
        c.each(function () {
            var t = e(this),
                n = parseInt(t.data("visible-items")),
                r = t.data("slideshow") == true ? true : false,
                i = t.data("direction") == true ? true : false,
                s = t.data("pagination") == true ? true : false;
            if (isNaN(n)) n = 4;
            var o = t.width() / n;
            t.waitForImages(function () {
                t.flexslider({
                    animation: "slide",
                    prevText: '<i class="si-arrow-left"></i>',
                    nextText: '<i class="si-arrow-right"></i>',
                    slideshow: r,
                    directionNav: i,
                    animationLoop: false,
                    itemWidth: o,
                    pauseOnHover: true,
                    controlNav: s,
                    itemMargin: 0
                })
            })
        })
    } catch (r) {console.log(r);}
    e("body:not(.mobile) .parallax").each(function () {
        var t = e(this),
            n = t.data("speed"),
            r = t.data("xpos");
        if (n === undefined || n == "undefined") n = .25;
        if (r === undefined || r == "undefined") r = "50%";
        t.waitForImages(function () {
            t.parallax(r, n)
        })
    });
    e(".toggle-contact").on("click", function () {
        var t = e(this),
            n = e(".contact-wrapper");
        if (t.find(".fa").hasClass("fa-minus")) {
            var m = e('#map');
            t.appendTo(t.closest(".relative"));
            var width = m.width();
            var height = m.height();
            n.fadeOut('slow');
            m.height(height);
            m.width(width);
            m.css('display','block');
            t.find(".fa").attr("class", "fa fa-plus")
        } else {
            t.prependTo(n);

            n.fadeIn('slow');

            /*
            n.animate({
                opacity: 1,
                visibility: "visible"
            }, 300);
            */
            t.find(".fa").attr("class", "fa fa-minus")
        }
    });
    e(".progress-bar").appear();
    e(document).on("appear", ".progress-bar:not(.animation-done)", function () {
        var t = e(this).addClass("animation-done");
        t.animate({
            width: t.attr("aria-valuenow") + "%"
        }, 300, "easeOutExpo")
    });
    e(".noIE .animated").appear();
    e(document).on("appear", ".noIE .animated:not(.animation-done)", function () {
        var t = e(this),
            n = e(this).data("animation"),
            r = parseInt(t.data("delay")),
            i = parseInt(t.data("speed"));
        if (!isNaN(i)) t.css("animation-duration", i + "ms");
        if (!isNaN(r)) {
            setTimeout(function () {
                t.addClass("animation-done").addClass(n)
            }, r)
        } else {
            t.addClass("animation-done").addClass(n)
        }
    });
    e(window).trigger("scroll");

    setInterval(function() {

        $(".flex-next").click();

    },5000);

    $("#enviar_form" ).on( "click", function() {
        var nombre = $("#contact-name").val();
        var email = $("#contact-email").val();
        var subject = $("#contact-subject").val();
        var mensaje = $("#contact-message").val();
        var business = $("#contact-business").val();
        var rut = $("#contact-rut").val();

        var data = "name="+nombre;
        data += "&email="+email;
        data += "&subject="+subject;
        data += "&message="+mensaje;
        data += "&business="+business;
        data += "&rut="+rut;
        $.ajax({
            type: "POST",
            url: 'mail.php',
            data: 'tipo=enviarform&'+data,
            success: function (data) {
                $("#contact-name").val('');
                $("#contact-email").val('');
                $("#contact-subject").val('');
                $("#contact-message").val('');
                $("#contact-business").val('');
                $("#contact-rut").val('');
                alert('Mensaje Enviado con Éxito');
            }
        });
    });

});
jQuery(window).load(function () {
    try {

        $("#gmap").gmap3({
            marker: {
                //address: "Carretera san martin 421, Rinconada, Los Andes, Chile",
                latLng:[-32.832783,-70.588999],
                data: "Casa Matriz Los Andes",
                events: {
                    click: function(marker, event, context){
                        var map = $(this).gmap3("get");
                        var infowindow = $(this).gmap3({get:{name:"infowindow"}});
                        if (infowindow){
                            infowindow.open(map, marker);
                            infowindow.setContent(context.data);
                        } else {
                            $(this).gmap3({
                                infowindow:{
                                    anchor:marker,
                                    options:{content: context.data}
                                }
                            });
                        }
                    }
                }
            },
            map: {
                options: {
                    center: [-32.8328325,-70.5889926],
                    zoom: 14
                }
            }
        });
        /*
        $("#gmap2").gmap3({
            marker: {
                address: "San Ignacio 701, Santiago, Chile",
                data: "Sucursal Santiago",
                events: {
                    click: function(marker, event, context){
                        var map = $(this).gmap3("get"),
                        infowindow = $(this).gmap3({get:{name:"infowindow"}});
                        if (infowindow){
                            infowindow.open(map, marker);
                            infowindow.setContent(context.data);
                        } else {
                            $(this).gmap3({
                                infowindow:{
                                    anchor:marker,
                                    options:{content: context.data}
                                }
                            });
                        }
                    }
                }
            },
            map: {
                options: {
                    center: [-33.331523,-70.707709],
                    zoom: 14
                }
            }
        })   */
    } catch (e) {}
})