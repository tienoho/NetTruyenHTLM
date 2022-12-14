﻿!(function () {
    "use strict";
    if ("object" == typeof window)
        if ("IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype)
            "isIntersecting" in window.IntersectionObserverEntry.prototype ||
                Object.defineProperty(window.IntersectionObserverEntry.prototype, "isIntersecting", {
                    get: function () {
                        return this.intersectionRatio > 0;
                    },
                });
        else {
            var t = window.document,
                e = [],
                o = null,
                i = null;
            (r.prototype.THROTTLE_TIMEOUT = 100),
                (r.prototype.POLL_INTERVAL = null),
                (r.prototype.USE_MUTATION_OBSERVER = !0),
                (r._setupCrossOriginUpdater = function () {
                    return (
                        o ||
                        (o = function (t, o) {
                            (i = t && o ? u(t, o) : { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 }),
                                e.forEach(function (t) {
                                    t._checkForIntersections();
                                });
                        }),
                        o
                    );
                }),
                (r._resetCrossOriginUpdater = function () {
                    (o = null), (i = null);
                }),
                (r.prototype.observe = function (t) {
                    if (
                        !this._observationTargets.some(function (e) {
                            return e.element == t;
                        })
                    ) {
                        if (!t || 1 != t.nodeType) throw new Error("target must be an Element");
                        this._registerInstance(), this._observationTargets.push({ element: t, entry: null }), this._monitorIntersections(t.ownerDocument), this._checkForIntersections();
                    }
                }),
                (r.prototype.unobserve = function (t) {
                    (this._observationTargets = this._observationTargets.filter(function (e) {
                        return e.element != t;
                    })),
                        this._unmonitorIntersections(t.ownerDocument),
                        0 == this._observationTargets.length && this._unregisterInstance();
                }),
                (r.prototype.disconnect = function () {
                    (this._observationTargets = []), this._unmonitorAllIntersections(), this._unregisterInstance();
                }),
                (r.prototype.takeRecords = function () {
                    var t = this._queuedEntries.slice();
                    return (this._queuedEntries = []), t;
                }),
                (r.prototype._initThresholds = function (t) {
                    var e = t || [0];
                    return (
                        Array.isArray(e) || (e = [e]),
                        e.sort().filter(function (t, e, o) {
                            if ("number" != typeof t || isNaN(t) || t < 0 || t > 1) throw new Error("threshold must be a number between 0 and 1 inclusively");
                            return t !== o[e - 1];
                        })
                    );
                }),
                (r.prototype._parseRootMargin = function (t) {
                    var e = (t || "0px").split(/\s+/).map(function (t) {
                        var e = /^(-?\d*\.?\d+)(px|%)$/.exec(t);
                        if (!e) throw new Error("rootMargin must be specified in pixels or percent");
                        return { value: parseFloat(e[1]), unit: e[2] };
                    });
                    return (e[1] = e[1] || e[0]), (e[2] = e[2] || e[0]), (e[3] = e[3] || e[1]), e;
                }),
                (r.prototype._monitorIntersections = function (e) {
                    var o = e.defaultView;
                    if (o && -1 == this._monitoringDocuments.indexOf(e)) {
                        var i = this._checkForIntersections,
                            n = null,
                            r = null;
                        if (
                            (this.POLL_INTERVAL
                                ? (n = o.setInterval(i, this.POLL_INTERVAL))
                                : (s(o, "resize", i, !0),
                                    s(e, "scroll", i, !0),
                                    this.USE_MUTATION_OBSERVER && "MutationObserver" in o && (r = new o.MutationObserver(i)).observe(e, { attributes: !0, childList: !0, characterData: !0, subtree: !0 })),
                                this._monitoringDocuments.push(e),
                                this._monitoringUnsubscribes.push(function () {
                                    var t = e.defaultView;
                                    t && (n && t.clearInterval(n), l(t, "resize", i, !0)), l(e, "scroll", i, !0), r && r.disconnect();
                                }),
                                e != ((this.root && this.root.ownerDocument) || t))
                        ) {
                            var c = f(e);
                            c && this._monitorIntersections(c.ownerDocument);
                        }
                    }
                }),
                (r.prototype._unmonitorIntersections = function (e) {
                    var o = this._monitoringDocuments.indexOf(e);
                    if (-1 != o) {
                        var i = (this.root && this.root.ownerDocument) || t;
                        if (
                            !this._observationTargets.some(function (t) {
                                var o = t.element.ownerDocument;
                                if (o == e) return !0;
                                for (; o && o != i;) {
                                    var n = f(o);
                                    if ((o = n && n.ownerDocument) == e) return !0;
                                }
                                return !1;
                            })
                        ) {
                            var n = this._monitoringUnsubscribes[o];
                            if ((this._monitoringDocuments.splice(o, 1), this._monitoringUnsubscribes.splice(o, 1), n(), e != i)) {
                                var r = f(e);
                                r && this._unmonitorIntersections(r.ownerDocument);
                            }
                        }
                    }
                }),
                (r.prototype._unmonitorAllIntersections = function () {
                    var t = this._monitoringUnsubscribes.slice(0);
                    (this._monitoringDocuments.length = 0), (this._monitoringUnsubscribes.length = 0);
                    for (var e = 0; e < t.length; e++) t[e]();
                }),
                (r.prototype._checkForIntersections = function () {
                    if (this.root || !o || i) {
                        var t = this._rootIsInDom(),
                            e = t ? this._getRootRect() : { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 };
                        this._observationTargets.forEach(function (i) {
                            var r = i.element,
                                s = c(r),
                                l = this._rootContainsTarget(r),
                                d = i.entry,
                                u = t && l && this._computeTargetAndRootIntersection(r, s, e),
                                a = (i.entry = new n({ time: window.performance && performance.now && performance.now(), target: r, boundingClientRect: s, rootBounds: o && !this.root ? null : e, intersectionRect: u }));
                            d ? (t && l ? this._hasCrossedThreshold(d, a) && this._queuedEntries.push(a) : d && d.isIntersecting && this._queuedEntries.push(a)) : this._queuedEntries.push(a);
                        }, this),
                            this._queuedEntries.length && this._callback(this.takeRecords(), this);
                    }
                }),
                (r.prototype._computeTargetAndRootIntersection = function (e, n, r) {
                    if ("none" != window.getComputedStyle(e).display) {
                        for (var s, l, d, a, f, p, g, m, b = n, x = h(e), v = !1; !v && x;) {
                            var w = null,
                                T = 1 == x.nodeType ? window.getComputedStyle(x) : {};
                            if ("none" == T.display) return null;
                            if (x == this.root || 9 == x.nodeType)
                                if (((v = !0), x == this.root || x == t)) o && !this.root ? (!i || (0 == i.width && 0 == i.height) ? ((x = null), (w = null), (b = null)) : (w = i)) : (w = r);
                                else {
                                    var y = h(x),
                                        _ = y && c(y),
                                        F = y && this._computeTargetAndRootIntersection(y, _, r);
                                    _ && F ? ((x = y), (w = u(_, F))) : ((x = null), (b = null));
                                }
                            else {
                                var S = x.ownerDocument;
                                x != S.body && x != S.documentElement && "visible" != T.overflow && (w = c(x));
                            }
                            if (
                                (w &&
                                    ((s = w),
                                        (l = b),
                                        void 0,
                                        void 0,
                                        void 0,
                                        void 0,
                                        void 0,
                                        void 0,
                                        (d = Math.max(s.top, l.top)),
                                        (a = Math.min(s.bottom, l.bottom)),
                                        (f = Math.max(s.left, l.left)),
                                        (m = a - d),
                                        (b = ((g = (p = Math.min(s.right, l.right)) - f) >= 0 && m >= 0 && { top: d, bottom: a, left: f, right: p, width: g, height: m }) || null)),
                                    !b)
                            )
                                break;
                            x = x && h(x);
                        }
                        return b;
                    }
                }),
                (r.prototype._getRootRect = function () {
                    var e;
                    if (this.root) e = c(this.root);
                    else {
                        var o = t.documentElement,
                            i = t.body;
                        e = { top: 0, left: 0, right: o.clientWidth || i.clientWidth, width: o.clientWidth || i.clientWidth, bottom: o.clientHeight || i.clientHeight, height: o.clientHeight || i.clientHeight };
                    }
                    return this._expandRectByRootMargin(e);
                }),
                (r.prototype._expandRectByRootMargin = function (t) {
                    var e = this._rootMarginValues.map(function (e, o) {
                        return "px" == e.unit ? e.value : (e.value * (o % 2 ? t.width : t.height)) / 100;
                    }),
                        o = { top: t.top - e[0], right: t.right + e[1], bottom: t.bottom + e[2], left: t.left - e[3] };
                    return (o.width = o.right - o.left), (o.height = o.bottom - o.top), o;
                }),
                (r.prototype._hasCrossedThreshold = function (t, e) {
                    var o = t && t.isIntersecting ? t.intersectionRatio || 0 : -1,
                        i = e.isIntersecting ? e.intersectionRatio || 0 : -1;
                    if (o !== i)
                        for (var n = 0; n < this.thresholds.length; n++) {
                            var r = this.thresholds[n];
                            if (r == o || r == i || r < o != r < i) return !0;
                        }
                }),
                (r.prototype._rootIsInDom = function () {
                    return !this.root || a(t, this.root);
                }),
                (r.prototype._rootContainsTarget = function (e) {
                    return a(this.root || t, e) && (!this.root || this.root.ownerDocument == e.ownerDocument);
                }),
                (r.prototype._registerInstance = function () {
                    e.indexOf(this) < 0 && e.push(this);
                }),
                (r.prototype._unregisterInstance = function () {
                    var t = e.indexOf(this);
                    -1 != t && e.splice(t, 1);
                }),
                (window.IntersectionObserver = r),
                (window.IntersectionObserverEntry = n);
        }
    function n(t) {
        (this.time = t.time),
            (this.target = t.target),
            (this.rootBounds = d(t.rootBounds)),
            (this.boundingClientRect = d(t.boundingClientRect)),
            (this.intersectionRect = d(t.intersectionRect || { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 })),
            (this.isIntersecting = !!t.intersectionRect);
        var e = this.boundingClientRect,
            o = e.width * e.height,
            i = this.intersectionRect,
            n = i.width * i.height;
        this.intersectionRatio = o ? Number((n / o).toFixed(4)) : this.isIntersecting ? 1 : 0;
    }
    function r(t, e) {
        var o,
            i,
            n,
            r = e || {};
        if ("function" != typeof t) throw new Error("callback must be a function");
        if (r.root && 1 != r.root.nodeType) throw new Error("root must be an Element");
        (this._checkForIntersections =
            ((o = this._checkForIntersections.bind(this)),
                (i = this.THROTTLE_TIMEOUT),
                (n = null),
                function () {
                    n ||
                        (n = setTimeout(function () {
                            o(), (n = null);
                        }, i));
                })),
            (this._callback = t),
            (this._observationTargets = []),
            (this._queuedEntries = []),
            (this._rootMarginValues = this._parseRootMargin(r.rootMargin)),
            (this.thresholds = this._initThresholds(r.threshold)),
            (this.root = r.root || null),
            (this.rootMargin = this._rootMarginValues
                .map(function (t) {
                    return t.value + t.unit;
                })
                .join(" ")),
            (this._monitoringDocuments = []),
            (this._monitoringUnsubscribes = []);
    }
    function s(t, e, o, i) {
        "function" == typeof t.addEventListener ? t.addEventListener(e, o, i || !1) : "function" == typeof t.attachEvent && t.attachEvent("on" + e, o);
    }
    function l(t, e, o, i) {
        "function" == typeof t.removeEventListener ? t.removeEventListener(e, o, i || !1) : "function" == typeof t.detatchEvent && t.detatchEvent("on" + e, o);
    }
    function c(t) {
        var e;
        try {
            e = t.getBoundingClientRect();
        } catch (t) { }
        return e ? ((e.width && e.height) || (e = { top: e.top, right: e.right, bottom: e.bottom, left: e.left, width: e.right - e.left, height: e.bottom - e.top }), e) : { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 };
    }
    function d(t) {
        return !t || "x" in t ? t : { top: t.top, y: t.top, bottom: t.bottom, left: t.left, x: t.left, right: t.right, width: t.width, height: t.height };
    }
    function u(t, e) {
        var o = e.top - t.top,
            i = e.left - t.left;
        return { top: o, left: i, height: e.height, width: e.width, bottom: o + e.height, right: i + e.width };
    }
    function a(t, e) {
        for (var o = e; o;) {
            if (o == t) return !0;
            o = h(o);
        }
        return !1;
    }
    function h(e) {
        var o = e.parentNode;
        return 9 == e.nodeType && e != t ? f(e) : o && 11 == o.nodeType && o.host ? o.host : o && o.assignedSlot ? o.assignedSlot.parentNode : o;
    }
    function f(t) {
        try {
            return (t.defaultView && t.defaultView.frameElement) || null;
        } catch (t) {
            return null;
        }
    }
})(),
    (function (t, e) {
        "object" == typeof exports ? (module.exports = e(t)) : "function" == typeof define && define.amd ? define([], e) : (t.LazyLoad = e(t));
    })("undefined" != typeof global ? global : this.window || this.global, function (t) {
        "use strict";
        "function" == typeof define && define.amd && (t = window);
        var e = { src: "data-src", srcset: "data-srcset", selector: ".lazyload", root: null, rootMargin: "0px", threshold: 0 },
            o = function () {
                var t = {},
                    e = !1,
                    i = 0,
                    n = arguments.length;
                "[object Boolean]" === Object.prototype.toString.call(arguments[0]) && ((e = arguments[0]), i++);
                for (
                    var r = function (i) {
                        for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (e && "[object Object]" === Object.prototype.toString.call(i[n]) ? (t[n] = o(!0, t[n], i[n])) : (t[n] = i[n]));
                    };
                    i < n;
                    i++
                )
                    r(arguments[i]);
                return t;
            };
        function i(t, i) {
            (this.settings = o(e, i || {})), (this.images = t || document.querySelectorAll(this.settings.selector)), (this.observer = null), this.init();
        }
        if (
            ((i.prototype = {
                init: function () {
                    if (t.IntersectionObserver) {
                        var e = this,
                            o = { root: this.settings.root, rootMargin: this.settings.rootMargin, threshold: [this.settings.threshold] };
                        (this.observer = new IntersectionObserver(function (t) {
                            Array.prototype.forEach.call(t, function (t) {
                                if (t.isIntersecting) {
                                    e.observer.unobserve(t.target);
                                    var o = t.target.getAttribute(e.settings.src),
                                        i = t.target.getAttribute(e.settings.srcset);
                                    "img" === t.target.tagName.toLowerCase() ? (o && (t.target.src = o), i && (t.target.srcset = i)) : (t.target.style.backgroundImage = "url(" + o + ")");
                                }
                            });
                        }, o)),
                            Array.prototype.forEach.call(this.images, function (t) {
                                e.observer.observe(t);
                            });
                    } else this.loadImages();
                },
                loadAndDestroy: function () {
                    this.settings && (this.loadImages(), this.destroy());
                },
                loadImages: function () {
                    if (this.settings) {
                        var t = this;
                        Array.prototype.forEach.call(this.images, function (e) {
                            var o = e.getAttribute(t.settings.src),
                                i = e.getAttribute(t.settings.srcset);
                            "img" === e.tagName.toLowerCase() ? (o && (e.src = o), i && (e.srcset = i)) : (e.style.backgroundImage = "url('" + o + "')");
                        });
                    }
                },
                destroy: function () {
                    this.settings && (this.observer.disconnect(), (this.settings = null));
                },
            }),
                (t.lazyload = function (t, e) {
                    return new i(t, e);
                }),
                t.jQuery)
        ) {
            var n = t.jQuery;
            n.fn.lazyload = function (t) {
                return ((t = t || {}).attribute = t.attribute || "data-src"), new i(n.makeArray(this), t), this;
            };
        }
        return i;
    }),
    (function (t) {
        (t.isScrollToFixed = function (e) {
            return !!t(e).data("ScrollToFixed");
        }),
            (t.ScrollToFixed = function (e, o) {
                var i = this;
                (i.$el = t(e)), (i.el = e), i.$el.data("ScrollToFixed", i);
                var n,
                    r,
                    s,
                    l,
                    c = !1,
                    d = i.$el,
                    u = 0,
                    a = 0,
                    h = -1,
                    f = -1,
                    p = null;
                function g() {
                    var t = i.options.limit;
                    return t ? ("function" == typeof t ? t.apply(d) : t) : 0;
                }
                function m() {
                    return "fixed" === n;
                }
                function b() {
                    return "absolute" === n;
                }
                function x() {
                    return !(m() || b());
                }
                function v() {
                    if (!m()) {
                        var t = d[0].getBoundingClientRect();
                        p.css({ display: d.css("display"), width: t.width, height: t.height, float: d.css("float") }),
                            (cssOptions = { "z-index": i.options.zIndex, position: "fixed", top: -1 == i.options.bottom ? _() : "", bottom: -1 == i.options.bottom ? "" : i.options.bottom, "margin-left": "0px" }),
                            i.options.dontSetWidth || (cssOptions.width = d.css("width")),
                            d.css(cssOptions),
                            d.addClass(i.options.baseClassName),
                            i.options.className && d.addClass(i.options.className),
                            (n = "fixed");
                    }
                }
                function w() {
                    var t = g(),
                        e = a;
                    i.options.removeOffsets && ((e = ""), (t -= u)),
                        (cssOptions = { position: "absolute", top: t, left: e, "margin-left": "0px", bottom: "" }),
                        i.options.dontSetWidth || (cssOptions.width = d.css("width")),
                        d.css(cssOptions),
                        (n = "absolute");
                }
                function T() {
                    x() ||
                        ((f = -1),
                            p.css("display", "none"),
                            d.css({ "z-index": l, width: "", position: r, left: "", top: s, "margin-left": "" }),
                            d.removeClass("scroll-to-fixed-fixed"),
                            i.options.className && d.removeClass(i.options.className),
                            (n = null));
                }
                function y(t) {
                    t != f && (d.css("left", a - t), (f = t));
                }
                function _() {
                    var t = i.options.marginTop;
                    return t ? ("function" == typeof t ? t.apply(d) : t) : 0;
                }
                function F() {
                    if (t.isScrollToFixed(d) && !d.is(":hidden")) {
                        var e = c,
                            o = x();
                        c
                            ? x() && ((u = d.offset().top), (a = d.offset().left))
                            : (d.trigger("preUnfixed.ScrollToFixed"),
                                T(),
                                d.trigger("unfixed.ScrollToFixed"),
                                (f = -1),
                                (u = d.offset().top),
                                (a = d.offset().left),
                                i.options.offsets && (a += d.offset().left - d.position().left),
                                -1 == h && (h = a),
                                (n = d.css("position")),
                                (c = !0),
                                -1 != i.options.bottom && (d.trigger("preFixed.ScrollToFixed"), v(), d.trigger("fixed.ScrollToFixed")));
                        var s = t(window).scrollLeft(),
                            l = t(window).scrollTop(),
                            p = g();
                        i.options.minWidth && t(window).width() < i.options.minWidth
                            ? (x() && e) || (S(), d.trigger("preUnfixed.ScrollToFixed"), T(), d.trigger("unfixed.ScrollToFixed"))
                            : i.options.maxWidth && t(window).width() > i.options.maxWidth
                                ? (x() && e) || (S(), d.trigger("preUnfixed.ScrollToFixed"), T(), d.trigger("unfixed.ScrollToFixed"))
                                : -1 == i.options.bottom
                                    ? p > 0 && l >= p - _()
                                        ? o || (b() && e) || (S(), d.trigger("preAbsolute.ScrollToFixed"), w(), d.trigger("unfixed.ScrollToFixed"))
                                        : l >= u - _()
                                            ? ((m() && e) || (S(), d.trigger("preFixed.ScrollToFixed"), v(), (f = -1), d.trigger("fixed.ScrollToFixed")), y(s))
                                            : (x() && e) || (S(), d.trigger("preUnfixed.ScrollToFixed"), T(), d.trigger("unfixed.ScrollToFixed"))
                                    : p > 0
                                        ? l + t(window).height() - d.outerHeight(!0) >=
                                            p -
                                            (_() ||
                                                -(function () {
                                                    if (!i.options.bottom) return 0;
                                                    return i.options.bottom;
                                                })())
                                            ? m() && (S(), d.trigger("preUnfixed.ScrollToFixed"), "absolute" === r ? w() : T(), d.trigger("unfixed.ScrollToFixed"))
                                            : (m() || (S(), d.trigger("preFixed.ScrollToFixed"), v()), y(s), d.trigger("fixed.ScrollToFixed"))
                                        : y(s);
                    }
                }
                function S() {
                    var t = d.css("position");
                    "absolute" == t ? d.trigger("postAbsolute.ScrollToFixed") : "fixed" == t ? d.trigger("postFixed.ScrollToFixed") : d.trigger("postUnfixed.ScrollToFixed");
                }
                var I = function (t) {
                    d.is(":visible") && ((c = !1), F());
                },
                    E = function (t) {
                        window.requestAnimationFrame ? requestAnimationFrame(F) : F();
                    };
                (i.init = function () {
                    (i.options = t.extend({}, t.ScrollToFixed.defaultOptions, o)),
                        (l = d.css("z-index")),
                        i.$el.css("z-index", i.options.zIndex),
                        (p = t("<div />")),
                        (n = d.css("position")),
                        (r = d.css("position")),
                        d.css("float"),
                        (s = d.css("top")),
                        x() && i.$el.after(p),
                        t(window).bind("resize.ScrollToFixed", I),
                        t(window).bind("scroll.ScrollToFixed", E),
                        "ontouchmove" in window && t(window).bind("touchmove.ScrollToFixed", F),
                        i.options.preFixed && d.bind("preFixed.ScrollToFixed", i.options.preFixed),
                        i.options.postFixed && d.bind("postFixed.ScrollToFixed", i.options.postFixed),
                        i.options.preUnfixed && d.bind("preUnfixed.ScrollToFixed", i.options.preUnfixed),
                        i.options.postUnfixed && d.bind("postUnfixed.ScrollToFixed", i.options.postUnfixed),
                        i.options.preAbsolute && d.bind("preAbsolute.ScrollToFixed", i.options.preAbsolute),
                        i.options.postAbsolute && d.bind("postAbsolute.ScrollToFixed", i.options.postAbsolute),
                        i.options.fixed && d.bind("fixed.ScrollToFixed", i.options.fixed),
                        i.options.unfixed && d.bind("unfixed.ScrollToFixed", i.options.unfixed),
                        i.options.spacerClass && p.addClass(i.options.spacerClass),
                        d.bind("resize.ScrollToFixed", function () {
                            p.height(d.height());
                        }),
                        d.bind("scroll.ScrollToFixed", function () {
                            d.trigger("preUnfixed.ScrollToFixed"), T(), d.trigger("unfixed.ScrollToFixed"), F();
                        }),
                        d.bind("detach.ScrollToFixed", function (e) {
                            !(function (t) {
                                (t = t || window.event).preventDefault && t.preventDefault(), (t.returnValue = !1);
                            })(e),
                                d.trigger("preUnfixed.ScrollToFixed"),
                                T(),
                                d.trigger("unfixed.ScrollToFixed"),
                                t(window).unbind("resize.ScrollToFixed", I),
                                t(window).unbind("scroll.ScrollToFixed", E),
                                d.unbind(".ScrollToFixed"),
                                p.remove(),
                                i.$el.removeData("ScrollToFixed");
                        }),
                        I();
                }),
                    i.init();
            }),
            (t.ScrollToFixed.defaultOptions = { marginTop: 0, limit: 0, bottom: -1, zIndex: 1e3, baseClassName: "scroll-to-fixed-fixed" }),
            (t.fn.scrollToFixed = function (e) {
                return this.each(function () {
                    new t.ScrollToFixed(this, e);
                });
            });
    })(jQuery);
function HideMenuToolbar() {
    $("#toolbar").fadeOut(), $("#toolbarbut").fadeIn("slow");
}
function ShowMenuToolbar() {
    $("#toolbar").fadeIn(), $("#toolbarbut").fadeOut("slow");
}
function Get_Cookie(e) {
    var t = document.cookie.split(";"),
        a = "",
        i = "",
        o = !1,
        s = "";
    for (s = 0; s < t.length; s++) {
        if ((a = t[s].split("="))[0].replace(/^\s+|\s+$/g, "") == e) return (o = !0), a.length > 1 && (i = unescape(a[1].replace(/^\s+|\s+$/g, ""))), i;
        (a = null), "";
    }
    if (!o) return null;
}
function Set_Cookie(e, t, a, i, o, s) {
    var r = new Date();
    r.setTime(r.getTime()), a && (a = 1e3 * a * 60 * 60 * 24);
    var n = new Date(r.getTime() + a);
    document.cookie = e + "=" + escape(t) + (a ? ";expires=" + n.toGMTString() : "") + (i ? ";path=" + i : "") + (o ? ";domain=" + o : "") + (s ? ";secure" : "");
}
function Delete_Cookie(e, t, a) {
    Get_Cookie(e) && (document.cookie = e + "=" + (t ? ";path=" + t : "") + (a ? ";domain=" + a : "") + ";expires=Thu, 01-Jan-1970 00:00:01 GMT");
}
function SetReferrerPolicy(e) {
    var t = document.querySelector('meta[name="referrer"]');
    if (null != t) 1 == e ? t.setAttribute("content", "no-referrer") : t.setAttribute("content", "no-referrer-when-downgrade");
    else {
        var a = document.createElement("meta");
        (a.name = "referrer"), (a.content = 1 == e ? "no-referrer" : "no-referrer-when-downgrade"), document.getElementsByTagName("head")[0].appendChild(a);
    }
}
var siteRoot = "",
    hostName = "";
gOpts.host && ((hostName = gOpts.host), (siteRoot = "//f." + gOpts.host));
var AjaxHelper = {
    loadWaiting: !1,
    init: function () {
        this.loadWaiting = !1;
    },
    setLoadWaiting: function (e) {
        var t = '<div id="loading" style="display:block"><img src="//st.' + hostName + '/data/sites/1/skins/comic/images/loading-small.gif" alt="loading"><span>Đang xử lý</span></div>';
        if (!0 === e) document.querySelector("body").insertAdjacentHTML("beforeend", t);
        else if (null != document.querySelector("#loading")) {
            var a = document.querySelector("#loading");
            a.parentElement.removeChild(a);
        }
        this.loadWaiting = e;
    },
    processAjaxError: function (e) {
        alert("Có lỗi xảy ra. Vui lòng thử lại..."),
            setTimeout(function () {
                location.reload();
            }, 100);
    },
    changeLevelText: function () {
        try {
            if (gOpts.levelType) {
                var e = [];
                (e.TT = ["Luyện Khí", "Trúc Cơ", "Kim Đan", "Nguyên Anh", "Hóa Thần", "Luyện Hư", "Hợp Thể", "Đại Thừa", "Độ Kiếp", "Phi Thăng"]),
                    (e.TK = ["Học Đồ", "Hành Tinh", "Hằng Tinh", "Vũ Trụ", "Vực Chủ", "Giới Chủ", "Bất Hủ", "Tôn Giả", "Chi Chủ", "Chân Thần"]),
                    $("span[data-level]").each(function () {
                        var t = $(this).attr("data-level");
                        t && e[gOpts.levelType] && e[gOpts.levelType].length > t - 1 && $(this).text(e[gOpts.levelType][t - 1]);
                    });
            }
        } catch (e) { }
    },
};
function PopulateData() {
    if ($("body").hasClass("chapter-detail")) processComicLoader(!0);
    else if ($("body").hasClass("comic-detail")) processComicLoader(!1);
    else if ($(".comics-followed-page").length || $(".comics-followed").length) {
        var e = 0,
            t = $(".comics-followed-page");
        if ($(".comics-followed-nopaging").length) (e = 1), (t = $(".comics-followed"));
        else if ($(".comics-followed-withpaging").length) (e = 2), (t = $(".comics-followed"));
        else {
            var a = getParameterByName("t");
            3 == a && (e = a);
        }
        !(function (e, t) {
            if (0 != AjaxHelper.loadWaiting) return;
            AjaxHelper.setLoadWaiting(!0);
            var a = getParameterByName("page");
            null == a && (a = 1);
            $.ajax({
                type: "GET",
                url: siteRoot + "/Comic/Services/ComicService.asmx/GetFollowedPageComics",
                data: { page: a, userGuid: getUserGuid(), loadType: t, token: gOpts.token ? gOpts.token : "" },
                success: function (a) {
                    if (a.success)
                        if (a.followedListHtml)
                            e.html(replaceUrl(a.followedListHtml)),
                                initLazyload(),
                                loadTooltip(),
                                a.pagerHtml && $('<div class="pagination-outter"></div>').html(a.pagerHtml).appendTo(e),
                                $("html, body").animate({ scrollTop: 0 }, 0, "linear");
                        else if (0 == t) {
                            var i =
                                '<p>Bạn chưa theo dõi truyện nào cả. Để theo dõi truyện, nhấn vào <u>Theo dõi</u> như hình bên dưới:<br />Bạn nên <a href="/Secure/Login.aspx">Đăng nhập</a> để truy cập truyện đã theo dõi của bạn ở bất cứ đâu</p><p class="text-center"><img src="/Data/Sites/1/media/huong-dan-theo-doi-truyen.jpg" width="660" style="aspect-ratio:1.52" alt="Hướng dẫn theo dõi truyện tranh"></img></p>';
                            e.html(i);
                        }
                },
                complete: function (e) {
                    AjaxHelper.setLoadWaiting(!1);
                },
                error: function (e, t, a) {
                    console.log(a);
                },
            });
        })(t, e);
    }
    setupLazyLoad(".comics-followed-block");
}
function InitNotifications(e) {
    if (e) {
        var t = '<div class="notifications"><a href="#" title="Thông báo"><i class="fa fa-comment"></i>';
        e.unread && e.unread > 0 && (t += '<span class="notification-count">' + e.unread + "</span>"), (t += "</a></div>"), $(t).insertBefore($(".search-button-icon"));
    }
    $("body").on("click", ".notifications > a", function (e) {
        e.preventDefault();
        if (0 == AjaxHelper.loadWaiting)
            return (
                AjaxHelper.setLoadWaiting(!0),
                $.ajax({
                    type: "POST",
                    url: "/Comic/Services/ComicService.asmx/GetNotifications",
                    data: { page: 1 },
                    success: function (e) {
                        e.success &&
                            (e.notifications && ($(".notification-popup").remove(), $('<div class="notification-popup"></div>').html(e.notifications).appendTo($(".notifications")), $(".notifications .notification-count").text("0")),
                                SetUserStorage());
                    },
                    complete: function (e) {
                        AjaxHelper.setLoadWaiting(!1);
                    },
                    error: function (e, t, a) { },
                }),
                !1
            );
    }),
        $("body").on("click", ".notifications .notification-popup .notification-content a", function (e) {
            e.preventDefault();
            var t = $(this);
            return (
                $.ajax({
                    type: "POST",
                    url: "/Comic/Services/ComicService.asmx/ReadNotification",
                    data: { id: t.attr("data-id") },
                    success: function (e) {
                        window.location.href = t.attr("href");
                    },
                    complete: function (e) {
                        AjaxHelper.setLoadWaiting(!1);
                    },
                    error: function (e, t, a) { },
                }),
                !1
            );
        });
}
function InitAccountMenu(e) {
    if (e)
        if (0 == e.status) {
            var t = window.location.search,
                a = "?returnurl=" + encodeURIComponent(window.location.pathname + t);
            t && t.indexOf("?returnurl=") > -1 && (a = t);
            var i = '<li class="login-link"><a rel="nofollow" href="/Secure/Login.aspx' + a + '">Đăng nhập</a></li>';
            (i += '<li class="register-link"><a rel="nofollow" href="/Secure/Register.aspx' + a + '">Đăng ký</a></li>'), $(".nav-account").html(i), (gOpts.login = 0);
        } else {
            i = '<li class="dropdown">';
            (i += '<a data-toggle="dropdown" class="user-menu fn-userbox dropdown-toggle" href="javascript:void(0)"><img class="fn-thumb" alt="Avatar" src="' + e.avatar + '" /> <span>Cá nhân</span> <i class="fa fa-caret-down"></i></a>'),
                (i += '<ul class="dropdown-menu">'),
                (i +=
                    '<li><a rel="nofollow" href="/Secure/Dashboard.aspx"><i class="fa fa-user"></i> Trang cá nhân</a></li><li><a rel="nofollow" href="/Secure/ComicFollowed.aspx"><i class="fa fa-book"></i> Truyện theo dõi</a></li><li><a rel="nofollow" class="user-logout" href="/Logoff.aspx"><i class="fa fa-sign-out"></i> Thoát</a></li>'),
                (i += "</ul>"),
                (i += "</li>"),
                $(".nav-account").html(i),
                (gOpts.login = 1);
        }
    $("body").on("click", ".user-logout", function (e) {
        SetUserStorage();
    }),
        $(".nav-account>li").hover(
            function () {
                $(this).addClass("open");
            },
            function () {
                $(this).removeClass("open");
            }
        ),
        isMobileDevice &&
        $(".nav-account>li.dropdown>a").click(function () {
            return InitDropdownMenuOnMobile(this), !1;
        });
}
var followedOnChapter = !0;
function processComicLoader(e) {
    var t = gOpts.comicId;
    if (0 == e) {
        var a = -1,
            i = window.location.hash.split("#cmt-");
        0 == isNaN(parseInt(i[1])) && parseInt(i[1]) > 0 && (a = parseInt(i[1]));
        var o = { comicId: t, commentId: a };
        a > 0 &&
            $.ajax({
                type: "POST",
                url: "/Comic/Services/ComicService.asmx/ProcessComicLoader",
                data: o,
                success: function (e) {
                    e.success &&
                        (e.commentCount && $(".comment-count").text(e.commentCount),
                            e.commentsHtml &&
                            ($(".journalItems").html(e.commentsHtml), e.pagerHtml && ($(".sort-comment").parent().removeClass("hidden"), $(".commentpager").html(e.pagerHtml)), shortenCommentText(), AjaxHelper.changeLevelText()),
                            e.followedListHtml && ($(".comics-followed-block").html(e.followedListHtml), initLazyload()),
                            e.followHtml && $(".follow").prepend(e.followHtml),
                            e.readHtml && ($(".read-continue").length ? $(".read-continue").attr("href", $(e.readHtml).attr("href")) : $(".read-action").append(e.readHtml)),
                            e.markAsReadHtml && $(".list-chapter h2.list-title").append(e.markAsReadHtml),
                            e.readChapters &&
                            e.readChapters.length > 0 &&
                            $(".list-chapter .chapter a").each(function () {
                                !$(this).hasClass("visited") && $.inArray($(this).attr("data-id"), e.readChapters) > -1 && $(this).addClass("visited");
                            }),
                            e.commentReplyHtml && ($("body").addClass("modal-open").prepend(e.commentReplyHtml), shortenCommentText(), AjaxHelper.changeLevelText()));
                },
            });
    }
    $.ajax({
        type: "GET",
        url: siteRoot + "/Comic/Services/ComicService.asmx/GetFollowedButtonComic",
        data: { comicId: t, userGuid: getUserGuid(), token: gOpts.token ? gOpts.token : "" },
        success: function (t) {
            t.success &&
                (0 == t.isFollowed && (followedOnChapter = !1),
                    t.followHtml && ($(".follow-hidden").length ? $(".follow-hidden").replaceWith(t.followHtml) : 1 == e ? $("#chapterNav").append(t.followHtml) : $(".follow").prepend(t.followHtml)),
                    t.readHtml && ($(".read-continue").length ? $(".read-continue").attr("href", $(t.readHtml).attr("href")) : $(".read-action").append(replaceUrl(t.readHtml))),
                    t.markAsReadHtml && $(".list-chapter h2.list-title").append(t.markAsReadHtml),
                    t.readChapters &&
                    t.readChapters.length > 0 &&
                    $(".list-chapter .chapter a").each(function () {
                        !$(this).hasClass("visited") && $.inArray($(this).attr("data-id"), t.readChapters) > -1 && $(this).addClass("visited");
                    }));
        },
        error: function (e, t, a) { },
    });
}
function findChapter() {
    var e = $(".chapter-list-modal input").val();
    e.length > 0
        ? ((e = e.toLowerCase()),
            $(".chapter-list-modal .chapter-list a").each(function () {
                var t = $(this).text().toLowerCase().replace("chapter ", "");
                t.indexOf(":") > -1 && (t = t.substring(0, t.indexOf(":") + 1)), 0 == t.indexOf(e) ? $(this).show() : $(this).hide();
            }))
        : $(".chapter-list-modal a").show();
}
function initLazyload() {
    $("img.lazy").lazyload({ src: "data-original", rootMargin: "50px" });
}
function getUserGuid() {
    return gOpts.userGuid ? gOpts.userGuid : null;
}
function replaceUrl(e) {
    return e;
}
var isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
    },
},
    isMobileDevice = isMobile.any(),
    loadFromStorage = !1;
