/**
 * Created by 52424 on 2018/6/29.
 */
$(function () {

  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    indicators: false //是否显示滚动条
  });
})

function getSrc(name) {
  var str = decodeURI(location.search).slice(1)
  var arr = str.split('&')
  var obj = {}
  arr.forEach(function (v) {
    var key = v.split('=')[0]
    var value = v.split('=')[1]
    obj[key] = value
  })
  return obj[name]
}