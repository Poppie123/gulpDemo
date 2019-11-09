# HUI移动UI框架
## 手机页面中心提示窗
hui.toast(msg, timer) 
>自动消失的提示框  
>参数:   
1、msg 消息内容；  
2、消息时长，可省参数，默认: short 短，可以使用 long 代表较长时间；
##  loading动画
hui.loading(msg)
>功能：展示一个居中的Loading效果，使用hui.closeLoading()函数可以关闭它。  
参数：  
1、msg 加载提示文本  
2、是否关闭  

huibase.closeLoading()  
>功能：关闭loading动画  
参数：无
>>这个功能因为容易出错，所以可以选择其他的进行替换，比如在函数完成ajax请求并遍历完数据后写上hui.loading(false, true)
## 图片懒加载
 src="占位图" class="hui-lazy" lazySrc="图片的实际地址"  在函数底部需要写入hui.lazyLoad(); 
>实现内存合理分配，渲染效率的提升。但需要提前准备好预设的图片  

hui.lazyLoad(className) 与 hui.lazyLoadNow(className)  
>hui.lazyLoad()的参数为需要懒加载的图片的类属性，默认为 hui-lazy。 
懒加载组件会自动识别滚动条滚动事件，如果懒加载图片是动态追加进来的，在追加后立即使用 hui.lazyLoadNow(className)函数即可立即执行一次懒加载。
## 下拉刷新
hui.refresh('#refreshContainer', refresh, icon1, icon2, loading );切记切记这玩意很坑，会出现函数执行两次的情况，此时所有的下属active增减都会出bug
> 功能：实现下拉刷新。(需要引用 hui-refresh-load-more.js并且放在hui的引用下方)
参数：
1、refreshContainer ：刷新针对的核心 dom 元素（请使用id选择器）；
2、refresh ：刷新时执行的函数；
3、icon1 [ 可省参数 ]：默认值 :继续下拉刷新"，修改此参数可以改变下拉过程中继续下拉的提示内容；
4、icon2 [ 可省参数 ]：默认值 :释放立即刷新，"，修改此参数可以改变下拉过程中释放立即刷新的提示内容；
5、loading [ 可省参数 ]：默认值 :无  

hui.endRefresh();
>在刷新完成后使用 hui.endRefresh(); 函数结束刷新及其动画效果。
```
<div id="refreshContainer" class="hui-refresh">这个div需要包住页面只要刷新就可能出现数据更新的内容，简单粗暴一点就是直接挂在container容器的下一级。
<div class="hui-refresh-icon"></div>这个div可以直接跟着上边的函数，因为下拉刷新一般都是在页面头部的。
</div>
<script>
hui.refresh('#refreshContainer', refresh);
主程序运行函数
hui.endRefresh();既可以放在js最后，也可以写入到请求数据成功的后边。
</script>
```
## 上拉加载
hui.loadMore(func,title, loading)需要引用hui-refresh-load-more.js
>功能 : 开启上拉加载功能
参数 : 
1、func 加载更多数据对应的函数；
2、title [ 可省参数 ] 默认值 [ <span class="hui-icons hui-icons-up"></span>上拉加载更多]修改此参数可以改变上拉加载更多的提示内容；
3、loading [ 可省参数 ] 默认值 [<divclass="hui-loading-wrap"><divclass="hui-loading"...>]，修改此参数可以改变loading动画；  

hui.endLoadMore()
>功能 : 结束加载动画
参数 : 
1、可省参数，默认 fase，传递true 代表已经加载全部数据；
2、加载完毕后的提示文字内容，可省参数，默认 “已加载全部数据”；
 
```
var isload=1;//定义数据拉取判定变量
hui.loadMore(里边放的是需要加载内容的封装ajax函数);
function 需要加载内容的封装ajax函数(){
    if (isload != 1) {
        return false
    }
    var start = $('循环加载数据的头部类名').length
    此处进行ajax请求

    在ajax成功函数后边的‘html’切换为‘append’之后紧跟着如下代码
    if ($('循环加载数据的头部类名').length == res.count) {
        isload = 0;
        hui.endLoadMore(true)
    }
}

```
## 地址插件


