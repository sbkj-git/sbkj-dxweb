$(document).ready(function(){
    function changeState(el) {
        if (el.readOnly) el.checked=el.readOnly=false;
        else if (!el.checked) el.readOnly=el.indeterminate=true;
    }
               
        //调取时间选择
        //选项卡切换
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
                var data = getSign(url,par);
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
            console.log(data2)
            pageCount = Math.ceil(data2.pageInfo.totalRows/10);
            $(".nowNum").html(currentPage);
            $(".pagenumber").html(pageCount)
            $(".totalCount").html(data2.pageInfo.totalRows);
            render1(data2);
            //通过用户名查找
            $(".openContent").click(function(){
                var content = $(".content").val();
                if(content == null || content == ""){
                    return
                }else{
                    par = "appsercet=" + newAppsercet + "&method=get.dxWeb.feedbackList&content="+content;
                    
                    var data2 = getSign(url, par);
                    render1(data2);
                    
                }
            })
           //通过时间查找

           
           
				// starttime       否           开始时间
                // erdtime         否           结束时间
            //查看投诉和反馈验证码设置详情
            var validate = document.querySelectorAll(".validate");//获取所有的input标签对象 
            var url = src + "/adminInterface.dx";
            par = "appsercet="+newAppsercet+"&method=get.dxWeb.querysetup&type=6";
            var data = getSign(url,par); 
            console.log(data);
            var obj = validate[0];
            var obj1 = validate[0];
            if(obj = data.msg.validate){
                obj.checked = true;
            }else{
                obj1.checked = true;
            }
            ////修改投诉和反馈功能设置
            $(".validate").change(function () {
                    if (validate[0].checked = true) {
                        validate = 1;
                    } else {
                        validate = 2;
                    }
                    var url = src + "/adminInterface.dx";
                    par = "appsercet=" + newAppsercet + "&method=get.dxWeb.validate&validate=" + validate;

                    var data = getSign(url, par);
                    console.log(data)
                })
            
           
            var inputs = document.querySelectorAll(".t1");//获取所有的input标签对象  
            var tall = document.querySelector(".tall");
            if(tall.checked = true){
                
                var checkboxArray = [];//初始化空数组，用来存放checkbox对象。
                    for (var i = 0; i < inputs.length; i++) {
                    var obj = inputs[i];
                    obj.checked = true;
                }
            }
    function render1(data2){
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
//分页
page("get.dxWeb.feedbackList");
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
                                var cateName,state
                                cateName = $(".newProject").val();
                                var state  = document.querySelectorAll(".state");
                                if(state[0].checked = true){
                                    state = 1;
                                }else{
                                    state = 2;
                                }
                                var state1  = document.querySelectorAll(".state1");
                                if(state1[0].checked = true){
                                    state1 = 1;
                                }else{
                                    state1 = 2;
                                }
                                var state2  = document.querySelectorAll(".state2");
                                if(state2[0].checked = true){
                                    state2 = 1;
                                }else{
                                    state2 = 0;
                                }
                               
                                url = src+"/complaintInterface.dx";
                                par = "appsercet="+newAppsercet+"&cateName="+cateName+"&state="+state+"&method=get.dxWeb.addDxComplaintCate&mustFill="+state1+"&enabled="+state2;
                                
                                var data = getSign(url,par);
                                return;
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
                        
                        var data = getSign(url,par);
                        if(data.mag.code === "200"){
                            alert("删除成功");
                            location.reload();
                        }
                       })
                       
                    }
                })
            }
        }
    })
}
})