
    function changeState(el) {
        if (el.readOnly) el.checked=el.readOnly=false;
        else if (!el.checked) el.readOnly=el.indeterminate=true;
    }
    window.onload = function(){
        //页面初次渲染加载数据
        $(".btn1").each(function(index){
            $(this).click(function(){
                setTimeout(function(){
                    $(".btn1").removeClass("btn-primary").eq(index).addClass("btn-primary");
                },500);
                
            })
       })
        var data = window.localStorage.getItem("dxRightsList");
        data = JSON.parse(data);

        //console.log(data);
        //页面初次加载渲染页面
        var url,par;
        // Datetime();
        var appsercet = window.localStorage.getItem("appsercet");
        appsercet = JSON.parse(appsercet);
        var newAppsercet = appsercet.data;
        //判断是否有添加管理员操作权限

        // return
        var arr = [];
        $.each(data,function(i,item){
            //console.log(item)
            if(item.name == "设置"){
                arr.push(item)
            }
        })
        //console.log(arr[0]);

        $.each(arr[0].dxRightsList,function(i,item){
            //console.log(arr[0].dxRightsList)
            if(item.method === "get.dxWeb.operation"){
                url = src+"/"+item.link_path;
                par = "appsercet="+newAppsercet+"&method="+item.method;
                //console.log(url,par);
                logsgin(url,par);
                pagenow(url,"get.dxWeb.operation");
                //请求全部管理员
                par = "appsercet="+newAppsercet+"&method=get.dxWeb.managementRolesList"

                logsgin(url,par);
                //用户名查询
                var role,sensoperation;
                $(".chOperator").change(function(){

                    var val = $(".chOperator option:checked").val();
                    var htm = $(".chOperator option:checked").html();
                    role = htm;

                    if(val == 0){
                        par = "appsercet="+newAppsercet+"&method=get.dxWeb.operation";
                       
                        var data = getSign(url,par);
                        render(data);
                         
                    }else{
                        par = "appsercet="+newAppsercet+"&method=get.dxWeb.operation&roleId="+val;
                        var data = getSign(url,par);
                        console.log(data)
                        if(data.msg && data.msg.code == "10"){
                            $(".operater").html("");
                           
                        }else{
                            render(data);
                            //底部页码
                            
                        }
                       

                    }
                })
                $(".opName").blur(function(){
                    sensoperation = $(this).val()
                    //console.log(sensoperation)
                })
                $(".searvh1").click(function(){
                    //console.log(sensoperation)
                    par = "appsercet="+newAppsercet+"&method=get.dxWeb.operation&trueName="+sensoperation;
                    logsgin(url,par);
                })
                //判断该角色是否有权限操作
                if(item.dxRightsTwoList.length == 0){
                    return
                }
                else{

                    $.each(item.dxRightsTwoList,function(i,obj){
                        //判断该用户是否有添加管理员权限
                        if(obj.method === "get.dxWeb.addOperation"){

                            $(".add").show();
                            $(".add").click(function(){
                                add();
                                url = src+"/adminInterface.dx";
                                par = "appsercet="+newAppsercet+"&method=get.dxWeb.leftMenuAll";
                                logsgin(url,par);
                                var status,rightsIds,roleName
                                var user1,user2,user3,user4,roleId
                                $(".manRole1").change(function(){
                                    if($(".manRole1 option:checked")){
                                        var val = $(".manRole1 option:checked").val()
                                        if(val == 0){
                                            return
                                        }
                                        roleId = val
                                    }
                                })
                                $(".user1").blur(function(){
                                    user1 = $(this).val()
                                })
                                $(".user2").blur(function(){
                                    user2 = $(this).val()
                                })
                                $(".user3").blur(function(){
                                    user3 = $(this).val()
                                })
                                $(".user4").blur(function(){
                                    user4 = $(this).val()
                                })
                                $(".roleSure").click(function(){
                                    
                                    var inputs = document.querySelectorAll(".item3 input");//获取所有的input标签对象
                                    var radio = document.querySelectorAll(".status ");
                                    var checkboxArray = [];//初始化空数组，用来存放checkbox对象。
                                    for (var i = 0; i < inputs.length; i++) {
                                        var obj = inputs[i];
                                        if (obj.type == 'checkbox' && obj.className=='item2') {
                                            checkboxArray.push(obj);
                                        }
                                    }
                                    var rightsIds = new Array();
                                    for (var i = 0; i < radio.length; i++) {
                                        if (radio[0].checked){
                                            status = 1;
                                        }else{
                                            status = 2;
                                        }

                                    }

                                    for (var i = 0; i < checkboxArray.length; i++) {
                                        if (checkboxArray[i].checked)
                                            rightsIds.push(checkboxArray[i].value);
                                    }
                                    console.log(rightsIds)
                                    url = src+"/adminInterface.dx";

                                    par = "appsercet="+newAppsercet+"&method=get.dxWeb.addOperation&status="+status+"&roleIds="+rightsIds+"&username="+user1+"&pwd="+user2+"&roleId="+roleId+"&modilePhone="+user4+"&trueName="+user3;
                                   var data =  logsgin(url,par);
                                    // 
                                    // var data = getSign(url,par);
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
                                        $(".nv91").reset();
                                        $(".nv91-mask").fadeOut();
                                        $(".nv91").hide();
                                    }

                                })
                                $(".roleRefuse").click(function(){
                                    $(".nv91-mask").fadeOut();
                                    $(".nv91").hide();
                                })
                            })

                        }
                        //判断该用户是否有启用或禁用权限
                        if(obj.method === "get.dxWeb.isAdminEnableOrProhibit"){
                            $(".qy").show();
                            $(".jy").show();
                            $(".qy").click(function(){
                                var t12 = t1();
                                if(t12.length == 0){
                                    $(".confirm").hide(); 
                                    $(".nv91-mask").show();
                                    $(".confirm1").show();
                                    $(".prompt").text("请至少选择一条数据");
                                    setTimeout(function(){
                                        $(".nv91-mask").hide();
                                        $(".confirm1").hide();
                                       location.reload();
                                    },2000);
                                }else{
                                    open("get.dxWeb.isAdminEnableOrProhibit", 1)

                                }
                            })
                            $(".jy").click(function(){
                                var t12 = t1();
                                if(t12.length == 0){
                                    $(".confirm").hide(); 
                                    $(".nv91-mask").show();
                                    $(".confirm1").show();
                                    $(".prompt").text("请至少选择一条数据");
                                    setTimeout(function(){
                                        $(".nv91-mask").hide();
                                        $(".confirm1").hide();
                                       location.reload();
                                    },2000);
                                }else{
                                    open("get.dxWeb.isAdminEnableOrProhibit",2)

                                }
                               
                            })
                        }
                        //判断该用户是否有删除权限 
                        if(obj.method === "get.dxWeb.deleteAdmin"){

                            $(".delete").show();
                            $(".isDelete").show();
                            $(".delete").click(function(){
                                var value

                                deleteM("get.dxWeb.deleteAdmin")

                            })
                            $(".isDelete").click(function(){
                                deleteM("get.dxWeb.deleteAdmin")
                            })
                        }
                        //判断是否有查看权限
                        if(obj.method === "get.dxWeb.adminDetails"){
                            $(".isEdit").show()
                            $(".botto").hide();

                            edit("get.dxWeb.adminDetails","get.dxWeb.updateOperation")

                        }
                        //判断是否有编辑权限
                        if(obj.method === "get.dxWeb.updateOperation"){
                            $(".botto").show()

                        }


                    })

                }
            }
        })
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
                role2 += " <td style='color:#FF5456;' ><span class='isEdit' data-id='" + item.user_id + "' >编辑</span>&nbsp;<span class='isDelete' data-id='" + item.user_id + "'>删除</span></td>";

                role2 += "</tr>";

            })
            $(".operater").html(role2);
        }
        //底部页码
        getPage()


        
    }

