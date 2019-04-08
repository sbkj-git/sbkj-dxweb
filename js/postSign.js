
/**
 * post请求算签名
 * method  方法名
 **/
function sign(method){ 
    
    var result = {}
   //method 方法名
   
    if(method){
        var appsercet = window.localStorage.getItem("appsercet");
        appsercet = JSON.parse(appsercet);
        appsercet = appsercet.data;
        var appid="dxwebf0a37ed1ae96deef";
        var accessKey="eU5cO72vwSW3avZdaHpWpKJdT5iEubXu";
        var timestamp = Date.parse(new Date());   
    //md5讲参数加密 进行字母排序
    var sgindata ='method='+method+'&appid='+appid+'&timestamp='+timestamp+'&accessKey='+accessKey+"&appsercet="+appsercet;
   console.log(sgindata);
    var datatwo = sgindata.split('&');
    var sign=md5(datatwo.sort().join("&"));
    //md5字符串全都转换大写
    var parameter=sign.toUpperCase();
    //转换数组
    var parameter1 = parameter.split('');
    //进行排序
    var arrstr=parameter1.sort();
    //利用数组的join()方法转换为字符串 
    var str=arrstr.join("");
    result =  {"parameter":str,
            "timestamp":timestamp};
    }
    return result
}
