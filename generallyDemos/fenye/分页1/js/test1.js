$(function(){
	var oContent = $('.content'), // 分页内容的容器
		oLists = '', // 分页里面总的内容
		oPage = $('.page'), // 页数与控制按钮的容器
		oStart = $('.start'), // 首页按钮
		oLast = $('.last'), //尾页按钮
		oPrev = $('.prev'), // 上一页按钮
		oNext = $('.next'), // 下一页按钮
		oListsLen = 0, // 求出共有多少条内容
		pageLen = 5, // 每页显示多少条
		pageNum = 0, // 共有多少页
		index = 0, // 当前页数的索引值
		setContentNum = 24; // 设置显示多少数据
		oUl = oPage.find('ul'),
		oUlLi = '', //为0
		oSpan = oPage.find('span'); // 取得控制按钮

	// 添加内容
	(function addContent(){
		oContent.each(function(){
			for(var i = 0;i<setContentNum;i++){
				oLists += "<div class='lists'>"+(i+1)+"</div>";
			}
		})
		$(oContent).html(oLists); // 将内容添加到页面
		oLists = oContent.find('.lists'); // 找出页面共有多少条内容
		oListsLen = oLists.length; // 求出内容的条数
		pageNum = Math.ceil(oListsLen/pageLen); // 根据内容数与每页显示条数求出多少页	
	})();
	
	// 添加页数
	(function addPageNum(){
		for(var i = 0;i < pageNum;i++){
			oUlLi += '<li>'+(i+1)+'</li>';
		}
		oUl.html(oUlLi);
		oUlLi = oUl.find('li');
	})();

	// 默认显示第几页
	(function(num){
		showPage(num);
	})(0); // 显示第一页

	// 判断是否处于首页和尾页
	function isFirstLast(){
		if(index == 0){
			oPrev.addClass('forbid');
			oStart.addClass('forbid');
			oNext.removeClass('forbid');
			oLast.removeClass('forbid');
			return false;
		}
		else if(index == (pageNum - 1)){
			oNext.addClass('forbid');
			oLast.addClass('forbid');
			oPrev.removeClass('forbid');
			oStart.removeClass('forbid');
			return false;
		} else {
			oSpan.removeClass('forbid');
		}
	}

	// 点击下一页切换
	oNext.click(function(){
		if(index == (pageNum - 1)){
			alert('这是尾一页!');
			return false;
		}
		index +=1;
		showPage(index);
	})
	// 点击上一页切换
	oPrev.click(function(){
		if(index == 0){
			alert('这是首页!');
			return false;
		}
		index -=1;
		showPage(index);
	})
	// 点击页数切换
	$(oUlLi).click(function(){
		index = $(this).index();
		showPage(index);
	})
	// 点击首页切换
	oStart.click(function(){
		if(index == 0){
			alert('这是首页!');
			return false;
		}
		index = 0;
		showPage(index);
	})
	// 点击尾页切换
	oLast.click(function(){
		if(index == (pageNum - 1)){
			alert('这是尾页!');
			return false;
		}
		index = pageNum - 1;
		showPage(index);
	})
	function showPage(num) {
		$(oLists).hide();
		for(var i = index * pageLen;i < (index + 1) * pageLen;i++){
			$(oLists[i]).css({"display":"block"});
		}
		$(oUlLi).eq(num).addClass('active').siblings().removeClass('active');
		isFirstLast();
	}
})