$(function() {
	var targetImgs = $('#container img');
	
	targetImgs.each (function() {
		if (this.src.match('_off')) {
			$(this).addClass('df');
			this.rollOverImg = new Image();
			this.rollOverImg.src = this.getAttribute("src").replace("_off", "_on");
			$(this.rollOverImg).css({position:'absolute', opacity:0});
			$(this).before(this.rollOverImg);
			
			$(this).prev().addClass('ov');
			
			$(this.rollOverImg).parent('a').hover(function(){
				$(this).find('img.ov').animate({opacity: 1}, {duration: 300, queue: false});
				$(this).find('img.df').animate({opacity: 0}, {duration: 300, queue: false});
			},
			function(){
				$(this).find('img.ov').animate({opacity: 0}, {duration: 300, queue: false});
				$(this).find('img.df').animate({opacity: 1}, {duration: 300, queue: false});
			});
			
			$('a.fadeover').hover(function(){
				$(this).find('img.ov').animate({opacity: 1}, {duration: 300, queue: false});
				$(this).find('img.df').animate({opacity: 0}, {duration: 300, queue: false});
			},
			function(){
				$(this).find('img.ov').animate({opacity: 0}, {duration: 300, queue: false});
				$(this).find('img.df').animate({opacity: 1}, {duration: 300, queue: false});
			});
		}
	});
});
