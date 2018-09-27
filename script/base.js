String.prototype.post=function(str,fun) {  
  var xmlHttp=null; 
  try { // Firefox, Opera 8.0+, Safari 
   xmlHttp=new XMLHttpRequest();
  }catch (e) { // Internet Explorer 
    try { 
    xmlHttp=new ActiveXObject("Msxml2.XMLHTTP"); 
    }catch (e) { 
      xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
      } 
    } 
  if (xmlHttp==null) { 
      alert ("您的浏览器不支持AJAX！"); 
       return; 
  }
  xmlHttp.onreadystatechange=function(){
    if(xmlHttp.readyState==4) { 
     fun(xmlHttp.responseText)
    }
  }
  xmlHttp.open("POST",this,true); 
  xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  xmlHttp.send(str); 
  //xmlHttp=null;
  }

String.prototype.get=function(fun) {  
  var xmlHttp=null; 
  try { // Firefox, Opera 8.0+, Safari 
   xmlHttp=new XMLHttpRequest();
  }catch (e) { // Internet Explorer 
    try { 
    xmlHttp=new ActiveXObject("Msxml2.XMLHTTP"); 
    }catch (e) { 
      xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
      } 
    } 
  if (xmlHttp==null) { 
      alert ("您的浏览器不支持AJAX！"); 
       return; 
  }
  xmlHttp.timeout=10000;
  xmlHttp.onreadystatechange=function(){
    if(xmlHttp.readyState==4) { 
     fun(xmlHttp.responseText)
    }
  }
  xmlHttp.ontimeout = function(e) {
    alert("close");
    xmlHttp.abort();
  };
  xmlHttp.open("GET",this,true); 
  xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  xmlHttp.send(); 
  //xmlHttp=null;
  }
  	
 post=function(path,str,fun) {  
  var xmlHttp=null; 
  try { // Firefox, Opera 8.0+, Safari 
   xmlHttp=new XMLHttpRequest();
  }catch (e) { // Internet Explorer 
    try { 
    xmlHttp=new ActiveXObject("Msxml2.XMLHTTP"); 
    }catch (e) { 
      xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
      } 
    } 
  if (xmlHttp==null) { 
      alert ("您的浏览器不支持AJAX！"); 
       return; 
  }
  xmlHttp.onreadystatechange=function(){
    if(xmlHttp.readyState==4) { 
     fun(xmlHttp.responseText)
    }
  }
  xmlHttp.open("POST",path,true); 
  xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  xmlHttp.send(str); 
  //xmlHttp=null;
  }

get=function(path,fun,timeOutFun) {  
  var xmlHttp=null; 
  try { // Firefox, Opera 8.0+, Safari 
   xmlHttp=new XMLHttpRequest();
  }catch (e) { // Internet Explorer 
    try { 
    xmlHttp=new ActiveXObject("Msxml2.XMLHTTP"); 
    }catch (e) { 
      xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
      } 
    } 
  if (xmlHttp==null) { 
      alert ("您的浏览器不支持AJAX！"); 
       return; 
  }
  xmlHttp.timeout=10000;
  xmlHttp.onreadystatechange=function(){
    if(xmlHttp.readyState==4) { 
     fun(xmlHttp.responseText);
     //xmlHttp=null;
    }
  }
  xmlHttp.ontimeout = function(e) {
    if(timeOutFun){
      timeOutFun();
    }else{
      alert("超时");
    }
    xmlHttp.abort();
  };
  xmlHttp.open("GET",path,true); 
  xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  xmlHttp.send(); 
  //xmlHttp=null;
  }

