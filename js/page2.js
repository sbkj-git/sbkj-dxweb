function page(method){
    //点击分页按钮触发
    var appsercet = window.localStorage.getItem("appsercet");
    appsercet = JSON.parse(appsercet);
    var newAppsercet = appsercet.data;
$(document).on("click", "#pageGro li", function () {
    var pageNum = parseInt($(this).html());//获取当前页数
    localStorage.setItem("pageNow1",pageNum);
    var selector = $(this);
    $(".nowNum").text(pageNum);
    var currentPage = pageNum
    par="appsercet="+newAppsercet+"&method="+method+"&currentPage="+currentPage
    var data12 = getSign(url, par);
    render1(data12);
   
    num_click(pageCount, pageNum, selector);
    

});
$(".returnNum").blur(function(){
    var data12
    var pageNum = parseInt($(this).val());//获取当前页数
    localStorage.setItem("pageNow1",pageNum);
    if(pageNum == "" || pageNum == null){

    }else if(pageNum > 0 && pageNum <=pageCount){
        var currentPage = pageNum
        par="appsercet="+newAppsercet+"&method="+method+"&currentPage="+currentPage
    var data12 = getSign(url, par);
    render1(data12);
   
    $(".nowNum").text(pageNum);
    $(this).val("");
    var selector = $("#pageGro li").eq(pageNum-1);
    num_click(pageCount, pageNum, selector);
   

    }
})
//点击上一页触发
$(document).on("click", "#pageGro .pageUp", function () {
    var pageNum = parseInt($("#pageGro li.on").html());//获取当前页
    localStorage.setItem("pageNow1",pageNum);
    var index = $("#pageGro ul li.on").index();//获取index
    $(".nowNum").text(pageNum - 1);
    var currentPage = pageNum
 par="appsercet="+newAppsercet+"&method="+method+"&currentPage="+currentPage;
    var data12 = getSign(url, par);
    render1(data12);
    
    pageUp_click(pageCount, pageNum, index);
     
});

//点击下一页触发
$(document).on("click", "#pageGro .pageDown", function () {
    var pageNum = parseInt($("#pageGro li.on").html());//获取当前页
    localStorage.setItem("pageNow1",pageNum);
    var index = $("#pageGro ul li.on").index();//获取index
    $(".nowNum").text(pageNum + 1);
    var currentPage = pageNum
    par="appsercet="+newAppsercet+"&method="+method+"&currentPage="+currentPage
    var data12 = getSign(url, par);
    render1(data12);
    
    pageDown_click(pageCount, pageNum, index);
    

});
}