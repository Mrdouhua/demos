window.onload = function(){
	var oNav = document.getElementById('nav');
	var oLi = oNav.getElementsByTagName('li');
	var oBn = oLi[oLi.length-1];

	for(var i=0;i<oLi.length-1;i++){
		oLi[i].onmouseover = function(){
			startMove(oBn,this.offsetLeft);
		}
	}
	var titles=$('notice-tit').getElementsByTagName('li'),
	divs=$('notice-con').getElementsByTagName('div');
		if(titles.length!=divs.length)
			return;
		//遍历titles下所有的li
		for(var i=0;i<titles.length;i++){
			titles[i].id=i;
			titles[i].onmouseover=function(){
				for(var j=0;j<titles.length;j++){
					titles[j].className='';
					divs[j].style.display='none';
				}
				this.className='select';
				divs[this.id].style.display='block';
			}
		}
}

var iSpeed = 0;
var left = 0;
function startMove(obj,iTarget){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		iSpeed = (iTarget-obj.offsetLeft)/5;
		iSpeed += 0.6;
		left += iSpeed;

		if(Math.abs(iSpeed)<1 && Math.abs(left-iTarget)<1){
			clearInterval(obj.timer);
			obj.style.left = iTarget + 'px';
		} else 
		{
			obj.style.left = left + 'px';
		}
	},30)
}
function $(id){
	return typeof id ==='string'?document.getElementById(id):id;
}
