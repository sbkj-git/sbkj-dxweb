$(document).ready(function(){
    function changeState(el) {
        if (el.readOnly) el.checked=el.readOnly=false;
        else if (!el.checked) el.readOnly=el.indeterminate=true;
    }
    
    $(".nv91-close").click(function(){
        $(".nv91-mask").fadeOut();
        $(".nv91").hide();
    });
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
    //页面初次渲染
    url = src + "/skillInterface.dx";
    var appsercet = window.localStorage.getItem("appsercet");
        appsercet = JSON.parse(appsercet);
        var newAppsercet = appsercet.data;
        //通过用户名查找
        var cateName
        $(".ct1").click(function () {
            debugger
                cateName = $(".ct").val();
                par = "appsercet=" + newAppsercet + "&method=get.dxWeb.cateList&cateName=" + cateName;
                var data2 = getSign(url, par);
                if (data2.msg && data2.msg.code == "200") {
                    $(".textList").html("");
                    alert("没有数据");
                } else {
                    render(data2);
                }
            })
       
        localStorage.setItem("pageNow1", 1)
        var currentPage = window.localStorage.getItem("pageNow1")
        par = "appsercet=" + newAppsercet + "&method=get.dxWeb.cateList&currentPage=" + currentPage;
        var data2 = getSign(url, par);
        render(data2);
        pageChange("get.dxWeb.cateList",data2,"pagination9");
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
    
    function render(data) {
       
        if (data.dxWebList.length > 0) {
            var str = "";
            $(".textList").html("");
            $.each(data.dxWebList, function (i, item) {
                str += '<tr style="border-bottom: 1px solid #d8d8d8;">';
                str += '<td><div class="checkbox checkbox-primary"><input type="checkbox" class="styled styled-primary t1" id="' + item.cate_id + '"   aria-label="Single checkbox Two" data-id="' + item.cate_id + '"><label for="' + item.cate_id + '"></label></div></td>';
                str += '<td>' + item.cate_name + '</td><td>"' + item.cate_num + '"</td><td style="color:#FF5456;"><span class="isDelete" data-id="' + item.cate_id + '">删除</span>&nbsp;&nbsp;<span class="isEdit" data-id="' + item.cate_id + '">编辑</span></td>'
                str += "</tr>";
            })
            $(".textList").html(str);
            judgePower();
        }
        console.log(data);
    }
   function judgePower(){
        //页面初次渲染加载数据
    var data = window.localStorage.getItem("dxRightsList");    
        data = JSON.parse(data);
        var node = localStorage.getItem("node"); 
        node = JSON.parse(node);
        var id = node.id; 
     //页面初次加载渲染页面
     var url,par,sign,timestamp;      
        var appsercet = window.localStorage.getItem("appsercet");
        appsercet = JSON.parse(appsercet);
        var newAppsercet = appsercet.data;
        var appid = localStorage.getItem("appid");
        //判断是否有添加管理员操作权限
        var arr = [];
        $.each(data,function(i,item){
            //console.log(item)
            if(item.id == id){
                arr.push(item)
            }
        })
        console.log(arr[0]);
        $.each(arr[0].dxRightsList,function(i,item){
            //console.log(arr[0].dxRightsList)
            if (item.method === "get.dxWeb.cateList") {
                url = src + "/"+item.link_path;
                //判断该角色是否有权限操作
                if(item.dxRightsTwoList.length == 0){
                    return
                }
                else{
                    $.each(item.dxRightsTwoList,function(i,obj){
                       //判断该用户是否有添加权限
                        if(obj.method === "get.dxWeb.addCate"){
                            $(".addText").show();
                            $(".addText").click(function(){
                            //添加分类事件
                                $(".nv91-mask").show();
                                $(".nv91").show();
                                $(".addType").click(function(){
                                    debugger
                                    var cateName = $(".cateName").val();
                                    par = "appsercet="+newAppsercet+"&method=get.dxWeb.addCate&cateName="+cateName;
                                    var data = getSign(url,par);
                                    if(data.msg.code == "200"){
                                        alert("添加成功");
                                    }
                                })
                          })
                          
                            }
                        //判断该用户是否有删除权限 
                        if(obj.method === "get.dxWeb.deleteCate"){
                            $(".Delete").show();
                            $(".isDelete").show();
                            $(".Delete").click(function(){
                                deleteText();
                            })
                            $(".isDelete").click(function () {
                                var id = $(this).attr("data-id");
                                debugger
                                url = src + "/skillInterface.dx";
                                par = "appsercet=" + newAppsercet + "&method=get.dxWeb.deleteCate&IdList=" + id;

                                var data = getSign(url, par);
                                if (data.msg.code == "200") {
                                    alert("删除成功");
                                    location.reload();
                                }
                            })
                           
                            //判断是否有查看权限
                        }if(obj.method === "get.dxWeb.cateDetails"){
                             
                            }  
                            //判断是否有编辑权限
                           if(obj.method === "get.dxWeb.updateCate"){
                            $(".isEdit").show();
                         $(".isEdit").click(function(){
                            var id = $(this).attr("data-id");
                               var par = "appsercet="+newAppsercet+"&method=get.dxWeb.cateDetails&cateId="+id;
                               var data = getSign(url,par);
                               
                               console.log(data);
                               $(".nv91-mask").show();
                                $(".nv92").show();

                                $(".cateName1").val(data.msg.cate_name);
                
                                $(".addType").click(function(){
                                    var cateName = $(".cateName1").val();
                                  
                                    var par = "appsercet="+newAppsercet+"&method=get.dxWeb.updateCate&cateId="+id+"&cateName="+cateName;
                                    var data = getSign(url,par);
                                    console.log(data);
                                    if(data.msg.code == "200"){
                                        alert("修改成功");
                                        location.reload();
                                    }
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
                par = "appsercet=" + newAppsercet + "&method=get.dxWeb.deleteCate&IdList=" + IdList;
                
                var data = getSign(url, par);
                if (data.msg.code == "200") {
                    alert("删除成功");
                    location.reload();
                }
            }

})