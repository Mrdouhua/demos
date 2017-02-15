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
	}
};

EventUtil.addHandler(window, "load", function(event){
	var oForm = document.getElementById('myForm'),
		oSearch = document.getElementById("search"),
		oBtn = document.getElementById("btn"),
		oReview = document.getElementById("review"),
		oUl = document.getElementById("ul");

	var arr = ['aaa', 'abc', 'cab'];
	EventUtil.addHandler(oSearch, "mousedown", function(event){
		EventUtil.getEvent(event);
		var val = this.value;
		var arrVal = arr.join(',');
		var str = '';
		// console.log(arrVal);

		for(var i=0,len=arr.length; i<len; i++){
			str = arr[i];
			for(var j = 0, len = str.length; j<len; j++) {
				// console.log(str[j]);
				if(val == str[j]){
					// console.log(val);
					oReview.style.display = "block";
					// oReview.innerHTML = val;
					var li = document.createElement("li");
					li.innerHTML = arr[i];
					li.className = 'li';
					li.style.listStyle = 'none';
					oUl.appendChild(li);
					// console.log(li.innerHTML);

				}
			}
			// console.log(str.length);
			if(val == arr[i]){
				// console.log(val);
				oReview.style.display = "block";
				// oReview.innerHTML = val;
				var li = document.createElement("li");
				li.innerHTML = val;
				oUl.appendChild(li);
				// console.log(li.innerHTML);
				return false;
			}
		}
	})
})