try {
    if ("undefined" != typeof Storage && void 0 !== localStorage["user-auth"]) {
        var user = JSON.parse(localStorage["user-auth"]);
        if (user.date) {
            var current = new Date(),
                lastSave = new Date(user.date),
                diff = (current.getTime() - lastSave.getTime()) / 1e3;
            user.levelType && (gOpts.levelType = user.levelType), (loadFromStorage = !0), PopulateUserData(user);
        }
    }
} catch (e) { }
function PopulateUserData(e) {
    (gOpts.userGuid = e.userGuid),
        (gOpts.token = e.token),
        (gOpts.readToken = e.readToken),
        (gOpts.fullName = e.fullName),
        (gOpts.email = e.email),
        (gOpts.levelType = e.levelType),
        InitNotifications(e),
        InitAccountMenu(e),
        PopulateData(),
        AjaxHelper.changeLevelText();
}
function SetUserStorage(e) {
    if ("undefined" != typeof Storage)
        if (e) {
            if (!$("body").hasClass("securepage")) {
                var t = e;
                (t.date = new Date()), (localStorage["user-auth"] = JSON.stringify(t));
            }
        } else void 0 !== localStorage["user-auth"] && localStorage.removeItem("user-auth");
}
function UpdateUserReadToken(e) {
    if ("undefined" != typeof Storage && void 0 !== localStorage["user-auth"]) {
        var t = JSON.parse(localStorage["user-auth"]);
        (t.readToken = e), (localStorage["user-auth"] = JSON.stringify(t));
    }
}
0 == loadFromStorage &&
    $.ajax({
        type: "GET",
        url: siteRoot + "/Comic/Services/ComicService.asmx/CheckAuth",
        xhrFields: { withCredentials: !0 },
        success: function (e) {
            e.success && (PopulateUserData(e), SetUserStorage(e));
        },
    }),
    $("body").hasClass("securepage") &&
    (SetUserStorage(), $("body").hasClass("clearauth") && $.ajax({ type: "GET", url: siteRoot + "/Comic/Services/ComicService.asmx/ClearAuth", xhrFields: { withCredentials: !0 }, success: function (e) { } })),
    $("span.downarr a").click(function () {
        HideMenuToolbar(), Set_Cookie("openstate", "closed", 1, "/");
    }),
    $("span.showbar a").click(function () {
        ShowMenuToolbar(), Set_Cookie("openstate", "open", 1, "/");
    }),
    $("span.downarr a, span.showbar a").click(function () {
        return !1;
    });
