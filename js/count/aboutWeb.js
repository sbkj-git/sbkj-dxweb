var url = src + "/dxVisitInterface.dx";
var appsercet = window.localStorage.getItem("appsercet");
appsercet = JSON.parse(appsercet);
var newAppsercet = appsercet.data;
;
// 网站概括
par = "appsercet=" + newAppsercet + "&method=get.dxWeb.webSurvey";
var data = getSign(url, par);
console.log(data);

//引入该页面需要echarts表

    function changeState(el) {
        if (el.readOnly) el.checked = el.readOnly = false;
        else if (!el.checked) el.readOnly = el.indeterminate = true;
    }


    // 开始时间和结束时间日历插件
    $('#startAndEnd').daterangepicker({
        "showWeekNumbers": true,
        "showISOWeekNumbers": true,
        "timePicker": true,
        "timePickerSeconds": true,
        "locale": {
            "direction": "ltr",
            "format": "YYYY-MM-DD HH:mm:ss",
            "separator": " ~ ",
            "applyLabel": "确定",
            "cancelLabel": "取消",
            "fromLabel": "From",
            "toLabel": "To",
            "customRangeLabel": "Custom",
            "daysOfWeek": [
                "日",
                "一",
                "二",
                "三",
                "四",
                "五",
                "六"
            ],
            "monthNames": [
                "一月",
                "二月",
                "三月",
                "四月",
                "五月",
                "六月",
                "七月",
                "八月",
                "九月",
                "十月",
                "十一月",
                "十二月"
            ],
            "firstDay": 1
        },
// "startDate": "04-11-2019",
// "endDate": "04-11-2019"
    }, function (start, end, label) {
        var starttime = start.format('YYYY-MM-DD HH:mm:ss');
        var endTime = end.format('YYYY-MM-DD HH:mm:ss');
        var url = src + "/bannerGetInterface.dx";
        var appsercet = window.localStorage.getItem("appsercet");
        appsercet = JSON.parse(appsercet);
        newAppsercet = appsercet.data;
        par = "appsercet=" + newAppsercet + "&method=get.dxWeb.webSurvey&starttime=" + starttime + "&erdtime=" + endTime;
        var bannerList = getSign(url, par);
        if (bannerList.msg && bannerList.msg.code == "10") {
            $(".bannerList").html("");
            $("#startAndEnd").val("");
        } else {
            bannerList1(bannerList);
            firstRender();
            $("#startAndEnd").val("");
        }
        console.log(start.format('YYYY-MM-DD '));
        console.log(end.format('YYYY-MM-DD '));
// console.log("New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')");
    });



    // 获取data数据中的时间
    function getDate(data) {
        var dates = new Array();
        var pvs = new Array();
        var uvs = new Array();
        var ips = new Array();
        var result = new Array();
        var pvList = data.pvList;
        for (var i = 0; i < pvList.length; i++) {
            dates.push(pvList[i].datetime);
            pvs.push(pvList[i].pv);
            uvs.push(pvList[i].uv);
            ips.push(pvList[i].ip);
        }
        result.push(dates, pvs, uvs, ips);

        return result;
    }

    $(".visitPV").text(data.msg.pv);
    $(".visitUV").text(data.msg.uv);
    $(".visitIP").text(data.msg.ip);
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));
    // 指定图表的配置项和数据
    // app.title = '多 X 轴示例';
    var colors = ['#48a4ea', '#985AFF', '#FFB449','#333333'];
    option = {
        color: colors,

        tooltip: {
            trigger: 'none',
            axisPointer: {
                type: 'cross'
            }
        },
        legend: {
            data: ['PV', 'UV', 'IP']
        },
        grid: {
            top: 70,
            bottom: 50
        },
        xAxis: [
            {
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: colors[3]
                    }
                },
                axisPointer: {
                    label: {
                        formatter: function (params) {
                            return 'UV' + params.value
                                + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                        }
                    }
                },
                data: getDate(data)[0]
            },
            {
                type: 'category',
                axisTick:
                    {
                        alignWithLabel: true
                    }
                ,
                axisLine: {
                    onZero: false,
                    lineStyle:
                        {
                            color: colors[3]
                        }
                }
                ,
                axisPointer: {
                    label: {
                        formatter: function (params) {
                            return 'PV' + params.value
                                + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                        }
                    }
                }
                ,
                data: getDate(data)[0]
            }
            ,
            {
                type: 'category',
                axisTick:
                    {
                        alignWithLabel: true
                    }
                ,
                axisLine: {
                    onZero: false,
                    lineStyle:
                        {
                            color: colors[3]
                        }
                }
                ,
                axisPointer: {
                    label: {
                        formatter: function (params) {
                            return 'IP' + params.value
                                + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                        }
                    }
                }
                ,
                data: getDate(data)[0]
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series:
            [
                {
                    name: 'PV',
                    type: 'line',
                    xAxisIndex: 1,
                    smooth: true,
                    data: getDate(data)[1]
                },
                {
                    name: 'UV',
                    type: 'line',
                    smooth: true,
                    data: getDate(data)[2]
                },
                {
                    name: 'IP',
                    type: 'line',
                    smooth: true,
                    data: getDate(data)[3]
                }
            ]
    }
    ;
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);



    option = {
        title: {
            text: '2011全国GDP（亿元）',
            subtext: '数据来自国家统计局'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            x: 'right',
            selectedMode: false,
            data: ['北京', '上海', '广东']
        },
        dataRange: {
            orient: 'horizontal',
            min: 0,
            max: 55000,
            text: ['高', '低'],           // 文本，默认为数值文本
            splitNumber: 0
        },
        toolbox: {
            show: true,
            orient: 'vertical',
            x: 'right',
            y: 'center',
            feature: {
                mark: {show: true},
                dataView: {show: true, readOnly: false}
            }
        },
        series: [
            {
                name: '2011全国GDP分布',
                type: 'map',
                mapType: 'china',
                mapLocation: {
                    x: 'left'
                },
                selectedMode: 'multiple',
                itemStyle: {
                    normal: {label: {show: true}},
                    emphasis: {label: {show: true}}
                },
                data: [
                    {name: '西藏', value: 605.83},
                    {name: '青海', value: 1670.44},
                    {name: '宁夏', value: 2102.21},
                    {name: '海南', value: 2522.66},
                    {name: '甘肃', value: 5020.37},
                    {name: '贵州', value: 5701.84},
                    {name: '新疆', value: 6610.05},
                    {name: '云南', value: 8893.12},
                    {name: '重庆', value: 10011.37},
                    {name: '吉林', value: 10568.83},
                    {name: '山西', value: 11237.55},
                    {name: '天津', value: 11307.28},
                    {name: '江西', value: 11702.82},
                    {name: '广西', value: 11720.87},
                    {name: '陕西', value: 12512.3},
                    {name: '黑龙江', value: 12582},
                    {name: '内蒙古', value: 14359.88},
                    {name: '安徽', value: 15300.65},
                    {name: '北京', value: 16251.93, selected: true},
                    {name: '福建', value: 17560.18},
                    {name: '上海', value: 19195.69, selected: true},
                    {name: '湖北', value: 19632.26},
                    {name: '湖南', value: 19669.56},
                    {name: '四川', value: 21026.68},
                    {name: '辽宁', value: 22226.7},
                    {name: '河北', value: 24515.76},
                    {name: '河南', value: 26931.03},
                    {name: '浙江', value: 32318.85},
                    {name: '山东', value: 45361.85},
                    {name: '江苏', value: 49110.27},
                    {name: '广东', value: 53210.28, selected: true}
                ]
            },
            {
                name: '2011全国GDP对比',
                type: 'pie',
                roseType: 'area',
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                center: [document.getElementById('main1').offsetWidth - 250, 225],
                radius: [30, 120],
                data: [
                    {name: '北京', value: 16251.93},
                    {name: '上海', value: 19195.69},
                    {name: '广东', value: 53210.28}
                ]
            }
        ],
        animation: false
    };
    var ecConfig = require('echarts/config');
    myChart.on(ecConfig.EVENT.MAP_SELECTED, function (param) {
        var selected = param.selected;
        var mapSeries = option.series[0];
        var data = [];
        var legendData = [];
        var name;
        for (var p = 0, len = mapSeries.data.length; p < len; p++) {
            name = mapSeries.data[p].name;
            //mapSeries.data[p].selected = selected[name];
            if (selected[name]) {
                data.push({
                    name: name,
                    value: mapSeries.data[p].value
                });
                legendData.push(name);
            }
        }
        option.legend.data = legendData;
        option.series[1].data = data;
        myChart.setOption(option, true);
    });



