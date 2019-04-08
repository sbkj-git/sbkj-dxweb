//封装post请求获取签名
function postFormdata(method) {
    var data = sign(method);
    var formData = new FormData();
    var appid = localStorage.getItem("appid");
    var appsercet = localStorage.getItem("appsercet");
    appsercet = JSON.parse(appsercet);
    appsercet = appsercet.data;
    formData.append("appid", appid);
    formData.append("appsercet", appsercet);
    console.log(data)
    var sign1 = data.parameter;
    var timeStamp = data.timestamp;
    formData.append("method", method);
    formData.append("sign", sign1);
    formData.append("timestamp", timeStamp);
    return formData;
}