
// document.write("<script src='./error.js'></script>")
function getUrl () {
	$.get("https://manage.hzcbparking.com/api/v1/averageScore",function(data){
    // console.log(data)
  })
  $.get("http://127.0.0.1:3001/test", function(data) {
    // console.log(data)
  })
  $.get("http://127.0.0.1:3001", function(data) {
    // console.log(data)
  })
}
// getUrl()
// window.onload() 
// 点击提交 发送post请求
// var btn = $('#btn')
// console.log(btn)
// btn.on('click', function() {
//   console.log('点击按钮')
// })
// var username = document.getElementsByTagName('input')
// function postRequest () {
//   console.log('点击')
//   console.log(username, '===username')
//   // 
// }
// window.onload = function() {
//   var username = document.getElementById('username')
//   var btn = document.getElementById('btn')
//   console.log(btn)
//   btn.onclick(function() {
//     console.log(username.value, '==username')
//   })
//   // function postRequest() {
//   //   console.log(username.value, '==username')
//   // }
// }









// 计算加载时间
function getPerformanceTiming () {
  var performance = window.performance
  if (!performance) {
    // 当前浏览器不支持
    console.log('你的浏览器不支持 performance 接口')
    return
  }

  var t = performance.timing
  var times = {}

  // 页面加载完成时间：这几乎代表了用户等待页面可用的时间
  times.loadPage = t.loadEventEnd - t.navigationStart

  // 解析DOM结构的时间：反省dom树是不是嵌套太多了
  times.domReady = t.domComplete - t.redirectEnd

  // 重定向时间：拒绝重定向，比如 http://example.com/ 就不该写成 http:example.com
  times.redirect = t.redirectEnd - t.redirectStart

  // DNS查询时间：DNS预加载做了吗 页面是不是使用了太多不同域名，导致域名查询时间太长？
  // 可用HTML5 Prefetch 预加载DNS，
  times.lookupDomain = t.domainLookupEnd - t.domainLookupStart

  // 读取第一个字节的时间：这可以理解为用户拿到你的资源占用的时间，加异地机房没有？加cdn处理没有？加带宽没有？加cpu元算速度没有
  // TTFB 即Time To First Byte 的意思
  times.ttfb = t.responseStart - t.navigationStart

  // 内容加载完成的时间：页面内容是否经过gzip压缩，静态资源 css/js等是否压缩
  t.request = t.responseEnd - t.responseStart

  // 执行onload回调函数的时间：是否有太多不必要的操作都放在onload回调函数里执行了，需要考虑延迟加载或者按需加载
  times.loadEvent = t.loadEventEnd - t.loadEventStart

  // DNS缓存水岸
  t.appcache = t.domainLookupStart - t.fetchStart

  // 卸载页面的时间
  times.unloadEvent = t.unloadEventEnd - t.unloadEventStart

  // tcp 建立连接完成握手的时间
  times.connect = t.connectEnd - t.connectStart

  // console.log('首屏图片加载完成 : ',window.lastImgLoadTime - window.performance.timing.navigationStart); //在最后一张图出来的时候打时间点
  // console.log('HTML加载完成 : ',window.loadHtmlTime - window.performance.timing.navigationStart);//在HTML后打时间点
  // console.log('首屏接口完成加载完成 : ',Report.SPEED.MAINCGI - window.performance.timing.navigationStart);//在首屏的接口打时间点
  // console.log('接口完成加载完成 : ',Report.SPEED.LASTCGI - window.performance.timing.navigationStart);//在所有接口打时间点

  // 首屏图片加载完成：在最后一张图出来的时候打时间点
  times.firstImgLoad = window.lastImgLoadTime - t.navigationStart

  // HTML加载完成：在HTML后打时间点
  times.htmlLoad = window.loadHtmlTime - t.navigationStart

  // 首屏接口完成加载完成：在首屏的接口打时间点
  // times.firstInterfaceLoad = Report.SPEED.MAINCGI - t.navigationStart

  // 接口完成加载完成：在所有接口打时间点
  // times.interfaceLoad = Report.SPEED.LASTCGI - t.navigationStart
  // console.log(times)

  return times
}
// getPerformanceTiming()