// 快速查看
// 今天
$(".btnClick1").click(function () {
    updateButColor(1);
    par = "appsercet=" + newAppsercet + "&method=get.dxWeb.webSurvey&type=1&fasttime=" +
        formatDate(new Date(), "yyyy-MM-dd HH:mm:ss");
    var data = getSign(url, par);
    console.log(data);
});
// 昨天
$(".btnClick2").click(function () {
    updateButColor(2);
    par = "appsercet=" + newAppsercet + "&method=get.dxWeb.webSurvey&type=1&fasttime=" +
        formatDate(new Date(new Date().getTime() - 24 * 60 * 60 * 1000), "yyyy-MM-dd HH:mm:ss");
    var data = getSign(url, par);
    console.log(data);
});
// 最近七日
$(".btnClick3").click(function () {
    updateButColor(3);
    par = "appsercet=" + newAppsercet + "&method=get.dxWeb.webSurvey&type=1&fasttime=" +
        formatDate(new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000), "yyyy-MM-dd HH:mm:ss");
    var data = getSign(url, par);
    console.log(data);
});
// 最近三十日
$(".btnClick4").click(function () {
    updateButColor(4);
    par = "appsercet=" + newAppsercet + "&method=get.dxWeb.webSurvey&type=1&fasttime=" +
        formatDate(new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000), "yyyy-MM-dd HH:mm:ss");
    var data = getSign(url, par);
    console.log(data);
});

$("#startAndEnd").change(function () {
    updateButColor(null);
    // par = "appsercet=" + newAppsercet + "&method=get.dxWeb.webSurvey&type=2&starttime=" + $("#startAndEnd").val();
    // par 在加载日历插件的地方已经生成
    var data = getSign(url, par);
    console.log(data);
});



//格式化日期,
function formatDate(date, fmt) { //author: meizz
    var o = {
        "M+": date.getMonth() + 1,                 //月份
        "d+": date.getDate(),                    //日
        "H+": date.getHours(),                   //小时
        "m+": date.getMinutes(),                 //分
        "s+": date.getSeconds(),                 //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


function updateButColor(num) {
    for(var i=1;i<=4;i++){
        if(i==num){
            $(".btnClick"+num).attr("style","background-color:#48a4ea;color:#fff");
        }else {
            $(".btnClick"+i).attr("style","background-color:#fff;color:#000;border: 1px solid #d8d8d8;");
        }
    }
}