"use client";
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var axios_1 = require("axios");
function ChatBot() {
    var _this = this;
    var _a = react_1.useState([
        "👋 Xin chào! Bạn cần giúp gì về phòng trọ?",
    ]), messages = _a[0], setMessages = _a[1];
    var _b = react_1.useState(""), input = _b[0], setInput = _b[1];
    var _c = react_1.useState(false), loading = _c[0], setLoading = _c[1];
    var sendMessage = function () { return __awaiter(_this, void 0, void 0, function () {
        var userMessage, res_1, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!input.trim())
                        return [2 /*return*/];
                    userMessage = "\uD83D\uDC64 " + input;
                    setMessages(function (prev) { return __spreadArrays(prev, [userMessage]); });
                    setInput("");
                    setLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, axios_1["default"].post("/api/achatbot", { message: input })];
                case 2:
                    res_1 = _a.sent();
                    setMessages(function (prev) { return __spreadArrays(prev, ["\uD83E\uDD16 " + res_1.data.reply]); });
                    return [3 /*break*/, 5];
                case 3:
                    err_1 = _a.sent();
                    console.error("Chatbot error:", err_1);
                    setMessages(function (prev) { return __spreadArrays(prev, [
                        "❌ Đã xảy ra lỗi khi gửi tin nhắn. Vui lòng thử lại.",
                    ]); });
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement("div", { className: "fixed bottom-5 right-5 bg-white border rounded-xl shadow-lg w-[300px] p-3 space-y-2 text-black" },
        React.createElement("div", { className: "h-[200px] overflow-y-auto text-sm" },
            messages.map(function (msg, i) { return (React.createElement("div", { key: i, className: "mb-1 whitespace-pre-line" }, msg)); }),
            loading && (React.createElement("div", { className: "italic text-gray-500" }, "\uD83E\uDD16 \u0110ang tr\u1EA3 l\u1EDDi..."))),
        React.createElement("div", { className: "flex space-x-2" },
            React.createElement("input", { className: "border p-1 rounded flex-1 text-xs", value: input, onChange: function (e) { return setInput(e.target.value); }, onKeyDown: function (e) { return e.key === "Enter" && sendMessage(); }, placeholder: "Nh\u1EADp tin nh\u1EAFn..." }),
            React.createElement("button", { onClick: sendMessage, className: "bg-blue-500 text-white px-2 py-1 rounded text-xs" }, "G\u1EEDi"))));
}
exports["default"] = ChatBot;
