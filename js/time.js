//判断当前选择时间是否小于是当前实际时间
function contrastTime(start) {
	var evalue = document.getElementById(start).value;
	var dB = new Date(evalue.replace(/-/g, "/"));//获取当前选择日期
	var d = new Date();
	var str = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();//获取当前实际日期
	if (Date.parse(str) > Date.parse(dB)) {//时间戳对比
	       return 1;
	} 
	return 0;
}