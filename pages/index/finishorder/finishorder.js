// finishorder.js
var app = getApp();
var Util = require('../../../utils/address.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selctgoodsAr:[],
    selctgoodsNumAr: [],
    userOrder: {},
    selctgoods: {},
    inputOneValue: '',
    inputTwoValue: '',
    inputThreeValue: '',
    allPrice: '',
    payment: '在线支付',
    payments: ['在线支付', '现金支付'],
    fdmindex: 0,
    processObj:{},
    service_price:'',
    additional_service_price: ''
  },
  listenerPickerFDMSelected: function (e) {
    //改变index值，通过setData()方法重绘界面
    if (e.detail.value == 0) {
      this.setData({ payment: '在线支付' });
    } else {
      this.setData({ payment: '现金支付' });
    }
    this.setData({
      fdmindex: e.detail.value
    });
  }, 
  powerDrawer: function (e) {
    var that = this;

    var item = e.currentTarget.dataset.item;

    that.setData({ userOrder: item });

    var currentStatu = e.currentTarget.dataset.statu;
    /* 动画部分 */
    // 第1步：创建动画实例 
    var animation = wx.createAnimation({
      duration: 200, //动画时长 
      timingFunction: "linear", //线性 
      delay: 0 //0则不延迟 
    });

    // 第2步：这个动画实例赋给当前的动画实例 
    this.animation = animation;

    // 第3步：执行第一组动画 
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存 
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画 
    setTimeout(function () {
      // 执行第二组动画 
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象 
      this.setData({
        animationData: animation
      })

      //关闭 
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)

    // 显示 
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  },
  /**
   * 选择商品
   */
  selectGoods: function () {
    wx.navigateTo({
      url: '../../keymarkets/keymarkets',
    })
  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数  
  },
  bindOneInput: function (e) {
    var index = e.currentTarget.dataset.id;
    this.data.selctgoodsAr[index].selectnum = e.detail.value;
    this.setData({
      inputOneValue: e.detail.value
    })
  },
  bindSePInput: function () {
    var price = e.detail.value;
    this.setData({ service_price: price})  
  },
  bindAddPInput: function () {
    var price = e.detail.value;
    this.setData({ additional_service_price: price })
  },
  saveData: function () {

    // 构建
    var selcAr = [];
    for (var i = 0; i < this.data.selctgoodsAr.length; i++) {
      var orders = {
        goods_id: this.data.selctgoodsAr[i].id,
        amount: this.data.selctgoodsAr[i].selectnum,
        price: this.data.selctgoodsAr[i].price,
        dispatching_id: this.data.userOrder.dispatching_id
      }
      selcAr[i] = orders;
    }

    var pants = '1';
    if (this.data.payment == '现金支付') {
      this.data.processObj.process_stage = '07';
      pants = '2';
    } else if (this.data.payment == '在线支付') {
      this.data.processObj.process_stage = '06';
      pants = '1';
    }
    
    var oneStr = JSON.stringify(this.data.processObj);
    var twoStr = JSON.stringify(selcAr);


    console.log(oneStr);
    console.log(twoStr);
    console.log(pants);
    // 上传
    // this.commitOrderViewStatus(oneStr, twoStr, pants);
    this.saveForServier(oneStr, twoStr, pants, this.data.service_price, this.data.additional_service_price);
  },
  saveForServier: function (oneStr, twoStr, pants, prone, prtwo) {
    wx.showLoading({
      title: '数据提交中...',
    })
    // 提交数据
    Util.finishOrder(function (data) {
      wx.hideLoading();
      var code = data.data.code;
      if (code == "1") {
        // 上传数据成功
        wx.showModal({
          title: '提交订单成功',
          content: '请稍等，将会有师傅和您联系！',
          showCancel: false,
        })
        wx.navigateBack({})
      } else {
        wx.showToast({
          title: '提交订单失败！',
        })
      }
    }, oneStr, twoStr, pants, prone, prtwo)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var jsonclStr = options.jsonclStr;
    var userOrder = JSON.parse(jsonclStr);

    var jsonStr = options.jsonStr;
    var processObj = JSON.parse(jsonStr);

    this.setData({ service_price: userOrder.service_price })
    this.setData({ additional_service_price: userOrder.additional_service_price })
    
    this.setData({ userOrder: userOrder })
    this.setData({ processObj: processObj})
  },
  commitOrderViewStatus: function (objStr, goodsStr, payType) {
    var _this = this;
    // 获取订单详细
    app.request({
      url: 'http://192.200.200.21:9000/sbb-web' + "/phone/js/orderview/commitOrderViewStatus",
      data: {
        objStr: objStr,
        goodsStr: goodsStr,
        pay_type: payType
      },
      method: 'POST',
      loading: true,
      loadingMsg: "正在提交状态...",
      successFn: function (res) {
        if (res.data.code == 1) {
          wx.showToast({
            title: '提交成功',
          })
          wx.navigateBack({})
        } else {
          wx.showToast({
            title: '提交失败',
          })
        }
      },
      successFailFn: function () {

      },
      failFn: function () {

      }
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    wx.getStorage({
      key: 'selctgoodsAr',
      success: function (res) {
        that.setData({ selctgoodsAr: res.data });
      },
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.removeStorage({
      key: 'selctgoodsAr',
      success: function (res) { },
    })

    wx.removeStorage({
      key: 'selctgoodsNumAr',
      success: function (res) { },
    })

    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})