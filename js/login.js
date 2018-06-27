/**
 * Created by 52424 on 2018/6/27.
 */
// 使用bootstrapValidator 插件校验表单信息
$(function () {
  $('#form').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok', // 成功时显示的
      invalid: 'glyphicon glyphicon-remove', // 失败时显示的
      validating: 'glyphicon glyphicon-refresh' // 正在验证时显示
    },
    fields: {
      username: {
        validators: {
          notEmpty: {
          message: '用户名不能为空'
        },
          stringLength: {
            min: 2,
            max: 6,
            message: '用户名长度必须在2到6之间'
          },
          callback: {
            message: '用户名错误'
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
          message: '密码不能为空'
        },
          stringLength: {
            min: 2,
            max: 6,
            message: '密码长度必须在2到6之间'
          },
          callback: {
            message: '密码错误'
          }
        }
      },
    }
  })
  // 当验证成功后 触发表单事件
  $('#form').on('success.form.bv', function (e) {
    e.preventDefault()
    $.ajax({
      type: 'post',
      url: '/employee/employeeLogin',
      data: $('#form').serialize(),
      dataType: 'json',
      success: function (info) {
        console.log(info);
        if(info.success === true) {
          location.href = 'index.html'
          $('#form').data('bootstrapValidator').resetForm(true)
        }
        if (info.error === 1000) {
          $('#form').data('bootstrapValidator').updateStatus('username', 'INVALID', 'callback')
        }
        if (info.error === 1001) {
          $('#form').data('bootstrapValidator').updateStatus('password','INVALID', 'callback')
        }
      }
    })
  })

  // 点击重置按钮, 重置提示状态
  $('[type="reset"]').click(function () {
    $('#form').data('bootstrapValidator').resetForm()
  })
})