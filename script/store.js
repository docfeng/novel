myStorage=function(f){
  this.fun();
  //this.init(f);
}

myStorage.prototype.fun=function(){
  var t=this;
  t.init=function(fun) {
    return new Promise((resolve)=>{
      var fun=function(){resolve();}
      var dbParams = new Object();
      dbParams.db_name = "store1";
      dbParams.db_version = "1";
      dbParams.db_store_name = "store";
      dbObject.init(dbParams,fun);
    });
  }
  t.setItem2=function(name,value,fun){
      var json={data:{"name": name, "val":value }, 
                       success:fun
                };
      dbObject.put(json);
  }
  t.getItem2=function(name,fun){
      var json={data:{"name": "name", "value":name }, 
                       success:function(a){fun(a.val)},
                       error:fun
                };
      dbObject.getindex(json);
  }
  t.setItem=function(name,value){
    return new Promise((resolve)=>{
      store.setItem2(name,value,function(a){
        resolve(a);
      })
    });
  }
  t.getItem=function(name){
    return new Promise((resolve)=>{
      store.getItem2(name,function(a){
       //alert(a)
        resolve(a)
      })
    });
  }
  t.put=function(){
      // 填入初始值
      var json={data:{name: "test", val: "test" }, 
                       key:1,
                       success:function(a){alert(a)}
                       };
      dbObject.put(json);
  }
 
  t.getkey=function(){
      var json={key:1,success:function(a){alert(JSON.stringify(a))}};
      dbObject.getkey(json);
  }
 
  t.update=function(){
      var json={data:{name: "Quarry", val: "ghkkd", isbn: 12566666 }, 
                           key:1,
                           success:function(a){alert(a)},
                           error:function(a){alert(a)}
                           };
      dbObject.put(json);
  }
 
  t.delete=function(){
      dbObject.delete(3);
  }
 
  t.clear=function(){
      dbObject.clear();
  }
}

// myStorage=new myStorage();