var openState = Get_Cookie("openstate");
null != openState && ("closed" == openState && HideMenuToolbar(), "open" == openState && ShowMenuToolbar()),
    $("#back-to-top").fadeIn(),
    $("#back-to-top").click(function () {
        return $("body,html").animate({ scrollTop: 0 }, 200), !1;
    });
var wWidth = window.innerWidth;
$(".comicsearchbox input[type='submit']").click(function () {
    var e = $(".suggestsearch");
    if ($(e).find("li.selected").length) {
        var t = $(e).find("li.selected").eq(0).children("a").attr("href");
        return (window.location.href = t), !1;
    }
    var a = $(this).parents(".comicsearchbox").find("input[type='text']");
    return "" == a.val() ? (a.focus(), !1) : ((window.location.href = "/tim-truyen?keyword=" + encodeURIComponent(a.val()).replace(/%20/g, "+")), !1);
});
var isNoReferrer = !1,
    suggestTimeout = null;
function SuggestSearch(e, t) {
    0 == isNoReferrer && (SetReferrerPolicy(!0), (isNoReferrer = !0));
    new Date();
    var a,
        i = $(e).parent().find(".suggestsearch ul");
    40 != t.which
        ? 38 != t.which
            ? 13 != t.which
                ? (clearTimeout(suggestTimeout),
                    (suggestTimeout = setTimeout(function () {
                        var t = $(e).parent();
                        $(t).find(".suggestsearch").length || $(t).append("<div class='suggestsearch'></div>");
                        var a = $(t).find(".suggestsearch"),
                            i = $(e).val().trim().toLowerCase();
                        i.length < 1
                            ? $(a).hide()
                            : i.length >= 1 &&
                            ($(e).addClass("loading"),
                                $.ajax({
                                    url: "/Comic/Services/SuggestSearch.ashx",
                                    type: "GET",
                                    dataType: "html",
                                    data: { q: i },
                                    cache: !0,
                                    success: function (t) {
                                        $(e).removeClass("loading"), "" == t || " " == t ? $(a).hide() : $(a).html(t).show(), 1 == callInitFrom404 && ($(".pagenotfound .not-found .searchinput").val(""), (callInitFrom404 = !1));
                                    },
                                }));
                    }, 300)))
                : $(e).parent().find(".searchbutton").trigger("click")
            : 0 == $(i).find(".selected").length
                ? $(i).find("li").last().addClass("selected")
                : ((a = $(i).find(".selected").prev()).hasClass("li-group") && (a = a.prev()), $(i).find(".selected").removeClass("selected"), a.addClass("selected"))
        : 0 == $(i).find(".selected").length
            ? $(i).find("li").first().addClass("selected")
            : ((a = $(i).find(".selected").next()).hasClass("li-group") && (a = a.next()), $(i).find(".selected").removeClass("selected"), a.addClass("selected"));
}
$(".comicsearchbox input[type='text']").keyup(function (e) {
    SuggestSearch(this, e);
}),
    $(".comicsearchbox input[type='text']")
        .focus(function () {
            wWidth < 768 ? $(".search-box").addClass("search-box-expanded") : $(".search-box").removeClass("search-box-expanded"), window.scrollTo(0, window.scrollY);
        })
        .blur(function () {
            $(".search-box").removeClass("search-box-expanded");
        }),
    $(document).on("click", function (e) {
        0 === $(e.target).closest(".suggestsearch").length && $(".suggestsearch").hide(),
            0 === $(e.target).closest(".notification-popup").length && $(".notification-popup").remove(),
            0 === $(e.target).closest(".comment-wrapper .comment-more").length && 0 === $(e.target).closest(".comment-wrapper .more-action").length && $(".comment-wrapper .comment-more").addClass("hidden");
    });
