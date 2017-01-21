$(function(){
	var MO = MO || {};
	// 滑动的nav
	(function(){
		let oNav = document.getElementById('nav'),
			oLi = oNav.getElementsByTagName('li'),
			Bar = document.getElementById('slideBar'),
			iSpeed = 0,
			left = 0;
		let oBarLeft = Bar.style.left;
		const move = (obj,iTarget) => {
			
			clearInterval(obj.timer);
			obj.timer = setInterval( ()=>{
				iSpeed += (iTarget - obj.offsetLeft)/7;
				iSpeed *= 0.5;
				left += iSpeed;

				if(Math.abs(iSpeed) < 5 && Math.abs(left - iTarget) < 5) {
					clearInterval(obj.timer);
					obj.style.left = iTarget + 'px';
				} else {
					obj.style.left = left + 'px';
				}
			},30)
		}

		for(let i=0;i<oLi.length-1;i++){
			oLi[i].onmouseover = function(){
				console.log(this.offsetLeft);
				move(Bar,this.offsetLeft);
			};
			oLi[i].onmouseout = function(){
				move(Bar,oBarLeft);
			};
			oLi[i].onclick = function(){
				let newLeft = Bar.style.left;
				// console.log(newLeft);
				oBarLeft = this.offsetLeft;
				console.log(Bar.style.left);
			}
		}
		
	})();

	// slideBar
	{
		const move = (obj,iTarget) => {
			let iSpeed = 0;
			let left = 0;
			clearInterval(obj.timer);
			obj.timer = setInterval( ()=>{
				iSpeed += (iTarget - obj.offsetLeft)/7;
				iSpeed *= 0.4;
				left += iSpeed;

				if(Math.abs(iSpeed) < 1 && Math.abs(left - iTarget) < 1) {
					clearInterval(obj.timer);
					obj.style.left = iTarget + 'px';
				} else {
					obj.style.left = left + 'px';
				}
			},400)
		}
	}

	(function() {

		MO.checkTime = function (t) {
			if(t < 10){
				t = "0" + t;
			}
			return t;
		}
		MO.time = function time() {
			var oTime = document.getElementById('showtime'),
				now = new Date(),
				year = now.getFullYear(),
				month = now.getMonth() + 1,
				day = now.getDate(),
				weekday = now.getDay(),
				hour = now.getHours(),
				minute = now.getMinutes(),
				timer = null,
				oWeekday = [
					"星期天",
					"星期一",
					"星期二",
					"星期三",
					"星期四",
					"星期五",
					"星期六",
				];

			month = MO.checkTime(month);
			day = MO.checkTime(day);
			hour = MO.checkTime(hour);
			minute = MO.checkTime(minute);

			oTime.innerHTML = year+" 年 "+month+" 月 "+day+" 日"+oWeekday[weekday]+" "+hour+":"+minute;
		}
		MO.time();
	})();
})
