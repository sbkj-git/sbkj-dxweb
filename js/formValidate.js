(function(my){my.extend({myvali:function(id){var myobj={myVali:".vali",Required:".Required",RequiredTps:["涓嶈兘涓虹┖!!!"],Requireds:".Requireds",reqtps:".reqtps",ReqlengthTps:[""],RequiredsTps:["涓嶈兘涓虹┖"],myNameMinLength:3,myNameMaxLength:8,myPasswordMinLength:6,myPasswordMaxLength:16,isServer:false,corrCol:["rgb(78, 117, 4)"],errCol:["red"],PwdStrong:false,isStrongTps:["寮�","涓�","寮�"],isServerType:"post",isServerDType:"json",count:60,isPhoneCodeType:"post",isPhoneCodeDType:"json",phoneCodeInputType:"post",phoneCodeInputDType:"json",phoneIsServerType:"post",phoneIsServerDType:"json",phoneIsServerType1:"post",phoneIsServerDType1:"json",CodeIsServerType:"post",CodeIsServerDType:"json",myPhone:"",myPhone1:"",isMyCode:false,myNameNuber:"鏁板瓧",};var mclass=$.extend({},myobj,id);var myVali=$(mclass.myVali),myform=$(mclass.myform),mybtn=$(mclass.mybtn);var p=$("<p style="+"font-size:12px;display:inline;vertical-align:top;"+"></p>");myform.find(myVali).append(p);var Required=$(mclass.Required),RequiredTps=$(mclass.RequiredTps),Requireds=$(mclass.Requireds),reqtps=$(mclass.reqtps),Reqlength=$(mclass.Reqlength),ReqlengthTps=$(mclass.ReqlengthTps),RequiredsTps=$(mclass.RequiredsTps),myname1=$(mclass.myName),myname2=$(mclass.myName2),myphone=$(mclass.myPhone),myphone1=$(mclass.myPhone1),myCard=$(mclass.myCard),isPhoneCode=$(Number(mclass.isPhoneCode)),phoneCodeBtn=$(mclass.phoneCodeBtn),count=$(mclass.count),codeBtnCol1=$(mclass.codeBtnCol1),codeBtnCol2=$(mclass.codeBtnCol2),isPhoneCodeUrl=$(mclass.isPhoneCodeUrl),isPhoneCodeType=$(mclass.isPhoneCodeType),isPhoneCodeDType=$(mclass.isPhoneCodeDType),phoneCodeInput=$(mclass.phoneCodeInput),phoneCodeInputUrl=$(mclass.phoneCodeInputUrl),phoneCodeInputType=$(mclass.phoneCodeInputType),phoneCodeInputDType=$(mclass.phoneCodeInputDType),mymailbox=$(mclass.myMailbox),myNuber=$(mclass.myNuber),myNuberlength=$(mclass.myNuberlength),myNameNuber=$(mclass.myNameNuber),chinese=$(mclass.chinese),chinesetps=$(mclass.chinesetps),mailboxIsServer=$(Number(mclass.mailboxIsServer)),mailboxIsServerUrl=$(mclass.mailboxIsServerUrl),mailboxIsServerType=$(mclass.mailboxIsServerType),mailboxIsServerDType=$(mclass.mailboxIsServerDType),mypassword=$(mclass.myPassword),mypasswords=$(mclass.myConfirmPassword),phoneIsServer=$(Number(mclass.phoneIsServer)),phoneIsServerUrl=$(mclass.phoneIsServerUrl),phoneIsServerType=$(mclass.phoneIsServerType),phoneIsServerDType=$(mclass.phoneIsServerDType),phoneIsServer1=$(Number(mclass.phoneIsServer1)),phoneIsServerUrl1=$(mclass.phoneIsServerUrl1),phoneIsServerType1=$(mclass.phoneIsServerType1),phoneIsServerDType1=$(mclass.phoneIsServerDType1),myCode=$(mclass.myCode),CodeIsServerUrl=$(mclass.CodeIsServerUrl),CodeIsServerType=$(mclass.CodeIsServerType),CodeIsServerDType=$(mclass.CodeIsServerDType),PwdStrong=$(Number(mclass.PwdStrong)),isStrongTps=$(mclass.isStrongTps),NameMinLength=$(mclass.myNameMinLength),NameMaxLength=$(mclass.myNameMaxLength),NameMinLength2=$(mclass.myNameMinLength2),NameMaxLength2=$(mclass.myNameMaxLength2),PasswordMinLength=$(mclass.myPasswordMinLength),PasswordMaxLength=$(mclass.myPasswordMaxLength),corrCol=$(mclass.corrCol),errCol=$(mclass.errCol),nameIsserver=$(Number(mclass.nameIsServer)),nameIsserverUrl=$(mclass.nameIsServerUrl),nameIsServerType=$(mclass.nameIsServerType),nameIsServerDType=$(mclass.nameIsServerDType),isMyCode=$(mclass.isMyCode),codeval=myform.find(phoneCodeBtn).val();if(chinesetps.length!=0){var chitps=chinesetps[0].tps||"涓枃",chiminLength=chinesetps[0].minLength||0,chimaxLength=chinesetps[0].maxLength||Infinity;}
var valiform={ismsgbtn:function(){var codeval1=myform.find(phoneCodeBtn).val();if(codeval1=="閲嶆柊鑾峰彇"||codeval1==codeval){myform.find(phoneCodeBtn).css("color",codeBtnCol2[0]).removeAttr("disabled");}else{myform.find(phoneCodeBtn).css("color",codeBtnCol1[0]).attr("disabled","disabled");}},vphone:function(){var strphone=/^1[3|4|5|7|8][0-9]{9}$/;if($(this).val()==""){$(this).siblings("p").html("璇疯緭鍏ユ墜鏈哄彿").removeAttr("class").css({"color":errCol[0]});}else if(!strphone.test($(this).val())){$(this).siblings("p").html("璇疯緭鍏�11浣嶆纭殑鎵嬫満鍙�").removeAttr("class").css({"color":errCol[0]});if(isPhoneCode[0]==1){if(isMyCode[0]==1){if(myCode.siblings("p").hasClass("correct")&&$(this).siblings("p").hasClass("correct")){valiform.ismsgbtn.apply(myphone);}else{myform.find(phoneCodeBtn).css("color",codeBtnCol1[0]).attr("disabled","disabled");}}else{if($(this).siblings("p").hasClass("correct")){valiform.ismsgbtn.apply(myphone);}else{myform.find(phoneCodeBtn).css("color",codeBtnCol1[0]).attr("disabled","disabled");}}}}else{if(phoneIsServer[0]==1){var $this=$(this),vl=$this.val();$.ajax({url:phoneIsServerUrl[0],type:phoneIsServerType.selector,dataType:phoneIsServerDType.selector,data:{phone:vl},success:function(data){if(data==1){$this.siblings("p").html("鎵嬫満鍙峰彲浠ユ敞鍐�").attr({"class":"correct"}).css({"color":corrCol[0]});if(isPhoneCode[0]==1){if(isMyCode[0]==1){if(myCode.siblings("p").hasClass("correct")){valiform.ismsgbtn.apply(myphone);}}else{if($this.siblings("p").hasClass("correct")){valiform.ismsgbtn.apply(myphone);}else{myform.find(phoneCodeBtn).css("color",codeBtnCol1[0]).attr("disabled","disabled");}}}}else{$this.siblings("p").html("鎵嬫満鍙峰凡琚敞鍐�").removeAttr("class").css({"color":errCol[0]});if(isPhoneCode[0]==1){myform.find(phoneCodeBtn).css("color",codeBtnCol1[0]).attr("disabled","disabled");}}},error:function(error){console.log(error);}});}else{$(this).siblings("p").html("鈭�").attr({"class":"correct"}).css({"color":corrCol[0]});if(isPhoneCode[0]==1){if(isMyCode[0]==1){if(myCode.siblings("p").hasClass("correct")){valiform.ismsgbtn.apply(myphone);}}else{if($(this).siblings("p").hasClass("correct")){valiform.ismsgbtn.apply(myphone);}else{myform.find(phoneCodeBtn).css("color",codeBtnCol1[0]).attr("disabled","disabled");}}}}}},vphone1:function(){var strphone=/^1[3|4|5|7|8][0-9]{9}$/;if($(this).val()==""){$(this).siblings("p").html("璇疯緭鍏ユ墜鏈哄彿").removeAttr("class").css({"color":errCol[0]});}else if(!strphone.test($(this).val())){$(this).siblings("p").html("璇疯緭鍏�11浣嶆纭殑鎵嬫満鍙�").removeAttr("class").css({"color":errCol[0]});if(isPhoneCode[0]==1){if(isMyCode[0]==1){if(myCode.siblings("p").hasClass("correct")&&$(this).siblings("p").hasClass("correct")){valiform.ismsgbtn.apply(myphone);}else{myform.find(phoneCodeBtn).css("color",codeBtnCol1[0]).attr("disabled","disabled");}}else{if($(this).siblings("p").hasClass("correct")){valiform.ismsgbtn.apply(myphone);}else{myform.find(phoneCodeBtn).css("color",codeBtnCol1[0]).attr("disabled","disabled");}}}}else{if(phoneIsServer1[0]==1){var $this=$(this);var vl=$this.val();$.ajax({url:phoneIsServerUrl1[0],type:phoneIsServerType1.selector,dataType:phoneIsServerDType1.selector,data:{phone1:vl},success:function(data){if(data==1){$this.siblings("p").html("鎵嬫満鍙峰彲浠ヤ娇鐢�").attr({"class":"correct"}).css({"color":corrCol[0]});if(isPhoneCode[0]==1){if(isMyCode[0]==1){if(myCode.siblings("p").hasClass("correct")){valiform.ismsgbtn.apply(myphone);}}else{if($this.siblings("p").hasClass("correct")){valiform.ismsgbtn.apply(myphone);}else{myform.find(phoneCodeBtn).css("color",codeBtnCol1[0]).attr("disabled","disabled");}}}}else{$this.siblings("p").html("鎵嬫満鍙峰凡琚娇鐢�").removeAttr("class").css({"color":errCol[0]});if(isPhoneCode[0]==1){myform.find(phoneCodeBtn).css("color",codeBtnCol1[0]).attr("disabled","disabled");}}},error:function(xml,error){console.log(error);}});}else{$(this).siblings("p").html("鈭�").attr({"class":"correct"}).css({"color":corrCol[0]});}}},pCode:function(){myform.find(phoneCodeBtn).css("color",codeBtnCol1[0]).attr("disabled","disabled");},msg:function(){var $this=$(this);var a=count[0];$this.val(a+"S");var ti;var b=true;if(b==true){b=false;clearTimeout(ti);ti=setInterval(yz,1000);myform.find(phoneCodeBtn).attr("disabled","true").css("color",codeBtnCol1[0]);}
function yz(){a--;if(a<0){a=0;$this.val("閲嶆柊鑾峰彇");b=true;myform.find(phoneCodeBtn).removeAttr("disabled").css("color",codeBtnCol2[0]);clearTimeout(ti);}else{$this.val(a+"S");}}
if(myphone.length==1){var vl=myphone.val();}else{var vl=myphone1.val();}
$.ajax({url:isPhoneCodeUrl[0],type:isPhoneCodeType.selector,dataType:isPhoneCodeDType.selector,data:{phone:vl},success:function(data){},error:function(err){console.log(err);}})},yzm:function(){var $this=$(this);if(isPhoneCode[0]==1){Tsval=$this.val().replace(/\s/g,'');if(Tsval==""){$this.siblings("p").removeAttr("class").css({"color":errCol[0]}).html("璇疯緭鍏ラ獙璇佺爜");}else{$this.siblings("p").attr({"class":"correct"}).html("");$.ajax({url:phoneCodeInputUrl[0],type:phoneCodeInputType.selector,dataType:phoneCodeInputDType.selector,data:{vcode:Tsval},success:function(data){if(data=="1"){$this.siblings("p").html("鈭�").attr({"class":"correct"}).css({"color":corrCol[0]});}else if(data=="0"){$this.siblings("p").html("楠岃瘉鐮侀敊璇�").removeAttr("class").css({"color":errCol[0]});}else if(data=="-1"){$this.siblings("p").html("楠岃瘉鐮佸凡杩囨湡").removeAttr("class").css({"color":errCol[0]});}},error:function(err){console.log(err);}})}}else{myform.find(phoneCodeInput).siblings("p").html("鈭�").attr({"class":"correct"}).css({"color":corrCol[0]});}},name1:function(){var Tsval=$(this).val();var Tsval=Tsval.replace(/\s/g,'');if(Tsval==""){$(this).siblings("p").removeAttr("class").css({"color":errCol[0]}).html("璇疯緭鍏ョ敤鎴峰悕");}else if(Tsval.length<NameMinLength[0]||Tsval.length>NameMaxLength[0]){$(this).siblings("p").removeAttr("class").css({"color":errCol[0]}).html("璇疯緭鍏�"+NameMinLength[0]+"鑷�"+NameMaxLength[0]+"浣嶅瓧绗︾殑鐢ㄦ埛鍚�");}else{if(nameIsserver[0]==1){var $this=$(this);var vl=Tsval;$.ajax({url:nameIsserverUrl[0],type:nameIsServerType.selector,dataType:nameIsServerDType.selector,data:{name:vl},success:function(data){if(data==1){$this.siblings("p").html("鐢ㄦ埛鍚嶅彲浠ユ敞鍐�").attr({"class":"correct"}).css({"color":corrCol[0]});}else{$this.siblings("p").html("鐢ㄦ埛鍚嶅凡琚敞鍐�").removeAttr("class").css({"color":errCol[0]});}},error:function(xml,error){console.log(error);}});}else{$(this).siblings("p").html("鈭�").attr({"class":"correct"}).css({"color":corrCol[0]});}}},password:function(){var Num=/^[0-9]+$/;var Num1=/^[a-zA-Z]+$/;var Num2=/^[\_\.]+$/;var NumEl=/^[0-9a-zA-Z]+$/;var NumEl1=/^[0-9\_\.]+$/;var NumEl2=/^[a-zA-Z\_\.]+$/;var NumElg=/^[0-9a-zA-Z\_\.]+$/;var Tsval=$(this).val().replace(/\s/g,'');if(Tsval==""){$(this).siblings("p").removeAttr("class").css({"color":errCol[0]}).html("璇疯緭鍏ュ瘑鐮�");}else if($(this).val().length<PasswordMinLength[0]||$(this).val().length>PasswordMaxLength[0]){$(this).siblings("p").removeAttr("class").css({"color":errCol[0]}).html("璇疯緭鍏�"+PasswordMinLength[0]+"鑷�"+PasswordMaxLength[0]+"浣嶅瓧绗︾殑瀵嗙爜");}else{if(PwdStrong[0]==1){if(Num.test($(this).val())||Num1.test($(this).val())||Num2.test($(this).val())){$(this).siblings("p").attr({"class":"correct"}).css({"color":corrCol[0]}).html(isStrongTps[0]);}else if(NumEl.test($(this).val())||NumEl1.test($(this).val())||NumEl2.test($(this).val())){$(this).siblings("p").attr({"class":"correct"}).css({"color":corrCol[0]}).html(isStrongTps[1]);}else if(NumElg.test($(this).val())){$(this).siblings("p").attr({"class":"correct"}).css({"color":corrCol[0]}).html(isStrongTps[2]);}else{$(this).siblings("p").removeAttr("class").css({"color":errCol[0]}).html("璇疯緭鍏ユ暟瀛楀瓧姣峗.缁勬垚鐨勫瘑鐮�");}}else{$(this).siblings("p").attr({"class":"correct"}).css({"color":corrCol[0]}).html("鈭�");}}
if($(this).val()!=mypasswords.val()&&mypasswords.val()!=""){mypasswords.siblings("p").removeAttr("class").css({"color":errCol[0]}).html("涓ゆ杈撳叆鐨勫瘑鐮佷笉涓€鑷�");}else if(mypasswords.val()==""){mypasswords.siblings("p").html("");}else{mypasswords.siblings("p").attr({"class":"correct"}).css({"color":corrCol[0]}).html("鈭�");}},passwords:function(){var Tsval=$(this).val().replace(/\s/g,'');if(Tsval==""){$(this).siblings("p").removeAttr("class").css({"color":errCol[0]}).html("璇峰啀娆¤緭鍏ュ瘑鐮�");}else if($(this).val()!=mypassword.val()){$(this).siblings("p").removeAttr("class").css({"color":errCol[0]}).html("涓ゆ杈撳叆鐨勫瘑鐮佷笉涓€鑷�");}else{$(this).siblings("p").attr({"class":"correct"}).css({"color":corrCol[0]}).html("鈭�");}},card:function(){var reg=/(^\d{15}$)|(^\d{17}([0-9]|X)$)/;var Tsval=$(this).val().replace(/\s/g,'');var caseval=Tsval.toUpperCase();if(caseval==""){$(this).siblings("p").removeAttr("class").css({"color":errCol[0]}).html("璇疯緭鍏ヨ韩浠借瘉");}else if(reg.test(caseval)){$(this).siblings("p").attr({"class":"correct"}).css({"color":corrCol[0]}).html("鈭�");}else{$(this).siblings("p").removeAttr("class").css({"color":errCol[0]}).html("韬唤璇佸彿鐮侀敊璇�");}},nuber:function(){var Tsval=$(this).val().replace(/\s/g,'');if(Tsval==""){$(this).siblings("p").removeAttr("class").css({"color":errCol[0]}).html("璇疯緭鍏�"+myNameNuber.selector);}else if(!Number(Tsval)){$(this).siblings("p").removeAttr("class").css({"color":errCol[0]}).html("璇疯緭鍏ユ暟瀛�");}else{if(Tsval.length<myNuberlength[0]||Tsval.length>myNuberlength[1]){$(this).siblings("p").removeAttr("class").css({"color":errCol[0]}).html("璇疯緭鍏�"+myNuberlength[0]+"鑷�"+myNuberlength[1]+"浣嶉暱搴︾殑"+myNameNuber.selector);}else{$(this).siblings("p").attr({"class":"correct"}).css({"color":corrCol[0]}).html("鈭�");}}},chines:function(){var Tsval=$(this).val().replace(/\s/g,''),chi=/^[\u4E00-\u9FA5]+$/;if(Tsval==""){$(this).siblings("p").removeAttr("class").css({"color":errCol[0]}).html("璇疯緭鍏�"+chitps);}else if(!chi.test(Tsval)){$(this).siblings("p").removeAttr("class").css({"color":errCol[0]}).html("璇疯緭鍏ヤ腑鏂�");}else{if(Tsval.length<chiminLength||Tsval.length>chimaxLength){$(this).siblings("p").removeAttr("class").css({"color":errCol[0]}).html("璇疯緭鍏�"+chiminLength+"鑷�"+chimaxLength+"浣嶉暱搴︾殑"+chitps);}else{$(this).siblings("p").attr({"class":"correct"}).css({"color":corrCol[0]}).html("鈭�");}}},Reqd:function(){var Tsval=$(this).val().replace(/\s/g,'');if(Tsval==""){$(this).siblings("p").removeAttr("class").css({"color":errCol[0]}).html(RequiredTps[0]);return false;}else if($(this).siblings("p").html()==""){$(this).siblings("p").html("鈭�").attr({"class":"correct"}).css({"color":corrCol[0]});}else{$(this).siblings("p").html("鈭�").attr({"class":"correct"}).css({"color":corrCol[0]});}},Reqds:function(){var Tsval=$(this).val().replace(/\s/g,'');if(Tsval==""){$(this).siblings("p").removeAttr("class").css({"color":errCol[0]}).html(RequiredsTps[reqtps.index($(this).parent())]);}else if(Reqlength.length!=0){for(var i=0;i<Reqlength.length;i++){if(Reqlength[i]!=""){if(Tsval.length>=Reqlength[reqtps.index($(this).parent())][0]&&Tsval.length<=Reqlength[reqtps.index($(this).parent())][1]){$(this).siblings("p").html("鈭�").attr({"class":"correct"}).css({"color":corrCol[0]});}else if(Tsval.length<Reqlength[reqtps.index($(this).parent())][0]||Tsval.length>Reqlength[reqtps.index($(this).parent())][1]){$(this).siblings("p").removeAttr("class").css({"color":errCol[0]}).html("璇疯緭鍏�"+Reqlength[reqtps.index($(this).parent())][0]+"鑷�"+Reqlength[reqtps.index($(this).parent())][1]+"浣嶅瓧绗�"+ReqlengthTps[reqtps.index($(this).parent())]);}}else{$(this).siblings("p").html("鈭�").attr({"class":"correct"}).css({"color":corrCol[0]});}}}else{$(this).siblings("p").html("鈭�").attr({"class":"correct"}).css({"color":corrCol[0]});}},mailbox:function(){var strmailbox=/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;if($(this).val()==""){$(this).siblings("p").removeAttr("class").css({"color":errCol[0]}).html("璇疯緭鍏ラ偖绠卞彿");}else if(!strmailbox.test($(this).val())){$(this).siblings("p").removeAttr("class").css({"color":errCol[0]}).html("璇疯緭鍏ユ纭殑閭鍙�");}else{if(mailboxIsServer[0]==1){var $this=$(this);var vl=$this.val();$.ajax({url:mailboxIsServerUrl[0],type:mailboxIsServerType.selector,dataType:mailboxIsServerDType.selector,data:{mailbox:vl},success:function(data){if(data==1){$this.siblings("p").html("閭鍙互娉ㄥ唽").attr({"class":"correct"}).css({"color":corrCol[0]});myform.find(phoneCodeBtn).css("color",codeBtnCol2.selector).removeAttr("disabled");}else{$this.siblings("p").html("閭宸茶娉ㄥ唽").removeAttr("class").css({"color":errCol[0]});myform.find(phoneCodeBtn).css("color",codeBtnCol1.selector).attr("disabled","disabled");}},error:function(error){console.log(error);}});}else{$(this).siblings("p").attr({"class":"correct"}).css({"color":corrCol[0]}).html("鈭�");}}},codes:function(){var $this=$(this),Tsval=$this.val().replace(/\s/g,"");if(Tsval==""){$(this).siblings("p").removeAttr("class").css({"color":errCol[0]}).html("璇疯緭鍏ラ獙璇佺爜");if(isPhoneCode[0]==1){if(isMyCode[0]==1){if(myCode.siblings("p").hasClass("correct")&&$(this).siblings("p").hasClass("correct")){valiform.ismsgbtn.apply(myphone);}else{myform.find(phoneCodeBtn).css("color",codeBtnCol1[0]).attr("disabled","disabled");}}}}else{if(isMyCode[0]==1){$.ajax({url:CodeIsServerUrl[0],type:CodeIsServerType.selector,dataType:CodeIsServerDType.selector,data:{codes:Tsval},success:function(data){if(data=="1"){$this.siblings("p").attr({"class":"correct"}).css({"color":corrCol[0]}).html("鈭�");var codeval1=myform.find(phoneCodeBtn).val();if(myphone.siblings("p").hasClass("correct")){valiform.ismsgbtn.apply(myCode)}else{myform.find(phoneCodeBtn).css("color",codeBtnCol1[0]).attr("disabled","disabled");}}else{$this.siblings("p").removeAttr("class").css({"color":errCol[0]}).html("楠岃瘉鐮侀敊璇�");if(isPhoneCode[0]==1){myform.find(phoneCodeBtn).css("color",codeBtnCol1[0]).attr("disabled","disabled");}}},error:function(error){console.log(error)}});}else{$.ajax({url:CodeIsServerUrl[0],type:CodeIsServerType.selector,dataType:CodeIsServerDType.selector,data:{codes:Tsval},success:function(data){if(data=="1"){$this.siblings("p").attr({"class":"correct"}).css({"color":corrCol[0]}).html("鈭�");}else{$this.siblings("p").removeAttr("class").css({"color":errCol[0]}).html("楠岃瘉鐮侀敊璇�");}},error:function(error){console.log(error);}});}}},vform:function(){if(myform.find(Required).length>=1){for(var i=0;i<myform.find(Required).length;i++){if(myform.find(Required).eq(i).val()==""){myform.find(Required).eq(i).siblings("p").removeAttr("class").css({"color":errCol[0]}).html(RequiredTps[0]);}else{myform.find(Required).eq(i).siblings("p").html("鈭�").attr({"class":"correct"}).css({"color":corrCol[0]});}}}
if(myform.find(Requireds).length>=1){for(var j=0;j<myform.find(Requireds).length;j++){if(myform.find(Requireds).eq(j).val()==""){myform.find(Requireds).eq(j).siblings("p").removeAttr("class").css({"color":errCol[0]}).html(RequiredsTps[j]);}else{myform.find(Requireds).eq(j).siblings("p").html("鈭�").attr({"class":"correct"}).css({"color":corrCol[0]});}}}
if(myname1.val()==""){myname1.siblings("p").removeAttr("class").css({"color":errCol[0]}).html("璇疯緭鍏ョ敤鎴峰悕");}else if(myname1.siblings("p").html()==""){valiform.name1.apply(myname1);}
if(myphone.val()==""){myphone.siblings("p").removeAttr("class").css({"color":errCol[0]}).html("璇疯緭鍏ユ墜鏈哄彿");}else if(myphone.siblings("p").html()==""){valiform.vphone.apply(myphone);}
if(myphone1.val()==""){myphone1.siblings("p").removeAttr("class").css({"color":errCol[0]}).html("璇疯緭鍏ユ墜鏈哄彿");}else if(myphone1.siblings("p").html()==""){valiform.vphone.apply(myphone1);}
if(isPhoneCode[0]==1){if(phoneCodeInput.val()==""){phoneCodeInput.siblings("p").removeAttr("class").css({"color":errCol[0]}).html("璇疯緭鍏ラ獙璇佺爜");}else if(phoneCodeInput.siblings("p").html()==""){valiform.yzm.apply(phoneCodeInput);}}
if(mymailbox.val()==""){mymailbox.siblings("p").removeAttr("class").css({"color":errCol[0]}).html("璇疯緭鍏ラ偖绠卞彿");}else if(mymailbox.siblings("p").html()==""){valiform.mailbox.apply(mymailbox);}
if(myCard.val()==""){myCard.siblings("p").removeAttr("class").css({"color":errCol[0]}).html("璇疯緭鍏ヨ韩浠借瘉");}else if(myCard.siblings("p").html()==""){valiform.card.apply(myCard);}
if(myNuber.val()==""){myNuber.siblings("p").removeAttr("class").css({"color":errCol[0]}).html("璇疯緭鍏�"+myNameNuber.selector);}else if(myNuber.siblings("p").html()==""){valiform.nuber.apply(myNuber);}
if(chinese.val()==""){chinese.siblings("p").removeAttr("class").css({"color":errCol[0]}).html("璇疯緭鍏�"+chitps);}else if(chinese.siblings("p").html()==""){valiform.chines.apply(chinese);}
if(mypassword.val()==""){mypassword.siblings("p").removeAttr("class").css({"color":errCol[0]}).html("璇疯緭鍏ュ瘑鐮�");}else if(mypassword.siblings("p").html()==""){valiform.password.apply(mypassword);}
if(mypasswords.val()==""){mypasswords.siblings("p").removeAttr("class").css({"color":errCol[0]}).html("璇峰啀娆¤緭鍏ュ瘑鐮�");}else if(mypasswords.siblings("p").html()==""){valiform.passwords.apply(mypasswords);}
if(myCode.val()==""){myCode.siblings("p").removeAttr("class").css({"color":errCol[0]}).html("璇疯緭鍏ラ獙璇佺爜");}else if(myCode.siblings("p").html()==""){valiform.codes.apply(myCode);}}};Required.on("blur keyup",function(){valiform.Reqd.apply($(this));});Requireds.on("blur keyup change",function(){valiform.Reqds.apply($(this));});myname1.on("blur keyup",function(){valiform.name1.apply($(this));});myphone1.on("blur keyup",function(){valiform.vphone1.apply($(this));});myphone.on("blur keyup",function(){valiform.vphone.apply($(this));});phoneCodeBtn.on("click",function(){valiform.msg.apply($(this));});phoneCodeInput.on("blur keyup",function(){valiform.yzm.apply(phoneCodeInput);});if(isPhoneCode[0]==1){myform.find(phoneCodeBtn).css("color",codeBtnCol1[0]).attr("disabled","true");}else{phoneCodeBtn.off("click");phoneCodeInput.off("blur keyup");};mymailbox.on("blur keyup",function(){valiform.mailbox.apply($(this));});myCard.on("blur keyup",function(){valiform.card.apply($(this));});myNuber.on("blur keyup",function(){valiform.nuber.apply($(this));})
chinese.on("blur keyup",function(){valiform.chines.apply($(this));})
mypassword.on("blur keyup",function(){valiform.password.apply($(this));});mypasswords.on("blur keyup",function(){valiform.passwords.apply($(this));});myCode.on("blur keyup",function(){valiform.codes.apply($(this));});myform.on("click",mybtn,function(){myform.submit(function(){valiform.vform.apply(myform);var cunt=0;for(var i=0;i<myform.find(myVali).length;i++){if(myform.find(myVali).eq(i).children("p").attr("class")=="correct"||myform.find(myVali).eq(i).children("p").html()==""){cunt++;}}
if(cunt!=myform.find(myVali).length){return false;}});myform.off("click");})}})})($)