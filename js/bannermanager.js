$(document).ready(function(){
    function changeState(el) {
        if (el.readOnly) el.checked=el.readOnly=false;
        else if (!el.checked) el.readOnly=el.indeterminate=true;
    } 
    //点击弹窗关闭时间
    $(".BannerRefuse1").click(function(){
        debugger
        $(".nv91-mask").hide();
        $(".nv91").hide();
    })
    $(".roleRefuse5").click(function(){
        debugger
        $(".nv91-mask").hide();
        $(".nv").hide();
    })
    $(".nv91-close").click(function(){
        debugger
        $(".nv91-mask").hide();
        $(".nv91").hide();
    })
    //页面渲染函数封装
    function bannerList1(bannerList){
            if(bannerList.dxBannerList){
                $(".bannerList").html("");
            var banner = "";
            if (bannerList.dxBannerList.length > 0) {
                $.each(bannerList.dxBannerList, function (i, item) {
                    banner += "<tr style='border-bottom: 1px solid #d8d8d8;color: #8D8D8D;' class='' data-id='" + item.id + "'>";
                    banner += "<td><a href='' class='hrefUrl'><img src='" + item.pic_img + "' style='width: 50px;height:50px;' /></a></td><td>" + item.pic_title + "</td><td>"+item.cate_name+"</td>"
                    if (item.is_up == 1) {
                        banner += "<td>&#10003;</td>";
                    } else {
                        banner += "<td>&#10007;</td>"
                    }
                    banner+="<td><span style='display:block'>" + item.begin_time + "</span><span style='display:block'>" + item.end_time + "</span></td>";
                    if(item.state == 1){
                        banner+="<td><input class='switch switch-anim' type='checkbox' checked data-id='" + item.id + "'></td>";
                    }else{
                        banner+="<td><input class='switch switch-anim' type='checkbox' data-id='" + item.id + "'></td>";
                    }
                    
                    banner+="<td>" + item.frequency + "</td><td style='color: #FF5456; ' ><span class='isEdit' data-id='" + item.id + "' >编辑</span>&nbsp;<span class='isDelete' data-id='" + item.id + "'>删除</span>&nbsp;"
                    if (item.is_up == 1) {
                        banner+="<span class='toDown' data-id='" + item.id + "'>取消置顶</span></td>";
                    } else {
                        banner+="<span class='toTop ' data-id='" + item.id + "'>置顶</span>&nbsp;<span class='toDown disnone' data-id='" + item.id + "'>取消置顶</span></td>";
                    }
                    
                    banner += "</tr>";
                    
                })
               $(".bannerList").html(banner);
               firstRender();
               var switch1 = document.querySelectorAll(".switch");
          
               var state,id;
               $(document).on("click",".switch",function(){
                //1. 获取id值
                debugger
                var id = $(this).attr("data-id");
                if($(this).attr("checked")== true){
                    state = 1;     
                
                }else{
                    state = 2;
                    
                }
                par = "appsercet="+newAppsercet+"&method=get.dxWeb.updatehelp&id="+id+"&state="+state;
                var data = getSign(url,par);
                if(data.msg.code == "200"){
                    alert("操作成功");
                    location.reload();
                }
        
                 });
       
           
            }   
    }
        }             
    var url,par; 
    var fileDom      
        var appsercet = window.localStorage.getItem("appsercet");
        appsercet = JSON.parse(appsercet);
        var appid = localStorage.getItem("appid");
        console.log(appid)
        var newAppsercet = appsercet.data;
        // $(".switch").each(function(){
        //     //修改上下线状态
            
        //  });
        
        
         //网络运营节点下banner初始列表渲染
        var url = src + "/bannerGetInterface.dx"; 
         localStorage.setItem("pageNow1",1)     
         var currentPage = localStorage.getItem("pageNow1")
         par = "appsercet="+newAppsercet+"&method=get.dxWeb.bannerList&currentPage="+currentPage;
              
             var data2 = getSign(url, par);
             bannerList1(data2);
             console.log(data2)
            
             pageCount = Math.ceil(data2.pageInfo.totalRows/10);
             new Page({
                 id: 'pagination2',
                 pageTotal: pageCount, //必填,总页数
                 pageAmount: 10,  //每页多少条
                 dataTotal: data2.pageInfo.totalRows, //总共多少条数据
                 curPage:1, //初始页码,不填默认为1
                 pageSize: 5, //分页个数,不填默认为5
                 showPageTotalFlag:true, //是否显示数据统计,不填默认不显示
                 showSkipInputFlag:true, //是否支持跳转,不填默认不显示
                 getPage: function (page) {
                     //获取当前页数
                    console.log(page);
                 }
             })
         
         //分页渲染
         $(document).on("click",".pageItem",function(){
            currentPage = $(this).html();
            localStorage.setItem("pageNow1",1)     
            var currentPage = localStorage.getItem("pageNow1")
            par = "appsercet="+newAppsercet+"&method=get.dxWeb.bannerList&currentPage="+currentPage;
                 
                var data2 = getSign(url, par);
                bannerList1(data2);
         })
        
            var re = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/ 
            var ret = document.querySelector(".returnPage");
            $(".returnPage").blur(function () {
                debugger
                var value = $(this).val();
                if (!re.test(value)) {
                    alert("请输入数字");

                    return false;
                } else {
                    currentPage = value;
                    par = "appsercet=" + newAppsercet + "&method=get.dxWeb.bannerList&currentPage=" + currentPage;

                    var data2 = getSign(url, par);
                    bannerList1(data2);
                    $(this).val("");
                }

            })
         
        par = "appsercet="+newAppsercet+"&method=get.dxWeb.getBannerCateList";
        //获取banner下拉列表内容
        var data = getSign(url,par);
        if(data.dxBannerCateList){                     
            if (data.dxBannerCateList.dxRightsCategoryList.length == 0) {
                return;
            } else {
                $(".location").html("");
                $(".b3").html("");
                var str = "";
                str = "<option value='0' selected>--请选择--</option>";
                $.each(data.dxBannerCateList.dxRightsCategoryList, function (i, item) {
                    str += "<option value='" + item.id + "'>【" + item.type + "】" + item.cate_name + "</option>"
                })
                $(".location").html(str);
                $(".cateId").html(str);
            }
        }
        //通过banner名称查询
        $(".bannerName1").click(function () {
            var bannerName = $(".bannerName12").val();
            par = "appsercet=" + newAppsercet + "&method=get.dxWeb.bannerList&bannerName=" + bannerName;
            var bannerList = getSign(url, par);
            if(bannerList.msg && bannerList.msg.code == "10"){
                $(".bannerList").html("");
                alert("没有数据");
            }else{
                bannerList1(bannerList);
               
            }
            
        })
        //通过cateId名称查询
        var catrId;
        var bannerList
        $(".location").change(function () {
            
            catrId = $(".location option:checked").val();
            if(catrId == "0"){
                
                par = "appsercet=" + newAppsercet + "&method=get.dxWeb.bannerList";
            }else{
                par = "appsercet=" + newAppsercet + "&method=get.dxWeb.bannerList&cateId=" + catrId;
            }
            bannerList = getSign(url, par);
            if (bannerList.msg && bannerList.msg.code == "10") {
                $(".bannerList").html("");
            } else {
                bannerList1(bannerList);

               
            }
        });
        //通过反馈时间查询
        $(".sec1").click(function(){
            var  starttime = $(".start1").val();
            var erdtime = $(".end1").val();
            par = "appsercet=" + newAppsercet + "&method=get.dxWeb.bannerList&starttime="+starttime+"&erdtime="+erdtime;
            debugger
            var bannerList = getSign(url,par);
            if(bannerList.msg && bannerList.msg.code == "10"){
                $(".bannerList").html("");
                alert("没有数据");
            }
            bannerList1(bannerList);
            firstRender();
        })
        
       
            function firstRender() {
            //页面初次渲染加载数据
            var data = window.localStorage.getItem("dxRightsList");
            data = JSON.parse(data);
            if (data.length > 0) {
                var arr = [];
                $.each(data, function (i, item) {
                    //console.log(item)
                    if (item.id == 2) {
                        arr.push(item)
                    }
                })
                $.each(arr[0].dxRightsList, function (i, item) {
                    if (item.method === "get.dxWeb.bannerList") {
                       
                        if (item.dxRightsTwoList.length == 0) {
                            return
                        }
                        else {
                            $.each(item.dxRightsTwoList, function (i, obj) {
                                //判断该用户是否有添加管理员权限                           
                                if (obj.method === "get.dxWeb.addhelp") {
                                    $(".add").show();
                                    //Banner添加事件
                                    $(".addInput").click(function () {
                                        $(".nv91-mask").show();
                                        $(".nv91").show();
                                        $(".upload1").click(function () {
                                            $("#fileUpload").click();
                                            $("#fileUpload").change(function () {
                                                $(".needHide").hide();
                                                $(".slideImg").slideDown();
                                            })
                                        })
                                        $(".BannerSure").click(function () {


                                            fileDom = document.getElementById("fileUpload");
                                            imgPreview(fileDom);
                                            getContentTwo("get.dxWeb.addhelp", 1);
                                        })
                                    })
                                }
                                //判断该用户是否有删除权限 
                                if (obj.method === "get.dxWeb.deleteBanner") {
                                    $(".isDelete").show();
                                    //banner删除事件
                                    $(".isDelete").click(function () {
                                        debugger
                                        var id = $(this).attr("data-id");
                                        $(".nv91-mask").show();
                                        $(".nv").show();
                                        $(".roleSure").click(function(){
                                            $(".nv91-mask").hide();
                                            $(".nv").hide();
                                            par = "appsercet=" + newAppsercet + "&method=get.dxWeb.deleteBanner&id=" + id;
                                            var statu = getSign(url, par);
                                            if (statu.msg.code == "200") {
                                                par = "appsercet=" + newAppsercet + "&method=get.dxWeb.bannerList";
                                                var data = getSign(url, par);
                                                bannerList1(data);
                                                
                                            }
                                        })
                                        $(".roleRefuse").click(function(){
                                            $(".nv91-mask").show();
                                            $(".nv").show(); 
                                        })
                                        
                                    })
                                }
                                //判断是否有置顶权限
                                if (obj.method === "get.dxWeb.topBanner") {
                                    debugger
                                    $(".toTop").show();
                                    //banner置顶事件   
                                    $(".toTop").click(function () {
                                        var index = $(this).index();
                                        debugger
                                        var id = $(this).attr("data-id");
                                        par = "appsercet=" + newAppsercet + "&method=get.dxWeb.topBanner&id=" + id+"&type=1";
                                        var statu = getSign(url, par);
                                       
                                        if (statu.msg.code == "200") {
                                            alert("置顶成功");
                                            // $(".toTop").eq(index).hide();
                                            location.reload();
                                            
                                        }
                                    })
                                    $(".toDown").click(function () {
                                        debugger
                                        var id = $(this).attr("data-id");
                                        par = "appsercet=" + newAppsercet + "&method=get.dxWeb.topBanner&id=" + id+"&type=2";
                                        var statu = getSign(url, par);
                                        if (statu.msg.code == "200") {
                                            alert("取消置顶成功");
                                            // $(".toDown").eq(index).hide();
                                            location.reload();
                                            
                                        }
                                    })
                                }
                                //判断是否有编辑权限
                                if (obj.method === "get.dxWeb.updatehelp") {
                                    $(".isEdit").show();
                                    //banner编辑修改事件
                                    $(".isEdit").click(function () {
                                        // var index = $(this).index;
                                        $(".nv91-mask").show();
                                        $(".nv91").show();
                                        $(".slideImg").show();
                                        $(".needHide").hide();

                                        var id = $(this).attr("data-id")
                                        par = "appsercet=" + newAppsercet + "&method=get.dxWeb.getBanner&id=" + id;

                                        var details = getSign(url, par);
                                        console.log(details);
                                        // $("#fileUpload").val(details.msg.pic_img)
                                        $(".bannerName").val(details.msg.pic_title);
                                        var bannerCate = document.querySelectorAll(".cateId option");
                                        for (var i = 0; i < bannerCate.length; i++) {
                                            var item = bannerCate[i];
                                            if (item.value == details.msg.cate_id) {
                                                item.selected = true;
                                            }
                                        }
                                           $(".updateimg").attr("src",details.msg.pic_img)
                                        $(".start").val(details.msg.begin_time);
                                        $(".end").val(details.msg.end_time);
                                        $(".url").val(details.msg.pic_url);
                                        var radio = document.querySelectorAll(".b6 ");
                                        for (var i = 0; i < radio.length; i++) {
                                            var obj = radio[i]
                                            if (obj.value == details.msg.state) {
                                                obj.checked = true;
                                            }
                                        }
                                        $(".updateimg").click(function () {
                                            $(".needHide").show();
                                            $(".slideImg").hide();
                                            $(".upload1").click(function () {
                                                $("#fileUpload").click();
                                                $("#fileUpload").change(function () {
                                                    $(".needHide").hide();
                                                    $(".slideImg").slideDown();
                                                    // fileDom = document.getElementById("fileUpload");
                                                    // imgPreview(fileDom);
                                                })
                                            })
                                            
                                            
                                        })
                                        $(".BannerSure").click(function () {
                                            var sign1 = sign("get.dxWeb.updatehelp");
                                            var sign2 = sign1.parameter;
                                            var timestamp = sign1.timestamp;   
                                            fileDom = document.getElementById("fileUpload");
                                            imgPreview(fileDom);
                                            debugger
                                            getContentTwo("get.dxWeb.updatehelp", id);

                                        })
                                    })
                                }
                                
                            })
                        }
                    }
                })
            }
        }
        function imgPreview(fileDom) {
                    
                    //判断是否支持FileReader
                    if(window.FileReader) {
                        var reader = new FileReader();
                    } else {
                        alert("您的设备不支持图片预览功能，如需该功能请升级您的设备！");
                    }
                    //获取文件
                    var file = fileDom.files[0];
                    var imageType = /^image\//;
                    //是否是图片
                    if(!imageType.test(file.type)) {
                        // alert("请选择图片！");
                        // return;
                    }
                    //读取完成
                    reader.onload = function(e) {
                        //获取图片dom
                        var img = document.querySelector(".updateimg");
                        //图片路径设置为读取的图片
                        img.src = e.target.result;
                    };
                    reader.readAsDataURL(file);
                }
        function getContentTwo(method,id) {
            debugger
            var appid = localStorage.getItem("appid");
            var sign1 = sign(method);
            var sign2 = sign1.parameter;
            var timestamp = sign1.timestamp;
            var bannerName, starttime, erdtime, cateId, picurl, state, picImg,isUp
            bannerName = $(".bannerName").val();
            cateId = $(".cateId option:checked").val();
            starttime = $(".start").val();
            erdtime = $(".end").val();
            picurl = $(".url").val();
            // var radio1 = document.querySelectorAll(".b61 ");
            // for (var i = 0; i < radio1.length; i++) {
            //     if (radio1[0].checked) {
            //         isUp = 1;
            //     } else {
            //         isUp = 2;
            //     }
            // }
            var radio = document.querySelectorAll(".b6 ");
            for (var i = 0; i < radio.length; i++) {
                if (radio[0].checked) {
                    state = 1;
                } else {
                    state = 2;
                }
            }
            var formData = new FormData();
            if($('#fileUpload')[0].files[0]=="undefined" ||$('#fileUpload')[0].files[0] == "" || $('#fileUpload')[0].files[0] == null){
                // formData.append('picImg', $(".updateimg").attr("src"));  //添加图片信息的参数
            }else{
                formData.append('picImg', $('#fileUpload')[0].files[0]);  //添加图片信息的参数

            }
            // formData.append('picImg', $('#fileUpload')[0].files[0]);  //添加图片信息的参数
            console.log($('#fileUpload')[0].files[0]);
            formData.append('sign', sign2);  //添加其他参数
            formData.append('timestamp', timestamp);  //添加其他参数
            formData.append('bannerName', bannerName);  //添加其他参数
            formData.append('cateId', cateId);  //添加其他参数
            if (method === "get.dxWeb.updatehelp") {
                formData.append('id', id);
            

            }
            formData.append('starttime', starttime);  //添加其他参数
            formData.append('erdtime', erdtime);  //添加其他参数
            formData.append('appid', appid);  //添加其他参数
            formData.append('appsercet', newAppsercet);  //添加其他参数
            formData.append('method', method);  //添加其他参数
            formData.append('picurl', picurl);  //添加其他参数
            formData.append('state', state);  //添加其他参数
            // formData.append('isUp', isUp);  //添加其他参数
            console.log(formData)
            // var pic = formData.get("picImg");
            // console.log(pic)
            debugger
            var success = post(url, formData);
            console.log(success);
            $(".nv91-mask").hide();
            $(".nv91").hide();
            location.reload();
            // if (success.msg.code == "200") {
            //    location.reload();
            // }

        }   
        
        
       
   
})