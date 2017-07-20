// 引入工具 JS
var util = require('../../../utils/util.js')

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
  bindSubmitBtnTap: function () { // 点击提交按钮
    // 校验手机号
    if (!util.phoneRe.test(this.data.phone)) {
      wx.showToast({
        title: '手机号格式不正确'
      });

      this.setData({
        phoneFocus: true
      });

      // 校验密码
    } else if ((this.data.passwd == '') || (this.data.passwd.length < 6)) {
      wx.showToast({
        title: '密码至少6个字符'
      });

      this.setData({
        passwdFocus: true
      });

      // 校验验证码
    } else if (!util.checkCodeRe.test(this.data.checkCode)) {
      wx.showToast({
        title: '验证码由6位数字组成'
      });

      this.setData({
        checkCodeFocus: true
      });

      // 提交
    } else {

    }
  },
  onLoad: function () { // 加载
    var $this = this;
  }
});