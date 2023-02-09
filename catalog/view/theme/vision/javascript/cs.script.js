/**
 * Look under your chair! console.log FOR EVERYONE!
 *
 * @see http://paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
 */
(function(b) {
    function c() {}
    for (var d = "assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,timeStamp,profile,profileEnd,time,timeEnd,trace,warn".split(","), a; a = d.pop();) {
        b[a] = b[a] || c
    }
})((function() {
    try {
        console.log();
        return window.console;
    } catch (err) {
        return window.console = {};
    }
})());
/**
 * Page-specific call-backs
 * Called after dom has loaded.
 */
var GLOBAL = {
    common: {
        init: function() {}
    },
    templateIndex: {
        init: function() {}
    },
    templateProduct: {
        init: function() {}
    },
    templateCart: {
        init: function() {}
    }
}
var UTIL = {
    fire: function(func, funcname, args) {
        var namespace = GLOBAL;
        funcname = (funcname === undefined) ? 'init' : funcname;
        if (func !== '' && namespace[func] && typeof namespace[func][funcname] == 'function') {
            namespace[func][funcname](args);
        }
    },
    loadEvents: function() {
        var bodyId = document.body.id;
        /* hit up common first.*/
        UTIL.fire('common');
        /* do all the classes too.*/
        $.each(document.body.className.split(/\s+/), function(i, classnm) {
            UTIL.fire(classnm);
            UTIL.fire(classnm, bodyId);
        });
    }
};
$(document).ready(UTIL.loadEvents);
/**
 * Ajaxy add-to-cart
 */
Number.prototype.formatMoney = function(c, d, t) {
    var n = this,
        c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "." : t,
        s = n < 0 ? "-" : "",
        i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};