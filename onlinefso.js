onlinefso=function(){
  this.write=function(name,value,bool,fun){
      var cmd="cmd=write&name="+
         encodeURIComponent(name)+
         "&value="+encodeURIComponent(value)+
         "&bool="+bool;
      var url="http://fujianyixue.host3v.vip/evalsql.asp";
      post(url,cmd,function(txt){
         fun(txt);
      });
  }
  this.read=function(name,fun){
      var cmd="cmd=read&name="+
        encodeURIComponent(name);
      var url="http://fujianyixue.host3v.vip/evalsql.asp";
      post(url,cmd,function(txt){
          fun(txt);
      });
  }
  this.getpage=function(url,fun){
    var url="http://fujianyixue.host3v.vip/page.asp?url="
        +url+"&callback=?";
    $.getJSON(url,function(txt){
      fun(decodeURIComponent(txt.txt));
    });
  }
}
ofso=new onlinefso();

ofso.write("1.txt","测试",true,function(x){alert(x)});
ofso.read("1.txt",function(txt){alert(txt)});
alert()