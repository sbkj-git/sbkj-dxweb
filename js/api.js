

var src = "http://47.105.116.237:8001/dongxin-network-admin/api";
// var src = "http://192.168.8.104:8082/dongxin-network-admin/api";
var noapi = "http://47.105.116.237:8001/dongxin-network-admin"
// var noapi = "http://192.168.8.108:8082/dongxin-network-admin"
var log = "http://47.105.116.237:8001/dongxin-network-admin/adminLoginInterface.dx"
// var log = "http://192.168.8.108:8082/dongxin-network-admin/adminLoginInterface.dx"
// 验证码
var yzm = "http://47.105.116.237:8001/dongxin-network-admin/atohCode.dx"
//中台接口
// var zt = "http://10.18.3.11:28080/middle/"
var zt = "console.online.caih.com/middle/"


 //判断是否选中了值
 function judgeChoose(){
    var IdList;
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
 return IdList;
}
//安全问题校验
// 地下重定向
// var appsercet = window.localStorage.getItem("appsercet");
// if(appsercet == "undefined" || appsercet == "" || appsercet == null){
//     location.href = noapi +"/dxzx/login1.html";
// }


