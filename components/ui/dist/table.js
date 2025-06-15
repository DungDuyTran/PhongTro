"use client";
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
exports.TableCaption = exports.TableCell = exports.TableRow = exports.TableHead = exports.TableFooter = exports.TableBody = exports.TableHeader = exports.Table = void 0;
var React = require("react");
var utils_1 = require("@/lib/utils");
function Table(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (React.createElement("div", { "data-slot": "table-container", className: "relative w-full overflow-x-auto" },
        React.createElement("table", __assign({ "data-slot": "table", className: utils_1.cn("w-full caption-bottom text-sm", className) }, props))));
}
exports.Table = Table;
function TableHeader(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (React.createElement("thead", __assign({ "data-slot": "table-header", className: utils_1.cn("[&_tr]:border-b", className) }, props)));
}
exports.TableHeader = TableHeader;
function TableBody(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (React.createElement("tbody", __assign({ "data-slot": "table-body", className: utils_1.cn("[&_tr:last-child]:border-0", className) }, props)));
}
exports.TableBody = TableBody;
function TableFooter(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (React.createElement("tfoot", __assign({ "data-slot": "table-footer", className: utils_1.cn("bg-muted/50 border-t font-medium [&>tr]:last:border-b-0", className) }, props)));
}
exports.TableFooter = TableFooter;
function TableRow(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (React.createElement("tr", __assign({ "data-slot": "table-row", className: utils_1.cn("hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors", className) }, props)));
}
exports.TableRow = TableRow;
function TableHead(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (React.createElement("th", __assign({ "data-slot": "table-head", className: utils_1.cn("text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className) }, props)));
}
exports.TableHead = TableHead;
function TableCell(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (React.createElement("td", __assign({ "data-slot": "table-cell", className: utils_1.cn("p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className) }, props)));
}
exports.TableCell = TableCell;
function TableCaption(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (React.createElement("caption", __assign({ "data-slot": "table-caption", className: utils_1.cn("text-muted-foreground mt-4 text-sm", className) }, props)));
}
exports.TableCaption = TableCaption;
