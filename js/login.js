//安全问题校验
// 地下重定向
var appsercet = window.localStorage.getItem("appsercet");
// appsercet = JSON.parse(appsercet);
// var newAppsercet = appsercet.data;
if(appsercet == "undefined" || appsercet == "" || appsercet == null){
    location.href = "../login1.html";
}