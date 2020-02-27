
msg=function(x,y,config){
  fixedBody()
  var mtitle="";
  var mbody="";
  if(y){
    mtitle=x;
    mbody=y
  }else{
    mtitle="";
    mbody=x?x:"";
  }
  $(".alert_title")[0].innerHTML=mtitle;
  $(".alert_body")[0].innerHTML=mbody;
  $(".alert").css("display","block");
  //var config={"height":"500px","width":"500px","left":"0px","top":"0px"}
  if(config){
    for (var key in config) {
      if (config.hasOwnProperty(key)){
    //alert(key);
        $(".alert").css(key,config[key]);
      }
    }
  }
}

window.addEventListener("load",function(){
  $(".alert_close").click(function(){
    $(".alert").css("display","none");
    looseBody();
  });
},false);

function fixedBody() {
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    document.body.style.cssText += 'position:fixed;top:-' + scrollTop + 'px;';
}

//关闭模态框后调用
function looseBody() {
    var body = document.body;
    body.style.position = 'static';
    var top = body.style.top;
    document.body.scrollTop = document.documentElement.scrollTop = -parseInt(top);
    body.style.top = '';
}