var elementScrollToFixed,
    callInitFrom404 = !1;
if ($("body").hasClass("pagenotfound")) {
    $(".pagenotfound .searchbutton").click(function () {
        var e = $(this).parents(".comicsearchbox").find(".searchinput");
        return e.val().length && (location.href = "/tim-truyen?keyword=" + encodeURIComponent(e.val()).replace(/%20/g, "+")), !1;
    }),
        $(".pagenotfound .comicsearchbox input[type='text']").keyup(function (e) {
            13 != e.which || $(".pagenotfound .comicsearchbox .searchbutton").trigger("click");
        });
    var path = window.location.pathname,
        pathTemp = "",
        isChapterUrl = !1;
    if ((0 == path.indexOf("/truyen-tranh/") && ((pathTemp = path.replace("/truyen-tranh/", "")), path.indexOf("/chap-") > -1 && (isChapterUrl = !0)), "" != pathTemp)) {
        var pathArray = pathTemp.split("/");
        if (pathArray.length > 0) {
            callInitFrom404 = !0;
            for (var strKeyword = "", sepa = "", keywordArray = pathArray[0].split("-"), keywordLength = 1 == isChapterUrl ? keywordArray.length : keywordArray.length - 1, j = 0; j < keywordLength; j++)
                (strKeyword += sepa + keywordArray[j]), (sepa = " ");
            $(".pagenotfound .not-found .searchinput").val(strKeyword).focus().trigger("keyup");
        }
    }
}
function InitDropdownMenuOnMobile(e) {
    $(e).parent().hasClass("open") ? $("li.dropdown.open").removeClass("open") : ($("li.dropdown.open").removeClass("open"), $(e).parent().addClass("open"));
}
$(".alertError").click(function () {
    var e = gOpts.chapterId;
    $.ajax({
        url: "/Comic/Services/ComicService.asmx/ReportChapterForm",
        type: "post",
        dataType: "json",
        data: { chapterId: e },
        success: function (t) {
            t.success &&
                t.reportFormHtml &&
                ($("body").addClass("modal-open").append(t.reportFormHtml),
                    $(".btn-send-report").click(function () {
                        var t = $(".ddl-error-type").val(),
                            a = $(".error-content input").val();
                        if ("-1" == t) return $(".ddl-error-type").focus(), void alert("Vui lòng chọn loại lỗi.");
                        if ("" == a) return $(".error-content input").focus(), void alert("Vui lòng nhập Nội dung lỗi");
                        if (0 == AjaxHelper.loadWaiting) {
                            AjaxHelper.setLoadWaiting(!0);
                            var i = "";
                            $(".g-recaptcha").length && (i = grecaptcha.getResponse()),
                                $.ajax({
                                    url: "/Comic/Services/ComicService.asmx/ReportChapter",
                                    type: "post",
                                    dataType: "json",
                                    data: { chapterId: e, errorType: t, errorText: a, captcha: i },
                                    success: function (e) {
                                        e.message && alert(e.message), e.success && ($("body").removeClass("modal-open"), $(".modal").remove(), $(".modal-backdrop").remove());
                                    },
                                    complete: function (e) {
                                        AjaxHelper.setLoadWaiting(!1);
                                    },
                                });
                        }
                    }),
                    $(".ddl-error-type").change(function () {
                        $(".report-note").text("");
                        var e = $(this).find("option:selected");
                        null != e && $(".report-note").text(e.attr("rel"));
                    }));
        },
    });
}),
    $("body").on("click", ".follow-link", function () {
        if (0 == AjaxHelper.loadWaiting) {
            AjaxHelper.setLoadWaiting(!0);
            var e = $(this),
                t = null,
                a = $(e).attr("data-id");
            $("body").hasClass("comic-detail") && (t = $(e).parent().find("b")),
                $.ajax({
                    url: siteRoot + "/Comic/Services/ComicService.asmx/GetFollowToken",
                    xhrFields: { withCredentials: !0 },
                    type: "post",
                    dataType: "json",
                    data: { comicId: a, token: gOpts.key ? gOpts.key : $(e).attr("data-key") },
                    cache: !0,
                    success: function (i) {
                        i && i.success
                            ? $.ajax({
                                url: siteRoot + "/Comic/Services/ComicService.asmx/Follow",
                                xhrFields: { withCredentials: !0 },
                                type: "post",
                                dataType: "json",
                                data: { comicId: a, token: i.data },
                                cache: !0,
                                success: function (a) {
                                    a && a.success
                                        ? (1 == a.status
                                            ? ($(e).html('<i class="fa fa-times"></i> <span>Bỏ theo dõi</span>'), $(e).hasClass("btn-success") && $(e).removeClass("btn-success").addClass("btn-danger"))
                                            : ($(e).html('<i class="fa fa-heart"></i> <span>Theo dõi</span>'), $(e).hasClass("btn-danger") && $(e).removeClass("btn-danger").addClass("btn-success")),
                                            null != t && t.text(a.followedCount),
                                            SetUserStorage())
                                        : a.message && alert(a.message);
                                },
                            })
                            : i.message && alert(i.message);
                    },
                    complete: function (e) {
                        AjaxHelper.setLoadWaiting(!1);
                    },
                    error: function (e, t, a) {
                        AjaxHelper.processAjaxError(a);
                    },
                });
        }
    }),
    $("body").on("click", '.modal button[data-dismiss="modal"]', function () {
        $("body").removeClass("modal-open"), $(".modal").remove(), $(".modal-backdrop").remove();
        var e = $(".chapter-detail .select-chapter");
        e.length && e.is(":disabled") && e.prop("disabled", !1);
    }),
    $("body").on("click", ".mark-as-read", function (e) {
        e.preventDefault();
        var t = $(this);
        return (
            $.ajax({
                type: "POST",
                url: siteRoot + "/Comic/Services/ComicService.asmx/MarkAsRead",
                xhrFields: { withCredentials: !0 },
                data: { comicId: t.attr("data-id"), userGuid: getUserGuid() },
                success: function (e) {
                    t.parents(".unread").find(".chapter a").addClass("visited"), t.parents(".unread").removeClass(".unread"), t.parents(".list-chapter").find(".chapter a").addClass("visited"), t.remove(), SetUserStorage();
                },
            }),
            !1
        );
    }),
    $("body").on("click", ".read-remove", function (e) {
        e.preventDefault();
        var t = $(this);
        return (
            $.ajax({
                type: "POST",
                url: siteRoot + "/Comic/Services/ComicService.asmx/ReadRemove",
                xhrFields: { withCredentials: !0 },
                data: { comicId: t.attr("data-id"), token: t.attr("data-key") },
                success: function (e) {
                    e.success && e.readToken && (t.parents(".item-read").remove(), UpdateUserReadToken(e.readToken));
                },
            }),
            !1
        );
    }),
    $(".changed-redirect").change(function () {
        window.location = $(this).val();
    }),
    $(".navbar-nav>li").hover(
        function () {
            $(".navbar-nav > li.active").removeClass("active").addClass("curr"), $(this).addClass("open");
        },
        function () {
            $(".navbar-nav > li.curr").removeClass("curr").addClass("active"), $(this).removeClass("open");
        }
    ),
    isMobileDevice &&
    $(".main-menu>li.dropdown>a").click(function () {
        return InitDropdownMenuOnMobile(this), !1;
    }),
    $(".nav-tabs li a").click(function () {
        return $(".nav-tabs li").removeClass("active"), $(".tab-content .tab-pane").removeClass("active").removeClass("in"), $(this).parent().addClass("active"), $($(this).attr("href")).addClass("active").addClass("in"), !1;
    }),
    $(".megamenu ul li a").hover(
        function () {
            $(".megamenu p").addClass("separator").text($(this).attr("data-title"));
        },
        function () {
            $(".megamenu p").removeClass("separator").text("");
        }
    ),
    $(".navbar-toggle").click(function () {
        $("body").hasClass("menu-open")
            ? ($("body").removeClass("menu-open"), $(this).find(".fa").removeClass("fa-times").addClass("fa-bars"))
            : ($("body").addClass("menu-open"), $(this).find(".fa").removeClass("fa-bars").addClass("fa-times"));
    }),
    $(".search-button-icon").click(function () {
        $(".navbar-toggle").trigger("click"), $(".navbar-collapse .searchinput").focus();
    }),
    $(".navbar-collapse .searchinput").focus(function () {
        window.scrollTo(0, 0);
    }),
    isMobileDevice && $(".facebook-like .tip").addClass("hidden");
