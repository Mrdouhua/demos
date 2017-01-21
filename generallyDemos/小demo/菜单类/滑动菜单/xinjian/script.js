window.onload = function(){
	var oNav = document.getElementById('nav');
	var oLi = oNav.getElementsByTagName('li');
	var oCur = oLi[oLi.length-1];
	var i = 0;

	for(i=0;i<oLi.length-1;i++){
		oLi[i].onmouseover = function(){
			startMove(oCur,this.offsetLeft);
		};
		oLi[i].onmouseout = function(){
			startMove(oCur,0);
		};
	}

}
var iSpeed = 0;
var left = 0;
function startMove(obj,iTarget){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		iSpeed = (iTarget - obj.offsetLeft)/5;
		iSpeed *= 0.5;
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
function time(){
	var date=new Date();
	var y=date.getFullYear();
	var m=date.getMonth()+1;
	if(m<10)m="0"+m;
	var d=date.getDate();
	if(d<10)d="0"+d;
	var h=date.getHours();
	if(h<10)h="0"+h;
	var i=date.getMinutes();
	if(i<10)i="0"+i;
	var s=date.getSeconds();
	if(s<10)s="0"+s;
	var mmm = y+"-"+m+"-"+d+" "+h+":"+i+":"+s;
	document.getElementById("clock").innerHTML=mmm; 
  };
  setInterval(time,1000);