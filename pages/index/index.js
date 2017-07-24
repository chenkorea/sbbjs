//index.js
//获取应用实例
var app = getApp();

Page({
  data: {
    isPopping: true,//是否已经弹出  
    animPlus: {},//旋转动画  
    // animCollect: {},//item位移,透明度  
    animTranspond: {},//item位移,透明度  
    animInput: {},//item位移,透明度  
    classone: 'selected',
    classtwo: '',
    classThree: '',
    classFour:'',
    classFive:'',
    orderstatus: '1',   // 1待接单  2 开工中  3完工
    userstatus: '1',  // 1待接单 2做单中  3停单中
    userstatusname: '接单中',
    showClass: 'img-plus-style'
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
      that.setData({ classone: 'selected', classtwo: '', classThree: '', classFour: '', classFive: '', orderstatus: '1' })
    } else if (id == 2) {
      that.setData({ classone: '', classtwo: 'selected', classThree: '', classFour: '', classFive: '', orderstatus: '2' })
    } else if (id == 3) {
      that.setData({ classone: '', classtwo: '', classThree: 'selected', classFour: '', classFive: '', orderstatus: '3' })
    } else if(id == 4) {
      that.setData({ classone: '', classtwo: '', classThree: '', classFour: 'selected', classFive: '', orderstatus: '4' })
    } else if(id == 5) {
      that.setData({ classone: '', classtwo: '', classThree: '', classFour: '', classFive: 'selected', orderstatus: '5' })
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
  // 技师状态 1：接单中 2：停单中
  input: function () {
    console.log("input")
    // 接单中
    this.setData({ userstatus: '1', userstatusname: '接单中', showClass: 'img-plus-style' })
    this.plus();
  },
  transpond: function () {
    console.log("transpond")
    // 待接单
    this.setData({ userstatus: '2', userstatusname: '停单中', showClass: 'img-plus-style img-style-2'})
    this.plus();
  },
  // collect: function () {
  //   console.log("collect")
  //   // 停工
  //   this.setData({ userstatus: '3', userstatusname: '停单中' })
  //   this.plus();
  // },

  //弹出动画  
  popp: function () {
    //plus顺时针旋转  
    var animationPlus = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    // var animationcollect = wx.createAnimation({
    //   duration: 500,
    //   timingFunction: 'ease-out'
    // })
    var animationTranspond = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationInput = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    animationPlus.rotateZ(360).step();
    // animationcollect.translate(-180, 0).rotateZ(360).opacity(1).step();
    animationTranspond.translate(-120, 0).rotateZ(360).opacity(1).step();
    animationInput.translate(-60, 0).rotateZ(360).opacity(1).step();
    this.setData({
      animPlus: animationPlus.export(),
      // animCollect: animationcollect.export(),
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
    // var animationcollect = wx.createAnimation({
    //   duration: 500,
    //   timingFunction: 'ease-out'
    // })
    var animationTranspond = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationInput = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    animationPlus.rotateZ(0).step();
    // animationcollect.translate(0, 0).rotateZ(0).opacity(0).step();
    animationTranspond.translate(0, 0).rotateZ(0).opacity(0).step();
    animationInput.translate(0, 0).rotateZ(0).opacity(0).step();
    this.setData({
      animPlus: animationPlus.export(),
      // animCollect: animationcollect.export(),
      animTranspond: animationTranspond.export(),
      animInput: animationInput.export(),
    })
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
