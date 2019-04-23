

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
var zt = "http://console.online.caih.com/middle/"



 //判断是否选中了值
function judgeChoose() {
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
// 安全问题校验

// 点击事件
//页面初次渲染加载数据
$(".btn1").each(function (index) {
    $(this).click(function () {
        setTimeout(function () {
            $(".btn1").removeClass("btn-primary").eq(index).addClass("btn-primary");
        }, 500);
        setTimeout(function () {
            $(".btn1").removeClass("btn-primary")
        }, 1000);
    })
    $(this).hover(function () { 
        $(".btn1").removeClass("btn-primary").eq(index).addClass("btn-primary");
    })
    $(this).mouseleave(function () {
        $(".btn1").removeClass("btn-primary");
    })
})

//取消按钮点击
$(".roleRefuse5").click(function(){
    $(".nv91-mask").hide();
})
$(".nv91-close").click(function(){
    $(".nv91-mask").hide();
})

