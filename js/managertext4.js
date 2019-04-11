$(document).ready(function(){
    function changeState(el) {
        if (el.readOnly) el.checked=el.readOnly=false;
        else if (!el.checked) el.readOnly=el.indeterminate=true;
    }
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
    //获取分类列表
    url = src + "/skillInterface.dx";
    var appsercet = window.localStorage.getItem("appsercet");
        appsercet = JSON.parse(appsercet);
        var newAppsercet = appsercet.data;
        localStorage.setItem("pageNow1",1)     
        var currentPage   = window.localStorage.getItem("pageNow1")
    par = "appsercet=" + newAppsercet + "&method=get.dxWeb.skillList&currentPage="+currentPage;     
            var data2 = getSign(url, par);
            //初次加载页面数据
        render(data2);
            pageChange("get.dxWeb.skillList",data2,"pagination5");
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
    par="appsercet="+newAppsercet+"&method=get.dxWeb.cateAllList";
    var data = getSign(url,par);
    type(data);
    function type(data){
       if (data.dxWebList) {
        $(".changeSelect12").html("");
           if (data.dxWebList.length > 0) {
               var str = "";
               str+="<option value='0' selected data-id='0'>请选择</option>";
               $.each(data.dxWebList, function (i, obj) {
                   str += "<option data-id='" + obj.cate_id + "'>" + obj.cate_name + "</option>"
               })
               $(".changeSelect12").html(str);
           }
       }
        
    }
    //通过文章标题查看列表
    $(".titleText13").click(function () {
        var title1 = $(".titleText3").val();
        par = "appsercet=" + newAppsercet + "&method=get.dxWeb.skillList&title=" + title1;
       
        if(title1 == "" || title1 == null){
            par = "appsercet=" + newAppsercet + "&method=get.dxWeb.skillList";
            data = getSign(url, par);
            render(data);
        }else {
            var data = getSign(url, par);
            render(data);
            if(data.msg&&data.msg.codeMsg){
            
                $(".textList").html("");
                alert("没有数据");
            }
 
        }
        
        
    })
        //通过类别id查看列表
        var cateId;
        var changeSelect = document.querySelectorAll(".changeSelect12 option");
        $(".changeSelect12").change(function () {
            
            var cateId = $(".changeSelect12 option:checked").attr("data-id");
            if(cateId == 0){
                par = "appsercet=" + newAppsercet + "&method=get.dxWeb.skillList";
                var data = getSign(url, par);
                render(data);
               
            } else {
                par = "appsercet=" + newAppsercet + "&method=get.dxWeb.skillList&cateId=" + cateId;
                var data = getSign(url, par);
                if (data.msg && data.msg.code == "200") {
                    $(".textList").html("");
                } else {
                    render(data);
                   
                }
            }
            
        })      
        //时间函数调用
    //页面初次渲染加载数据
        par = "appsercet=" + newAppsercet + "&method=get.dxWeb.skillList" ;
        var data = getSign(url, par);
        render(data);
       
        console.log(data);
        

       
  //渲染表格
    function render(data) {
        if (data.dxWebList && data.dxWebList.length > 0) {
            $(".textList").html("");
            var str = "";
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
                str+='</div></td><td>"' + item.cate_name + '"</td><td>' + item.author + '</td><td>' + item.browse + '</td>';
                if (item.is_ups == 1) {
                    str += "<td>&#10003;</td>";
                } else {
                    str += "<td>&#10007;</td>"
                }
                str += '<td>' + item.release_time + '</td><td style="color:#FF5456;"><span class="isDelete" data-id="' + item.id + '">删除</span>&nbsp;&nbsp;<span data-id="' + item.id + '" class="isLook">查看</span>&nbsp;&nbsp;<span class="isEdit" data-id="' + item.id + '">编辑</span>';
                if (item.is_ups == 1) {
                    str+="&nbsp;&nbsp;<span class='toDown' data-id='" + item.id + "'>取消置顶</span></td>";
                } else {
                    str+="&nbsp;&nbsp;<span class='toTop ' data-id='" + item.id + "'>置顶</span>&nbsp;</td>";
                }
                str += "</tr>";
            })
            $(".textList").html(str);

            judgePower();
            //置顶与取消置顶
            $(".toTop").unbind('click').bind("click",function(){ 
              
                var index = $(this).index();
                
                var id = $(this).attr("data-id");
                par = "appsercet=" + newAppsercet + "&method=get.dxWeb.updateSkill&isUp=1&articleId="+id;
              
                var statu = getSign(url, par);
    
                if (statu.msg.code == "200") {
                    alert("置顶成功");
                    // $(".toTop").eq(index).hide();
                    location.reload();
    
                }
            })
            $(".toDown").unbind('click').bind("click",function(){ 
                
                var id = $(this).attr("data-id");
                par = "appsercet=" + newAppsercet + "&method=get.dxWeb.updateSkill&isUp=2&articleId="+id;
               
                var statu = getSign(url, par);
                if (statu.msg.code == "200") {
                    alert("取消置顶成功");
                    // $(".toDown").eq(index).hide();
                    location.reload();
    
                }
            })

        }
    }
    
