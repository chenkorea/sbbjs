//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    isPopping: true,//是否已经弹出  
    animPlus: {},//旋转动画  
    animCollect: {},//item位移,透明度  
    animTranspond: {},//item位移,透明度  
    animInput: {},//item位移,透明度  
    classone: 'selected',
    classtwo: '',
    classThree: '',
    orderstatus: '1',   // 1待接单  2 开工中  3完工
    userstatus: '1',  // 1待接单 2做单中  3停单中
    userstatusname: '待接单'
  },
  toMyCenter: function () {
    wx.navigateTo({
      url: '../my/my',
    })
  },
  //事件处理函数
  bindStatusViewTap: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    if (id == 1) {
      that.setData({ classone: 'selected', classtwo: '', classThree: '', orderstatus: '1' })
    } else if (id == 2) {
      that.setData({ classone: '', classtwo: 'selected', classThree: '', orderstatus: '2' })
    } else if (id == 3) {
      that.setData({ classone: '', classtwo: '', classThree: 'selected', orderstatus: '3' })
    }
  },
  //点击弹出  
  plus: function () {
    if (this.data.isPopping) {
      //缩回动画  
      this.popp();
      this.setData({
        isPopping: false
      })
    } else if (!this.data.isPopping) {
      //弹出动画  
      this.takeback();
      this.setData({
        isPopping: true
      })
    }
  },
  input: function () {
    console.log("input")
    // 做单
    this.setData({ userstatus: '2', userstatusname: '做单中'})
    this.plus();
  },
  transpond: function () {
    console.log("transpond")
    // 待接单
    this.setData({ userstatus: '1', userstatusname: '待接单' })
    this.plus();
  },
  collect: function () {
    console.log("collect")
    // 停工
    this.setData({ userstatus: '3', userstatusname: '停单中' })
    this.plus();
  },

  //弹出动画  
  popp: function () {
    //plus顺时针旋转  
    var animationPlus = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationcollect = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationTranspond = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationInput = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    animationPlus.rotateZ(360).step();
    animationcollect.translate(-180, 0).rotateZ(360).opacity(1).step();
    animationTranspond.translate(-120, 0).rotateZ(360).opacity(1).step();
    animationInput.translate(-60, 0).rotateZ(360).opacity(1).step();
    this.setData({
      animPlus: animationPlus.export(),
      animCollect: animationcollect.export(),
      animTranspond: animationTranspond.export(),
      animInput: animationInput.export(),
    })
  },
  //收回动画  
  takeback: function () {
    //plus逆时针旋转  
    var animationPlus = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationcollect = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationTranspond = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationInput = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    animationPlus.rotateZ(0).step();
    animationcollect.translate(0, 0).rotateZ(0).opacity(0).step();
    animationTranspond.translate(0, 0).rotateZ(0).opacity(0).step();
    animationInput.translate(0, 0).rotateZ(0).opacity(0).step();
    this.setData({
      animPlus: animationPlus.export(),
      animCollect: animationcollect.export(),
      animTranspond: animationTranspond.export(),
      animInput: animationInput.export(),
    })
  },


  onLoad: function (options) {
    // 生命周期函数--监听页面加载  
  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成  
  },
  onShow: function () {
    // 生命周期函数--监听页面显示  
  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏  
  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载  
  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作  
  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数  
  },
  onShareAppMessage: function () {
    // 用户点击右上角分享  
    return {
      title: 'title', // 分享标题  
      desc: 'desc', // 分享描述  
      path: 'path' // 分享路径  
    }
  }
})  
