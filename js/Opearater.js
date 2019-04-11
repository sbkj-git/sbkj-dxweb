
    function changeState(el) {
        if (el.readOnly) el.checked=el.readOnly=false;
        else if (!el.checked) el.readOnly=el.indeterminate=true;
    }
    window.onload = function(){
        //页面初次渲染加载数据

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

                    par = "appsercet="+newAppsercet+"&method=get.dxWeb.operation&roleId="+val;
                    
                    logsgin(url,par);

                    if(val == 0){
                        par = "appsercet="+newAppsercet+"&method=get.dxWeb.operation";
                       
                        logsgin(url,par);
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
                                    debugger
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
                                    // debugger
                                    // var data = getSign(url,par);
                                    if(data.msg.code == "200"){
                                        alert("添加成功");
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
                                open("get.dxWeb.isAdminEnableOrProhibit", 1)
                            })
                            $(".jy").click(function(){
                                open("get.dxWeb.isAdminEnableOrProhibit",2)
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


        //底部页码
        getPage()
    }

