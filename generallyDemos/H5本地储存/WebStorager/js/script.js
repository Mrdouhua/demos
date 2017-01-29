// localStorage事例
function saveStorage(id){
	var target = document.getElementById(id).value;
	var str = target;
	localStorage.setItem("message",str);
	// localStorage.message = str;
}

function loadStorage(id){
	var target = document.getElementById(id);
	var msg = localStorage.getItem("message");
	// var msg = localStorage.message;
	target.innerHTML = msg;
}