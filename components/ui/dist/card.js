"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.CardContent = exports.CardDescription = exports.CardAction = exports.CardTitle = exports.CardFooter = exports.CardHeader = exports.Card = void 0;
var React = require("react");
var utils_1 = require("@/lib/utils");
function Card(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (React.createElement("div", __assign({ "data-slot": "card", className: utils_1.cn("bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm", className) }, props)));
}
exports.Card = Card;
function CardHeader(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (React.createElement("div", __assign({ "data-slot": "card-header", className: utils_1.cn("@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6", className) }, props)));
}
exports.CardHeader = CardHeader;
function CardTitle(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (React.createElement("div", __assign({ "data-slot": "card-title", className: utils_1.cn("leading-none font-semibold", className) }, props)));
}
exports.CardTitle = CardTitle;
function CardDescription(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (React.createElement("div", __assign({ "data-slot": "card-description", className: utils_1.cn("text-muted-foreground text-sm", className) }, props)));
}
exports.CardDescription = CardDescription;
function CardAction(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (React.createElement("div", __assign({ "data-slot": "card-action", className: utils_1.cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className) }, props)));
}
exports.CardAction = CardAction;
function CardContent(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (React.createElement("div", __assign({ "data-slot": "card-content", className: utils_1.cn("px-6", className) }, props)));
}
exports.CardContent = CardContent;
function CardFooter(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (React.createElement("div", __assign({ "data-slot": "card-footer", className: utils_1.cn("flex items-center px-6 [.border-t]:pt-6", className) }, props)));
}
exports.CardFooter = CardFooter;
