
base=function(){
  this.fun();
}
base.prototype.fun=function(){
  var t=this;
  t.get=function(url){
    return new Promise(function (resolve, reject){
      get(url,function(a){resolve(a)});
    });
  }
  t.getlist=function(url,bool){
    return t.get(url).then(function(html){
    	var json={}
    	var my_arr=[];
    	//获取名称
    	var name="";
    	var fun=function(html){
    	  //获取名称
    	  if(!name){
    	     name=html.match(/<title>([^<]*?)[_|-|最新|章节|目录|全文阅读][^<]*?</);
    	     if(name)name=name[1];
    	  }
    	  //获取目录
    	  if(bool)alert(html)
    	  var reg_di=new RegExp("<a[^>]*?href=[\"']([^\"'>]*?)[\"'][^>]*?>(第[^\-<]*?)<","g");
    	  var url_arr=html.matches(reg_di);
    	  for(var i=0;i<url_arr.length;i++){
    	      url_arr[i][0]=url_arr[i][0].getFullUrl(url);
    	  }
    	  if(bool)alert(url_arr)
    	  if(!url_arr)return 0;
    	  //alert(url_arr)
    	  my_arr[my_arr.length]=url_arr;
    	  //if(!confirm(my_arr)){return 0;}
    	  //下一页地址
    	  var reg=/<a[^>]*?href=["|']([^"']*?)["|][^>]*?>([^<第]*?下一页[^<]*?)</;
    	  var nexturl=html.match(reg);
    	  //alert(nexturl)
    	  if(nexturl){
    	    nexturl=nexturl[1].getFullUrl(url);
    	    //alert(nexturl);
    	    //alert(my_arr)
    	    return t.get(nexturl).then(function(html){
    	    	return fun(html);
    	    });
    	    
    	  }else{
    	      var index=0;
    	      alert(my_arr)
    	      if(my_arr.length>1&&my_arr[0].length>3){
    	          for(var i=0;i<my_arr[0].length;i++){
    	                if(my_arr[0][i][0]==my_arr[1][i][0]){
    	                    index++;
    	                }
    	          }
    	          var arr=[];
    	          for(var i=0;i<my_arr.length;i++){
    	              for(var i2=0;i2<index;i2++){
    	                  my_arr[i].shift();
    	              }
    	              arr=arr.concat(my_arr[i]);
    	          }
    	          my_arr=arr;
    	      }
    	      //alert(my_arr)
    	      if(my_arr.length==1){my_arr=my_arr[0]}
    	      //alert(my_arr)
    	     json.arr=my_arr;
    	     json.name=name;
    	     json.html=html;
    	     return Promise.resolve(json);
    	  }
				return fun(html);
			}
    });
  }
  t.getpage=function(url){
    var t=this;
    return t.get(url).then(function(html){
    	html=html.replace(/(<br[^>]*?>[ \s]*){1,}/g,'\n');
    	html=html.replace(/&nbsp;/g,' ');
    	//匹配小说名称
    	var novelname=html.match(/《([\u4e00-\u9fa5]+)》/);
    	novelname=novelname?novelname[1]:"";
    	//匹配章节名称
    	var title=html.match(/>(第[^<]*?章[\u0020]*[\u4e00-\u9fa5]+)</);
    	title=title?title[1]:"";
    	//匹配正文
    	var atxt=html.match(/>([^<]{300,})</g);
    	//alert(html)
    	//alert(atxt)
    	for(var i=0;i<atxt.length;i++){
    	  var elen=atxt[i].match(/[A-Za-z]/g);
    	  if(!elen || elen.length/atxt[i].length<0.06){
    	    txt=atxt[i];
    	    txt=txt.match(/>([^<]{100,})</)
    	  }
    	}
    	txt=txt?txt[1]:"";
    	//匹配下一章地址
    	var reg=/<a[^>]*?href="([^"]*?)"[^>]*?>下[^<]*?</;
    	var nexturl=html.match(reg);
    	nexturl=nexturl?nexturl[1]:"";
    	nexturl=nexturl.getFullUrl(url);
    	//
    	var json={"novelname":novelname,
    	           "title":title,
    	           "txt":txt,
    	           "nexturl":nexturl
    	           }
    	//是否有分章
    	if(nexturl.lastIndexOf("_")>nexturl.length-8){
    	  return t.getpage(nexturl).then(function(rejson){
    	  	json.txt+=rejson.txt;
    	  	json.nexturl=rejson.nexturl;
					return json;
    	  });
    	}
    	return Promise.resolve(json);
    });
  }
}
base=new base();