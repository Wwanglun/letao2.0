/**
 * Created by 52424 on 2018/6/27.
 */

$(function () {
  // 判断用户是否登录
if(location.href.indexOf('login.html') === -1) {
  $.ajax({
    type: 'get',
    url: '/employee/checkRootLogin',
    dataType: 'json',
    success: function (info) {
      //console.log(info);
      if (info.error === 400) {
        location.href = 'login.html'
      }
    }
  })
}

  // 设置进度条
  $(document).ajaxStart(function () {
    NProgress.start()
  })

  $(document).ajaxStop(function () {
    setTimeout(function () {
      NProgress.done()
    }, 1000)
  })

  // 点击显示模态框
  $('.logOut').click(function () {
    $('.modal').modal('show')
  })

  // 退出登录
  $('.outBtn').click(function() {
    $.ajax({
      type: 'get',
      url: '/employee/employeeLogout',
      dataType: 'json',
      success: function (info) {
        console.log(info);
        if(info.success === true) {
          location.href = 'login.html'
        }
      }
    })
  })

  // 切换分类管理
  $('.cate').click(function () {
    $('.category').stop().slideToggle()
  })

  // 切换管理栏
  $('.move').click(function () {
    $('.lt-index').toggleClass('current')
    $('.index-admin').toggleClass('current')
    $('.comment-head').toggleClass('current')
  })
})

