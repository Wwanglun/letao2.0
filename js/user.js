/**
 * Created by 52424 on 2018/6/27.
 */
$(function () {
  // 动态生成数据及分类页
  var currentPage = 1
  var pageSize = 5
  var id
  var isDetele
  render()
  function render () {
    $.ajax({
      type: 'get',
      url: '/user/queryUser',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function (info) {
        //console.log(info);
        $('tbody').html(template('tmp', info))
        $('.paginar').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: currentPage,
          totalPages: Math.ceil(info.total / info.size),
          onPageClicked: function (a, b, c, page) {
            currentPage = page
            render()
          }
        })
      }
    })
  }

  // 点击禁用/启用按钮显示模态框
  $('tbody').on('click', '.btn', function () {
    id = $(this).parent().data('id')
    isDetele = $(this).hasClass('btn-danger') ? 0 : 1
    console.log(id, isDetele);
    $('#disableModal').modal('show')
  })

  $('.sureBtn').click(function () {
    $.ajax({
      type: 'post',
      url: '/user/updateUser',
      data: {
        id: id,
        isDelete: isDetele
      },
      dataType: 'json',
      success: function (info) {
        console.log(info);
        if (info.success === true) {
          render()
          $('#disableModal').modal('hide')
        }
      }
    })
  })

})