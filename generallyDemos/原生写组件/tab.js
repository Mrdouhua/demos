window.onload = function(){
	/*var oUl = document.getElementById('tab-list'),
		aLi = oUl.getElementsByTagName('li'),
		oBox = document.getElementById('tab-box'),
		aDiv = oBox.getElementsByTagName('div');
	for(var i=0,len=aLi.length; i<len; i++){
		aLi[i].index = i;
		aLi[i].onclick = function(){
			for(var j=0,len=aDiv.length; j<len; j++){
				aLi[j].className = '';
				aDiv[j].className = 'hide';
			}
			aLi[this.index].className = 'activity';
			aDiv[this.index].className = '';
		}
	}*/
	tab('tab','tab-box','click');
}
function tab(obj1,obj2,ev){
	var event = ev||window.event;
	var oUl = document.getElementById(obj1).getElementsByTagName('ul')[0],
		aLi = oUl.getElementsByTagName('li'),
		oBox = document.getElementById(obj2),
		aDiv = oBox.getElementsByTagName('div');

	for(var i=0,len=aLi.length; i<len; i++){
		aLi[i].index = i;
		aLi[i].addEventListener(event,function(){
			for(var j=0,len=aDiv.length; j<len; j++){
				aLi[j].className = '';
				aDiv[j].className = 'hide';
			}
			aLi[this.index].className = 'activity';
			aDiv[this.index].className = '';
		})
	}
}