try {
    if (top.location.hostname != self.location.hostname) throw 1;
} catch (a) {
    top.location.href = self.location.href;
}
if ($(".items-slide").length) {
    var owl = $(".items-slide .owl-carousel");
    owl.owlCarousel({
        lazyLoad: !0,
        autoPlay: 5e3,
        stopOnHover: !0,
        slideSpeed: 300,
        paginationSpeed: 800,
        itemsCustom: [
            [0, 1],
            [360, 2],
            [480, 3],
            [768, 4],
            [992, 5],
        ],
    }),
        $(".items-slide .next").click(function () {
            return owl.trigger("owl.next"), !1;
        }),
        $(".items-slide .prev").click(function () {
            return owl.trigger("owl.prev"), !1;
        });
}
function loadTooltip() {
    isMobileDevice ||
        $(".jtip")
            .hover(
                function () {
                    var e = $($(this).data("jtip"));
                    if (!e.length) return !1;
                    e.find(".box_img img").attr("src", e.find(".box_img img").attr("data-original")), $('<div id="cluetip"></div>').html(e.html()).appendTo("body").fadeIn("300");
                },
                function () {
                    $("#cluetip").remove();
                }
            )
            .mousemove(function (e) {
                var t = e.pageX + 20,
                    a = e.pageY + 10;
                $("#cluetip").css({ top: a, left: t });
            });
}
initLazyload(),
    loadTooltip(),
    $(".star").length &&
    $(".star").raty({
        path: "http://st." + hostName + "/Data/Sites/1/skins/comic/images/",
        score: function () {
            return $(this).attr("data-rating");
        },
        half: !0,
        readOnly: "false" == $(".star").attr("data-allowrating"),
        click: function (e, t) {
            var a = { comicId: $(this).attr("data-id"), rate: parseInt(e), token: gOpts.key };
            $.ajax({
                type: "POST",
                url: "/Comic/Services/ComicService.asmx/Rating",
                data: a,
                success: function (e) {
                    e.message && alert(e.message);
                },
                error: function (e, t, a) {
                    AjaxHelper.processAjaxError(a);
                },
            });
        },
    });
