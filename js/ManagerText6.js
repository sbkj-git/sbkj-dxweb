$(document).ready(function(){
    function changeState(el) {
        if (el.readOnly) el.checked=el.readOnly=false;
        else if (!el.checked) el.readOnly=el.indeterminate=true;
    }
    $(".nv91-close").click(function(){
        $(".nv91-mask").hide();
        $(".nv91").hide();
    })
   
    //页面初次渲染加载数据
        url = src + "/noticeInterface.dx";
        localStorage.setItem("pageNow1",1);   
        var appsercet = window.localStorage.getItem("appsercet");
        appsercet = JSON.parse(appsercet);
        var newAppsercet = appsercet.data;
        var currentPage   = window.localStorage.getItem("pageNow1")
        par = "appsercet=" + newAppsercet + "&method=get.dxWeb.noticeList&currentPage="+currentPage;  
        var data2 = getSign(url, par);
        console.log(data2);
        render(data2);
        judgePower();
        pageChange("get.dxWeb.noticeList",data2,"pagination12");
        var ind = 0;
        $(".sort").click(function(){
            debugger
            ind++;
            if (ind % 2 == 1) {
                par = "appsercet=" + newAppsercet + "&method=get.dxWeb.noticeList&currentPage=" + currentPage + "&timeSort=1";
                var data2 = getSign(url, par);
                render(data2);       
        pageChange("get.dxWeb.noticeList",data2,"pagination12");
            }else{
                par = "appsercet=" + newAppsercet + "&method=get.dxWeb.noticeList&currentPage=" + currentPage + "&timeSort=2";
                var data2 = getSign(url, par);
                render(data2);       
                pageChange("get.dxWeb.noticeList",data2,"pagination12");
            }
            
        })
        function pageChange(method,data2,pagination){
            
            var appsercet = window.localStorage.getItem("appsercet");
                appsercet = JSON.parse(appsercet);
                var newAppsercet = appsercet.data;
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
                    par = "appsercet=" + newAppsercet + "&method="+method+"&currentPage=" + currentPage;
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
                        par = "appsercet=" + newAppsercet + "&method="+method+"&currentPage=" + currentPage;
        
                        var data2 = getSign(url, par);
                        render(data2);
                        $(this).val("");
                    }
                })
        }
      
 //通过文章标题查看列表
    $(".titleText4").click(function () {
        var title1 = $(".titleText14").val();
        par = "appsercet=" + newAppsercet + "&method=get.dxWeb.noticeList&title=" + title1;
        var data = getSign(url, par);

        if (data.msg && data.msg.code == "200") {
            
            $(".textList").html("");
        } else {
            render(data);   
        }
    })
    
    
    
        // //批量操作
        function t1(){
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
            return  IdList;
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
                par = "appsercet=" + newAppsercet + "&method=get.dxWeb.delNotice&IdList=" + IdList;
                
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
//渲染表格
    function render(data) {
        if (data.dxWebList&&data.dxWebList.length > 0) {
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
                str+='</div></td><td>' + item.author + '</td>';
              
                str += '<td>' + item.release_time + '</td><td style="color:#FF5456;"><span class="isDelete" data-id="' + item.id + '">删除</span>&nbsp;&nbsp;<span data-id="' + item.id + '" class="isLook">查看</span>&nbsp;&nbsp;<span class="isEdit" data-id="' + item.id + '">编辑</span></td>';
                
                str += "</tr>";
            })
            $(".textList").html(str);
            judgePower();
            $(".toTop").unbind('click').bind("click",function(){ 
              
                var index = $(this).index();
                
                var id = $(this).attr("data-id");
                par = "appsercet=" + newAppsercet + "&method=get.dxWeb.updateQAndA&isUp=1&articleId="+id;
              
                var statu = getSign(url, par);
    
                if (statu.msg.code == "200") {
                    $(".confirm").hide();
                        $(".prompt").text("操作成功");
                        $(".nv91-mask").show();
                        $(".nv1").show();
                        setTimeout(function () {
                            $(".nv91-mask").hide();
                            $(".nv1").hide();
                            location.reload();

                        }, 2000);
    
                }
            })
            $(".toDown").unbind('click').bind("click",function(){ 
                
                var id = $(this).attr("data-id");
                par = "appsercet=" + newAppsercet + "&method=get.dxWeb.updateQAndA&isUp=2&articleId="+id;
               
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
    }
//判断权限
function judgePower(){
    //页面初次加载渲染页面
     
    var url,par;  
    url = src +"/noticeInterface.dx"    
        var appsercet = window.localStorage.getItem("appsercet");
        appsercet = JSON.parse(appsercet);
        var newAppsercet = appsercet.data;
        // url = src + "/qAndAInterface.dx"
        //判断是否有添加管理员操作权限
        var data = window.localStorage.getItem("dxRightsList");    
        data = JSON.parse(data); 
        debugger
        var arr = [];
        $.each(data,function(i,item){
            //console.log(item)
            if(item.id == 6){
                arr.push(item)
            }
        })
        console.log(arr[0]);
        $.each(arr[0].dxRightsList,function(i,item){
            debugger
            //console.log(arr[0].dxRightsList)
            url = src + "/" +item.link_path
            if(item.method === "get.dxWeb.noticeList"){
               
                //判断该角色是否有权限操作
                if(item.dxRightsTwoList.length == 0){
                    return
                }
                else{
                    $.each(item.dxRightsTwoList,function(i,obj){
                       //判断该用户是否有添加权限
                        if(obj.method === "get.dxWeb.addNotice"){
                            $(".addText").show();
                            $(".addText").click(function(){
                                $(this).addClass("btn-primary");
                                $(".Delete").removeClass("btn-primary");
                            localStorage.setItem("method","get.dxWeb.addNotice");
                            localStorage.setItem("url","/noticeInterface.dx");
                            location.href = "../nav2/AddText.html";
                          })
                          
                            }
                        //判断该用户是否有删除权限 
                        debugger
                        if(obj.method === "get.dxWeb.delNotice"){
                            debugger
                            $(".Delete").show();
                            $(".isDelete").show();
                            $(".Delete").click(function(){
                                $(this).addClass("btn-primary");
                                $(".addText").removeClass("btn-primary");
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
                                $(".roleRefuse5").click(function(){
                                    $(".nv91-mask").hide();
                                    $(".confirm").hide(); 
                                })
                            } 
                            })
                           
                            $(".isDelete").click(function () {
                                debugger
                                $(".nv91-mask").show();
                                $(".confirm").show();
                                var IdList = $(this).attr("data-id");
                                $(".roleSure").click(function(){
                                    
                                    par = "appsercet=" + newAppsercet + "&method=get.dxWeb.delNotice&IdList=" + IdList;
    
                                    var data = getSign(url, par);
                                    if (data.msg.code == "200") {
                                        $(".confirm").hide(); 
                                        $(".nv1").show();
                                        setTimeout(function(){
                                            $(".nv91-mask").hide();
                                            $(".nv1").hide();
                                           location.reload();
                                        },2000);
                                    }else{
                                        $(".confirm").hide(); 
                                        $(".nv3").show();
                                        setTimeout(function(){
                                            $(".nv91-mask").hide();
                                            $(".nv3").hide();
                                        },2000);
                                    }
                                })
                                $(".roleRefuse5").click(function(){
                                    $(".nv91-mask").hide();
                                    $(".confirm").hide(); 
                                })
                                
                            })
                           
                            //判断是否有查看权限
                        }if(obj.method === "get.dxWeb.noticeDetails"){
                              //查看文章详情
                             $(".isLook").show();
                            $(".isLook").click(function(){
                                
                                var id = $(this).attr("data-id");
                                par = "appsercet="+newAppsercet+"&method=get.dxWeb.noticeDetails&articleId="+id;
                                var data = getSign(url,par);
                                localStorage.setItem("textDetail",JSON.stringify(data));
                                localStorage.setItem("method","get.dxWeb.noticeDetails");
                                console.log(data); 
                                location.href = "../nav2/AddText.html"
                            })  
                            }  
                            //判断是否有编辑权限
                           if(obj.method === "get.dxWeb.updateNotice"){
                            $(".isEdit").show();
                         $(".isEdit").click(function(){
                             
                            var id = $(this).attr("data-id");
                               var par = "appsercet="+newAppsercet+"&method=get.dxWeb.noticeDetails&articleId="+id;
                               var data = getSign(url,par);
                               localStorage.setItem("textDetail",JSON.stringify(data));
                               localStorage.setItem("method","get.dxWeb.updateNotice");
                               localStorage.setItem("url","/noticeInterface.dx");
                               location.href = "../nav2/AddText.html";
                         })      

                                }   
                                          
                                          
                    })
                    
                }
            }
          
        })
        
}
})