function appContent(td){
	//找到显示字符串等式的td标签
	var content = document.getElementById("content");
	//找到显示结果的td标签
	var result = document.getElementById("result");
	//获取字符串的等式
	var text = td.innerText;
	//如果是删除键
	if("del" == text){
		if(content.innerText.length > 0){
			//删除最后一个字符
			content.innerText = content.innerText.substring(0,content.innerText.length-1);
		}
	//如果是全部删除
	}else if("c" == text){
		content.innerText = "";
	//如果是按了等于号
	}else if("=" == text){
		var resultText = parse(content.innerText);
		result.innerText = content.innerText + "=" + resultText;
		content.innerText = "";
	//除了上面三种情况,其他的都是尾加
	}else{
		content.innerText = content.innerText + text;
	}
			
}
// 解析字符串的等式为一个正确的结果
		
function parse(content){
	//寻找最后一个左括号
	var index = content.lastIndexOf("(");
	//如果等式中有左括号
	if(index > -1){
		//寻找右括号,从左括号的位置开始寻找
		var endIndex = content.indexOf(")",index);

		//如果等式中有右括号
		if(endIndex > -1){
			//调用自己算出括号中的结果
			var result = parse(content.substring(index + 1,endIndex));
			//然后继续调用自己,
			//其实这里完成的工作就是"2+3+(2+3*2)"转化成了"2+3+8",也就是用括号中的结果替换括号所在位置
			return parse(content.substring(0,index) + ("" + result) + content.substring(endIndex + 1)) 
		}
	}

	index = content.indexOf("+");
				
	if(index > -1){
		return parse(content.substring(0,index)) + parse(content.substring(index + 1));
	}

	index = content.lastIndexOf("-");

	if(index > -1){
		return parse(content.substring(0,index)) - parse(content.substring(index + 1));
	}

	index = content.lastIndexOf("*");

	if(index > -1){
		return parse(content.substring(0,index)) * parse(content.substring(index + 1));
	}

	index = content.lastIndexOf("/");

	if(index > -1){
		return parse(content.substring(0,index)) / parse(content.substring(index + 1));
	}
				
	if("" == content){ 
		return 0;
	}else{
		return content - 1 + 1;
	}
}				