$(function() {
    $('#link_reg').on("click", function() {
        $(".login-box").hide()
        $('.reg-box').show()
    })
    $('#link_login').on("click", function() {
        $('.reg-box').hide()
        $(".login-box").show()
    })
    var form = layui.form;
    //匹配正则
    form.verify({
        pwd: [/^\S{6,12}$/, "密码为6-12位，不能包含空格"],
        repwd: function(value) {
            if ($("#reg-pwd").val() !== value) {
                return "两次输入密码不一致"
            }
        }
    });
    //注册功能 提交表单
    var layer = layui.layer;
    $("#form_reg").on('submit', function(e) {
            e.preventDefault()
            $.ajax({
                method: 'post',
                url: '/api/reguser',
                data: $(this).serialize(),
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg(res.message)
                        //触动切换到登录a链接的点击行为
                    $("#link_login").click()
                    $("#form_reg")[0].reset();

                }
            })
        })
        //登录
    $("#form_login").on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                    //触动切换到登录a链接的点击行为
                localStorage.setItem("token", res.token)
                location.href = '/index.html'

            }
        })
    })



})