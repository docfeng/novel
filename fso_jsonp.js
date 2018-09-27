fso_jsonp=function(){
  this.write=function(name,value,bool,fun){
      var cmd="cmd=write&name="+
         encodeURIComponent(name)+
         "&value="+encodeURIComponent(value)+
         "&bool="+bool+
         "&callback=?";
      var url="http://fujianyixue.host3v.vip/fso.asp?";
      $.getJSON(url+cmd,function(txt){
         fun(txt);
      });
  }
  this.read=function(name,fun){
      var cmd="cmd=read&name="+
        encodeURIComponent(name)+
        "&callback=?";
      var url="http://fujianyixue.host3v.vip/fso.asp?";
      $.getJSON(url+cmd,function(txt){
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
pfso=new fso_jsonp();

/*pfso.write("1.txt","测试dfc方法腹股沟工嘎嘎嘎嘎行",true,function(x){alert(x.txt)});
pfso.read("1.txt",function(txt){alert(txt.txt)});
alert()*/