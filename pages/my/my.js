//logs.js
var util = require('../../utils/util.js');
var app = getApp();
Page({
  data: {
    order_list: [],
    username: '',
    userphoto: '',
    userphone: '',
    logs: []
  },
  toMoneyView: function (e) {
    console.log('toMoneyView------>>>' + JSON.stringify(e.currentTarget.dataset.item))
    wx.navigateTo({
      url: '../my/money/money?oder=' + JSON.stringify(e.currentTarget.dataset.item),
    })
  },
  onLoad: function () {
    var that = this;
    app.request({
      url: "phone/js/user/getAllorder",
      data: {
        uid: app.getUserInfo().id
      },
      method: "POST",
      loading: true,
      loadingMsg: "正在努力加载...",
      successFn: function (res) {
        console.log('successFn---->>>' + JSON.stringify(res))
        if (res.data.code == '1') {
          that.setData({
            order_list: res.data.content
          })
        }
      }
    });
    //调用登录接口
    wx.getUserInfo({
      withCredentials: false,
      success: function (res) {
        console.log('------>>>' + JSON.stringify(res.userInfo))
        that.setData({
          username: res.userInfo.nickName,
          userphoto: res.userInfo.avatarUrl
        })
      }
    })

    var phone = app.getUserInfo().phone
    this.setData({
      userphone: phone
    });
  }
})
