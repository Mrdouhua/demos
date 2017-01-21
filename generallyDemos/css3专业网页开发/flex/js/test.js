$(function(){
	var prev = $('.prev'),
		next = $('.next'),
		container = $('.box_container'),
		items = container.find("div.items"),
		oP = items.find('p');

	// var lineHeight = prev.height() + 'px';
	// $(prev).css("line-height",lineHeight);
	// $(next).css("line-height",lineHeight);

	(function(){
		// container.html(container.html() + container.html());
		next.click(function(){
			var changeWidth = container.width()/5;

			container.stop(true,true).animate({'margin-left':-changeWidth},'normal',function(){
				container.find("div:first").appendTo('.box_container');
				container.css("margin-left",0);
			})
		})
		
		prev.click(function(){
			var changeWidth = container.width()/5;
			container.find("div:last").prependTo(".box_container");
			container.css("margin-left",-changeWidth);
			container.stop(true,false).animate({"margin-left":0},"normal");
		})
	})()
})