var isHeaderScrollToFixed = !1,
    hasScrollFixed = !1;
if (
    ($("body").hasClass("chapter-detail") ? (elementScrollToFixed = $("#chapterNav")) : wWidth >= 768 ? (elementScrollToFixed = $("#mainNav")) : ((isHeaderScrollToFixed = !0), (elementScrollToFixed = $("#header"))),
        elementScrollToFixed.scrollToFixed({
            preFixed: function () {
                hasScrollFixed = !0;
            },
            preUnfixed: function () {
                hasScrollFixed = !1;
            },
        }),
        isMobileDevice)
) {
    var supportsPassive = !1;
    try {
        var opts = Object.defineProperty({}, "passive", {
            get: function () {
                supportsPassive = !0;
            },
        });
        window.addEventListener("testPassive", null, opts), window.removeEventListener("testPassive", null, opts);
    } catch (o) { }
    var didScroll = !1,
        lastScrollTop = 0,
        delta = 5,
        displayStatus = 0,
        backToTopStatus = 0;
    function scrollHandler() {
        timer = setTimeout(function () {
            if (1 == didScroll) {
                var e = $(this).scrollTop();
                if (
                    (e > 200 ? 1 != backToTopStatus && ((backToTopStatus = 1), $("#back-to-top").css("visibility", "visible")) : -1 != backToTopStatus && ((backToTopStatus = -1), $("#back-to-top").css("visibility", "hidden")),
                        Math.abs(lastScrollTop - e) <= delta)
                )
                    return void (didScroll = !1);
                if (1 == hasScrollFixed) {
                    e < lastScrollTop || e < 100
                        ? 1 != displayStatus && ((displayStatus = 1), 1 == isHeaderScrollToFixed && elementScrollToFixed.find(".logo").css("visibility", "visible"), elementScrollToFixed.css("visibility", "visible"))
                        : -1 != displayStatus && ((displayStatus = -1), 1 == isHeaderScrollToFixed && elementScrollToFixed.find(".logo").css("visibility", "hidden"), elementScrollToFixed.css("visibility", "hidden"));
                } else 1 != displayStatus && ((displayStatus = 1), 1 == isHeaderScrollToFixed && elementScrollToFixed.find(".logo").css("visibility", "visible"), elementScrollToFixed.css("visibility", "visible"));
                (didScroll = !1), (lastScrollTop = e);
            }
        }, 200);
    }
    $("#back-to-top").css("visibility", "hidden"),
        document.addEventListener(
            "scroll",
            function (e) {
                0 == didScroll && ((didScroll = !0), scrollHandler());
            },
            1 == supportsPassive && { passive: !0 }
        );
}
if (
    (($.fn.shorten = function (e) {
        var t = { maxHeight: 42, ellipsesText: "...", moreText: "Xem thêm <i class='fa fa-angle-right'></i>", lessText: "<i class='fa fa-angle-left'></i> Thu gọn" };
        return (
            e && $.extend(t, e),
            $(document).off("click", ".morelink"),
            $(document).on(
                {
                    click: function () {
                        var e = $(this);
                        return e.hasClass("less") ? (e.removeClass("less"), e.html(t.moreText), e.prev().addClass("shortened")) : (e.addClass("less"), e.html(t.lessText), e.prev().removeClass("shortened")), !1;
                    },
                },
                ".morelink"
            ),
            this.each(function () {
                var e = $(this);
                e.hasClass("shortened") || (e.height() > t.maxHeight && (e.addClass("shortened"), $('<a href="#" class="morelink">' + t.moreText + "</a>").insertAfter(e)));
            })
        );
    }),
        $(".detail-content p").shorten(),
        $(".show-top-images a").click(function () {
            for (var e = 1, t = $(".page-hidden").length - 1; t >= 0 && !(e > 3); t--) {
                var a = $(".page-hidden img").eq(t);
                a.attr("src", a.attr("data-original")), a.parent().show().removeClass("page-hidden"), (e += 1);
            }
            return $(this).parent().remove(), $(".show-images").removeClass("hidden"), !1;
        }),
        $(".show-images a").click(function () {
            return (
                $(".page-hidden img").each(function () {
                    $(this).attr("src", $(this).attr("data-original")), $(this).parent().show().removeClass("page-hidden");
                }),
                $(this).parent().remove(),
                !1
            );
        }),
        $(".user-sidebar").click(function () {
            var e = $(this).find(".fa");
            e.hasClass("fa-angle-down")
                ? ($(".user-sidelink").addClass("hidden"), e.removeClass("active").removeClass("fa-angle-down").addClass("fa-angle-up"))
                : ($(".user-sidelink").removeClass("hidden"), e.addClass("active").removeClass("fa-angle-up").addClass("fa-angle-down"));
        }),
        wWidth < 768 && $(".user-sidebar").trigger("click"),
        $(".list-chapter .view-more").click(function () {
            return $(".list-chapter ul").addClass("active"), $(this).remove(), !1;
        }),
        $(".dropdown-genres").length && $(".dropdown-genres").insertAfter($(".comic-filter h1")),
        $(".advsearch-page .genre-item").click(function () {
            var e = $(this).find("span");
            e.hasClass("icon-checkbox") ? e.removeClass("icon-checkbox").addClass("icon-tick") : e.hasClass("icon-tick") ? e.removeClass("icon-tick").addClass("icon-cross") : e.removeClass("icon-cross").addClass("icon-checkbox");
        }),
        $(".advsearch-page .btn-collapse").click(function () {
            $(this).find(".show-text").toggleClass("hidden"),
                $(this).find(".hide-text").toggleClass("hidden"),
                $(this).find(".fa").toggleClass("fa-angle-double-down").toggleClass("fa-angle-double-up"),
                $(".advsearch-form").toggleClass("hidden");
        }),
        $(".advsearch-page .btn-search").click(function () {
            var e = $(".btn-reset").attr("href"),
                t = "",
                a = "",
                i = "",
                o = "";
            $.each($(".genre-item span"), function (e, s) {
                $(s).hasClass("icon-tick") ? ((t += i + $(s).attr("data-id")), (i = ",")) : $(s).hasClass("icon-cross") && ((a += o + $(s).attr("data-id")), (o = ","));
            }),
                (location.href = e + "?genres=" + t + "&notgenres=" + a + "&gender=" + $(".select-gender").val() + "&status=" + $(".select-status").val() + "&minchapter=" + $(".select-minchapter").val() + "&sort=" + $(".select-sort").val());
        }),
        $(".chapter a").length && "undefined" != typeof Storage && void 0 !== localStorage["visited-comics"])
) {
    var items = JSON.parse(localStorage["visited-comics"]);
    if ($(".list-chapter .chapter a").length) {
        var comicIndex = items
            .map(function (e) {
                return e.id;
            })
            .indexOf(gOpts.comicId);
        if (comicIndex > -1 && items[comicIndex].chapterIds)
            for (var chapterIds = items[comicIndex].chapterIds, index = 0; index < $(".list-chapter .chapter a").length && !(index >= 25); index++) {
                var obj = $(".list-chapter .chapter a").eq(index),
                    chapterId = obj.attr("data-id");
                chapterId && $.inArray(parseInt(chapterId), chapterIds) > -1 && obj.addClass("visited");
            }
    }
    $(".comic-item .chapter a").length &&
        $(".comic-item").each(function (e, t) {
            var a = $(this).attr("data-id");
            if (a) {
                var i = items
                    .map(function (e) {
                        return e.id;
                    })
                    .indexOf(parseInt(a));
                if (i > -1 && items[i].chapterIds) {
                    var o = items[i].chapterIds;
                    o &&
                        o.length > 0 &&
                        $(this)
                            .find(".chapter a")
                            .each(function (e, t) {
                                var a = $(this).attr("data-id");
                                a && $.inArray(parseInt(a), o) > -1 && $(this).addClass("visited");
                            });
                }
            }
        });
}
var visitedComicsLimit = 360;
function saveVisitedComics() {
    if ($("body").hasClass("chapter-detail") && "undefined" != typeof Storage) {
        var e = gOpts.chapterId;
        if (e) {
            void 0 !== localStorage["visited-chapters"] && localStorage.removeItem("visited-chapters");
            var t = $(".breadcrumb li").eq(2).find("a"),
                a = $(".breadcrumb li").eq(3).find("a"),
                i = $('meta[itemprop="image"]').attr("content"),
                o = gOpts.siteRoot.indexOf("//www.") > -1 ? gOpts.siteRoot.replace("//www.", "//st.") : gOpts.siteRoot.replace("//", "//st.");
            if (t && a && i) {
                var s = gOpts.comicId,
                    r = {
                        id: s,
                        image: i.replace(o, ""),
                        name: t.find("span").text(),
                        url: t.attr("href").replace(gOpts.siteRoot, ""),
                        chapterName: a.find("span").text().replace("Chapter ", ""),
                        chapterUrl: a.attr("href").replace(gOpts.siteRoot, ""),
                        chapterIds: [e],
                    };
                if (void 0 !== localStorage["visited-comics"]) {
                    var n = JSON.parse(localStorage["visited-comics"]),
                        l = n
                            .map(function (e) {
                                return e.id;
                            })
                            .indexOf(s);
                    if (l > -1) {
                        var c = n[l],
                            d = c.chapterIds && c.chapterIds.length > 0 ? c.chapterIds : [];
                        if (d.length > 0) {
                            var p = d.indexOf(e);
                            p >= 0 && d.splice(p, 1);
                        }
                        if ((d.push(e), d.length > 20)) for (var m = 20; m < d.length; m++) d.shift();
                        (r.chapterIds = d), n.splice(l, 1);
                    }
                    if ((n.push(r), n.length > visitedComicsLimit)) for (m = visitedComicsLimit; m < n.length; m++) n.shift();
                    localStorage["visited-comics"] = JSON.stringify(n);
                } else {
                    var u = [];
                    u.push(r), (localStorage["visited-comics"] = JSON.stringify(u));
                }
            }
        }
    }
}
if ($("body").hasClass("comic-detail") && !$(".read-continue").length && "undefined" != typeof Storage && void 0 !== localStorage["visited-comics"] && (items = JSON.parse(localStorage["visited-comics"])).length > 0)
    for (var i = items.length - 1; i >= 0; i--)
        if (items[i].id == gOpts.comicId) {
            var readHtml = $("<a>").html('Đọc tiếp <i class="fa fa-angle-right"></i>').attr("class", "read-continue btn btn-danger mrb5").attr("href", items[i].chapterUrl);
            $(".read-action").append(readHtml);
            break;
        }
