$(document).ready(function() {
    //鼠标引入添加图片动效
    $(".addPhone").hover(function(){
        $(".addimg").addClass("disnone").eq(1).removeClass("disnone");
    })
    $(".addPhone").mouseleave(function(){
        $(".addimg").addClass("disnone").eq(0).removeClass("disnone");
    })
    $(".addPhone2").hover(function(){
        $(".addimage").addClass("disnone").eq(1).removeClass("disnone");
    })
    $(".addPhone2").mouseleave(function(){
        $(".addimage").addClass("disnone").eq(0).removeClass("disnone");
    })
var i = 1 ;
// 上传图片选择事件
$(".wauto").click(function(){
    i = 1;
    $(".nv91-mask").hide();
    $(".nv92").hide();
    $(".nv91").hide();
    $("#upload2").click();
     
})
$(".wauto1").click(function(){
    i = 2;
    $(".nv91-mask").hide();
    $(".nv92").hide();
    $(".nv91").hide();
    $("#upload2").click();

})
$("#upload2").change(function(){
    var files = document.getElementById("upload2")
    var add1 = document.querySelectorAll(".add1");
    // for (var i = 0; i < add1.length; i++) {

      var obj = add1[0];
      if (obj.checked == true && i == 1) {
          $(".imgcov").show();
          $(".custom").eq(0).show();
        imgPreview(files,"reviewImg1");
        imgPreview(files,"reviewImg2");
      } else if (obj.checked == false && i == 2){
        $(".custom").eq(1).show();
        imgPreview(files,"reviewImg3");

      }else if (obj.checked == false && i == 1) {
        $(".imgcov").show();
        $(".custom").eq(0).show();
        imgPreview(files,"reviewImg1");
        imgPreview(files,"reviewImg2");
      }
//   }
})
// 上传图片选择事件结束
   //上传日期插件修改
   $('#date8').daterangepicker({
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
    //切换自定义还是和正文头图一致
    var add1 = document.querySelectorAll(".add1");
    var value
        $(".add1").change(function(){
            value = $("input[type='radio']:checked").val();
            if(value == 1){
                $(".imgcov1").show();
                $(".imgcov2").hide();
                $(".custom").hide().eq(0).show(); 
                
            } 
            if(value == 2){
                $(".imgcov1").hide();
                $(".imgcov2").show();
                $(".custom").hide().eq(1).show();
                if($(".reviewImg3").attr("src") == "undefined" || $(".reviewImg3").attr("src") == null || $(".reviewImg3").attr("src") == ""){
                    $(".imgcov2").hide(); 
                }else{
                    $(".imgcov2").show(); 
                }
                
            } 
           
        })
      //点击删除图片
      var delete1,delete2;
      $(".rigntop").click(function(){
          $(".imgcov").hide();
          delete1 = 1;
      }) 
      $(".imgcov").hover(function(){
         $(".rigntop").show(); 
      })   
      $(".rigntop1").click(function(){
        $(".imgcov1").hide();
        delete2 = 1;
    }) 
    $(".imgcov1").hover(function(){
       $(".rigntop1").show(); 
    })  
    $(".rigntop2").click(function(){
        $(".imgcov2").hide();
        delete2 = 1;
    }) 
    $(".imgcov2").hover(function(){
       $(".rigntop2").show(); 
    })    
    //选择照片弹框弹出后单张照片鼠标引入动效
    $(".imgHover").each(function (index) {
        $(this).hover(function () {
            $(".search2").hide().eq(index).show();
        })
        $(this).mouseleave(function () {
            $(".search2").hide();
        }) 
    }) 
    //点击关闭弹窗
    $(".nv91-close").click(function(){
        $(".nv91-mask").hide();
        $(".nv91").hide();
        $(".nv92").hide();
        $(".imgBox1").html("");
        $(".imgBox2").html("");
        $(".imgBox3").html("");
        $(".imgBox4").html("");
    })
   
   function changeState(el) {
       if (el.readOnly) el.checked=el.readOnly=false;
       else if (!el.checked) el.readOnly=el.indeterminate=true;
   }
   //判断当前显示的是哪个节点下的添加文章
var url1 = localStorage.getItem("url");
var method = localStorage.getItem("method");
if(method === "get.dxWeb.addSkill"){
    $(".color_8d").text("技术文档");
}else if(method === "get.dxWeb.addQAndA"){
    $(".color_8d").text("Q&A文档");
}
else if(method === "get.dxWeb.addWebOperation"){
    $(".color_8d").text("网站运营");
}
else if(method === "get.dxWeb.addNotice"){
    $(".color_8d").text("公告");
    $(".color_5a").text("添加公告");
    $(".newColor").text("添加公告");
}
else if(method === "get.dxWeb.addHelp"){
    $(".color_8d").text("帮助文档");
}
 //判断当前显示的是哪个节点下的添加文章结束
   // 文章内容,文章标题,发布日期,来源,作者,文章摘要,文章列表缩列图 1与正文图一致 2自定义,浏览数,文章浏览器标题,文章详情页关键词,文章详情页描述,选择图片的id,是否置顶  1
   var appid = localStorage.getItem("appid");
   var appsercet = localStorage.getItem("appsercet");
   appsercet = JSON.parse(appsercet);
   appsercet = appsercet.data;
   var articleDetail,title,releaseTime,source,author,authorAbstract,recommended,upBrowse,browserTitle,detailsKeyWord,detailsDescribe,imgId,isUp,imgId1
   //重置浏览数
   $(".resetNum").click(function(){
       $(".upBrowse").val("");
   })
   var data = sign(method);
   var sign1 = data.parameter;
   var timeStamp = data.timestamp;
   console.log(url1,method); 
    var url = src + url1;
    //设置分类回显
    if (method === "get.dxWeb.updateSkill" || method === "get.dxWeb.addSkill") {
        $(".show1").css({"opacity":"1"});
        $(".show1").css({"height":"auto"});
        $(".changeSelectTwo").show();
        $(".changeSelect").show();
        par = "appsercet=" + appsercet + "&method=get.dxWeb.cateAllList";
        var data = getSign(url, par);
        if (data.dxWebList) {
            $(".changeSelect").html("");
            if (data.dxWebList.length > 0) {
                var str = "";
                str += "<option value='0'  data-id='0'>请选择</option>";
                $.each(data.dxWebList, function (i, obj) {
                    str += "<option data-id='" + obj.cate_id + "'>" + obj.cate_name + "</option>"
                })
                $(".changeSelect").html(str);
            }
        }
    }
     //设置分类回显
    if (method === "get.dxWeb.addQAndA" || method === "get.dxWeb.updateQAndA") {
        $(".changeFlex").removeClass("column");
        $(".show1").css({"opacity":"1"});
        $(".show1").css({"height":"auto"});
        $(".show2").css({"opacity":"1"});
        $(".show2").css({"height":"auto"});
        $(".changeSelectTwo").show();
        $(".changeSelect").show();
        $(".changeTitle").text("问题描述:");
        $(".changeTitle1").text("对应产品:");
        var id = "";

        url = src + url1;
        par = "appsercet=" + appsercet + "&method=get.dxWeb.cateAllList";

        var data = getSign(url, par);
        if (data.dxWebList) {
            $(".changeSelect").html("");
            if (data.dxWebList.length > 0) {
                var str = "";
                str += "<option value='0' selected data-id='0'>请选择</option>";
                $.each(data.dxWebList, function (i, obj) {
                    str += "<option data-id='" + obj.product_id + "'>" + obj.product_name + "</option>"
                })
                $(".changeSelect").html(str);
            }
        }
        $(".changeSelect").change(function () {
            productId = $(".changeSelect option:checked").attr("data-id");
            $(".changeSelectTwo").html("");
            par = "appsercet=" + appsercet + "&method=get.dxWeb.cateTwoAllList&productId=" + productId;
            var data1 = getSign(url, par);
            question(data1);
            
        })

        $(".addMessage").click(function () {
            
            var data = formvalidar(method);
            console.log(data);
           if(data){
            updateMessage(method,id,url1);
           }else{
               return;
           }
        })
    }
      
     
 
//定义url
  function updateMessage(method,id,url1){
    // var tt = $(".summernote").summernote("code");
    var arr = [];
    arr.push(UE.getEditor('editor').getContent());
    var tt = arr.join("\n");
      
      var cateId,productId;
     
        //   var note = document.querySelector(".note-editable")
          articleDetail = tt;
          
          title = $.trim($(".title").val());
          releaseTime = $.trim($(".releaseTime").val());
          source = $.trim($(".source").val());
          author = $.trim($(".author").val());
          authorAbstract = $.trim($(".authorAbstract").val());
          detailsKeyWord = $.trim($(".detailsKeyWord").val());
          detailsDescribe = $.trim($(".detailsDescribe").val());
          imgId = $(".reviewImg1").attr("data-id");
          imgId1 = $(".reviewImg3").attr("data-id");
          var add1 = document.querySelectorAll(".add1");
        //   if($(".add1").eq(0))
          cateId = $(".changeSelect option:checked").attr("data-id");
          productId = $(".changeSelectTwo option:checked").attr("data-id");
          for (var i = 0; i < add1.length; i++) {
              
              var obj = add1[0];
              if (obj.checked == true) {
                  recommended = 1;
                  
              } else {
                  recommended = 2;
                 

              }
          }
          var formData = new FormData();
         //添加cateid productid属性 
      if ( method === "get.dxWeb.addSkill" || method === "get.dxWeb.updateSkill") {
   
       
       formData.append('cateId', cateId);  //添加其他参数
             
      }
      if ( method === "get.dxWeb.addQAndA" || method === "get.dxWeb.updateQAndA") {
        
        formData.append('cateId', productId);  //添加其他参数
        formData.append('productId',cateId ); 
        
      }
          upBrowse = $.trim($(".upBrowse").val());
          browserTitle = $.trim($(".browserTitle").val());
          detailsKeyWord = $.trim($(".detailsKeyWord").val());
          detailsDescribe = $.trim($(".detailsDescribe").val());
          imgId = $(".reviewImg1").attr("data-id");
          imgId1 = $(".reviewImg3").attr("data-id");;
          formData.append('appid', appid);  //添加其他参数
          formData.append('sign', sign1);  //添加其他参数
          formData.append('timestamp', timeStamp);  //添加其他参数
          formData.append('articleDetail', tt);  //添加其他参数
          formData.append('title', title);  //标题
          formData.append('releaseTime', releaseTime);  //发布时间
          formData.append('source', source);  //来源
          formData.append('author', author);  //作者
          formData.append('appsercet', appsercet);  //添加其他参数
          formData.append('method', method);  //添加其他参数
          formData.append('authorAbstract', authorAbstract);  //文章摘要
          formData.append('recommended', recommended);  //是否推荐
          formData.append('upBrowse', upBrowse);  //浏览数
          formData.append('browserTitle', browserTitle);  //浏览器标题
          formData.append('detailsKeyWord', detailsKeyWord);  //关键字
          formData.append('detailsDescribe', detailsDescribe);  //文章详情
          if(imgId == "undefined" || imgId == "" || imgId == null){

          }else{
            formData.append('imgId', imgId || "");  //正文头图
          }
          if(imgId1 == "undefined" || imgId1 == "" || imgId1 == null){

            }else{
                formData.append('imgId1', imgId1 || "");  //缩略图  
            }
            if(delete1 == "undefined" || delete1 == "" || delete1 == null){

            }else{
                formData.append('delete1', delete1);  //是否删除正文头图
            }
            if(delete2 == "undefined" || delete2 == "" || delete2 == null){
  
              }else{
                formData.append('delete2', delete2);  //是否删除自定义缩略图  
              }    
         
          
          if(id == "" || id == null){
              
          }else{
           formData.append('articleId', id);  //添加其他参数  
          }
         
          console.log(url)
             
          var data = post(url, formData);
          console.log(data);
          data = JSON.parse(data);
          if(data.msg.code == "200"){
            $(".prompt ").text("保存成功");
            $(".nv91-mask").show();
               $(".nv1").show();
               
               $(".nv92").hide();
               $(".nv91").hide();
            //    $(".confirm1 ").hide();
               setTimeout(function(){
                $(".nv91-mask").hide();
               $(".nv1").hide();
               $(".nv92").hide();
               $(".nv91").hide();
               },2000); 
        }
        if(data.msg.code == "10"){
            $(".prompt ").text("保存失败");
            $(".nv91-mask").show();
               $(".nv3").show();
               setTimeout(function(){
                $(".nv91-mask").hide();
               $(".nv3").hide();
               $(".nv92").hide();
               $(".nv91").hide();
               },2000); 
        }
        document.getElementById("resetInput").reset();
        //清空列表
        $(".detailsKeyWord").val("");
        $(".detailsDescribe").val("");
        $(".reviewImg1").attr("src","");
        $(".reviewImg3").attr("src","");
  }
  
  if(method === "get.dxWeb.updateWebOperation" || method === "get.dxWeb.updateHelp" || method === "get.dxWeb.helpDetails" || method === "get.dxWeb.skillDetails" || method === "get.dxWeb.updateSkill" || method === "get.dxWeb.qAndADetails" || method === "get.dxWeb.updateQAndA" || method === "get.dxWeb.webOperationDetails" || method === "get.dxWeb.noticeDetails" || method === "get.dxWeb.updateNotice"){
      
   var detail = localStorage.getItem("textDetail");
   var cateId;
      if (detail) {
          detail = JSON.parse(detail);
          console.log(detail);
          var id = detail.msg.id;
          if(detail.msg.cate_id){
              cateId = detail.msg.cate_id
          }
          // var articleDetail,title,releaseTime,source,author,authorAbstract,recommended,upBrowse,browserTitle,detailsKeyWord,detailsDescribe,imgId,isUp
          $(".title").val(detail.msg.title);
          // $("#summernote").summernote("code") = detail.msg.article;
          // $(".articleDetail").text(detail.msg.article);
               
          var ue = UE.getEditor('editor');//初始化对象
	$(document).ready(function(){
		var ue = UE.getEditor('editor');
		// var proinfo=$("#divdata").text();
		
		ue.ready(function() {//编辑器初始化完成再赋值
			ue.setContent(detail.msg.article);  //赋值给UEditor
		});
		
	});
　
        //   $('.summernote').summernote('code', detail.msg.article);
        //   article_detail
        //   $(".summernote").html(detail.msg.article);
          $(".releaseTime").val(detail.msg.release_time);
          $(".source").val(detail.msg.source);
          $(".author").val(detail.msg.author);
          $(".authorAbstract").val(detail.msg.author_abstract);
         
         
          if(detail.msg.large_img){
            $(".reviewImg1").show();
            $(".imgcov").show();
             $(".reviewImg1").attr("src",detail.msg.large_img);

          }
          if(detail.msg.recommended == 1){
            $(".imgcov1").show();
            $(".imgcov2").hide();
          }else{
            $(".imgcov1").hide();
            $(".imgcov2").show();
          }
          if(detail.msg.small_img){
              $(".custom").eq(1).show();
            // $(".reviewImg3").show();
           
            $(".reviewImg3").attr("src",detail.msg.small_img);
          }
          if(detail.msg.small_img == ""){
           
            $(".imgcov1").hide();
          // $(".reviewImg3").show();
         
          $(".reviewImg3").attr("src",detail.msg.small_img);
        }
         if(method === "get.dxWeb.updateSkill"){
            var opt = document.querySelectorAll(".changeSelect option");
            for (var i = 0; i < opt.length; i++) {
               var obj = opt[i];
               if (obj.getAttribute("data-id") == detail.msg.cate_id) {
                   obj.selected = true;
                  
               }
           }  
         }
         if(method === "get.dxWeb.updateQAndA"){
            var opt = document.querySelectorAll(".changeSelect option");
         for (var i = 0; i < opt.length; i++) {
            var obj = opt[i];
            if (obj.getAttribute("data-id") == detail.msg.product_id) {
                obj.selected = true;
                $(".changeSelectTwo").html("");
               
            }
        }
        par = "appsercet=" + appsercet + "&method=get.dxWeb.cateTwoAllList&productId=" + detail.msg.product_id;
        var data1 = getSign(url, par);
        question(data1);
    var opt1 = document.querySelectorAll(".changeSelectTwo option");
     for (var i = 0; i < opt1.length; i++) {
        var obj = opt1[i];
        if (obj.getAttribute("data-id") == detail.msg.cate_id) {
            obj.selected = true;
           
        }
    }
         }
         
        // 
        // productId = detail.msg.product_id;
        //     $(".changeSelectTwo").html("");
           
          var add1 = document.querySelectorAll(".add1");
          for (var i = 0; i < add1.length; i++) {
              var obj = add1[0];
              var obj1 = add1[1];
              if (obj.value == detail.msg.recommended) {
                  obj.checked = true;
                  $(".addPhone").val("修改图片");
                  $(".custom").hide().eq(0).show();
              }else{
                obj1.checked = true;
                $(".addPhone2").val("修改图片");
                $(".custom").hide().eq(1).show();
              }
          }
          $(".upBrowse").val(detail.msg.up_browse);
          $(".browserTitle").val(detail.msg.browser_title);
          $(".detailsKeyWord").text(detail.msg.details_key_word);
          $(".detailsDescribe").text(detail.msg.details_describe);
      }
      //判断如果是查看的清空不允许进行修改
      if(method === "get.dxWeb.helpDetails" || method === "get.dxWeb.skillDetails" || method === "get.dxWeb.qAndADetails" || method === "get.dxWeb.webOperationDetails" || method === "get.dxWeb.noticeDetails" ){
       $(".message1").hide();
      }
      $(".addMessage").click(function () {
       updateMessage(method,id,url1);
       })
   
}else if(method === "get.dxWeb.addWebOperation" ){
   var id = "";
   $(".addMessage").click(function () {
    
       var data = formvalidar(method);
       console.log(data);
       if (data) {
           updateMessage(method, id, url1);
       } else {
           return;
       }
   })
}
   else if(method === "get.dxWeb.addNotice"){
    var id = "";
    $(".addMessage").click(function () {
     
        var data = formvalidar(method);
        console.log(data);
        if (data) {
            updateMessage(method, id, url1);
        } else {
            return;
        }
    })
   }

else if(method === "get.dxWeb.addHelp"){
   $(".changeFlex").removeClass("column");
//    $(".show1").show();
   var id = "";
   
   url = src +"/helpInterface.dx";
   par="appsercet="+appsercet+"&method=get.dxWeb.cateAllList";
   var data = getSign(url,par);
   
   console.log(data);
   type(data);
  
   $(".addMessage").click(function () {
    
       var data = formvalidar(method);
       console.log(data);
       if (data) {
           updateMessage(method, id, url1);
       } else {
           return;
       }
   })
}
else if(method === "get.dxWeb.addSkill"){
   $(".changeFlex").removeClass("column");
   $(".show1").show();
   var id = "";
   url = src + url1;
   
   par="appsercet="+appsercet+"&method=get.dxWeb.cateAllList";
   var data = getSign(url,par);
  
   console.log(data);
   type(data);
   $(".addMessage").click(function () {
    var data = formvalidar(method);
    console.log(data);
   if(data){
    updateMessage(method,id,url1);
   }else{
       return;
   }

   })
}
  //渲染分类下拉框
  function type(data){
      if (data.dxWebList) {
       $(".changeSelect").html("");
          if (data.dxWebList.length > 0) {
              var str = "";
              str+="<option value='0'  data-id='0'>请选择</option>";
              $.each(data.dxWebList, function (i, obj) {
                  str += "<option data-id='" + obj.cate_id + "'>" + obj.cate_name + "</option>"
              })
              $(".changeSelect").html(str);
          }
      }
       
   }
   //渲染问题分类下拉框
   function question(data){
       if (data.dxWebList) {
           $(".changeSelectTwo").html("");
            if (data.dxWebList.length > 0) {
                var str = "";
                str+="<option value='0' data-id = '0' selected>请选择</option>";
                $.each(data.dxWebList, function (i, obj) {
                    str += "<option data-id='" + obj.cate_id + "'>" + obj.cate_name + "</option>"
                })
                $(".changeSelectTwo").html(str);
            }
        }

    }  
    //封装校验表单方法
    function formvalidar(method){
        

    //获取当前时间戒指时分秒
    var now = new Date().getTime();//当前时间戳
var time_1 = new Date(document.getElementById('date8').value).getTime();//1的时间戳

//直接进行时间戳的比较即可，js的时间戳是从1970年1月1日0时0分0秒到对应时间所经过的毫秒数
//上面3个变量都是number类型，可直接进行比较，加减运算也可

        var success = true;
        var ret = /^\d{4}[-]([0][1-9]|(1[0-2]))[-]([1-9]|([012]\d)|(3[01]))([ \t\n\x0B\f\r])(([0-1]{1}[0-9]{1})|([2]{1}[0-4]{1}))([:])(([0-5]{1}[0-9]{1}|[6]{1}[0]{1}))([:])((([0-5]{1}[0-9]{1}|[6]{1}[0]{1})))$/;
        console.log($(".date").val());
            if($(".title").val() == ""){
                $(".prompt ").text("请填写文章标题");
                $(".nv91-mask").show();
                $(".confirm1 ").show();
                setTimeout(function(){
                    $(".nv91-mask").hide();
                    $(".confirm1 ").hide();
                },2000);
                success = false;
                return;
            }
            else if($(".releaseTime").val() == ""){
                $(".prompt ").text("请选择发布日期");
                $(".nv91-mask").show();
                $(".confirm1 ").show();
                setTimeout(function(){
                    $(".nv91-mask").hide();
                    $(".confirm1 ").hide();
                },2000);
                success = false;
                return;
            }    
            else if(!ret.test($(".releaseTime").val())){
                $(".prompt ").text("请输入正确的发布日期");
                $(".nv91-mask").show();
                $(".confirm1 ").show();
                setTimeout(function(){
                    $(".nv91-mask").hide();
                    $(".confirm1 ").hide();
                },2000);
                success = false;
                return;
            }
            else  if(time_1 > now){
                $(".prompt ").text("超出日期范围");
                $(".nv91-mask").show();
                $(".confirm1 ").show();
                setTimeout(function(){
                    $(".nv91-mask").hide();
                    $(".confirm1 ").hide();
                },2000);
                success = false;
                return;
            } 
            else if($(".author").val() == ""){
                $(".prompt ").text("请填写发布作者");
                $(".nv91-mask").show();
                $(".confirm1 ").show();
                setTimeout(function(){
                    $(".nv91-mask").hide();
                    $(".confirm1 ").hide();
                },2000);
                success = false;
                return;
            }
            if(method === "get.dxWeb.updateSkill" || method === "get.dxWeb.addSkill"){
                if($(".changeSelect option:checked").attr("data-id") == 0){
                    $(".prompt ").text("请选择产品分类");
                    $(".nv91-mask").show();
                    $(".confirm1 ").show();
                    setTimeout(function(){
                        $(".nv91-mask").hide();
                        $(".confirm1 ").hide();
                    },2000);
                    success = false;
                    return;

                }

            }
            if(method === "get.dxWeb.addQAndA" || method === "get.dxWeb.updateQAndA"){
                if($(".changeSelect option:checked").attr("data-id") == 0){
                    $(".prompt ").text("请选择产品分类");
                    $(".nv91-mask").show();
                    $(".confirm1 ").show();
                    setTimeout(function(){
                        $(".nv91-mask").hide();
                        $(".confirm1 ").hide();
                    },2000);
                    success = false;
                    return;

                }else if( $(".changeSelectTwo option:checked").attr("data-id") == 0){
                    $(".prompt ").text("请选择问题分类");
                    $(".nv91-mask").show();
                    $(".confirm1 ").show();
                    setTimeout(function(){
                        $(".nv91-mask").hide();
                        $(".confirm1 ").hide();
                    },2000);
                    success = false;
                    return;
                }
            }


       return success;
    }
});