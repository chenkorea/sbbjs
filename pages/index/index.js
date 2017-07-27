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
    showClass: 'img-plus-style',
    jsDetailVos: [],
    jsDetailVosOne: [],
    jsDetailVosTwo: [],
    jsDetailVosThree: [],
    jsDetailVosFour: [],
    jsDetailVosFive: [],
    orderAllCount: 0,
    showModalStatus: false,
    userOrder:{},
    selctgoods: {},
    inputOneValue: '',
    inputTwoValue: '',
    inputThreeValue: '',
    allPrice:'',
    payment: '在线支付',
    payments: ['在线支付', '现金支付'],
    fdmindex: 0,
    weixinUserInfo: {},
    orderAllCount: 0
  },
  toMyCenter: function () {
    wx.navigateTo({
      url: '../my/my',
    })
  },
  listenerPickerFDMSelected: function (e) {
    //改变index值，通过setData()方法重绘界面
    if (e.detail.value == 0) {
      this.setData({ payment: '在线支付'});  
    } else {
      this.setData({ payment: '现金支付' });  
    }
    this.setData({
      fdmindex: e.detail.value
    });
  }, 
  //事件处理函数
  bindStatusViewTap: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    if (id == 1) {
      that.setData({ classone: 'selected', classtwo: '', classThree: '', classFour: '', classFive: '', orderstatus: '1'});
      if (app.isArray(that.data.jsDetailVosOne) && that.data.jsDetailVosOne.length == 0) {
        that.getOrderTaking();
      } else {
        that.setData({ jsDetailVos: that.data.jsDetailVosOne});
      }
      
    } else if (id == 2) {
      that.setData({ classone: '', classtwo: 'selected', classThree: '', classFour: '', classFive: '', orderstatus: '2'})
      if (app.isArray(that.data.jsDetailVosTwo) && that.data.jsDetailVosTwo.length == 0) {
        that.getOrderListByStatus('04');
      } else {
        that.setData({ jsDetailVos: that.data.jsDetailVosTwo });
      }
    } else if (id == 3) {
      that.setData({ classone: '', classtwo: '', classThree: 'selected', classFour: '', classFive: '', orderstatus: '3'})
      if (app.isArray(that.data.jsDetailVosThree) && that.data.jsDetailVosThree.length == 0) {
        that.getOrderListByStatus('05');
      } else {
        that.setData({ jsDetailVos: that.data.jsDetailVosThree });
      }
    } else if(id == 4) {
      that.setData({ classone: '', classtwo: '', classThree: '', classFour: 'selected', classFive: '', orderstatus: '4'})
      if (app.isArray(that.data.jsDetailVosFour) && that.data.jsDetailVosFour.length == 0) {
         that.getOrderListByStatus('06');
      } else {
        that.setData({ jsDetailVos: that.data.jsDetailVosFour });
      }
    } else if(id == 5) {
      that.setData({ classone: '', classtwo: '', classThree: '', classFour: '', classFive: 'selected', orderstatus: '5'})
      if (app.isArray(that.data.jsDetailVosFive) && that.data.jsDetailVosFive.length == 0) {
        that.getOrderListByStatus('07');
      } else {
        that.setData({ jsDetailVos: that.data.jsDetailVosFive });
      }
    }
    // that.getQuery();
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
    this.changeUserStatus('1');
    // 接单中
    this.setData({ userstatus: '1', userstatusname: '接单中', showClass: 'img-plus-style' })
    this.plus();
  },
  transpond: function () {

    this.changeUserStatus('2');
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
    // animationPlus.rotateZ(360).step();
    // // animationcollect.translate(-180, 0).rotateZ(360).opacity(1).step();
    // animationTranspond.translate(-120, 0).rotateZ(360).opacity(1).step();
    // animationInput.translate(-60, 0).rotateZ(360).opacity(1).step();

    animationPlus.rotateZ(360).step();
    // animationcollect.translate(-100, -100).rotateZ(180).opacity(1).step();
    animationTranspond.translate(-90, 0).rotateZ(360).opacity(1).step();
    animationInput.translate(-60, -70).rotateZ(360).opacity(1).step();  


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
  },

  onLoad: function () {
    
    //预加载可接单数据

    this.getOrderTaking();
    this.getOrderViewAllCount();
    this.getUserCurStatus();
    wx.getUserInfo({
      success: function (res) {
        var _this = this;
        _this.setData({ weixinUserInfo: res.userInfo});
        var userInfo = res.userInfo;
        var nickName = userInfo.nickName;
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女 
        var province = userInfo.province 
        var city = userInfo.city 
        var country = userInfo.country 
        } 
    })

  },

  getOrderListByStatus: function (status) {
    var userInfo = app.getUserInfo();

    if (!userInfo.id) {
      wx.showToast({
        title: '用户信息不正确或为空',
        duration: 3000
      });
      // 校验密码
    } else {
      var _this = this;
      // 获取订单详细
      app.request({
        url: "/phone/js/orderview/getOrderViewAll",
        data: {
          order_type: status,
          jsID: userInfo.id
        },
        method: 'GET',
        loading: true,
        loadingMsg: "正在查询订单...",
        successFn: function (res) {
          if (res.data.code == 1) {
            _this.setData({ jsDetailVos: res.data.content });
            if (status == '04') {         
              _this.setData({ jsDetailVosTwo: res.data.content });
            } else if (status == '05') {
              _this.setData({ jsDetailVosThree: res.data.content });
            } else if (status == '06') {
              _this.setData({ jsDetailVosFour: res.data.content });
            } else if (status == '07') {
              _this.setData({ jsDetailVosFive: res.data.content });
            }
          }
        },
        successFailFn: function () {

        },
        failFn: function () {

        }
      });
    }
  },

  getOrderTaking: function () {
    var userInfo = app.getUserInfo();

    if (!userInfo.id) {
      wx.showToast({
        title: '用户信息不正确或为空',
        duration: 3000
      });
      // 校验密码
    } else {
      var _this = this;
      // 获取订单详细
      app.request({
        url: "/phone/js/orderview/getOrderViewTakingAll",
        data: {
          jsID: userInfo.id
        },
        method: 'GET',
        loading: true,
        loadingMsg: "正在查询订单...",
        successFn: function (res) {
          if (res.data.code == 1) {
            _this.setData({ jsDetailVos: res.data.content });
            _this.setData({ jsDetailVosOne: res.data.content });
          }
        },
        successFailFn: function () {

        },
        failFn: function () {

        }
      });
    }
  },

  getOrderViewAllCount: function () {
    var userInfo = app.getUserInfo();

    if (!userInfo.id) {
      wx.showToast({
        title: '用户信息不正确或为空',
        duration: 3000
      });
      // 校验密码
    } else {
      var _this = this;
      // 获取订单详细
      app.request({
        url: "/phone/js/orderview/getOrderViewAllCount",
        data: {
          jsID: userInfo.id
        },
        method: 'GET',
        loading: true,
        loadingMsg: "正在查询...",
        successFn: function (res) {
          if (res.data.code == 1) {
            _this.setData({ orderAllCount: res.data.content[0].order_count });
          } else {
            _this.setData({ orderAllCount: 0 });
          }
        },
        successFailFn: function () {

        },
        failFn: function () {

        }
      });
    }
  },

  getUserCurStatus: function (status) {
    var userInfo = app.getUserInfo();

    if (!userInfo.id) {
      wx.showToast({
        title: '用户信息不正确或为空',
        duration: 3000
      });
      // 校验密码
    } else {
      var _this = this;
      // 获取订单详细
      app.request({
        url: "/phone/js/orderview/getUserCurStatus",
        data: {
          jsID: userInfo.id
        },
        method: 'GET',
        loading: true,
        loadingMsg: "正在查询...",
        successFn: function (res) {
          if (res.data.code == 1) {
            console.log(res.data.content.status_str)
            if (res.data.content[0].status == '2') {
              _this.setData({ userstatus: res.data.content[0].status, userstatusname: res.data.content[0].status_str, showClass: 'img-plus-style img-style-2'});
            } else {
              _this.setData({ userstatus: res.data.content[0].status, userstatusname: res.data.content[0].status_str, showClass: 'img-plus-style' });
            }
          }
        },
        successFailFn: function () {

        },
        failFn: function () {

        }
      });
    }
  },

  changeUserStatus: function (status) {
    var userInfo = app.getUserInfo();

    if (!userInfo.id) {
      wx.showToast({
        title: '用户信息不正确或为空',
        duration: 3000
      });
      // 校验密码
    } else {
      var _this = this;
      // 获取订单详细
      app.request({
        url: "/phone/js/orderview/changeUserStatus",
        data: {
          userId: userInfo.id,
          status: status
        },
        method: 'POST',
        loading: true,
        loadingMsg: "正在修改用户状态...",
        successFn: function (res) {
          if (res.data.code == 1) {
            
          }
        },
        successFailFn: function () {

        },
        failFn: function () {

        }
      });
    }
  },

  bindChangeStatusClick: function (e) {
    var that = this;
    var userInfo = app.getUserInfo();
    var id = e.currentTarget.dataset.id;
    var orderId = e.currentTarget.dataset.orderid;
    console.log(orderId)
    
    //构建添加额外商品list
    var goods = new Array();

    var obj = new Object(); 
    obj.process_person_id = userInfo.id;
    obj.process_person_name = userInfo.name;
    obj.order_id = orderId;
    //支付方式 1：在线支付 2：现金
    var payType = "";
  
    if(id == '04') {//点击开工
      obj.process_stage = '05';
    } else if (id == '02') {//点击抢单
      obj.process_stage = '04';
    } else if (id == '03') {//点击接单
      obj.process_stage = '04';
    } else if(id == '05') {//点击完成
      //跳转到额外添加商品页面
      wx.navigateTo({
        url: '../my/orderprocess/orderprocess'
      })

      // payType = '1';
      if (payType == '1') {
        obj.process_stage = '06'; //待支付
      } else if(payType == '2'){
        obj.process_stage = '07'; //直接完工,待评价
      }
    }

    var jsonStr = JSON.stringify(obj);
    var jsonGoodsStr = JSON.stringify(goods);
    that.commitOrderViewStatus(jsonStr, id, jsonGoodsStr, payType);
    console.log(jsonStr)
  },

  commitOrderViewStatus: function (objStr, beforeStatus, goodsStr, payType) {
    var userInfo = app.getUserInfo();
    
    if (!userInfo.id) {
      wx.showToast({
        title: '用户信息不正确或为空',
        duration: 3000
      });
      // 校验密码
    } else {
      var _this = this;
      // 获取订单详细
      app.request({
        url: "/phone/js/orderview/commitOrderViewStatus",
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
            if (beforeStatus == '02' || beforeStatus == '03') {
              _this.getOrderListByStatus('04');
              _this.getOrderTaking();
            } else if (beforeStatus == '04'){
              _this.getOrderListByStatus('05');
              _this.getOrderListByStatus(beforeStatus);
            } else if (beforeStatus == '05') {
              _this.getOrderListByStatus('06');
              _this.getOrderListByStatus(beforeStatus);
            }
            console.log('成功')
          }
        },
        successFailFn: function () {

        },
        failFn: function () {

        }
      });
    }
  },
  
  bindItemClick: function (e) {
    var that = this;
    var userInfo = app.getUserInfo();
    var item = e.currentTarget.dataset.item;
    var jsonStr = JSON.stringify(item);
    wx.navigateTo({
      url: '../my/orderprocess/orderprocess?jsonStr=' + jsonStr,
    })
  },
  finishWork: function (e) {
    var that = this;
    var userInfo = app.getUserInfo();
    var item = e.currentTarget.dataset.item;
    var jsonStr = JSON.stringify(item);
    wx.navigateTo({
      url: '../index/finishorder/finishorder?jsonStr=' + jsonStr,
    })
  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作  
    this.getOrderTaking();

  },

  // splitArray: function (array) {
  //   var _this = this;
  //   var temArrayOne = new Array();
  //   var temArrayTwo = new Array();
  //   var temArrayThree = new Array();
  //   var temArrayFour = new Array();
  //   var temArrayFive = new Array();
  //   for(var i = 0; i < array.length; i++) {
  //     var obj = array[i];
  //     //抢单和派单
  //     if (obj.current_status == '02' || obj.current_status == '03') {
  //       temArrayOne.push(obj);
  //     } else if (obj.current_status == '04') {//已接单
  //       temArrayTwo.push(obj);
  //     } else if (obj.current_status == '05') {//已开工
  //       temArrayThree.push(obj);
  //     } else if (obj.current_status == '06') {//待支付
  //       temArrayFour.push(obj);
  //     } else if (obj.current_status == '07') {//已支付，完成
  //       temArrayFive.push(obj);
  //     }
  //   }
  //   _this.setData({ jsDetailVos: temArrayOne, jsDetailVosOne: temArrayOne, jsDetailVosTwo: temArrayTwo, jsDetailVosThree: temArrayThree, jsDetailVosFour: temArrayFour, jsDetailVosFive: temArrayFive});
  // }
})  
