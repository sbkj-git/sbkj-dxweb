//获取页面参数
var htmlTitle = window.localStorage.getItem("title");
var title = $("title").get(0);
$(document).attr("title",htmlTitle);
$(".text2").text(htmlTitle);
$(".text3").text(htmlTitle);

var url = src + "/dxVisitInterface.dx";
var appsercet = window.localStorage.getItem("appsercet");
appsercet = JSON.parse(appsercet);
var newAppsercet = appsercet.data;
debugger;


var par = null;

if (htmlTitle == "栏目统计") {
// 栏目统计
    par = "appsercet=" + newAppsercet + "&method=get.dxWeb.columnStatistics";
} else if (htmlTitle == "帮助文档统计") {
    // 帮助文档统计
    par = "appsercet=" + newAppsercet + "&method=get.dxWeb.helpStatistics";
} else if (htmlTitle == "文章统计") {
    // 文章统计
    par = "appsercet=" + newAppsercet + "&method=get.dxWeb.articleSurvey";
}

var data = getSign(url, par);
console.log(data);

// 分页
function pageColumnStatistics(currentPage) {
    // 如果存在替换,不存在拼接
    getParToReplace("&currentPage=",currentPage);
    var data = getSign(url, par);
    console.log(data);
}

// 查看某一篇文章pv
function queryTextById(id){
    // 如果存在替换,不存在拼接
    getParToReplace("&id=",id);
    var data = getSign(url, par);
    console.log(data);
}

// 条件查询
// 今天
$(".btnClick1").click(function () {
    updateButColor(1);
    // 如果存在替换,不存在拼接
    getParToReplace("&type=1&fasttime=",formatDate(new Date(), "yyyy-MM-dd HH:mm:ss"));
    var data = getSign(url, par);
    console.log(data);
});
// 昨天
$(".btnClick2").click(function () {
    updateButColor(2);
    // 如果存在替换,不存在拼接
    getParToReplace("&type=1&fasttime=",formatDate(new Date(new Date().getTime() - 24 * 60 * 60 * 1000), "yyyy-MM-dd HH:mm:ss"));
    var data = getSign(url, par);
    console.log(data);
});
// 最近七日
$(".btnClick3").click(function () {
    updateButColor(3);
    // 如果存在替换,不存在拼接
    getParToReplace("&type=1&fasttime=",formatDate(new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000), "yyyy-MM-dd HH:mm:ss"));
    var data = getSign(url, par);
    console.log(data);
});
// 最近三十日
$(".btnClick4").click(function () {
    updateButColor(4);
    // 如果存在替换,不存在拼接
    getParToReplace("&type=1&fasttime=",formatDate(new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000), "yyyy-MM-dd HH:mm:ss"));
    var data = getSign(url, par);
    console.log(data);
});

$("#startAndEnd").change(function () {
    updateButColor(null);
    // par += "&type=2&starttime=" + $("#startAndEnd").val();
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

function getParToReplace(name,value) {
     if(par.indexOf(name)!=-1){
         // 获取 &type=1&fasttime= 的起始索引
         var startIndex = par.indexOf(name);
         // 获取后一个参数的索引
         var endIndex = par.indexOf("&",startIndex+name.length);
         if(endIndex==-1){  // 说明后面没有参数
             endIndex = par.length;
         }
         par = par.replace(par.substring(startIndex+name.length+1,endIndex),value)  // &type=1&fasttime=2019-04-15 04:37:39 需要从等于号后替换
     }else{
         par+=name+value;
     }
}












//  http://47.105.116.237:8001/dongxin-network-admin/api/dxVisitInterface.dx?appsercet=3789DF5761C85923228CF922C941B14C48B8955CCF728FBFC498ACE34986FCEBC1D6F2A5083471F9ED2644A2C969AA66E14E3181E060B6F42D68CE10F79981C8A64FF609F01B1E1B&method=get.dxWeb.webSurvey&sign=0123344556778899BBBCCCCDEEFFFFFF&appid=dxwebf0a37ed1ae96deef