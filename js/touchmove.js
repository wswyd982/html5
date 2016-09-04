$(function(){
	//alert($("#bigBox").attr("data-height"));
	var $sbox = $("#smallBox");
	
	$("ul.liwrap li:last").clone().prependTo($(".liwrap"));
	$("ul.liwrap li").eq(1).clone().appendTo($(".liwrap"));

	var $li = $("ul li");
	var liLen = $li.length;
	var imgWid = 1903;//parseInt($("ul li img").css("width"));
	var imgHei = 1055;//parseInt($("ul li img").css("height"));
	$sbox.css({"height":imgHei+"px","width":(imgWid*liLen)+"px","left":-imgWid+"px"});
	
	var a=0;
	var time = window.setInterval(run,3000);
	
	function run(){
		a++;
		if(a==6){
			a=1;
		}
		$sbox.css("left",-(imgWid*a)+"px");
		//console.log(imgWid*a);
	}
	
	var tsx,tmx,l,nowl,newx,anikg = true;
	document.getElementById("smallBox").addEventListener('touchstart',touchStart, false);
	function touchStart(event){
		var event = event || window.event;
		nowl = parseInt($sbox.css("left"));
		tsx = event.touches[0].clientX; 
		clearInterval(time);
		//return false;
		event.preventDefault();
		//阻止手机端浏览器的默认行为： 左右滑动为前后页面
	}
	document.getElementById("smallBox").addEventListener('touchmove',touchMove, false);
	function touchMove(e){
		var e = e || window.event; 
		//console.log(1);
		tmx = e.touches[0].clientX;
		newx = tmx - tsx;
		l = newx + nowl;
		$sbox.css("left",l+"px");
		//return false;
		event.preventDefault();
		//阻止手机端浏览器的默认行为： 左右滑动为前后页面
	}
	
	document.getElementById("smallBox").addEventListener('touchend',touchEnd,false);
	function touchEnd(){
		if(anikg){
			anikg = false;
			time = window.setInterval(run,3000);
			var k;
		
			//向左滑
			if(newx<0){
				
				//解决自动轮播没执行的初始状态时向右滑的BUG
				if(a==0){
					a=1;
				}
				
				a=a+1;
				k = -(imgWid*a);
				$sbox.animate({"left":k+"px","border":"0"},500,function(){anikg = true;});
				//$sbox.css("left",k+"px");
				newx =0;
				if(a==6){
					a=1;
					k = k = -(imgWid*a);
					$sbox.animate({"left":k+"px","border":"0"},0,function(){anikg = true;});
					//$sbox.css("left",k+"px");
				}
			}
		}
		
		//向右滑
		if(newx>0){
			a=a-1;
			
			//解决自动轮播没执行的初始状态时向右滑的BUG
			if(a<0){
				a=0;
			}
			
			k = -(imgWid)*a;
			$sbox.animate({"left":k+"px","border":"0"},500,function(){anikg = true;});
			//$sbox.css("left",k+"px");
			newx =0;
			if(a==0){
				a=5;
				k = k = -(imgWid*a);
				$sbox.animate({"left":k+"px","border":"0"},0,function(){anikg = true;});
				//$sbox.css("left",k+"px");
			}
		}
		//return false;
		event.preventDefault();
		//阻止手机端浏览器的默认行为： 左右滑动为前后页面
	}
})
