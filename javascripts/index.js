var isIE7 = Boolean(window.navigator.userAgent.match(/MSIE 7.0/i));
var isIE8 = Boolean(window.navigator.userAgent.match(/MSIE 8.0/i));

//javascript youtube API
var script = document.createElement('script');
script.src = "//www.youtube.com/iframe_api";
var firstScript = document.getElementsByTagName('script')[0];
var player = null;
var volume_num = 100;
var firstMoveFlg = 0;
var PLAYER_ID = "movie";
//cm area
var VIDEO_ID = $('#youtube_id').html();

$(window).load(function () {
	//youtube thumb height
	var thumb_height = $('.movie_area .thumb img').height();
	if (thumb_height > 0) {
		$('.movie_area .thumb').css({ 'top': '50%', 'margin': '-' + (thumb_height / 2) + 'px 0 0 0' });
	}
});

$(function () {
	//pickup01 height
	var pickup01Height = $('.pickup01').height() + 12;

	if ($('#main').hasClass('pick02')) {
		pickup01Height = pickup01Height + 32;
	}
	$('.pickup01').css({ 'top': '-' + pickup01Height + 'px' });

	//youtube
	if (isIE8 || isIE7) {
		VIDEO_ID = $('#youtube_id').html();
		$('#movie').html('<iframe width="1088" height="612" src="https://www.youtube.com/embed/' + VIDEO_ID + '?rel=0&autoplay=0" frameborder="0"></iframe>');
		$('#play, .movie .movie_area').click(function () {
			$('#movie').css({ 'z-index': '2' });
			$('#play').css({ 'display': 'none' });
			$('.movie .thumb').css({ 'display': 'none' });
		});
	} else {
		firstScript.parentNode.insertBefore(script, firstScript);
	}

	//ticker
	$.simpleTicker($('#pickup_ticker'), { 'effectType': 'slide' });
});

function onYouTubeIframeAPIReady(playerId) {
	VIDEO_ID = $('#youtube_id').html();
	if (VIDEO_ID) {
		player = new YT.Player(PLAYER_ID, {
			width: '1088',
			height: '612',
			videoId: VIDEO_ID,
			playerVars: { 'controls': 0, 'showinfo': 0, 'rel': 0, 'html5': 1 },
			events: {
				'onReady': onPlayerReady,
				'onStateChange': onPlayerStateChange
			}
		});
	}
}

function onPlayerReady(event) {
	event.target.setVolume(volume_num);
	event.target.seekTo(0);
	event.target.pauseVideo();

	$('#play, .movie .movie_area').click(function () {
		event.target.playVideo();
		$('.movie_area h2').css({ 'z-index': '0' });
		$('#movie').css({ 'z-index': '2' }).stop().animate({
			'opacity': '1'
		}, 500);
		$('#play').stop().animate({
			'opacity': '0'
		}, 500, function () {
			$('#play').css({ 'z-index': '-1' });
		});
		$('.movie .thumb').stop().animate({
			'opacity': '0'
		}, 500, function () {
			$('.movie .thumb').css({ 'z-index': '-1' });
		});
	});
}

function onPlayerStateChange(newState) {
	if (newState.data == 1 && firstMoveFlg == 0) {
		firstMoveFlg = 1;
		player.setPlaybackQuality("hd1080");
	}
	if (newState.data == 0 && firstMoveFlg == 1) {
		newState.target.seekTo(0);
		newState.target.playVideo();
	}
}