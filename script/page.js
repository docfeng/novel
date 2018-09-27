Page=function(){
	this.i=0;
	this.index=0;
	this.arr=[];
	this.len=0;
	this.result=[];
	this.backcall=function(){};
	this.fun();
}
Page.prototype.fun=function(){
  this.setData=function(data,backcall){
    this.arr=data[1];
    this.i=data[0];
    this.len=this.arr.length;
    this.backcall=backcall;
    this.download();
  };
  this.getpage=function(){
    var t=this;
    var arr=t.arr.shift();
    var count=0;
    if(!arr){return 0;}
    var i=t.i+t.len-t.arr.length-1;
    var url=arr[0];
    var fun=function(html){
      var txt1=html.replace(/(<br[^>]*?>[ \s]*){1,}/g,'\n');
      txt1=txt1.replace(/&nbsp;/g,' ');
      txt1=txt1.replace(/<script>.*?<\/script>/g,'');
      txt1=txt1.match(/>([^<>]{100,})</);
      txt1=txt1?txt1[1]:"";
      txt1=txt1.replace(/\n/g,'<br />\n');
      if(txt1==""){
        if(count<3){
          count++;
          url.get(fun);
        }else{
          alert("no "+i);
          t.index++;
          if(t.index==t.len){
            warn("结束下载");
          }
          t.getpage();
        }
      }else{
        data=["page",txt1,i,url]
        t.backcall(data);
        t.index++;
        if(t.index==t.len){
          warn("结束下载");
        }
        t.getpage();
      }
    }    		
    url.get(fun);
  }
  	
  this.download=function(){
    var t=this;
    t.getpage();
    t.getpage();
    t.getpage();
  }
}
page=new Page();






