/**
 * Created by 52424 on 2018/6/29.
 */
$(function () {
  // 动态生成产品目录结构
  var currentPage = 1
  var pageSize =  3
  var arr = []
  render()
  function render() {
    $.ajax({
      type: 'get',
      url: '/product/queryProductDetailList',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (info) {
        $('tbody').html(template('tmp', info))
        $('.page').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: currentPage,
          totalPages: Math.ceil(info.total / info.size),
          onPageClicked: function (a, b, c, page) {
            currentPage = page
            render()
          },
          tooltipTitles: function (type, page, current) {
            switch (type) {
              case 'page':
                return page
              case 'last':
                return '尾页'
              case 'next':
                return '下一页'
              case 'prev':
                return '上一页'
              case 'first':
                return '首页'
            }
          },
          itemTexts: function (type, page, current) {
            switch (type) {
              case 'page':
                return page
              case 'last':
                return '尾页'
              case 'next':
                return '下一页'
              case 'prev':
                return '上一页'
              case 'first':
                return '首页'
            }
          },
          useBootstrapTooltip: true
        })
      }
    })
  }
  // 点击添加商品按钮显示模态框
  $('.add').click(function () {
    $('#addPro').modal('show')
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: {
        page: 1,
        pageSize: 100
      },
      success: function (info) {
        $('.dropdown-menu').html(template('tpl', info))
      }
    })
  })

  // 对表单提交所需要的数据进行处理
  // (1) 二级分类名
  $('.dropdown-menu').on('click', 'li', function () {
    var id = $(this).data('id')
    $('[name="brandId"]').val(id)
    $('.txt').text($(this).text())
    $('#pro').data('bootstrapValidator').updateStatus('brandId', 'VALID')
  })

  // (2) 图片路径设置
  $('#file').fileupload({
    dataType: 'json',
    done: function (e, data) {
      var src = data.result
      arr.unshift(src)
      $('.img').prepend($('<img id="img" src="'+ src.picAddr +'" width="100" height="100" alt="">'))
      if (arr.length > 3) {
        arr.pop()
        $('.img img:last-of-type').remove()
      }
      // 当上传图片的个数有三个, 更新校验成功状态
      if (arr.length === 3) {
        $('#pro').data('bootstrapValidator').updateStatus('fileStatus', 'VALID')
      }
    }
  })

  // 使用bootstrapValidator 插件校验表单
  $('#pro').bootstrapValidator({
    excluded: [],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      brandId: {
        validators: {
          notEmpty: {
            message: '请输入二级分类'
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: '请输入商品分类'
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: '请输入商品描述'
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: '请输入商品库存'
          },
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '商品库存格式, 必须是非零开头的数字'
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: '请输入商品库存'
          },
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '尺码格式, 必须是 32-40'
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: '请输入商品描述'
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: '请输入商品描述'
          }
        }
      },
      fileStatus: {
        validators: {
          notEmpty: {
            message: '请输入商品描述'
          }
        }
      },
    }
  })

  // 表单验证完成后, 使用ajax请求服务器返回数据
  $('#pro').on('success.form.bv', function (e) {
    var str = $('#pro').serialize()
    str += '&picAddr=' + arr[0].picAddr + '&picName=' + arr[0].picName
    str += '&picAddr=' + arr[1].picAddr + '&picName=' + arr[1].picName
    str += '&picAddr=' + arr[2].picAddr + '&picName=' + arr[2].picName
    e.preventDefault()
    $.ajax({
      type: 'post',
      url: '/product/addProduct',
      data: str,
      dataType: 'json',
      success: function (info) {
        if (info.success) {
          $('#addPro').modal('hide')
          $('#pro').data('bootstrapValidator').resetForm(true)
          $('.img img').remove()
          $('.txt').text('请输入二级分类名称')
          currentPage = 1
          render()
        }
      }
    })
  })



})