$(document).ready(function(){
    function changeState(el) {
        if (el.readOnly) el.checked=el.readOnly=false;
        else if (!el.checked) el.readOnly=el.indeterminate=true;
    } 
    //点击弹窗关闭时间
    $(".BannerRefuse").click(function(e){
        e.preventDefault();
        $(".nv91-mask").hide();
        $(".nv91").hide();
       
        $(".updateimg").attr("src","");
        $(".needHide").show();
        $(".slideImg").hide();


    })
    $(".roleRefuse5").click(function(){
        
        $(".nv91-mask").hide();
        $(".nv").hide();
       
    })
    $(".nv91-close").click(function(e){
        e.preventDefault();
        $(".nv91-mask").hide();
        $(".nv91").hide();
        $(".nv91 input").val("");
        var obj = document.getElementById("fileUpload") ; 
        obj.outerHTML=obj.outerHTML;
        $(".updateimg").attr("src","");
        $(".needHide").show();
        $(".slideImg").hide();
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
                    banner+="<td><span style='display:block'>" + item.begin_time + "</span><span style='display:block'>" + item.end_time + "</span>";
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
               $(".switch").unbind('click').bind("click",function(){ 
                var index = $(this).index();
                //1. 获取id值             
                var id = $(this).attr("data-id");
                if($(this).prop("checked")){
                    state = 1;     
                
                }else{
                    state = 2;
                    
                }
                par = "appsercet="+newAppsercet+"&method=get.dxWeb.updatehelp&id="+id+"&state="+state;
                var data = getSign(url,par);
                if(data.msg.code == "200"){
                    $(".confirm").hide();
                    $(".prompt").text("操作成功");
                    $(".nv91-mask").show();
                    $(".nv1").show();
                    $(".nv3").hide();
                    setTimeout(function () {
                        $(".nv91-mask").hide();
                        $(".nv1").hide();
                       
                    }, 2000);

                    par = "appsercet=" + newAppsercet + "&method=get.dxWeb.bannerList&currentPage="+currentPage;
                    var data = getSign(url, par);
                    bannerList1(data);
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
            //  firstRender();
             console.log(data2);
             pageJudge(data2);
             function pageJudge(data2){
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
                        id: 'pagination2',
                        pageTotal: pageCount, //必填,总页数
                        pageAmount: 10,  //每页多少条
                        dataTotal: pageN, //总共多少条数据
                        curPage:1, //初始页码,不填默认为1
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
             }
           
         
         //分页渲染
         $(document).on("click",".pageItem",function(){
            currentPage = $(this).html();   
           localStorage.setItem("pageNow1",currentPage);
            par = "appsercet="+newAppsercet+"&method=get.dxWeb.bannerList&currentPage="+currentPage;
                 
                var data2 = getSign(url, par);
                bannerList1(data2);
                
         })
        
            var re = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/ 
            var ret = document.querySelector(".returnPage");
            $(".returnPage").blur(function () {
                
                var value = $(this).html();

                if (!re.test(value)) {
                   

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
        $(".banner1").click(function () {
            var bannerName = $(".bannerName12").val();
            par = "appsercet=" + newAppsercet + "&method=get.dxWeb.bannerList&bannerName=" + bannerName;
            var bannerList = getSign(url, par);
            if(bannerList.msg && bannerList.msg.code == "10"){
                $(".bannerList").html("");
                $(".bannerName12").val("");
                $(".paging").css({"opacity":"0"});
            }else{
                $(".paging").css({"opacity":"1"});
                bannerList1(bannerList);
                pageJudge(bannerList);
                $(".bannerName12").val("");
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
                $(".paging").css({"opacity":"0"});
                $(".bannerList").html("");
            } else {
                $(".paging").css({"opacity":"1"});
                bannerList1(bannerList);
                pageJudge(bannerList);
               
            }
        });
    //通过反馈时间查询
    $('#demo').daterangepicker({
        "showWeekNumbers": true,
        "showISOWeekNumbers": true,
        "timePicker": true,
        "timePickerSeconds": true,
        "locale": {
            "direction": "ltr",
            "format": "YYYY-MM-DD HH:mm:ss",
            "separator": " ~ ",
            "applyLabel": "确定",
            "cancelLabel": "取消",
            "fromLabel": "From",
            "toLabel": "To",
            "customRangeLabel": "Custom",
            "daysOfWeek": [
                "日",
                "一",
                "二",
                "三",
                "四",
                "五",
                "六"
            ],
            "monthNames": [
                "一月",
                "二月",
                "三月",
                "四月",
                "五月",
                "六月",
                "七月",
                "八月",
                "九月",
                "十月",
                "十一月",
                "十二月"
            ],
            "firstDay": 1
        },
        // "startDate": "04-11-2019",
        // "endDate": "04-11-2019"
    }, function(start, end, label) {
        var starttime = start.format('YYYY-MM-DD ');
        var endTime = end.format('YYYY-MM-DD ');
            var url = src + "/bannerGetInterface.dx";
            var appsercet = window.localStorage.getItem("appsercet");
            appsercet = JSON.parse(appsercet);
            newAppsercet = appsercet.data;
            par = "appsercet=" + newAppsercet + "&method=get.dxWeb.bannerList&starttime=" + starttime + "&erdtime=" + endTime;
    
            var bannerList = getSign(url, par);
            if (bannerList.msg && bannerList.msg.code == "10") {
                $(".paging").css({"opacity":"0"});
                $(".bannerList").html("");
                $("#demo").val("");
            } else {
                $(".paging").css({"opacity":"1"});
                pageJudge(bannerList);
                bannerList1(bannerList);
                firstRender();
                $("#demo").val("");
            }
        console.log(start.format('YYYY-MM-DD '));
        console.log(end.format('YYYY-MM-DD '));
    //   console.log("New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')");
    
    });
    //单选开始时间结束时间
    $('#start1').daterangepicker({
        "singleDatePicker": true,
        "showISOWeekNumbers": true,
        "timePicker": true,
        "timePickerSeconds": true,
        "locale": {
            "direction": "ltr",
            "format": "YYYY-MM-DD HH:mm:ss",
            "separator": " - ",
            "applyLabel": "确定",
            "cancelLabel": "取消",
            "fromLabel": "From",
            "toLabel": "To",
            "customRangeLabel": "Custom",
            "daysOfWeek": [
                "日",
                "一",
                "二",
                "三",
                "四",
                "五",
                "六"
            ],
            "monthNames": [
                "一月",
                "二月",
                "三月",
                "四月",
                "五月",
                "六月",
                "七月",
                "八月",
                "九月",
                "十月",
                "十一月",
                "十二月"
            ],
            "firstDay": 1
        },
       
    }, function(start, end, label) {
      console.log("New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')");
    });
    $('.end1').daterangepicker({
        "singleDatePicker": true,
        "showISOWeekNumbers": true,
        "timePicker": true,
        "timePickerSeconds": true,
        "locale": {
            "direction": "ltr",
            "format": "YYYY-MM-DD HH:mm:ss",
            "separator": " - ",
            "applyLabel": "确定",
            "cancelLabel": "取消",
            "fromLabel": "From",
            "toLabel": "To",
            "customRangeLabel": "Custom",
            "daysOfWeek": [
                "日",
                "一",
                "二",
                "三",
                "四",
                "五",
                "六"
            ],
            "monthNames": [
                "一月",
                "二月",
                "三月",
                "四月",
                "五月",
                "六月",
                "七月",
                "八月",
                "九月",
                "十月",
                "十一月",
                "十二月"
            ],
            "firstDay": 1
        },
      
    }, function(start, end, label) {
      console.log("New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')");
    });
    

       
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
                                    formBlur();
                                    $(".addInput").unbind('click').bind("click",function(){
                                    // $(".addInput").click(function () {
                                        
                                        $(".nv91-mask").show();
                                        $(".nv91").show();
                                        $("body").css({"height":"100%","position":"fixed","top":"0","left":"0","overflow":"scroll"})
                                        $(".upload1").click(function (event) {
                                            event.stopPropagation();
                                            $("#fileUpload").show().css({"height":"50px","border":"none"});
                                            $(this).hide();
            
                                        })
                                        $("#fileUpload").change(function () {
                                            $(".needHide").hide();
                                            $(".slideImg").slideDown();
                                            fileDom = document.getElementById("fileUpload");
                                        imgPreview(fileDom);
                                        })
                                        $(".updateimg").click(function () {
                                            
                                            $(".needHide").show();
                                            $(".slideImg").hide();
                                           
                                        })
                                        $(".BannerSure").click(function () {
                                            
                                           var success = formValidater();
                                           if(success == true){
                                            getContentTwo("get.dxWeb.addhelp", 1);
                                           }else{
                                               return;
                                           }
                                            
                                            
                                            
                                        })
                                    })
                                    
                                }
                                //判断该用户是否有删除权限 
                                if (obj.method === "get.dxWeb.deleteBanner") {
                                    $(".isDelete").show();
                                    //banner删除事件
                                    
                                    $(".isDelete").click(function () {
                                        $(".nv91-mask").show();
                                        $(".confirm").show();
                                        var IdList = $(this).attr("data-id");
                                        $(".roleSure").click(function(){
                                            
                                            par = "appsercet=" + newAppsercet + "&method=get.dxWeb.deleteBanner&id=" + IdList;
            
                                            var data = getSign(url, par);
                                            if (data.msg.code == "200") {
                                                $(".confirm").hide(); 
                                                $(".nv1").show();
                                                setTimeout(function(){
                                                    $(".nv91-mask").hide();
                                                    $(".nv1").hide();
                                                   location.reload();
                                                },2000);
                                            }else{
                                                $(".confirm").hide(); 
                                                $(".nv3").show();
                                                setTimeout(function(){
                                                    $(".nv91-mask").hide();
                                                    $(".nv3").hide();
                                                },2000);
                                            }
                                        })
                                        $(".roleRefuse5").click(function(){
                                            $(".nv91-mask").hide();
                                            $(".confirm").hide(); 
                                        })
                                        
                                    })
                                    
                                }
                                //判断是否有置顶权限
                                if (obj.method === "get.dxWeb.topBanner") {
                                    
                                    $(".toTop").show();
                                    //banner置顶事件  
                                    $(".toTop").unbind('click').bind("click",function(){ 
                                   
                                        
                                        var index = $(this).index();
                                        
                                        var id = $(this).attr("data-id");
                                        par = "appsercet=" + newAppsercet + "&method=get.dxWeb.topBanner&id=" + id+"&type=1";
                                        var statu = getSign(url, par);
                                       
                                        if (statu.msg.code == "200") {
                                            $(".confirm").hide();
                                            $(".prompt").text("操作成功");
                                            $(".nv91-mask").show();
                                            $(".nv1").show();
                                            $(".nv3").hide();
                                            setTimeout(function () {
                                                $(".nv91-mask").hide();
                                                $(".nv1").hide();
                                                location.reload();

                                            }, 2000);

                                        }
                                    })
                                    $(".toDown").unbind('click').bind("click",function(){ 
                                  
                                        var id = $(this).attr("data-id");
                                        par = "appsercet=" + newAppsercet + "&method=get.dxWeb.topBanner&id=" + id+"&type=2";
                                        var statu = getSign(url, par);
                                        if (statu.msg.code == "200") {
                                            $(".confirm").hide();
                                            $(".prompt").text("操作成功");
                                            $(".nv91-mask").show();
                                            $(".nv1").show();
                                            $(".nv3").hide();
                                            setTimeout(function () {
                                                $(".nv91-mask").hide();
                                                $(".nv1").hide();
                                                location.reload();
                    
                                            }, 2000);
                                            
                                        }
                                    })
                                }
                                //判断是否有编辑权限
                               
                                if (obj.method === "get.dxWeb.updatehelp") {
                                    
                                    $(".isEdit").show();
                                    //banner编辑修改事件
                                    $(".isEdit").click(function () {
                                        
                                        
                                        $("body").css({"height":"100%","position":"fixed","top":"0","left":"0","overflow":"scroll"})
                                        var id = $(this).attr("data-id")
                                        // var index = $(this).index;
                                        $(".nv91-mask").show();
                                        $(".nv91").show();
                                        $(".slideImg").show();
                                        $(".needHide").hide();
                                        
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
                                        $(".start1").val(details.msg.begin_time);
                                        $(".end1").val(details.msg.end_time);
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
                                            $(".upload1").unbind('click').bind("click",function(){ 
                                            
                                                $("#fileUpload").click();
                                                $("#fileUpload").change(function () {
                                                    $(".needHide").hide();
                                                    $(".slideImg").slideDown();
                                                    fileDom = document.getElementById("fileUpload");
                                                    imgPreview(fileDom);
                                                })
                                            })
                                            
                                            
                                        })
                                        $(".BannerSure").click(function () {
                                            var sign1 = sign("get.dxWeb.updatehelp");
                                            var sign2 = sign1.parameter;
                                            var timestamp = sign1.timestamp;   
                                            
                                            var success = formValidater();
                                           if(success == true){
                                            getContentTwo("get.dxWeb.updatehelp", id);
                                           }else{
                                               return;
                                           }
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
            
            var appid = localStorage.getItem("appid");
            var sign1 = sign(method);
            var sign2 = sign1.parameter;
            var timestamp = sign1.timestamp;
            var bannerName, starttime, erdtime, cateId, picurl, state, picImg,isUp,remarks
            bannerName = $(".bannerName").val();
            cateId = $(".cateId option:checked").val();
            starttime = $(".start1").val();
            erdtime = $(".end1").val();
            picurl = $(".url").val();
            remarks = $(".remarks").val();
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
            
            var success = post(url, formData);
            console.log(success);
            $(".nv91-mask").hide();
            $(".nv91").hide();
          
            success = JSON.parse(success);
            if (success.msg.code == "200") {
                $(".confirm").hide();
                    $(".prompt").text("操作成功");
                    $(".nv91-mask").show();
                    $(".nv1").show();
                    $(".nv3").hide();
                  
                    setTimeout(function () {
                        $(".nv91-mask").hide();
                        $(".nv1").hide();
                       location.reload();
                    }, 2000);
                    // $(".nv91 input").val("");
            }
            else {
                $(".confirm").hide();
                $(".prompt").text("操作失败");
                $(".nv91-mask").show();
                $(".nv3").show();
                $(".nv1").hide();
                setTimeout(function () {
                    $(".nv91-mask").hide();
                    $(".nv3").hide();
                   
                }, 2000);
             }

        }   
        
    //失去焦点验证
    function formBlur(){
        var reg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
        $(".bannerName").blur(function(){
            setTimeout(function () {
                if ($(".bannerName").val() == "") {
                    $(".prompt ").text("请填写banner名称");
                    $(".nv91-mask").show();
                    $(".confirm1 ").show();
                    setTimeout(function () {
                        
                        $(".confirm1 ").hide();
                    }, 2000);
                    $(this).focus();
                } 
                    },100);//延迟100ms
           
        })
        $(".url").blur(function(){
            setTimeout(function () {
                var url = $(".url").val();
                
                if ($(".url").val() !== "" && !reg.test(url)) {
    
                    $(".prompt ").text("URL地址请以http://或者https://开头");
                    $(".nv91-mask").show();
                    $(".confirm1 ").show();
                    setTimeout(function () {
                        
                        $(".confirm1 ").hide();
                    }, 2000);
                    success = false;
                    $(this).focus();
                }
            },100)
           
        })
        $(".start1").blur(function(){
            setTimeout(function () {
                if($(".start1").val() == 0){
                    $(".prompt ").text("请选择开始时间");
                    $(".nv91-mask").show();
                    $(".confirm1 ").show();
                    setTimeout(function(){
                        
                        $(".confirm1 ").hide();
                    },2000);
                    success = false;
                    $(this).focus();
                 
                } 
            },100);
            
        })
        $(".end1").blur(function(){
            setTimeout(function () {
                if($(".end1").val() == 0){
                    $(".prompt ").text("请选择结束时间");
                    $(".nv91-mask").show();
                    $(".confirm1 ").show();
                    setTimeout(function(){
                        
                        $(".confirm1 ").hide();
                    },2000);
                    success = false;
                    $(this).focus();
                 
                }
                var time_1 = new Date(document.getElementById('start1').value).getTime();//1的时间戳
                var time_2 = new Date(document.querySelector('.end1').value).getTime();//1的时间戳
                if (time_2 < time_1) {
    
                    $(".prompt ").text("开始时间应小于结束时间");
                    $(".nv91-mask").show();
                    $(".confirm1 ").show();
                    setTimeout(function () {
                        
                        $(".confirm1 ").hide();
                    }, 2000);
                    success = false;
                    $(this).focus();
                }  
            },100);
           
        })
        
       
    }
    //表单校验
    function formValidater(){
        var success = true;
        
       //获取当前时间戒指时分秒
        var now = new Date().getTime();//当前时间戳
        var time_1 = new Date(document.getElementById('start1').value).getTime();//1的时间戳
        var time_2 = new Date(document.querySelector('.end1').value).getTime();//1的时间戳
        var url = $(".url").val();
        var reg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
        if($(".updateimg").attr("src") == "" ||$(".updateimg").attr("src") == "undefined" ){
            
            $(".prompt ").text("请选择banner图片");
            $(".nv91-mask").show();
            $(".confirm1 ").show();
            setTimeout(function(){
                
                $(".confirm1 ").hide();
            },2000);
            success = false;
            return;
        }
        else if ($(".bannerName").val() == "") {
            $(".prompt ").text("请填写banner名称");
            $(".nv91-mask").show();
            $(".confirm1 ").show();
            setTimeout(function () {
                
                $(".confirm1 ").hide();
            }, 2000);
            success = false;
            return;
        }
    
        else if ($(".url").val() !== "" && !reg.test(url)) {

            $(".prompt ").text("URL地址请以http://或者https://开头");
            $(".nv91-mask").show();
            $(".confirm1 ").show();
            setTimeout(function () {
                
                $(".confirm1 ").hide();
            }, 2000);
            success = false;
            return;
        }
        else if($(".cateId option:checked").val() == 0){
            $(".prompt ").text("请选择banner位置");
            $(".nv91-mask").show();
            $(".confirm1 ").show();
            setTimeout(function(){
                
                $(".confirm1 ").hide();
            },2000);
        
            success = false;
            return;
         
        }
        else if($(".start1").val() == 0){
            $(".prompt ").text("请选择开始时间");
            $(".nv91-mask").show();
            $(".confirm1 ").show();
            setTimeout(function(){
                
                $(".confirm1 ").hide();
            },2000);
            success = false;
            return;
         
        }
        else if($(".end1").val() == 0){
            $(".prompt ").text("请选择结束时间");
            $(".nv91-mask").show();
            $(".confirm1 ").show();
            setTimeout(function(){
                
                $(".confirm1 ").hide();
            },2000);
            success = false;
            return;
         
        }
        else if (time_2 < time_1) {

            $(".prompt ").text("开始时间应小于结束时间");
            $(".nv91-mask").show();
            $(".confirm1 ").show();
            setTimeout(function () {
                
                $(".confirm1 ").hide();
            }, 2000);
            success = false;
            return;
        }
        return success;
    }    
       
   
})