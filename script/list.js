/*Regs=[
    [
		"https://m.qu.la",
		{
			"name":'<title>(.*?)<',
			"links":'<a[^>]*?href="([^"]*?)".*?>(第[^<]*?)<'
		},
		{
			"reg1":"",
			"reg2":""
		} 
	]
]
*/

List=function(){
	this.path="Shelf/";
	this.ini();
	this.arr;
	this.max=4;
	this.html="";
	this.Regs=JSON.parse(fso.read("regs.reg"));
	this.reg=[];	
}
List.prototype.ini=function(){
  this.read=function(name){
    var name=name?name:win.name;
    if(name){
      var path=this.path+name+".json";
      this.arr=JSON.parse(fso.read(path));
      this.show();
    }
  }

  this.write=function(){
    if(this.arr && win.name){
      var path=this.path+win.name+".json";
      fso.write(path,JSON.stringify(this.arr),false);
      warn("保存目录")
    }
  }    	

  this.show=function(){
    var url_arr=this.arr;
    var str="";
    var h="";
    var index=1;
    for(var i=0;i<url_arr.length;i++){
      var d="<h4>"+url_arr[i][1]+"</h4>";
      d+="<h5>"+url_arr[i][0]+"</h5>";
      h+="<td>"+d+"</td>";
      if(index==this.max || i==url_arr.length-1){
        str+="<tr>"+h+"</tr>";
        h="";
        index=0;
      }
      index++;
    }
    list_table.innerHTML=str;
    win.end=this.arr.length;
  }
    	
  this.get=function(url){
    var url=url?url:win.url
    if(url){
      var t=this;
      var reg=t.reg;
      var fun=function(html){
        t.html=html;
        if(!html){alert("no html");return 0;}
        var reg_di=new RegExp(reg[1].links,"g");
        var reg_name=new RegExp(reg[1].name);
        //var reg_xq=/<a[^>]*?href="([^"]*?)".*?>([^<第]*?[下全更][^<]*?)</g;
        url_arr=html.matches(reg_di);
        t.arr=url_arr;
        for(var i=0;i<url_arr.length;i++){
          url_arr[i][0]=url_arr[i][0].getFullUrl(url);
        }
				     t.show();
				     if(t.arr==""){alert("无");return 0;}
        win.newPage=t.arr[t.arr.length-1][1];
				     var name=html.match(reg_name)[1];
				     showData({"html":html,"name":name});
      }
      url.get(fun);
    }else{
      warn("没有url")
    }
  }
	
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
  this.download=function(){
    //this.newPageWorker();
    var t=this;
    zipFile.ini(this.arr);
    warn("开始下载")
    var start=parseInt(form_1.start.value);
    var end=parseInt(form_1.end.value);
    var arr=[start,List.arr.slice(start,end)];
    page.setData(arr,function(data){
      var i=data[2];
      list_table.rows[parseInt(i/t.max)].cells[i%t.max].style.backgroundColor="#ff0000";
      zipFile.copyPage(data[1],data[2]);
    });
    //this.pageWorker.postMessage(arr); 
  }
    		
  this.checkReg=function(obj){
    var t=this;
    if(typeof(obj)=="string"){
      t.reg=t.Regs[0];
      t.Regs.forEach(function(e,i){
        var url=obj;
        if(url!=""&&e[0]==url.getBaseUrl()){
					      t.reg=e;
        }
      });
    }else{
      obj.style.backgroundColor="red";
      obj.style.border="2px solid red";
      t.reg=t.Regs[0];
      t.Regs.forEach(function(e,i){
        var url=obj.value;
        if(url!=""&&e[0]==url.getBaseUrl()){
					      obj.style.backgroundColor="green";
					      obj.style.border="2px solid green";
					      t.reg=e;
        }
      });
    }
    showData({"name_reg":t.reg[1].name,"links":t.reg[1].links});
  }
	
  this.setReg=function(){
    var t=this;
    var reg=this.reg=[
      form_1.list_url.value.getBaseUrl(),
      {
				     "name":form_1.name_reg.value,
        "links":form_1.link_reg.value
			    }
    ];
    var bool=false;
    var index;
    var Regs=this.Regs;
    Regs.forEach(function(value,i){
      if(value[0]==reg[0]){
     	    bool=true;
     	    index=i;
     	 }
    });
    if(bool){
      if(confirm("已存在，是否修改")){
        Regs[index]=reg;
      }
      alert(JSON.stringify(reg));
    }else{
      Regs[Regs.length]=reg;
      alert(JSON.stringify(Regs))  ;
    }
  }
	
  this.writeReg=function(){
    fso.write("regs.reg",JSON.stringify(this.Regs),false);
  }  	
}










