$(document).ready(function() {
    //jquery创建一个summernote实例
 $('.summernote').summernote({
    height: 200,
    tabsize: 2,
    lang: 'zh-CN'
    //回调函数

});
    //选择照片弹框弹出后单张照片鼠标引入动效
    $(".imgHover").each(function (index) {
        $(this).hover(function () {
            $(".search2").hide().eq(index).show();
        })
        $(this).mouseleave(function () {
            $(".search2").hide();
        })
        $(this).click(function () {
            location.href = "../nav7/ImgReview.html"
        })
    })
    
    //选择照片点击事件
    $(".addPhone").click(function(){
       $(".nv91-mask").show();
       $(".nv91").show();
    })
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
 $("#f9").click(function(){
     $(".custom").css({"height":"auto"}).show()
 })
 $("#f8").click(function(){
     $(".custom").css({"height":"0"}).hide()
 }) 
var url1 = localStorage.getItem("url");
var method = localStorage.getItem("method");
   // 文章内容,文章标题,发布日期,来源,作者,文章摘要,文章列表缩列图 1与正文图一致 2自定义,浏览数,文章浏览器标题,文章详情页关键词,文章详情页描述,选择图片的id,是否置顶  1是
   var data = sign(method);
   var appid = localStorage.getItem("appid");
   var appsercet = localStorage.getItem("appsercet");
   appsercet = JSON.parse(appsercet);
   appsercet = appsercet.data;
   var articleDetail,title,releaseTime,source,author,authorAbstract,recommended,upBrowse,browserTitle,detailsKeyWord,detailsDescribe,imgId,isUp
   //重置浏览数
   $(".resetNum").click(function(){
       $(".upBrowse").val("0");
   })
   
      var tt = $(".summernote").summernote("code");
      var sign1 = data.parameter;
      var timeStamp = data.timestamp;
 console.log(url1,method); 
  function updateMessage(method,id,url1){
      debugger
      var cateId,productId;
          var note = document.querySelector(".note-editable")
          articleDetail = tt;
          title = $(".title").val();
          releaseTime = $(".releaseTime").val();
          source = $(".source").val();
          author = $(".author").val();
          authorAbstract = $(".authorAbstract").text();
          var add1 = document.querySelectorAll(".add1");
          par = {}
          for (var i = 0; i < add1.length; i++) {
              var obj = add1[0];
              if (obj.checked = true) {
                  recommended = 1;
              } else {
                  recommended = 2;
              }
          }
          var formData = new FormData();
      if (method === "get.dxWeb.updateHelp" || method === "get.dxWeb.updateSkill" || method === "get.dxWeb.addHelp" || method === "get.dxWeb.addSkill") {
       var option = document.querySelectorAll(".changeSelect option");
          for (var i = 0; i < option.length; i++) {
              var obj = option[i];
              if (obj.checked = true) {
                  //获取对应产品一级栏目的data-id属性
                  cateId = obj.getAttribute("data-id");
                 
              }
          } 
          formData.append('cateId', cateId);  //添加其他参数   
      }
      if (method === "get.dxWeb.updateQAndA" || method === "get.dxWeb.addQAndA") {
       var option = document.querySelectorAll(".changeSelect option");
          for (var i = 0; i < option.length; i++) {
              var obj = option[i];
              if (obj.checked = true) {
                  //获取对应产品一级栏目的data-id属性
                  cateId = obj.getAttribute("data-id");
                
              }
          }   
          formData.append('cateId', cateId);  //添加其他参数
          var option = document.querySelectorAll(".changeSelectTwo option");
          for (var i = 0; i < option.length; i++) {
              var obj = option[i];
              if (obj.checked = true) {
                  //获取对应产品一级栏目的data-id属性
                  productId = obj.getAttribute("data-id");
                  
              }
          }  


          formData.append('productId', productId);  //添加其他参数
       
      }
          upBrowse = $(".upBrowse").val();
          browserTitle = $(".browserTitle").val();
          detailsKeyWord = $(".detailsKeyWord").text();
          detailsDescribe = $(".detailsDescribe").text();
          formData.append('appid', appid);  //添加其他参数
          formData.append('sign', sign1);  //添加其他参数
          formData.append('timestamp', timeStamp);  //添加其他参数
          formData.append('articleDetail', note.innerHTML);  //添加其他参数
          formData.append('title', title);  //添加其他参数
          formData.append('releaseTime', releaseTime);  //添加其他参数
          formData.append('source', source);  //添加其他参数
          formData.append('author', author);  //添加其他参数
          formData.append('appsercet', appsercet);  //添加其他参数
          formData.append('method', method);  //添加其他参数
          formData.append('authorAbstract', authorAbstract);  //添加其他参数
          formData.append('recommended', recommended);  //添加其他参数
          formData.append('upBrowse', upBrowse);  //添加其他参数
          formData.append('browserTitle', browserTitle);  //添加其他参数
          formData.append('detailsKeyWord', detailsKeyWord);  //添加其他参数
          if(id == "" || id == null){
              
          }else{
           formData.append('articleId', id);  //添加其他参数  
          }
          var url = src + url1; 
          console.log(url)
             
          var data = post(url, formData);

          console.log(data);
    

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
          $(".releaseTime").val(detail.msg.release_time);
          $(".source").val(detail.msg.source);
          $(".author").val(detail.msg.author);
          $(".authorAbstract").text(detail.msg.author_abstract);
          var add1 = document.querySelectorAll(".add1");
          for (var i = 0; i < add1.length; i++) {
              var obj = add1[0];
              if (obj.value == detail.msg.recommended) {
                  obj.checked = true;
              }
          }
          $(".upBrowse").val(detail.msg.up_browse);
          $(".browserTitle").val(detail.msg.browser_title);
          $(".detailsKeyWord").text(detail.msg.details_key_word);
          $(".detailsDescribe").text(detail.msg.details_describe);
      }
      //判断如果是查看的清空不允许进行修改
      if(method === "get.dxWeb.helpDetails" || method === "get.dxWeb.skillDetails" || method === "get.dxWeb.qAndADetails"){
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
}else if(method === "get.dxWeb.addSkill"){
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
}else if(method === "get.dxWeb.addQAndA"){
   debugger
   $(".changeFlex").removeClass("column");
   $(".show1").show();
   $(".show2").show();
   $(".changeTitle").text("问题描述");
   $(".changeTitle1").text("对应产品");
   var id = "";
  
   url = src + url1;
   par="appsercet="+appsercet+"&method=get.dxWeb.cateAllList";
   
   var data = getSign(url,par);
   if (data.dxWebList) {
       $(".changeSelect").html("");
          if (data.dxWebList.length > 0) {
              var str = "";
              str+="<option value='0' selected data-id='0'>请选择</option>";
              $.each(data.dxWebList, function (i, obj) {
                  str += "<option data-id='" + obj.cate_id + "'>" + obj.product_name + "</option>"
              })
              $(".changeSelect").html(str);
          }
      }
   $(".changeSelect").change(function(){
       var productId
       var option = document.querySelectorAll(".changeSelect option");
       for(var i = 0;i<option.length;i++){
           var obj = option[i];
           if(obj.checked = true){
               debugger
               //获取对应产品一级栏目的data-id属性
               productId = obj.getAttribute("data-id");
               
           }
       } 
       par = "appsercet=" + appsercet + "&method=get.dxWeb.cateTwoAllList&productId=" + productId;

       var data1 = getSign(url, par);
       question(data1);
   })
   par="appsercet="+appsercet+"&method=get.dxWeb.cateAllList";
   var data = getSign(url,par);
   
   console.log(data);
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
              str+="<option value='0' selected data-id='0'>请选择</option>";
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
                str+="<option value='0' selected>请选择</option>";
                $.each(data.dxWebList, function (i, obj) {
                    str += "<option data-id='" + obj.cate_id + "'>" + obj.product_name + "</option>"
                })
                $(".changeSelectTwo").html(str);
            }
        }

    }  
}); 