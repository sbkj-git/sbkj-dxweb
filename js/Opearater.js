
function changeState(el) {
    if (el.readOnly) el.checked = el.readOnly = false;
    else if (!el.checked) el.readOnly = el.indeterminate = true;
}
window.onload = function () {
    //初次加载页面数据将全线放入缓存
   
    //页面初次加载渲染页面
    var url, par;
    // Datetime();
    url = src +"/adminInterface.dx";
    var appsercet = window.localStorage.getItem("appsercet");
    appsercet = JSON.parse(appsercet);
    var newAppsercet = appsercet.data;
    par = "appsercet=" + newAppsercet + "&method=get.dxWeb.leftMenuAll";
    
    var data1 = getSign(url, par);
    localStorage.setItem("qx", JSON.stringify(data1));
            par = "appsercet=" + newAppsercet + "&method=get.dxWeb.operation";
            var data = getSign(url, par);
            render(data);
            judgePower();
            pageChange("get.dxWeb.operation",data,"pagination23",url);
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
            function judgePower() {
            //页面初次加载渲染页面
            var url, par;
            //页面初次渲染加载数据
            var data = window.localStorage.getItem("dxRightsList");
            data = JSON.parse(data);
            //console.log(data);
            var appsercet = window.localStorage.getItem("appsercet");
            appsercet = JSON.parse(appsercet);
            var newAppsercet = appsercet.data;
            //判断是否有添加管理员操作权限
            var arr = [];
            $.each(data, function (i, item) {
                //console.log(item)
                if (item.id == 9) {
                    arr.push(item)
                }
            })
            console.log(arr[0]);
            $.each(arr[0].dxRightsList, function (i, item) {
                //console.log(arr[0].dxRightsList)
                if (item.method === "get.dxWeb.operation") {
                    url = src + "/" + item.link_path;
                    //判断该角色是否有权限操作
                    if (item.dxRightsTwoList.length == 0) {
                        return
                    }
                    else {
                        $.each(item.dxRightsTwoList, function (i, obj) {
                            //获取权限权限
                            
                            //判断该用户是否有添加管理员权限
                            if (obj.method === "get.dxWeb.addOperation") {
        
                                $(".add").show();
                                $(".add").click(function () {
                                    //现在显示的是添加管理操作员
                                    $(".totalHide").hide();
                                    $(".totalShow").show();
                                    var data1 = localStorage.getItem("qx");
                                    data1 = JSON.parse(data1);
                                   qx(data1);
                                   pl();
                                   $(".roleSure").click(function(){
                                        addorupdate("get.dxWeb.addOperation","");
                                   })
                                })
        
                            }
                            //判断该用户是否有启用或禁用权限
                            if (obj.method === "get.dxWeb.isAdminEnableOrProhibit") {
                                $(".qy").show();
                                $(".jy").show();
                                $(".qy").click(function () {
                                    var t12 = t1();
                                    if (t12.length == 0) {
                                        $(".confirm").hide();
                                        $(".nv91-mask").show();
                                        $(".confirm1").show();
                                        $(".prompt").text("请至少选择一条数据");
                                        setTimeout(function () {
                                            $(".nv91-mask").hide();
                                            $(".confirm1").hide();
                                          
                                        }, 2000);
                                    } else {
                                        open("get.dxWeb.isAdminEnableOrProhibit", 1)
        
                                    }
                                })
                                $(".jy").click(function () {
                                    var t12 = t1();
                                    if (t12.length == 0) {
                                        $(".confirm").hide();
                                        $(".nv91-mask").show();
                                        $(".confirm1").show();
                                        $(".prompt").text("请至少选择一条数据");
                                        setTimeout(function () {
                                            $(".nv91-mask").hide();
                                            $(".confirm1").hide();
                                          
                                        }, 2000);
                                    } else {
                                        open("get.dxWeb.isAdminEnableOrProhibit", 2)
        
                                    }
        
                                })
                            }
                            //判断该用户是否有删除权限 
                            if (obj.method === "get.dxWeb.deleteAdmin") {
        
                                $(".delete").show();
                                $(".isDelete").show();
                                $(".delete").click(function () {
                                    var value
                                    var inputs = document.getElementsByTagName("input");//获取所有的input标签对象
                                    var checkboxArray = [];//初始化空数组，用来存放checkbox对象。
                                    for (var i = 0; i < inputs.length; i++) {
                                        var obj = inputs[i];
                                        if (obj.type == 'checkbox') {
                                            checkboxArray.push(obj);
                                        }
                                    }
                                    value = new Array();
                                    for (var i = 0; i < checkboxArray.length; i++) {
                                        if (checkboxArray[i].checked)
                                            value.push(checkboxArray[i].value);
                                    }
                                    if (value.length == 0) {
                                        $(".confirm").hide();
                                        $(".nv91-mask").show();
                                        $(".confirm1").show();
                                        $(".prompt").text("请至少选择一条数据");
                                        setTimeout(function () {
                                            $(".nv91-mask").hide();
                                            $(".confirm1").hide();
                                           
                                        }, 2000);
                                    }else{
                                        $(".nv91-mask").show();
                                        $(".confirm").show();
                                        var id = $(this).attr("data-id");
                                        url = src + "/adminInterface.dx";
                                       
                                        if (value.length == 1) {
                                        $(".confirm").show();
                                        $(".nv91-mask").show();
                                        par = "appsercet=" + newAppsercet + "&method=get.dxWeb.deleteAdmin&type=1&userId=" + value;
                                        $(".roleSur").click(function(){
                                        
                                        var data = getSign(url,par);
                                        // if(data.msg.code == "200"){
                                            $(".confirm").hide();
                                        $(".nv91-mask").show();
                                        $(".nv1").show();
                                        $(".prompt").text("删除成功");
                                        setTimeout(function () {
                                            $(".nv91-mask").hide();
                                            $("nv1").hide();
                                           location.reload();
                                        }, 2000);
                                        // }else{
                                        //     $(".confirm").hide();
                                        // $(".nv91-mask").show();
                                        // $(".nv3").show();
                                        // $(".prompt").text("删除失败");
                                        // setTimeout(function () {
                                        //     $(".nv91-mask").hide();
                                        //     $("nv3").hide();
                                           
                                        // }, 2000);
                                        // }
                                       })
                                       
                                    }else{
                                        if (value.length == 0) {
                                        $(".confirm").hide();
                                        $(".nv91-mask").show();
                                       
                                        par = "appsercet=" + newAppsercet + "&method=get.dxWeb.deleteAdmin&type=2&userIdList=" + value;
                                        $(".roleSur").click(function(){
                                        
                                        var data = getSign(url,par);
                                        if(data.msg.code == "200"){
                                            $(".confirm").hide();
                                        $(".nv91-mask").show();
                                        $(".nv1").show();
                                        $(".prompt").text("删除成功");
                                        setTimeout(function () {
                                            $(".nv91-mask").hide();
                                            $("nv1").hide();
                                           location.reload();
                                        }, 2000);
                                        }else{
                                            $(".confirm").hide();
                                        $(".nv91-mask").show();
                                        $(".nv3").show();
                                        $(".prompt").text("删除失败");
                                        setTimeout(function () {
                                            $(".nv91-mask").hide();
                                            $("nv3").hide();
                                           
                                        }, 2000);
                                        }
                                       })
                                    }
                                    }
                                        
                                    }
                                })
                                $(".isDelete").click(function () {
                                    $(".nv91-mask").show();
                                        $(".confirm").show();
                                        var id = $(this).attr("data-id");
                                        url = src + "/adminInterface.dx";
                                        par = "appsercet=" + newAppsercet + "&method=get.dxWeb.deleteAdmin&type=1&userId=" + id;
                                       $(".roleSur").click(function(){
                                        
                                        var data = getSign(url,par);
                                        // if(data.msg.code == "200"){
                                            $(".confirm").hide();
                                        $(".nv91-mask").show();
                                        $(".nv1").show();
                                        $(".prompt").text("删除成功");
                                        setTimeout(function () {
                                            $(".nv91-mask").hide();
                                            $("nv1").hide();
                                           location.reload();
                                        }, 2000);
                                        // }else{
                                        //     $(".confirm").hide();
                                        // $(".nv91-mask").show();
                                        // $(".nv3").show();
                                        // $(".prompt").text("删除失败");
                                        // setTimeout(function () {
                                        //     $(".nv91-mask").hide();
                                        //     $("nv3").hide();
                                           
                                        // }, 2000);
                                        // }
                                       })
        
                                })
                            }
                            //判断是否有查看权限
                            if (obj.method === "get.dxWeb.adminDetails") {
                                $(".isEdit").show()
                                $(".botto").hide();
        
                              
        
                            }
                            //判断是否有编辑权限
                            if (obj.method === "get.dxWeb.updateOperation") {
                                $(".botto").show()
                                $(".isEdit").click(function(){
                                    var id = $(this).attr("data-id");
                                    var userid;
                                       //现在显示的是添加管理操作员
                                       $(".totalHide").hide();
                                       $(".totalShow").show();
                                      
                                        var val = $(this).parent().parent().find(".test").html();
                                        rolename = $(this).parent().parent().find(".rolen").html();
                                        console.log(sta)
                                        // var sta = $(this).parent().parent().attr("data-id");
                                        var sta = $(this).attr("data-id");
                                       var  roleId = sta;
                                        userid =val;
                                        $(".role1").val(rolename)
                                        var code = $(this).parent().parent().find(".stcode").attr('data-id');
                                        // var id = $(".isEdit").attr("data-id");
                                        //console.log(id);
                                        url = src+"/adminInterface.dx";
                                        par = "appsercet="+newAppsercet+"&method=get.dxWeb.leftMenuAll";  
                                        
                                        var data1 = localStorage.getItem("qx");
                                       data1 = JSON.parse(data1);
                                      qx(data1);
                                      pl();  
                                      var opearId,uparr,update
                                       
                                            par = "appsercet="+newAppsercet+"&method=get.dxWeb.adminDetails&userId="+userid;
                                            
                                            var data = getSign(url,par);
                                            opearId = data.userInfo.roleId;
                                            update = data.userInfo
                                            par = "appsercet="+newAppsercet+"&method=get.dxWeb.roleDetails&roleId="+opearId;
                                            
                                            var data5 = getSign(url,par);
                                            uparr = data5.dxRoleRightsList.dxRightsCategoryList
                                            console.log(data5);
                                            // logsgin(url,par);
                                           
                                        var inputs = document.querySelectorAll(".roleLis input");//获取所有的input标签对象
                                        var checkboxArray = [];//初始化空数组，用来存放checkbox对象。
                                        
                                            for (var i = 0; i < inputs.length; i++) {
                                                var obj = inputs[i];
                                                if (obj.type = 'checkbox') {
                                                    checkboxArray.push(obj);
                                                }
                                            }
                                       
                                           $(".user1").val(update.username);
                                           $(".user2").val("......");
                                           $(".user3").val(update.trueName);
                                           $(".user4").val(update.modilePhone);
                                           var radio = document.querySelectorAll(".status");
                                           var radios = [];
                                           for (var i = 0; i < radio.length; i++) {
                                               var obj1 = radio[i];
                                               if (obj1.type == 'radio') {
                                                   radios.push(obj1);
                                               }
                                           }
                                           for (var i = 0; i < radios.length; i++) {
                                               var obj1 = radios[i];
                                             
                                                   if (obj1.value == update.status) {
                                                       obj1.checked = true;
                                                   }  
                                           }
                                           var  manRole1 = document.querySelectorAll(".manRole1 option");
                                           for (var i = 0; i < manRole1.length; i++) {
                                            var obj1 = manRole1[i];
                                          
                                                if (obj1.value == update.roleId) {
                                                    obj1.selected = true
                                                }  
                                        }
                                        
                                        for (var i = 0; i < checkboxArray.length; i++) {
                                            var obj = checkboxArray[i];
                                            $.each(uparr,function(i,item){
                                                //console.log(obj.value)
                                                if (obj.value == item.rights_id) {
                                                    obj.checked = true;
                                                }
                                            })   
                                        }
                                        $(".roleSure").click(function(){
                                                         
                                            addorupdate("get.dxWeb.updateOperation",id);
                                        })
                                        $(".roleRefuse").click(function(){
                                            $(".nv91-mask").fadeOut();
                                            $(".nv91").hide();
                                        })  
                                
                            })
                            
                               
                            }
        
        
                        })

                    }
                }
            })

        }  
      //请求全部管理员
      par = "appsercet=" + newAppsercet + "&method=get.dxWeb.managementRolesList"
      logsgin(url, par);
      //用户名查询
      var role, sensoperation;
      $(".chOperator").change(function () {

          var val = $(".chOperator option:checked").val();
          var htm = $(".chOperator option:checked").html();
          role = htm;

          if (val == 0) {
              par = "appsercet=" + newAppsercet + "&method=get.dxWeb.operation";

              var data = getSign(url, par);
              render(data);

          } else {
              par = "appsercet=" + newAppsercet + "&method=get.dxWeb.operation&roleId=" + val;
              var data = getSign(url, par);
              console.log(data)
              if (data.msg && data.msg.code == "10") {
                $(".pagination").css({"opacity":"0"});
                  $(".operater").html("");

              } else {
                $(".pagination").css({"opacity":"1"});
                  render(data);
                  //底部页码
                  pageChange("get.dxWeb.operation",data,"pagination23",url);
              }


          }
      })
      
      $(".searvh1").click(function () {
        var sensoperation = $(".opName").val();
          //console.log(sensoperation)
          par = "appsercet=" + newAppsercet + "&method=get.dxWeb.operation&trueName=" + sensoperation;
          var data = getSign(url, par);
          if (data.msg && data.msg.code == "10") {
            $(".operater").html("");
            $(".pagination").css({"opacity":"0"});
        } else {
            $(".pagination").css({"opacity":"1"});
            render(data);
            //底部页码
            pageChange("get.dxWeb.operation",data,"pagination23",url);
        }
      })   
   
   
   //选择全部input框
    function t1() {
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
        return IdList;
    }
    //页面渲染
    function render(data) {
        var role2 = "";
        $.each(data.roleList, function (i, item) {
            $(".operater").html("");
            //console.log(item)
            role2 += "<tr style='border-bottom: 1px solid #d8d8d8;' class='rolename1' data-id='" + item.user_id + "'>";
            role2 += "<td><div class='checkbox checkbox-primary'><input type='checkbox' class='styled styled-primary r1 t1' id='role" + i + "'" + "value='" + item.user_id + "' aria-label='Single checkbox Two'><label for='role" + i + "' class='test'>" + item.user_id + "</label></div></td><td class='r2'>" + item.role_name + "</td><td class='r3'>" + item.true_name + "</td><td class='r4'>" + item.modile_phone + "</td>";
            if (item.status == 1) {
                role2 += "<td class='r5' data-id='1'>启用</td>";
            }
            if (item.status == 2) {
                role2 += "<td class='r5' data-id='1'>禁用</td>";
            }
            role2 += " <td style='color:#48a4ea;' ><span class='isEdit' data-id='" + item.user_id + "' >编辑</span>&nbsp;<span class='isDelete' data-id='" + item.user_id + "'>删除</span></td>";

            role2 += "</tr>";

        })
        $(".operater").html(role2);
    }
    //权限渲染
    function qx(data1){
        var qx = "";
        $(".qx").html("");
        if (data1.dxRightsCategoryList) {
            $.each(data1.dxRightsCategoryList, function (i, obj) {
                if (obj.dxRightsList.length == 0) {
                    return
                } else {
                    qx += "<li class='list-group-item flex justify' style='width: 100%;' data-id='q" + obj.id + "' data-num='" + i + "'><div style='width: 100%;' class='flex roleLis'><div class='controlShow flex' style='width:100%'><div style='width: 50%;text-align: left;'><div class='checkbox checkbox-primary'><input type='checkbox' value='" + obj.id + "' id='q" + obj.id + "' class='styled styled-primary t1' aria-label='Single checkbox Two'/><label for='q" + obj.id + "' style='width:auto;line-height:20px!important;'>" + obj.name + "</label></div></div><div style='width: 50%;text-align: right;' class='position'>                <button type='button' class='btn openBtn' >展开</button> <button type='button' class='btn closeBtn1' style='display:none;'>收起</button></div></div><div class='flex show' style='width:100%;background-color:#ffffff;display:none' data-value='q" + obj.id + "'>";

                    $.each(obj.dxRightsList, function (i, item) {

                        // if(item.dxRightsTwoList.length == 0){
                        //     return
                        // }else{
                        qx += "<div class='item item3' ><div class='checkbox checkbox-primary'><input type='checkbox' value='" + item.id + "' id='" + item.id + "' data-num='" + i + "' class='styled styled-primary item2' aria-label='Single checkbox Two'/><label for='" + item.id + "' style='width:auto;line-height:20px!important;'>" + item.name + "</label></div></div>"

                        $.each(item.dxRightsTwoList, function (i, itemi) {
                            qx += "<div class='flex '>";
                            qx += "<div style='width:auto;text-align: left;' class='item3'><div class='checkbox checkbox-primary'><input type='checkbox' value='" + itemi.id + "' id='" + itemi.id + "' data-num='" + i + "' class='styled styled-primary item2' aria-label='Single checkbox Two'/><label for='" + itemi.id + "' style='width:auto;line-height:20px!important;'>" + itemi.name + "</label></div></div>";
                            qx += "</div>";
                        })


                        // }

                    })
                    qx += "</div>";
                }

                qx += "</li>"
            })
            $(".qx").append(qx);
            $(".openBtn").each(function (index) {
                $(this).click(function () {
                    $(this).hide();
                    $(".qx li").eq(index).css({ "backgroundColor": "#fff" })
                    $(".closeBtn1").eq(index).show();
                    $(".show").eq(index).slideDown();
                })

            })
            $(".closeBtn1").each(function (index) {

                $(this).click(function () {

                    $(this).hide();
                    $(".openBtn").eq(index).show();
                    $(".show").eq(index).slideUp();
                    $(".qx li").eq(index).css({ "backgroundColor": "rgba(243,243,243,1)" })
                })
            })
        }
    }
  
    
// //批量操作
function pl(){
    var inputs = document.querySelectorAll(".show");//获取所有的input标签对象
    var li = document.querySelectorAll(".list-group-item");//获取所有的li标签
    // $(".list-group-item .t1").unbind('click').bind("click",function(){
        $(".list-group-item .t1").each(function (index) {
                $(this).click(function () {
                    var id = li[index].getAttribute("data-num");
                    if($(this).prop("checked") == true){
                        
                            $(".show").eq(id).find(".item2").prop("checked", true);
                            
                       
                    }else{
                       
                            $(".show").eq(id).find(".item2").prop("checked", false);
                           
                       
                }
                   
                })
            })
        
    
    
 }
    

//添加修改方法
function addorupdate(method,id){
    
    var status, rightsIds, roleName
    var user1, user2, user3, user4, roleId
   
    roleId = $(".manRole1 option:checked").val();
            user1 =  $(".user1").val()
            user2 =  $(".user2").val()
            user3 =  $(".user3").val()
            user4 =  $(".user4").val()
       
        var inputs = document.querySelectorAll(".item3 input");//获取所有的input标签对象
        var radio = document.querySelectorAll(".status ");
        var checkboxArray = [];//初始化空数组，用来存放checkbox对象。
        for (var i = 0; i < inputs.length; i++) {
            var obj = inputs[i];
            if (obj.type == 'checkbox' && obj.className == 'item2') {
                checkboxArray.push(obj);
            }
        }
        var rightsIds = new Array();
        for (var i = 0; i < radio.length; i++) {
            if (radio[0].checked) {
                status = 1;
            } else {
                status = 2;
            }

        }

        for (var i = 0; i < checkboxArray.length; i++) {
            var obj1 = checkboxArray[i]
            if (obj1.checked == true)
                rightsId.push(obj1.value);
        }
        console.log(rightsIds)
        url = src + "/adminInterface.dx";
        if(method === "get.dxWeb.updateOperation"){
            par = "appsercet=" + newAppsercet + "&method="+method+"&status=" + status + "&roleIds=" + rightsIds + "&username=" + user1 + "&pwd=" + user2 + "&roleId=" + roleId + "&modilePhone=" + user4 + "&trueName=" + user3+"&userId="+id; 
        }else{
            par = "appsercet=" + newAppsercet + "&method="+method+"&status=" + status + "&roleIds=" + rightsIds + "&username=" + user1 + "&pwd=" + user2 + "&roleId=" + roleId + "&modilePhone=" + user4 + "&trueName=" + user3;
        }
       
        var data = getSign(url, par);
        // 
        // var data = getSign(url,par);
        if (data.msg.code == "200") {
            $(".confirm").hide();
            $(".prompt").text("操作成功");
            $(".nv91-mask").show();
            $(".nv1").show();
            setTimeout(function () {
                $(".nv91-mask").hide();
                $(".nv1").hide();
                $(".totalHide").show();
                $(".totalShow").hide();
                location.reload();
            }, 2000);
           
        }else{
            $(".confirm").hide();
            $(".prompt").text(data.msg.codeMsg);
            $(".nv91-mask").show();
            $(".nv3").show();
            setTimeout(function () {
                $(".nv91-mask").hide();
                $(".nv3").hide();
                $(".totalHide").show();
                $(".totalShow").hide();
            }, 2000); 
        }

 
}
}

