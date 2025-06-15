"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var axios_1 = require("axios");
var swr_1 = require("swr");
var navigation_1 = require("next/navigation");
var recharts_1 = require("recharts");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
// Hàm đếm số lượng phòng theo tình trạng
var groupByTinhTrang = function (data) {
    var countMap = {};
    data.forEach(function (item) {
        var _a;
        var tinhTrang = ((_a = item.tinhTrangPhong) === null || _a === void 0 ? void 0 : _a.tinhTrang) || "Không rõ";
        countMap[tinhTrang] = (countMap[tinhTrang] || 0) + 1;
    });
    return Object.entries(countMap).map(function (_a) {
        var name = _a[0], value = _a[1];
        return ({ name: name, value: value });
    });
};
var COLORS = ["#60a5fa", "#34d399", "#fbbf24", "#f87171", "#c084fc"];
var fetcher = function (url) {
    return axios_1["default"].get(url).then(function (res) { return res.data.phongtro_tinhtrangphong; });
};
var TinhTrangPhongChart = function () {
    var router = navigation_1.useRouter();
    var _a = swr_1["default"]("http://localhost:3000/api/phongtro_tinhtrangphong?page=1&limit=1000", fetcher), data = _a.data, error = _a.error;
    if (error)
        return react_1["default"].createElement("div", { className: "text-red-500" }, "L\u1ED7i khi t\u1EA3i d\u1EEF li\u1EC7u.");
    if (!data)
        return react_1["default"].createElement("div", { className: "text-white" }, "\u0110ang t\u1EA3i d\u1EEF li\u1EC7u...");
    if (!Array.isArray(data)) {
        return react_1["default"].createElement("div", { className: "text-red-500" }, "D\u1EEF li\u1EC7u tr\u1EA3 v\u1EC1 kh\u00F4ng h\u1EE3p l\u1EC7.");
    }
    var chartData = groupByTinhTrang(data);
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("div", null,
            react_1["default"].createElement(card_1.Card, { className: "bg-[#1D2636] text-white" },
                react_1["default"].createElement(card_1.CardHeader, null,
                    react_1["default"].createElement(card_1.CardTitle, { className: "flex justify-center text-3xl" }, "Bi\u1EC3u \u0111\u1ED3 t\u00ECnh tr\u1EA1ng ph\u00F2ng theo s\u1ED1 ph\u00F2ng")),
                react_1["default"].createElement(card_1.CardContent, { className: "flex justify-center" },
                    react_1["default"].createElement(recharts_1.ResponsiveContainer, { width: "100%", height: 300 },
                        react_1["default"].createElement(recharts_1.PieChart, null,
                            react_1["default"].createElement(recharts_1.Pie, { data: chartData, dataKey: "value", nameKey: "name", cx: "50%", cy: "50%", outerRadius: 100, label: true }, chartData.map(function (_, index) { return (react_1["default"].createElement(recharts_1.Cell, { key: "cell-" + index, fill: COLORS[index % COLORS.length] })); })),
                            react_1["default"].createElement(recharts_1.Tooltip, null))),
                    react_1["default"].createElement("div", { className: " flex flex-col items-start gap-2 mr-[300px] mt-[70px]" }, chartData.map(function (entry, index) { return (react_1["default"].createElement("div", { key: index, className: "flex items-center gap-2 whitespace-nowrap" },
                        react_1["default"].createElement("div", { className: "w-4 h-4 rounded-sm", style: { backgroundColor: COLORS[index % COLORS.length] } }),
                        react_1["default"].createElement("span", { className: "text-white" }, entry.name))); }))))),
        react_1["default"].createElement(button_1.Button, { type: "button", variant: "outline", onClick: function () { return router.push("/dashboard/phongtro"); }, className: "bg-green-700 hover:bg-green-600 text-white mt-2" }, "Quay l\u1EA1i")));
};
exports["default"] = TinhTrangPhongChart;
