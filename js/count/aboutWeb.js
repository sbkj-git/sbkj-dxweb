var url = src + "/dxVisitInterface.dx";
var appsercet = window.localStorage.getItem("appsercet");
appsercet = JSON.parse(appsercet);
var newAppsercet = appsercet.data;
debugger;
// 网站概括
par = "appsercet=" + newAppsercet + "&method=get.dxWeb.webSurvey";
var data = getSign(url, par);
console.log(data);

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
            $(".btnClick"+num).attr("style","background-color:#FF5456;color:#fff");
        }else {
            $(".btnClick"+i).attr("style","background-color:#fff;color:#000;border: 1px solid #d8d8d8;");
        }
    }
}