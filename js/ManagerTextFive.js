$(document).ready(function(){
    function changeState(el) {
        if (el.readOnly) el.checked=el.readOnly=false;
        else if (!el.checked) el.readOnly=el.indeterminate=true;
    }
    $("#date1").dateSelect();
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
    //页面初次渲染加载数据
        url = src + "/qAndAInterface.dx";
        localStorage.setItem("pageNow1",1);   
        var appsercet = window.localStorage.getItem("appsercet");
        appsercet = JSON.parse(appsercet);
        var newAppsercet = appsercet.data;
        var currentPage   = window.localStorage.getItem("pageNow1")
        par = "appsercet=" + newAppsercet + "&method=get.dxWeb.qAndAList&currentPage="+currentPage;  
        var data2 = getSign(url, par);
        console.log(data2);
        render(data2);
        judgePower();
        pageChange("get.dxWeb.qAndAList",data2,"pagination7");
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
                    
                    var value = $(this).html();

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
       
        //获取对应产品
        par="appsercet="+newAppsercet+"&method=get.dxWeb.cateAllList";
        
    var data = getSign(url,par);
    
    type(data);
    var productId
   
    function type(data){
       if (data.dxWebList) {
        $(".changeSelect13").html("");
           if (data.dxWebList.length > 0) {
               var str = "";
               str+="<option value='0' selected data-id='0'>请选择</option>";
               $.each(data.dxWebList, function (i, obj) {
                   str += "<option data-id='" + obj.product_id + "'>" + obj.product_name + "</option>"
               })
               $(".changeSelect13").html(str);
           }
       }
        
    }
    
 //通过文章标题查看列表
    $(".titleText4").click(function () {
        var title1 = $(".titleText14").val();
        par = "appsercet=" + newAppsercet + "&method=get.dxWeb.qAndAList&title=" + title1;
        var data = getSign(url, par);

        if (data.msg && data.msg.code == "200") {
            alert("没有数据");
            $(".textList").html("");
        } else {
            render(data);   
        }
    })
    //渲染问题分类下拉框
   function question(data){
    if (data.dxWebList) {
        $(".changeSelect14").html("");
         if (data.dxWebList.length > 0) {
             var str = "";
             str+="<option value='0' >请选择</option>";
             $.each(data.dxWebList, function (i, obj) {
                 str += "<option data-id='" + obj.cate_id + "'>" + obj.cate_name + "</option>"
             })
             $(".changeSelect14").html(str);
         }
     }

 }  
    //通过类别id查看列表
    var cateId,productId;
        var changeSelect = document.querySelectorAll(".changeSelect13 option");
        $(".changeSelect13").change(function () {
            
            $(".changeSelect14").html("<option value='0' >请选择</option>")
            productId = $(".changeSelect13 option:checked").attr("data-id");
                
            par = "appsercet=" + newAppsercet + "&method=get.dxWeb.cateTwoAllList&productId=" + productId;
            var data1 = getSign(url, par);
            question(data1);
        })
        $(".changeSelect13").change(function () {
            
           
           
            if(productId == 0){
                par = "appsercet=" + newAppsercet + "&method=get.dxWeb.qAndAList";
                var data = getSign(url, par);
                render(data);
               
            } else {
                par = "appsercet=" + newAppsercet + "&method=get.dxWeb.qAndAList&productId=" + productId;
                var data = getSign(url, par);
                if (data.msg && data.msg.code == "200") {
                    $(".textList").html("");
                } else {
                    render(data);
                    
                }
            }
            
        })
        //二级问题列表页查询
        $(".changeSelect14").change(function () {
            
            cateId = $(".changeSelect14 option:checked").attr("data-id");
            if(cateId == 0){
                par = "appsercet=" + newAppsercet + "&method=get.dxWeb.qAndAList";
                var data = getSign(url, par);
                render(data);
               
            } else {
                par = "appsercet=" + newAppsercet + "&method=get.dxWeb.qAndAList&cateId=" + cateId;
                var data = getSign(url, par);
                if (data.msg && data.msg.code == "200") {
                    $(".textList").html("");
                } else {
                    render(data);
                    
                }
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
       
            $(".operater").change(function(){
                
                
                var val = $(".operater option:checked").val();
                if(val == 1){
                    //展示发布日期弹框
                    $(".nv91-mask").show();
                    $(".nv91").show();
                    $(".addType").click(function () {
                        
                        var IdList = t1();
                        var releaseTime = $(".releaseTime").val();
                        par = "method=get.dxWeb.batchUpdateQAndA&appsercet=" + newAppsercet + "&IdList=" + IdList + "&releaseTime=" + releaseTime;
                        var data = getSign(url, par);
                        if (data.msg.code == "200") {
                            alert("操作成功");
                            location.reload();
                        }else{
                            alert("操作失败");
                            location.reload();  
                        }

                    })
                   
                }
                if(val == 2){
                    //展示来源弹框
                    $(".nv91-mask").show();
                    $(".nv92").show();
                    $(".addType").click(function () {
                        var IdList = t1();
                        var source = $(".source").val();
                        par = "method=get.dxWeb.batchUpdateQAndA&appsercet=" + newAppsercet + "&IdList=" + IdList + "&source=" + source;
                        var data = getSign(url, par);
                        if (data.msg.code == "200") {
                            alert("操作成功");
                            location.reload();
                        }
                    })
                    
                }
                if(val == 3){
                    //展示作者弹框
                    $(".nv91-mask").show();
                    $(".nv93").show();
                    $(".addType").click(function () {
                        var IdList = t1();
                        var author = $(".author").val();
                        par = "method=get.dxWeb.batchUpdateQAndA&appsercet=" + newAppsercet + "&IdList=" + IdList + "&author=" + author;
                        var data = getSign(url, par);
                        if (data.msg.code == "200") {
                            alert("操作成功");
                            location.reload();
                        }
                    })
                    
                }
                
            })
           
      
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
                par = "appsercet=" + newAppsercet + "&method=get.dxWeb.deleteQAndA&IdList=" + IdList;
                
                var data = getSign(url, par);
                if (data.msg.code == "200") {
                    alert("删除成功");
                    location.reload();
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
                str+='</div></td><td>"' + item.product_name + '"</td><td>' + item.classify_name+ '</td><td>' + item.author + '</td>';
                if (item.is_ups == 1) {
                    str += "<td>&#10003;</td>";
                } else {
                    str += "<td>&#10007;</td>"
                }
                str+='<td>' + item.browse + '</td>';
                if (item.is_ups == 1) {
                    str+="&nbsp;&nbsp;<span class='toDown' data-id='" + item.id + "'>取消置顶</span></td>";
                } else {
                    str+="&nbsp;&nbsp;<span class='toTop ' data-id='" + item.id + "'>置顶</span>&nbsp;</td>";
                }
                str += '<td>' + item.release_time + '</td><td style="color:#FF5456;"><span class="isDelete" data-id="' + item.id + '">删除</span>&nbsp;&nbsp;<span data-id="' + item.id + '" class="isLook">查看</span>&nbsp;&nbsp;<span class="isEdit" data-id="' + item.id + '">编辑</span>'
                if (item.is_ups == 1) {
                    str+="&nbsp;&nbsp;<span class='toDown' data-id='" + item.id + "'>取消置顶</span></td>";
                } else {
                    str+="&nbsp;&nbsp;<span class='toTop ' data-id='" + item.id + "'>置顶</span>&nbsp;</td>";
                }
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
                    alert("置顶成功");
                    // $(".toTop").eq(index).hide();
                    location.reload();
    
                }
            })
            $(".toDown").unbind('click').bind("click",function(){ 
                
                var id = $(this).attr("data-id");
                par = "appsercet=" + newAppsercet + "&method=get.dxWeb.updateQAndA&isUp=2&articleId="+id;
               
                var statu = getSign(url, par);
                if (statu.msg.code == "200") {
                    alert("取消置顶成功");
                    // $(".toDown").eq(index).hide();
                    location.reload();
    
                }
            })

        }
    }
//判断权限
function judgePower(){
    //页面初次加载渲染页面
    var data = window.localStorage.getItem("dxRightsList");    
        data = JSON.parse(data);  
    var url,par;  
    url = src +"/qAndAInterface.dx"    
        var appsercet = window.localStorage.getItem("appsercet");
        appsercet = JSON.parse(appsercet);
        var newAppsercet = appsercet.data;
        // url = src + "/qAndAInterface.dx"
        //判断是否有添加管理员操作权限
        var arr = [];
        $.each(data,function(i,item){
            //console.log(item)
            if(item.id == 5){
                arr.push(item)
            }
        })
        console.log(arr[0]);
        $.each(arr[0].dxRightsList,function(i,item){
            //console.log(arr[0].dxRightsList)

            if(item.method === "get.dxWeb.qAndAList"){
               
                //判断该角色是否有权限操作
                if(item.dxRightsTwoList.length == 0){
                    return
                }
                else{
                    $.each(item.dxRightsTwoList,function(i,obj){
                       //判断该用户是否有添加权限
                        if(obj.method === "get.dxWeb.addQAndA"){
                            $(".addText").show();
                            $(".addText").click(function(){
                            localStorage.setItem("method","get.dxWeb.addQAndA");
                            localStorage.setItem("url","/qAndAInterface.dx");
                            location.href = "../nav2/AddText.html";
                          })
                          
                            }
                        //判断该用户是否有删除权限 
                        if(obj.method === "get.dxWeb.deleteQAndA"){
                            $(".Delete").show();
                            $(".isDelete").show();
                            $(".Delete").click(function(){
                                deleteText();
                            })
                            $(".isDelete").click(function(){
                                var id = $(this).attr("data-id");

                                par = "appsercet=" + newAppsercet + "&method=get.dxWeb.deleteQAndA&IdList=" + id;
                
                                var data = getSign(url, par);
                                if (data.msg.code == "200") {
                                    alert("删除成功");
                                    location.reload();
                                }                              
                            })
                           
                            //判断是否有查看权限
                        }if(obj.method === "get.dxWeb.qAndADetails"){
                              //查看文章详情
                             $(".isLook").show();
                            $(".isLook").click(function(){
                                
                                var id = $(this).attr("data-id");
                                par = "appsercet="+newAppsercet+"&method=get.dxWeb.qAndADetails&articleId="+id;
                                var data = getSign(url,par);
                                localStorage.setItem("textDetail",JSON.stringify(data));
                                localStorage.setItem("method","get.dxWeb.qAndADetails");
                                console.log(data); 
                                location.href = "../nav2/AddText.html"
                            })  
                            }  
                            //判断是否有编辑权限
                           if(obj.method === "get.dxWeb.updateQAndA"){
                            $(".isEdit").show();
                         $(".isEdit").click(function(){
                             
                            var id = $(this).attr("data-id");
                               var par = "appsercet="+newAppsercet+"&method=get.dxWeb.qAndADetails&articleId="+id;
                               var data = getSign(url,par);
                               localStorage.setItem("textDetail",JSON.stringify(data));
                               localStorage.setItem("method","get.dxWeb.updateQAndA");
                               localStorage.setItem("url","/qAndAInterface.dx");
                               location.href = "../nav2/AddText.html";
                         })      

                                }   
                                          
                                          
                    })
                    
                }
            }
          
        })
        
}
})