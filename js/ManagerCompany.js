
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
    localStorage.setItem("pageNow1",1)     
    var currentPage = localStorage.getItem("pageNow1")
        par = "appsercet=" + newAppsercet + "&method=get.dxWeb.webBottomList&currentPage=" + currentPage;
        debugger
        var data = getSign(url, par);
        console.log(data);
        render(data);
        pageCount = Math.ceil(data.pageInfo.totalRows / 10);
        new Page({
            id: 'pagination1',
            pageTotal: pageCount, //必填,总页数
            pageAmount: 10,  //每页多少条
            dataTotal: data.pageInfo.totalRows, //总共多少条数据
            curPage: 1, //初始页码,不填默认为1
            pageSize: 5, //分页个数,不填默认为5
            showPageTotalFlag: true, //是否显示数据统计,不填默认不显示
            showSkipInputFlag: true, //是否支持跳转,不填默认不显示
            getPage: function (page) {
                //获取当前页数
                console.log(page);
            }
        })

        //分页
        //分页渲染

        $(document).on("click", ".pageItem", function () {

            debugger
            currentPage = $(this).html();
            localStorage.setItem("pageNow1", currentPage)
            par = "appsercet=" + newAppsercet + "&method=get.dxWeb.webBottomList&currentPage=" + currentPage;
            var bannerList = getSign(url, par);
            render(bannerList);
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
                par = "appsercet=" + newAppsercet + "&method=get.dxWeb.webBottomList&currentPage=" + currentPage;

                var data2 = getSign(url, par);
                render(data2);
                $(this).val("");
            }

        })          
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
                          $(".add1").click(function(){
                              
                            //添加管理合作伙伴操作
                            $(".nv91-mask").show();
                            $(".nv91").show();
                            object(url,newAppsercet)
                             
                              $("#picimg").change(function () {
                                var fileDom = document.getElementById("picimg");
                                  imgPreview(fileDom, "pic");
                              })
                            $(".addBanner").click(function () {
                                addorupdate("get.dxWeb.addWebBottom",1);
                              })
                          })
                          
                            }
                        //判断该用户是否有删除权限 
                        if(obj.method === "get.dxWeb.deleteWebBottom"){
                            $(".Delete").show();
                            $(".isDelete").show();

                            $(".isDelete").click(function(){
                                $(".nv91-mask").show();
                                        $(".nv").show();
                                        $(".roleSure").click(function(){
                                            var id = $(this).attr("data-id");
                                            deleteText(id);
                                        })
                                        $(".roleRefuse").click(function(){
                                            $(".nv91-mask").show();
                                            $(".nv").show(); 
                                        })
                                
                                                               
                            })  
                        }
                            //判断是否有编辑权限
                           if(obj.method === "get.dxWeb.updateWebBottom"){      
                            $(".isEdit").show();
                           
                            $(".isEdit").click(function () {
                                $(".nv91-mask").show();
                                $(".nv91").show();
                                $("#picImg").hide();
                                var id = $(this).attr("data-id");
                                par = "appsercet=" + newAppsercet + "&method=get.dxWeb.getWebBottom&id=" + id;
                                var data = getSign(url, par);
                                
                                console.log(data);
                                debugger
                                object(url, newAppsercet)
                                $(".companyName").val(data.msg.pic_title);
                                $(".companyUrl").val(data.msg.pic_url);
                                var option = document.querySelectorAll(".companyType option");
                                for (var i = 0; i < option.length; i++) {
                                    var obj = option[i];
                                    if (obj.innerHTML == data.msg.cate_name) {
                                        obj.selected == true;
                                    }
                                }
                                $("#pic").attr("src", data.msg.pic_img);
                                $("#pic").click(function(){
                                    $("#picImg").click();
                                    $("#picImg").show();
                                    $("#picimg").change(function () {
                                    debugger

                                    var fileDom = document.getElementById("picimg");
                                    imgPreview(fileDom, "pic");
                                })
                                   
                                })
                               
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
                                $("#picimg").change(function () {
                                    var fileDom = document.getElementById("picimg");
                                    imgPreview(fileDom, "pic");
                                })
                                $(".addBanner").click(function () {
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
                        if(data.dxBannerList.length>0){
                    var str = "";
                    $(".textList").html(str);
                    
                    $.each(data.dxBannerList,function(i,item){
                        str+='<tr style="border-bottom: 1px solid #d8d8d8;">';
                            str+='<td><div class="checkbox checkbox-primary"><input type="checkbox" class="styled styled-primary t1" id="'+item.id+'"   aria-label="Single checkbox Two" data-id="'+item.id+'"><label for="'+item.id+'"><img src="'+item.pic_img+'" alt="" style="width: 82px;height:56px;display: table-column;vertical-align: middle;"></label></div></td><td>'+item.pic_title+'</td><td>'+item.cate_name+'</td><td>'+item.pic_url+'</td>';
                            var status = document.querySelectorAll(".status");
                            var obj = status[0];
                            debugger
                            if (obj.value == item.state) {
                                str+='<td>上线</td>';
                            } else {
                                str+='<td>下线</td>';
                            }
                            str+='<td>'+item.frequency+'</td><td style="color:#FF5456;"><span class="isDelete" data-id="'+item.id+'">删除</span>&nbsp;&nbsp;<span data-id="'+item.id+'" class="isLook">查看</span>&nbsp;&nbsp;<span class="isEdit" data-id="'+item.id+'">编辑</span></td>'
                        str+="</tr>";
                    })
                    $(".textList").html(str);
                    firstRender();
                }
                console.log(data);
                    }
               
         //删除函数封装
         function deleteText(id) {
               
                par = "appsercet=" + newAppsercet + "&method=get.dxWeb.deleteWebBottom&id=" + id;
                var data = getSign(url, par);
                if (data.msg.code == "200") {
                    alert("删除成功");
                    location.reload();
                }
            }

        // 添加修改函数封装
        function addorupdate(method,id) {
            debugger

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
                var status = document.querySelectorAll(".status");
                var state = $("input[name='bm2']:checked").val()
                debugger
                // var state
                // for(var i = 0;i<status.length;i++){
                //     var obj = status[i];
                //     if (obj.checked == true) {
                //     state = obj.value;
                // } 
                // }
                
                formData.append("state", state);
                formData.append("picImg", $("#picImg")[0].files[0]);
                formData.append("picurl", $(".companyUrl").val());
                console.log($(".companyUrl").val())
                var data = post(url, formData);
                console.log(data);
                if(data.msg.code == "200"){
                    alert("操作成功");
                    location.reload();
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
  