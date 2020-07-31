// 设置测试路径

var baseURL = 'http://ajax.frontend.itheima.net'

$.ajaxPrefilter(function (options) {
    options.url = baseURL + options.url

})