menu_ini=function(){
   var _index=0;
   myUl=$("#menu>ul");//.getElementsByTagName("Ul")[0];
   var myLi=$("#menu>ul>li");//myUl.getElementsByTagName("li");
   var objs=$("#menu>div");
   $.map(myLi,function(item,index){
     item.index=index;
     /*var getDiv=function(i){
     post("div"+i+".txt","",function(html){
        objs[i].innerHTML=html;
     });
     }
     getDiv(index);*/
   });
   /*shift=function(i){
      var index=parseInt(i);
      myLi[_index].className="off";
      myDiv[_index].className = "hide";
      myLi[index].className="on";
      myDiv[index].className = "show";
      _index=index;
    }*/
   //.getElementsByTagName("div");

   //myUl.onclick=function(){
     //shift(event.srcElement.index);
   //};
   /*for(var i=0;i<objs.length;++i){
	    if(objs[i].parentNode==menu){
	    	   myDiv[myDiv.length]=objs[i];
	    }
	  }*/
   /*for(var i = 0; i < myLi.length; i++){
     //myLi[i].id="myLi_"+ i;
     myLi[i].index = i;
     //myLi[i].className="off";
     //myDiv[i].id="myDiv_"+i;
     //myDiv[i].className = "hide";
     var getDiv=function(i){
     post("div"+i+".txt","",function(html){
        objs[i].innerHTML=html;
     });
     }
     getDiv(i);
     
  }*/
  myLi[0].className="on";
  objs[0].className = "show";
}

msg=function(x,y){
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
}
$(document).ready(function(){
  $(".alert_close").click(function(){
    $(".alert").css("display","none");
  });
});

$(document).ready(function(){
  $("#menu>ul>li").click(function(){
    var myUl=this.parentNode;
    var index=myUl.dataset.index;
    myUl.dataset.index=this.index;
    $("#menu>ul>li")[index].className="off";
    $("#menu>div")[index].className="hide";
    $("#menu>ul>li")[this.index].className="on";
    $("#menu>div")[this.index].className="show";
  }); 
})







