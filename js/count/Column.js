var url = src + "/dxVisitInterface.dx";
var appsercet = window.localStorage.getItem("appsercet");
appsercet = JSON.parse(appsercet);
var newAppsercet = appsercet.data;
debugger;

//获取页面参数
var htmlTitle = window.localStorage.getItem("title");

var par = null;

if (htmlTitle == "栏目统计") {
// 栏目统计
    par = "appsercet=" + newAppsercet + "&method=get.dxWeb.columnStatistics";
} else if (htmlTitle == "帮助文档统计") {
    // 帮助文档统计
    par = "appsercet=" + newAppsercet + "&method=get.dxWeb.helpStatistics";
} else if (htmlTitle == "文章统计") {
    // 文章统计
    par = "appsercet=" + newAppsercet + "&method=get.dxWeb.articleSurvey";
}

var data = getSign(url, par);
console.log(data);

// 分页
function pageColumnStatistics(currentPage) {
    par+="&currentPage=" + currentPage;
    var data = getSign(url, par);
    console.log(data);
}

// 查看某一篇文章pv
function queryTextById(id){
    par+="&id=" + id;
    var data = getSign(url, par);
    console.log(data);
}

//  http://47.105.116.237:8001/dongxin-network-admin/api/dxVisitInterface.dx?appsercet=3789DF5761C85923228CF922C941B14C48B8955CCF728FBFC498ACE34986FCEBC1D6F2A5083471F9ED2644A2C969AA66E14E3181E060B6F42D68CE10F79981C8A64FF609F01B1E1B&method=get.dxWeb.webSurvey&sign=0123344556778899BBBCCCCDEEFFFFFF&appid=dxwebf0a37ed1ae96deef