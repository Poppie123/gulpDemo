
;(function(designWidth, maxWidth) {
    var doc = document,
    win = window,
    docEl = doc.documentElement,
    remStyle = document.createElement("style"),
    tid;

    function refreshRem() {
        var width = docEl.getBoundingClientRect().width;
        maxWidth = maxWidth || 540;
        width>maxWidth && (width=maxWidth);
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
    //要等 wiewport 设置好后才能执行 refreshRem，不然 refreshRem 会执行2次；
    refreshRem();

    win.addEventListener("resize", function() {
        clearTimeout(tid); //防止执行两次
        tid = setTimeout(refreshRem, 300);
    }, false);

    win.addEventListener("pageshow", function(e) {
        if (e.persisted) { // 浏览器后退的时候重新计算
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }
    }, false);

    if (doc.readyState === "complete") {
        doc.body.style.fontSize = "16px";
    } else {
        doc.addEventListener("DOMContentLoaded", function(e) {
            doc.body.style.fontSize = "16px";
        }, false);
    }
})(750, );
/* 解析url搜索框内的值 */
;function getQueryString(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  decodeURI(r[2]); return null;
     //unescape(r[2]);
}
// 清除active
// ; function clearavtive(name){
//     for (var i = 0; i < name.length; i++) {
//         name[i].setAttribute('class','')  
//     }
// }
//封装AJAX
function reqAjax(reqUrl,data,callback,method){
    $.ajax({
        url:reqUrl,
        method:method || 'post',
        data:data,
        success:function(res){
            if (res.msg == "尚未登录！") {
                window.location.href= "../user/login.html"
            }
            hui.loading(false, true)
            callback(res)
        },
        err:function(err){
            hui.loading(false, true)
            hui.toast('服务器出错')
        }
    })
}
//封装跳转
$(document).on('click','.link-to',function(){
    hui.loading('跳转中')
    var href= $(this).data('href');
    if (!href)return
	var dt = $(this).data();
	var str = "";
	for (var key in dt){
		if (dt.hasOwnProperty(key)) {
			if (key != 'href') {
				str += key.toString()+"="+dt[key]+'&'
			}
		}
    }
    window.location.href= href + "?" +str 
    huibase.closeLoading() 
})
//判断登录
;function isLogin(){
    return localStorage.getItem('uid') ? true : false
}
//底部跳转
;$(document).on('click','.footer_o',function(){
    var cindex = $('.footer > .active').index()
    var index  = $(this).index();
    if (cindex == index) {
        return false
    }
    hui.loading('跳转中')
    if (index == 0) {
        
        window.location.href="./home.html"
    }else if(index == 1) {
        window.location.href="./sort.html"
    }else if(index == 2){
        isLogin() ? window.location.href = "./buycar.html" : window.location.href = "./login.html"
    }else if(index == 3){
        isLogin() ? window.location.href = "./my.html" : window.location.href = "./login.html"
    }
})
