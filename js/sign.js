
//get请求签名
function logsgin(url,par){ 
   debugger
    if(url && par){
        var appid="dxwebf0a37ed1ae96deef";
        var accessKey="eU5cO72vwSW3avZdaHpWpKJdT5iEubXu";
        var timestamp = Date.parse(new Date());   
    //md5讲参数加密 进行字母排序
    var par_sp = par+'&appid='+appid+'&timestamp='+timestamp;
    var sgindata=par_sp+'&accessKey='+accessKey;
    var datatwo = sgindata.split('&');
    var sign=md5(datatwo.sort().join("&"));
    //md5字符串全都转换大写
    var parameter=sign.toUpperCase();
    //转换数组
    var parameter1 = parameter.split('');
    //进行排序
    var arrstr=parameter1.sort();
    //利用数组的join()方法转换为字符串 
    var str=arrstr.join("");
    par_sp=par_sp+'&sign='+str;
    debugger
    // document.write(str);
     $.ajax({                  
            url: url+"?"+par_sp,
                type: 'GET',
                async:false,
                cache: false,
                contentType: false,
                processData: false,
                // dataType:"json",
                    success:function(data){ 
                       
                        console.log(data)
                       data = JSON.parse(data)
                       console.log(data);
                       //处理功能设计下页面初次渲染单选按钮选择 
                       if(data.msg){
                           if(data.msg.browse_state){
                            localStorage.setItem("browse",data.msg.browse_state);
                            if(data.msg.praise_state){
                                localStorage.setItem("praise",data.msg.praise_state);
                                }
                           }
                       
                       }
                       //处理设置节点下基础设置公司信息详情渲染
                       if(data.dxCompanyWeb){
                           var x = data.dxCompanyWeb
                           $(".s1").val(x.corporate_name);
                           $(".s2").val(x.corporate_web);
                           $(".s3").val(x.lat);
                           $(".s4").val(x.lnt);
                           $(".s6").val(x.address);

                       }
                       //处理设置节点下基础设置公司人员详情渲染
                       if(data.dxCompanyStaff){
                        var y = data.dxCompanyStaff;
                        var s11 = document.querySelectorAll(".s11 option");
                        for(var i = 0;i<s11.length;i++){
                            var obj = s11[i];
                            console.log(obj.innerHTML)
                            if(obj.innerHTML === y.corporate_name){
                                obj.selected = true;
                            }               
                        }
                        $(".s12").val(y.username);
                        $(".s13").val(y.position);
                        $(".s14").val(y.modile_phone);
                        $(".s15").val(y.email);
                        }  
                        //处理设置节点下基础设置公司人员添加点击事件触发查询的所有公司信息                     
                        if(data.dxCompanyWebList){
                            $(".s11").html("");
                            var str = "<option value='0'>--请选择--</option>";
                            $.each(data.dxCompanyWebList,function(i,item){
                                str+="<option value='"+item.id+"'>"+item.corporate_name+"</option>";                               
                            })
                            $(".s11").html(str);
                        }
                        //处理登录成功后密钥存储到缓存
                        if(data.userInfo){
                            if(data.userInfo.appsercet){
                                localStorage.setItem("appsercet",JSON.stringify({"data":data.userInfo.appsercet}))
                                localStorage.setItem("appid","dxwebf0a37ed1ae96deef")
                                window.localStorage.setItem("dxRightsList", JSON.stringify(data.userInfo.dxRightsList.dxRightsCategoryList));
                                window.location.href = "index.html"
                            }else{
                                
                                //处理设置模块下操作管理员点击编辑查询管理员详情
                                window.localStorage.setItem("userole", JSON.stringify(data.userInfo));
                            }
                                                                                     
                        }
                         if(data.roleList && !data.pageInfo){ 
                                                  //渲染设置模块下角色管理和操作管理员列表渲染   
                           var roleList1 = "";
                           roleList1+="<option checked value='0'>--请选择--</option>"
                           $.each(data.roleList,function(i,item){
                               
                               var  roleList1 = "";
                              
                               roleList1+="<option value='"+item.id+"'"+">"+item.name+"</option>";
                               $(".chOperator").append(roleList1);
                           $(".manRole1").append(roleList1);
                           })  
                        }                      
                        if(data.dxRoleRightsList){                           
                            console.log(data.dxRoleRightsList)
                         
                            window.localStorage.setItem("dxRoleRightsLists",JSON.stringify(data.dxRoleRightsList.dxRightsCategoryList));
                           
                        }
                       if(data.dxRightsCategoryList){
                            
                            var qx = "";
                            $.each(data.dxRightsCategoryList,function(i,obj){
                                if(obj.dxRightsList.length == 0){                                   
                                   return 
                                }else{
                                    qx+="<li class='list-group-item flex justify' style='width: 100%;background-color:#F8F8F8;' data-id='"+obj.id+"'><div style='width: 100%;' class='flex roleLis'><div style='width: 50%;text-align: left;'><input type='checkbox' value='"+obj.id+"' />"
                                    +obj.name+"</div><div style='width: 50%;text-align: right;' class='position'>                <button class='btn openBtn'>展开</button> <button class='btn closeBtn'>收起</button></div>";
                                    $(".openBtn").click(function(){
                                        $(this).hide();
                                        $(".show").slideDown();
                                        $(".closeBtn").show()
                                    })
                                    $(".closeBtn").click(function(){
                                        $(this).hide();
                                        $(".show").slideDown();
                                        $(".openBtn").show()
                                    })
                                    $.each(obj.dxRightsList,function(i,item){
                                
                                        // if(item.dxRightsTwoList.length == 0){
                                        //     return
                                        // }else{
                                            qx+="<div class='flex show' style='width:100%;background-color:#ffffff;' data-id='"+item.id+"'><div class='item item3' ><input type='checkbox' value='"+item.id+"'  class='item2'/>"
                                            +item.name+"</div>";
                                            $.each(item.dxRightsTwoList,function(i,itemi){
                                                qx+="<div class='flex '>";
                                                qx+="<div style='width:auto;text-align: left;' class='item3'><input type='checkbox'  value='"+itemi.id+"'  class='item2'/>"
                                                +itemi.name+"</div>" ;
                                                qx+="</div>"
                                            })
                                            
                                        // }
                                        
                                    })
                                }
                               
                                 qx+="</div></li>"
                            })
                           $(".qx").append(qx)
                          
                        }                      
                        //请求日志根据返回条数确定页数
                        else if(data.pageInfo){                      
                            window.sessionStorage.setItem("pageInfo",JSON.stringify(data.pageInfo))
                            var pageNum = Math.ceil(data.pageInfo.totalRows / 10);
                            $('#box').paging({
                                initPageNo: data.pageInfo.currentPage, // 初始页码
                                totalPages: pageNum, //总页数
                                totalCount: '合计' + data.pageInfo.totalRows + '条数据', // 条目总数
                                // slideSpeed: 600, // 缓动速度。单位毫秒
                                jump: true, //是否支持跳转
                                callback: function (page) { // 回调函数
                                    //console.log(page);
                                }
                            })
                            if(data.roleList && data.pageInfo){
                                $("manager1").html("")
                                var role = "";
                                $.each(data.roleList,function(i,item){
                                    //console.log(item)
                                    role+="<tr style='border-bottom: 1px solid #d8d8d8;' class='rolename1' data-id='"+item.id+"'>"; 
                                    role+="<td><div class='checkbox checkbox-primary'><input type='checkbox' class='styled styled-primary t1' id='role"+i+"'"+"value='"+item.id+"' aria-label='Single checkbox Two'><label for='role"+i+"' class='rolen'>"+item.name+"</label></div></td><td>"+item.admin_num+"</td><td class='stcode' data-id='"+item.status+"'>"+item.status_code+"</td><td style='color:#FF5456;' ><span class='isEdit' data-id='"+item.id+"' >编辑</span>&nbsp;<span class='isDelete' data-id='"+item.id+"'>删除</span></td>";
                                    role+="</tr>";
                                                        
                            })
                            $(".manager1").html(role);
                            isHas(); 
                                $(".operater").html("")
                                var role2 = "";                           
                                $.each(data.roleList,function(i,item){                                  
                                    //console.log(item)
                                    role2+="<tr style='border-bottom: 1px solid #d8d8d8;' class='rolename1' data-id='"+item.user_id+"'>"; 
                                    role2+="<td><div class='checkbox checkbox-primary'><input type='checkbox' class='styled styled-primary r1 t1' id='role"+i+"'"+"value='"+item.user_id+"' aria-label='Single checkbox Two'><label for='role"+i+"' class='test'>"+item.user_id+"</label></div></td><td class='r2'>"+item.role_name+"</td><td class='r3'>"+item.true_name+"</td><td class='r4'>"+item.modile_phone+"</td>";
                                    if(item.status == 1){
                                        role2+="<td class='r5' data-id='1'>启用</td>";
                                    }
                                    if(item.status == 2){
                                        role2+="<td class='r5' data-id='1'>禁用</td>";
                                    }
                                    role2+=" <td style='color:#FF5456;' ><span class='isEdit' data-id='"+item.user_id+"' >编辑</span>&nbsp;<span class='isDelete' data-id='"+item.user_id+"'>删除</span></td>";
                                
                                    role2+="</tr>";
                                                        
                            })
                            $(".operater").html(role2);
                            isHas();
                            window.sessionStorage.setItem("pageInfo",JSON.stringify(data.pageInfo))
                            var pageNum = Math.ceil(data.pageInfo.totalRows / 10);
                            $('#box').paging({
                                initPageNo: data.pageInfo.currentPage, // 初始页码
                                totalPages: pageNum, //总页数
                                totalCount: '合计' + data.pageInfo.totalRows + '条数据', // 条目总数
                                // slideSpeed: 600, // 缓动速度。单位毫秒
                                jump: true, //是否支持跳转
                                callback: function (page) { // 回调函数
                                    //console.log(page);
                                }
                            })
                            }
                            //console.log(data.pageInfo)
                            
                            if(data.productList){
                                $(".log").html("");
                                var str = "";
                                $.each(data.productList,function(i,item){
                                    str+="<tr style='border-bottom: 1px solid #d8d8d8;'><td>"+item.user_name+"</td><td>"+item.sensitive_operation+"</td><td>"+item.operation_details+"</td><td>"+item.login_time+"</td><td>"+item.ip_addr
                                })
                                $(".log").html(str);
                            }
                            
                           
                        }                  
                    //设置基础设置下页面渲染
                   else if(data.dxbasics){
                        var company1 = "";
                        $.each(data.dxbasics.dxcompanywebList,function(i,item){
                            company1+="<tr>";
                            company1+="<td>"+item.corporate_name+"</td><td>"+item.corporate_web+"</td><td>"+item.lat+","+item.lnt+"</td><td>"+item.ip_addr+"<td style='color:#FF5456;' data-id='"+item.id+"' class='edits'>编辑</td>";
                            company1+="/<tr >"
                        });
                        $(".company1").append(company1)
                        var company2 = "";
                        $.each(data.dxbasics.dxCompanyStaffList,function(i,item){
                            company2+="<tr >";
                            company2+="<td>"+item.corporate_name+"</td><td>"+item.position+"</td><td>"+item.username+"</td><td>"+item.modile_phone+"</td><td>"+item.email+"<td style='color:#FF5456;'><span data-id='"+item.id+"' class='edit2'>编辑</span><span data-id='"+item.id+"' class='delete2'>删除</span></td>";
                            company2+="/<tr >"
                        })
                        $(".company2").append(company2)
                    }
                    // 设置角色管理渲染
                    else if(data.roleLists){                     
                        //日志下用户名渲染
                        var roleList = "";
                        var  roleList = "";
                        roleList+="<option checked value='0'>--请选择--</option>"
                        $(".manRole").html("")
                        $.each(data.roleLists,function(i,item){
                           
                           
                            roleList+="<option value='"+item.user_id+"'"+">"+item.username+"</option>";
                           
                        })
                        $(".manRole").html(roleList)
                       
                       
                    } 
                    
                    
                    
                }
            })
    }else{
        return
    }
    
    
    }


