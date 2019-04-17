 // 分页实现
 function pageChange(method,data2,pagination){
         
       debugger
             var pageCount,pageN,pageNum;
             if(data2.body&&data2.body.totalCount){
                 pageCount = Math.ceil(data2.body.totalCount / 10);//后台返回的总页数
             }else{
                 pageCount == 0;
             }
             if(data2.body&&data2.body.totalCount){
                 pageN = data2.body.totalCount;
             }else{
                 pageN == 0;
             }
             if(data2.body&&data2.body.totalCount){
                 new Page({
                     id: pagination,
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
             //初次加载页面数据
            
             $(document).on("click", ".pageItem", function () {
                 debugger
                 currentPage = $(this).html();
                 localStorage.setItem("pageNow1", currentPage)
                 url = zt + method;
                 var data12 = JSON.stringify({ "pageSize": "10", "currentPage": currentPage }); var jsonData = ajax(url, data12);
                 render3(jsonData);
                 judge();
             })
            //  $(".pagePrev").unbind('click').bind("click",function(){
             $(document).on("click", ".pagePrev", function () {
                debugger
                currentPage = localStorage.getItem("pageNow1");
                var num3 = parseInt(currentPage) - 1;
                url = zt + method;
                if(currentPage  > 0 && currentPage  < pageCount){
                    var data12 = JSON.stringify({ "pageSize": "10", "currentPage": num3 }); var jsonData = ajax(url, data12);
                }else {
                    var data12 = JSON.stringify({ "pageSize": "10", "currentPage": "1" }); var jsonData = ajax(url, data12); 
                }
               
                render3(jsonData);
                judge();
                var num = parseInt(currentPage)+1;
                localStorage.setItem("pageNow1", num);
            })
            // $(".pageNext").unbind('click').bind("click",function(){
                
            $(document).on("click", ".pageNext", function () {
                debugger
                currentPage = localStorage.getItem("pageNow1");
               var num2 = parseInt(currentPage) + 1;
                url = zt + method;
                if(currentPage > 0 && currentPage < pageCount){
                    var data12 = JSON.stringify({ "pageSize": "10", "currentPage": num2 }); var jsonData = ajax(url, data12);
                }else{
                    var data12 = JSON.stringify({ "pageSize": "10", "currentPage": pageCount }); var jsonData = ajax(url, data12); 
                }
               
                render3(jsonData);
                judge();
                var num = parseInt(currentPage)+1;
                localStorage.setItem("pageNow1", num);
            })
             var re = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/ 
            
             $(".returnPage").blur(function () {
                 debugger       
                 var value = $(this).val();
                 if (!re.test(value)) {
                     return false;
                 } else {
                     var pageNum = parseInt($(this).val());//获取当前页数
                     localStorage.setItem("pageNow1", pageNum);
                     if (pageNum > 0 && pageNum <= pageCount) {
                        url = zt + method;
                        data12 = JSON.stringify({ "pageSize": "10", "currentPage": pageNum });
                        var jsonData = ajax(url, data12);
                        render3(jsonData);
                        judge();
                        $(this).val(pageNum);
                     } else  if(pageNum > pageCount){
                            debugger
                             $(this).val(pageCount);
                             $(".pageItem").removeClass("active");
                             $(".pageItem").eq(6).addClass("active");
                             url = zt + method;

                             data12 = JSON.stringify({ "pageSize": "10", "currentPage": pageCount });
                             var jsonData = ajax(url, data12);
                             render3(jsonData);
                             judge();
                             // $(this).val(""); 
                         
                         
                     } 
                 }
             })
     }
