$(function(){
	var MO = MO || {};
	// 滑动的nav
	(function(){
		var oNav = $('.nav'),
			oUl = oNav.find('ul'),
			oLi = oUl.find('li'),
			oA = oLi.find('a'),
			navAct = $('.nav-active'),
			index = 3; // 当前目前显示nav部分第几个;

		MO.setActive = function(index){
			$(oA[index]).addClass('nav-active');
		}
		MO.setActive(index);
		oA.hover(function(){
			$(oA[index]).removeClass('nav-active');
			$(this).addClass("nav-active");
		},function(){
			$(this).removeClass('nav-active');
			MO.setActive(index);
		})
	})();

	// slideBar
	{
		let oNav = $('.nav'),
			oUl = oNav.find('ul'),
			oLi = oUl.find('li:not(#slideBar)'),
			oA = oLi.find('a'),
			oBar = $('#slideBar'),
			index = 3; // 当前目前显示nav部分第几个;

		oLi.hover(function(){
			// console.log($('#slideBar').position().left);
			let left = $(this).offset().left;
			let oBarLeft = oBar.offset().left;
			// $('#slideBar').offset().left = left + 'px';
			// $('#slideBar').css("left",(left - oBarLeft +'px'));
			oBar.stop(true,true).animate({"left": (left - oBarLeft +'px')}, 400,function(){
				oBar.css("left",(left - oBarLeft +'px'));
			});
			console.log(left,oBarLeft);
		},function(){
			let left = $(this).offset().left;
			let oBarLeft = oBar.offset().left;
			oBar.stop(true,true).animate({"left": -(left - oBarLeft) +'px'}, 400, function(){
				oBar.css("left",(left - oBarLeft +'px'));
			});
			console.log(left,oBarLeft);
		})
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
