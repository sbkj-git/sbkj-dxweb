$(document).ready(function(){
    //多选框点击事件改变状态
  function changeState(el) {
      if (el.readOnly) el.checked=el.readOnly=false;
      else if (!el.checked) el.readOnly=el.indeterminate=true;
  }
    //获取密钥
  var appsercet = window.localStorage.getItem("appsercet");
  appsercet = JSON.parse(appsercet); 
  var newAppsercet = appsercet.data;
  //获取面包屑导航标题
  var title = window.localStorage.getItem("title");
  //获取现在是哪个节点下的url
  var src1 = window.localStorage.getItem("url");
   //渲染页面标题
  $(".title").html(title);
  // 定义请求URL
  url = src+"/adminInterface.dx";
  //定义方法、种类
  var src2,type;
  src2 = "get.dxWeb.querysetup";
  //因为type值不一样，根据方法名来判断传的type值。
  if(src1 === "get.dxWeb.websetup" || src1 === "get.dxWeb.qsetup"){
      type = 1;
      par="appsercet="+newAppsercet+"&method="+src2+"&type="+type            
     
  }
   if(src1 === "get.dxWeb.tesetup" || src1 === "get.dxWeb.helpsetup"){
      type = 2;
      par="appsercet="+newAppsercet+"&method="+src2+"&type="+type            
     
  }
  var data = getSign(url,par);
   //处理功能设计下页面初次渲染单选按钮选择 
   var browseRadio = document.querySelectorAll("input[name='f6']");
  
  if(data.msg.browse_state == 1){
      browseRadio[0].checked = true;
  }else{
      browseRadio[1].checked = true; 
  }
  var praiseRadio = document.querySelectorAll("input[name='f7']");
  
  if(data.msg.praise_state == 1){
      praiseRadio[0].checked = true;
  }else{
      praiseRadio[1].checked = true; 
  }
  //点击保存事件进行修改
  $(".saveBtn").click(function(){
      // 获取参数值
        var browse,praise
        browse = $("input[name='f6']:checked").val();
        praise = $("input[name='f7']:checked").val();
        console.log(browse,praise)
      
      par="appsercet="+newAppsercet+"&method="+src1+"&browse="+browse+"&praise="+praise;         
      var data = getSign(url,par);
      if(data.msg.code == "200"){
          alert("保存成功");
        // $(".prompt span").text("保存成功");
        // $(".nv91-mask").show();
        //    $(".nv").show();
        //    setTimeout(function(){
        //     $(".nv91-mask").hide();
        //    $(".nv").hide();
        //    },1000); 
    }
    })
})
    