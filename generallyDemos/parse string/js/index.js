
var a = document.getElementById('a');
a.onclick = function(){
    // a.href = "b.html?m=aaa&n=bbb";
    a.href = "b.html" +"?"+ "m=aaa&n=bbb";
    console.log(a.href);
    return false;
}
