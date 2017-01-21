window.onload = function(){
	var track = document.getElementsByTagName('track')[0];
	track.addEventListener('load',function() {
	    var c = video.textTracks[0].cues;
	    for (var i=0; i<c.length; i++) {
	      var s = document.createElement("span");
	      s.innerHTML = c[i].text;
	      s.setAttribute('data-start',c[i].startTime);
	      s.addEventListener("click",seek);
	      controlbar.appendChild(s);
	    }
	});
	function seek() {
	  video.currentTime = this.getAttribute('data-start');
	  if(video.paused){ video.play(); }
	};
}