function changeState(el) {
    if (el.readOnly) el.checked=el.readOnly=false;
    else if (!el.checked) el.readOnly=el.indeterminate=true;
}
//弹框关闭事件
$(".nv91-close").click(function(){
    $(".nv91-mask").fadeOut();
    $(".nv91").hide();
});
//弹框内选项卡事件
var radio = document.querySelectorAll(".status");
$(".status").click(function(){
    for (var i = 0; i < radio.length; i++) {
        if (radio[0].checked) {
           $(".c2").eq(0).show();
           $(".c2").eq(1).hide();

        } else {
            $(".c2").eq(0).hide();
            $(".c2").eq(1).show();
            //获取对应产品
            par = "appsercet=" + newAppsercet + "&method=get.dxWeb.cateAllList";
            var data1 = getSign(url, par);
            type(data1);
            function type(data1) {
                if (data1.dxWebList) {
                    $(".cateId2").html("");
                    if (data1.dxWebList.length > 0) {
                        var str = "";
                        str += "<option value='0' selected data-id='0'>请选择</option>";
                        $.each(data1.dxWebList, function (i, obj) {
                            str += "<option data-id='" + obj.product_id + "'>" + obj.product_name + "</option>"
                        })
                        $(".cateId2").html(str);
                    }
                }

            }
        }

    }
              
})

//按照发布时间排序
var ul = $(".ul_sort ul");
var lis = [];

lis = $(".ul_sort ul li");
var ux = [];
//循环提取时间，并调用排序方法进行排序
for (var i=0; i<lis.length; i++){
    var tmp = {};
    tmp.dom = lis.eq(i);
    tmp.date = new Date(lis.eq(i).find("span").eq(0).html().replace(/-/g,'/'));
    ux.push(tmp);
}
//数组排序，支持年的比较
ux.sort(function(a,b){
   var myDate = new Date();
   var year = myDate.getYear();
   if(a.date.getYear < year && b.date.getYear == year){
      return true;
   }
   return b.date - a.date;
});
//移除原先顺序错乱的li内容
$('.ul_sort ul li').remove();
//重新填写排序好的内容
for (var i=0; i<ux.length; i++){
   ul.append(ux[i].dom);
}
$(document).ready(function(){
    
})
 
//页面初次渲染加载数据

    var url = src+"/qAndAInterface.dx"; 
 //页面初次加载渲染页面
 var url,par,sign,timestamp; 
    var appsercet = window.localStorage.getItem("appsercet");
    appsercet = JSON.parse(appsercet);
    var newAppsercet = appsercet.data;
 localStorage.setItem("pageNow1",1)     
    var currentPage   = window.localStorage.getItem("pageNow1")
