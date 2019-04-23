function changeState(el) {
   
    if (el.readOnly) el.checked=el.readOnly=false;
    else if (!el.checked) el.readOnly=el.indeterminate=true;
}
$(document).ready(function(){
    var url,par,url2,currentPage,that;

    var appsercet = window.localStorage.getItem("appsercet");
    appsercet = JSON.parse(appsercet);
    var newAppsercet = appsercet.data;
    //console.log(appsercet)
    //初始渲染页面
     currentPage = localStorage.getItem("pageNow1");
     if(currentPage == "undefined" || currentPage == "" || currentPage == null){
        par = "appsercet="+newAppsercet+"&method=get.dxWeb.logList&currentPage=1";
     }else{
        par = "appsercet="+newAppsercet+"&method=get.dxWeb.logList&currentPage="+currentPage
     }
    url =  src+"/adminInterface.dx";
    url2 = src+"/logInterface.dx";
   
    var data = getSign(url2,par);
    render(data);
    pageChange("get.dxWeb.logList",data,"pagination21",url2);
    function pageChange(method,data2,pagination,url2){
        currentPage = localStorage.getItem("pageNow1");
        if(currentPage == "undefined" || currentPage == "" || currentPage == null){
           currentPage = 1;
        }
        var appsercet = window.localStorage.getItem("appsercet");
            appsercet = JSON.parse(appsercet);
            var newAppsercet = appsercet.data;
            var pageCount,pageN;
            if(data2.pageInfo&&data2.pageInfo.totalRows){
                pageCount = Math.ceil(data2.pageInfo.totalRows/10);
            }else{
                pageCount == 0;
            }
            if(data2.pageInfo&&data2.pageInfo.totalRows){
                pageN = data2.pageInfo.totalRows;
            }else{
                pageN == 0;
            }

            if(data2.pageInfo&&data2.pageInfo.totalRows){
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
                par = "appsercet=" + newAppsercet + "&method="+method+"&currentPage=" + currentPage;
                var bannerList = getSign(url2, par);
                render(bannerList);
            })
            //上一页
             //  $(".pagePrev").unbind('click').bind("click",function(){
                $(document).on("click", ".pagePrev", function () {
                    
                    currentPage = localStorage.getItem("pageNow1");
                    var num3 = parseInt(currentPage) - 1;
                    if(currentPage  > 0 && currentPage  < pageCount){
                        par = "appsercet=" + newAppsercet + "&method="+method+"&currentPage=" + num3;
                         var bannerList = getSign(url2, par);
                        render(bannerList);
                    }else {
                        par = "appsercet=" + newAppsercet + "&method="+method+"&currentPage=1";
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
                        par = "appsercet=" + newAppsercet + "&method="+method+"&currentPage=" + num3;
                         var bannerList = getSign(url2, par);
                        render(bannerList);
                    }else {
                        par = "appsercet=" + newAppsercet + "&method="+method+"&currentPage="+pageCount;
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
                    par = "appsercet=" + newAppsercet + "&method="+method+"&currentPage=" + currentPage;
        
                    var data3 = getSign(url2, par);
                    render(data3);
                    pageCount = Math.ceil(data3.pageInfo.totalRows/10);
                    pageN = Math.ceil(data3.pageInfo.totalRows);
                    
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
                    par = "appsercet=" + newAppsercet + "&method="+method+"&currentPage=" + pageCount;
        
                    var data3 = getSign(url2, par);
                    render(data3);
                    pageCount = Math.ceil(data3.pageInfo.totalRows/10);
                    pageN = Math.ceil(data3.pageInfo.totalRows);
                    
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
                    par = "appsercet=" + newAppsercet + "&method="+method+"&currentPage=" + currentPage;
        
                    var data3 = getSign(url2, par);
                    render(data3);
                    pageCount = Math.ceil(data3.pageInfo.totalRows/10);
                    pageN = Math.ceil(data3.pageInfo.totalRows);
                    
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
                    par = "appsercet=" + newAppsercet + "&method="+method+"&currentPage=" + pageCount;
        
                    var data3 = getSign(url2, par);
                    render(data3);
                    pageCount = Math.ceil(data3.pageInfo.totalRows/10);
                    pageN = Math.ceil(data3.pageInfo.totalRows);
                    
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
     //初次加载页面数据
           
    
    //请求全部管理员
    par = "appsercet="+newAppsercet+"&method=get.dxWeb.userList"
    logsgin(url,par);
    //用户名查询
    var use,sensoperation;
    $(".manRole").change(function(){
        var val = $(".manRole option:checked").val();
        var htm = $(".manRole option:checked").html();
        use = htm;
       
        if(val == 0){
            par = "appsercet="+newAppsercet+"&method=get.dxWeb.logList";
        
        }else{
            par = "appsercet="+newAppsercet+"&method=get.dxWeb.logList&username="+use;
           
        }
       var data = getSign(url2,par);
       if(data.msg.code == "10"){
        $(".log").html("");
        $(".pagination").css({"opacity":"0"});
       }else{
        $(".pagination").css({"opacity":"1"});
        render(data);
        pageChange("get.dxWeb.logList",data,"pagination21",url2);
       }
      
       
    })
    
    $(".searvh").click(function(){
        //console.log(sensoperation)
        var sensoperation = $(".sensoperation").val()
        par = "appsercet="+newAppsercet+"&method=get.dxWeb.logList&sensoperation="+sensoperation;
        
        // logsgin(url2,par);
        var data = getSign(url2,par);
        if (data.productList) {
            $(".pagination").css({"opacity":"1"});
            var str = "";
            $.each(data.productList, function (i, item) {
                str += "<tr style='border-bottom: 1px solid #d8d8d8;'><td>" + item.user_name + "</td><td>" + item.sensitive_operation + "</td><td>" + item.operation_details + "</td><td>" + item.login_time + "</td><td>" + item.ip_addr
            })
            $(".log").html(str);
            pageChange("get.dxWeb.logList",data,"pagination21",url2);
        }else{
            $(".pagination").css({"opacity":"0"});
            $(".log").html("");
        }

        
    })
    //下面页数点击的时候请求不同页面
    //   分页
    function render(data){
        if (data.productList) {
            $(".log").html("");
            var str = "";
            $.each(data.productList, function (i, item) {
                str += "<tr style='border-bottom: 1px solid #d8d8d8;'><td>" + item.user_name + "</td><td>" + item.sensitive_operation + "</td><td>" + item.operation_details + "</td><td>" + item.login_time + "</td><td>" + item.ip_addr
            })
            $(".log").html(str);
        }
       }

})