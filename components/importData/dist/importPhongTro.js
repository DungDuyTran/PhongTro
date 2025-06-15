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
exports.__esModule = true;
var react_1 = require("react");
function ImportPhongTro() {
    var _this = this;
    var _a = react_1.useState(null), file = _a[0], setFile = _a[1];
    var _b = react_1.useState(""), message = _b[0], setMessage = _b[1];
    var _c = react_1.useState([]), errors = _c[0], setErrors = _c[1];
    var _d = react_1.useState(false), loading = _d[0], setLoading = _d[1];
    var handleUpload = function () { return __awaiter(_this, void 0, void 0, function () {
        var formData, res, data, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!file) {
                        alert("Vui lòng chọn file Excel!");
                        return [2 /*return*/];
                    }
                    formData = new FormData();
                    formData.append("file", file);
                    setLoading(true);
                    setMessage("");
                    setErrors([]);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, fetch("/api/phongtro/import", {
                            method: "POST",
                            body: formData
                        })];
                case 2:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 3:
                    data = _a.sent();
                    if (!res.ok) {
                        setMessage(data.message || "Đã xảy ra lỗi khi import");
                        setErrors(data.errors || []);
                    }
                    else {
                        setMessage(data.message || "Import thành công");
                        setErrors(data.errors || []);
                    }
                    return [3 /*break*/, 6];
                case 4:
                    err_1 = _a.sent();
                    setMessage("Lỗi kết nối đến máy chủ.");
                    return [3 /*break*/, 6];
                case 5:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement("div", { className: "p-4 border rounded max-w-lg space-y-4" },
        React.createElement("input", { type: "file", accept: ".xlsx", onChange: function (e) { var _a; return setFile(((_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0]) || null); } }),
        React.createElement("button", { onClick: handleUpload, disabled: loading, className: "bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50" }, loading ? "Đang xử lý..." : "Upload"),
        message && React.createElement("p", { className: "text-green-700" }, message),
        errors.length > 0 && (React.createElement("div", { className: "text-red-600 text-sm space-y-2" },
            React.createElement("p", { className: "font-semibold" },
                "C\u00F3 ",
                errors.length,
                " d\u00F2ng d\u1EEF li\u1EC7u kh\u00F4ng h\u1EE3p l\u1EC7:"),
            React.createElement("ul", { className: "list-disc ml-5 space-y-1" }, errors.map(function (err, i) { return (React.createElement("li", { key: i },
                React.createElement("strong", null,
                    "D\u00F2ng ",
                    err.row),
                ":",
                " ",
                Object.entries(err.errors)
                    .map(function (_a) {
                    var field = _a[0], msgs = _a[1];
                    return field + " (" + msgs.join(", ") + ")";
                })
                    .join("; "))); }))))));
}
exports["default"] = ImportPhongTro;
