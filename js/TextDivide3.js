$(document).ready(function(){
    function changeState(el) {
        if (el.readOnly) el.checked=el.readOnly=false;
        else if (!el.checked) el.readOnly=el.indeterminate=true;
    }
    // close关闭事件
    $(".nv91-close").click(function(){
        $(".nv91-mask").fadeOut();
        $(".nv91").hide();
    });
  
    //页面初次渲染
    url = src + "/skillInterface.dx";
    var appsercet = window.localStorage.getItem("appsercet");
        appsercet = JSON.parse(appsercet);
        var newAppsercet = appsercet.data;
        
        localStorage.setItem("pageNow1", 1)
        var currentPage = window.localStorage.getItem("pageNow1")
        par = "appsercet=" + newAppsercet + "&method=get.dxWeb.cateList&currentPage=" + currentPage;
        var data2 = getSign(url, par);
        render(data2);
        pageChange("get.dxWeb.cateList",data2,"pagination9",url);
        //封装分页
    
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
    //通过用户名查找
    var cateName
    $(".ct1").click(function () {
        
            cateName = $(".ct").val();
            par = "appsercet=" + newAppsercet + "&method=get.dxWeb.cateList&cateName=" + cateName;
            var data2 = getSign(url, par);
            if (data2.msg && data2.msg.code == "200") {
                $(".textList").html("");
                $(".paging").html('');
                
            } else {
                render(data2);
                pageChange("get.dxWeb.cateList",data2,"pagination9",url);
              
            }
        })
    function render(data) {
       
        if (data.dxWebList&&data.dxWebList.length > 0) {
            var str = "";
            $(".textList").html("");
            $.each(data.dxWebList, function (i, item) {
                str += '<tr style="border-bottom: 1px solid #d8d8d8;">';
                str += '<td><div class="checkbox checkbox-primary"><input type="checkbox" class="styled styled-primary t1" id="' + item.cate_id + '"   aria-label="Single checkbox Two" data-id="' + item.cate_id + '"><label for="' + item.cate_id + '">&nbsp;</label></div></td>';
                str += '<td>' + item.cate_name + '</td>';
                str+='<td>' + item.cate_num + '</td>';
                str+='<td style="color:#48a4ea;"><span class="isDelete" data-id="' + item.cate_id + '">删除</span>&nbsp;&nbsp;<span class="isEdit" data-id="' + item.cate_id + '">编辑</span></td>'
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
                                
                          })
                          $(".addType").click(function(){
                                    
                            var cateName = $(".cateName").val();
                            par = "appsercet="+newAppsercet+"&method=get.dxWeb.addCate&cateName="+cateName;
                            var data = getSign(url,par);
                            if(data.msg.code == "200"){
                                 $(".confirm").hide();
                            $(".prompt").text("操作成功");
                            $(".nv91-mask").show();
                            $(".nv1").show();
                            setTimeout(function () {
                                $(".nv91-mask").hide();
                                $(".nv1").hide();
                                location.reload();

                            }, 2000);;
                            }
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
                                
                                url = src + "/skillInterface.dx";
                                par = "appsercet=" + newAppsercet + "&method=get.dxWeb.deleteCate&IdList=" + id;

                                var data = getSign(url, par);
                                if (data.msg.code == "200") {
                                     $(".confirm").hide();
                            $(".prompt").text("操作成功");
                            $(".nv91-mask").show();
                            $(".nv1").show();
                            setTimeout(function () {
                                $(".nv91-mask").hide();
                                $(".nv1").hide();
                                location.reload();

                            }, 2000);;
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
                                         $(".confirm").hide();
                            $(".prompt").text("操作成功");
                            $(".nv91-mask").show();
                            $(".nv1").show();
                            setTimeout(function () {
                                $(".nv91-mask").hide();
                                $(".nv1").hide();
                                location.reload();

                            }, 2000);;
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
                if(IdList.length == 0){
                    $(".confirm").hide();
                    $(".prompt").text("请至少选择一条数据");
                    $(".nv91-mask").show();
                    $(".confirm1").show();
                    setTimeout(function () {
                        $(".nv91-mask").hide();
                        $(".confirm1").hide();
                       

                    }, 2000);;
                }else{
                    var data = getSign(url, par);
                    if (data.msg.code == "200") {
                         $(".confirm").hide();
                                $(".prompt").text("操作成功");
                                $(".nv91-mask").show();
                                $(".nv1").show();
                                setTimeout(function () {
                                    $(".nv91-mask").hide();
                                    $(".nv1").hide();
                                    location.reload();
    
                                }, 2000);;
                       
                    }
                }
               
            }

})