// finishorder.js
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
    fdmindex: 0
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
  saveData: function () {
    // 上传
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var jsonStr = options.jsonStr;

    var userOrder = JSON.parse(jsonStr);

    this.setData({ userOrder: userOrder })
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