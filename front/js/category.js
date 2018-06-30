/**
 * Created by 52424 on 2018/6/30.
 */

$(function () {
  // 动态添加一级分类的目录
  $.ajax({
    type: 'get',
    url: '/category/queryTopCategory',
    data: {
      page: 1,
      pageSize: 100
    },
    dataType: 'json',
    success: function (info) {
      //console.log(info);
      $('.cateOne').html(template('tmp', info))
      var id = info.rows[0].id
      render(id)
    }
  })

  // 动态生成二级目录
  function render(id) {
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategory',
      data: {
        id: id
      },
      dataType: 'json',
      success: function (info) {
        //console.log(info);
        $('.cateTwo').html(template('tpl', info))
      }
    })
  }

  // 点击一级分类渲染二级分类页
  $('.cateOne').on('click', 'li', function () {
    var id = $(this).data('id')
    render(id)
  })
})
