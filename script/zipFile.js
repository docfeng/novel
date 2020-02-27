zipFile = function() {
	this.index = 0;
	this.path = "zip";
	this.fun();
}
zipFile.prototype.fun = function() {
	this.ini = function(arr) {
		var t = this;
		t.path = win.name||"zip";
		fso.createFolder(t.path);
		fso.createFolder(t.path + "/META-INF");
		fso.createFolder(t.path + "/OPS");
		fso.createFolder(t.path + "/OPS/css");
		fso.copy("1/main.css", t.path + "/OPS/css/main.css");
		fso.copy("1/mimetype", t.path + "/mimetype");
		fso.copy("1/container.xml", t.path + "/META-INF/container.xml")
		fso.copy("1/coverpage.html", t.path + "/OPS/coverpage.html");
		t.arr = arr;
		t.index = 0;
		t.copyopf();
		t.copyncx();
	}

	this.copyopf = function() {
		var t = this;
		var list = t.arr;
		var path = this.path;
		var opf = "";
		var opf2 = "";
		for (var i = 0; i < list.length; i++) {
			opf += '<item id="page' + i + '" href="page' + i + '.html" media-type=' +
				'"application/xhtml+xml"/>\n';
			opf2 += '<itemref idref="page' + i +
				'" linear="yes"/>\n';
		}
		fso.read("1/fb.opf", function(txt) {
			var txt = txt.replace("包含文件", opf);
			txt = txt.replace("逻辑目录", opf2);
			txt = txt.replace("书名", win.name||"zip");
			path = path + "/OPS/fb.opf"
			fso.write(path, txt, false);
		});
	}

	this.copyncx = function() {
		var t = this;
		var list = this.arr;
		var ncx = "";
		for (var i = 0; i < list.length; i++) {
			ncx += '<navPoint id="page' + i +
				'" playOrder="' + (i + 1) +
				'">\n<navLabel><text>' + list[i][1] +
				'</text></navLabel>\n<content ' +
				'src="page' + i + '.html"/>\n</navPoint>\n';
		}
		fso.read("1/fb.ncx", function(txt) {
			var txt = txt.replace("目录", ncx);
			var path = t.path + "/OPS/fb.ncx";
			fso.write(path, txt, false);
		});
	}

	this.copyPage = function(text, i) {
		var t = this;
		if(!text)alert(4444)
		var title = this.arr[i][1];
		//alert(title)
		var text = "<p>" + text.replace(/\n/g, "</p>\n<p>") + "</p>";
		text = "<h1>" + title + "</h1>\n" + text;
		fso.read("1/page.html", function(txt) {
			var path = t.path + "/OPS/page" + i + ".html"
			var txt = txt.replace("内容0", text);
			txt = txt.replace("标题", title);
			fso.write(path, txt, false);

		});
	}
	this.writeZip=function(name){
		var from_name=from_name||"zip";
		var to_name=to_name||"zip.epub";
		fso.writeZip(to_name,from_name)
	}
	this.sendToKindle=function(name){
		var name=name||"zip";
	   alert("sendToKindle");
	   var path=name+".epub";
	   //fso.writeZip(path,name);
	   fso.sendMail("8618344989902@kindle.cn","test","myapp",name+".html",path);
	   alert(true)
	}
}
zipFile=new zipFile();
