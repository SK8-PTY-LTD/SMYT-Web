String.prototype.blength = function() {
	var arr = this.match(/[^\x00-\xff]/ig);
	return this.length + (arr == null ? 0 : arr.length);
};

var utils = {

};

utils.encodeData = function(data) {
	if (!data || typeof data != 'object') {
		return '';
	}
	return Object.keys(data).map(function(key) {
		return [ key, data[key] ].map(encodeURIComponent).join("=");
	}).join("&");
};

utils.isCn = function(cb) {
	var cookieName = 'country_name';
	var v = $.cookie(cookieName);
	if (v) {
		cb(v == 'CN');
		return;
	}
	$.ajax("https://library.musical.ly/geoip", {
		jsonp : "callback",
		dataType : "jsonp",
		data : {
			callback : 'callback'
		},
		success : function(response) {
			// save 30 days
			$.cookie(cookieName, response.country, {
				expires : 30,
				path : '/'
			});
			cb(response.country == 'CN');
		},
		error:function(){
			cb(true);
		}
	});
};

utils.getContextPath = function() {
	var contextPath = document.location.pathname;
	var index = contextPath.substr(1).indexOf("/");
	contextPath = contextPath.substr(0, index + 1);
	delete index;
	return contextPath;
};
utils.getUrlBase = function() {
	var contextPath = this.getContextPath();
	var urlBase;
	if (contextPath) {
		urlBase = document.location.origin + "/" + this.getContextPath();
	} else {
		urlBase = document.location.origin;
	}
	return urlBase;
};

utils.getURLParameter = function(name) {
	var a = RegExp(name + '=' + '(.+?)(&|$)').exec(location.search);
	if (!a) {
		return undefined;
	} else {
		return decodeURI(a[1]);
	}
}

utils.getAbsUrlBase = function() {
	var urlBase = document.location.protocol + "//" + document.location.host;
	// var contextPath = this.getContextPath();
	// if (contextPath) {
	// urlBase += "/" + contextPath;
	// }
	return urlBase;
};

utils.getDirectParameter = function() {
	var url = window.location.href;
	var qIndex = url.search(/\?\d+/);
	if (qIndex > 0) {
		var andIndex = url.search(/&/);
		var param;
		if (andIndex >= 0) {
			param = url.substring(qIndex + 1, andIndex);
		} else {
			param = url.substring(qIndex + 1);
		}
		return param;
	} else {
		return undefined;
	}
}

utils.formatTime = function(originTime) {
	var time = Math.floor((new Date().getTime() - originTime) / 1000);
	var interval;
	if (time < 60) {
		// 如果时间间隔小于10秒则显示“刚刚”time/10得出的时间间隔的单位是秒
		interval = "just now";
	} else if (time / 60 < 60) {
		// 如果时间间隔小于60分钟则显示多少分钟前
		var m = Math.floor(time / 60);
		interval = m + " minutes ago";
	} else if (time / 60 / 60 < 24) {
		// 如果时间间隔小于24小时则显示多少小时前
		var h = Math.floor(time / 60 / 60);
		interval = h + " hours ago";
	} else if (time / 60 / 60 / 24 < 31) {
		// 大于24小时，则显示正常的时间，但是不显示秒
		var d = Math.floor(time / 60 / 60 / 24);
		interval = d + " days ago";
	} else if (time / 60 / 60 / 24 < 365) {
		var m = Math.floor(time / 60 / 60 / 24 / 30);
		interval = m + " month ago";
	} else {
		var y = Math.floor(time / 60 / 60 / 24 / 365);
		if (y == 0) {
			y++;
		}
		interval = y + " years ago";
	}
	return interval;
};

utils.isEmail = function(email) {
	var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return regex.test(email);
};

utils.formatImgUrl = function(url) {
	if (url == null) {
		return '';
	}

	if (url.indexOf('/') != 0 && url.indexOf('http') != 0) {
		return "/" + url;
	} else {
		return url;
	}
}

$(function() {
	if (!$.showLoading && typeof $.showLoading != 'function') {
		return;
	}
	$(document).ajaxStart(function() {
		$(document.body).css('overflow', 'hidden');
		$(document.body).showLoading();
		$('.loading-indicator,.loading-indicator-overlay').css({
			position : 'fixed'
		});
	}).ajaxStop(function() {
		$(document.body).css('overflow', 'auto');
		$(document.body).hideLoading();
	}).ajaxComplete(function(e, r, o) {

	});
});
