$(document).ready(function(){
    // judge(href = "../login1.html");
   
    //页面初次加载渲染页面
    var url,par;
    // Datetime();
    var appsercet = window.localStorage.getItem("appsercet");
    appsercet = JSON.parse(appsercet);
    var newAppsercet = appsercet.data;
    var id;


})
//取消按钮点击事件
$(".redux").click(function(){
    $(".nv93 input").val("");
    $(".nv91-mask3").hide();
    $(".nv93").hide();
    $(".nv91").hide();
})
function change(){
var corporateName, corporateWeb,lat,lnt,  address,corporateId,position,username,modilePhone,email;
    //公司信息
    corporateName = $(".s1").val();
    corporateWeb = $(".s2").val();
    lat =$(".s3").val();
    lnt = $(".s4").val();
    address = $(".s6").val();
    //添加公司人员信息
    corporateId = $(".s11 option:checked").val();
    position = $(".s12").val();
    username = $(".s13").val();
    modilePhone = $(".s14").val();
    email = $(".s15").val();
   
        par = "appsercet=" + newAppsercet + "&method=get.dxWeb.addCompanyWeb&corporateName=" + corporateName + "&corporateWeb=" + corporateWeb + "&lat=" + lat + "&lnt=" + lnt + "&address=" + address;
    
    var  data = getSign(url, par);
    console.log(data);
    if (data.msg.code == "10") {
        $(".confirm").hide();
        $(".prompt").text("操作成功");
        $(".nv91-mask3").show();
        $(".nv1").show();
        setTimeout(function () {
            $(".nv91-mask3").hide();
            $(".nv91").hide();
            $(".nv92").hide();
            $(".nv1").hide();
            location.reload();

        }, 2000);
    } else {

    }
}
//处理设置节点下基础设置公司人员添加点击事件触发查询的所有公司信息   
function list(data){
    $(".s11").html("");
    if (data.dxCompanyWebList.length > 0) {
        var str = "<option value='0'>--请选择--</option>";
        $.each(data.dxCompanyWebList, function (i, item) {
            str += "<option value='" + item.id + "'>" + item.corporate_name + "</option>";
        })
        $(".s11").html(str);
    }
}
//封装添加公司职工修改公司职工方法
function see(method,url){
    
    var corporateName, corporateWeb,lat,lnt,  address,corporateId,position,username,modilePhone,email;
    //公司信息
    corporateName = $(".s1").val();
    corporateWeb = $(".s2").val();
    lat =$(".s3").val();
    lnt = $(".s4").val();
    address = $(".s6").val();
    //添加公司人员信息
    corporateId = $(".s11 option:checked").val();
    position = $(".s12").val();
    username = $(".s13").val();
    modilePhone = $(".s14").val();
    email = $(".s15").val();
    if(corporateId == "" || position == "" || username == "" ||modilePhone == "" || email == ""){
       
        return;
    }
    if(method === "get.dxWeb.updateCompanyStaff"){

        par = "appsercet=" + newAppsercet + "&method=" + method + "&corporateId=" + corporateId + "&position=" + position + "&username=" + username + "&modilePhone=" + modilePhone + "&email=" + email+"&id="+id;

    }else if(method === "get.dxWeb.addCompanyStaff"){

        par = "appsercet=" + newAppsercet + "&method=" + method + "&corporateId=" + corporateId + "&position=" + position + "&username=" + username + "&modilePhone=" + modilePhone + "&email=" + email;
    }

    var data = getSign(url, par);
    console.log(data);
    if (data.msg.code == "200") {
        $(".confirm").hide();
        $(".nv91-mask3").hide();
        $(".prompt").text("操作成功");
        $(".nv1").show();
        setTimeout(function () {
            $(".nv1").hide();
            location.reload();

        }, 2000);;
       
    }else{
        $(".confirm").hide();
        $(".nv91-mask3").hide();
        $(".prompt").text("操作失败");
        $(".nv3").show();
        setTimeout(function () {
            $(".nv3").hide();
            location.reload();

        }, 2000);;
    }

}

//页面初次渲染加载数据
//页面初次加载渲染页面
var url,par;
// Datetime();
var appsercet = window.localStorage.getItem("appsercet");
appsercet = JSON.parse(appsercet);
var newAppsercet = appsercet.data;
var data = window.localStorage.getItem("dxRightsList");
data = JSON.parse(data);
//console.log(data);

//判断是否有添加管理员操作权限
// return
var arr = [];
$.each(data,function(i,item){
    //console.log(item)
    if(item.id == 9){
        arr.push(item)
    }
})
//console.log(arr[0]);

