  // 分页实现
  function pageChange(method,data2,pagination){      
    
          var pageCount,pageN,pageNum;
          if(data2.body&&data2.body.totalCount){
              pageCount = Math.ceil(data2.body.totalCount / 10);//后台返回的总页数
          }else{
              pageCount == 0;
          }
          if(data2.body&&data2.body.totalCount){
              pageN = data2.body.totalCount;
          }else{
              pageN == 0;
          }
          if(data2.body&&data2.body.totalCount){
              new Page({
                  id: pagination,
                  pageTotal: pageCount, //必填,总页数
                  pageAmount: 10,  //每页多少条
                  dataTotal: pageN, //总共多少条数据
                  curPage:1, //初始页码,不填默认为1
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
          //初次加载页面数据
         
          $(document).on("click", ".pageItem", function () {
              
              currentPage = $(this).html();
              localStorage.setItem("pageNow1", currentPage)
              url = zt + method;
              var data12 = JSON.stringify({ "pageSize": "10", "currentPage": currentPage }); var jsonData = ajax(url, data12);
              render3(jsonData);
              judge();
          })
         //  $(".pagePrev").unbind('click').bind("click",function(){
          $(document).on("click", ".pagePrev", function () {
             
             currentPage = localStorage.getItem("pageNow1");
             var num3 = parseInt(currentPage) - 1;
             url = zt + method;
             if(currentPage  > 0 && currentPage  < pageCount){
                 var data12 = JSON.stringify({ "pageSize": "10", "currentPage": num3 }); var jsonData = ajax(url, data12);
             }else {
                 var data12 = JSON.stringify({ "pageSize": "10", "currentPage": "1" }); var jsonData = ajax(url, data12); 
             }
            
             render3(jsonData);
             judge();
             var num = parseInt(currentPage)+1;
             localStorage.setItem("pageNow1", num);
         })
         // $(".pageNext").unbind('click').bind("click",function(){
             
         $(document).on("click", ".pageNext", function () {
             
             currentPage = localStorage.getItem("pageNow1");
            var num2 = parseInt(currentPage) + 1;
             url = zt + method;
             if(currentPage > 0 && currentPage < pageCount){
                 var data12 = JSON.stringify({ "pageSize": "10", "currentPage": num2 }); var jsonData = ajax(url, data12);
             }else{
                 var data12 = JSON.stringify({ "pageSize": "10", "currentPage": pageCount }); var jsonData = ajax(url, data12); 
             }
            
             render3(jsonData);
             judge();
             var num = parseInt(currentPage)+1;
             localStorage.setItem("pageNow1", num);
         })
          var re = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/ 
         
          $(".returnPage").blur(function () { 
                
              var value = $(this).val();
              if (!re.test(value)) {
                  return false;
              } else {
                  var pageNum = parseInt($(this).val());//获取当前页数
                  localStorage.setItem("pageNow1", pageNum);
                  if (pageNum > 0 && pageNum <= pageCount) {
                     url = zt + method;
                     $(".pageItem").removeClass("active")
                     $(".pageItem").each(function(){
                         if($(this).text() == pageNum){
                             $(this).addClass("active")
                         }
                     })
                        
                     data12 = JSON.stringify({ "pageSize": "10", "currentPage": pageNum });
                     var jsonData = ajax(url, data12);
                     render3(jsonData);
                     judge();
                    
                     $(this).val(pageNum);
                  } else  if(pageNum > pageCount){
                         
                          $(this).val(pageCount);
                          $(".pageItem").removeClass("active");
                          $(".pageItem").eq(6).addClass("active");
                          url = zt + method;

                          data12 = JSON.stringify({ "pageSize": "10", "currentPage": pageCount });
                          var jsonData = ajax(url, data12);
                          render3(jsonData);
                          judge();
                          // $(this).val(""); 
                      
                      
                  } 
              }
          })
  }

 
 //radio点击取消选中
 $(".btn1").each(function(index){
    $(this).click(function(){
        $(".btn1").removeClass("btn-primary").eq(index).addClass("btn-primary");
    })
})
$(".btn1").each(function(index){
    $(this).hover(function(){
        $(".btn1").removeClass("btn-primary").eq(index).addClass("btn-primary");
    })
    $(this).mouseleave(function(){
        $(".btn1").removeClass("btn-primary").eq(index).addClass("btn-primary");
    })
})
$(function () {
$('input:radio').click(function () {
    //alert(this.checked);
    //

    var domName = $(this).attr('name');

    var $radio = $(this);
    // if this was previously checked
    if ($radio.data('waschecked') == true) {
        $radio.prop('checked', false);
        var inputs = document.querySelectorAll(".t1");//获取所有的input标签对象  
        var IdList;
        var checkboxArray = [];//初始化空数组，用来存放checkbox对象。
        for (var i = 0; i < inputs.length; i++) {
            var obj = inputs[i];
            if (obj.type == 'checkbox') {
                obj.checked = false;
            }
        }
        $("input:radio[name='" + domName + "']").data('waschecked', false);
        //$radio.data('waschecked', false);
    } else {
        $radio.prop('checked', true);
        var inputs = document.querySelectorAll(".t1");//获取所有的input标签对象  
        var IdList;
        var checkboxArray = [];//初始化空数组，用来存放checkbox对象。
        for (var i = 0; i < inputs.length; i++) {
            var obj = inputs[i];
            if (obj.type == 'checkbox') {
                obj.checked = true
            }
        }
        $("input:radio[name='" + domName + "']").data('waschecked', false);
        $radio.data('waschecked', true);
    }
});
});
//确定取消事件
$(".roleRefuse").click(function(){
$(".nv91-mask").hide();
$(".nv91").hide();
})
$(".roleSure").click(function(){
$(".nv91-mask").hide();
$(".nv91").hide();
})
//初次加载页面渲染页面

url = zt + "operationSupport/getCompanyAuthInfoList";
var data12 = JSON.stringify({ "pageSize": "10", "currentPage": "1" }); 
var jsonData = ajax(url, data12);
render3(jsonData);
pageChange("operationSupport/getCompanyAuthInfoList",jsonData,"pagination14")

function judge(){
//页面初次加载渲染页面
//判断是否有添加管理员操作权限
var url, par;
var appsercet = window.localStorage.getItem("appsercet");
appsercet = JSON.parse(appsercet);
var newAppsercet = appsercet.data;
var data = window.localStorage.getItem("dxRightsList");
data = JSON.parse(data);
var arr = [];
$.each(data,function(i,item){
//console.log(item)
if(item.id == 10){
    arr.push(item)
}
})
$.each(arr[0].dxRightsList,function(i,item){
//console.log(arr[0].dxRightsList)
if(item.link_path === "enterpriseAaddList"){
    

    //判断该角色是否有权限操作
    if(item.dxRightsTwoList.length == 0){
        return
    }
    else{
        $.each(item.dxRightsTwoList, function (i, obj) {
            //判断该用户是否有删除权限
            if (obj.link_path === "delete") {
                $(".Delete").show();
                $(".isDelete").show();
                $(".Delete").click(function () {
                    var id = t1();
                    var pageNum = localStorage.getItem("pageNow1");
                    url = zt + "operationSupport/batchDeleteIdentityInfo"
                    var data12 = JSON.stringify({ "ids": id })
                    var data = ajax(url, data12);
                    console.log(data);
                    if (data.success) {
                        $(".prompt span").text("删除成功");
                        $(".nv91-mask").show();
                        $(".nv").show();
                        setTimeout(function () {
                            $(".nv91-mask").hide();
                            $(".nv").hide();
                        }, 2000);
                        url = zt + "operationSupport/getCompanyAuthInfoList";
                        var data12 = JSON.stringify({ "pageSize": "10", "currentPage": pageNum }); var jsonData = ajax(url, data12);
                        render3(jsonData);
                        editN();
                    }

                })
                $(".isDelete").click(function () {

                    var id = $(this).attr("data-id");
                    var pageNum = localStorage.getItem("pageNow1");
                    url = zt + "operationSupport/deleteIdentityInfo"
                    var data12 = JSON.stringify({ "id": id })
                    var data = ajax(url, data12);
                    console.log(data)
                    if (data.success) {
                        $(".prompt span").text("删除成功");
                        $(".nv91-mask").show();
                        $(".nv").show();
                        setTimeout(function () {

                            $(".nv91-mask").hide();
                            $(".nv").hide();
                        }, 2000);
                        url = zt + "operationSupport/getCompanyAuthInfoList";

                        var data12 = JSON.stringify({ "pageSize": "10", "currentPage": pageNum });
                        var jsonData = ajax(url, data12);
                        render3(jsonData);
                    }
                })
                //判断是否有查看权限
            }if(obj.link_path === "query"){

                //查看文章详情
                $(".isEdit").show();
                editN();

            }
            //判断是否有审核权限
            if (obj.link_path === "auditor") {

                $(".isVerify").show();
                $(".isVerify").eq(0).click(function () {
                    var id = t1();
                    var pageNum = localStorage.getItem("pageNow1");
                    url = zt + "operationSupport/batchUpdateIdentityInfo"
                    var data12 = JSON.stringify({ "ids": id, "authState": 1 })
                    var data = ajax(url, data12);
                    console.log(data);
                    if (data.success) {
                        $(".prompt span").text("操作成功");
                        $(".nv91-mask").show();
                        $(".nv").show();
                        setTimeout(function () {
                            $(".nv91-mask").hide();
                            $(".nv").hide();
                        }, 2000);
                        url = zt + "operationSupport/getCompanyAuthInfoList";

                        var data12 = JSON.stringify({ "pageSize": "10", "currentPage": pageNum }); var jsonData = ajax(url, data12);
                        render3(jsonData);
                        editN();
                        

                    }
                })
                $(".isVerify").eq(1).click(function () {
                    var id = t1();
                    var pageNum = localStorage.getItem("pageNow1");
                    url = zt + "operationSupport/batchUpdateIdentityInfo";
                    var data12 = JSON.stringify({ "ids": id, "authState": "2" });
                    console.log(data12);
                    var data = ajax(url, data12);
                    console.log(data);
                    if (data.success) {
                        $(".prompt span").text("操作成功");
                        $(".nv91-mask").show();
                        $(".nv").show();
                        setTimeout(function () {
                            $(".nv91-mask").hide();
                            $(".nv").hide();
                        }, 2000);
                        url = zt + "operationSupport/getCompanyAuthInfoList";

                        var data12 = JSON.stringify({ "pageSize": "10", "currentPage": pageNum }); var jsonData = ajax(url, data12);
                        render3(jsonData);
                        editN();
                        

                    }
                })
            }
           
        })

    }
}

})

}
//通过种类请求公司
$(".companyType").change(function () {
    url = zt + "operationSupport/getCompanyAuthInfoList";
    if ($(".companyType option:checked").val() == 3) {
        url = zt + "operationSupport/getCompanyAuthInfoList";

        var data12 = JSON.stringify({ "pageSize": "10", "currentPage": "1" }); var jsonData = ajax(url, data12);
        render3(jsonData);
        editN();
        pageChange("operationSupport/getCompanyAuthInfoList",jsonData,"pagination14")

    }
    if ($(".companyType option:checked").val() == 0) {
        url = zt + "operationSupport/getCompanyAuthInfoList";

        var data12 = JSON.stringify({ "pageSize": "10", "currentPage": "1" ,"authStatus":"0"}); var jsonData = ajax(url, data12);
        render3(jsonData);
        editN();
        pageChange("operationSupport/getCompanyAuthInfoList",jsonData,"pagination14")

    } else if ($(".companyType option:checked").val() == 1) {

        var data12 = JSON.stringify({ "pageSize": "10", "currentPage": "1", "authStatus":"1" });
        var jsonData = ajax(url, data12);
        render3(jsonData);
        editN();
        pageChange("operationSupport/getCompanyAuthInfoList",jsonData,"pagination14");
    } else if ($(".companyType option:checked").val() == 2) {

        var data12 = JSON.stringify({ "pageSize": "10", "currentPage": "1", "authStatus":"2" });
        var jsonData = ajax(url, data12);
        render3(jsonData);
        editN();
        pageChange("operationSupport/getCompanyAuthInfoList",jsonData,"pagination14")

    }
})
//通过公司名请求公司
$(".companyName1").click(function () {
    var companyName = $(".companyName").val();
    url = zt + "operationSupport/getCompanyAuthInfoList"
    var data12 = JSON.stringify({ "pageSize": "10", "currentPage": "1", "companyName": companyName });
    var jsonData = ajax(url, data12);
    render3(jsonData);
    editN();
    pageChange("operationSupport/getCompanyAuthInfoList",jsonData,"pagination14")

})

//编辑方法
function editN(){

$(".isEdit").click(function(){
   var nowStatus = $(this).attr("data-statu");
   localStorage.setItem("nowStatus", nowStatus);
    var index = $(this).attr("data-value");
    var type = $(this).attr("data-name");
    var id = $(this).attr("data-id");
    var data12 = JSON.stringify({ "id": id });
    
    if(type == 2){
        localStorage.setItem("type3", "no");
        var url = zt + "operationSupport/getCompanyAuthInfo"
        var data = ajax(url, data12);
        localStorage.setItem("companyDetail", JSON.stringify(data.body));
        localStorage.setItem("personType", "no");
        location.href = "./Idetails.html";
    }else{
        
        
        localStorage.setItem("type3", "yes");
        url = zt + "operationSupport/getPersonToCompanyAuthInfo";
        var data12 = JSON.stringify({ "id": id })
        var data = ajax(url, data12);
        if (data.success) {
            localStorage.setItem("qyPerson", JSON.stringify(data.body));
            localStorage.setItem("personType", "no");
            location.href = "./Idetails.html";
        }
        
    }
    // 将公司详情暂存缓存
    if (data.success) {

        localStorage.setItem("companyDetail", JSON.stringify(data.body));
        localStorage.setItem("personType", "no");

        localStorage.setItem("detailId", id);
        location.href = "./Idetails.html"
    }
})
}

//封装初次渲染方法
function render3(jsonData) {
if (jsonData.success) {
    $(".textList").html("");
    if (jsonData.body.data) {
        var str = "";

        if (jsonData.body.data.length > 0) {
            $.each(jsonData.body.data, function (i, item) {
                str += '<tr style="border-bottom: 1px solid #d8d8d8;font-size:14px;">';
            
                str += '<td>'+item.companyName+'</td><td>' + item.businessLicense + '</td><td>' + item.corporateName + '</td>';
                if (item.type == 2) {
                    str += "<td>企业审核</td>";
                } else {
                    str += "<td>个人转企业</td>"
                }
               
                if (item.authStatus == 0) {
                    str += "<td>未审核</td>";
                } else if (item.authStatus == 1) {
                    str += "<td>已通过</td>"
                } else if (item.authStatus == 2) {
                    str += "<td>未通过</td>"
                }
                str += '<td>' + item.updateTime + '</td><td style="color:#48a4ea;">&nbsp;&nbsp;<span data-id="' + item.id + '" class="isEdit" data-value="' + i + '" data-name="'+item.type+'" data-statu="'+item.authStatus+'">详情</span>&nbsp;&nbsp;</td>'
                str += "</tr>";
            })
            $(".textList").html(str);
            judge();
        }
    }
}
}

//封装请求函数
function ajax(url,data12) {
var result = "";

$.ajax({
    url: url,
    type: 'POST',
    async:false,
    data: data12,
    contentType: false,
    processData: false,
    success: function (res) {

        console.log(res);
        var jsonData = JSON.stringify(res);
        jsonData = JSON.parse(jsonData)
        console.log(jsonData);
        result = jsonData;
    },
    error: function (error) {
        console.log(error)
    }
})

return result;
}
