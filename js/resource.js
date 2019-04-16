$(document).ready(function () {
    function changeState(el) {
        if (el.readOnly) el.checked = el.readOnly = false;
        else if (!el.checked) el.readOnly = el.indeterminate = true;
    }
   $(".nv91-close").clone(function(){
       $(".nv91-mask").hide();
       $(".nv91").hide();
   })
    //封装添加修改方法
    function addUpdate(method, id, embel) {
        var appsercet = window.localStorage.getItem("appsercet");
        appsercet = JSON.parse(appsercet);
        var newAppsercet = appsercet.data;
        var sourceId, brandName, url, result
        url = src + "/libraryInterface.dx";
        brandName = $(".filename").val();
        sourceId = $(".fileid option:checked").val();

        if (method === "get.dxWeb.updateFolder") {

            par = "appsercet=" + newAppsercet + "&method=" + method + "&id=" + id + "&brandName=" + brandName + "&sourceId=" + sourceId;
        } else if (method === "get.dxWeb.addFolder") {
            par = "appsercet=" + newAppsercet + "&method=" + method + "&brandName=" + brandName + "&sourceId=" + sourceId;
        }

        else {

            par = "appsercet=" + newAppsercet + "&method=" + method + "&brandName=" + brandName + "&sourceId=" + sourceId + "&embel=" + embel;
        }
        result = getSign(url, par);
        return result;
    }

//
    var urlSrc1, urlId1
    var appsercet = window.localStorage.getItem("appsercet");
    appsercet = JSON.parse(appsercet);
    var newAppsercet = appsercet.data;
    url = src + "/libraryInterface.dx";
    // 请求完成渲染页面 待处理
    var florId = localStorage.getItem("florId");
    if (florId == "" || florId == null || florId == "undefined") {
        par = "appsercet=" + newAppsercet + "&method=get.dxWeb.queryFileAll";
    } else {
        par = "appsercet=" + newAppsercet + "&method=get.dxWeb.queryFileAll&folderId=" + florId;
    }

    var list = getSign(url, par);
    render3(list);
    //添加页面点击事件渲染页面
    var urlSrc1, urlId1

    $(".addPhone").click(function () {
        
        $(".nv91-mask").show();
        $(".nv91").show();
        $(".nv92").hide();
        // 请求完成渲染页面 待处理
        var florId = localStorage.getItem("florId");
        if (florId == "" || florId == null || florId == "undefined") {
            par = "appsercet=" + newAppsercet + "&method=get.dxWeb.queryFileAll";
        } else {
            par = "appsercet=" + newAppsercet + "&method=get.dxWeb.queryFileAll&folderId=" + florId;
        }

        var list = getSign(url, par);
        render3(list);
        $(this).val("修改图片");

    })
    var urlSrc, urlId
    $(document).on("click", ".addPhone2", function (e) {


        $(".nv91-mask").show();
        $(".nv92").show();
        $(".nv91").hide();
        $(".imgcov2").show();
        // 请求完成渲染页面 待处理
        var florId = localStorage.getItem("florId");
        if (florId == "" || florId == null || florId == "undefined") {
            par = "appsercet=" + newAppsercet + "&method=get.dxWeb.queryFileAll";
        } else {
            par = "appsercet=" + newAppsercet + "&method=get.dxWeb.queryFileAll&folderId=" + florId;
        }

        var list = getSign(url, par);
        render3(list);
        $(this).val("修改图片");


    });
    judgePower();
   function judgePower(){
    var url, par;
    //页面初次渲染加载数据

    var data = window.localStorage.getItem("dxRightsList");
    data = JSON.parse(data);
    var appsercet = window.localStorage.getItem("appsercet");
    appsercet = JSON.parse(appsercet);
    var newAppsercet = appsercet.data;
    //判断是否有操作权限
    var arr = [];
    $.each(data, function (i, item) {
        //console.log(item)
        if (item.id == 7) {
            arr.push(item)
        }
    })
    $.each(arr[0].dxRightsList, function (i, item) {
        //console.log(arr[0].dxRightsList)
        if (item.method === "get.dxWeb.queryFileAll") {
            url = src + "/" + item.link_path;
           
            //添加图片点击事件
            $(".newImg").unbind('click').bind("click",function(){ 
            // $(".newImg").click(function () {
                //请求全部文件夹并且渲染

                par = "appsercet=" + newAppsercet + "&method=get.dxWeb.libraryList";
                var data = getSign(url, par);

                console.log(data);

                var str = "";

                if (data.dxFolderList && data.dxFolderList.length > 0) {
                    $(".filename2").html("");
                    str += '<option value="0" selected>请选择</option>';

                    $.each(data.dxFolderList, function (i, obj) {
                        str += '<option value="' + obj.id + '" >"' + obj.brand_name + '"</option>';

                    })
                    $(".filename2").html(str);

                }

                $(".nv91-mask").show();
                $(".nv92").show();
                $(".fileSure").unbind('click').bind("click",function(){ 
                // $(".fileSure").click(function () {

                    var data = addUpdate("get.dxWeb.addFolder");
                    if (data.msg.code == "200") {
                        $(".nv91-mask").show();
                        $(".prompt").text("添加成功");
                        $(".confirm").hide();
                        $(".nv1").show();
                        setTimeout(function () {
                            $(".nv91-mask").hide();
                            $(".nv1").hide();
                            location.reload();
                        }, 2000);
                    }
                })
            })
           

           

            //进入子集目录操作
            var width = document.querySelectorAll(".w200center");
            $(".w200center").unbind('click').bind("click",function(){
            // $(document).on("dblclick", ".w200center", function () {
                var id = $(this).attr("data-id");
                par = "appsercet=" + newAppsercet + "&method=get.dxWeb.queryFileAll&folderId=" + id + "&isUp=2";

                var data = getSign(url, par);
                localStorage.setItem("florId", data.mag.folderId);
                $(".imgBox2").html("");
                $(".imgBox1").html("");
                $(".imgBox3").html("");
                $(".imgBox4").html("");
                if (data.dximgList.length > 0 || data.dxFolderList.length > 0) {

                }
                render3(data);

                $(".imgCover").unbind('click').bind("click", function () {
                    
                    // $(".imgCover").click(function(){
                    $(".nv91-mask").hide();
                    $(".nv91").hide();
                    $(".custom").eq(0).show();
                    $(".imgcov").show();
                    value1 = $("input[type='radio']:checked").val();
                    if (value1 == 1) {
                        $(".imgcov1").show();
                    } else {
                        $(".imgcov1").hide();
                    }

                    $(".imgcov2").show();
                    urlSrc1 = $(this).find(".imgHover1").attr("src");
                    urlId1 = $(this).find(".imgHover1").attr("data-id");
                    $(".reviewImg1").attr("src", urlSrc1);
                    $(".reviewImg1").attr("data-id", urlId1);


                })

                $(".imgCover1").unbind('click').bind("click", function () {
                    
                    // $(".imgCover1").on("click",function(){
                    $(".nv91-mask").hide();
                    $(".nv91").hide();
                    $(".imgcov1").hide();
                    urlSrc = $(this).find(".imgHover1").attr("src");
                    urlId = $(this).find(".imgHover1").attr("data-id");
                    $(".reviewImg3").attr("src", urlSrc);
                    $(".reviewImg3").attr("data-id", urlId);

                })

            })


            //进入父级目录
            $(".returnBack").unbind('click').bind("click",function(){

            // $(".returnBack").click(function () {
                
                var folderId = localStorage.getItem("florId");
                
                if(folderId == 0 || folderId == "underfind" || folderId == null){
                    par = "appsercet=" + newAppsercet + "&method=get.dxWeb.queryFileAll" 
                }else{
                    par = "appsercet=" + newAppsercet + "&method=get.dxWeb.queryFileAll&folderId=" + folderId + "&isUp=1";
                }
                var data = getSign(url, par);
                render3(data);
                localStorage.setItem("florId", data.mag.folderId);
                $(".imgCover").unbind('click').bind("click", function () {
                    
                    // $(".imgCover").click(function(){
                    $(".nv91-mask").hide();
                    $(".nv91").hide();
                    $(".custom").eq(0).show();
                    $(".imgcov").show();
                    value1 = $("input[type='radio']:checked").val();
                    if (value1 == 1) {
                        $(".imgcov1").show();
                    } else {
                        $(".imgcov1").hide();
                    }

                    $(".imgcov2").show();
                    urlSrc1 = $(this).find(".imgHover1").attr("src");
                    urlId1 = $(this).find(".imgHover1").attr("data-id");
                    $(".reviewImg1").attr("src", urlSrc1);
                    $(".reviewImg1").attr("data-id", urlId1);


                })

                $(".imgCover1").unbind('click').bind("click", function () {
                    
                    // $(".imgCover1").on("click",function(){
                    $(".nv91-mask").hide();
                    $(".nv91").hide();
                    $(".imgcov1").hide();
                    urlSrc = $(this).find(".imgHover1").attr("src");
                    urlId = $(this).find(".imgHover1").attr("data-id");
                    $(".reviewImg3").attr("src", urlSrc);
                    $(".reviewImg3").attr("data-id", urlId);

                })


                if (data.dximgList.length == 0 && data.dxFolderList.length == 0) {
                    $(".imgBox2").html("");
                    $(".imgBox1").html("");
                }


            })

            //通过文件名称获取该名下所有文件夹
            $(".searchName").unbind('click').bind("click",function(){ 
            // $(".searchName").click(function () {

                var val = $(".searchName1").val();
                par = "appsercet=" + newAppsercet + "&method=get.dxWeb.queryFileAll&fileNmae=" + val;
                var statu = getSign(url, par);
                render3(statu);
                if (statu.mag.code == "200") {

                    localStorage.setItem("florId", statu.mag.folderId);
                }
            })
            //判断该角色是否有权限操作
            if (item.dxRightsTwoList.length == 0) {
                return
            }
            else {
                $.each(item.dxRightsTwoList, function (i, obj) {
                    //判断该用户是否有上传图片权限
                    if (obj.method === "get.dxWeb.uploadImgs") {
                        var isEnable;
                        var warmask = document.querySelector(".warmask");
                        $(".addImg").show();
                        $(".addImg").unbind('click').bind("click",function(){
                        // $(".addImg").click(function () {

                            $(".nv91-mask").show();
                            $(".nv93").show();

                            par = "appsercet=" + newAppsercet + "&method=get.dxWeb.libraryList";
                            var data = getSign(url, par);

                            console.log(data);

                            var str = "";

                            if (data.dxFolderList && data.dxFolderList.length > 0) {
                                $(".folderId").html("");
                                str += '<option value="0" selected>请选择</option>';

                                $.each(data.dxFolderList, function (i, obj) {
                                    str += '<option value="' + obj.id + '" >"' + obj.brand_name + '"</option>';

                                })
                                $(".folderId").html(str);

                            }
                            //判断是否有添加水印权限

                            if ($(".warmask").prop("checked")) {
                                isEnable = 1;
                            } else {
                                isEnable = 2;
                            }
                            
                            $(".fileSure1").unbind('click').bind("click",function(){
                            // $(".fileSure1").click(function () {


                                var sign1 = sign("get.dxWeb.uploadImgs");
                                var appid = localStorage.getItem("appid");
                                var sign2 = sign1.parameter;
                                var timestamp = sign1.timestamp;
                                var formData = new FormData();
                                formData.append("galleryImg", $(".galleryImg")[0].files[0]);
                                console.log($(".galleryImg")[0].files[0])
                                formData.append("folderId", $(".folderId option:checked").val());
                                console.log($(".folderId option:checked").val())
                                
                                formData.append("method", "get.dxWeb.uploadImgs");
                               
                                //     formData.append("imgsName",$(".galleryImg")[0].files[0].name);
                                //    console.log($(".galleryImg")[0].files[0].name)
                                formData.append("isEnable", isEnable);
                                formData.append("appid", appid);
                                formData.append("sign", sign2);
                                formData.append("timestamp", timestamp);
                                formData.append("appsercet", newAppsercet);
                                var data = post(url, formData);
                                console.log(data);
                            })
                        })
                        //判断该用户是否有编辑权限
                    }
                    if (obj.method === "get.dxWeb.editdImgs") {
                        $(".editImg").show();
                        $(".editImg").click(function () {

                            var judge = false;
                                
                           
                                var radio = document.querySelectorAll(".radio12");
                                for (var i = 0; i < radio.length; i++) {
                                    var obj = radio[i];
    
                                    if (obj.checked == true) {
                                        judge = true;
                                        var value = obj.getAttribute("data-name");
                                        var id = obj.getAttribute("data-id");
                                        localStorage.setItem("imgUrl", $(".imgHover1 ").eq(value).attr("src"));
                                        localStorage.setItem("nowId", id);
                                        location.href = "./Head_Cut_PC-master/index.html";
                                    }else{
                                        $(".nv91-mask").show();
                                        $(".prompt").text("请选择图片");
                                        $(".confirm1").show(); 
                                        setTimeout(function(){
                                            $(".nv91-mask").hide();
                                            $(".confirm1").hide();
                                           
                                        },2000);
                                    }
                                }
                            
                           
                        })
                    }
                    //判断该用户是否有删除权限
                    if (obj.method === "get.dxWeb.deleteImgs") {
                        $(".manage12").each(function (index) {
                            $(this).mouseenter(function () {
                                $(".manage12 .close12").hide().eq(index).css({"opacity": "1"}).show();
                            })
                            $(this).mouseleave(function () {
                                $(".manage12 .close12").hide();
                            })
                        })
                        $(".imgHover").each(function (index) {
                            $(this).mouseenter(function () {
                                $(".imgHover .close12").hide().eq(index).css({"opacity": "1"}).show();
                            })
                            $(this).mouseleave(function () {
                                $(".imgHover .close12").hide();
                            })
                        })
                        $(".imgHover .close12").unbind('click').bind("click",function(){
                        // $(".imgHover .close12").click(function () {

                            var id = $(this).attr("data-id")
                            par = "appsercet=" + newAppsercet + "&method=get.dxWeb.deleteImgs&id=" + id;
                            var data = getSign(url, par);
                            if (data.msg.code == "10") {
                                $(".nv91-mask").show();
                                $(".confirm").hide(); 
                                $(".nv1").show();
                                setTimeout(function(){
                                    $(".nv91-mask").hide();
                                    $(".nv1").hide();
                                   location.reload();
                                },2000);
                            }
                        })
                        $(".manage12 .close12").unbind('click').bind("click",function(){ 
                            debugger
                        // $(".manage12 .close12").click(function () {
                            $(".prompt").text("文件夹中的图片也将一并删除");
                             $(".nv91-mask").show();
                             $(".confirm").show();
                             var id = $(this).attr("data-id");
                                $(".roleSur").click(function(){
                                    par = "appsercet=" + newAppsercet + "&method=get.dxWeb.daleteFolder&id=" + id;
                                    var data = getSign(url, par);
                                    if (data.msg.code == "200") {
                                       debugger
                                       $(".prompt").text("删除成功");
                                        $(".confirm").hide();
                                        $(".nv91-mask").show();
                                        
                                        $(".nv1").show();
                                        setTimeout(function () {
                                            $(".nv91-mask").hide();
                                            $(".nv1").hide();
                                            location.reload();
                                        }, 2000);
                                    }
                                }) 
                                $(".roleRefuse5").click(function(){
                                    $(".nv91-mask").hide();
                                    $(".confirm").hide();
                                })   
                           
                           
                        })
                        
                    }
                    //判断是否有设置水印
                    if (obj.method === "get.dxWeb.addWatermark") {
                        $(".setting1").show();
                        //添加水印位置请求
                        //设置按钮点击修改水印页面上出现
                        $(".setting").click(function () {
                            $(".nv91-mask").show();
                            $(".nv91").show();
                            par = "method=get.dxWeb.queryWatermarktwo&appsercet=" + newAppsercet
                            //   var form = postFormdata("get.dxWeb.queryWatermark");

                            var data = getSign(url, par);
                            console.log(data)

                            localStorage.setItem("waterId", data.id);

                            var postion = document.querySelectorAll(".postion option");
                            var hyaline = document.querySelectorAll(".hyaline option");
                            var status = document.querySelectorAll(".status");
                            for (var i = 0; i < postion.length; i++) {
                                var obj = postion[i];
                                if (obj.value == data.position) {
                                    obj.selected = true;
                                }
                            }
                            for (var i = 0; i < hyaline.length; i++) {
                                var obj = hyaline[i];
                                if (obj.value == data.hyaline) {
                                    obj.selected = true;

                                }
                            }
                            for (var i = 0; i < status.length; i++) {
                                var obj = status[i];
                                if (obj.value == data.type) {
                                    obj.checked = true;
                                }
                            }

                            $(".water").attr("src", data.imgPath);
                            //   var type = data.msg.type;
                            var id, imgUrl;
                            var radio = document.querySelectorAll(".radio12");
                            for (var i = 0; i < radio.length; i++) {
                                var obj = radio[i];

                                if (obj.checked = true) {
                                    var value = obj.getAttribute("data-name");
                                    id = obj.getAttribute("data-id");
                                    imgUrl = $(".imgHover1").eq(value).attr("src")
                                }
                            }

                            $(".watermarkImg").change(function () {
                                var data = watermark(id);
                                $(".water").attr("src", data.msg.imgPath);
                            })
                            $(".type").change(function () {
                                var data = watermark(id);
                                $(".water").attr("src", data.msg.imgPath);
                            })
                            $(".postion").change(function () {
                                var data = watermark(id);
                                $(".water").attr("src", data.msg.imgPath);
                            })
                            $(".hyaline").change(function () {
                                var data = watermark(id);
                                $(".water").attr("src", data.msg.imgPath);
                            })
                            $(".roleSure").click(function () {
                                //   var data = watermark1(id);
                                //   var imgUrl = data.msg.imgUrl


                                var waterId = localStorage.getItem("waterId");
                                if (waterId == "undefined" || waterId == "" || waterId == null) {
                                    var form = postFormdata("get.dxWeb.addWatermark");
                                } else {
                                    var form = postFormdata("get.dxWeb.updateWatermark");
                                    form.append("id", waterId);


                                }
                                form.append("type", $("input[name='r1']:checked").val());
                                form.append("position", $(".postion option:checked").val());
                                form.append("hyalines", $(".hyaline option:checked").val());
                                console.log($(".hyaline option:checked").val())

                                form.append("galleryImg", $(".watermarkImg")[0].files[0]);
                                //   form.append("galleryImg", $(".water").attr("src"));

                                url = src + "/libraryInterface.dx"
                                var data1 = post(url, form);
                                console.log(data1);

                            })


                        })
                    }
                })

            }
        }
    })
   }
    
    //展示列表图片引入效果
    $(".imgHover").each(function (index) {
        $(this).hover(function () {
            $(".search2").hide().eq(index).show();
        })
        $(this).mouseleave(function () {
            $(".search2").hide();
        })
        // $(this).dblclick(function () {
        //     var img = $(this).find(".imgHover1").attr("src");
        //     console.log(img);
        //     localStorage.setItem("imgDetail",img);
        //     location.href = "../nav7/ImgReview.html"
        // })
    })
    //渲染页面
    function render3(list) {

        
        $(".imgBox1").html("");
        $(".imgBox2").html("");
        $(".imgBox3").html("");
        $(".imgBox4").html("");
        var str1 = "";
        var str = "";
        var str2 = "";
        var str3 = "";
        var str4 = "";
        if (list.dxFolderList && list.dxFolderList.length > 0) {

            $.each(list.dxFolderList, function (i, obj) {
                str1 += '<div class="position manage12"><div class="w200center " data-id="' + obj.id + '" style="margin-right:50px"><img src="../image/file.png" alt="" class="w200h145"><p>"' + obj.brand_name + '"</p></div><img src="../image/close12.png" alt="" style="width: 20px;height:20px;" class="close12" data-id="'+obj.id+'"></div>';
                str3 += '<div class="w200center position" data-id="' + obj.id + '" style="margin-right:50px"><img src="../image/file.png" alt="" class="w200h145"><p>"' + obj.brand_name + '"</p></div>'
            })
            $(".imgBox1").append(str1);
            $(".imgBox2").append(str3);
            $(".imgBox3").append(str3)
        } 
        if (list.dximgList && list.dximgList.length > 0) {

            $.each(list.dximgList, function (i, obj) {
                str += '<div class="imgHover position" data-id="' + obj.id + '" style="margin:0 40px 30px 0;overflow: visible"><div class="imgCover" ><div class="imgHover2"  data-id="' + obj.id + '"><img src="' + obj.img_route + '" alt="" data-id="' + obj.id + '" style="width:80px;height:80px" class="imgHover1"></div><div  class="search2 position"><div class="radio" style="margin-right:10px;position:absolute;left: 0px;top: 48px;z-index:100;padding:0;"><input type="radio" class="styled styled-primary radio12" id="n' + i + '" data-name="' + i + '"  data-id="' + obj.id + '" name="radio12"><label for="n' + i + '"  style="color:#fff;outline:none;line-height: 1;"></label></div><p style="font-family:iconfont;">&#xe615;</p></div></div><input class="p" value="' + obj.img_name + '" style="width:80px;background-color: #f3f3f3;"/><img src="../image/close12.png" alt="" style="width: 20px;height:20px;z-index:99;display:block" class="close12" data-id="' + obj.id + '"/></div>';
                //添加那块逻辑处理补充
                str2 += '<div class="imgHover position" data-id="' + obj.id + '" style="margin-right:40px;overflow: visible"><div class="imgCover1" ><div class="imgHover2" data-id="' + obj.id + '" ><img src="' + obj.img_route + '" alt="" data-id="' + obj.id + '" class="imgHover1" style="width:80px;height:80px"></div><div  class="search2 position"><div class="radio" style="margin-right:10px;position:absolute;left: 0px;top: 48px;z-index:100;padding:0;"><input type="radio" class="styled styled-primary radio12" id="n' + i + '" data-name="' + i + '"  data-id="' + obj.id + '" name="radio12"><label for="n' + i + '"  style="color:#fff;outline:none;line-height: 1;"></label></div><p style="font-family:iconfont;">&#xe615;</p></div></div><input class="p" value="' + obj.img_name + '" style="width:80px;background-color: #f3f3f3;"/></div>'

                str4 += '<div class="imgHover position" data-id="' + obj.id + '" style="margin-right:40px;overflow: visible"><div class="imgCover" ><div class="imgHover2" data-id="' + obj.id + '" ><img src="' + obj.img_route + '" alt="" data-id="' + obj.id + '" class="imgHover1" style="width:80px;height:80px"></div><div  class="search2 position"><div class="radio" style="margin-right:10px;position:absolute;left: 0px;top: 48px;z-index:100;padding:0;"><input type="radio" class="styled styled-primary radio12" id="n' + i + '" data-name="' + i + '"  data-id="' + obj.id + '" name="radio12"><label for="n' + i + '"  style="color:#fff;outline:none;line-height: 1;"></label></div><p style="font-family:iconfont;">&#xe615;</p></div></div><input class="p" value="' + obj.img_name + '" style="width:80px;background-color: #f3f3f3;"/></div>'
            })
            $(".imgBox1").append(str);
            $(".imgBox2").append(str4);
            $(".imgBox3").append(str2);

            if ($(".imgBox2").html() == "") {

            } else {

                var size = localStorage.getItem("size");
                if (size == null || size == "") {

                } else {
                    var id = localStorage.getItem("nowId");
                    var imgHover1 = document.querySelectorAll(".imgHover2");
                    for (var i = 0; i < imgHover1.length; i++) {
                        var obj = imgHover1[i];
                        if (obj.getAttribute("data-id") == id) {
                            obj.innerHTML = size;
                        }
                    }
                }

            }

        } 
        $(".imgHover").each(function (index) {
            $(this).hover(function () {
                $(".imgHover .close12").hide().eq(index).css({"opacity": "1"}).show();
            })
            $(this).mouseleave(function () {
                $(".imgHover .close12").hide();
            })
        })
        $(".manage12").each(function (index) {
            $(this).mouseenter(function () {
                $(".manage12 .close12").hide().eq(index).css({"opacity": "1"}).show();
            })
            $(this).mouseleave(function () {
                $(".manage12 .close12").hide();
            })
        })
        $(".imgHover").each(function (index) {
            $(this).hover(function () {
                $(".search2").hide().eq(index).show();
            })
            $(this).mouseleave(function () {
                $(".search2").hide();
            })
            $(this).dblclick(function () {
                location.href = "../nav7/ImgReview.html"
            })

        })
        $(".imgCover").unbind('click').bind("click", function () {
            
            // $(".imgCover").click(function(){
            $(".nv91-mask").hide();
            $(".nv91").hide();
            $(".custom").eq(0).show();
            $(".imgcov").show();
            value1 = $("input[type='radio']:checked").val();
            if (value1 == 1) {
                $(".imgcov1").show();
            } else {
                $(".imgcov1").hide();
            }

            $(".imgcov2").show();
            urlSrc1 = $(this).find(".imgHover1").attr("src");
            urlId1 = $(this).find(".imgHover1").attr("data-id");
            $(".reviewImg1").attr("src", urlSrc1);
            $(".reviewImg1").attr("data-id", urlId1);


        })

        $(".imgCover1").unbind('click').bind("click", function () {
            
            // $(".imgCover1").on("click",function(){
            $(".nv91-mask").hide();
            $(".nv91").hide();
            $(".imgcov1").hide();
            urlSrc = $(this).find(".imgHover1").attr("src");
            urlId = $(this).find(".imgHover1").attr("data-id");
            $(".reviewImg3").attr("src", urlSrc);
            $(".reviewImg3").attr("data-id", urlId);

        })
        judgePower();
    }
    //水印实时展示
    function watermark(id) {
        var data
        url = noapi + "/queryWatermark.dx";
        var formData = new FormData();
        formData.append("id", id);
        formData.append("watermarkImg", $(".watermarkImg")[0].files[0]);
        formData.append("type", $("input[name='r1']:checked").val());
        formData.append("position", $(".postion option:checked").val());
        formData.append("hyaline", $(".hyaline option:checked").val());

        console.log($(".hyaline option:checked").val())
        data = post(url, formData);
        console.log(data);
        data = JSON.parse(data);
        console.log(data)
        return data;

    }

    //水印实时展示
    function watermark1(id) {
        var data
        url = noapi + "/queryWatermark.dx";
        var formData = new FormData();
        formData.append("id", id);
        formData.append("galleryImg", $(".watermarkImg")[0].files[0]);
        formData.append("type", $("input[name='r1']:checked").val());
        formData.append("position", $(".postion option:checked").val());
        formData.append("hyaline", $(".hyaline option:checked").val());

        console.log($(".hyaline option:checked").val())
        data = post(url, formData);
        console.log(data);
        data = JSON.parse(data);
        console.log(data)
        return data;

    }


})