$.each(arr[0].dxRightsList,function(i,item){
    //console.log(arr[0].dxRightsList)
    if(item.method === "get.dxWeb.basics"){
        url = src+"/"+item.link_path;
        par = "appsercet="+newAppsercet+"&method="+item.method;
        var data = getSign(url,par);
        console.log(data);
        //手机网站
        var phone = data.dxbasics.phone_web;

        //手机访问
         var visit = data.dxbasics.phone_visit;
var radio = document.querySelectorAll(".st1");
    var radio1 = document.querySelectorAll(".st2");      
           for (var i = 0; i < radio.length; i++) {
               var obj = radio[i];
               if (obj.value == phone) {
                obj.checked = true;
               }
           }
           for (var j = 0; j < radio1.length; j++) {
               var obj1 = radio1[j];
             
                   if (obj1.value == visit) {
                       obj1.checked = true;
                   }  
           }
           //修改手机网站方法
           var radio = document.querySelectorAll(".st1");
    var radio1 = document.querySelectorAll(".st2");
           
           $(".st1").change(function(){
               
               var value1,obj  
            for (var i = 0; i < radio.length; i++) {
               obj = radio[i];
               if (obj.checked == true) {
                value1 = obj.value;
                url = src + "/adminInterface.dx";
                par = "appsercet="+newAppsercet+"&method=get.dxWeb.dxSetUp&phoneWeb="+value1;
               }
           }
           var data  = getSign(url,par);
                if(data.msg.code == "200"){
                     $(".confirm").hide();
                            $(".prompt").text("操作成功");
                            $(".nv91-mask3").show();
                            $(".nv1").show();
                            setTimeout(function () {
                                $(".nv91-mask3").hide();
                                $(".nv1").hide();
                                location.reload();

                            }, 2000);;
                   
                }else{
                    $(".confirm").hide();
                    $(".nv3").text("操作失败");
                    $(".nv91-mask3").show();
                    $(".nv3").show();
                    setTimeout(function () {
                        $(".nv91-mask3").hide();
                        $(".nv3").hide();
                        
                    }, 2000);   
                }
           })
           $(".st2").change(function(){
            var value2,obj1;
            
            for (var i = 0; i < radio1.length; i++) {
               obj1 = radio1[i];
             
                   if (obj1.checked = true) {
                    value2 = obj1.value;
                    url = src + "/adminInterface.dx";
                    par = "appsercet="+newAppsercet+"&method=get.dxWeb.dxSetUp&phoneVisit="+value2;
                
                   }  
           } 
           var data  = getSign(url,par);
           if(data.msg.code == "200"){
                $(".confirm").hide();
                            $(".prompt").text("操作成功");
                            $(".nv91-mask3").show();
                            $(".nv1").show();
                            setTimeout(function () {
                                $(".nv91-mask3").hide();
                                $(".nv1").hide();
                                location.reload();

                            }, 2000);;
             
           }else{
            $(".confirm").hide();
            $(".nv3").text("操作失败");
            $(".nv91-mask3").show();
            $(".nv3").show();
            setTimeout(function () {
                $(".nv91-mask3").hide();
                $(".nv3").hide();
                
            }, 2000); 
           } 
            })
              
          
           
        var company1 = "";
        $.each(data.dxbasics.dxcompanywebList, function (i, item) {
            company1 += "<tr>";
            company1 += "<td>" + item.corporate_name + "</td><td>" + item.corporate_web + "</td><td>" + item.lat + "," + item.lnt + "</td><td>" + item.ip_addr + "<td style='color:#FF5456;' data-id='" + item.id + "' ><span data-id='" + item.id + "' class='edits'>编辑</span>&nbsp;&nbsp;<span data-id='" + item.id + "' class='delete1'>删除</span></td>";
            company1 += "/<tr >"
        });
        $(".company1").append(company1)
        var company2 = "";
        $.each(data.dxbasics.dxCompanyStaffList, function (i, item) {
            company2 += "<tr >";
            company2 += "<td>" + item.corporate_name + "</td><td>" + item.position + "</td><td>" + item.username + "</td><td>" + item.modile_phone + "</td><td>" + item.email + "<td style='color:#FF5456;'><span data-id='" + item.id + "' class='edit2'>编辑</span>&nbsp;&nbsp;<span data-id='" + item.id + "' class='delete2'>删除</span></td>";
            company2 += "/<tr >";
        })
        $(".company2").append(company2);
        //判断该角色是否有权限操作
        if(item.dxRightsTwoList.length == 0){
            return
        }
        else{
            $.each(item.dxRightsTwoList,function(i,obj){
                //判断该用户是否有添加管理员权限
                if(obj.method === "get.dxWeb.addCompanyWeb"){

                    $(".addCompany").show();
                    $(".addCompany").click(function () {
                        $(".nv91-mask3").show();
                        $(".nv91").show();
                        // $(".sure11").click(function () {

                        //     see("get.dxWeb.addCompanyWeb", url)
                        // })
                        //将添加信息暂时存放在缓存中  用于地图返回渲染
                        $(".s1").blur(function () {
                            localStorage.setItem("s1", $(this).val());
                        })
                        $(".s2").blur(function () {
                            localStorage.setItem("s2", $(this).val());
                        })
                        $(".s6").blur(function () {
                            localStorage.setItem("address", $(this).text());
                        })
                    })
                    //点击选择经度纬度后返回原来页面获取之前写入的数据

                    var return1 = localStorage.getItem("return1");
                    if (return1 == "yes") {
                        var lnt = localStorage.getItem("lnt");
                        var lat = localStorage.getItem("lat");
                        var s1 = localStorage.getItem("s1");
                        var s2 = localStorage.getItem("s2");
                        var address = localStorage.getItem("address");
                        if (lnt && lat) {

                            $(".nv91-mask3").show();
                            $(".nv91").show();
                            $(".nv93").hide();
                            $(".s3").val(lat);
                            $(".s4").val(lnt);
                            if (s1) {
                                $(".s1").val(s1);
                            }
                            if (s2) {
                                $(".s2").val(s2);
                            }
                            if (address) {
                                $(".s6").val(address);
                            }
                            localStorage.setItem("s1", "");
                            localStorage.setItem("s2", "");
                            localStorage.setItem("address", "");
                            localStorage.setItem("lnt", "");
                            localStorage.setItem("lat", "");
                        }
                        // $(".sure11").click(function () {
                        //
                        //     see("get.dxWeb.addCompanyWeb", url)
                        // })
                    }
                }

                //判断是否有删除权限
               if(obj.method === "get.dxWeb.deleteCompanyWeb"){
                $(".delete1").show();
                    $(".delete1").click(function () {
                        var id = $(this).attr("data-id");
                        par = "appsercet=" + newAppsercet + "&method=get.dxWeb.deleteCompanyWeb&id=" + id;

                        var data = getSign(url, par);
                        if(data.msg.code == "200"){
                            $(".confirm").hide();
                            $(".prompt").text("删除成功");
                            $(".nv91-mask3").show();
                            $(".nv1").show();
                            setTimeout(function () {
                                $(".nv91-mask3").hide();
                                $(".nv1").hide();
                                location.reload();
    
                            }, 2000);;
                        }else{
                            $(".confirm").hide();
                            $(".prompt").text("删除失败");
                            $(".nv91-mask3").show();
                            $(".nv3").show();
                            setTimeout(function () {
                                $(".nv91-mask3").hide();
                                $(".nv3").hide();
                              
    
                            }, 2000);;  
                        }
                        
                    }) 
               }
                if(obj.method === "get.dxWeb.updateCompanyWeb"){
                    $(".edits").show();
                    $(".edits").click(function () {
                        id = $(this).attr("data-id");
                        $(".nv91-mask3").show();
                        $(".nv93").show();
                        $(".nv91").hide();
                        par = "appsercet=" + newAppsercet + "&method=get.dxWeb.getCompanyWeb&id=" + id;
                        var data = getSign(url, par);
                        
                        //处理设置节点下基础设置公司信息详情渲染
                        if (data.msg.code == "200") {
                            var x = data.dxCompanyWeb
                            $(".s21").val(x.corporate_name);
                            $(".s22").val(x.corporate_web);
                            $(".s23").val(x.lat);
                            $(".s24").val(x.lnt);
                            $(".s26").val(x.address);

                        }
                        $(".sure12").click(function () {
                        
                        //公司信息
                        var corporateName, corporateWeb, lat, lnt, address;
                        //公司信息
                        corporateName = $(".s21").val();
                        corporateWeb = $(".s22").val();
                        lat = $(".s23").val();
                        lnt = $(".s24").val();
                        address = $(".s26").val();
                       

                        par = "appsercet=" + newAppsercet + "&method=get.dxWeb.updateCompanyWeb&corporateName=" + corporateName + "&corporateWeb=" + corporateWeb + "&lat=" + lat + "&lnt=" + lnt + "&address=" + address+"&id="+id;
                        console.log(par)
                        var data = getSign(url, par);
                        if(data.msg.code == "200"){
                            $(".confirm").hide();
                            $(".prompt").text("操作成功");
                            $(".nv91-mask3").show();
                            $(".nv1").show();
                            setTimeout(function () {
                                $(".nv91-mask3").hide();
                                $(".nv1").hide();
                                location.reload();
    
                            }, 2000);;
                        }else{
                            $(".confirm").hide();
                            $(".prompt").text("操作失败");
                            $(".nv91-mask3").show();
                            $(".nv3").show();
                            setTimeout(function () {
                                $(".nv91-mask3").hide();
                                $(".nv3").hide();
                              
    
                            }, 2000); 
                        }
                        
                    })
                       
                    })
                    //将添加信息暂时存放在缓存中  用于地图返回渲染
                   
                    $(".s21").blur(function () {
                            localStorage.setItem("s21", $(this).val());
                        })
                        $(".s22").blur(function () {
                            localStorage.setItem("s22", $(this).val());
                        })
                        $(".s26").blur(function () {
                            localStorage.setItem("address", $(this).text());
                        })
                        var return1 = localStorage.getItem("return1");
                    if (return1 == "yes") {
                        var lnt = localStorage.getItem("lnt");
                        var lat = localStorage.getItem("lat");
                        var s1 = localStorage.getItem("s21");
                        var s2 = localStorage.getItem("s22");
                        var address = localStorage.getItem("address");
                        if (lnt && lat) {

                            $(".nv91-mask3").show();
                            $(".nv91").show();
                            $(".nv93").hide();
                            $(".s23").val(lat);
                            $(".s24").val(lnt);
                            if (s1) {
                                $(".s21").val(s1);
                            }
                            if (s2) {
                                $(".s22").val(s2);
                            }
                            if (address) {
                                $(".s26").val(address);
                            }
                            localStorage.setItem("s21", "");
                            localStorage.setItem("s22", "");
                            localStorage.setItem("address", "");
                            localStorage.setItem("lnt", "");
                            localStorage.setItem("lat", "");
                        }
                        // $(".sure11").click(function () {
                        //
                        //     see("get.dxWeb.addCompanyWeb", url)
                        // })
                        // $(".sure12").unbind('click').bind("click",function(){ 
                    

                    }
                   
                }
                //判断是否有添加职工权限
                if(obj.method === "get.dxWeb.addCompanyStaff"){
                    $(".addPerson").show();
                    $(".addPerson").click(function () {
                        $(".nv91-mask3").show();
                        $(".nv92").show();

                        par = "appsercet=" + newAppsercet + "&method=get.dxWeb.listCompanyWeb";
                        var data = getSign(url, par);
                        list(data);
                        $(".sure2").click(function () {
                            see("get.dxWeb.addCompanyStaff", url)
                        })
                    })
                }
                //判断是否有编辑员工权限
                if (obj.method === "get.dxWeb.updateCompanyStaff") {
                    $(".edit2").show();
                    $(".edit2").click(function () {
                        id = $(this).attr("data-id");
                        $(".nv91-mask3").show();
                        $(".nv92").show();

                        par = "appsercet=" + newAppsercet + "&method=get.dxWeb.listCompanyWeb";
                        var data = getSign(url, par);
                        list(data);
                        par = "appsercet=" + newAppsercet + "&method=get.dxWeb.getCompanyStaff&id=" + id;
                        var data = getSign(url, par);
                        //处理设置节点下基础设置公司人员详情渲染
                        if (data.msg.code == "200") {
                            var y = data.dxCompanyStaff;
                            var s11 = document.querySelectorAll(".s11 option");
                            for (var i = 0; i < s11.length; i++) {
                                var obj = s11[i];
                                console.log(obj.innerHTML)
                                if (obj.innerHTML === y.corporate_name) {
                                    obj.selected = true;
                                }
                            }
                            $(".s12").val(y.username);
                            $(".s13").val(y.position);
                            $(".s14").val(y.modile_phone);
                            $(".s15").val(y.email);
                        }
                        $(".sure2").click(function () {
                            see("get.dxWeb.updateCompanyStaff", url)
                        })
                    })


                }
                //判断是否有删除员工权限
                if(obj.method === "get.dxWeb.deleteCompanyStaff"){
                    $(".delete2").show();
                    $(".delete2").click(function () {
                        var id = $(this).attr("data-id");
                        par = "appsercet=" + newAppsercet + "&method=get.dxWeb.deleteCompanyStaff&id=" + id;

                        var data = getSign(url, par);
                        if(data.msg.code == "200"){
                            $(".confirm").hide();
                            $(".prompt").text("删除成功");
                            $(".nv91-mask3").show();
                            $(".nv1").show();
                            setTimeout(function () {
                                $(".nv91-mask3").hide();
                                $(".nv1").hide();
                                location.reload();
    
                            }, 2000);;
                        }else{
                            $(".confirm").hide();
                            $(".prompt").text("删除失败");
                            $(".nv91-mask3").show();
                            $(".nv3").show();
                            setTimeout(function () {
                                $(".nv91-mask3").hide();
                                $(".nv3").hide();
                              
    
                            }, 2000);;  
                        }
                    })
                }
            })
        }
    }
})
