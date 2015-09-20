﻿//这是一个非常简单的实现，没有分解transform，就当作一个demo吧
(function () {
    var old_access = jTimeline._access;
    var units = {
        left: "px",
        top: "px",
        right: "px",
        bottom: "px",
        width: "px",
        height: "px",
        fontSize: "px"
    };
    jTimeline._access = function (obj, key) {
        if (obj && !(key in obj)) return function (val) {
            if (arguments.length) {
                if (key in units) val += units[key];
                if (window.jMove) jMove.css(obj, key, val);
                else if (obj.css) obj.css(key, val);
                if (obj.style) {
                    if (obj.style.setProperty) obj.style.setProperty(key, val);
                    else obj.style[key] = val;
                }
            }
            else {
                if (obj.style) {
                    if (obj.style.getProperty) return parseFloat(obj.style.getProperty(key)) || 0;
                    return parseFloat(obj.style[key]) || 0;
                }
                return 0;
            }
        };
        return old_access.call(this, obj, key);
    };
    var old_isArray = jTimeline.isArray;
    jTimeline.isArray = function (o) {
        if (window.$ && $ == o.constructor) return true;
        return old_isArray.call(this, o)
    };
})();