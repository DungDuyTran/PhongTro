"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var navigation_1 = require("next/navigation");
var axios_1 = require("axios");
var swr_1 = require("swr");
var recharts_1 = require("recharts");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
// Nhóm dữ liệu theo tên phòng
var groupByTenPhong = function (data) {
    var map = {};
    data.forEach(function (item) {
        if (!map[item.tenPhong]) {
            map[item.tenPhong] = item.giaPhong;
        }
        else {
            map[item.tenPhong] += item.giaPhong;
        }
    });
    return Object.entries(map).map(function (_a) {
        var tenPhong = _a[0], giaPhong = _a[1];
        return ({
            tenPhong: tenPhong,
            giaPhong: giaPhong
        });
    });
};
// Hàm fetch dữ liệu dùng cho SWR
var fetcher = function (url) { return axios_1["default"].get(url).then(function (res) { return res.data.data; }); };
// Component chính
var PhongChart = function () {
    //  Gọi tất cả hooks ở đầu component
    var router = navigation_1.useRouter();
    var _a = swr_1["default"]("http://localhost:3000/api/phongtro?page=1&limit=1000", fetcher), data = _a.data, error = _a.error;
    // Xử lý trạng thái loading và error
    if (error)
        return react_1["default"].createElement("div", { className: "text-red-500" }, "L\u1ED7i khi t\u1EA3i d\u1EEF li\u1EC7u");
    if (!data)
        return react_1["default"].createElement("div", { className: "text-white" }, "\u0110ang t\u1EA3i d\u1EEF li\u1EC7u...");
    // Chuẩn bị dữ liệu cho biểu đồ
    var chartData = groupByTenPhong(data);
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement(card_1.Card, { className: "bg-[#1D2636] text-white" },
            react_1["default"].createElement(card_1.CardHeader, null,
                react_1["default"].createElement(card_1.CardTitle, { className: "flex justify-center items-center text-3xl" }, "Bi\u1EC3u \u0111\u1ED3 gi\u00E1 ph\u00F2ng theo t\u00EAn ph\u00F2ng")),
            react_1["default"].createElement(card_1.CardContent, null,
                react_1["default"].createElement(recharts_1.ResponsiveContainer, { width: "100%", height: 300, className: "ml-0" },
                    react_1["default"].createElement(recharts_1.BarChart, { data: chartData },
                        react_1["default"].createElement(recharts_1.CartesianGrid, { strokeDasharray: "3 3" }),
                        react_1["default"].createElement(recharts_1.YAxis, { tick: { fill: "white" }, ticks: [
                                0, 500000, 1000000, 1500000, 2000000, 2500000, 3000000,
                                3500000,
                            ] }),
                        react_1["default"].createElement(recharts_1.XAxis, { dataKey: "tenPhong", tick: { fill: "white" } }),
                        react_1["default"].createElement(recharts_1.Tooltip, null),
                        react_1["default"].createElement(recharts_1.Bar, { dataKey: "giaPhong", fill: "#4ade80", radius: [4, 4, 0, 0] }))))),
        react_1["default"].createElement(button_1.Button, { type: "button", variant: "outline", onClick: function () { return router.push("/dashboard/phongtro"); }, className: "bg-green-700 hover:bg-green-600 text-white mt-2" }, "Quay l\u1EA1i")));
};
exports["default"] = PhongChart;
