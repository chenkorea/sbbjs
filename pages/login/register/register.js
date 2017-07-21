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
  bindPhoneInput: function(e) { // 设置手机号
    this.setData({
      phone: e.detail.value
    });
  },
  bindPasswdInput: function(e) { // 设置密码
    this.setData({
      passwd: e.detail.value
    });
  },
  bindCheckCodeInput: function (e) { // 设置验证码
    this.setData({
      checkCode: e.detail.value
    });
  },
  bindRegisterBtnTap: function () { // 点击注册按钮
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

      // 校验验证码
    } else if (!app.checkCodeRe.test(this.data.checkCode)) {
      wx.showToast({
        title: '验证码由6位数字组成',
        duration: 3000
      });

      this.setData({
        checkCodeFocus: true
      });

      // 注册
    } else {
      // 保存当前对象，非常重要！！！
      var $this = this;

      wx.showLoading({
        title: '正在注册…',
        mask: true
      });

      // 把注册数据传给服务器
      wx.request({
        url: app.serverAddr + 'phone/js/user/reg',
        data: {
          phone: $this.data.phone,
          passwd: $this.data.passwd,
          checkCode: $this.data.checkCode
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success: function(res) {
          wx.hideLoading();

          // 成功
          if (res.data.code == 1) {
            wx.showToast({
              title: '恭喜，注册成功！',
              duration: 3000,
              complete: function() {
                // 返回登录页面
                wx.navigateBack({
                  delta: 1
                });
              }
            });

            // 失败
          } else {
            wx.showToast({
              title: res.data.errmsg,
              duration: 3000
            });
          }
        },
        fail: function() {
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