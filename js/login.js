// 地下重定向
var appsercet = window.localStorage.getItem("appsercet");
if(appsercet == "undefined" || appsercet == "" || appsercet == null){
    location.href = noapi +"/dxzx/login.html";
}