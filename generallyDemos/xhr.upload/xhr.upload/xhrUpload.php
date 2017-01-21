<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Ajax 文件上传</title>
</head>

<body>
<div>
<h2>传统的form表单上传方法</h2>
<form action="upload_json.php" method="post" enctype="multipart/form-data">
    <input type="file" name="imgFile" id="aaaa" />
    <input type="submit" value="上传" />
</form>
</div>
<br/><br/><br/>
<div>
	<h2>使用FileReader XMLHTTPREQUEST 上传</h2>
	<div style="border:1px solid #CCC; background:#eee; width:300px; height:100px; line-height:100px; text-align:center;" id="imgUpload">把需要上传的文件拖拽到这里</div>
</div>
<div>
<h2>不支持drop事件的A级浏览器</h2>
<form action="upload_json.php" method="post" enctype="multipart/form-data">
    <input type="file" name="imgFile" id="bbbb" />
    <input type="button" value="上传" onclick="upload.add(document.getElementById('bbbb').files[0]);upload.next();" />
</form>
</div>

<div style="position:fixed; right:0; width:300px; border:1px solid #999; top:0;" id="loga"></div>
<script type="text/javascript">
// JavaScript Document


	function _stopPrevent(e){
		e.stopPropagation();
		e.preventDefault();
	}
 	var XHRUpload = function(jsonMap){
		//{url:,name:,ele}
		
		this.config = {
			url:null,
			name:null,
			element:null,
			formate:/./
		}
		
		this.files = [];
		this.index = 0;
		this.mix(this.config, jsonMap);
		this.init(jsonMap);	
	}
	
	XHRUpload.prototype = {
		init:function(jsonMap){
			var self = this;
			var element = jsonMap.element;
			
			element.addEventListener("dragenter", this._stopPrevent, false);
			element.addEventListener("dragover", this._stopPrevent, false);
			element.addEventListener("drop", function(e){
				e.stopPropagation();
				e.preventDefault();
				self.start(e);
			}, false);
		},
		
		_stopPrevent:function(e){ //阻止默认动作 和事件冒泡
			e.stopPropagation();
			e.preventDefault();
		},
		
		mix:function(a, b){
			for(var i in b){
				a[i] = b[i];
			}
			return a;
		},
		
		onerror:function(msg){},
		onformaterror:function(msg){},//上传格式错误回调
		onloadstart:function(msg){}, // 开始上传回调
		onprogress:function(msg){}, // 上传进度回调
		onreadystatechange:function(msg){}, //上传状态改变回调
		onfilereadererror:function(msg){},
		
		start:function(e){
			// 拖拽可以在event.dataTransfer 中获取file对象
			if(e.dataTransfer.files.length == 0){return false};
			this.index--;
			this.files = this.files.concat( [].slice.call(e.dataTransfer.files) );
			this.next(); // 上传下一个			
		},
		
		next:function(){
			var self = this;
			if(self.files.length > ++self.index ){
				self.onloadstart(self.index);// 开始上传第 N 个
				self.reader(self.files[self.index], self.upload);
			}	
		},
		//标准方法读取文件2进制数据
		reader:function(file, callBack){
			
				var self = this;
				
				if(!self.checkFormate(file)){// 执行文件检查
					self.onformaterror(file.fileName, self.config.formate); //调用文件格式错误事件
					self.next();
					return false;
				} 
				
			    var fileReader = new FileReader();
				
			 	fileReader.onloadend = function(){
					//alert(this.readyState);console.log(this.result); // (0,1,2 :)读取完成回调函数，数据保存在result中
					//console.log(fileReader, file.fileName, file.FileSize);
					//console.log(file);
					//console.log(file.fileName);
					//console.log(file.fileSize);
					callBack.call(self, fileReader, file.fileName, file.FileSize);
					
				}
				
				fileReader.onerror = function(e){
					alert("读取文件出错");
					onfilereadererror(e);
					self.next();
					
				}
				
			 	fileReader.readAsBinaryString(file);// 开始读取2进制数据 异步 参数为file 对象
				//fileReader.readAsDataURL(file);
				//console.log(fileReader)
		},
		//清楚上传队列中的文件
		remove:function(index){
			return this.files.splice(index, 1);
		},
		//向队列中添加文件
		// 如果你希望添加多个文件 可以直接使用 this.files.concat(files);
		add:function(file){
			if(file instanceof File){
				return this.files.push(file)
			}
			return false;
		},
		// 停止当前上传的文件
		abort:function(){
			this.XHR.abort();
		},
		upload:function(fileReader, fileName, fileSize){
			
			console.log(fileReader)
			var self = this;
			var data = this.getBuild({fileName:fileName, binary:fileReader.result});
			
			this.XHR = new XMLHttpRequest();
			this.XHR.onerror = function(msg){self.next(); self.onerror(msg)};
			//this.XHR.onloadstart = self.onloadstart; 去掉了这个事件
			this.XHR.onuploadprogress = self.onprogress; 
			this.XHR.onreadystatechange = function(e){
				self.onreadystatechange(self.XHR);
				if(self.XHR.readyState == 4){self.next()}; 
			}; 
			
			
			this.XHR.open("POST", this.config.url, true);
			this.XHR.setRequestHeader("Content-type", "multipart/form-data; boundary=" + data.boundary);
			//this.XHR.setRequestHeader("Content-Length", fileSize);  经过测试 发现不用设置length 也没问题，设置了反而chrome 下会出现错误
			this.XHR.overrideMimeType("text/plain; charset=x-user-defined-binary");		//read.readAsDataURL(file);
			//this.XHR.overrideMimeType("text/plain; charset=base64");		//read.readAsDataURL(file);

			if(this.XHR.sendAsBinary){
				console.log("this.XHR.sendAsBinary");
				this.XHR.sendAsBinary(data.builder);
			}else{
				console.log("send");
				this.XHR.send(data.builder);
			}
		},
		
		
		getBuild:function(o){
			//"http 数据区域"
			
			// --分隔符回车换行
			// Content-Disposition:... 回车换行
			// Content-Type:...回车换行回车换行
			// 2进制数据回车换行
			// --分隔符--回车换行
			
			var boundary = '-----------------' + (new Date).getTime();
			var dashdash = '--';
			var crlf     = '\r\n';
			
			var builder = '';
		 	/*请求开始分隔符*/
			builder += dashdash+boundary+crlf;
			
			/* 生成请求头 */            
			builder += 'Content-Disposition: form-data; name="'+ this.config.name +'"; filename="' + encodeURIComponent(o.fileName) + '"'+ crlf;
			builder += 'Content-Type: application/octet-stream'+ crlf + crlf; // http://blog.csdn.net/fanweiwei/archive/2007/09/17/1787747.aspx
			//builder +='Content-Type:text/plain; '+ crlf + crlf

			/* 二进制数据 */
			builder += o.binary + crlf;
		 
			/* 请求结束分隔符 */
			builder += dashdash + boundary + dashdash + crlf;

		 
			return {
				boundary : boundary,
				builder : builder
			};
		},
		
		_stopPrevent:function(e){ //阻止默认动作 和事件冒泡
			e.stopPropagation();
			e.preventDefault();
		},
		
		checkFormate:function(file){ // 检查文件类型
			return this.config.formate.test(file.fileName)
		}
		
		
	}
</script>
<script type="text/javascript">
	function clog(msg){

		//var div = document.createDocumentFragment("DIV");
		//div.innerHTML = msg+'<br/>';
		document.getElementById('loga').innerHTML += msg+"<br/>";
	}
	var upload = new XHRUpload({url:"upload_json.php", name:"imgFile", element:document.getElementById('imgUpload')});
	//upload.config.formate = /\.(?:jpg|jpeg|png|gif|html)$/;// 规定上传文件格式
	
	//绑定一些事件
	upload.onerror = function(msg){
		clog("第 "+ (upload.index) +"文件 上传错误");
	}
	upload.onformaterror = function(msg){
		clog("第 "+ (upload.index) +"文件- 格式错误");
	}

	upload.onloadstart = function(msg){
		clog("开始上传第 "+ msg +" 个文件");
	}
	upload.onprogress = function(e){
		clog("第 "+ (upload.index) +" 个文件上传百分比"+ (Math.round((e.loaded * 100) / e.total))+"%");
	}
	upload.onreadystatechange = function(xhr){
		clog("第 "+ (upload.index) +" 个文件上传状态"+ xhr.readyState);
	}
</script>
</body>
</html>
