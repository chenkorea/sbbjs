//index.js

//获取应用实例
var app = getApp();
Page({
  data: {
    titleText: '',
    fogcode:'',
    verifycode:'',
    fogphone:'',
    nextstep:'next_un_btn'
  },
  //事件处理函数
  bindViewTap: function () {
    var that = this;
    if (!app.phoneRe.test(that.data.fogphone)) {
      wx.showModal({
        title: "提示",
        content: "手机号格式不正确！",
        showCancel: false
      });

          // 校验密码
    } else if (that.data.fogcode != that.data.verifycode){
       wx.showToast({
        title: '验证码错误',
         duration: 1500,
       })
    }else{
      wx.redirectTo({
        url: '../changepwd/changepwd?phone=' + that.data.fogphone
      })
     }
  },
  onLoad: function () {
    var that = this
    if (app.phoneRe.test(app.getUserInfo().phone)) {
      that.setData({
        nextstep: 'next_en_btn',
        fogphone: app.getUserInfo().phone
      })
    } else {
      that.setData({
        nextstep: 'next_un_btn',
        fogphone: app.getUserInfo().phone
      })
    }
  },
  //获取验证码
  getcode: function () {
    var that = this;
    if (this.data.fogphone.length != 11) {
      wx.showToast({
        title: '手机号码格式有误',
      })
    } else {
      app.request({
        url: '/phone/userinfor/getverifycode',
        data: {
          phone: that.data.fogphone
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        loading: true,
        loadingMsg: "正在获取",
        successFn: function (res) {
        if (res.data.code == '1') {
          that.setData({
            verifycode: res.data.content[0],
            nextstep:'next_en_btn'
          });
          }
        }, completeFn: function (res) {
          if (res.data.code = '-1') {
            wx.showModal({
              title: '提示',
              content: res.data.errmsg,
              showCancel: false
            })
          }
        }
      })
    }
  },
  //验证码
  getfogcode: function(e) {
    this.setData({
      fogcode: e.detail.value
    })
  },
  //手机号
  getfogname: function (e) {
    this.setData({
      fogphone: e.detail.value
    })
    if (app.phoneRe.test(e.detail.value)) {
      this.setData({
        nextstep: 'next_en_btn'
      })
    }else{
      this.setData({
        nextstep: 'next_un_btn'
      })
    }
  },

  onShow: function (opntions) {
    var that = this;
    wx.getStorage({
      key: 'phone',
      success: function (res) {
        that.setData({ fogphone: res.data })
      },
    })
  }
})
