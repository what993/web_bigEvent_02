$(function() {
    // 获取用户信息
    getUserInfo()

    // 退出登录
    var layer = layui.layer
    $('#btnLogout').on('click', function() {
        // 提示   
        layer.confirm('是否确认退出？', { icon: 3, title: '提示' }, function(index) {
            //do something

            layer.close(index);
            // 删除本地 token
            localStorage.removeItem('token')
                // 页面跳转
            location.href = '/login.html'
        });
    })





})


// 获取用户信息封装
function getUserInfo() {

    $.ajax({
        type: 'get',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            renderUser(res.data)
        }
    })
}

// 封装用户渲染函数
function renderUser(user) {
    // 1\渲染用户名
    var uname = user.nickname || user.username;
    $('#welcome').html('欢迎 &nbsp;&nbsp;' + uname)

    // 2\渲染用户头像---判断
    if (user.user_pic !== null) {
        $('.layui-nav-img').show().attr('src', user.user_pic)
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        $('.text-avatar').show().html(uname[0].toUpperCase())
    }
}