par = "appsercet=" + newAppsercet + "&method=get.dxWeb.cateTwoList&currentPage="+currentPage;     
        var data2 = getSign(url, par);
    //初次加载页面数据
    render(data2);
    pageChange("get.dxWeb.cateTwoList",data2,"pagination8");
        function pageChange(method,data2,pagination){
            debugger
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
    //通过分类方法名请求列表
    $(".classifyName").click(function(){
        debugger
       var  classifyName = $(".classifyName1").val();
       par = "appsercet="+newAppsercet+"&method=get.dxWeb.cateTwoList&classifyName="+classifyName;
       
       var data2 = getSign(url,par);
       if (data2.msg && data2.msg.code == "200") {
        $(".textList").html("");
        alert("没有数据");
    } else {
        render(data2);
    }
     
      
    })
    function judgePower() {
            var url, par, sign, timestamp;
            url = src + "/qAndAInterface.dx";
            var data = window.localStorage.getItem("dxRightsList");    
            data = JSON.parse(data); 
            var appsercet = window.localStorage.getItem("appsercet");
            appsercet = JSON.parse(appsercet);
            var newAppsercet = appsercet.data;
            var appid = localStorage.getItem("appid");

            //判断是否有添加管理员操作权限
            var arr = [];
            $.each(data, function (i, item) {
                //console.log(item)
                if (item.id == 5) {
                    arr.push(item)
                }
            })

            console.log(arr[0]);
            $.each(arr[0].dxRightsList, function (i, item) {
                //console.log(arr[0].dxRightsList)
                if (item.method === "get.dxWeb.cateTwoList") {

                    //判断该角色是否有权限操作
                    if (item.dxRightsTwoList.length == 0) {
                        return
                    }
                    else {
                        $.each(item.dxRightsTwoList, function (i, obj) {
                            //判断该用户是否有添加权限
                            if (obj.method === "get.dxWeb.addCate") {
                                $(".addText").show();
                                $(".addText").click(function () {
                                    //添加分类事件
                                    debugger
                                    $(".nv91-mask").show();
                                    $(".nv91").show();
                                    $(".go").click(function () {
                                        $("#filename2").click();
                                        $("#filename2").change(function () {
                                            var fileDom = document.getElementById("filename2");
                                            imgPreview(fileDom, "fileImg2")
                                        })

                                    })
                                    $(".addType").click(function () {
                                        
                                        //添加点击事件操作
                                        addorup("get.dxWeb.addCate","get.dxWeb.addTwoCate",1,1);
                                    })
                                })

                            }
                            //判断该用户是否有删除权限 
                            if (obj.method === "get.dxWeb.deleteCate") {
                                $(".Delete").show();
                                $(".isDelete").show();
                                $(".Delete").click(function () {
                                    deleteText();
                                })
                                $(".isDelete").click(function () {
                                    var id = $(this).attr("data-id");
                                    par = "appsercet=" + newAppsercet + "&method=get.dxWeb.deleteTwoCate&IdList=" + id;
            
                                    var data = getSign(url, par);
                                    if (data.msg.code == "200") {
                                        alert("删除成功");
                                        location.reload();
                                    }
                                })

                            }
                            //判断是否有编辑权限
                            if (obj.method === "get.dxWeb.updateCate") {
                                debugger
                                $(".isEdit").show();
                                $(".isEdit").click(function () {
                                    var id = $(this).attr("data-id");
                                    var pid = $(this).attr("data-name");
                                    var par = "appsercet=" + newAppsercet + "&method=get.dxWeb.cateTwoDetails&cateId=" + id;
                                    var data = getSign(url, par);
                                    console.log(data)
                                    $("#fileImg2").attr("src", data.msg.product_img);
                                    $(".nv91-mask").show();
                                    $(".nv91").show();
                                    $(".go").click(function () {
                                        $("#filename2").click();
                                        $("#filename2").change(function () {
                                            var fileDom = document.getElementById("filename2");
                                            imgPreview(fileDom, "fileImg2")
                                        })

                                    })
                                    console.log(data);
                                    $(".filename2").hide();
                                  
                                    $(".cateName").val(data.msg.product_name);
                                    // $(".cateName").val(data.msg.classify_name);
                                    //   包含文章数量参数
                                      $(".problem_sum").val(data.msg.problem_sum)
                                    $(".addType").click(function () {
                                        
                                        //添加点击事件操作
                                        addorup("get.dxWeb.updateCate","get.dxWeb.updateTwoCate",pid,id);
                                    })
                                })

                            }


                        })

                    }
                }

            })

        }
    //删除函数封装
     function deleteText() {
            var inputs = document.querySelectorAll(".t1");//获取所有的input标签对象  
            var IdList;
            var checkboxArray = [];//初始化空数组，用来存放checkbox对象。
            for (var i = 0; i < inputs.length; i++) {
                var obj = inputs[i];
                if (obj.type == 'checkbox') {
                    checkboxArray.push(obj);
                }
            }
            IdList = new Array();
            for (var i = 0; i < checkboxArray.length; i++) {
                if (checkboxArray[i].checked) {
                    IdList.push(checkboxArray[i].getAttribute("data-id"));
                }
            }
            par = "appsercet=" + newAppsercet + "&method=get.dxWeb.deleteTwoCate&IdList=" + IdList;
            
            var data = getSign(url, par);
            if (data.msg.code == "200") {
                alert("删除成功");
                location.reload();
            }
        }

   //封装post请求获取签名
    function postFormdata(method) {

        var data = sign(method);
        var formData = new FormData();
        var appid = localStorage.getItem("appid");
        var appsercet = localStorage.getItem("appsercet");
        appsercet = JSON.parse(appsercet);
        appsercet = appsercet.data;
        formData.append("appid", appid);
        formData.append("appsercet", appsercet);
        console.log(data)
        var sign1 = data.parameter;
        var timeStamp = data.timestamp;
        formData.append("method", method);
        formData.append("sign", sign1);
        formData.append("timestamp", timeStamp);
        return formData;
    }
//第一次渲染页面
function render(data) {
        if (data.dxWebList.length > 0) {
            var str = "";
            $(".textList").html("");
            $.each(data.dxWebList, function (i, item) {
                str += '<tr style="border-bottom: 1px solid #d8d8d8;">';
                str += '<td><div class="checkbox checkbox-primary"><input type="checkbox" class="styled styled-primary t1" id="' + item.cate_id + '"   aria-label="Single checkbox Two" data-id="' + item.cate_id + '"><label for="' + item.cate_id + '"><img src="' + item.product_img + '" class="product_img"/>' + item.product_name + '</label></div></td><td>"' + item.classify_name + '"</td><td>"' + item.problem_sum + '"</td>';

                str += '<td style="color:#FF5456;"><span class="isDelete" data-id="' + item.cate_id + '">删除</span>&nbsp;&nbsp;<span class="isEdit" data-id="' + item.cate_id + '" data-name="' + item.product_id + '">编辑</span></td>'
                str += "</tr>";
            })
            $(".textList").html(str);
            judgePower();
        }
    }
//添加修改操作
function addorup(method,method2,pid,id){
    var radio = document.querySelectorAll(".status");
            for (var i = 0; i < radio.length; i++) {
                if (radio[0].checked) {
                    debugger
                    var formData = postFormdata(method)
                    if(method === "get.dxWeb.updateCate"){
                        formData.append("cateId", pid);   
                    }
                    if($(".webImg2")[0].files[0] == "undefined" || !($(".webImg2")[0].files[0]) || $(".webImg2")[0].files[0] == "" || $(".webImg2")[0].files[0] == null){
                        formData.append("webImg2", "");
                    }else{
                        formData.append("webImg2", $(".webImg2")[0].files[0]);
                        console.log($(".webImg2")[0].files[0])
                    }
                   
                    formData.append("cateName", $(".cateName").val());
                    
                    var data = post(url, formData);
                    if (data.msg.code == "200") {
                        alert("添加成功");
                    }
                } else {
                    debugger
                    var formData = postFormdata(method2);
                    if(method2 === "get.dxWeb.updateTwoCate"){
                        formData.append("cateId", id);
                    }
                    formData.append("cateName", $(".cateName1").val());
                    formData.append("id", $(".cateId2 option:checked").attr("data-id"));
                    var data = post(url, formData);
                    if (data.msg.code == "200") {
                        alert("添加成功");
                    }
                }

            }
        }
