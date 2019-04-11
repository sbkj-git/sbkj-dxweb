$.myvali({
    myform:".form-horizontal",								//表单id
    mybtn:".btn",									//提交表单按钮id	
    myVali:".form-group",									//input父盒子的class，可自定义类名

    Required:".companyName",							//验证必填选项，值为Required,input自己加class
    RequiredTps:["不能为空!!!"],					//只验证不为空提示
    Required:".companyUrl",							//验证必填选项，值为Required,input自己加class
    RequiredTps:["不能为空!!!"],
    Requireds:".Requireds",							//验证必填不同提示，值为Requireds,input自己加class
    reqtps:".reqtps",								//验证不为空不同提示,input父盒子的class,可自定义类名
    Reqlength:[[2,4]],								//只验证不为空,设置最小长度和最大长度
    ReqlengthTps:["+不为空1"],						//验证不为空长度提示
    RequiredsTps:["这是自定义提示1"],				//默认提示

    myNuber:".nub",									//数字验证
    myNuberlength:[5,10],							//数字长度
    myNameNuber:"QQ",								//数字提示

    chinese:".chinese",								//中文验证id
    chinesetps:{								
        minLength:2,								//最小长度
        maxLength:4,								//最大长度
        tps:"姓名",									//提示
    },

    myName:".uersname",								//用户名id或class
    // nameIsServer:true,							//用户名是否要与数据库验证，true为是，默认false为否
    // nameIsServerUrl:["1.php"],					//用户名与数据库验证的路径。
    // nameIsServerType:"post",						//用户名以什么方式提交
    // nameIsServerDType:"json",						//用户名以什么格式提交
    
    myPassword:".pasw",								//密码id或class
    // myPasswordMinLength:6,						//密码最小长度，不写默认长度6
    // myPasswordMaxLength:16,						//密码最大长度，不写默认长度16
    myConfirmPassword:".pasws",						//确认密码id或class

    myPhone:".phone",								//手机号id或class
    // phoneIsServer:true,							//手机号是否与数据库验证，true为是，默认false为否
    // phoneIsServerUrl:["1.php"],					//手机号与数据库验证的路径
    // phoneIsServerType:"post",					//以什么方式提交
    // phoneIsServerDType:"json",					//以什么格式提交

    isPhoneCode:true,								//开启手机短信验证，true开启，默认false不开启(此项功能与myPhone配合验证)
    phoneCodeBtn:".codebtn",						//发送手机验证码id或class（按钮）
    count:30,										//发送短信验证码倒计时，默认60s（按钮）
    codeBtnCol1:["rgb(150, 150, 150)"],				//短信验证码倒计时（按钮，通过验证前）颜色
    codeBtnCol2:["#333"],							//短信验证码倒计时（按钮，通过验证后）颜色
    // isPhoneCodeUrl:["1.php"],					//发送手机验证码与数据库验证的路径（按钮）
    // isPhoneCodeType:"post",						//以什么方式提交（按钮）
    // isPhoneCodeDType:"json",						//以什么格式提交（按钮）
    
    myPhone1:"#v",									//修改手机号(原手机号用这个验证)id或class
    // phoneIsServer1:false,						//手机号是否与数据库验证，true为是，默认false为否
    // phoneIsServerUrl1:["1.php"],					//手机号与数据库验证的路径
    // phoneIsServerType1:"post",					//以什么方式提交
    // phoneIsServerDType1:"json",					//以什么格式提交

    phoneCodeInput:".phcode",						//短信验证码id或class（输入框）
    // phoneCodeInputUrl:["1.php"],					//短信验证码与数据库验证的路径（输入框）
    // phoneCodeInputType:"post",					//以什么方式提交（输入框）
    // phoneCodeInputDType:"json",					//以什么格式提交（输入框）
    
    myMailbox:".eal",								//邮箱id或class
    // mailboxIsServer:false,						//邮箱是否要与数据库验证，默认false为否
    // mailboxIsServerUrl:["1.php"],				//邮箱与数据库验证的路径
    // mailboxIsServerType:"post",					//以什么方式提交
    // mailboxIsServerDType:"json",					//以什么格式提交

    myCard:".cid",									//身份证验证id或class

    // myCode:"#v",									//验证码id或class
    // CodeIsServerUrl:["1.php"],					//验证码与数据库验证的路径
    // CodeIsServerType:"post",						//以什么方式提交
    // CodeIsServerDType:"json",					//以什么格式提交

    // PwdStrong:true,								//密码强度验证，默认false不开启，true开启
    // isStrongTps:["弱","中","强"],				//密码强度提示，可自定义提示
        
    // myNameMinLength:3,							//用户名最小长度，不写默认长度3
    // myNameMaxLength:12,							//用户名最大长度，不写默认长度12
    
    // myNameMinLength2:3,							//昵称最小长度，不写默认长度3
    // myNameMaxLength2:12,							//昵称最大长度，不写默认长度12

    // corrCol:"#4E7504",							//设置正确提示文字的颜色，不设置默认绿色
    // errCol:"red",								//设置错误提示文字的颜色，不设置默认红色
})