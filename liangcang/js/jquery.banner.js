jQuery.fn.banner = function(options){
	"user strict"

	//找到第一个图片,显示在最前列;

	options.imgs.css({
		left:options.imgs.eq(0).width()
	}).eq(0).css({
		left:0
	})

	//存在不存在 items ;

	this.LOCAL = {  //存放当前所需要的数值;
		iNow : 0 
	};


	var that = this;

	if(typeof options.items == "object" && options.items.length != 0){

		//存在items;
		//绑定事件;
		options.items.on("click",function(){

			var direction = "";//向哪个方向运动;
			var target = $(this).index();//当前要显示的图片;
			//获取下标;
			if(that.LOCAL.iNow == $(this).index()){
				return 0;
			}
			//向左运动还是向右运动;
			if(that.LOCAL.iNow < $(this).index()){
				//向左移动;
				direction = "left";
			}else{
				//向右移动;
				direction = "right";
			}
			//console.log(that.LOCAL.iNow)
			if(direction == "left"){
				that.LOCAL.move("left",target);
			}
			if(direction == "right"){
				that.LOCAL.move("right",target);
			}
			//更改 图标;
			options.items.removeClass("active").eq(target).addClass("active");
			that.LOCAL.iNow = $(this).index();
		})


	}

	this.LOCAL.move = function(direction,target){
		//运动;
		//显示图片出场;
		if(direction == "left"){
			var moveTaget = -options.imgs.eq(0).width();
			var moveStart = options.imgs.eq(0).width();
		}else{
			var moveTaget = options.imgs.eq(0).width();
			var moveStart = -options.imgs.eq(0).width();

		}
		options.imgs.eq(that.LOCAL.iNow).stop()
		.animate({
			left:moveTaget
		})
		//显示图片入场;
		options.imgs.eq(target).css({
			left:moveStart
		})
		options.imgs.eq(target).stop()
		.animate({
			left:0
		})
	}


	//存在不存在 button;
	if(typeof options.left == "object" && options.left.length != 0 && typeof options.right == "object" && options.right.length != 0){
		//存在button;
		var that = this;
		options.left.on("click",function(){
			var iNext = 0;

			if(that.LOCAL.iNow == 0){
				that.LOCAL.iNow = options.imgs.length - 1;
			}else{
				that.LOCAL.iNow --;
			}

			//下一张该显示什么;
			//挑特殊值;

			if(that.LOCAL.iNow == options.imgs.length - 1){
				iNext = 0;
			}else{
				iNext = that.LOCAL.iNow + 1;
			}
		
			options.imgs.eq(iNext).stop().animate({
				left:options.imgs.eq(0).width()
			})


			options.imgs.eq(that.LOCAL.iNow).css({
				left:-options.imgs.eq(0).width()
			})

			options.imgs.eq(that.LOCAL.iNow).stop().animate({
				left:0
			})

			

			console.log(that.LOCAL.iNow,iNext)
			options.items.removeClass("active").eq(that.LOCAL.iNow).addClass("active");
		})

		options.right.on("click",function(){
			var iPrev = 0;

			if(that.LOCAL.iNow == options.imgs.length - 1){
				that.LOCAL.iNow = 0;
			}else{
				that.LOCAL.iNow ++;
			}

			//下一张该显示什么;
			//挑特殊值;

			if(that.LOCAL.iNow == 0){
				iPrev = options.imgs.length - 1;
			}else{
				iPrev = that.LOCAL.iNow - 1;
			}
		
			options.imgs.eq(iPrev).stop().animate({
				left:-options.imgs.eq(0).width()
			})


			options.imgs.eq(that.LOCAL.iNow).css({
				left:options.imgs.eq(0).width()
			})

			options.imgs.eq(that.LOCAL.iNow).stop().animate({
				left:0
			})
			console.log(that.LOCAL.iNow,iPrev)
			options.items.removeClass("active").eq(that.LOCAL.iNow).addClass("active");
		})



		//自动播放;
		if(options.autoPlay == undefined || options.autoPlay == true){
			clearInterval(this.LOCAL.timer);
			this.LOCAL.timer = setInterval(function(){
				options.right.trigger("click");
			}, 3000);
			var that = this;
			options.imgs.eq(0).parent().parent().parent().parent().on("mouseenter",function(){
				clearInterval(that.LOCAL.timer);
			})
			options.imgs.eq(0).parent().parent().parent().parent().on("mouseleave",function(){
				clearInterval(that.LOCAL.timer);
				that.LOCAL.timer = setInterval(function(){
					options.right.trigger("click");
				}, 3000);
			})
		}
	}

}
