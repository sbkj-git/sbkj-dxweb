$(document).ready(function(){
       //进入页面判断是否有设置权限如果没有设置权限右上角权限不显示
       var data = localStorage.getItem("dxRightsList");
      data = JSON.parse(data);
      var arr = [];
        $.each(data,function(i,item){
            //console.log(item)
            if(item.id == 9){
                $(".selectDown .p3").show();
            }else{
                $(".selectDown .p3").show(); 
            }
        })
        //个人信息四个节点跳转
        $(".p1").click(function () {
            $("#iframe").attr("src", "./UpdatePerson.html");
            $("#iframe1").attr("src", "./UpdatePerson.html");
        })
        $(".p2").click(function () {
            $("#iframe").attr("src", "./ResetPassword.html");
            $("#iframe1").attr("src", "./ResetPassword.html");
        })
        $(".p3").click(function () {
            $("#iframe").attr("src", "./nav9/Opeara.html");
            $("#iframe1").attr("src", "./nav9/Opeara.html");
        })
        $(".p4").click(function () {
            $("#iframe").attr("src", "./nav9/setting.html");
            $("#iframe1").attr("src", "./nav9/setting.html");
        })
        $(".set").click(function(){
            $("#iframe").attr("src", "./nav9/setting.html");
            $("#iframe1").attr("src", "./nav9/setting.html"); 
        })
        //右上角点击退出
        //点击跳转到设置页面
        $(".set").click(function(){
            $(".set").addClass("dis").eq(1).removeClass("dis");
            setTimeout(function(){
                $(".set").addClass("dis").eq(0).removeClass("dis");
            },2000);
            $("#iframe").attr("src", "./nav9/setting.html");
            $("#iframe1").attr("src", "./nav9/setting.html"); 
        })
        //获取缓存中存入的姓名
        var user_name = localStorage.getItem("user_name");
        var user_photo = localStorage.getItem("user_photo");
        var username = localStorage.getItem("username");
        
        var truename = localStorage.getItem("true_name");

        $(".himg").attr("src",user_photo);
        $(".person").html(truename);
        var type = localStorage.getItem("type");
        $(".back").click(function () {
            par = "username=" + username + "&type=" + type + "&method=get.dxWeb.logout";
            var data = getSign(log, par);

            if (data.msg.code == "200") {
                refer();
            }
        })
        //iframe自适应高度
        function changeFrameHeight() {
            var ifm = document.getElementById("iframe");
            ifm.height = document.documentElement.clientHeight - 60;
        }
        window.onresize = function () { changeFrameHeight(); }
        $(function () { changeFrameHeight(); });
        //监听用户一个小时没有进行操作清除缓存返回到登录页面
        function refer() {
            location.href = "./login1.html";
            localStorage.clear();
            // sessionStorage.clear();
        }
        hasOperate(refer, 36000000);
        //左侧栏导航数据获取
        var data = window.localStorage.getItem("dxRightsList");
        data = JSON.parse(data);
        var str = "";
        var str1 = "";
        var str2 = "";
        // 左侧栏导航渲染
        $.each(data, function (i, item) {
            if (item.dxRightsList.length == 0) {
                return
            } else {
                if(item.id == 8){
                    str1 += "<li id='" + item.id + "'><img src='./image/lf" + item.id + ".png' alt='' style='width:20px;height:15px;'></li>"
                }
                else{
                    str1 += "<li id='" + item.id + "'><img src='./image/lf" + item.id + ".png' alt='' style='width:20px;height:20px;'></li>"
                }
               
                str += "<li class='treeview' id='" + item.id + "'><a style='color:#fff;'><i class='fa fa-dashboard'>";
                if(item.id == 8){
                    str+="<img src='./image/lf" + item.id + ".png' style='width:20px;height:15px;margin:0 10px 0 26px'/>"
                }else if(item.id == 3){
                    str+="<img src='./image/lf" + item.id + ".png' style='width:20px;height:20px;margin:-5px 10px 0 26px'/>"
                }
                else{
                    str+="<img src='./image/lf" + item.id + ".png' style='width:20px;height:20px;margin:0 10px 0 26px'/>"
                }
               
                str+="</i> <span>" + item.name + "</span> <i class='fa fa-angle-right pull-right'></i></a>"
                str += "<ul class='treeview-menu'>";
                str2 += "<div class='nav-slide-o'><ul>";

            }

            $.each(item.dxRightsList, function (i, LittleItem) {

                str2 += "<li><span data-id='" + LittleItem.method + "'>" + LittleItem.name + "</span></li>"
                if (LittleItem.method == "") {
                    str += "<li><a ><i class='fa fa-circle-o' data-id='" + LittleItem.link_path + "'>" + LittleItem.name + "</i></a></li>"
                } else {
                    str += "<li><a ><i class='fa fa-circle-o' data-id='" + LittleItem.method + "'>" + LittleItem.name + "</i></a></li>"
                }

            })
            str2 += "</ul></div>"
            str += "</ul>"
        })
        str += "</li>";
        $(".nav-ul").append(str1);
        $(".nav-slide").append(str2);
        $(".sidebar-menu").append(str);
        //左侧栏 导航动效
        $.sidebarMenu($('.sidebar-menu'));
        //左侧栏导航点击事件跳转页面
        $("#1 .treeview-menu li a i").click(function () {
            var index = $(this).index();
            var value = $(this).attr("data-id")
            if (value == "get.dxWeb.webSurvey") {
                $("#iframe").attr("src", "./nav1/aboutWeb.html");
                window.localStorage.setItem("title", "统计");
                localStorage.setItem("url", "/dxVisitInterface.dx");
                window.localStorage.setItem("method", "get.dxWeb.webSurvey");
            }
            if (value == "get.dxWeb.columnStatistics") {
                $("#iframe").attr("src", "./nav1/Column.html");
                window.localStorage.setItem("method", "get.dxWeb.columnStatistics");
                window.localStorage.setItem("title", "栏目统计");
                localStorage.setItem("url", "/dxVisitInterface.dx");
            }
            if (value == "get.dxWeb.helpStatistics") {
                $("#iframe").attr("src", "./nav1/Column.html");
                window.localStorage.setItem("title", "帮助文档统计");
                window.localStorage.setItem("method", "get.dxWeb.helpStatistics");
                localStorage.setItem("url", "/dxVisitInterface.dx");
    
            }
            if (value == "get.dxWeb.articleSurvey") {
                $("#iframe").attr("src", "./nav1/Column.html");
                window.localStorage.setItem("title", "文章统计");
                window.localStorage.setItem("method", "get.dxWeb.articleSurvey");
                localStorage.setItem("url", "/dxVisitInterface.dx");
    
            }
        });
        
        $("#9 .treeview-menu li a i").click(function () {
            var index = $(this).index();
            var value = $(this).attr("data-id");
            if (value == "get.dxWeb.basics") {
                $("#iframe").attr("src", "./nav9/setting.html");
            }
            if (value == "get.dxWeb.managementRoles") {
                $("#iframe").attr("src", "./nav9/manager.html")
            }
            if (value == "get.dxWeb.operation") {
                $("#iframe").attr("src", "./nav9/Opeara.html");
            }
            if (value == "get.dxWeb.logList") {
                $("#iframe").attr("src", "./nav9/Log.html")
            }
        })
        $("#2 .treeview-menu li a i").click(function () {
            var index = $(this).index();
            var value = $(this).attr("data-id")
            if (value == "get.dxWeb.websetup") {
                $("#iframe").attr("src", "./nav2/FunctionSet.html");
                window.localStorage.setItem("title", "网站运营");
                window.localStorage.setItem("url", "get.dxWeb.websetup");
            }
            if (value == "get.dxWeb.bannerList") {
                $("#iframe").attr("src", "./nav2/BannerManager.html")
            }
            if (value == "get.dxWeb.addWebOperation") {
                $("#iframe").attr("src", "./nav2/AddText.html");
                window.localStorage.setItem("method", "get.dxWeb.addWebOperation");
                localStorage.setItem("url", "/webInterface.dx");

            }
            if (value == "get.dxWeb.webOperationList") {
                $("#iframe").attr("src", "./nav2/ManagerText.html");
                //将此时的正在点击页面的方法 以及此时正在点击的是哪个节点暂放缓存
                localStorage.setItem("node", JSON.stringify({ "method": "get.dxWeb.webOperationList", "id": 2 }));
            }
            if (value == "get.dxWeb.webBottomList") {
                $("#iframe").attr("src", "./nav2/ManageCompany.html");
            }

        })
        $("#3 .treeview-menu li a i").click(function () {
            var index = $(this).index();
            var value = $(this).attr("data-id")
            if (value == "get.dxWeb.tesetup") {
                $("#iframe").attr("src", "./nav2/FunctionSet.html");
                window.localStorage.setItem("title", "帮助文档");
                window.localStorage.setItem("url", "get.dxWeb.tesetup");
            }
            if (value == "get.dxWeb.addHelp") {
                $("#iframe").attr("src", "./nav2/AddText.html");
                window.localStorage.setItem("url", "/helpInterface.dx");
                localStorage.setItem("method", "get.dxWeb.addHelp");
            }
            if (value == "get.dxWeb.helpList") {
                $("#iframe").attr("src", "./nav3/ManagerTextThree.html");
                //将此时的正在点击页面的方法 以及此时正在点击的是哪个节点暂放缓存
                localStorage.setItem("node", JSON.stringify({ "method": "get.dxWeb.helpList", "id": 3 }));
            }
            if (value == "get.dxWeb.cateList") {
                $("#iframe").attr("src", "./nav3/TextDivide.html");
                localStorage.setItem("node", JSON.stringify({ "id": 3 }));

            }
        })
        $("#4 .treeview-menu li a i").click(function () {
            var index = $(this).index();
            var value = $(this).attr("data-id")
            if (value == "get.dxWeb.helpsetup") {
                $("#iframe").attr("src", "./nav2/FunctionSet.html");
                window.localStorage.setItem("title", "技术文档");
                window.localStorage.setItem("url", "get.dxWeb.helpsetup");
            }
            if (value == "get.dxWeb.addSkill") {
                $("#iframe").attr("src", "./nav2/AddText.html");
                window.localStorage.setItem("url", "/skillInterface.dx");
                localStorage.setItem("method", "get.dxWeb.addSkill");
            }
            if (value == "get.dxWeb.skillList") {
                $("#iframe").attr("src", "./nav4/ManagerTextFour.html");
                //将此时的正在点击页面的方法 以及此时正在点击的是哪个节点暂放缓存
                localStorage.setItem("node", JSON.stringify({ "method": "get.dxWeb.skillList", "id": 4 }));
            }
            if (value == "get.dxWeb.cateList") {
                $("#iframe").attr("src", "./nav3/TextDivide.html");
                localStorage.setItem("node", JSON.stringify({ "id": 4 }));
            }
        })
        $("#5 .treeview-menu li a i").click(function () {
            var index = $(this).index();
            var value = $(this).attr("data-id")
            if (value == "get.dxWeb.qsetup") {
                $("#iframe").attr("src", "./nav2/FunctionSet.html");
                window.localStorage.setItem("title", "Q&A文档");
                window.localStorage.setItem("url", "get.dxWeb.qsetup");

            }
            if (value == "get.dxWeb.addQAndA") {
                $("#iframe").attr("src", "./nav2/AddText.html");
                window.localStorage.setItem("url", "/qAndAInterface.dx");
                localStorage.setItem("method", "get.dxWeb.addQAndA");

            }
            if (value == "get.dxWeb.qAndAList") {
                $("#iframe").attr("src", "./nav5/ManagerTextFive.html");
                //将此时的正在点击页面的方法 以及此时正在点击的是哪个节点暂放缓存
                localStorage.setItem("node", JSON.stringify({ "method": "get.dxWeb.qAndAList", "id": 5 }));
            }
            if (value == "get.dxWeb.cateTwoList") {
                $("#iframe").attr("src", "./nav5/TextDivideFive.html")
            }
        })
        $("#6 .treeview-menu li a i").click(function () {
            var index = $(this).index();
            var value = $(this).attr("data-id")
            
            if (value == "get.dxWeb.addNotice") {
                $("#iframe").attr("src", "./nav2/AddText.html");
                window.localStorage.setItem("url", "/noticeInterface.dx");
                localStorage.setItem("method", "get.dxWeb.addNotice");

            }
            if (value == "get.dxWeb.noticeList") {
                $("#iframe").attr("src", "./nav6/ManagerTextSix.html");
                //将此时的正在点击页面的方法 以及此时正在点击的是哪个节点暂放缓存
                localStorage.setItem("node", JSON.stringify({ "method": "get.dxWeb.noticeList", "id": 6 }));
            }
            
        })
        $("#7 .treeview-menu li a i").click(function () {
            var index = $(this).index();
            var value = $(this).attr("data-id")
            if (value == "get.dxWeb.queryFileAll") {
                $("#iframe").attr("src", "./nav7/Resource.html");
            }
            if (value == "get.dxWeb.libraryList") {
                $("#iframe").attr("src", "./nav7/ManagerFile.html")
            }
        })
        $("#8 .treeview-menu li a i").click(function () {
            var index = $(this).index();
            var value = $(this).attr("data-id")
            if (value == "get.dxWeb.feedbackList") {
                $("#iframe").attr("src", "./Feedback.html");
            }
        })
        $("#10 .treeview-menu li a i").click(function () {
            var index = $(this).index();
            var value = $(this).attr("data-id")
            if (value == "personalAddList") {
                $("#iframe").attr("src", "./nv10/PersonIdentification.html");
            }
            if (value == "enterpriseAaddList") {
                $("#iframe").attr("src", "./nv10/Identification.html");
            }
        })
   //左侧菜单栏点击事件
$(".treeview-menu li a ").each(function(index){
    debugger
   $(this).click(function(){
    $(".treeview-menu li a ").removeClass("activeCol").eq(index).addClass("activeCol");
   })
     
})
    //个人信息下拉弹框
    $(".person").hover(function () {
        $(".selectDown").slideDown();
        $(".img1").addClass("dis").eq(1).removeClass("dis");
    })
    $(".fl-right").mouseleave(function () {
        $(".selectDown").slideUp();
        $(".img1").addClass("dis").eq(0).removeClass("dis");

    });
    
    //面包屑导航切换 后点击事件以及以及动效
    var bread = document.querySelector(".bread");
    var n = 0;
    bread.addEventListener("click", function () {
        n++;
        if (n % 2 == 1) {
            $(".nhide").hide();
            $(".nav-main").show();
            $(".remove1").removeClass("hidenow");
            $(".remove2").addClass("hidenow");
            $(".nav-slide-o li span").click(function () {

                var value = $(this).attr("data-id");
                //1
                if (value == "get.dxWeb.webSurvey") {
                    $("#iframe1").attr("src", "./nav1/aboutWeb.html");
                    window.localStorage.setItem("title", "统计");
                    window.localStorage.setItem("method", "get.dxWeb.webSurvey");
                    window.localStorage.setItem("url", "dxVisitInterface.dx");
                }
                if (value == "get.dxWeb.columnStatistics") {
                    $("#iframe1").attr("src", "./nav1/Column.html");
                    window.localStorage.setItem("title", "栏目统计");
                    window.localStorage.setItem("method", "get.dxWeb.columnStatistics");
                    localStorage.setItem("url", "/dxVisitInterface.dx");
                }
                if (value == "get.dxWeb.helpStatistics") {
                    $("#iframe1").attr("src", "./nav1/Column.html");
                    window.localStorage.setItem("title", "帮助文档统计");
                    window.localStorage.setItem("method", "get.dxWeb.helpStatistics");
                    localStorage.setItem("url", "/dxVisitInterface.dx");

                }
                if (value == "get.dxWeb.articleSurvey") {
                    $("#iframe1").attr("src", "./nav1/Column.html");
                    window.localStorage.setItem("title", "文章统计");
                    window.localStorage.setItem("method", "get.dxWeb.articleSurvey");
                    localStorage.setItem("url", "/dxVisitInterface.dx");

                }
                
                //2
                if (value == "get.dxWeb.websetup") {
                    $("#iframe1").attr("src", "./nav2/FunctionSet.html");
                    window.localStorage.setItem("title", "网站运营");
                    window.localStorage.setItem("url", "get.dxWeb.websetup");
                }
                if (value == "get.dxWeb.bannerList") {
                    $("#iframe1").attr("src", "./nav2/BannerManager.html")
                }
                if (value == "get.dxWeb.addWebOperation") {
                    $("#iframe1").attr("src", "./nav2/AddText.html");
                    window.localStorage.setItem("method", "get.dxWeb.addWebOperation");
                    localStorage.setItem("url", "/webInterface.dx");

                }
                if (value == "get.dxWeb.webOperationList") {
                    $("#iframe1").attr("src", "./nav2/ManagerText.html");
                    //将此时的正在点击页面的方法 以及此时正在点击的是哪个节点暂放缓存
                    localStorage.setItem("node", JSON.stringify({ "method": "get.dxWeb.webOperationList", "id": 2 }));
                }
                if (value == "get.dxWeb.webOperationList") {
                    $("#iframe1").attr("src", "./nav2/ManageCompany.html");
                    
                }
                //3
                if (value == "get.dxWeb.tesetup") {
                    $("#iframe1").attr("src", "./nav2/FunctionSet.html");
                    window.localStorage.setItem("title", "帮助文档");
                    window.localStorage.setItem("url", "get.dxWeb.tesetup");

                }
                if (value == "get.dxWeb.addHelp") {
                    $("#iframe1").attr("src", "./nav2/AddText.html");
                    window.localStorage.setItem("url", "/helpInterface.dx");
                    localStorage.setItem("method", "get.dxWeb.addHelp");
                }
                if (value == "get.dxWeb.helpList") {
                    $("#iframe1").attr("src", "./nav3/ManagerTextThree.html");
                    //将此时的正在点击页面的方法 以及此时正在点击的是哪个节点暂放缓存
                    localStorage.setItem("node", JSON.stringify({ "method": "get.dxWeb.helpList", "id": 3 }));
                }
                if (value == "get.dxWeb.cateList") {
                    $("#iframe1").attr("src", "./nav3/TextDivide.html");
                    localStorage.setItem("node", JSON.stringify({ "id": 3 }));

                }
                //4
                if (value == "get.dxWeb.helpsetup") {
                    $("#iframe1").attr("src", "./nav2/FunctionSet.html");
                    window.localStorage.setItem("title", "技术文档");
                    window.localStorage.setItem("url", "get.dxWeb.helpsetup");
                }
                if (value == "get.dxWeb.addSkill") {
                    $("#iframe1").attr("src", "./nav2/AddText.html");
                    window.localStorage.setItem("url", "/skillInterface.dx");
                    localStorage.setItem("method", "get.dxWeb.addSkill");
                }
                if (value == "get.dxWeb.skillList") {
                    $("#iframe1").attr("src", "./nav4/ManagerTextFour.html");
                    //将此时的正在点击页面的方法 以及此时正在点击的是哪个节点暂放缓存
                    localStorage.setItem("node", JSON.stringify({ "method": "get.dxWeb.skillList", "id": 4 }));
                }
                if (value == "get.dxWeb.cateList") {
                    $("#iframe1").attr("src", "./nav3/TextDivide.html");
                    localStorage.setItem("node", JSON.stringify({ "id": 4 }));
                }
                //5
                if (value == "get.dxWeb.qsetup") {
                    $("#iframe1").attr("src", "./nav2/FunctionSet.html");
                    window.localStorage.setItem("title", "Q&A文档");
                    window.localStorage.setItem("url", "get.dxWeb.qsetup");

                }
                if (value == "get.dxWeb.addQAndA") {
                    $("#iframe1").attr("src", "./nav2/AddText.html");
                    window.localStorage.setItem("url", "/qAndAInterface.dx");
                    localStorage.setItem("method", "get.dxWeb.addQAndA");

                }
                if (value == "get.dxWeb.qAndAList") {
                    $("#iframe1").attr("src", "./nav5/ManagerTextFive.html");
                    //将此时的正在点击页面的方法 以及此时正在点击的是哪个节点暂放缓存
                    localStorage.setItem("node", JSON.stringify({ "method": "get.dxWeb.qAndAList", "id": 5 }));
                }
                if (value == "get.dxWeb.cateTwoList") {
                    $("#iframe1").attr("src", "./nav5/TextDivideFive.html")
                }
                if (value == "get.dxWeb.addNotice") {
                    $("#iframe").attr("src", "./nav2/AddText.html");
                    window.localStorage.setItem("url", "/noticeInterface.dx");
                    localStorage.setItem("method", "get.dxWeb.addNotice");
    
                }
                if (value == "get.dxWeb.noticeList") {
                    $("#iframe").attr("src", "./nav6/ManagerTextSix.html");
                    //将此时的正在点击页面的方法 以及此时正在点击的是哪个节点暂放缓存
                    localStorage.setItem("node", JSON.stringify({ "method": "get.dxWeb.noticeList", "id": 6 }));
                }
                //7
                if (value == "get.dxWeb.queryFileAll") {
                    $("#iframe1").attr("src", "./nav7/Resource.html");
                }
                if (value == "get.dxWeb.libraryList") {
                    $("#iframe1").attr("src", "./nav7/ManagerFile.html")
                }
                //8
                if (value == "get.dxWeb.feedbackList") {
                    $("#iframe1").attr("src", "./Feedback.html");
                }
                //10
                if (value == "personalAddList") {
                    $("#iframe1").attr("src", "./nv10/PersonIdentification.html");
                }
                if (value == "enterpriseAaddList") {
                    $("#iframe1").attr("src", "./nv10/Identification.html");
                }
            })
        }
        if (n % 2 == 0) {
            $(".nhide").show();
            $(".nav-main").hide();
            $(".remove1").addClass("hidenow");
            $(".remove2").removeClass("hidenow");
        }
    })

    var thisTime;
    $('.nav-ul li ').mouseleave(function (even) {
        
        thisTime = setTimeout(thisMouseOut, 1000);
    })

    $('.nav-ul li ').mouseenter(function () {
        
        
        clearTimeout(thisTime);
        var thisUB = $('.nav-ul li').index($(this));
        if ($.trim($('.nav-slide-o').eq(thisUB).html()) != "") {
            $('.nav-slide').addClass('hover');
            $('.nav-slide-o').hide();
            $('.nav-slide-o').eq(thisUB).show()
            $('.nav-slide-o ul').eq(thisUB).css({
                "marginTop": 10 + 70 * thisUB + "px"
            });
        }
        else {
            $('.nav-slide').removeClass('hover');
        }

    })

    function thisMouseOut() {
        $('.nav-slide').removeClass('hover');
    }

    // $('.nav-slide').mouseenter(function () {
    //     clearTimeout(thisTime);
    //     $('.nav-slide').addClass('hover');
    // })
    // $('.nav-slide').mouseleave(function () {
    //     $('.nav-slide').removeClass('hover');
    // })
    // $(".nav-slide-o").mouseleave(function () {
    //     $('.nav-slide-o').hide();
    // })
    // $(".nav-slide-o li").click(function () {
    //     $('.nav-slide-o').hide();
    // })


})

  







