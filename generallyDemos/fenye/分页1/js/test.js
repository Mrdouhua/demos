$(function(){
	var getPage = {
		oContent: $('.content'), // 分页内容的容器
		oLists: '', // 分页里面总的内容
		oPage: $('.page'), // 页数与控制按钮的容器
		oStart: $('.start'), // 首页按钮
		oLast: $('.last'), //尾页按钮
		oPrev: $('.prev'), // 上一页按钮
		oNext: $('.next'), // 下一页按钮
		oListsLen: 0, // 求出共有多少条内容
		pageLen: 5, // 每页显示多少条
		pageNum: 0, // 共有多少页
		index: 0, // 当前页数的索引值
		setContentNum: 24, // 设置显示多少数据
		oUl: $('.page ul'),
		oUlLi: '', //为0
		oSpan: $('.page span') // 取得控制按钮
	};

	(function(){
		$.ajax({
			type: "post",
			url: "http://rap.taobao.org/mockjsdata/9989/strudyTrends",
			success: function(data){
				if(data.status!=0){
					initPage(data);
					addPageNum();
					showPage(0);
				} else {
					console.log(data,"2");
				}
			},
			error: function(){
				console.log("网络错误");
			}
		})
	})()

	// 添加页数
	function addPageNum(){
		for(var i = 0;i < getPage.pageNum;i++){
			getPage.oUlLi += '<li>'+(i+1)+'</li>';
		}
		getPage.oUl.html(getPage.oUlLi);
		getPage.oUlLi = getPage.oUl.find('li');
	}

	// 将内容添加到页面
	function initPage(data) {
		let initPageCon = data.data;
		for(var i = 0;i<initPageCon.length;i++){
			getPage.oLists += "<div class='items'>"+"<h2 class='items-tit'>"+initPageCon[i]['title'+(i+1)]+"</h2>"+"<div>"+initPageCon[i]['content'+(i+1)]+"</div>"+"</div>";
		}
		$(getPage.oContent).html(getPage.oLists); // 将内容添加到页面
		getPage.oLists = $(getPage.oContent).find('.items'); // 找出页面共有多少条内容
		getPage.oListsLen = getPage.oLists.length; // 求出内容的条数
		getPage.pageNum = Math.ceil(getPage.oListsLen/getPage.pageLen); // 根据内容数与每页显示条数求出多少页
		$('.allNum').html("共"+getPage.pageNum+"页");
	}

	// 判断是否处于首页和尾页
	function isFirstLast(){
		if(getPage.index == 0){
			getPage.oPrev.addClass('forbid');
			getPage.oStart.addClass('forbid');
			getPage.oNext.removeClass('forbid');
			getPage.oLast.removeClass('forbid');
			return false;
		}
		else if(getPage.index == (getPage.pageNum - 1)){
			getPage.oNext.addClass('forbid');
			getPage.oLast.addClass('forbid');
			getPage.oPrev.removeClass('forbid');
			getPage.oStart.removeClass('forbid');
			return false;
		} else {
			getPage.oSpan.removeClass('forbid');
		}
	}

	// 点击下一页切换
	getPage.oNext.click(function(){
		if(getPage.index == (getPage.pageNum - 1)){
			alert('这是尾页!');
			return false;
		}
		getPage.index +=1;
		showPage(getPage.index);
	})
	// 点击上一页切换
	getPage.oPrev.click(function(){
		if(getPage.index == 0){
			alert('这是首页!');
			return false;
		}
		getPage.index -=1;
		showPage(getPage.index);
	})
	// 点击页数切换
	$(getPage.oUlLi).click(function(){
		getPage.index = $(this).index();
		showPage(getPage.index);
	})
	// 点击首页切换
	getPage.oStart.click(function(){
		if(getPage.index == 0){
			alert('这是首页!');
			return false;
		}
		getPage.index = 0;
		showPage(getPage.index);
	})
	// 点击尾页切换
	getPage.oLast.click(function(){
		if(getPage.index == (getPage.pageNum - 1)){
			alert('这是尾页!');
			return false;
		}
		getPage.index = getPage.pageNum - 1;
		showPage(getPage.index);
	})
	function showPage(num) {
		$(getPage.oLists).hide();
		for(var i = getPage.index * getPage.pageLen;i < (getPage.index + 1) * getPage.pageLen;i++){
			$(getPage.oLists[i]).css({"display":"block"});
		}
		$(getPage.oUlLi).eq(num).addClass('active').siblings().removeClass('active');
		isFirstLast();
	}
})