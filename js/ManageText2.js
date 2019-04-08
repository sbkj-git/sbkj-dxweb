$(document).ready(function(){
    function changeState(el) {
        if (el.readOnly) el.checked=el.readOnly=false;
        else if (!el.checked) el.readOnly=el.indeterminate=true;
    }
   //按照发布时间排序
   var ul = $(".ul_sort ul");
    var lis = [];

    lis = $(".ul_sort ul li");
    var ux = [];
    //循环提取时间，并调用排序方法进行排序
    for (var i=0; i<lis.length; i++){
        var tmp = {};
        tmp.dom = lis.eq(i);
        tmp.date = new Date(lis.eq(i).find("span").eq(0).html().replace(/-/g,'/'));
        ux.push(tmp);
    }
    //数组排序，支持年的比较
    ux.sort(function(a,b){
       var myDate = new Date();
       var year = myDate.getYear();
       if(a.date.getYear < year && b.date.getYear == year){
          return true;
       }
       return b.date - a.date;
    });
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
    //点击置顶
   
    //移除原先顺序错乱的li内容
    $('.ul_sort ul li').remove();
    //重新填写排序好的内容
    for (var i=0; i<ux.length; i++){
       ul.append(ux[i].dom);
    }
    //封装渲染数据方法
    function bannerList1(data) {
            if (data.dxWebList.length > 0) {
                var str = "";
                $(".textList").html("");
                $.each(data.dxWebList, function (i, item) {
                    str += '<tr style="border-bottom: 1px solid #d8d8d8;">';
                    str += '<td><div class="checkbox checkbox-primary"><input type="checkbox" class="styled styled-primary t1" id="' + item.id + '"   aria-label="Single checkbox Two" data-id="' + item.id + '"><label for="' + item.id + '">' + item.title + '</label></div></td><td><img src="' + item.large_img + '" alt="" style="width: 82px;height:56px;display: table-column;vertical-align: middle;"></td><td>' + item.author + '</td>';
                    if (item.is_ups == 1) {
                        str += "<td>&#10003;</td>";
                    } else {
                        str += "<td>&#10007;</td>"
                    }
                    str += '<td>' + item.create_time + '</td><td style="color:#FF5456;"><span class="isDelete" data-id="' + item.id + '">删除</span>&nbsp;&nbsp;<span data-id="' + item.id + '" class="isLook">查看</span>&nbsp;&nbsp;<span class="isEdit" data-id="' + item.id + '">编辑</span></td>'
                    // if (item.is_ups == 1) {
                    //     str+="&nbsp;&nbsp;<span class='toDown' data-id='" + item.id + "'>取消置顶</span></td>";
                    // } else {
                    //     str+="&nbsp;&nbsp;<span class='toTop ' data-id='" + item.id + "'>置顶</span>&nbsp;</td>";
                    // }
                    str += "</tr>";

                })
                $(".textList").html(str);
            }
        };
         
    //页面初次渲染加载数据
    var data = window.localStorage.getItem("dxRightsList");    
        data = JSON.parse(data);  
     //页面初次加载渲染页面
     var url,par;      
        var appsercet = window.localStorage.getItem("appsercet");
        appsercet = JSON.parse(appsercet);
        var newAppsercet = appsercet.data;
       
     //通过banner名称查询
     $(".banner1").click(function(){
        var title = $(".banner").val();
        par = "appsercet="+newAppsercet+"&method=get.dxWeb.webOperationList&title="+title;
        var bannerList = getSign(url,par);
        if(bannerList.msg && bannerList.msg.codeMsg){
            $(".textList").html("");
            alert("没有数据");
            
        }
        else if( bannerList.dxWebList){
            bannerList1(bannerList)
           
        }
       
       
    })
   
        //判断是否有添加管理员操作权限
        var arr = [];
        $.each(data,function(i,item){
            //console.log(item)
            if(item.id == 2){
                arr.push(item)
            }
        })
        var help ;
        console.log(arr[0]);
        $.each(arr[0].dxRightsList,function(i,item){
            //console.log(arr[0].dxRightsList)
            if(item.method === "get.dxWeb.webOperationList"){
                url = src+"/"+item.link_path;
                help = "/"+item.link_path;
                localStorage.setItem("pageNow1",1)     
                var currentPage = localStorage.getItem("pageNow1")
                // par = "appsercet="+newAppsercet+"&method="+item.method+"&currentPage="+currentPage;
                par = "appsercet="+newAppsercet+"&method="+item.method+"&currentPage="+currentPage; 
                    var data2 = getSign(url, par);
                    console.log(data2)
                    pageCount = Math.ceil(data2.pageInfo.totalRows/10);
                    new Page({
                        id: 'pagination',
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
                console.log(data2);
                bannerList1(data2);
                            //分页
                            //分页渲染
        
                $(document).on("click", ".pageItem", function () {

                    debugger
                    currentPage = $(this).html();
                    localStorage.setItem("pageNow1", currentPage)
                    par = "appsercet=" + newAppsercet + "&method=get.dxWeb.webOperationList&currentPage=" + currentPage;
                    var bannerList = getSign(url, par);
                    bannerList1(bannerList);
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
                        par = "appsercet=" + newAppsercet + "&method=get.dxWeb.webOperationList&currentPage=" + currentPage;
    
                        var data2 = getSign(url, par);
                        bannerList1(data2);
                        $(this).val("");
                    }
    
                })
                //banner置顶事件   
                $(".toTop").click(function () {
                    var index = $(this).index();
                    debugger
                    var id = $(this).attr("data-id");
                    par = "appsercet=" + newAppsercet + "&method=get.dxWeb.topBanner&id=" + id + "&type=1";
                    var stc = src + "/bannerGetInterface.dx";
                    var statu = getSign(stc, par);

                    if (statu.msg.code == "200") {
                        alert("置顶成功");
                        // $(".toTop").eq(index).hide();
                        location.reload();

                    }
                })
                $(".toDown").click(function () {
                    debugger
                    var id = $(this).attr("data-id");
                    par = "appsercet=" + newAppsercet + "&method=get.dxWeb.topBanner&id=" + id + "&type=2";
                    var stc = src + "/bannerGetInterface.dx";
                    var statu = getSign(stc, par);
                    if (statu.msg.code == "200") {
                        alert("取消置顶成功");
                        // $(".toDown").eq(index).hide();
                        location.reload();

                    }
                })
                //判断该角色是否有权限操作
                if(item.dxRightsTwoList.length == 0){
                    return
                }
                else{
                    $.each(item.dxRightsTwoList,function(i,obj){
                       //判断该用户是否有添加权限
                        if(obj.method === "get.dxWeb.addWebOperation"){
                          $(".Add").show();
                          $(".Add").click(function(){
                              
                            localStorage.setItem("method","get.dxWeb.addWebOperation");
                            localStorage.setItem("url",help);
                            location.href = "./AddText.html";
                          })
                          
                            }
                        //判断该用户是否有删除权限 
                        if(obj.method === "get.dxWeb.deleteWebOperation"){
                            $(".Delete").show();
                            $(".isDelete").show();
                            $(".Delete").click(function(){
                                $(".nv91-mask").show();
                                $(".nv").show();
                                $(".roleSure").click(function(){
                                    deleteText();
                                })
                                $(".roleRefuse").click(function(){
                                    $(".nv91-mask").show();
                                    $(".nv").show(); 
                                })
                                
                            })
                           
                            $(".isDelete").click(function () {
                                $(".nv91-mask").show();
                                $(".nv").show();
                                var IdList = $(this).attr("data-id");
                                $(".roleSure").click(function(){
                                    
                                    par = "appsercet=" + newAppsercet + "&method=get.dxWeb.deleteWebOperation&IdList=" + IdList;
    
                                    var data = getSign(url, par);
                                    if (data.msg.code == "200") {
                                        location.reload();
                                    }
                                })
                                $(".roleRefuse").click(function(){
                                    $(".nv91-mask").show();
                                    $(".nv").show(); 
                                })
                                
                            })
                           
                            //判断是否有查看权限
                        }if(obj.method === "get.dxWeb.webOperationDetails"){
                              //查看文章详情
                             $(".isLook").show();
                            $(".isLook").click(function(){
                                var id = $(this).attr("data-id");
                                par = "appsercet="+newAppsercet+"&method=get.dxWeb.webOperationDetails&articleId="+id;
                                var data = getSign(url,par);
                                
                                localStorage.setItem("textDetail",JSON.stringify(data) );
                                console.log(data); 
                                location.href = "./AddText.html"
                            })
                            
                              
                               
                            }  
                            //判断是否有编辑权限
                           if(obj.method === "get.dxWeb.updateWebOperation"){
                                  
                            $(".isEdit").show();
                              $(".isEdit").click(function(){
                               
                                  var id = $(this).attr("data-id");
                                  par = "appsercet="+newAppsercet+"&method=get.dxWeb.webOperationDetails&articleId="+id;
                                var data = getSign(url,par);
                                localStorage.setItem("textDetail",JSON.stringify(data));
                                localStorage.setItem("url",help);
                                localStorage.setItem("method","get.dxWeb.updateWebOperation");
                                location.href = "./AddText.html";
                              })
                                }   
                                          
                                          
                    })
                    
                }
            }
           

        })
       //删除函数封装
        function deleteText() {
            var inputs = document.querySelectorAll(".t1");//获取所有的input标签对象  
            var IdList;
            var checkboxArray = [];//初始化空数组，用来存放checkbox对象。
            for (var i = 0; i < inputs.length; i++) {
                var obj = inputs[i];
                if (obj.type == 'checkbox') {
                    checkboxArray.push(obj);
                }
            }
            IdList = new Array();
            for (var i = 0; i < checkboxArray.length; i++) {
                if (checkboxArray[i].checked) {
                    IdList.push(checkboxArray[i].getAttribute("data-id"));
                }
            }
            par = "appsercet=" + newAppsercet + "&method=get.dxWeb.deleteWebOperation&IdList=" + IdList;

            var data = getSign(url, par);
            if (data.msg.code == "200") {
                location.reload();
            }
        }
})