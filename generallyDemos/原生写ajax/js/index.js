var xmlHttp;
function createxmlHttpRequest() {
    if (window.ActiveXObject) {
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    } else if (window.XMLHttpRequest) {
        xmlHttp=new XMLHttpRequest();
    }
}

var createAjax = function(){
    var xhr=null;
    try {
        xhr=new ActiveXObject("microsoft.xmlhttp"); // IE系列浏览器
    } catch(e1) {
        try{
            xhr=new XMLHttpRequest(); // 非IE浏览器
        } catch(e2) {
            window.alert("您的浏览器不支持ajax，请更换！");
        }
    }
    return xhr;
};
var ajax=function(conf){
    var type=conf.type; // type参数,可选 
    var url=conf.url; // url参数，必填 
    var data=conf.data; // data参数可选，只有在post请求时需要 
    var dataType=conf.dataType; // datatype参数可选 
    var success=conf.success; // 回调函数可选
    if (type == null) {
        type="get"; // type参数可选，默认为get
    }
    if (dataType == null){
        dataType="text"; // dataType参数可选，默认为text
    }
    var xhr = createAjax();
    xhr.open(type,url,true);
    if (type=="GET" || type=="get") {
        xhr.send(null);
    } else if (type=="POST" || type=="post") {
        xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
        xhr.send(data);
    }
    xhr.onreadystatechange=function(){
        if ((xhr.readyState == 4) && (xhr.status == 200)) {
            if (dataType=="text" || dataType=="TEXT"){
                if (success != null){
                    success(xhr.responseText); // 普通文本
                }
            } else if(dataType=="xml" || dataType=="XML"){
                if (success != null){
                    success(xhr.responseXML); // 接收xml文档
                }
            } else if (dataType=="json" || dataType=="JSON"){
                if (success != null) {
                    success(eval("("+xhr.responseText+")")); //将json字符串转换为js对象
                }
            }
        }
    };
}; 

ajax({
    type:"post",//post或者get，非必须
    url:"http://rap.taobao.org/mockjsdata/10097/pageNum",//必须的
    data:"name=dipoo&info=good",//非必须
    dataType:"json",//text/xml/json，非必须
    success:function(data){//回调函数，非必须
        console.log(data);
    }
});