//index.js

//获取应用实例
var app = getApp()
Page({
  data: {
    titleText: ''
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../login/findpwd/findpwd'
    })
  },
  bindRegisterTap: function () {
    wx.navigateTo({
      url: '../login/register/register'
    })
  },
  loginTap: function () {
    wx.navigateTo({
      url: '../index/index',
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this

  }
})
