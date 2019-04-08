$(document).ready(function(){
    function changeState(el) {
        if (el.readOnly) el.checked=el.readOnly=false;
        else if (!el.checked) el.readOnly=el.indeterminate=true;
    } 
    //页面渲染函数封装
    function bannerList1(bannerList){
            if(bannerList.dxBannerList){
                $(".bannerList").html("");
            var banner = "";
            if (bannerList.dxBannerList.length > 0) {
                $.each(bannerList.dxBannerList, function (i, item) {
                    banner += "<tr style='border-bottom: 1px solid #d8d8d8;color: #8D8D8D;' class='' data-id='" + item.id + "'>";
                    banner += "<td><a href='' class='hrefUrl'><img src='" + item.pic_img + "' style='width: 50px;height:50px;' /></a></td><td>" + item.pic_title + "</td><td>"+item.cate_name+"</td><td><span style='display:block'>" + item.begin_time + "</span><span style='display:block'>" + item.end_time + "</span></td><td><input type='checkbox' class='checkbox"+i+"' name='check' /></td><td>" + item.frequency + "</td><td style='color: #FF5456; ' ><span class='isEdit' data-id='" + item.id + "' >编辑</span>&nbsp;<span class='isDelete' data-id='" + item.id + "'>删除</span>&nbsp;<span class='toTop' data-id='" + item.id + "'>置顶</span></td>";
                    banner += "</tr>";
                    
                })
               $(".bannerList").html(banner);
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
    $(document).ready(function(){
        var url = src + "/bannerGetInterface.dx";
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
            bannerList1(bannerList);
            firstRender();
        })
        //通过cateId名称查询
        var catrId;
        $(".location").change(function () {
            debugger
            catrId = $(".location option:checked").val();
            par = "appsercet=" + newAppsercet + "&method=get.dxWeb.bannerList&cateId=" + catrId;
            var bannerList = getSign(url, par);
            if (bannerList.msg && bannerList.msg.code == "10") {
                $(".bannerList").html("");
            } else {
                bannerList1(bannerList);
                firstRender();
            }
        })
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
                        //网络运营节点下banner初始列表渲染
                        par = "appsercet=" + newAppsercet + "&method=get.dxWeb.bannerList";
                        var bannerList = getSign(url, par);
                        bannerList1(bannerList);


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
                                        var id = $(this).attr("data-id");
                                        par = "appsercet=" + newAppsercet + "&method=get.dxWeb.deleteBanner&id=" + id;
                                        var statu = getSign(url, par);
                                        if (statu.msg.code == "200") {
                                            par = "appsercet=" + newAppsercet + "&method=get.dxWeb.bannerList";
                                            var data = getSign(url, par);
                                            bannerList1(data);
                                        }
                                    })
                                }
                                //判断是否有置顶权限
                                if (obj.method === "get.dxWeb.topBanner") {
                                    $(".toTop").show();
                                    //banner置顶事件   
                                    $(".toTop").click(function () {
                                        var id = $(this).attr("data-id");
                                        par = "appsercet=" + newAppsercet + "&method=get.dxWeb.topBanner&id=" + id;
                                        var statu = getSign(url, par);
                                        if (statu.msg.code == "200") {
                                            par = "appsercet=" + newAppsercet + "&method=get.dxWeb.bannerList";
                                            getSign(url, par);
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
                                        //    $(".updateimg").attr("src",details.msg.pic_img)
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
                                                })
                                            })
                                            var sign1 = sign("get.dxWeb.updatehelp");
                                            var sign2 = sign1.parameter;
                                            var timestamp = sign1.timestamp;
                                            $(".BannerSure").click(function () {
                                                debugger
                                                fileDom = document.getElementById("fileUpload");
                                                imgPreview(fileDom);
                                                getContentTwo("get.dxWeb.updatehelp", id);

                                            })
                                        })
                                    })
                                }
                            })
                        }
                    }
                })
            }
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
                                        var id = $(this).attr("data-id");
                                        par = "appsercet=" + newAppsercet + "&method=get.dxWeb.deleteBanner&id=" + id;
                                        var statu = getSign(url, par);
                                        if (statu.msg.code == "200") {
                                            par = "appsercet=" + newAppsercet + "&method=get.dxWeb.bannerList";
                                            var data = getSign(url, par);
                                            bannerList1(data);
                                        }
                                    })
                                }
                                //判断是否有置顶权限
                                if (obj.method === "get.dxWeb.topBanner") {
                                    $(".toTop").show();
                                    //banner置顶事件   
                                    $(".toTop").click(function () {
                                        var id = $(this).attr("data-id");
                                        par = "appsercet=" + newAppsercet + "&method=get.dxWeb.topBanner&id=" + id;
                                        var statu = getSign(url, par);
                                        if (statu.msg.code == "200") {
                                            par = "appsercet=" + newAppsercet + "&method=get.dxWeb.bannerList";
                                            getSign(url, par);
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
                                        //    $(".updateimg").attr("src",details.msg.pic_img)
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
                                                })
                                            })
                                            var sign1 = sign("get.dxWeb.updatehelp");
                                            var sign2 = sign1.parameter;
                                            var timestamp = sign1.timestamp;
                                            $(".BannerSure").click(function () {
                                                debugger
                                                fileDom = document.getElementById("fileUpload");
                                                imgPreview(fileDom);
                                                getContentTwo("get.dxWeb.updatehelp", id);

                                            })
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
                        alert("请选择图片！");
                        return;
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
            var bannerName, starttime, erdtime, cateId, picurl, state, picImg
            bannerName = $(".bannerName").val();
            cateId = $(".cateId option:checked").val();
            starttime = $(".start").val();
            erdtime = $(".end").val();
            picurl = $(".url").val();
            var radio = document.querySelectorAll(".b6 ");
            for (var i = 0; i < radio.length; i++) {
                if (radio[0].checked) {
                    state = 1;
                } else {
                    state = 2;
                }
            }
            var formData = new FormData();
            formData.append('picImg', $('#fileUpload')[0].files[0]);  //添加图片信息的参数
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
            console.log(formData)
            // var pic = formData.get("picImg");
            // console.log(pic)
            debugger
            var success = post(url, formData);
            console.log(success)
            if (success.msg.code == "200") {
                par = "appsercet=" + newAppsercet + "&method=get.dxWeb.bannerList";
                bannerList = getSign(url, par);
            }

        }      
       
    }) 
})