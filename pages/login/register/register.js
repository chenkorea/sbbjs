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
      wx.showModal({
        title: "提示",
        content: "手机号格式不正确！",
        showCancel: false,
        complete: function (res) {
          _this.setData({
            phoneFocus: true
          });
        }
      });

      // 校验密码
    } else if (app.isBlank(_this.data.passwd) || (_this.data.passwd.length < 6)) {
      wx.showModal({
        title: "提示",
        content: "密码不能少于6位！",
        showCancel: false,
        complete: function (res) {
          _this.setData({
            passwdFocus: true
          });
        }
      });

      // 校验验证码
    } else if (!app.checkCodeRe.test(_this.data.checkCode)) {
      wx.showModal({
        title: "提示",
        content: "验证码由6位数字组成！",
        showCancel: false,
        complete: function (res) {
          _this.setData({
            checkCodeFocus: true
          });
        }
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