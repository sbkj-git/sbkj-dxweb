$(document).ready(function(){
    function changeState(el) {
        if (el.readOnly) el.checked=el.readOnly=false;
        else if (!el.checked) el.readOnly=el.indeterminate=true;
    }
 
     //点击弹窗关闭时间
     $(".BannerRefuse1").click(function(){
        
        $(".nv91-mask").hide();
        $(".nv91").hide();
    })
    $(".roleRefuse5").click(function(){
        
        $(".nv91-mask").hide();
        $(".confirm").hide();
    })
    $(".nv91-close").click(function(){
        
        $(".nv91-mask").hide();
        $(".nv91").hide();
    })
   
    //封装渲染数据方法
    function render(data) {
            if (data.dxWebList && data.dxWebList.length > 0) {
                var str = "";
                $(".textList").html("");
                $.each(data.dxWebList, function (i, item) {
                    
                    str += '<tr style="border-bottom: 1px solid #d8d8d8;">';
                    str += '<td><div class="checkbox checkbox-primary"><input type="checkbox" class="styled styled-primary t1" id="' + item.id + '"   aria-label="Single checkbox Two" data-id="' + item.id + '">';
                    var title;
                    if(item.title.length > 10){
                        title = item.title.substring(0,10)+"...";
                    }else{
                        title = item.title;
                    }
                    str+='<label for="' + item.id + '">' + title + '</label>'
                    str+='</div></td>';
                    if(item.large_img == "" ||item.large_img == null || item.large_img == "undefined"){
                        str+='<td>&nbsp;</td>';
                    }else{
                        str+='<td><img src="' + item.large_img + '" alt="" style="width: 82px;height:56px;display: table-column;vertical-align: middle;"></td>';
                    }
                    str+='<td>' + item.author + '</td>';
                    if (item.is_ups == 1) {
                        str += "<td>&#10003;</td>";
                    } else {
                        str += "<td>&#10007;</td>"
                    }
                    str += '<td>' + item.release_time + '</td><td style="color:#48a4ea;"><span class="isDelete" data-id="' + item.id + '">删除</span>&nbsp;&nbsp;<span data-id="' + item.id + '" class="isLook">查看</span>&nbsp;&nbsp;<span class="isEdit" data-id="' + item.id + '">编辑</span>'
                    if (item.is_ups == 1) {
                        str+="&nbsp;&nbsp;<span class='toDown' data-id='" + item.id + "'>取消置顶</span></td>";
                    } else {
                        str+="&nbsp;&nbsp;<span class='toTop ' data-id='" + item.id + "'>置顶</span>&nbsp;</td>";
                    }
                    str += "</tr>";

                })
                $(".textList").html(str);
                judgePower();
                
                //banner置顶事件   
                $(".toTop").unbind('click').bind("click",function(){ 
                    var index = $(this).index();
                    
                    var id = $(this).attr("data-id");
                    par = "appsercet=" + newAppsercet + "&method=get.dxWeb.updateWebOperation&isUp=1&articleId="+id;
                    var statu = getSign(url, par);

                    if (statu.msg.code == "200") {
                        $(".confirm").hide();
                        $(".prompt").text("操作成功");
                        $(".nv91-mask").show();
                        $(".nv1").show();
                        $(".nv3").hide();
                        setTimeout(function () {
                            $(".nv91-mask").hide();
                            $(".nv1").hide();
                            location.reload();

                        }, 2000);
                      
                        
                    }
                })
                $(".toDown").unbind('click').bind("click",function(){ 
                
                    
                    var id = $(this).attr("data-id");
                    par = "appsercet=" + newAppsercet + "&method=get.dxWeb.updateWebOperation&isUp=2&articleId="+id;
                    
                    var statu = getSign(url, par);
                    if (statu.msg.code == "200") {
                        $(".confirm").hide();
                        $(".prompt").text("操作成功");
                        $(".nv91-mask").show();
                        $(".nv1").show();
                        $(".nv3").hide();
                        setTimeout(function () {
                            $(".nv91-mask").hide();
                            $(".nv1").hide();
                            location.reload();

                        }, 2000);

                    }
                })
            }
        };
         
    //页面初次渲染加载数据
    var data = window.localStorage.getItem("dxRightsList");    
        data = JSON.parse(data);  
     //页面初次加载渲染页面
     var url,par;
     url = src + "/webInterface.dx";      
        var appsercet = window.localStorage.getItem("appsercet");
        appsercet = JSON.parse(appsercet);
        var newAppsercet = appsercet.data;
        var currentPage = localStorage.getItem("pageNow1");
        par = "appsercet="+newAppsercet+"&method=get.dxWeb.webOperationList"; 
            var data2 = getSign(url, par);
        render(data2);
        // 分页
        pageChange("get.dxWeb.webOperationList",data2,"pagination",url);
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
        // 根据时间排序      
        var ind = 0;
        $(".sort").click(function(){
            ind++;
            if (ind % 2 == 1) {
                par = "appsercet=" + newAppsercet + "&method=get.dxWeb.webOperationList&currentPage=" + currentPage + "&timeSort=1";
                var data2 = getSign(url, par);
                render(data2);
                pageChange("get.dxWeb.webOperationList",data2,"pagination",url);
            }else{
                par = "appsercet=" + newAppsercet + "&method=get.dxWeb.webOperationList&currentPage=" + currentPage + "&timeSort=2";
                var data2 = getSign(url, par);
                render(data2);
                pageChange("get.dxWeb.webOperationList",data2,"pagination",url);
            }
            
        })

     //通过banner名称查询
     $(".banner1").click(function(){
         
        var title = $(".titleText").val();
        if(title == "" || title == null){
            par = "appsercet="+newAppsercet+"&method=get.dxWeb.webOperationList";
        }else{
            par = "appsercet="+newAppsercet+"&method=get.dxWeb.webOperationList&title="+title;
        }
       
        var bannerList = getSign(url,par);
        if(bannerList.msg && bannerList.msg.codeMsg){
            $(".textList").html("");
            
            
        }
        else if(bannerList.dxWebList){
            
            render(bannerList);
            pageChange("get.dxWeb.webOperationList",bannerList,"pagination",url);
        }
        
       
    })
    judgePower();
        function judgePower(){
              //页面初次渲染加载数据
    var data = window.localStorage.getItem("dxRightsList");    
    data = JSON.parse(data);  
 //页面初次加载渲染页面
 var url,par;      
    var appsercet = window.localStorage.getItem("appsercet");
    appsercet = JSON.parse(appsercet);
    var newAppsercet = appsercet.data;
            //判断是否有添加管理员操作权限
        var arr = [];
        $.each(data,function(i,item){
            //console.log(item)
            if(item.id == 2){
                arr.push(item)
            }
        })
        var help ;
        
        console.log(arr[0]);
        $.each(arr[0].dxRightsList,function(i,item){
            //console.log(arr[0].dxRightsList)
            if(item.method === "get.dxWeb.webOperationList"){
                url = src+"/"+item.link_path;
                help = "/"+item.link_path;
                    
               
                            //分页
                            //分页渲染
        
                $(document).on("click", ".pageItem", function () {

                    
                    currentPage = $(this).html();
                    localStorage.setItem("pageNow1", currentPage)
                    par = "appsercet=" + newAppsercet + "&method=get.dxWeb.webOperationList&currentPage=" + currentPage;
                    var bannerList = getSign(url, par);
                    render(bannerList);
                })
                var re = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/ 
                var ret = document.querySelector(".returnPage");
                $(".returnPage").blur(function () {
                    
                    var value = $(this).val();

                    if (!re.test(value)) {
                       
    
                        return false;
                    } else {
                        currentPage = value;
                        par = "appsercet=" + newAppsercet + "&method=get.dxWeb.webOperationList&currentPage=" + currentPage;
    
                        var data2 = getSign(url, par);
                        render(data2);
                        $(this).val("");
                    }
    
                })
                
                //判断该角色是否有权限操作
                if(item.dxRightsTwoList.length == 0){
                    return
                }
                else{
                    $.each(item.dxRightsTwoList,function(i,obj){
                       //判断该用户是否有添加权限
                        if(obj.method === "get.dxWeb.addWebOperation"){
                          $(".Add").show();
                          $(".Add").click(function(){
                              
                            $(this).addClass("btn-primary");
                            $(".Delete").removeClass("btn-primary");
                            localStorage.setItem("method","get.dxWeb.addWebOperation");
                            localStorage.setItem("url",help);
                            location.href = "./AddText.html";
                          })
                          
                            }
                        //判断该用户是否有删除权限 
                        if(obj.method === "get.dxWeb.deleteWebOperation"){
                            $(".Delete").show();
                            $(".isDelete").show();
                            $(".Delete").click(function(){
                                $(this).addClass("btn-primary");
                                $(".Add").removeClass("btn-primary");
                                var data = judgeChoose();
                                if(data.length == 0){
                                    $(".nv91-mask").show();
                                    $(".prompt").text("请至少选择一条数据");
                                    $(".confirm1").show(); 
                                    setTimeout(function(){
                                        $(".nv91-mask").hide();
                                        $(".confirm1").hide();
                                       
                                    },2000);
                                }else{
                                    $(".nv91-mask").show();
                                    $(".confirm").show();
                                    $(".needShow").show();
                                    $(".roleSure").click(function(){
                                        deleteText();
                                    })
                                    $(".roleRefuse").click(function(){
                                        $(".nv91-mask").show();
                                        $(".confirm").show(); 
                                    })
                                }
                                
                                
                            })
                           
                            $(".isDelete").click(function () {
                                $(".nv91-mask").show();
                                $(".confirm").show();
                                var IdList = $(this).attr("data-id");
                                $(".roleSure").click(function(){
                                    
                                    par = "appsercet=" + newAppsercet + "&method=get.dxWeb.deleteWebOperation&IdList=" + IdList;
    
                                    var data = getSign(url, par);
                                    if (data.msg.code == "200") {
                                        $(".confirm").hide();
                                        $(".prompt").text("删除成功");  
                                        $(".nv1").show();
                                        setTimeout(function(){
                                            $(".nv91-mask").hide();
                                            $(".nv1").hide();
                                            par = "appsercet="+newAppsercet+"&method=get.dxWeb.webOperationList&currentPage=" + currentPage; 
                                            var data2 = getSign(url, par);
                                            render(data2);
                                            pageJudge(data2);
                                        },2000);
                                    }
                                })
                                $(".roleRefuse").click(function(){
                                    $(".nv91-mask").show();
                                    $(".confirm").show(); 
                                })
                                
                            })
                           
                            //判断是否有查看权限
                        }if(obj.method === "get.dxWeb.webOperationDetails"){
                              //查看文章详情
                             $(".isLook").show();
                            $(".isLook").click(function(){
                                var id = $(this).attr("data-id");
                                par = "appsercet="+newAppsercet+"&method=get.dxWeb.webOperationDetails&articleId="+id;
                                var data = getSign(url,par);
                                
                                localStorage.setItem("textDetail",JSON.stringify(data));
                                localStorage.setItem("url",help);
                                localStorage.setItem("method","get.dxWeb.webOperationDetails");
                                console.log(data); 
                                location.href = "./AddText.html"
                            })
                            
                              
                               
                            }  
                            //判断是否有编辑权限
                           if(obj.method === "get.dxWeb.updateWebOperation"){
                                  
                            $(".isEdit").show();
                              $(".isEdit").click(function(){
                               
                                  var id = $(this).attr("data-id");
                                  par = "appsercet="+newAppsercet+"&method=get.dxWeb.webOperationDetails&articleId="+id;
                                var data = getSign(url,par);
                                localStorage.setItem("textDetail",JSON.stringify(data));
                                localStorage.setItem("url",help);
                                localStorage.setItem("method","get.dxWeb.updateWebOperation");
                                location.href = "./AddText.html";
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
            par = "appsercet=" + newAppsercet + "&method=get.dxWeb.deleteWebOperation&IdList=" + IdList;

            var data = getSign(url, par);
            if (data.msg.code == "200") {
                $(".confirm").hide(); 
                $(".nv1").show();
                setTimeout(function(){
                    $(".nv91-mask").hide();
                    $(".nv1").hide();
                   location.reload();
                },2000);
            }
        }
})