if ($(".visited-comics-page").length) {
    var t = getParameterByName("t");
    if (3 == t) populateVisitedComicCloud();
    else if ("undefined" != typeof Storage)
        if (void 0 !== localStorage["visited-comics"]) {
            var container = $(".visited-actions").empty().addClass("mrb5 text-center"),
                pageSize = 36;
            (items = JSON.parse(localStorage["visited-comics"])).length > 0
                ? ($(".visited-comics-page").data("items", items.reverse()), populateVisitedComic(1, pageSize), createPaging(items, pageSize))
                : $(".visited-comics-page").html("Bạn chưa đọc truyện nào.");
        } else $(".visited-comics-page").html("Bạn chưa đọc truyện nào.");
}
function populateVisitedComicCloud() {
    if (($(".visited-tab .comment-nav li").eq(0).removeClass("active"), $(".visited-tab .comment-nav li").eq(1).addClass("active"), 0 == AjaxHelper.loadWaiting)) {
        AjaxHelper.setLoadWaiting(!0);
        var e = getParameterByName("page");
        null == e && (e = 1),
            $.ajax({
                type: "GET",
                url: siteRoot + "/Comic/Services/ComicService.asmx/GetReadComics",
                xhrFields: { withCredentials: !0 },
                data: { token: gOpts.readToken ? gOpts.readToken : "", page: e },
                success: function (e) {
                    if (e.success) {
                        var t = $(".visited-comics-page");
                        e.listHtml && (t.html(e.listHtml), initLazyload(), e.pagerHtml && $('<div class="pagination-outter"></div>').html(e.pagerHtml).appendTo(t), $("html, body").animate({ scrollTop: 0 }, 0, "linear"));
                    }
                },
                complete: function (e) {
                    AjaxHelper.setLoadWaiting(!1);
                },
                error: function (e, t, a) { },
            });
    }
}
function createPaging(e, t) {
    var a = Math.ceil(e.length / t);
    if (a > 1) {
        for (var i = $("<div>").addClass("pagination-outter"), o = $("<ul>").addClass("pagination visited-pagination"), s = 1; s <= a; s++) {
            var r = $("<li>");
            1 == s && r.addClass("active");
            var n = $("<a>")
                .text(s)
                .data("page", s)
                .click(function (e) {
                    return (
                        e.preventDefault(), $(".visited-pagination li").removeClass("active"), $(this).parent().addClass("active"), populateVisitedComic($(this).data("page"), t), $("html, body").animate({ scrollTop: 0 }, 200, "linear"), !1
                    );
                });
            r.append(n), o.append(r);
        }
        i.append(o), $(".visited-comics-page .pagination-outter").remove(), $(".visited-comics-page").append(i);
    }
}
function populateVisitedComic(e, t) {
    var a = $(".visited-comics-page").data("items");
    if (a) {
        for (var i = a.slice((e - 1) * t, e * t), o = $("<div>").addClass("row").addClass("visited-list"), s = "//st." + gOpts.host, r = 0; r < i.length; r++) {
            var n = i[r],
                l = $("<div>").addClass("item"),
                c = $("<figure>").addClass("clearfix"),
                d = $("<div>").addClass("image"),
                p = $("<a>").attr("title", n.name).attr("href", n.url),
                m =
                    ($("<img>")
                        .addClass("lazy")
                        .attr("alt", n.name)
                        .attr("data-original", 0 != n.image.indexOf("/data/") ? n.image : s + n.image)
                        .attr("src", "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7")
                        .data("id", n.id)
                        .on("error", function (e) {
                            validateComic(this);
                        })
                        .appendTo(p),
                        $("<div>").addClass("view"));
            $("<a>")
                .addClass("visited-remove")
                .attr("href", "#")
                .data("id", n.id)
                .html('<i class="fa fa-times"></i> Xóa')
                .click(function (e) {
                    return e.preventDefault(), removeVisitedComic($(this)), !1;
                })
                .appendTo(m);
            d.append(p).append(m);
            var u = $("<figcaption>"),
                h = $("<h3>"),
                f = $("<ul>"),
                g = $("<li>").addClass("chapter clearfix"),
                v = $("<a>")
                    .html("Đọc tiếp " + (0 == n.chapterName.indexOf("Chapter") ? n.chapterName : "Chapter " + n.chapterName) + ' <i class="fa fa-angle-right"></i>')
                    .attr("href", n.chapterUrl),
                C = $("<a>").html(n.name).attr("title", n.name).attr("href", n.url);
            h.append(C), g.append(v), f.append(g), u.append(h).append(f), c.append(d).append(u), l.append(c), o.append(l);
        }
        $(".visited-comics-page .pagination").length ? ($(".visited-comics-page .visited-list").remove().append(o), $(".visited-comics-page").prepend(o)) : $(".visited-comics-page").empty().append(o), initLazyload();
    }
}
if ($(".visited-comics").length && "undefined" != typeof Storage && void 0 !== localStorage["visited-comics"] && (items = JSON.parse(localStorage["visited-comics"])).length > 0) {
    container = $("<div>").addClass("box darkBox").html('<h2>Lịch sử đọc truyện<a class="view-all" href="/lich-su">Xem tất cả</a></h2>');
    var ul = $("<ul>").addClass("list-unstyled"),
        imageSiteRoot = ((j = 0), "//st." + gOpts.host);
    for (i = items.length - 1; i >= 0; i--) {
        var element = items[i],
            li = $("<li>").addClass("clearfix"),
            divItem = $("<div>").addClass("t-item");
        li.append(divItem);
        var aImg = $("<a>").addClass("thumb").attr("title", element.name).attr("href", element.chapterUrl);
        $("<img>")
            .attr("alt", element.name)
            .attr("src", 0 != element.image.indexOf("/data/") ? element.image : imageSiteRoot + element.image)
            .data("id", element.id)
            .on("error", function (e) {
                validateComic(this);
            })
            .appendTo(aImg),
            divItem.append(aImg);
        var h3 = $("<h3>").addClass("title"),
            aComic = $("<a>").html(element.name).attr("href", element.chapterUrl);
        h3.append(aComic), divItem.append(h3);
        var p = $("<p>").addClass("chapter"),
            aViewMore = $("<a>")
                .html("Đọc tiếp " + (0 == element.chapterName.indexOf("Chapter") ? element.chapterName : "Chapter " + element.chapterName) + ' <i class="fa fa-angle-right"></i>')
                .attr("href", element.chapterUrl),
            span = $("<span>").addClass("view pull-right"),
            remove = $("<a>")
                .addClass("visited-remove")
                .attr("href", "#")
                .data("id", element.id)
                .html('<i class="fa fa-times"></i> Xóa')
                .click(function (e) {
                    return e.preventDefault(), removeVisitedComic($(this)), !1;
                })
                .appendTo(span);
        if ((p.append(aViewMore).append(span), divItem.append(p), ul.append(li), ++j > 2)) break;
    }
    container.append(ul), $(".visited-comics").append(container);
}
function validateComic(e) {
    var t = parseInt($(e).data("id"));
    $.ajax({
        type: "GET",
        url: "/Comic/Services/ComicService.asmx/ValidateComic",
        data: { comicId: t },
        success: function (a) {
            if ("undefined" != typeof Storage && void 0 !== localStorage["visited-comics"]) {
                var i = JSON.parse(localStorage["visited-comics"]),
                    o = i
                        .map(function (e) {
                            return e.id;
                        })
                        .indexOf(t);
                if (o > -1) {
                    if (a.success) {
                        (i[o].image = a.image), (i[o].name = a.name), (i[o].url = a.url);
                        var s = "//st." + gOpts.host;
                        $(e).attr("src", 0 != a.image.indexOf("/data/") ? a.image : s + a.image);
                    } else i.splice(o, 1), $(".visited-comics-page").length ? $(e).parents(".item").remove() : $(".visited-comics").length && $(e).parents("li").remove();
                    localStorage["visited-comics"] = JSON.stringify(i);
                }
            }
        },
    }),
        $(e).off("error");
}
function removeVisitedComic(e) {
    if ("undefined" != typeof Storage && void 0 !== localStorage["visited-comics"]) {
        var t = JSON.parse(localStorage["visited-comics"]),
            a = $(e).data("id");
        if (t.length > 0) {
            var i = t
                .map(function (e) {
                    return e.id;
                })
                .indexOf(a);
            i > -1 && (t.splice(i, 1), (localStorage["visited-comics"] = JSON.stringify(t)), $(e).parents(".item").remove(), $(e).parents("li").remove());
        }
    }
}
function getParameterByName(e, t) {
    t || (t = window.location.href), (e = e.replace(/[\[\]]/g, "\\$&"));
    var a = new RegExp("[?&]" + e + "(=([^&#]*)|&|#|$)").exec(t);
    return a ? (a[2] ? decodeURIComponent(a[2].replace(/\+/g, " ")) : "") : null;
}
function setupLazyLoad(e) {
    var t = [],
        a = document.querySelectorAll(e);
    if (
        ([].forEach.call(a, function (e, a) {
            t.push(e);
        }),
            t.length > 0)
    ) {
        var i = !1,
            o = !1,
            s = !1,
            r = !1;
        if ("IntersectionObserver" in window) {
            var n = new IntersectionObserver(
                function (e, t) {
                    e.forEach(function (e) {
                        e.intersectionRatio > 0 && (l(e.target), t.unobserve(e.target));
                    });
                },
                { rootMargin: "200px 0px 200px 0px", threshold: 0 }
            );
            t.forEach(function (e) {
                n.observe(e);
            });
        } else
            t.forEach(function (e) {
                l(e);
            });
        function l(t) {
            if (null != t) {
                var a = t.getAttribute("data-type");
                if (".comics-followed-block" == e) {
                    if (0 == o) {
                        o = !0;
                        var n = getUserGuid();
                        null != n &&
                            $.ajax({
                                type: "GET",
                                url: siteRoot + "/Comic/Services/ComicService.asmx/GetFollowedBlockComics",
                                data: { userGuid: n, token: gOpts.token ? gOpts.token : "" },
                                success: function (e) {
                                    e.success && e.followedListHtml && ($(".comics-followed-block").html(replaceUrl(e.followedListHtml)), initLazyload());
                                },
                            });
                    }
                } else if ("end-chapter" == a) {
                    if (0 == s) {
                        s = !0;
                        var l = "";
                        1 == followedOnChapter && gOpts.token && (l = gOpts.token),
                            $.ajax({
                                type: "POST",
                                url: siteRoot + "/Comic/Services/ComicService.asmx/ChapterLoaded",
                                xhrFields: { withCredentials: !0 },
                                data: { chapterId: gOpts.chapterId, comicToken: gOpts.key, userToken: l },
                                success: function (e) {
                                    e.success &&
                                        e.token &&
                                        $.ajax({
                                            type: "POST",
                                            url: siteRoot + "/Comic/Services/ComicService.asmx/Read",
                                            xhrFields: { withCredentials: !0 },
                                            data: { chapterId: gOpts.chapterId, token: e.token },
                                            success: function (e) {
                                                e.success && e.readToken && UpdateUserReadToken(e.readToken);
                                            },
                                        });
                                },
                            });
                    }
                } else
                    "top-members" == a
                        ? 0 == r &&
                        ($.ajax({
                            type: "GET",
                            url: "/Comic/Services/ComicService.asmx/TopMembers?top=5",
                            success: function (e) {
                                e && 1 == e.success && ($(".top-members").html(e.data), initLazyload(), AjaxHelper.changeLevelText());
                            },
                        }),
                            (r = !0))
                        : "facebook" == a && 0 == i && ($("body").hasClass("comic-detail") ? addEventListener("scroll", c, !1) : ((i = !0), d()));
            }
        }
        function c() {
            (i = !0), d(), removeEventListener("scroll", c);
        }
        function d() {
            var e, t, a, i, o;
            (window.fbAsyncInit = function () {
                FB.init({ appId: "745819368841087", status: !1, cookie: !0, version: "v2.0", xfbml: !0, oauth: !0 });
            }),
                (e = document),
                (t = "script"),
                (a = "facebook-jssdk"),
                (o = e.getElementsByTagName(t)[0]),
                e.getElementById(a) || (((i = e.createElement(t)).id = a), (i.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&appId=745819368841087&version=v2.7"), o.parentNode.insertBefore(i, o));
        }
    }
}
function reCrawler() {
    ajaxComicPost("ReCrawlerChapter", refreshCallback, { chapterId: gOpts.chapterId });
}
function fixChapter() {
    ajaxComicPost("FixChapter", refreshCallback, { chapterId: gOpts.chapterId });
}
function deleteChapterPage(e) {
    ajaxComicPost("DeleteChapterPage", deleteChapterPageCallback, { chapterId: gOpts.chapterId, index: $(e).parent().index(".page-chapter") });
}
function deleteChapterPageCallback(e) {
    $(".page-chapter")
        .eq(e.index)
        .slideUp(function () {
            $(this).remove();
        });
}
function refreshCallback(e) {
    1 == e.success && location.reload();
}
function ajaxComicPost(e, t, a) {
    0 == AjaxHelper.loadWaiting &&
        (AjaxHelper.setLoadWaiting(!0),
            $.ajax({
                type: "POST",
                url: "/Comic/Services/ComicService.asmx/" + e,
                data: a,
                success: function (e) {
                    void 0 !== t && t(e);
                },
                complete: function (e) {
                    AjaxHelper.setLoadWaiting(!1);
                },
                error: function (e, t, a) {
                    AjaxHelper.processAjaxError(a);
                },
            }));
}
setupLazyLoad(".lazy-module"), saveVisitedComics();