//设置选项卡下请求操作日志

//nav9设置下添加新操作员和新角色
function add(){
    
        $(".nv91-mask").fadeIn();
        $(".nv91").show();
    
         //弹窗关闭按钮点击
        $(".nv91-close").click(function(){
            $(".nv91-mask").fadeOut();
            $(".nv91").hide();
        })
}
//角色管理  操作员启用禁用操作
function open(method,type){
   
 //页面初次加载渲染页面
        var url,par,value;
        // Datetime();
        url =src
        + "/adminInterface.dx"
        var appsercet = window.localStorage.getItem("appsercet");
        appsercet = JSON.parse(appsercet);
        var newAppsercet = appsercet.data;
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
    if(method === "get.dxWeb.isAdminEnableOrProhibit"){
        if (value.length > 0) {
            par = "appsercet=" + newAppsercet + "&method="+method+"&type="+type+"&userIdList=" + value;
            logsgin(url, par);
            location.reload();
        }
    }else{
        //console.log(value)
    if (value.length > 0) {
        par = "appsercet=" + newAppsercet + "&method="+method+"&type="+type+"&roleIdList=" + value;
        logsgin(url, par);
        location.reload();
    }
    }
    

   
}
//角色  操作员删除操作
function deleteM(method){
    
    //页面初次加载渲染页面
    var url,par,value;
    // Datetime();
    url = "/adminInterface.dx"
    var appsercet = window.localStorage.getItem("appsercet");
    appsercet = JSON.parse(appsercet);
    var newAppsercet = appsercet.data;
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
    if(method === "get.dxWeb.deleteAdmin"){
         //console.log(value)
    if(value.length == 0){
        //console.log(value.length)
        return
    }
    if(value.length == 1){
        //console.log(value.length)
        url = src+"/adminInterface.dx";
        par = "appsercet="+newAppsercet+"&method="+method+"&type=1&userId="+value;
        logsgin(url,par);
        location.reload()
        }
        if(value.length > 1){
            //console.log(value.length)
            url = src+"/adminInterface.dx";
        par = "appsercet="+newAppsercet+"&method="+method+"&type=2&userIdList="+value;
        location.reload()
        
        logsgin(url,par)
        }
    }
    //console.log(value)
    if(value.length == 0){
        //console.log(value.length)
        return
    }
    if(value.length == 1){
        //console.log(value.length)
        url = src+"/adminInterface.dx";
    par = "appsercet="+newAppsercet+"&method="+method+"&type=1&roleId="+value;
    logsgin(url,par);
    location.reload()
    }
    if(value.length > 1){
        //console.log(value.length)
        url = src+"/adminInterface.dx";
    par = "appsercet="+newAppsercet+"&method="+method+"&type=2&roleIdList="+value;
    location.reload()
    
    logsgin(url,par)
    }
    //console.log(value)
  
}
 //编辑操作
 function edit(method,method1){
    var url,par,rolename;

    // Datetime();
    var appsercet = window.localStorage.getItem("appsercet");
    appsercet = JSON.parse(appsercet);
    var newAppsercet = appsercet.data;
    $(".isEdit").click(function(){
        
        var userid;
            add();
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
            
            logsgin(url,par);   
              if(method1 === "get.dxWeb.updateOperation"){
                par = "appsercet="+newAppsercet+"&method="+method+"&userId="+userid;
                
                logsgin(url,par);
               }else{
                par = "appsercet="+newAppsercet+"&method="+method+"&roleId="+roleId;
                
                logsgin(url,par);
               }   
           
            var dxRoleRightsLists = window.localStorage.getItem("dxRoleRightsLists");
            if(dxRoleRightsLists){
                dxRoleRightsLists = JSON.parse(dxRoleRightsLists);

            }
            //console.log(dxRoleRightsLists);
            var dxRightsCategoryList = window.localStorage.getItem("userole");
           
                update = JSON.parse(dxRightsCategoryList);
            if(update){
                var uparr = update.dxRightsList.dxRightsCategoryList;
                console.log(uparr);
            }
            
            var inputs = document.querySelectorAll(".roleLis input");//获取所有的input标签对象
            var checkboxArray = [];//初始化空数组，用来存放checkbox对象。
   
                for (var i = 0; i < inputs.length; i++) {
                    var obj = inputs[i];
                    if (obj.type == 'checkbox') {
                        checkboxArray.push(obj);
                    }
                }
           
               
            if(method === "get.dxWeb.adminDetails"){
              
               $(".user1").val(update.username);
               $(".user2").val(update.pwd);
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
                    if (obj.value == item.id) {
                        obj.checked = true;
                    }
                })   
            }
            }else{
                var item1 =  document.querySelectorAll(".show");
                var checkboxArray1 = [];//初始化空数组，用来存放checkbox对象。
                // for (var i = 0; i < item1.length; i++) {
                //     var obj = item1[i];
                //     if (obj.getAttribute("data-id") == item.rights_id) {
                //         checkboxArray1.push(obj);
                //     }
                // }
                for (var i = 0; i < checkboxArray.length; i++) {
                    var obj = checkboxArray[i];
                    if(dxRoleRightsLists.length>0){
                        $.each(dxRoleRightsLists,function(i,item){
                            //console.log(obj.value)
                            // if (obj.value == item.rights_id) {
                            //     obj.checked = true;
                            // }
                            if (obj.value == item.rights_id) {
                                obj.checked = true;
                            }
                            
                        })
                    }
                    
                
                }
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
                 
                       if (obj1.value == code) {
                           obj1.checked = true;
                       }  
               }
            }
    $(".roleSure").click(function(){
                                                 
            var rightsId,status,rolename;
            var user1,user2,user3,user4
            var val = $(".manRole1 option:checked").val()
            if(val == 0){
                return
            }
           
            user1 =  $(".user1").val();
            user2 =  $(".user2").val();
            user3 =  $(".user3").val();
            user4 =  $(".user4").val();
          
            rolename = $(".role1").val()
            var inputs = document.querySelectorAll(".roleLis input");//获取所有的input标签对象
            var radio = document.querySelectorAll(".status ");
            var checkboxArray = [];//初始化空数组，用来存放checkbox对象。
            for (var i = 0; i < inputs.length; i++) {
                var obj = inputs[i];
                if (obj.type == 'checkbox') {
                    checkboxArray.push(obj);
                }
            }
             rightsId = new Array();
            for (var i = 0; i < radio.length; i++) {
                if (radio[0].checked){
                    status = 1;
                }else{
                    status = 2;
                }
                
            }
            for (var i = 0; i < checkboxArray.length; i++) {
                if (checkboxArray[i].checked)
                rightsId.push(checkboxArray[i].value);
            }
            url = src+"/adminInterface.dx";
       if(method1 === "get.dxWeb.updateOperation"){
        par = "appsercet="+newAppsercet+"&method="+method1+"&status="+status+"&roleIds="+rightsId+"&username="+user1+"&pwd="+user2+"&roleId="+roleId+"&modilePhone="+user4+"&trueName="+user3+"&userId="+userid;
       }else{
        par = "appsercet=" + newAppsercet + "&method="+method1+"&roleName=" + rolename + "&status=" + status + "&rightsIds=" + rightsId + "&roleId=" + roleId;
       }
        logsgin(url, par);
    })
    $(".roleRefuse").click(function(){
        $(".nv91-mask").fadeOut();
        $(".nv91").hide();
    })
})


}
//点击分页完成后判断显示内容
function isHas(){
    
    //页面初次渲染加载数据
   
 var data = window.localStorage.getItem("dxRightsList");    
 data = JSON.parse(data);
 if(data.length>0){
    var arr = [];
    $.each(data, function (i, item) {
        //console.log(item)

        if (item.name == "设置") {
            arr.push(item)
        }
    })
    $.each(arr[0].dxRightsList, function (i, item) {
        
        //console.log(arr[0].dxRightsList)
        if (item.method === "get.dxWeb.managementRoles") {
            
            if (item.dxRightsTwoList.length == 0) {
                return
            }
            else {
                $.each(item.dxRightsTwoList, function (i, obj) {
                    //判断该用户是否有添加管理员权限
                       
                    if (obj.method === "get.dxWeb.addManagementRole" || obj.method === "get.dxWeb.addOperation") {
                        $(".add").show();
                    }
                    //判断该用户是否有启用或禁用权限
                    if (obj.method === "get.dxWeb.isEnableOrProhibit" || obj.method === "get.dxWeb.isAdminEnableOrProhibit") {
                        $(".qy").show();
                        $(".jy").show();
                    }
                    //判断该用户是否有删除权限 
                    if (obj.method === "get.dxWeb.deleteManagementRole" || obj.method === "get.dxWeb.deleteAdmin") {

                        $(".delete").show();
                        $(".isDelete").show();

                    }
                    //判断是否有查看权限
                    if (obj.method === "get.dxWeb.roleDetailse" || obj.method === "get.dxWeb.adminDetails") {
                        $(".isEdit").show()
                        $(".botto").hide();
                    }
                    //判断是否有编辑权限
                    if (obj.method === "get.dxWeb.updateManagementRole" || obj.method === "get.dxWeb.updateOperation") {
                        $(".botto").show()
                    }
                })
            }
        }
    })   
}
 
}
//分页操作
function pagenow(url,method){
    // Datetime();
    var par
    var appsercet = window.localStorage.getItem("appsercet");
    appsercet = JSON.parse(appsercet);
    var newAppsercet = appsercet.data;
    var pageNow = document.querySelectorAll("#pageSelect li");
    $(document).on("click",".pageNow",function(){
        var index = $(this).index()+1;
        par = "appsercet="+newAppsercet+"&method="+method+"&currentPage="+index;
        
        logsgin(url,par);
        $(document).on("click","#prePage",function(){
            index--
            par = "appsercet="+newAppsercet+"&method="+method+"&currentPage="+(index);
            logsgin(url,par);
            if(index == 1){
                return;
                    }
    
        });
        $(document).on("click","#nextPage",function(){
            index++
            par = "appsercet="+newAppsercet+"&method="+method+"&currentPage="+(index);
            logsgin(url,par);
            var length = $("#pageSelect .pageNow").length;
                     if(index > length){
                         return;
                     }
    
        });
        
       
});

$(document).on("click","#jumpBtn",function(){
    
    var index = $("#jumpText").val()
    par = "appsercet="+newAppsercet+"&method="+method+"&currentPage="+(index);
    logsgin(url,par);
}); 
  
}
//角色管理  操作员登录下边分页个数  总数  以及目前在正在显示第几页
function getPage(){
    var page = sessionStorage.getItem("pageInfo");
    pageInfo = JSON.parse(page);
    //console.log(pageInfo.totalRows)
    var pageNum = Math.ceil(pageInfo.totalRows / 10);
    $(".total").html(pageInfo.totalRows);
    $(".pagenum").html(pageNum);
    $(".current").html(pageInfo.currentPage);
}
//监测用户一小时未进行操作则退出页面
function  hasOperate(callback, second) { //second是检测未操作的时间，秒为单位，callback是该时间段未点击需要执行的函数
    var status = true;
    var timer;

    document.body.onmousedown = function () {
        status = true;
    }
    document.body.onmouseup = function () {
        countTime();
    }

    function countTime() {

        setInterval(function() {
            if (!status) {
                callback();
                status = true;
            }
        }, 1);

        if(timer){
            clearInterval(timer);
        }

        timer = setInterval(function () {
            status = false;
        }, second);
    }
    countTime();
}




