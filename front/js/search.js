/**
 * Created by 52424 on 2018/6/30.
 */
$(function () {
  var arr = []

  //1. 一进入搜索页, 就把localStorage里面的值渲染在页面上
  render(getArr())

  //2. 点击右边删除按钮X 删除对应的数据,
  $('.history-body').on('click', '.btn_delete', function () {
    var index = $(this).parent().data('index')
    arr = getArr()
    arr.splice(index , 1)
    render(arr)
    localStorage.setItem('searchInfo', JSON.stringify(arr))
  })

  //3. 点击清空记录, 删除localStorage中对应的存储变量, 清空数据
  $('.clear_btn').click(function () {
    localStorage.removeItem('searchInfo')
    render(getArr())
  })

  //4. 点击搜索按钮, 获取输入框中的值, 添加到localStorage的searchInfo中,渲染
  $('.lt-search button').click(function () {
    var txt = $('.lt-search input').val()
    arr = getArr()

    // 条件, 1) 历史记录长度不能大于5
    if (arr.length > 5) {
      arr.pop()
    }
    // 2) 历史记录中不能有重复的
    var index = arr.indexOf(txt)
    if (index > -1) {
      arr.splice(index, 1)
    }

    arr.unshift(txt)
    render(arr)
    $('.lt-search input').val('')
    localStorage.setItem('searchInfo',JSON.stringify(arr))
  })


  function getArr() {
    var str = localStorage.getItem('searchInfo') || '[]'
    return JSON.parse(str)
  }
  function render(arr) {
    $('.history-body').html(template('tmp', {arr: arr}))
  }
})

