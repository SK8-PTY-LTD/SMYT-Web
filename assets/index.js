$(function() {
	$.localise('js/strings');
	$('.slogan').text(txt_home_slogan);
	$('#about').text(txt_about);
	$('#support').text(txt_support);
	$('#term').text(txt_term);
	$('#privacy').text(txt_privacy);
	$('#opensource').text(txt_opensource);
	$('#copyright').text(txt_copyright);
	$('#contact').text(txt_contact);
	$('#facebook').text(txt_facebook);
	$('#weibo').text(txt_weibo);
	$('.btn_download').text(txt_get_app);
	document.title = txt_site_title;
});

$(function() {
	var theVideo = document.getElementById('video');
	var isMobile = jQuery.browser.mobile;

	if (isMobile) {
		$("video,#overlay").remove();
		$(document.body).addClass("bg");
		$('#container').remove();
		$('#container_mobile').show();
	} else {
		$("#bg").remove();
		$('video').attr('src', "http://res01.musical.ly/images/home.mp4");
		$("video,#overlay").show();
		utils.isCn(function(isCn) {
			$('#weibo').parent().toggle(isCn);
			$('#facebook').parent().toggle(!isCn);
		});
		$('#container').show();
		$('#container_mobile').remove();
	}

	function resize() {
		if (!isMobile) {
			var videoRatio = theVideo.videoHeight / theVideo.videoWidth;
			var screenRatio = $(window).height() / $(window).width();
			var width, height;
			if (videoRatio > screenRatio) {
				width = $(window).width();
				height = width * videoRatio;
			} else {
				height = $(window).height();
				width = height / videoRatio;
			}
			$("#video").width(width).height(height);
		}
		$("#bg,#overlay,body").width($(window).width()).height(
				$(window).height());
		var containerMaringTop = Math.max(100, ($(window).height()
				- $(".container").height() - 50) / 2);
		$(".container").css("margin-top", containerMaringTop);
	}

	if (!isMobile) {
		$("#video").on("loadedmetadata", function(e) {
			resize();
		});
		$("#video").on("timeupdate", function(e) {
			if (this.duration - this.currentTime < 0.5) {
				this.currentTime = 0;
			}
		});

		// TODO Remove the second video tag
		$("#video,#video2").on("-ended", function() {
			$(this).hide();
			var next = $(this).attr("id") == "video" ? "video2" : "video";
			document.getElementById(next).play();
			$("#" + next).show();
		});
	}

	$(window).resize(function() {
		resize();
	});
	$("img").on("load", resize);

	if (navigator.userAgent.match(/MicroMessenger/i)) {
		$('.btn_download').attr('href', 'javascript:;').click(function() {
			alert('请从右上角选择在sarari中打开继续下载');
		});
	}

	resize();
});

$(function() {
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-70608550-2', 'auto');
    ga('send', 'pageview');

});