String.prototype.getFullUrl=function(url1){
   var re="";
   var url=url1.match(/(http[s]?:\/\/[^\/]*?)\//);
   var path=url1.match(/http[s]?:.*\//);
   if(url)
   {
    var root_url=url[1];
   }else{
      url=url1.match(/(http:\/\/[^\/]*?)\//);
   }
   
   var url2=this.replace(/ /g,'');
   switch(url2.slice(0,1)){
       case "/":
         re=root_url+url2;
         break;
       case ".":
         re=url1+url2;
         break;
       default :
         if(url2.slice(0,4)=="http"){
           re=url2;
         }else{re=path+url2;}
   }
   return re;
}

String.prototype.getBaseUrl=function(){
    return this.match(/(https?:\/\/[^\/]*?)\//)[1];
}

String.prototype.matches=function(reg){
    var reg=eval("("+reg+")");
    var str=this;
    var re=[];
    do
    {
      var r=reg.exec(str);
      if(r){
          r.shift()
          re[re.length]=r;
      }
    }
    while (r!=null) 
    return re;
}
String.prototype.toIndex=function(){
	var num=this.match(/第(.*?)章/);
	if(num){
		var num=num[1].toNum();
	}else{num=0;}
	return num;
}
String.prototype.toNum=function(){
    var num=parseInt(this);
    var to_num=function(str){
        switch(str){
            case "零":return 0;break;
            case "一":return 1;break;
            case "二":return 2;break;
            case "三":return 3;break;
            case "四":return 4;break;
            case "五": return 5;break;
            case "六":return 6;break;
            case "七":return 7;break;
            case "八":return 8;break;
            case "九":return 9;break;
            default :return 0;
        }
    }
    if(num>=0){return num;}
    var num=0;
    var str=this;
    str=str.replace("零","");
    if(str.match("千")){
        var _str=str.split("千");
        num=num+to_num(_str[0])*1000;
        str=_str[1];
    }
    if(str.match("百")){
        var _str=str.split("百");
        num=num+to_num(_str[0])*100;
        str=_str[1];
    }
    if(str.match("十")){
        var _str=str.split("十");
        num=num+to_num(_str[0])*10;
        str=_str[1];
    }
        num=num+to_num(str);
        return num;
}

Array.prototype.add=function(i,arr){
    var a=this
    return a.slice(0,i).concat(arr,a.slice(i));
}
Array.prototype.del=function(i){
  var arr1=this.slice(0,i)
  var arr2=this.slice(i)
  arr2.shift();
  return arr1.concat(arr2);
}
ajaxWorker=function(arr,fun){
    var worker =new Worker("script/ajaxWorker.js"); 
    worker.onmessage =function (e){
        var data=e.data;
        fun(data)
     }
     worker.onerror=function(e){
            alert("这是异常是：\nfilename:" + e.filename + "\nlin:"+ e.lineno + "\nmessage:" + e.message); 
   }
     worker.postMessage(arr); 
}

get_js=function(js){
  post(js,"",function(a){
    eval(a);
  });
}


//两个字符串的相似程度，并返回相差字符个数
strSimilarity2Number=function(s, t){
	var n = s.length, m = t.length, d=[];
	var i, j, s_i, t_j, cost;
	if (n == 0) return m;
	if (m == 0) return n;
	for (i = 0; i <= n; i++) {
		d[i]=[];
		d[i][0] = i;
	}
	for(j = 0; j <= m; j++) {
		d[0][j] = j;
	}
	for (i = 1; i <= n; i++) {
		s_i = s.charAt (i - 1);
		for (j = 1; j <= m; j++) {
			t_j = t.charAt (j - 1);
			if (s_i == t_j) {
				cost = 0;
			}else{
				cost = 1;
			}
		d[i][j] = Minimum (d[i-1][j]+1, d[i][j-1]+1, d[i-1][j-1] + cost);
		}
	}
	return d[n][m];
}
//两个字符串的相似程度，并返回相似度百分比
strSimilarity2Percent=function(s, t){
	var l = s.length > t.length ? s.length : t.length;
	var d = strSimilarity2Number(s, t);
	return (1-d/l).toFixed(4);
}
Minimum=function(a,b,c){
	return a<b?(a<c?a:c):(b<c?b:c);
}






