function changeState(el) {
    // judge(href = "../login1.html");
    if (el.readOnly) el.checked=el.readOnly=false;
    else if (!el.checked) el.readOnly=el.indeterminate=true;
}
$(document).ready(function(){
    var url,par,url2;

    var appsercet = window.localStorage.getItem("appsercet");
    appsercet = JSON.parse(appsercet);
    var newAppsercet = appsercet.data;
    //console.log(appsercet)
    //初始渲染页面
    url =  src+"/adminInterface.dx";
    url2 = src+"/logInterface.dx"
    par = "appsercet="+newAppsercet+"&method=get.dxWeb.logList"
    logsgin(url2,par);
    //请求全部管理员
    par = "appsercet="+newAppsercet+"&method=get.dxWeb.userList"

    logsgin(url,par);
    var page = sessionStorage.getItem("pageInfo");
    pageInfo = JSON.parse(page)
    //console.log(pageInfo.totalRows)
    var pageNum = Math.ceil(pageInfo.totalRows / 10);
    $(".total").html(pageInfo.totalRows)
    //用户名查询
    var use,sensoperation;
    $(".manRole").change(function(){
        var val = $(".manRole option:checked").val();
        var htm = $(".manRole option:checked").html();
        use = htm;
        par = "appsercet="+newAppsercet+"&method=get.dxWeb.logList&username="+use;

       var data = getSign(url,par);
       if(data.msg.code == "10"){
        $(".log").html("");
        
       }
       if (data.productList) {
            $(".log").html("");
            var str = "";
            $.each(data.productList, function (i, item) {
                str += "<tr style='border-bottom: 1px solid #d8d8d8;'><td>" + item.user_name + "</td><td>" + item.sensitive_operation + "</td><td>" + item.operation_details + "</td><td>" + item.login_time + "</td><td>" + item.ip_addr
            })
            $(".log").html(str);
        }
        if(val == 0){
            par = "appsercet="+newAppsercet+"&method=get.dxWeb.logList";
            
            logsgin(url2,par);
        }else{
            
            logsgin(url2,par);
        }
    })
    $(".sensoperation").blur(function(){
        sensoperation = $(this).val()
        //console.log(sensoperation)
    })
    $(".searvh").click(function(){
        //console.log(sensoperation)
        par = "appsercet="+newAppsercet+"&method=get.dxWeb.logList&sensoperation="+sensoperation;
        
        // logsgin(url2,par);
        var data = getSign(url2,par);
        $(".log").html("");
        if (data.productList) {

            var str = "";
            $.each(data.productList, function (i, item) {
                str += "<tr style='border-bottom: 1px solid #d8d8d8;'><td>" + item.user_name + "</td><td>" + item.sensitive_operation + "</td><td>" + item.operation_details + "</td><td>" + item.login_time + "</td><td>" + item.ip_addr
            })
        }else{
            alert("该操作下没有数据");
        }

        $(".log").html(str);
    })
    //下面页数点击的时候请求不同页面
    //   分页
    pagenow(url2,"get.dxWeb.logList");


})