 //封装添加修改方法
 function addUpdate(method,id){
    var appsercet = window.localStorage.getItem("appsercet");
    appsercet = JSON.parse(appsercet);
    var newAppsercet = appsercet.data;
    var sourceId,brandName,url,result
    url = src+"/libraryInterface.dx";
    brandName = $(".filename").val();
    sourceId = $(".fileid option:checked").val();
    
    if(method === "get.dxWeb.updateFolder"){
        
        par = "appsercet="+newAppsercet+"&method="+method+"&id="+id+"&brandName="+brandName+"&sourceId="+sourceId;
    }else{
        debugger
        par = "appsercet="+newAppsercet+"&method="+method+"&brandName="+brandName+"&sourceId="+sourceId;
    }
    result = getSign(url,par);
    return result;
}