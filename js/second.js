/**
 * Created by 52424 on 2018/6/27.
 */
$(function () {
  // 动态生成二级分类目录及分页
  var currentPage = 1
  var pageSize = 5
  render()
  function render() {
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
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

  // 点击添加显示模态框
  $('.add').click(function () {
    $('#addTwo').modal('show')
  })

  // 动态添加一级分类目录
  $.ajax({
    type: 'get',
    url: '/category/queryTopCategoryPaging',
    data: {
      page: 1,
      pageSize: 100
    },
    dataType: 'json',
    success: function (info) {
      console.log(info);
      $('.dropdown-menu').html(template('tpl', info))
    }
  })

  // 图片显示
  $("#file").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      console.log(data);
      var src = data.result.picAddr
      console.log(src);
      $('[name="brandLogo"]').val(src)
      $('#img').attr('src', src)
      $('#twoCate').data('bootstrapValidator').updateStatus('brandLogo', 'VALID')
    }
  })

  // 设置categoryId 的指
  $('.dropdown-menu').on('click', 'li', function () {
    var id = $(this).data('id')
    $('[name="categoryId"]').val(id)
    $('.txt').text($(this).text())
    $('#twoCate').data('bootstrapValidator').updateStatus('categoryId', 'VALID')
  })

  // 使用bootstarpValidator 插件校验表单数据
  $('#twoCate').bootstrapValidator({
    excluded: [],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      brandName: {
        validators: {
          notEmpty: {
            message: '请输入二级分类名称'
          }
        }
      },
      categoryId: {
        validators: {
          notEmpty: {
            message: '请选中一级分类'
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: '请上传图片'
          }
        }
      }
    }
  })

  // 表单校验成功后, 通过ajax请求发送数据
  $('#twoCate').on('success.form.bv', function (e) {
    e.preventDefault()
    $.ajax({
      type: 'post',
      url: '/category/addSecondCategory',
      data: $('#twoCate').serialize(),
      dataType: 'json',
      success: function (info) {
        console.log(info);
        if(info.success === true) {
          currentPage = 1
          render()
          $('#twoCate').data('bootstrapValidator').resetForm(true)
          $('#addTwo').modal('hide')
          $('.txt').text('请选择一级分类')
          $('#img').attr('src', './images/none.png')
        }
      }
    })
  })
})