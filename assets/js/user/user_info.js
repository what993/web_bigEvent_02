$(function () {



    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return "昵称应该输入1~6位之间！"
            }
        }
    })

    // 初始化用户信息
    initUserInfo()

    function initUserInfo() {
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            success: function (res) {
                // 获取用户信息校验
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 展示用户信息
                form.val('formUserInfo', res.data)

            }
        })
    }

    // 重置（只接受click事件绑定
    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        initUserInfo()
    })

    // 提交用户修改
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('用户信息修改失败！')
                }
                layer.msg('恭喜您！用户信息修改成功。')
                // 刷新父框架里面的用户消息
                window.parent.getUserInfo()
            }
        })
    })
















})