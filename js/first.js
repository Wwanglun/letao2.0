/**
 * Created by 52424 on 2018/6/27.
 */
$(function () {
  // 动态生成数据
  var currentPage = 1
  var pageSize = 3
  render()
  function render() {
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function (info) {
        //console.log(info);
        $('tbody').html(template('tmp', info))
        $('.page').bootstrapPaginator({
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

  // 添加分类
  $('.add').click(function () {
    $('#addOne').modal('show')
  })

  // 使用bootstrapValidator插件验证表单
  $('#addForm').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok', // 成功时显示的
      invalid: 'glyphicon glyphicon-remove', // 失败时显示的
      validating: 'glyphicon glyphicon-refresh' // 正在验证时显示
    },
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: '一级分类名不能为空'
          }
        }
      }
    }
  })

  // 当表单校验成功后使用ajax请求提交数据
  $('#addForm').on('success.form.bv', function (e) {
    e.preventDefault()
    $.ajax({
      type: 'post',
      url: ' /category/addTopCategory',
      data: $('#addForm').serialize(),
      dataType: 'json',
      success: function (info) {
        //console.log(info);
        if(info.success === true) {
          currentPage = 1
          render()
          $('#addOne').modal('hide')
        }
      }
    })
  })
})