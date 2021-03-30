(function ($) {
    "use strict";

    /*  Sales Chart
    --------------------*/

    var sales = {
        type: 'line',
        data: {
            labels: ["2014", "2015", "2016", "2017", "2018", "2019", "2020"],
            type: 'line',
            defaultFontFamily: 'Montserrat',
            datasets: [{
                label: "River Oaks",
                data: [0, 42, 23, 14, 25, 15, 140],
                backgroundColor: 'transparent',
                borderColor: '#e6a1f2',
                borderWidth: 3,
                pointStyle: 'circle',
                pointRadius: 5,
                pointBorderColor: 'transparent',
                pointBackgroundColor: '#e6a1f2',

            }, {
                label: "Katy",
                data: [0, 30, 10, 60, 80, 63, 10],
                backgroundColor: 'transparent',
                borderColor: '#ed7f7e',
                borderWidth: 3,
                pointStyle: 'circle',
                pointRadius: 5,
                pointBorderColor: 'transparent',
                pointBackgroundColor: '#ed7f7e',
            }, {
                label: "Sugarland",
                data: [0, 50, 40, 20, 40, 79, 20],
                backgroundColor: 'transparent',
                borderColor: '#87de75',
                borderWidth: 3,
                pointStyle: 'circle',
                pointRadius: 5,
                pointBorderColor: 'transparent',
                pointBackgroundColor: '#87de75',
            }]
        },
        options: {
            responsive: true,

            tooltips: {
                mode: 'index',
                titleFontSize: 12,
                titleFontColor: '#000',
                bodyFontColor: '#000',
                backgroundColor: '#fff',
                titleFontFamily: 'Montserrat',
                bodyFontFamily: 'Montserrat',
                cornerRadius: 3,
                intersect: false,
            },
            legend: {
                labels: {
                    usePointStyle: true,
                    fontFamily: 'Montserrat',
                },
            },
            scales: {
                xAxes: [{
                    display: true,
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    scaleLabel: {
                        display: false,
                        labelString: 'Month'
                    }
                }],
                yAxes: [{
                    display: true,
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Value'
                    }
                }]
            },
            title: {
                display: false,
                text: 'Normal Legend'
            }
        }
    };


    var team = {
        type: 'line',
        data: {
            labels: ["2014", "2015", "2016", "2017", "2018", "2019", "2020"],
            type: 'line',
            defaultFontFamily: 'Montserrat',
            datasets: [{
                label: "Tasks Completed",
                data: [0, 25, 10, 3, 20, 5, 30],
                backgroundColor: 'rgba(255,163,161,.5)',
                borderColor: 'rgba(237,127,126,.5)',
                borderWidth: 0.5,
                pointStyle: 'circle',
                pointRadius: 5,
                pointBorderColor: 'transparent',
                pointBackgroundColor: 'rgba(255,163,161,1)',
            }, {
                label: "Tasks Expired",
                data: [0, 7, 3, 12, 6, 27, 0],
                backgroundColor: 'rgba(135,222,117,.5)',
                borderColor: 'rgba(135,222,117,.5)',
                borderWidth: 0.5,
                pointStyle: 'circle',
                pointRadius: 5,
                pointBorderColor: 'transparent',
                pointBackgroundColor: 'rgba(135,222,117,1)',
            }
                , {
                label: "Tasks Pending",
                data: [0, 15, 23, 8, 4, 14, 17],
                backgroundColor: 'rgba(95,180,250,.5)',
                borderColor: 'rgba(135,222,117,.5)',
                borderWidth: 0.5,
                pointStyle: 'circle',
                pointRadius: 5,
                pointBorderColor: 'transparent',
                pointBackgroundColor: 'rgba(95,180,250,1)',
            }]
        },
        options: {
            responsive: true,
            tooltips: {
                mode: 'index',
                titleFontSize: 12,
                titleFontColor: '#000',
                bodyFontColor: '#000',
                backgroundColor: '#fff',
                titleFontFamily: 'Montserrat',
                bodyFontFamily: 'Montserrat',
                cornerRadius: 3,
                intersect: false,
            },
            legend: {
                position: 'top',
                labels: {
                    usePointStyle: true,
                    fontFamily: 'Montserrat',
                },


            },
            scales: {
                xAxes: [{
                    display: true,
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    scaleLabel: {
                        display: false,
                        labelString: 'Month'
                    }
                }],
                yAxes: [{
                    display: true,
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Value'
                    }
                }]
            },
            title: {
                display: false,
            }
        }
    };

    window.onload = function () {
        var ctx = document.getElementById("sales-chart").getContext("2d");
        window.myLine = new Chart(ctx, sales);

        var ctx = document.getElementById("team-chart").getContext("2d");
        window.myLine = new Chart(ctx, team);



        var ctx = document.getElementById("radarChart").getContext("2d");
        window.myLine = new Chart(ctx, radarChart);

        var ctx = document.getElementById("lineChart").getContext("2d");
        window.myLine = new Chart(ctx, lineChart)

    };

})(jQuery);









(function ($) {
    "use strict";








})(jQuery);