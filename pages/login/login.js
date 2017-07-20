// 引入工具 JS
var util = require('../../utils/util.js')

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
    if (!util.phoneRe.test(this.data.phone)) {
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

      wx.showLoading({
        title: '正在登录…',
        mask: true
      });

      // 把注册数据传给服务器
      wx.request({
        url: app.globalData.server_addr + 'phone/js/user/reg',
        data: {
          phone: $this.data.phone,
          passwd: $this.data.passwd
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success: function (res) {
          wx.hideLoading();

          // 成功
          if (res.data.code == 1) {
            wx.navigateTo({
              url: '../index/index',
            });

            // 失败
          } else {
            wx.showToast({
              title: res.data.errmsg,
              duration: 3000
            });
          }
        },
        fail: function () {
          wx.hideLoading();

          wx.showToast({
            title: '抱歉，登录失败，稍后再试！',
            duration: 3000
          });
        }
      });
    }
  },
  onLoad: function () { // 加载
    var $that = this;
  }
});