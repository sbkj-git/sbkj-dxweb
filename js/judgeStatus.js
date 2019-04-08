/*
判断每个节点用户登陆进来是否有增删改查权限
id:该用户坐在节点id
method:该用户所在节点方法
*/
function judgeStatus(id,method){
    var data = window.localStorage.getItem("dxRightsList");    
    data = JSON.parse(data);
    if(data.length>0){
        var arr = [];
        $.each(data, function (i, item) {
            //console.log(item)

            if (item.id == id) {
                arr.push(item)
            }
        })
        $.each(arr[0].dxRightsList, function (i, item) {              
            //console.log(arr[0].dxRightsList)
            if (item.method === method) {
           
                if (item.dxRightsTwoList.length == 0) {
                    return
                }
                else {
                    $.each(item.dxRightsTwoList, function (i, obj) {
                        //判断该用户是否有添加管理员权限
                        
                        if (obj.method === "get.dxWeb.addManagementRole" || obj.method === "get.dxWeb.addOperation" || obj.method === "get.dxWeb.addFolder") {
                            $(".add").show();
                            $(".addInput").show();
                        }
                        //判断该用户是否有启用或禁用权限
                        if (obj.method === "get.dxWeb.isEnableOrProhibit" || obj.method === "get.dxWeb.isAdminEnableOrProhibit") {
                            $(".qy").show();
                            $(".jy").show();
                        }
                        //判断该用户是否有删除权限 
                        if (obj.method === "get.dxWeb.deleteManagementRole" || obj.method === "get.dxWeb.deleteAdmin" || obj.method === "get.dxWeb.daleteFolder") {

                            $(".delete").show();
                            $(".isDelete").show();

                        }
                        //判断是否有查看权限
                        if (obj.method === "get.dxWeb.roleDetailse" || obj.method === "get.dxWeb.adminDetails" || obj.method === "get.dxWeb.updateFolder") {
                            $(".isEdit").show()
                            $(".botto").hide();
                        }
                        //判断是否有编辑权限
                        if (obj.method === "get.dxWeb.updateManagementRole" || obj.method === "get.dxWeb.updateOperation" || obj.method === "get.dxWeb.updateFolder") {
                            $(".botto").show()
                        }
                    })
                }
            }
        })   
    }


}