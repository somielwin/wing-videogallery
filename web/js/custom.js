

$(window).resize(function() {
	
});

$(document).ready(function() {
	setupYTAPI();
});

$(window).load(function() {
});



function setupYTAPI() {
    tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}
        
var player;
var playerVideo = "unloaded";

function onYouTubeIframeAPIReady() {
	console.log('test');
    playerVideo = "ready";
    //$(".home-slide-thumb li").each(function(index) {
    $(document).on('click', '.play-btn', function(e) {
        e.preventDefault();
        var _thisbtn = $(this);
        var videoId = $(this).attr('data-videoid');
        var _thisIndex = $(this).closest('li').index();

        if ( $(_thisbtn).hasClass("isPlaying") ) {
            
        	if($(_thisbtn).hasClass('pause')) {
        		_thisbtn.removeClass('pause');
        		player.playVideo();
        		$('.video-holder').removeClass('opac').addClass('z-index');
        	} else {
        		_thisbtn.addClass('pause');
        		$('.video-holder').addClass('opac').removeClass('z-index');
        		player.pauseVideo(2);
        	}
        } else {
        	stopVideo();
        	$('.popup-wrap').addClass('active');
        	$(_thisbtn).addClass("isPlaying");
        	$('.video-holder').addClass('z-index').append("<div id='player'></div>");
            $(_thisbtn).closest('li').addClass('active');
            player = new YT.Player('player', {
                height: $(".video-holder").height(),
                width: $(".video-holder").width(),
                playerVars: { 'controls':0, 'showinfo':0, 'cc_load_policy':0, 'rel':0, 'autoplay':1},
                videoId: videoId,
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });
        }
    });
	//});
}

function onPlayerReady(event) {
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        playerVideo = "complete";
        stopVideo();
    }

    if(event.data == YT.PlayerState.PLAYING ) {
    	
    }
}

function stopVideo() {
    if (player) {
		player = null;
		$("#player").attr("src","");
		$("#player").remove();
		$('.popup-wrap').removeClass('active');
		$(".play-video.isPlaying").removeClass("isPlaying").removeClass('pause');
        $('.video-holder').html('');
    }

}