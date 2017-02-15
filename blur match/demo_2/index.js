/*
* 遍历创建的数组arr，然后数组中的每一项用indexOf()方法来检测用户输入的内容val
* 若返回0则说明数组中该项是以用户输入的内容val开头的，并把这些匹配项显示到下方的显示区
* 为下方显示的内容添加点击事件，赋值到上方的搜索区
*/
var EventUtil = {
	addHandler: function(element, type, handler) {
		if (element.addEventListener) {
			element.addEventListener(type, handler, false);
		} else if (element.attachEvent) {
			element.attachEvent("on" + type, handler);
		} else {
			element["on" + type] = handler;
		}
	},
	getEvent: function(event) {
		return event ? event : window.event;
	},
	getTarget: function(event) {
		return event.target || event.srcElement;
	}
};

EventUtil.addHandler(window, "load", function(event){
	var oForm = document.getElementById('myForm'),
		oSearch = document.getElementById("search"),
		oBtn = document.getElementById("btn"),
		oShow = document.getElementById("show"),
		oUl = document.getElementById("ul");

	// 创建数组，在数组中的字段可以匹配
	var arr = [
		'aaa', 
		'abc', 
		'acc', 
		'dda', 
		'前端', 
		'前端工程师', 
		'前端开发实习', 
		'焦贵彬', 
		'莫小兵', 
		'刘奇', 
		'李康', 
		'罗海林', 
		'曾庆仲', 
		'王鹏宇',
		'高翔',
		'孙凤琴',
		'袁珺',
		'刘晓微',
		'黄静',
		'徐心菊'
	];

	EventUtil.addHandler(oSearch, "keyup", function(event){
		// 默认隐藏提示
		oShow.style.display = 'none';

		// 取出输入的值
		var val = this.value;
		var str = '';
		// 如果是空值则清空并返回
		if(val == '') {
			this.value = '';
			return false;
		}

		// 遍历数组中的每一项，如果该项是以输入的内容开头，则将该项显示出来。
		for(var i=0,len=arr.length; i<len; i++){
			// 求出输入内容在数组中索引的位置，索引为0则表示符合。
			let index = arr[i].indexOf(val);
			if(index == 0) {
				// 将内容显示出来
				oShow.style.display = "block";
				str += "<li class='show_li'>" +arr[i]+ "</li>";
				oUl.innerHTML = str;
				// 为显示出的匹配项添加点击事件，赋值到输入框
				new Promise(function(res, rej){
					var oLi = oUl.getElementsByTagName('li');
					for(var j=0,len=oLi.length; j<len; j++){
						EventUtil.addHandler(oLi[j], "click", function(event){
							oSearch.value = this.innerHTML;
							oShow.style.display = 'none';
						})
					}
				});
			}
		}
	})
})