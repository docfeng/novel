Page=function(){
	this.i=0;
	this.index=0;
	this.arr=[];
	this.errarr=[];
	this.len=0;
	this.result=[];
	this.backcall=function(){};
	this.fun();
}
Page.prototype.fun=function(){
  this.setData=function(data,backcall){
    this.arr=data[1];
		this.index=0;
    this.i=data[0];
    this.len=this.arr.length;
    this.backcall=backcall;
    this.errarr=[];
    return this.download3();
  };
  this.download=function(){
    var t=this;
    var arr=t.arr.shift();
    var count=0;
    if(!arr){
      if(t.errarr.length>0){
        //alert("err:"+t.errarr);
        return Promise.reject(t.errarr);
      }else{
        return Promise.resolve(true);
      }
    }
    var i=t.i+t.len-t.arr.length-1;
    var url=arr[0];
    var title=arr[1];
    t.index++;
    return this.get(url).then(function(txt){
        var data=["page",txt,i,t.index,url];
        t.backcall(data);
    }).catch(function(e){
        var data=["page",e,i,t.index,url];
        t.backcall(data);
        t.errarr.push([i,url,e]);
    }).then(function(a){
        return t.download();
    });
  }
  this.get=function(url,count){
      var count=count||0;
      var t=this;
      return http.get(url).then(function(html){
        return t.format(html,url).then(function(txt){
           return Promise.resolve(txt);
         }).catch(function(e){
           if(count<3){
            count++;
            //alert(count)
            return t.get(url,count);
           }else{
            return Promise.reject(e);
           }
       });
     });
  }
  this.format=function(html,url){
      var t=this;
      //替换换行，空格
			if(!html)alert(3333)
			var txt="";
			try{
				var html=html.replace(/(<br[^>]*?>[ \s]*){1,}/g,'\n');
				html=html.replace(/&nbsp;/g,' ');
				//匹配正文
				var atxt=html.match(/>([^<]{300,})</g);
				if(atxt){
					for(var i=0;i<atxt.length;i++){
					  var elen=atxt[i].match(/[A-Za-z]/g);
					  if(!elen || elen.length/atxt[i].length<0.06){
					    txt=atxt[i];
					    txt=txt.match(/>([^<]{100,})</);
					  }
					}
				}
				
			}catch(e){
				alert(html)
				alert(atxt)
				//TODO handle the exception
			}
      
      txt=txt?txt[1]:"";
      if(txt){
        return Promise.resolve(txt);
      }else{
       return Promise.reject(html);
      }
      
  }
  this.download3=function(){
    var re1=this.download();
    var re2=this.download();
    var re3=this.download();
    return Promise.all([re1,re2,re3]);
  }
}
page=new Page();






