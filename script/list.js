//v1.01
/*
  目录位置:Shelf/{name}.json;
  目录格式:[
            [url,title]
          ]
*/
getHTML=function(url,fun){
  return new Promise(function(resolve){
      get(url,function(html){
        if(fun)fun(html);
        resolve(html);
      });
  });
}
iniarr=function(arr){
  var my_arr=[];
  var my_arr2=[];
  for(var i in arr){
    if(!arr[i][1]) break;
    var index=arr[i][1].match(/第(.*?)[章|节]/)
    if(index){
      index=index[1].toNum();
      if(my_arr[index]){
        if(my_arr[index][1]!=arr[i][1]){
          my_arr2[index]=arr[i];
        }
      }else{
        my_arr[index]=arr[i];
      }
    }else{
      alert(arr[i])
    }
  }
  for(var i=0;i< my_arr.length;i++){
    if(!my_arr[i]){
      if(my_arr2[i-1]){
        //alert(my_arr2[i-1])
        my_arr[i]=my_arr2[i-1];
      }
    }
  }
  //alert(my_arr)
  my_arr.shift();
  return my_arr;
}

List=function(){
	this.path="Shelf/";
	this.ini();
	this.arr;
	this.max=4;
	this.html="";
}
List.prototype.ini=function(){
  var t=this;
  //读取并显示目录
  this.read=function(name,url){
    var name=name||win.name;
    var url=url||win.url;
    if(name){
      var path=this.path+name+".json";
      fso.read(path,function(txt){
        t.arr=JSON.parse(txt);
        t.show(name,t.arr,url);
      });
      
    }
  }
  //保存目录
  this.write=function(){
    if(this.arr && win.name){
      bds.savelist(win.name,this.arr);
    }
  }
  //缓存目录
  this.setLocal=function(){
    if(this.arr && win.name){
      //var path=this.path+win.name+".json";
      localStorage.setItem("list",JSON.stringify(this.arr));
      alert(localStorage.getItem("list"));
      warn("localStorage目录")
    }
  }    	
  //显示目录
  this.show=function(name,arr,url){
    var url_arr=arr||this.arr;
    this.arr=url_arr;
    var name=name||this.name;
    this.name=name;
    var url=url||win.url;
    this.showarr(arr);
    if(window.form_1)win.end=this.arr.length;
  }
	
  this.showarr=function(arr){
    var url_arr=arr||this.arr;
    var str="";
    var err=[];
    for(var i=0;i<url_arr.length;i++){
      if(!url_arr[i]||!url_arr[i][1]){
        err[err.length]=i+":"+url_arr[i];
      }else{
        var d="<h4>"+url_arr[i][1]+"</h4>";
        d+="<h5>"+url_arr[i][0]+"</h5>";
        str+="<tr><td>"+d+"</td></tr>";
      }
    }
    list_table.innerHTML=str;
  }
  //目录滚动到第i个
  this.scroll=function(i){
    var h=list_table.rows[i].offsetTop
    list_table.parentNode.scrollTop=h
  }
  //获取目录
  this.get=function(url){
    var url=url||win.url
    if(!url){
      warn("没有url");
      return 0;
    }
    var t=this;
		http.get(url).then(function(html){
			t.html=html;
			if(!html){alert("no html");return 0;}
			return t.format1(html,url);
		}).then(function(arr){
			t.arr=arr;
			if(t.arr==""){alert("无");return 0;}
			t.show();
			win.newPage=arr[arr.length-1][1];
			var name="test"
			//showData({"html":html,"name":name});
		});
	}
  //获取目录
  this.get2=function(url){
    var url=url||win.url
    if(!url){
      warn("没有url");
      return 0;
    }
    var t=this;
    getlist2(url).then(function(json){
    	t.arr=json.arr;
    	t.show();
			if(!t.arr){alert("无目录");return 0;}
    	win.newPage=t.arr[t.arr.length-1][1];
    	showData({"html":json.html,"name":json.name});
    });
  }
	 //目录html到arr
	this.format1=function(html, url) {
	 	var html = html.replace(/<img.*?>/g, "");
	 	var format=function(str){
	 		//var str=str.match(/<a[^>]*?href([^"]*?)=([^"]*?)"([^"]*?)"[^>]*?>(.*?)<\/a>/g);
			var str=str.match(/<a[^>]*?>(.*?)<\/a>/g);
	 		var re=[];
	 		for(var i=0;i<str.length;i++){
	 			//var s=str[i].match(/<a[^>]*?href[^"]*?=[^"]*?"([^"]*?)"[^>]*?>(.*?)<\/a>/);
				var s=str[i].match(/<a[^>]*?href[^"]*?=[^"']*?["']([^"']*?)["'][^>]*?>(.*?)<\/a>/);
	 			s.splice(0,1)
	 			s[0]=s[0].getFullUrl(url);
	 			var m=s[1].match(/<[^>]*?>([^<]*?)</);
	 			if(m){
	 				s[1]=m[1];
	 			}
	 		    re.push(s)
	 		}
	 		return re;
	 	}
	 	var str=html.match(/<dl[^>]*?>[\s\S]*?<\/dl>/g);
	 	var re=[];
	 	if(str){
	 		for(var i=0;i<str.length;i++){
	 			var re0=format(str[i]);
	 			if(re0.length>re.length){
	 				re=re0;
	 			}
	 		}
	 	}
	 	str=html.match(/<ul[^>]*?>[\s\S]*?<\/ul>/g);
	 	if(str){
	 		for(var i=0;i<str.length;i++){
	 			var re0=format(str[i]);
	 			if(re0.length>re.length){
	 				re=re0;
	 			}
	 		}
	 	}
	     if (re.length > 0) {
	     	return Promise.resolve(re);
	     } else {
	     	return Promise.reject("err list.format: no re");
	     }
	 }
  this.inilist=function(html,fun){
     var t=this;
     //获取章节目录
     var reg_di=new RegExp("<a[^>]*?href=[\"|']([^\"|']*?)[\"|'].*?>(第[^\-]*?)<","g");
     var url_arr=html.matches(reg_di);
     for(var i=0;i<url_arr.length;i++){
          url_arr[i][0]=url_arr[i][0].getFullUrl(win.url);
     }
     //alert(url_arr+"\n"+html)
     if(!url_arr)return 0;
     //获取小说名称
     var reg_name=new RegExp("<title>(第[^<0-9]*?)<","g");
     var novelname=html.match(/<title>([^<]*?)</);
     novelname=novelname[1];
     var pattern1 = /[\u4e00-\u9fa5]+/g;
     novelname = novelname.match(pattern1)[0];
     if(novelname.indexOf("最新")){
       novelname=novelname.split("最新")[0];
     }
     t.novelname=novelname;
     //
     var reg=/<a[^>]*?href="([^"]*?)"[^>]*?>([^<第]*?下一页[^<]*?)</;
     var nexturl=html.match(reg);
     var reg2=/<a[^>]*?href="([^"]*?)"[^>]*?>查看完整目录[^<]*?</;
     var nexturl2=html.match(reg2);
     
     if(nexturl){
       nexturl=nexturl[1].getFullUrl(win.url);
       //alert(nexturl);
       getHTML(nexturl,function(html){
           t.inilist(html,function(arr){
               var arr=url_arr.concat(arr)
               //alert(arr)
               arr=iniarr(arr);
               fun(arr);
           })
        });
     }else{
        if(nexturl2){
          nexturl2=nexturl2[1].getFullUrl(this.url);
          getHTML(nexturl2,function(html){
            t.inilist(html,function(arr){
               //alert(arr)
               var arr=iniarr(arr);
               fun(arr);
            })
          });
        }else{
          //alert(url_arr)
          fun(url_arr);
        }
     }
  }
  //线程
  this.newPageWorker=function(){
    var t=this;
    var worker =new Worker("pageWorker.js"); 
    worker.onmessage =function (e){
      var data=e.data;
      switch(data[0]){
        case "message":
                	//alert(data[1]);
                	warn("结束下载");
                	break;
        case "page":
              var i=data[2];
              list_table.rows[parseInt(i/t.max)].cells[i%t.max].style.backgroundColor="#ff0000";
              zipFile.copyPage(data[1],data[2]);
              break;
      }
    }
    worker.onerror=function(e){
      alert("这是异常是：\nfilename:" + e.filename + "\nlin:"+ e.lineno + "\nmessage:" + e.message); 
      worker.terminate();
    }
    this.pageWorker=worker;
  }
  //下载
  this.download=function(){
    //this.newPageWorker();
    var t=this;
    
    warn("开始下载")
    var start=parseInt(form_1.start.value);
    var end=parseInt(form_1.end.value);
    
    zipFile.ini(List.arr.slice(start,end));
    
    var arr=[start,List.arr.slice(start,end)];
    page.setData(arr,function(data){
			if(!data){
				alert(2222)
			}
      var txt=data[1];
      var i=data[2];
      var count=data[3];
      list_table.rows[parseInt(i)].cells[0].style.backgroundColor="#ff0000";
      zipFile.copyPage(txt,i);
      var len=end-start;
      win.index=count+"/"+len;
      win.progress=(count/len)*100+"%";
      t.scroll(i);
    }).then(function(a){
      alert(a[0]);
    }).catch(function(a){
      alert("错误:\n"+a);
    }).then(function(a){
      alert("完成下载");
      worn("完成下载");
    });
    //this.pageWorker.postMessage(arr); 
  }
  
  //发送到kindle
  
  this.tableFun=function(obj){
         var obj=obj.parentNode;
         var i=obj.parentNode.rowIndex;//*this.max+obj.cellIndex;
         //alert(i);
         //alert(this.arr[i])
         var arr=this.arr[i];
         var title=arr[1];
         var url=arr[0];
         //funcs.showpage(title,url);
         var his=localStorage.getItem("his");
         if(his){
           his=JSON.parse(his);
           if(this.name){
             his.name=this.name
           }
           his.index=[i+1,0];
           var his=JSON.stringify(his,null,2);
           localStorage.setItem("his",his)
           //alert(his)
           location.href="novel2.html";
         }else{
           alert("没有历史记录");
         }
  }
  this.update=function(url){
    getlist2(url).then(function(json){
    	var arr=this.arr=json.arr;
    	this.showarr(arr);
    	var newpage=arr[arr.length-1];
    	f4_new.value=newpage[1];
    });
    
  }
}
//获取目录
getnextlist=function(url,fun){
  var my_arr=[];
  var name="";
  var H="";
  var fun2=function(html){
     //获取名称
     if(!name){
         name=html.match(/<title>([^<]*?)[_|-|最新|章节|目录|全文阅读][^<]*?</);
         if(name)name=name[1];
     }
     if(!H)H=html;
     //获取目录
     //alert(html)
     var reg_di=new RegExp("<a[^>]*?href=[\"']([^\"'>]*?)[\"'][^>]*?>(第[^\-<]*?)<","g");
     var url_arr=html.matches(reg_di);
     for(var i=0;i<url_arr.length;i++){
          url_arr[i][0]=url_arr[i][0].getFullUrl(url);
     }
     //alert(url_arr)
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
       getHTML(nexturl,fun2);
     }else{
          var index=0;
          if(my_arr.length>1&&my_arr[0].length>3){
              //比较2个数组中相同的个数
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
          if(my_arr.length==1){my_arr=my_arr[0]}
          fun(my_arr,name,H);
     }
  }
  getHTML(url,fun2);
}
getlist2=function(url){
  var my_arr=[];
  var html="";
  var nexturl=url;
  //do{
    getHTML(nexturl).then(function(html){
    	 //if(!html)break;
    	//获取目录
    	 var reg_di=new RegExp("<a[^>]*?href=[\"']([^\"'>]*?)[\"'][^>]*?>(第[^\-<]*?)<","g");
    	 var url_arr=html.matches(reg_di);
    	 for(var i=0;i<url_arr.length;i++){
    	      url_arr[i][0]=url_arr[i][0].getFullUrl(url);
    	 }
    	 my_arr[my_arr.length]=url_arr;
    	 //alert(url_arr);
    	 //下一页地址
    	 var reg=/<a[^>]*?href=["|']([^"']*?)["|][^>]*?>([^<第]*?下一页[^<]*?)</;
    	 var nexturl=html.match(reg);
    	 if(nexturl){
    	   nexturl=nexturl[1].getFullUrl(url);
    	 }
    	 //alert(nexturl);
    });
   
  //}while(nexturl);
  //alert(my_arr);
  //获取名称
  var name=html.match(/<title>([^<]*?)[_|-|最新|章节|目录|全文阅读][^<]*?</);
  if(name)name=name[1];
  //alert(name);
  var index=0;
  if(my_arr.length==1){
     my_arr=my_arr[0];
  }else if(my_arr.length>1&&my_arr[0].length>3){
              //比较2个数组中相同的个数
              for(var i=0;i<my_arr[0].length;i++){
                try{
                    if(my_arr[0][i][0]==my_arr[1][i][0]){
                        index++;
                        //alert(index);
                    }
                }catch(e){
                  //alert(i);
                  //alert(my_arr[1][i])
                }
              }
              //删除相同的数组，连接剩余的数组
              var arr=[];
              for(var i=0;i<my_arr.length;i++){
                  for(var i2=0;i2<index;i2++){
                      my_arr[i].shift();
                  }
                  arr=arr.concat(my_arr[i]);
              }
              //alert(arr);
              my_arr=arr;
  }
  return {arr:my_arr,name:name,html:html};
}