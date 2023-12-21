"use strict";
var base = require("base/product/detail");

base.sizeChart = function () {
    $(".size-chart-link").on("click", function (e) {
        e.preventDefault();
        var url = $(this).attr("href");
        var $prodSizeChart = $("#sizeChartModal .size-chart");

        if ($prodSizeChart.is(":empty")) {
            $.ajax({
                url: url,
                type: "get",
                dataType: "json",
                success: function (data) {
                    $prodSizeChart.append(data.content);
                },
            });
        }
    });
};

module.exports = base;
