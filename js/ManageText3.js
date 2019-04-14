
    $(document).ready(function(){
        function changeState(el) {
            if (el.readOnly) el.checked=el.readOnly=false;
            else if (!el.checked) el.readOnly=el.indeterminate=true;
        } 
         //管理文章页面表格数据渲染方法封装
         function render(data) {
             if(data.dxWebList){
                $(".textList").html("");
                if (data.dxWebList.length > 0) {
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
                    str+='</div></td><td>' + item.author + '</td><td>' + item.browse + '</td>';
                    if (item.is_ups == 1) {
                        str += "<td>&#10003;</td>";
                    } else {
                        str += "<td>&#10007;</td>"
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
                    par = "appsercet=" + newAppsercet + "&method=get.dxWeb.updateHelp&isUp=1&articleId="+id;
                  
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
                    par = "appsercet=" + newAppsercet + "&method=get.dxWeb.updateHelp&isUp=2&articleId="+id;
                   
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
           
        }
       
         //初次加载页面渲染表格数据
        var appsercet = window.localStorage.getItem("appsercet");
        appsercet = JSON.parse(appsercet);
        var newAppsercet = appsercet.data;
        url = src + "/helpInterface.dx"
        localStorage.setItem("pageNow1",1)
        var currentPage   = window.localStorage.getItem("pageNow1")
        par = "appsercet=" + newAppsercet + "&method=get.dxWeb.helpList&currentPage="+currentPage;
        var data2 = getSign(url, par); 
        render(data2);       
        pageChange("get.dxWeb.helpList",data2,"pagination4");
        var ind = 0;
        $(".sort").click(function(){
            debugger
            ind++;
            if (ind % 2 == 1) {
                par = "appsercet=" + newAppsercet + "&method=get.dxWeb.helpList&currentPage=" + currentPage + "&timeSort=1";
                var data2 = getSign(url, par);
                render(data2);       
        pageChange("get.dxWeb.helpList",data2,"pagination4");
            }else{
                par = "appsercet=" + newAppsercet + "&method=get.dxWeb.helpList&currentPage=" + currentPage + "&timeSort=2";
                var data2 = getSign(url, par);
                render(data2);       
                pageChange("get.dxWeb.helpList",data2,"pagination4");
            }
            
        })
        function pageChange(method,data2,pagination){
            var appsercet = window.localStorage.getItem("appsercet");
                appsercet = JSON.parse(appsercet);
                var newAppsercet = appsercet.data;
               pageJudge(data2);
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
             //渲染帮助文档下问题分类下拉框列表  此节点已经去掉
            //  par = "appsercet="+newAppsercet+"&method=get.dxWeb.cateAllList";
            //     var data1 = getSign(url,par);
            //     console.log(data1);
            //     if(data1.dxWebList.length > 0){
            //         var str = "";
            //         $(".changeSelect").html("");
            //         str+="<option value='0' selected data-id='0'>请选择</option>";
            //         $.each(data1.dxWebList,function(i,obj){
            //             str+="<option data-id='"+obj.cate_id+"' value='"+obj.cate_id+"'>"+obj.cate_name+"</option>"
            //         })
            //         $(".changeSelect").html(str);
            //     } 
            //进行判断
           
        //通过文章标题查看列表
        $(".titleText1").click(function () {
            var title1 = $(".titleText").val();
            par = "appsercet=" + newAppsercet + "&method=get.dxWeb.helpList&title=" + title1;
            if(title1 == "" || title1 == null){
                par = "appsercet=" + newAppsercet + "&method=get.dxWeb.helpList";
                data = getSign(url, par);
                render(data);
            }else {
            var data = getSign(url, par);
            render(data);
            pageJudge(data);
            if(data.msg && data.msg.codeMsg){
            
                $(".textList").html("");
                
            }
 
        }
            
        })
        //通过类别id查看列表
        var cateId;
        var changeSelect = document.querySelectorAll(".changeSelect option");
        $(".changeSelect").change(function () {
            var cateId = $(".changeSelect option:checked").attr("data-id");
            if(cateId == 0){
                par = "appsercet=" + newAppsercet + "&method=get.dxWeb.helpList";
                var data = getSign(url, par);
                render(data);
               
            } else {
                par = "appsercet=" + newAppsercet + "&method=get.dxWeb.helpList&cateId=" + cateId;
                var data = getSign(url, par);
                if (data.msg && data.msg.code == "200") {
                    $(".textList").html("");
                } else {
                    render(data);
                   
                }
            }
            
        })      
        //时间函数调用
        // Datetime();
       
  
    }) 
    //封装分页
    function pageJudge(data2){
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
                id: 'pagination4',
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
    }
    //进行增删改查操作后进行权限判断
    function judgePower(){
         //首先刚开始加载页面的时候从缓存中读取之前存入的 id  以及 method名
         var node = localStorage.getItem("node");
        node = JSON.parse(node);
        var method = node.method;
        var id = node.id;
        var url,par; 
        url = src + "/helpInterface.dx";
        var fileDom      
        var appsercet = window.localStorage.getItem("appsercet");
        appsercet = JSON.parse(appsercet);
        var appid = localStorage.getItem("appid");
        console.log(appid)
        var newAppsercet = appsercet.data;
        //从缓存中读取权限，判断是否有增删改查权限
        //页面初次渲染加载数据      
        var data = window.localStorage.getItem("dxRightsList");  
        data = JSON.parse(data);  
        var appsercet = window.localStorage.getItem("appsercet");
        appsercet = JSON.parse(appsercet);
        var newAppsercet = appsercet.data;
        //判断是否有添加管理员操作权限     
        // return
        var arr = [];
        $.each(data,function(i,item){
            //判断是否是从缓存中读取的id
            if(item.id == id){
                arr.push(item)
            }
        })
        //console.log(arr[0]); 
        $.each(arr[0].dxRightsList,function(i,item){
            // 判断是否是从缓存中读取的方法名
            if(item.method === method){
                
                //判断该角色是否有权限操作
                if(item.dxRightsTwoList.length == 0){
                    return
                }
                else{                 
                    $.each(item.dxRightsTwoList,function(i,obj){
                       //判断该用户是否有添加文档权限
                        if(obj.method === "get.dxWeb.addHelp"){  
                            
                            $(".addText").show();
                            $(".addText").click(function () {
                              
                                localStorage.setItem("url","/helpInterface.dx");
                                localStorage.setItem("method","get.dxWeb.addHelp")
                                location.href = "../nav2/AddText.html"
                            
                        })      
                    }                     
                            //判断是否有查看权限
                           if(obj.method === "get.dxWeb.helpDetails"){
                           $(".isLook").show();
                           $(".isLook").click(function(){
                               var id = $(this).attr("data-id");
                               var par = "appsercet="+newAppsercet+"&method=get.dxWeb.helpDetails&articleId="+id;
                               var data = getSign(url,par);
                               localStorage.setItem("textDetail",JSON.stringify(data));
                               localStorage.setItem("method","get.dxWeb.helpDetails");
                               localStorage.setItem("url","/helpInterface.dx");
                               location.href = "../nav2/AddText.html";
                           });

                        } 
                        //判断是否有删除权限
                        if(obj.method === "get.dxWeb.deleteHelp"){
                            $(".Delete").show();
                            $(".isDelete").show();
                            $(".Delete").click(function(){
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
                                $(".nv91-mask").show();
                                $(".confirm").show();
                                var IdList = $(this).attr("data-id");
                                $(".roleSure").click(function(){
                                    deleteText1(IdList);
                                   
                                })
                                $(".roleRefuse5").click(function(){
                                    $(".nv91-mask").hide();
                                    $(".confirm").hide(); 
                                })
                                
                            })

                        }    
                          //判断是否有编辑员工权限
                          if (obj.method === "get.dxWeb.updateHelp") {
                         $(".isEdit").show();
                         $(".isEdit").click(function(){
                             
                            var id = $(this).attr("data-id");
                               var par = "appsercet="+newAppsercet+"&method=get.dxWeb.helpDetails&articleId="+id;
                               var data = getSign(url,par);
                               console.log(data)
                               
                               localStorage.setItem("textDetail",JSON.stringify(data));
                               localStorage.setItem("method","get.dxWeb.updateHelp");
                               localStorage.setItem("url","/helpInterface.dx");
                               location.href = "../nav2/AddText.html";
                         })
                        }           
                    })                   
                }
            }
        })
    }
    //删除函数封装
    function deleteText1(IdList){
        var appsercet = window.localStorage.getItem("appsercet");
        appsercet = JSON.parse(appsercet);
        var newAppsercet = appsercet.data;
        var currentPage = localStorage.getItem("pageNow1");
        par = "appsercet=" + newAppsercet + "&method=get.dxWeb.deleteHelp&IdList=" + IdList;
        // var currentPage   = window.localStorage.getItem("pageNow1")
        var data = getSign(url, par);
        if (data.msg.code == "200") {
            $(".confirm").hide();
            $(".prompt span").text("删除成功");  
            $(".nv1").show();
            setTimeout(function(){
                $(".nv91-mask").hide();
                $(".nv1").hide();
                location.reload();
            },2000);
           
        }
    }
    function deleteText() {
         var appsercet = window.localStorage.getItem("appsercet");
        appsercet = JSON.parse(appsercet);
        var newAppsercet = appsercet.data;
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
            par = "appsercet=" + newAppsercet + "&method=get.dxWeb.deleteHelp&IdList=" + IdList;
            var data = getSign(url, par);
            console.log(data)
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

