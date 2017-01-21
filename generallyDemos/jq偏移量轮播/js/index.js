$(function(){
	var MO = MO || {};
	MO.carousel =  {
		// banner部分的焦点图轮播
		"banner": function (){
			var oBtn = $('.banner-button'),
				bLi = $('.banner-carousel ul li'),
				sLi = $('.banner-s ul li'),
				oInfo = $('.banner-info'),
				oBanner = $('#banner'),
				pre = $('.prev'),
				next = $('.next'),
				index = 0,
				timer = null,
				oLi = oBtn.find('ul li');
			var oText = [
				"js学的不熟练",
				"布局要多花功夫",
				"写网页速度太慢",
				"写着写着吧自己写晕了"
			];

			oInfo.html(oText[0]);
			fade();
			// 点击右下角按钮切换
			oLi.click(function(){
				index = oLi.index(this);
				fade();
			});

			// 点击右边小图片切换
			sLi.click(function(){
				index = sLi.index(this);
				fade();
			})

			// 自动播放
			function autoPlay(){
				timer = setInterval(function(){
					index++;
					index %= oLi.length;
					fade();
				},3000);
			};
			autoPlay();

			next.click(function(){
				
			})

			// 播放函数
			function fade(){
				bLi.each(function(i){
					if(i!=index){
						bLi.eq(i).hide(900);
						oLi.eq(i).removeClass('banner-act');
						sLi.eq(i).removeClass('bgc');
					} else{
						bLi.eq(i).show(900);
						oLi.eq(i).addClass('banner-act');
						sLi.eq(i).addClass('bgc');
					}
				})
				oInfo.html(oText[index]);
			}

			// 鼠标移入停止播放，移出继续播放
			oBanner.hover(function(){
				clearInterval(timer);
			},autoPlay);
		}
	};
	MO.carousel.banner();
})
	