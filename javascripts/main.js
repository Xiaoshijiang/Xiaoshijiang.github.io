// console.log('This would be the main JS file.');
// var url = location.href;

// $(function ($) {
// 	//totop
// 	$('#totop').click(function () {
// 		$('body,html').stop().animate({ scrollTop: 0 }, 600);
// 	});

// 	if (document.referrer.indexOf(window.location.hostname) != -1) {
// 		$('#container').animate({
// 			'opacity': 1
// 		}, 1000);
// 	} else {
// 		$('#loading').css({ 'display': 'block' });
// 	}
// });

// $(window).load(function () {
// 	if (document.referrer.indexOf(window.location.hostname) == -1) {
// 		//contents fadeIn
// 		$('#loading').animate({
// 			'opacity': 0
// 		}, 1000, function () {
// 			$('#loading').css({ 'display': 'none' });
// 			$('#container').animate({
// 				'opacity': 1
// 			}, 1000);
// 		});
// 	}

// 	//header scroll
// 	var lastTime = (new Date).getTime();
// 	var triggerNodePosition = $('#main').offset().top;
// 	var totop = 0;
// 	var header_flg = 0;
// 	$(window).scroll(function () {
// 		if ((lastTime + 30) <= new Date().getTime()) {
// 			var st = $(window).scrollTop();
// 			if (st > triggerNodePosition + 100 && header_flg == 0) {
// 				$('#header_s').stop().animate({
// 					'top': '0px'
// 				}, 300);
// 				header_flg = 1;
// 			} else if (st <= triggerNodePosition + 100) {
// 				$('#header_s').stop().animate({
// 					'top': '-81px'
// 				}, 300);
// 				header_flg = 0;
// 			}
// 			if (st > 100 && totop == 0) {
// 				$('#totop').stop().animate({
// 					'opacity': '1'
// 				}, 300);
// 				totop = 1;
// 			} else if (st <= 100) {
// 				$('#totop').stop().animate({
// 					'opacity': '0'
// 				}, 300);
// 				totop = 0;
// 			}
// 			lastTime = new Date().getTime();
// 		}
// 	});
// });
