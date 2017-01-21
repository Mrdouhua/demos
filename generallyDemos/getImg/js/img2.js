function setImagePreview() {
    var docObj = document.getElementById("doc");
    var test = document.getElementById("insertImg");

    console.log(docObj.files[0]);
    if(!/image\/\w+/.test(docObj.files[0].type)){
    	alert(docObj.files[0].name+"不是图片!");
    } else {
	    if(docObj.files && docObj.files[0]){
	        var newImg = document.createElement('img');
	        newImg.src = window.URL.createObjectURL(docObj.files[0]);  
	        console.log(newImg.src);
	        test.appendChild(newImg);
	    }	
    }
    
}
