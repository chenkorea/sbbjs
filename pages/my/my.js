//logs.js
var util = require('../../utils/util.js')
Page({
  data: {
    logs: []
  },
  toMoneyView: function() {
    wx.navigateTo({
      url: '../my/money/money',
    })
  },
  onLoad: function () {
    
  }
})