//页面权限判断函数封装
    function judgePower() {
        //页面初次加载渲染页面
        var data = window.localStorage.getItem("dxRightsList");    
        data = JSON.parse(data);  
        var url, par;
        url = src +"/skillInterface.dx"
        var appsercet = window.localStorage.getItem("appsercet");
        appsercet = JSON.parse(appsercet);
        var newAppsercet = appsercet.data;
        //判断是否有添加管理员操作权限
        var arr = [];

        $.each(data, function (i, item) {
            //console.log(item)
            if (item.id == 4) {
                arr.push(item)
            }
        })
        console.log(arr[0]);
        $.each(arr[0].dxRightsList, function (i, item) {
            if (item.method === "get.dxWeb.skillList") {
                //判断该角色是否有权限操作
                if (item.dxRightsTwoList.length == 0) {
                    return
                }
                else {
                    $.each(item.dxRightsTwoList, function (i, obj) {
                        //判断该用户是否有添加权限
                        if (obj.method === "get.dxWeb.addSkill") {
                            $(".addText").show();
                            $(".addText").click(function () {
                                localStorage.setItem("method", "get.dxWeb.addSkill");
                                localStorage.setItem("url", "/skillInterface.dx");
                                location.href = "../nav2/AddText.html";
                            })

                        }
                        //判断该用户是否有删除权限 
                        if (obj.method === "get.dxWeb.deleteSkill") {
                            $(".Delete").show();
                            $(".isDelete").show();
                            $(".Delete").click(function () {
                                deleteText();
                            })
                            $(".isDelete").click(function () {
                                var id = $(this).attr("data-id");
                                par = "appsercet=" + newAppsercet + "&method=get.dxWeb.deleteSkill&IdList=" + id;
        
                                var data = getSign(url, par);
                                if (data.msg.code == "200") {
                                    alert("删除成功");
                                    location.reload();
                                }
                            })

                            //判断是否有查看权限
                        } if (obj.method === "get.dxWeb.skillDetails") {
                            //查看文章详情
                            $(".isLook").show();
                            $(".isLook").click(function () {
                                var id = $(this).attr("data-id");
                                
                                par = "appsercet=" + newAppsercet + "&method=get.dxWeb.skillDetails&articleId=" + id;
                                var data = getSign(url, par);
                                localStorage.setItem("textDetail", JSON.stringify(data));
                                localStorage.setItem("method", "get.dxWeb.skillDetails");
                                console.log(data);
                                localStorage.setItem("url", "/skillInterface.dx");
                                location.href = "../nav2/AddText.html"
                            })
                        }
                        //判断是否有编辑权限
                        if (obj.method === "get.dxWeb.updateSkill") {
                            $(".isEdit").show();
                            $(".isEdit").click(function () {
                                
                                var id = $(this).attr("data-id");
                                var par = "appsercet=" + newAppsercet + "&method=get.dxWeb.skillDetails&articleId=" + id;
                                var data = getSign(url, par);
                                localStorage.setItem("textDetail", JSON.stringify(data));
                                localStorage.setItem("url", "/skillInterface.dx");
                                localStorage.setItem("method", "get.dxWeb.updateSkill");
                                location.href = "../nav2/AddText.html";
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
        par = "appsercet=" + newAppsercet + "&method=get.dxWeb.deleteSkill&IdList=" + IdList;
        
        var data = getSign(url, par);
        if (data.msg.code == "200") {
            alert("删除成功");
            location.reload();
        }
    }
})