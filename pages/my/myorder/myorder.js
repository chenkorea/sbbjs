
//获取应用实例
var Util = require('../../../utils/address.js')
var app = getApp()
Page({
  data: {
    titleText: '',
    userOrder: {},
    selectPicAr: [],
    imageWidth: getApp().screenWidth / 4 - 10,
    coment:{},
    allPrice: '',
    selctgoodsAr:[]
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  getUserOrderPic: function (orderId) {
    wx.showLoading({ title: '数据加载中...', })
    var that = this;

    Util.getUserOrderPic(function (data) {
      wx.hideLoading();
      var code = data.data.code;
      if (code == "1") {
        var pics = data.data.content;
        if (pics != null && pics.length > 0) {
          var nowPics = [];
          for (var i = 0; i < pics.length; i++) {
            nowPics[i] = getApp().globalData.imageServerIp + pics[i].archives_url;
          }
          that.setData({ selectPicAr: nowPics});
        } else {
          that.setData({ selectPicAr: [] })
        }
      } else {
        // 失败
        that.setData({ selectPicAr: [] })
      }
    }, orderId);
  },
  getUserOrderAllPrice: function (dispatching_id) {
    wx.showLoading({ title: '数据加载中...', })
    var that = this;
    // 提交数据
    var process_status = '';
    Util.getUserOrderAllPrice(function (data) {
      wx.hideLoading();
      var code = data.data.code;
      if (code == "1") {
        console.log(data.data.content)
        that.setData({ allPrice: data.data.content[0] })
      }
    }, dispatching_id);
  },
  getUserOrderComment: function (dispatching_id) {
    wx.showLoading({ title: '数据加载中...', })
    var that = this;
    // 提交数据
    var process_status = '';
    Util.getUserOrderComment(function (data) {
      wx.hideLoading();
      var code = data.data.code;
      if (code == "1") {
        console.log(data.data.content);
        that.setData({ coment: data.data.content[0] })
        console.log(data.data.content[0]);
      }
    }, dispatching_id);
  },
  /**
   * 查看图片信息
   */
  seeMovieInfo: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.id;
    var typename = e.currentTarget.dataset.type;
    if (typename == 'open') {
      var count = that.data.selectPicAr.length;
      wx.previewImage({
        current: that.data.selectPicAr[index], // 当前显示图片的http链接
        urls: that.data.selectPicAr // 需要预览的图片http链接列表
      })
    }
  },
  /**
   * 获取商品
   */
  getUserOrderGoods: function (dispatching_id) {
    var that = this;
    wx.showLoading({
      title: '获取商品中...',
    })
    // 提交数据
    Util.getUserOrderGoods(function (data) {
      wx.hideLoading();
      var code = data.data.code;
      if (code == "1") {
        var goodsAr = data.data.content;
        if (goodsAr != undefined && goodsAr.length != 0) {
          that.setData({ selctgoodsAr: goodsAr })
        }
      } else {
        wx.showToast({
          title: '获取订单商品失败！',
        })
      }
    }, dispatching_id)
  },
  onLoad: function (optains) {
    var jsonStr = optains.jsonStr;
    var userOrder = JSON.parse(jsonStr);
    
    var that = this
    that.setData({ userOrder: userOrder})
    that.getUserOrderPic(userOrder.order_id);
    console.log(userOrder);
    that.getUserOrderComment(userOrder.dispatching_id)
    that.getUserOrderAllPrice(userOrder.dispatching_id)
    that.getUserOrderGoods(userOrder.dispatching_id)
  }
})
