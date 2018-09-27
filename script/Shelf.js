Shelf=function(){
    this.hisPath="Shelf/Shelf.json";
    this.max=2;
    var json=fso.read(this.hisPath);
    this.json=JSON.parse(json);
    this.fun();
}
Shelf.prototype.fun=function(){
    this.set=function(){
      var arr=[
		  	    win.name,
        win.url,
        win.newPage,
        "",
        win.oldPage,
        "",
        false,
        new Date()
      ];
      json=this.json;
      if(confirm("添加\n"+JSON.stringify(arr))){
        var num=json.length;
        for(var i=0;i<json.length;i++){
            if(json[i][0]==arr[0]){
                num=i;
            }
         }
         json[num]=arr;
         json=JSON.stringify(json);
         var re=fso.write(this.hisPath,json,false);
        alert(re);
      }
    }
    	
    this.get=function(){
        var json=fso.read(this.hisPath);
        if(json=="false"){
             json="[]";
        }
        this.json=JSON.parse(json);
        this.show(); 
     }
     this.show=function(){
       var arr=this.json;
       var str="";
       var h="";
       for(var i in arr){
                var d="<h1>"+arr[i][0]+"</h1>";
                d+="<h2>"+arr[i][1]+"</h2>";
                d+="<h2>"+arr[i][2]+"</h2>";
                d+="<h2>"+arr[i][4]+"</h2>";
                d+="<h2>"+arr[i][6]+"</h2>";
                d+="<h3>"+arr[i][7]+"</h3>";
                h+="<td>"+d+"</td>";
                if(i%2==1 || i==arr.length-1){
                    str+="<tr>"+h+"</tr>";
                    h="";
                }
        }
        if(shelf_table){shelf_table.innerHTML=str;}
     }
     this.getList=function(obj){
         var obj=obj.parentNode;
         var i=obj.parentNode.rowIndex*this.max+obj.cellIndex;
         var json=fso.read(this.hisPath);
         json=JSON.parse(json);
         var name=json[i][0];
         List.read(name);
         win.name=name;
         win.url=json[i][1];
         win.newPage=json[i][2];
         win.oldPage=json[i][4];
         var event = document.createEvent('HTMLEvents');
         event.initEvent("change", true, true);
         event.eventType = 'message';
         form_1.list_url.dispatchEvent(event);
     }
    this.tableFun=this.getList;
    
    this.del=function(obj){
        this.tableFun=this.getList;
        var obj=obj.parentNode;
        var i=obj.parentNode.rowIndex*this.max+obj.cellIndex;
        if(confirm(i+this.json[i])){
          this.json=this.json.del(i);
          alert(JSON.stringify(this.json));
          fso.write(this.hisPath,JSON.stringify(this.json),false);
          this.show();
        }
    }
    this.update=function(){
        var t=this;
        var json=fso.read(this.hisPath);
        alert("更新")
        var json=JSON.parse(json);
        var myArr=new Array(json.length-1);
        json.forEach(function(arr,i){
            myArr[i]=arr[1];
        });
        var index=0;
        myArr.forEach(function(url,i){
          var text=get(url,
            function(html){
              if(html==""){console.log("无"+i);return 0;}
              var reg_di=new RegExp('<a[^>]*?href="([^"]*?)".*?>(第[^<]*?)<',"g");
              var urlArr=html.matches(reg_di);
              urlArr=urlArr.pop();
              urlArr[0]=urlArr[0].getFullUrl(json[i][1]);
              json[i][4]=json[i][2];
              json[i][5]=json[i][3];
              json[i][2]=urlArr[1];
              json[i][3]=urlArr[0];
              json[i][6]=json[i][4].toIndex()==json[i][2].toIndex();       
              t.json=json;
              t.show();
              index++;
              if(index==myArr.length){
                if(confirm("save?")){
                  alert(t.json)
                  fso.write(t.hisPath,JSON.stringify(t.json),false);
                }
                //alert("close")
                return 0;
              }
            },
            function(){
              console.log("超时");
            }
          );
        });
    }
    this.tableFun=function(obj){
        this.tableFun=this.getList;
        var obj=obj.parentNode;
        var i=obj.parentNode.rowIndex*this.max+obj.cellIndex;
        alert(i);
    }  
}
$(document).ready(function(){
  msg("shShelf");
});




















