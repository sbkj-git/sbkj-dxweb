
    function changeState(el) {
        if (el.readOnly) el.checked=el.readOnly=false;
        else if (!el.checked) el.readOnly=el.indeterminate=true;
    }
   
    //页面初次渲染加载数据
    var data = window.localStorage.getItem("dxRightsList");    
        data = JSON.parse(data);  
     //页面初次加载渲染页面
     var url,par; 
     url= src+ "/webBottomInterface.dx";     
    var appsercet = window.localStorage.getItem("appsercet");
    appsercet = JSON.parse(appsercet);
    var newAppsercet = appsercet.data;
    // 关闭事件
    $(".roleRefuse5").click(function(){
        
        $(".nv91-mask").hide();
        $(".nv").hide();
        $("body").removeClass("fixed2");
    })
    // X点击事件
    $(".nv91-close").click(function(){
        
        $(".nv91-mask").hide();
        $(".nv91").hide();
        $(".nv91 input").val("");
       
        $("#pic").attr("src","");
        $("body").removeClass("fixed2");
    })
    // 取消按钮点击事件
    $(".closeBtn").click(function(){
        $(".nv91-mask").hide();
        $(".nv91").hide();
        $(".nv91 input").val("");
       
        $("#pic").attr("src","");
        $("body").removeClass("fixed2");
    })
    var currentPage = localStorage.getItem("pageNow1")
        par = "appsercet=" + newAppsercet + "&method=get.dxWeb.webBottomList" ;
        debugger
        var data2 = getSign(url, par);
        console.log(data2);
        render(data2);
        firstRender();
        pageChange("get.dxWeb.webBottomList",data2,"pagination1",url);
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
        
            
    function firstRender(){
        //页面初次渲染加载数据
    var data = window.localStorage.getItem("dxRightsList");    
    data = JSON.parse(data);
    var appsercet = window.localStorage.getItem("appsercet");
    appsercet = JSON.parse(appsercet);
    var newAppsercet = appsercet.data; 
        //判断是否有添加管理员操作权限
        var arr = [];
        $.each(data,function(i,item){
            //console.log(item);
            if(item.id == 2){
                arr.push(item)
            }
        })
        console.log(arr[0]);
        $.each(arr[0].dxRightsList,function(i,item){
            //console.log(arr[0].dxRightsList)
            if(item.method === "get.dxWeb.webBottomList"){
                url = src+"/"+item.link_path;
               
                //判断该角色是否有权限操作
                if(item.dxRightsTwoList.length == 0){
                    return
                }
                else{
                    $.each(item.dxRightsTwoList,function(i,obj){
                       //判断该用户是否有添加权限
                       
                        if(obj.method === "get.dxWeb.addWebBottom"){
                          $(".addInput").show();
                           
                          $(".add1").unbind('click').bind("click",function(){
                          
                            
                            //添加管理合作伙伴操作
                            $(".nv91 input").val("");
                            $(".nv91 select").val("");
                            
                            $(".nv91-mask").show();
                            $(".nv91").show(); 
                            $("body").addClass("fixed2");
                                $("#picImg").change(function(){
                                    var fileDom = document.getElementById("picImg");
                                    imgPreview(fileDom);
                                })
                              
                                            
                            object(url,newAppsercet);
                                $(".addBanner").unbind('click').bind("click",function(){
                                   
                                    
                                    var url = document.getElementById("url").value;
                                    var reg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
                                    if($(".companyName").val() == ""){
                                        
                                        $(".prompt ").text("请填写客户案例");
                                        $(".nv91-mask").show();
                                        $(".confirm1 ").show();
                                        setTimeout(function(){
                                            
                                            $(".confirm1 ").hide();
                                        },2000);
                                        return;
                                    }
                                    else if($(".remarks").val() == ""){
                                        $(".prompt ").text("请填写客户案例内容");
                                        $(".nv91-mask").show();
                                        $(".confirm1 ").show();
                                        setTimeout(function () {
                                            
                                            $(".confirm1 ").hide();
                                        }, 2000);
                                        return;
                                    }
                                    else if($(".titles").val() == ""){
                                        $(".prompt ").text("请填写客户案例标题");
                                        $(".nv91-mask").show();
                                        $(".confirm1 ").show();
                                        setTimeout(function () {
                                            
                                            $(".confirm1 ").hide();
                                        }, 2000);
                                        return;
                                    }
                                  
                                    else if ($(".companyUrl").val() !== "" &&!reg.test(url)) {

                                        $(".prompt ").text("请以http://或者https://开头");
                                        $(".nv91-mask").show();
                                        $(".confirm1 ").show();
                                        setTimeout(function () {
                                            
                                            $(".confirm1 ").hide();
                                        }, 2000);
                                        return;
                                    }
                                    else if($(".companyType option:checked").attr("data-id") == 0){
                                        $(".prompt ").text("请选择客户案例类型");
                                        $(".nv91-mask").show();
                                        $(".confirm1 ").show();
                                        setTimeout(function(){
                                            
                                            $(".confirm1 ").hide();
                                        },2000);
                                        return;
                                     
                                    }
                                    
                                   
                                    else if($("#pic").attr("src") == "" || $("#pic").attr("src") == "undefined"){
                                        $(".prompt ").text("请上传banner图");
                                        $(".nv91-mask").show();
                                        $(".confirm1 ").show();
                                        setTimeout(function(){
                                            
                                            $(".confirm1 ").hide();
                                        },2000);
                                        return;
                                    }
                                    else{
                                        addorupdate("get.dxWeb.addWebBottom",1);
    
                                    }
                                    
                                  })
                          })
                         
                          
                       
                          
                            }
                        //判断该用户是否有删除权限 
                        if(obj.method === "get.dxWeb.deleteWebBottom"){
                            $(".Delete").show();
                            $(".isDelete").show();
                            var id
                            
                            $(".isDelete").click(function () {
                                $(".nv91-mask").show();
                                $(".prompt").text("确定要删除这条消息吗?");
                                $(".nv91").hide();
                                $(".confirm").show();
                                $("body").addClass("fixed2");
                                var IdList = $(this).attr("data-id");
                                $(".roleSure").click(function(){
                                    deleteText(IdList);
                                   
                                })
                                $(".roleRefuse").click(function(){
                                    $(".nv91-mask").show();
                                    $(".confirm").show(); 
                                    $("body").removeClass("fixed2");
                                })
                                
                            })
                        }
                            //判断是否有编辑权限
                           if(obj.method === "get.dxWeb.updateWebBottom"){      
                            $(".isEdit").show();
                            $(".isEdit").unbind('click').bind("click",function(){
                          
                            // $(".isEdit").click(function () {
                                $(".nv91 input").val("");
                                $(".nv91-mask").show();
                                $(".nv91").show();
                                $("body").addClass("fixed2");
                                // $("#picImg").hide();
                                var id = $(this).attr("data-id");
                                par = "appsercet=" + newAppsercet + "&method=get.dxWeb.getWebBottom&id=" + id;
                                var data = getSign(url, par);
                                
                                console.log(data);
                                
                                object(url, newAppsercet)
                                $(".companyName").val(data.msg.pic_title);
                                $(".titles").val(data.msg.title);
                                $(".remarks").val(data.msg.remarks);
                                $(".companyUrl").val(data.msg.pic_url);
                                var option = document.querySelectorAll(".companyType option");
                                
                                for (var i = 0; i < option.length; i++) {
                                    var obj = option[i];
                                    if (obj.innerHTML == data.msg.cate_name) {
                                        obj.selected = true;
                                        // return true;
                                    }
                                }
                                $("#pic").attr("src", data.msg.pic_img);
                               
                                var status = document.querySelectorAll(".status");
                                var obj = status[0];
                                var obj1 = status[1];
                                if (data.msg.state == 1) {
                                    obj.checked = true;
                                }
                                if (data.msg.state == 2) {
                                    obj1.checked = true;
                                }
                                $(".companyName").val(data.msg.pic_title);

                             
                                $("#picImg").change(function(){
                                    var fileDom = document.getElementById("picImg");
                                    imgPreview(fileDom);
                                })
                               
                                   
                                    $(".addBanner").unbind('click').bind("click",function(){ 
                                    // $(".addBanner").click(function () {
                                        addorupdate("get.dxWeb.updateWebBottom",id);
                                    })
                            })
                           
                        }   
                                          
                                          
                    })
                    
                }
            }
           
        })

    }
        // 封装渲染函数
        function render(data){
                        if(data.dxBannerList&&data.dxBannerList.length>0){
                    var str = "";
                    $(".textList").html(str);
                    
                    $.each(data.dxBannerList,function(i,item){
                        str+='<tr style="border-bottom: 1px solid #d8d8d8;">';
                        str += '<td><div class="checkbox checkbox-primary"><input type="checkbox" class="styled styled-primary t1" id="' + item.id + '"   aria-label="Single checkbox Two" data-id="' + item.id + '"><label for="' + item.id + '"><img src="' + item.pic_img + '" alt="" style="width: 82px;height:56px;display: table-column;vertical-align: middle;"></label></div></td><td>' + item.pic_title + '</td>';
                        var title;
                        if (item.title.length > 5) {
                            title = item.title.substring(0, 5) + "...";
                        } else {
                            title = item.title;
                        }
                        var remarks;
                        if (item.remarks.length > 10) {
                            remarks = item.remarks.substring(0, 10) + "...";
                        } else {
                            remarks = item.remarks;
                        }
                            str+='<td>' + title + '</td><td>' + remarks + '</td><td>'+item.cate_name+'</td><td>'+item.pic_url+'</td>';
                            if(item.state == 1){
                                str+="<td><input class='switch switch-anim' type='checkbox' checked data-id='" + item.id + "'></td>";
                            }else{
                                str+="<td><input class='switch switch-anim' type='checkbox' data-id='" + item.id + "'></td>";
                            }
                            str+='<td>'+item.frequency+'</td><td style="color:#48a4ea;"><span class="isDelete" data-id="'+item.id+'">删除</span>&nbsp;&nbsp;<span data-id="'+item.id+'" class="isLook">查看</span>&nbsp;&nbsp;<span class="isEdit" data-id="'+item.id+'">编辑</span></td>'
                        str+="</tr>";
                    })
                    $(".textList").html(str);
                    firstRender();
                      //上下限切换
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
                par = "appsercet="+newAppsercet+"&method=get.dxWeb.updateWebBottom&id="+id+"&state="+state;
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
                    par = "appsercet=" + newAppsercet + "&method=get.dxWeb.webBottomList&currentPage="+currentPage;
                    var data = getSign(url, par);
                    render(data);
                }
        
                });
                }
                console.log(data);
                    }
      
         //删除函数封装
         function deleteText(id) {
               
                par = "appsercet=" + newAppsercet + "&method=get.dxWeb.deleteWebBottom&id=" + id;
                var data = getSign(url, par);
                if (data.msg.code == "200") {
                    if (data.msg.code == "200") {
                        $(".confirm").hide();
                        $(".prompt").text("删除成功");  
                        $(".nv1").show();
                        setTimeout(function(){
                            
                            $(".nv91-mask").hide();
                            $(".nv1").hide();
                           
                        },2000);
                        $("body").removeClass("fixed2");
                        par = "appsercet=" + newAppsercet + "&method=get.dxWeb.webBottomList&currentPage=" + currentPage;
                        var bannerList = getSign(url, par);
                        render(bannerList);
                       
                    }
                }
            }

        // 添加修改函数封装
        function addorupdate(method,id) {
            

                var formData = new FormData();
                var appid = localStorage.getItem("appid");
                var appsercet = localStorage.getItem("appsercet");
                
                appsercet = JSON.parse(appsercet);
                appsercet = appsercet.data;
                formData.append("appid", appid);
                formData.append("appsercet", appsercet);
                var data = sign(method);
                var sign1 = data.parameter;
                var timeStamp = data.timestamp;
                formData.append("method", method);
                if(method === "get.dxWeb.updateWebBottom"){

                    formData.append("id", id);
                }
                formData.append("sign", sign1);
                formData.append("timestamp", timeStamp);
                
              

                formData.append("bannerName", $(".companyName").val());
                formData.append("cateId", $(".companyType option:checked").attr("data-id"));
                // var status = document.querySelectorAll(".status");
                // var state = $("input[name='bm2']:checked").val()
                var state ;
                
                var statu = $(".status").eq(0).prop("checked");
                if(statu == true){
                    state = 1;
                }else{
                    state = 2;  
                }
               
                
                formData.append("state", state);
                formData.append("remarks", $(".remarks").val());
                formData.append("title", $(".titles").val());//内容
                formData.append("picImg", $("#picImg")[0].files[0]);
                formData.append("picurl", $(".companyUrl").val());
                console.log($(".companyUrl").val())
                var data = post(url, formData);
                console.log(data);
                data = JSON.parse(data)
                
                if(data.msg.code == "200"){
                    
                        $(".confirm").hide();
                        $(".prompt").text("操作成功"); 
                        $(".nv91-mask").show();
                        $(".nv1").show();
                        setTimeout(function(){
                            $(".nv91-mask").hide();
                            $(".nv1").hide();
                           
                        },2000);
                        $("body").removeClass("fixed2");
                        par = "appsercet=" + newAppsercet + "&method=get.dxWeb.webBottomList&currentPage=" + currentPage;
                        var bannerList = getSign(url, par);
                        render(bannerList);
                   
                    $(".nv91 input").val("");
                
                    $("#pic").attr("src","");
                  
                }else if(data.msg.code == "10"){
                    $(".confirm").hide();
                        $(".prompt").text("操作失败");  
                        $(".nv3").show();
                        setTimeout(function(){
                            $(".nv91-mask").hide();
                            $(".nv3").hide();
                         
                        },2000);
                   
                }
                
                   
                   
               
            }
//获取所有合作伙伴类别
    function object(url, newAppsercet) {
        //获取所有合作伙伴类别
        par = "appsercet=" + newAppsercet + "&method=get.dxWeb.getWebBottomCateList";
        var res = getSign(url, par);
        console.log(res)
        
        if (res.dxWebBottomList.WebBottomList && res.dxWebBottomList.WebBottomList.length > 0) {
            
            $(".companyType").html("");
            var str = "";
            str += "<option value='0' selected data-id='0'>请选择</option>";
            $.each(res.dxWebBottomList.WebBottomList, function (i, obj) {
                str += "<option data-id='" + obj.id + "'>" + obj.cate_name + "</option>"
            })
            $(".companyType").html(str);

        }
    }
    //切换图片
   
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
            var img = document.getElementById("pic");
            //图片路径设置为读取的图片
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
    
  