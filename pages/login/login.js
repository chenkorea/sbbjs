//获取应用实例
var app = getApp();

Page({
  data: {
    phone: '',
    phoneFocus: false,
    passwd: '',
    passwdFocus: false
  },
  bindPhoneInput: function (e) { // 设置手机号
    this.setData({
      phone: e.detail.value
    });
  },
  bindPasswdInput: function (e) { // 设置密码
    this.setData({
      passwd: e.detail.value
    });
  },
  bindForgetTap: function () { // 跳转至忘记密码界面
    wx.navigateTo({
      url: '../login/findpwd/findpwd'
    })
  },
  bindRegisterBtnTap: function () { // 跳转至注册界面
    wx.navigateTo({
      url: '../login/register/register'
    })
  },
  bindLoginBtnTap: function () { // 点击登录按钮
    // 校验手机号
    if (!app.phoneRe.test(this.data.phone)) {
      wx.showToast({
        title: '手机号格式不正确',
        duration: 3000
      });

      this.setData({
        phoneFocus: true
      });

      // 校验密码
    } else if ((this.data.passwd == '') || (this.data.passwd.length < 6)) {
      wx.showToast({
        title: '密码至少6个字符',
        duration: 3000
      });

      this.setData({
        passwdFocus: true
      });

      // 登录
    } else {
      // 保存当前对象，非常重要！！！
      var $this = this;

      // 把注册数据传给服务器
      app.request({
        url: app.serverAddr + 'phone/js/user/login',
        data: {
          phone: $this.data.phone,
          passwd: $this.data.passwd
        },
        method: 'POST',
        loading: true,
        loadingMsg: "正在登录",
        successFn: function (res) {
          // 设置用户信息
          app.setUserInfo(res.data.content[0]);
          // 设置已登录
          app.setLoginFlag(true);

          // 关闭当前页面，并跳转至首页
          wx.redirectTo({
            url: '../index/index',
          });
        }
      });
    }
  },
  onLoad: function () { // 加载
    var $that = this;
  }
});