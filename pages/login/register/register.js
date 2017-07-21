//获取应用实例
var app = getApp();

Page({
  data: {
    phone: '',
    phoneFocus: false,
    passwd: '',
    passwdFocus: false,
    checkCode: '',
    checkCodeFocus: false
  },
  bindPhoneInput: function (e) { // 设置手机号
    var _this = this;

    _this.setData({
      phone: e.detail.value
    });
  },
  bindPasswdInput: function (e) { // 设置密码
    var _this = this;

    _this.setData({
      passwd: e.detail.value
    });
  },
  bindCheckCodeInput: function (e) { // 设置验证码
    var _this = this;

    _this.setData({
      checkCode: e.detail.value
    });
  },
  bindRegisterBtnTap: function () { // 点击注册按钮
    var _this = this;

    // 校验手机号
    if (!app.phoneRe.test(_this.data.phone)) {
      wx.showToast({
        title: '手机号格式不正确',
        duration: 3000
      });

      _this.setData({
        phoneFocus: true
      });

      // 校验密码
    } else if (app.isBlank(_this.data.passwd) || (_this.data.passwd.length < 6)) {
      wx.showToast({
        title: '密码至少6个字符',
        duration: 3000
      });

      _this.setData({
        passwdFocus: true
      });

      // 校验验证码
    } else if (!app.checkCodeRe.test(_this.data.checkCode)) {
      wx.showToast({
        title: '验证码由6位数字组成',
        duration: 3000
      });

      _this.setData({
        checkCodeFocus: true
      });

      // 注册
    } else {
      var _this = this;

      // 把注册数据传给服务器
      app.request({
        url: "phone/js/user/reg",
        data: {
          phone: _this.data.phone,
          passwd: _this.data.passwd,
          checkCode: _this.data.checkCode
        },
        loading: true,
        loadingMsg: "正在注册",
        method: 'POST',
        successFn: function (res) {
          wx.showToast({
            title: '恭喜，注册成功！',
            duration: 3000,
            complete: function () {
              // 返回登录页面
              wx.navigateBack({
                delta: 1
              });
            }
          });
        },
        fail: function () {
          wx.hideLoading();

          wx.showToast({
            title: '抱歉，注册失败，稍后再试！',
            duration: 3000
          });
        }
      });
    }
  },
  onLoad: function () { // 加载
    var $this = this;
  }
});