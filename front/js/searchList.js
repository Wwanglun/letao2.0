/**
 * Created by 52424 on 2018/6/30.
 */
$(function () {

  // 1. 进入页面渲染数据
  $('.lt-search input').val(getSrc('key'))
  setTimeout(render, 500)

  function render() {
    var option = {}
    option.proName = $('.lt-search input').val()
    option.page = 1
    option.pageSize = 100

    var k = $('.pro-info a.current').data('type')
    var v = $('.pro-info a.current').find('i').hasClass('fa-angle-down') ? 2 : 1
    option[k] = v
    $.ajax({
      type: 'get',
      url: '/product/queryProduct',
      data: option,
      dataType: 'json',
      success: function (info) {
        //console.log(info);
        $('.lt-product').html(template('tmp', info))
      }
    })
  }
  // 2. 点击价格/ 库存向上排序或者向下排序
  $('.pro-info a[data-type]').click(function () {
    $('.lt-product').html('<div class="loading"></div>')
    if($(this).hasClass('current')) {
      $(this).find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up')
    } else {
      $(this).addClass('current').siblings().removeClass('current')
    }
    setTimeout(render, 500)
  })

  //3. 点击搜索按钮, 搜索商品
  $('.lt-search button').click(function () {
    $('.lt-product').html('<div class="loading"></div>')
    var txt = $('.lt-search input').val()
    var str = localStorage.getItem('searchInfo')
    var arr = JSON.parse(str)
    if (arr.length > 5) {
      arr.pop()
    }
    if (txt === '') {
      mui.toast('请输入搜索关键字')
      return
    }
    var index = arr.indexOf(txt)
    if (index > -1) {
      arr.splice(index, 1)
    }
    arr.unshift(txt)

    setTimeout(function () {
      render(arr)
    }, 500)



    localStorage.setItem('searchInfo', JSON.stringify(arr))

  })

})