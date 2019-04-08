$(document).ready(function() {
    //jquery创建一个summernote实例
 $('.summernote').summernote({
    height: 200,
    tabsize: 2,
    lang: 'zh-CN'
    //回调函数

});
    //点击的时候判断是否都填了
    $(".addMessage").click(function(){
        var img1 = $(".reviewImg1").attr("src");
        var img2 = $(".reviewImg3").attr("src");
        if(img1 == ""||img1 == null || img1 == "undefined"){
            alert("请选择正文头图");
            return false;
        }
        if(img2 == ""||img2 == null || img2 == "undefined"){
            alert("请选择文章缩略图");
            return false;
        }
        if($(".changeSelect option:checked").attr("data-id") && method === "get.dxWeb.updateSkill" || method === "get.dxWeb.addSkill"){
            alert("请选择产品分类");
            return false;
        }
        if($(".changeSelect option:checked").attr("data-id") && method === "get.dxWeb.addQAndA" || method === "get.dxWeb.updateQAndA"){
            alert("请选择问题分类");
            return false;
        }
    })
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
                $(".custom").hide().eq(1).show() 
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
        delete2 = 2;
    }) 
    $(".imgcov1").hover(function(){
       $(".rigntop1").show(); 
    })  
    $(".rigntop2").click(function(){
        $(".imgcov2").hide();
        delete2 = 2;
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
    $(document).on("click",".addPhone",function(e){
        debugger
    // $(".addPhone").on("click",function(e){
        $(".nv91-mask").show();
       $(".nv91").show();
        $(this).val("修改图片");
        $(".imgHover").each(function(index){
            $(".imgHover").eq(index).on("click",function(e){
                $(".nv91-mask").hide();
                $(".nv91").hide();
                $(".custom").eq(0).show();
                $(".imgcov").show();
                value1 = $("input[type='radio']:checked").val();
                if(value1 == 1){
                    $(".imgcov1").show();
                }else{
                    $(".imgcov1").hide();
                }
               
                $(".imgcov2").show();
                var urlSrc1 = $(".imgHover").eq(index).find("img").attr("src");
                var urlId1 = $(".imgHover").eq(index).find("img").attr("data-id");
                $(".reviewImg1").attr("src",url1.urlSrc);
                $(".reviewImg1").attr("data-id",url1.urlId);
                //         localStorage.setItem("url1",JSON.stringify({"urlSrc":urlSrc1,"urlId":urlId1}));
                //         var url1 = localStorage.getItem("url1");
                // url1 = JSON.parse(url1);
                // $(".reviewImg1").attr("src",url1.urlSrc);
                // $(".reviewImg1").attr("data-id",url1.urlId);
            })
        })
       
    })
    $(document).on("click",".addPhone2",function(e){
        debugger
    // $(".addPhone2").on("click",function(e){
        $(".nv91-mask").show();
        $(".nv91").show();
        $(this).val("修改图片");
        $(".imgHover").each(function(index){
            $(".imgHover").eq(index).on("click",function(e){
                window.event.cancelBubble=true;
                e.stopPropagation();
                $(".nv91-mask").hide();
                $(".nv91").hide();
                $(".imgcov1").hide();
                var urlSrc = $(".imgHover").eq(index).find("img").attr("src");
                var urlId = $(this).find("img").attr("data-id");
                localStorage.setItem("url2",JSON.stringify({"urlSrc":urlSrc,"urlId":urlId}));
                var url2 = localStorage.getItem("url2");
                url2 = JSON.parse(url2);
                $(".reviewImg3").attr("src",url2.urlSrc);
                $(".reviewImg3").attr("data-id",url2.urlId);
            })
        })
	});

    
    //选择发布时间
    $("#date").dateSelect();
    //jquery创建一个summernote实例
    $('.summernote').summernote({
        height: 200,
        tabsize: 2,
        lang: 'zh-CN'
        //回调函数

    });
   function changeState(el) {
       if (el.readOnly) el.checked=el.readOnly=false;
       else if (!el.checked) el.readOnly=el.indeterminate=true;
   }
var url1 = localStorage.getItem("url");
var method = localStorage.getItem("method");
   // 文章内容,文章标题,发布日期,来源,作者,文章摘要,文章列表缩列图 1与正文图一致 2自定义,浏览数,文章浏览器标题,文章详情页关键词,文章详情页描述,选择图片的id,是否置顶  1
   var appid = localStorage.getItem("appid");
   var appsercet = localStorage.getItem("appsercet");
   appsercet = JSON.parse(appsercet);
   appsercet = appsercet.data;
   var articleDetail,title,releaseTime,source,author,authorAbstract,recommended,upBrowse,browserTitle,detailsKeyWord,detailsDescribe,imgId,isUp,imgId1
   //重置浏览数
   $(".resetNum").click(function(){
       $(".upBrowse").val("0");
   })
   var data = sign(method);
   var sign1 = data.parameter;
   var timeStamp = data.timestamp;
   console.log(url1,method); 
var url = src + url1;
    //设置分类回显
    if (method === "get.dxWeb.updateSkill" || method === "get.dxWeb.addSkill") {
        $(".show1").show();
        debugger
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
        $(".show1").show();
        $(".show2").show();
        $(".changeTitle").text("问题描述");
        $(".changeTitle1").text("对应产品");
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

            updateMessage(method, id, url1);
        })
    }
      
     
 
