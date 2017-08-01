
//获取应用实例
var app = getApp()
Page({
  data: {
    order_list: [],
    total:0.0
  },
  //事件处理函数
  toMoneyView: function (e) {
    wx.navigateTo({
      url: '../orderdetail/orderdetail?oder=' + JSON.stringify(e.currentTarget.dataset.item),
    })
  },
  onLoad: function () {
    var that = this;
    console.log('getAllorder uid-------------->>>' + app.getUserInfo().id);
    app.request({
      url: "phone/js/user/getAllorder",
      data: {
        uid: app.getUserInfo().id
      },
      method: "POST",
      loading: true,
      loadingMsg: "正在努力加载...",
      successFn: function (res) {
        if (res.data.code == '1') {
          var total = 0;
          for (var i = 0; i < res.data.content.length;i++){
           total += Number(res.data.content[i].service_price)
          }
          that.setData({
            order_list: res.data.content,
            total: Number(total).toFixed(2)
          })
        }
      }
    });
  }
})
