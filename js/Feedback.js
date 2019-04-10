$(document).ready(function(){
    function changeState(el) {
        if (el.readOnly) el.checked=el.readOnly=false;
        else if (!el.checked) el.readOnly=el.indeterminate=true;
    }
    //刚进入判断是那一部分显示
    var  type = localStorage.getItem("nowType1");
    if(type == "" || type == null || type == "undefined" || type == 1){
        
        $(".choose1").hide().eq(0).show();
        $(".lian").addClass("chooseActive");
        $(".lookType").removeClass("chooseActive"); 
        
    }else{
        $(".choose1").hide().eq(1).show();
        $(".lookType").addClass("chooseActive");
        $(".lian").removeClass("chooseActive");
    }
    $(".lian").click(function(){
        localStorage.setItem("nowType1",1);
    })
        $(".lookType").click(function(){
            localStorage.setItem("nowType1",2);
            debugger
             //查看投诉和反馈验证码设置详情
             var validate = document.querySelectorAll(".validate");//获取所有的input标签对象 
             var url = src + "/adminInterface.dx";
             par = "appsercet="+newAppsercet+"&method=get.dxWeb.querysetup&type=6";
             debugger
             var data = getSign(url,par); 
             console.log(data);
             for(var i = 0 ;i<validate.length;i++){
                 var obj = validate[i];
                 if(obj.value == data.msg.validate){
                     obj.checked = true;
                 }
             }
             
           
           
            
        }) 
        //调取时间选择
        //选项卡切换
         ////修改投诉和反馈功能设置
         $(".saveBtn").click(function(){
            debugger
            var value = $("input[name='radioll']:checked").val();
            var url = src + "/adminInterface.dx";
                par = "appsercet=" + newAppsercet + "&method=get.dxWeb.validate&validate=" + value;
                debugger
                var data = getSign(url, par);
                console.log(data);
                if(data.msg.code == "200"){
                    alert("修改成功");
                }
        })
        $(".chooseCard li").click(function(){
            var index = $(this).index();
            $(".chooseCard li").removeClass("chooseActive").eq(index).addClass("chooseActive");
            $(".choose1").hide().eq(index).show();
           
        });
            //功能设置弹窗关闭按钮点击
            $(".nv91-close").click(function(){
                $(".nv91-mask").fadeOut();
                $(".nv91").hide();
            })
            //弹窗关闭按钮点击
            $(".nv92-close").click(function(){
                $(".nv91-mask").fadeOut();
                $(".nv92").hide();
            })
            //导出数据到本地
            $(".export").click(function(){     
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
                    if (checkboxArray[i].checked)
                    IdList.push(checkboxArray[i].getAttribute("data-id"));
                }
                url = noapi + "/dxExportComplaint.dx";
                par = "IdList="+IdList;
                
                console.log(url+"?"+par);
                $(".export1").attr("href",url+"?"+par).click();
                // var data = getSign(url,par);
            })
    

 //页面初次渲染加载数据
 var data = window.localStorage.getItem("dxRightsList");    
data = JSON.parse(data);      
//console.log(data);
 var url,par,pageCount; 
 localStorage.setItem("pageNow1",1);   
 url = src + "/complaintInterface.dx";  
    var appsercet = window.localStorage.getItem("appsercet");
    appsercet = JSON.parse(appsercet);
    var newAppsercet = appsercet.data;
    var currentPage   = window.localStorage.getItem("pageNow1")
    par = "appsercet=" + newAppsercet + "&method=get.dxWeb.feedbackList&currentPage="+currentPage;     
            var data2 = getSign(url, par);
            console.log(data2);
            render(data2);
            pageChange("get.dxWeb.feedbackList",data2,"pagination10");
            function pageChange(method,data2,pagination){
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
            
            //通过用户名查找
            $(".openContent").click(function(){
                var content = $(".content").val();
                if(content == null || content == ""){
                    return
                }else{
                    url = src + "/complaintInterface.dx";  
                    par = "appsercet=" + newAppsercet + "&method=get.dxWeb.feedbackList&content="+content;
                    
                    var data2 = getSign(url, par);
                    render(data2);
                    
                }
            })
           //通过时间查找
             //通过用户名查找
             $(".time2").blur(function(){
                var starttime = $(".time1").val();
                var erdtime = $(".time2").val();
                if(starttime == null || starttime == ""){
                    return
                }else{
                    url = src + "/complaintInterface.dx";  
                    par = "appsercet=" + newAppsercet + "&method=get.dxWeb.feedbackList&starttime="+starttime+"&erdtime="+erdtime;
                    
                    var data2 = getSign(url, par);
                    render(data2);
                    
                }
            })
           
           
           
           
            var inputs = document.querySelectorAll(".t1");//获取所有的input标签对象  
            var tall = document.querySelector(".tall");
            if(tall.checked == true){
                
                var checkboxArray = [];//初始化空数组，用来存放checkbox对象。
                    for (var i = 0; i < inputs.length; i++) {
                    var obj = inputs[i];
                    obj.checked = true;
                }
            }
    function render(data2){
        if (data2.dxComplaintCateList.length > 0) {
            var str="";
            $(".feedback").html("");
            $.each(data2.dxComplaintCateList, function (i, obj) {
                str += "<tr style='border-bottom: 1px solid #d8d8d8;' data-id='" + obj.id + "'>";
                str += "<td><div class='checkbox checkbox-primary'><input type='checkbox' class='styled styled-primary t1' id='t" + i + "'  aria-label='Single checkbox Two'data-id='" + obj.id + "' ><label for='t" + i + "'>" + obj.complaint_name + "</label></div></td><td>" + obj.feedback_content + "</td><td>" + obj.ip_addr + "</td> <td>" + obj.create_time + "</td><td><a  style='color:#FF5456;'' class='details' data-id='" + obj.id + "'>详情</a></td>"
                str += "</tr> "
            })
            $(".feedback").html(str);
            judgePower();
        }
    }

//判断权限
function judgePower(){
    //页面初次渲染加载数据
 var data = window.localStorage.getItem("dxRightsList");    
data = JSON.parse(data);      
//console.log(data);
 var url,par;     
    var appsercet = window.localStorage.getItem("appsercet");
    appsercet = JSON.parse(appsercet);
    var newAppsercet = appsercet.data;
    var arr = [];
    $.each(data, function (i, item) {
        //console.log(item)
        if (item.id == 8) {
            arr.push(item)
        }
    })
    console.log(arr[0]);
    $.each(arr[0].dxRightsList, function (i, item) {
        //console.log(arr[0].dxRightsList)
        if (item.method === "get.dxWeb.feedbackList") {
            url = src + "/" + item.link_path;
            
            //判断该角色是否有权限操作
            if (item.dxRightsTwoList.length == 0) {
                return
            }
            else {
                $.each(item.dxRightsTwoList, function (i, obj) {
                    //判断该用户是否有查看权限
                    if (obj.method === "get.dxWeb.feedbackDetails") {
                        $(".details").show(); 
                         //管理反馈内容选项卡下详情点击事件
                        $(".details").click(function(){
                            var id = $(this).attr("data-id");
                            $(".nv91-mask").fadeIn();
                            $(".nv92").show();
                            par = "appsercet="+newAppsercet+"&method=get.dxWeb.feedbackDetails&id="+id;
                            url = src + "/complaintInterface.dx"
                            
                            var data = getSign(url,par);
                            $(".re1").html(data.msg.complaint_name);
                            $(".re2").html(data.msg.feedback_content);
                            $(".re3").html(data.msg.ip_addr);
                            $(".re4").html(data.msg.create_time);
                            $(".re5").html(data.msg.feedback_content);
                        })                     
                    }
                    //判断该用户是否有删除权限
                    if (obj.method === "get.dxWeb.deleteFfeedback") {
                        $(".isDelete").show(); 
                       $(".isDelete").click(function(){
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
                                if (checkboxArray[i].checked)
                                IdList.push(checkboxArray[i].getAttribute("data-id"));
                            }
                            url = src + "/complaintInterface.dx";
                            par = "IdList="+IdList+"&method=get.dxWeb.deleteFfeedback&appsercet="+newAppsercet;
                            var data = getSign(url,par);
                            if(data.msg.code == "200"){
                                location.reload();
                            }
                       })                   
                            }
                    //判断该用户是否有分类反馈查看类别权限 
                    if (obj.method === "get.dxWeb.dxComplaintCateList") {
                       $(".lookType").show(); 
                       url = src+"/complaintInterface.dx";
                       par = "appsercet="+newAppsercet+"&method=get.dxWeb.dxComplaintCateList";
                       
                       var data = getSign(url,par); 
                       console.log(data);
                       if(data.dxComplaintCateList.length > 0){
                           var str = "";
                           $(".double").html("");
                           $.each(data.dxComplaintCateList,function(i,item){
                            str+='<tr style="border-bottom: 1px solid #dddddd;">';
                            str+="<td>"+item.cate_name+"</td>"
                            if(item.state == 1){
                                str+="<td>文本框</td>";
                            }else{
                                str+="<td>复选框</td>";
                            }
                            
                            if(item.must_fill == 1){
                                str+="<td>&#10003;</td>";
                            }else{
                                str+="<td>&#10007;</td>";
                            }
                            if(item.enabled == 1){
                                str+="<td>&#10003;</td>";
                            }else{
                                str+="<td>&#10007;</td>";
                            }
                            str+='<td><a href="" style="color:#FF5456;" class="deleteType" data-id="'+item.id+'">删除</a></td>'
                            str+="</tr>";
                           })
                           $(".double").html(str);
                           
                       }                     
                    }
                    //判断是否有添加反馈类别权限
                    if (obj.method === "get.dxWeb.addDxComplaintCate") {
                        $(".addInput").show();
                         //功能设置添加留言项事件点击
                        $(".addInput").click(function(){
                            $(".nv91-mask").fadeIn();
                            $(".nv91").show();
                            $(".addProject").click(function(){
                                debugger
                                var cateName,state
                                cateName = $(".newProject").val();
                                var state  = document.querySelectorAll(".state");
                                if(state[0].checked ==true){
                                    state = 1;
                                }else{
                                    state = 2;
                                }
                                var state1  = document.querySelectorAll(".state1");
                                if(state1[0].checked == true){
                                    state1 = 1;
                                }else{
                                    state1 = 2;
                                }
                                var state2  = document.querySelectorAll(".state2");
                                if(state2[0].checked == true){
                                    state2 = 1;
                                }else{
                                    state2 = 0;
                                }
                               
                                url = src+"/complaintInterface.dx";
                                par = "appsercet="+newAppsercet+"&cateName="+cateName+"&state="+state+"&method=get.dxWeb.addDxComplaintCate&mustFill="+state1+"&enabled="+state2;
                                
                                var data = getSign(url,par);
                               debugger
                                if(data.msg.code == "200"){
                                    // 添加成功
                                    location.reload();
                                }
                            })
                           
                        });                        
                    }
                    //判断是否有删除反馈类别权限
                    if (obj.method === "get.dxWeb.deleteDxComplaintCate") {
                       $(".deleteType").show();
                       $('.deleteType').click(function(){
                           var id = $(this).attr("data-id");
                           url = src+"/complaintInterface.dx";
                        par = "appsercet="+newAppsercet+"&method=get.dxWeb.deleteDxComplaintCate&cateId="+id;
                        debugger
                        var data = getSign(url,par);
                        if(data.msg.code === "10"){
                            alert("删除成功");
                            par = "appsercet=" + newAppsercet + "&method=get.dxWeb.dxComplaintCateList";
                            var bannerList = getSign(url, par);
                            render(bannerList);
                        }
                       })
                       
                    }
                })
            }
        }
    })
}
})