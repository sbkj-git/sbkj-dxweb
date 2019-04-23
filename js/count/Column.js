var url = src + "/dxVisitInterface.dx";
var appsercet = window.localStorage.getItem("appsercet");
appsercet = JSON.parse(appsercet);
var newAppsercet = appsercet.data;
;
var par;
//获取页面参数
var htmlTitle = window.localStorage.getItem("title");
var method = window.localStorage.getItem("method");
var title = $("title").get(0);
$(document).attr("title",htmlTitle);
$(".text2").text(htmlTitle);
$(".text3").text(htmlTitle);

if (method === "get.dxWeb.columnStatistics") {
// 栏目统计
    par = "appsercet=" + newAppsercet + "&method=get.dxWeb.columnStatistics&numPerPage=10";
    var data = getSign(url, par);
    console.log(data);
    render(data);
    pageChange("get.dxWeb.columnStatistics",data,"pagination25",url);
    
} else if (method == "get.dxWeb.helpStatistics") {
    // 帮助文档统计
    par = "appsercet=" + newAppsercet + "&method=get.dxWeb.helpStatistics&numPerPage=10";
    var data = getSign(url, par);
    render(data);
    pageChange("get.dxWeb.helpStatistics",data,"pagination25",url);
    console.log(data);
} else if (method == "get.dxWeb.articleSurvey") {
    // 文章统计
    par = "appsercet=" + newAppsercet + "&method=get.dxWeb.articleSurvey&numPerPage=10";
    var data = getSign(url, par);
    render(data);
    pageChange("get.dxWeb.articleSurvey",data,"pagination25",url);
    console.log(data);
}
//初次渲染页面
function render(data){
    if (data.visitList && data.visitList.length > 0) {
        $("cloumnType").html("");
        var str = "";
        $.each(data.visitList, function (i, item) {
            //console.log(item)
            str += "<tr style='border-bottom: 1px solid #cccccc;' data-id='"+item.id+"'>";
            if(item.article_catename == "" || item.article_catename == 'null' || item.article_catename == "undefined"){
                str+="<td></td>"   
            }else{
                str+="<td>"+item.article_catename+"</td>";
            }
            str+="<td>"+item.article_title+"</td><td>"+item.browse+"</td><td>0</td> <td>0</td><td>0</td><td style='color:#48a4ea;'><span >查看</span></td></tr>"
          
        })
        $(".cloumnType").html(str);
    }
}
//分页判断
function pageChange(method,data2,pagination,url2){
    currentPage = localStorage.getItem("pageNow1");
    if(currentPage == "undefined" || currentPage == "" || currentPage == null){
       currentPage = 1;
    }
    var appsercet = window.localStorage.getItem("appsercet");
        appsercet = JSON.parse(appsercet);
        var newAppsercet = appsercet.data;
        var pageCount,pageN;
        if(data2&&data2.totalRows){
            pageCount = Math.ceil(data2.totalRows/10);
        }else{
            pageCount == 0;
        }
        if(data2&&data2.totalRows){
            pageN = data2.totalRows;
        }else{
            pageN == 0;
        }

        if(data2&&data2.totalRows){
           new Page({
                id: pagination,
                pageTotal: pageCount, //必填,总页数
                pageAmount: 10,  //每页多少条
                dataTotal: pageN, //总共多少条数据
                curPage:currentPage, //初始页码,不填默认为1
                pageSize: 5, //分页个数,不填默认为5
                showPageTotalFlag:true, //是否显示数据统计,不填默认不显示
                showSkipInputFlag:true, //是否支持跳转,不填默认不显示
                getPage: function (page) {
                    //获取当前页数
                   console.log(page);
                }
            })
        }else{
            pageN == 0;
        }
        $(document).on("click", ".pageItem", function () {
            
            currentPage = $(this).html();
            localStorage.setItem("pageNow1", currentPage)
            par = "appsercet=" + newAppsercet + "&method="+method+"&currentPage=" + currentPage+"&numPerPage=10";
            var bannerList = getSign(url2, par);
            render(bannerList);
        })
        //上一页
         //  $(".pagePrev").unbind('click').bind("click",function(){
            $(document).on("click", ".pagePrev", function () {
                
                currentPage = localStorage.getItem("pageNow1");
                var num3 = parseInt(currentPage) - 1;
                if(currentPage  > 0 && currentPage  < pageCount){
                    par = "appsercet=" + newAppsercet + "&method="+method+"&currentPage=" + num3+"&numPerPage=10";
                     var bannerList = getSign(url2, par);
                    render(bannerList);
                }else {
                    par = "appsercet=" + newAppsercet + "&method="+method+"&currentPage=1&numPerPage=10";
                    var bannerList = getSign(url2, par);
                   render(bannerList); 
                }
               
                var num = parseInt(currentPage) - 1;
                localStorage.setItem("pageNow1", num);
            })
            //下一页
            // $(".pageNext").unbind('click').bind("click",function(){
                
            $(document).on("click", ".pageNext", function () {
                
                currentPage = localStorage.getItem("pageNow1");
                var num3 = parseInt(currentPage) + 1;
                if(currentPage  > 0 && currentPage  < pageCount){
                    par = "appsercet=" + newAppsercet + "&method="+method+"&currentPage=" + num3+"&numPerPage=10";
                     var bannerList = getSign(url2, par);
                    render(bannerList);
                }else {
                    par = "appsercet=" + newAppsercet + "&method="+method+"&currentPage="+pageCount+"&numPerPage=10";
                    var bannerList = getSign(url2, par);
                   render(bannerList); 
                }
               
                var num = parseInt(currentPage)+1;
                localStorage.setItem("pageNow1", num);
            })
            
        var re = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/ 
        var ret = document.querySelector(".returnPage");
        $(document).on("blur", ".returnPage", function () {
       
            var value = $(this).val();
    
            if (!re.test(value)) {
              
            }else if(value > 0 && value <=pageCount){
                currentPage = value;
                par = "appsercet=" + newAppsercet + "&method="+method+"&currentPage=" + currentPage+"&numPerPage=10";
    
                var data3 = getSign(url2, par);
                render(data3);
                pageCount = Math.ceil(data3.totalRows/10);
                pageN = Math.ceil(data3.totalRows);
                
                $(this).val("");
                
                new Page({
                    id: pagination,
                    pageTotal: pageCount, //必填,总页数
                    pageAmount: 10,  //每页多少条
                    dataTotal: pageN, //总共多少条数据
                    curPage:currentPage, //初始页码,不填默认为1
                    pageSize: 5, //分页个数,不填默认为5
                    showPageTotalFlag:true, //是否显示数据统计,不填默认不显示
                    showSkipInputFlag:true, //是否支持跳转,不填默认不显示
                    getPage: function (page) {
                        //获取当前页数
                       console.log(page);
                    }
                })
            }else{
                par = "appsercet=" + newAppsercet + "&method="+method+"&currentPage=" + pageCount+"&numPerPage=10";
    
                var data3 = getSign(url2, par);
                render(data3);
                pageCount = Math.ceil(data3.totalRows/10);
                pageN = Math.ceil(data3.totalRows);
                
                $(this).val("");
                
                new Page({
                    id: pagination,
                    pageTotal: pageCount, //必填,总页数
                    pageAmount: 10,  //每页多少条
                    dataTotal: pageN, //总共多少条数据
                    curPage:pageCount, //初始页码,不填默认为1
                    pageSize: 5, //分页个数,不填默认为5
                    showPageTotalFlag:true, //是否显示数据统计,不填默认不显示
                    showSkipInputFlag:true, //是否支持跳转,不填默认不显示
                    getPage: function (page) {
                        //获取当前页数
                       console.log(page);
                    }
                })
            }	
            
        })
        $(document).on("keydown", ".returnPage", function (event) {
        // $('.returnPage').keydown(function(event) {
            if (event.keyCode == 13) {
                var value = $(".returnPage").val();
    
            if (!re.test(value)) {
               
            } else if(value > 0 && value <=pageCount){
                currentPage = value;
                par = "appsercet=" + newAppsercet + "&method="+method+"&currentPage=" + currentPage+"&numPerPage=10";
    
                var data3 = getSign(url2, par);
                render(data3);
                pageCount = Math.ceil(data3.totalRows/10);
                pageN = Math.ceil(data3.totalRows);
                
                $(this).val("");
                
                new Page({
                    id: pagination,
                    pageTotal: pageCount, //必填,总页数
                    pageAmount: 10,  //每页多少条
                    dataTotal: pageN, //总共多少条数据
                    curPage:currentPage, //初始页码,不填默认为1
                    pageSize: 5, //分页个数,不填默认为5
                    showPageTotalFlag:true, //是否显示数据统计,不填默认不显示
                    showSkipInputFlag:true, //是否支持跳转,不填默认不显示
                    getPage: function (page) {
                        //获取当前页数
                       console.log(page);
                    }
                })
            }else{
                par = "appsercet=" + newAppsercet + "&method="+method+"&currentPage=" + pageCount+"&numPerPage=10";
    
                var data3 = getSign(url2, par);
                render(data3);
                pageCount = Math.ceil(data3.totalRows/10);
                pageN = Math.ceil(data3.totalRows);
                
                $(this).val("");
                
                new Page({
                    id: pagination,
                    pageTotal: pageCount, //必填,总页数
                    pageAmount: 10,  //每页多少条
                    dataTotal: pageN, //总共多少条数据
                    curPage:pageCount, //初始页码,不填默认为1
                    pageSize: 5, //分页个数,不填默认为5
                    showPageTotalFlag:true, //是否显示数据统计,不填默认不显示
                    showSkipInputFlag:true, //是否支持跳转,不填默认不显示
                    getPage: function (page) {
                        //获取当前页数
                       console.log(page);
                    }
                })
            }	
            }
        });
    
       
       
}
//引入该页面需要echarts图标

