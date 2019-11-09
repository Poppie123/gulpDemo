
//ajax请求
function ajax(url, data, callback, method) {
	var method = method || 'post'
	$.ajax({
		url: url,
		method: method,
		data: data,
		// 新增content-type头部属性
		heads: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		success: function (res) {
			hui.closeLoading()
			if (res.msg == "尚未登录！") {
				window.location.href = '../user/login.html'
			}
			callback(res)
		},
		err: function (err) {
			hui.closeLoading()
		}
	})
}
//链式操作AJAX
var ajaxPromise = function (url, data, method) {
	var dfd = $.Deferred();
	$.ajax({
		url: url,
		method: method,
		data: data,
		heads: {
			'content-type': "application/x-www-form-urlencoded"
		},
		success: function (res) {
			hui.closeLoading();
			dfd.resolve(res);
		},
		error: function (err) {
			hui.closeLoading();
			dfd.reject(err);
		}
	})
	return dfd.promise();
}
//url参数解析@param1:参数名
function getQueryString(name) {
	const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	const urlObj = window.location;
	var r = urlObj.href.indexOf('#') > -1 ? urlObj.hash.split("?")[1].match(reg) : urlObj.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]); return null;
}
//全局回退
$(document).on('click', '.mui-action-back', function () {
	history.go(-1)
	return
})
//全局单向跳转（不检测登录）
$(document).on('click', '.link-to', function () {
	var href = $(this).data('href');
	var dt = $(this).data();
	var str = "";
	for (var key in dt) {
		if (dt.hasOwnProperty(key)) {
			if (key != 'href') {
				str += key.toString() + "=" + dt[key] + '&'
			}
		}
	}
	if (!href) return
	window.location.href = href + '?' + str;
})
//判断是否登录
function isLogin() {
	return localStorage.getItem('uid') ? true : false
}
$('.footer .item').click(function () {
	var cindex = $(this).index();
	linkTab(cindex) //使用跳转函数进行跳转
})
//跳转tab层
function linkTab(cindex) {
	if (cindex == 0) {
		window.location.href = '../page/page_index.html'
	} else if (cindex == 1) {
		window.location.href = '../page/page_fenlei.html'
	} else if (cindex == 2) {
		isLogin() ? window.location.href = '../page/car.html' : window.location.href = '../user/login.html'
	} else if (cindex == 3) {
		isLogin() ? window.location.href = '../user/my.html' : window.location.href = '../user/login.html'
	}
}
//数尾补两个0 1=>1.00 , 2.2=>2.20;
function setNum2(num) {
	num += '';
	num = num.replace(/[^0-9|\.]/g, '');
	if (/^0+/) { num = num.replace(/^0+/, '') }
	if (!/\./.test(num)) { num += '.00' }
	if (/^\./.test(num)) { num = '0' + num }
	num += '00';
	num = num.match(/\d+\.\d{2}/)[0];
	return num
}
//防抖函数
function throttle(fn) {
	var canRun = true; // 通过闭包保存一个标记
	return function () {
		if (!canRun) return; // 在函数开头判断标记是否为true，不为true则return
		canRun = false; // 立即设置为false
		setTimeout(() => { // 将外部传入的函数的执行放在setTimeout中
			fn.apply(this, arguments);
			// 最后在setTimeout执行完毕后再把标记设置为true(关键)表示可以执行下一次循环了。当定时器没有执行的时候标记永远是false，在开头被return掉
			canRun = true;
		}, 500);
	};
}
//启动swiper
function startSwiper() {
	var mySwiper = new Swiper('.swiper-container', {
		loop: true, // 循环模式选项
		// 如果需要分页器
		autoplay: {
			delay: 3000,//1秒切换一次
		},
		pagination: {
			el: '.swiper-pagination',
		},
	})
}
function rem(designWidth, maxWidth) {
	var doc = document,
		win = window,
		docEl = doc.documentElement,
		remStyle = document.createElement("style"),
		tid;

	function refreshRem() {
		var width = docEl.getBoundingClientRect().width;
		maxWidth = maxWidth || 540;
		width > maxWidth && (width = maxWidth);
		var rem = width * 100 / designWidth;
		remStyle.innerHTML = 'html{font-size:' + rem + 'px;}';
	}

	if (docEl.firstElementChild) {
		docEl.firstElementChild.appendChild(remStyle);
	} else {
		var wrap = doc.createElement("div");
		wrap.appendChild(remStyle);
		doc.write(wrap.innerHTML);
		wrap = null;
	}
	refreshRem();

	win.addEventListener("resize", function () {
		clearTimeout(tid);
		tid = setTimeout(refreshRem, 300);
	}, false);

	win.addEventListener("pageshow", function (e) {
		if (e.persisted) {
			clearTimeout(tid);
			tid = setTimeout(refreshRem, 300);
		}
	}, false);

	if (doc.readyState === "complete") {
		doc.body.style.fontSize = "16px";
	} else {
		doc.addEventListener("DOMContentLoaded", function (e) {
			doc.body.style.fontSize = "16px";
		}, false);
	}
}
rem(375, 1024);

