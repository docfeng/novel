search=function(name){
  get("https://so.m.sm.cn/s?q="+name+
  "&uc_param_str=dnntnwvepffrgibijbprsvdsme"+
  "&from=ucframe&uc_sm=1",function(html){
  if(!html){alert("no html");return 0;}
  var reg=/<a[^>]*?href="([^"]*?)".*?>[^<]*?</g;
  var arr=html.matches(reg);
  //alert(arr)
  var bool=false;
  arr.some(function(item,index){
    //alert(item)
    List.Regs.some(function(item2){
      if(item.indexOf(item2[0]) != -1){
        bool=true;
        get(item,function(html){
          var reg=/<a[^>]*?href="([^"]*?)".*?>[^<]*?目录[^>]*?</;
          if(!html){return 0;}
          var url=html.match(reg)[1]//.toString();
          url=url.replace(/ /g,'');
          url=url.getFullUrl(item[0]);
          get(url,function(html){
            var reg=/<a[^>]*?href="([^"]*?)".*?>[^<第]*?[全|目录|更][^<]*?</;
            var url1=html.match(reg);
            if(url1){
              win.url=url1[1].getFullUrl(url);
              List.checkReg(win.url);
            }
          });
          // alert(item[0].match(/(http[s]?:\/\/[^\/]*?)\//))
          win.url=url;
          List.checkReg(url);
          //List.get(url);
          //alert(url);
          });
        return true;
      }
    });
    if(bool){return true;}
  });
  if(!bool){alert(html);alert("false"+arr);}
});
}
//search("唐残");
//get("https://m.qu.la/book/77290/",function(html){alert(html)})

