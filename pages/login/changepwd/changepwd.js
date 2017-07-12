//index.js

//获取应用实例
var app = getApp()
Page({
  data: {
    titleText: ''
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateBack({
      
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this

  }
})
