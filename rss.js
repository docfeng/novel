var rss='<?xml version="1.0" encoding="utf-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n<channel>\n 	<title>$name</title>\n<description>Feed created by FiveFilters.org</description>\n<link>https://m.qu.la/booklist/77290.html</link>\n$items\n</channel> \n</rss>';
var item='<item>\n    <title>$title</title>\n    <link>$url</link>\n    <description></description>\n</item>\n';
var items="";
rss=rss.replace("$name","修真大工业时代");
for(var i=0;i<List.arr.length;i++){
  items+=item.replace("$title",List.arr[i][1]).replace("$url",List.arr[i][0]);
}
rss=rss.replace("$items",items);
fso.write("rss.xml",rss,false);
//prompt("",rss)
//alert(List.arr)