$(document).ready(function () {
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
    }, function(start, end, label) {
        var starttime = start.format('YYYY-MM-DD HH:mm:ss');
        var endTime = end.format('YYYY-MM-DD HH:mm:ss');
        var url = src + "/dxVisitInterface.dx";
        var appsercet = window.localStorage.getItem("appsercet");
        appsercet = JSON.parse(appsercet);
        newAppsercet = appsercet.data;
        // par = "appsercet=" + newAppsercet + "&method=get.dxWeb.bannerList&starttime=" + starttime + "&erdtime=" + endTime;
        getParToReplace("&starttime=",starttime);
        getParToReplace("&erdtime=",endTime);
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

    updateConfig();

    function updateConfig() {
        var options = {};
        if ($('#ranges').is(':checked')) {
            option.ranges = {
                '今日': [moment(), moment()],
                '昨日': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                '最近7日': [moment().subtract(6, 'days'), moment()],
                '最近30日': [moment().subtract(29, 'days'), moment()],
                '本月': [moment().startOf('month'), moment().endOf('month')],
                '上月': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            }
            // startDate: moment().subtract(29, 'days'),
            // endDate: moment()
        }
        $('#demo').click(function () {
            $(".daterangepicker").show();
        })
        $('#config-demo1').daterangepicker(options, function (start, end, label) {

            $('#config-demo1').val(start.format('YYYY-MM-DD') + "~" + end.format('YYYY-MM-DD'))
        }).click();
    }
});


function changeState(el) {
    if (el.readOnly) el.checked = el.readOnly = false;
    else if (!el.checked) el.readOnly = el.indeterminate = true;
}



var myChart = echarts.init(document.getElementById('main4'));
var colors = ['#48a4ea'];
option = {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value',
       
    },
   
    series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        lineStyle: {
            color: colors[0]
        },
        // 折线颜色
        itemStyle: {
            normal: {
                color: '#33CCFF',
                lineStyle: {
                    color: '#33CCFF'
                }
            }
        }
    }]
};
myChart.setOption(option);



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
            $(".btnClick"+num).attr("style","background-color:#48a4ea;color:#fff");
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
