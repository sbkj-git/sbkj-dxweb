/*
暂时没有使用  分页点击跳转操作
function pageChange(method,data2,pagination){
    var appsercet = window.localStorage.getItem("appsercet");
        appsercet = JSON.parse(appsercet);
        var newAppsercet = appsercet.data;
    var pageCount = Math.ceil(data2.pageInfo.totalRows/10);
             new Page({
                 id: pagination,
                 pageTotal: pageCount, //必填,总页数
                 pageAmount: 10,  //每页多少条
                 dataTotal: data2.pageInfo.totalRows, //总共多少条数据
                 curPage:1, //初始页码,不填默认为1
                 pageSize: 5, //分页个数,不填默认为5
                 showPageTotalFlag:true, //是否显示数据统计,不填默认不显示
                 showSkipInputFlag:true, //是否支持跳转,不填默认不显示
                 getPage: function (page) {
                     //获取当前页数
                    console.log(page);
                 }
             })
        //初次加载页面数据
       
        $(document).on("click", ".pageItem", function () {
            debugger
            currentPage = $(this).html();
            localStorage.setItem("pageNow1", currentPage)
            par = "appsercet=" + newAppsercet + "&method="+method+"&currentPage=" + currentPage;
            var bannerList = getSign(url, par);
            render(bannerList);
        })
        var re = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/ 
        var ret = document.querySelector(".returnPage");
        $(".returnPage").blur(function () {
            debugger
            var value = $(this).val();
            if (!re.test(value)) {
                alert("请输入数字");

                return false;
            } else {
                currentPage = value;
                par = "appsercet=" + newAppsercet + "&method="+method+"&currentPage=" + currentPage;

                var data2 = getSign(url, par);
                render(data2);
                $(this).val("");
            }
        })
}
   */       
           
   