/**
 * get请求算签名
 * url  请求地址
 * par  参数
 **/
function getSign(url,par){ 
    debugger
    var result = "";  
    if(url && par){
        var appid="dxwebf0a37ed1ae96deef";
        var accessKey="eU5cO72vwSW3avZdaHpWpKJdT5iEubXu";
        var timestamp = Date.parse(new Date());   
    //md5讲参数加密 进行字母排序
    var par_sp = par+'&appid='+appid+'&timestamp='+timestamp;
    var sgindata=par_sp+'&accessKey='+accessKey;
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
    par_sp=par_sp+'&sign='+str;
    
    // document.write(str);
     $.ajax({               
            url: url+"?"+par_sp,
                type: 'GET',
                async:false,
                cache: false,
                contentType: false,
                processData: false,
                // dataType:"json",
                    success:function(data){
                        debugger
                        console.log(data);
                        data = JSON.parse(data)
                        console.log(data);
                        result = data;
                    }
                })
            }
            return result;
        }
/**
 * post请求算签名
 * url  请求地址
 * par  参数
 **/
function post(url,par){ 
    
    var result = "";
     if(par&&url){
        $.ajax({                  
            url: url,
            type: 'POST',
            async:false,
            cache: false,
            data:par,
            contentType: false,// 告诉jQuery不要去处理发送的数据
            processData: false,// 告诉jQuery不要去设置Content-Type请求头
            success:function(res){
                 
                       result =  res;
                       console.log(result);
                    }
                })
            }
     return result
     }
/**
 * get请求不算签名
 * url  请求地址
 * par  参数
 **/
function noSign(url,data12){ 
    
    var result = "";
     
     $.ajax({                  
        url: url,
        type: 'POST',
        data:data12,
            contentType:false,
            processData:false,
            success:function(res){
                
                       console.log(res);
                       var jsonData = JSON.stringify(res);
                       jsonData = JSON.parse(jsonData)
                       console.log(jsonData);
                       result = jsonData;
                    },
                    error:function(error){
                        console.log(error)
                    }
                })
           
     return result
     }
     