//定义url
  function updateMessage(method,id,url1){
    var tt = $(".summernote").summernote("code");
      
      
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
              debugger
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
    //     var cateId;
    //    var option = document.querySelectorAll(".changeSelect option");
    //     
    //     for (var i = 0; i < option.length; i++) {
    //         var obj = option[i];
    //         if (obj.checked = true) {
    //             //获取对应产品一级栏目的data-id属性
    //             cateId = obj.getAttribute("data-id");
               
    //         }
    //     } 
       
       formData.append('cateId', cateId);  //添加其他参数
             
      }
      if ( method === "get.dxWeb.addQAndA" || method === "get.dxWeb.updateQAndA") {
    //       
    //    var option = document.querySelectorAll(".changeSelect option");
    //       for (var i = 0; i < option.length; i++) {
    //           var obj = option[i];
              
    //           if (obj.selected = true) {
    //               //获取对应产品一级栏目的data-id属性
    //               cateId = obj.getAttribute("data-id");
                
    //           }
    //       }  
    //       formData.append('cateId', cateId);  //添加其他参数
    //       var option = document.querySelectorAll(".changeSelectTwo option");
    //       for (var i = 0; i < option.length; i++) {
    //           var obj = option[i];
    //           if (obj.selected = true) {
    //               //获取对应产品一级栏目的data-id属性
    //               productId = obj.getAttribute("data-id");
                  
    //           }
    //       }  


        //   formData.append('productId', productId);  //添加其他参数
        formData.append('cateId', cateId);  //添加其他参数
        formData.append('productId',productId ); 
        
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
          formData.append('imgId', imgId || "");  //正文头图
          formData.append('imgId1', imgId1 || "");  //缩略图       
          
          if(id == "" || id == null){
              
          }else{
           formData.append('articleId', id);  //添加其他参数  
          }
         
          console.log(url)
             
          var data = post(url, formData);
          console.log(data);
          data = JSON.parse(data);
          if(data.msg.code == "200"){
            $(".prompt span").text("保存成功");
            $(".nv91-mask").show();
               $(".nv").show();
               setTimeout(function(){
                $(".nv91-mask").hide();
               $(".nv").hide();
               },1000); 
        }
        //   $("iframe").attr("src","./BannerManager.html")
        //   location.href = "./BannerManager.html";
        //   if(data.msg.code == "200"){
        //       location.href = "./BannerManager.html";
        //   }

  }
  
  if(method === "get.dxWeb.updateWebOperation" || method === "get.dxWeb.updateHelp" || method === "get.dxWeb.helpDetails" || method === "get.dxWeb.skillDetails" || method === "get.dxWeb.updateSkill" || method === "get.dxWeb.qAndADetails" || method === "get.dxWeb.updateQAndA"){
      
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
          $('.summernote').summernote('code', detail.msg.article);
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
         
         var opt = document.querySelectorAll(".changeSelect option");
         for (var i = 0; i < opt.length; i++) {
            var obj = opt[i];
            if (obj.value == detail.msg.cate_id) {
                obj.selected = true;
            }
        }
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
      if(method === "get.dxWeb.helpDetails" || method === "get.dxWeb.skillDetails" || method === "get.dxWeb.qAndADetails" ){
       $(".message1").hide();
      }
      $(".addMessage").click(function () {
       updateMessage(method,id,url1);
       })
   
}else if(method === "get.dxWeb.addWebOperation" ){
   var id = "";
   $(".addMessage").click(function () {
       
       updateMessage(method,id,url1);
       location.href = "./ManagerText.html"
   })
}else if(method === "get.dxWeb.addHelp"){
   $(".changeFlex").removeClass("column");
//    $(".show1").show();
   var id = "";
   
   url = src + url1;
   par="appsercet="+appsercet+"&method=get.dxWeb.cateAllList";
   var data = getSign(url,par);
   
   console.log(data);
   type(data);
  
   $(".addMessage").click(function () {
       
       updateMessage(method,id,url1);
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
       
       updateMessage(method,id,url1);
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
                str+="<option value='0' >请选择</option>";
                $.each(data.dxWebList, function (i, obj) {
                    str += "<option data-id='" + obj.cate_id + "'>" + obj.cate_name + "</option>"
                })
                $(".changeSelectTwo").html(str);
            }
        }

    }  
}); 