//index.js
//获取应用实例
var app = getApp();
var Util = require('../../utils/address.js')
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
var timer;
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
    orderAllCount: 0,
    username:'',
    isCommitSuccess: false,
    isLoading: true,
    loadingComplete: false
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
    that.changeStatus(id);
    // that.getQuery();
    // that.setData({ jsDetailVosOne: []})
    // that.setData({ jsDetailVosTwo: [] })
    // that.setData({ jsDetailVosThree: [] })
    // that.setData({ jsDetailVosFour: [] })
    // that.setData({ jsDetailVosFive: [] })
  },
  changeStatus: function (id) {
    var that = this;
    if (id == 1) {
      that.setData({ classone: 'selected', classtwo: '', classThree: '', classFour: '', classFive: '', orderstatus: '1' });
      that.getOrderTaking();
      // if (app.isArray(that.data.jsDetailVosOne) && that.data.jsDetailVosOne.length == 0) {
       
      // } else {
      //   that.setData({ jsDetailVos: that.data.jsDetailVosOne });
      // }

    } else if (id == 2) {
      that.setData({ classone: '', classtwo: 'selected', classThree: '', classFour: '', classFive: '', orderstatus: '2' })
        that.getOrderListByStatus('04,02');
      // if (app.isArray(that.data.jsDetailVosTwo) && that.data.jsDetailVosTwo.length == 0) {
      // } else {
      //   that.setData({ jsDetailVos: that.data.jsDetailVosTwo });
      // }
    } else if (id == 3) {
      that.setData({ classone: '', classtwo: '', classThree: 'selected', classFour: '', classFive: '', orderstatus: '3' })
        that.getOrderListByStatus('05');
      // if (app.isArray(that.data.jsDetailVosThree) && that.data.jsDetailVosThree.length == 0) {
      // } else {
      //   that.setData({ jsDetailVos: that.data.jsDetailVosThree });
      // }
    } else if (id == 4) {
      that.setData({ classone: '', classtwo: '', classThree: '', classFour: 'selected', classFive: '', orderstatus: '4' })
        that.getUserOrderNOPAY('06');
      // if (app.isArray(that.data.jsDetailVosFour) && that.data.jsDetailVosFour.length == 0) {
      // } else {
      //   that.setData({ jsDetailVos: that.data.jsDetailVosFour });
      // }
    } else if (id == 5) {
      that.setData({ classone: '', classtwo: '', classThree: '', classFour: '', classFive: 'selected', orderstatus: '5' })
      if (app.isArray(that.data.jsDetailVosFive) && that.data.jsDetailVosFive.length == 0) {
          that.getUserOrderFinish('07');
      } else {
        that.setData({ jsDetailVos: that.data.jsDetailVosFive });
      }
    }
  },

  changeOrderTop: function (id) {
    var that = this;
    if (id == 1) {
      that.setData({ classone: 'selected', classtwo: '', classThree: '', classFour: '', classFive: '', orderstatus: '1' });
    } else if (id == 2) {
      that.setData({ classone: '', classtwo: 'selected', classThree: '', classFour: '', classFive: '', orderstatus: '2' })
      
    } else if (id == 3) {
      that.setData({ classone: '', classtwo: '', classThree: 'selected', classFour: '', classFive: '', orderstatus: '3' })
      
    } else if (id == 4) {
      that.setData({ classone: '', classtwo: '', classThree: '', classFour: 'selected', classFive: '', orderstatus: '4' })
      
    } else if (id == 5) {
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
    this.changeUserStatus('1');
    // 接单中
    this.setData({ userstatus: '1', userstatusname: '接单中', showClass: 'img-plus-style' })
    this.plus();
  },
  transpond: function () {

    this.changeUserStatus('3');
    // 待接单
    this.setData({ userstatus: '3', userstatusname: '休息中', showClass: 'img-plus-style img-style-2'})
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

  onShow: function () {
    var that = this;
    var status = that.data.orderstatus;
    console.log(status + 'sdfsdfsf');
    if (that.data.isCommitSuccess) {
      that.changeOrderTop(status);
      that.getOrderListByStatus('05');
      if (status == '4') {
        that.getUserOrderFinish('07');
        that.getUserOrderNOPAY('06');
      } else if(status == '5') {
        that.getUserOrderNOPAY('06');
        that.getUserOrderFinish('07');
      }
    }
    
    // 调用接口
    // qqmapsdk.search({
    //   keyword: '酒店',
    //   success: function (res) {
    //     console.log(res);
    //   },
    //   fail: function (res) {
    //     console.log(res);
    //   },
    //   complete: function (res) {
    //     console.log(res);
    //   }
    // })
    // 调用接口 
    // qqmapsdk.calculateDistance({
    //   mode: 'driving',//步行，驾车为'driving'
    //   to: [{ latitude: 26.647661, longitude: 106.730154 }],
    //    success: function(res) { 
    //      if (res.status == 0) {
    //        //米为单位
    //        console.log(res.result.elements[0].distance);
    //        //表示从起点到终点的结合路况的时间，秒为单位
    //        console.log(res.result.elements[0].duration);
    //      }
    //    }, 
    //    fail: function(res) {
    //       console.log(res);
    //    },
    //   complete: function(res) { 
    //     console.log(res); 
    //   } 
    // })
    // qqmapsdk.geocoder({
    //   address: '贵州省贵阳市南明区贵乌中路27号',
    //   success: function (res) {
    //     console.log(res);
    //   },
    //   fail: function (res) {
    //     console.log(res);
    //   },
    //   complete: function (res) {
    //     console.log(res);
    //   }
    // })
    // var distance = Util.getFlatternDistance(26.647661, 106.630154, 26.64766, 106.730153);
    // console.log(distance + 'sdfsdfs')
  },

  getCurrentLoc: function () {
    Util.getLocationInfoCT(function (e) {
      if (!((typeof e === "undefined") || (e == null))) {
        wx.setStorageSync("latObj", e);
        console.log('ctQQLoc' + e.latitude + ' ' + e.longitude + ' ')
      }
    })
  },
  onLoad: function () {
    qqmapsdk = new QQMapWX({
      key: 'ZNIBZ-3WJHJ-BP2FP-FJM5E-6ZBCQ-O2B5H'
    });
 
    //预加载可接单数据
    var userInfo = app.getUserInfo();
    this.getOrderTaking();
    this.getOrderViewAllCount();
    this.getUserCurStatus();
    this.setData({ weixinUserInfo: wx.getStorageSync("weixinUserInfo")});
    this.setData({ username: userInfo.name });
    timer = setInterval(this.getCurrentLoc, 30 * 60 * 1000); //30分钟刷新一次
  },

  onUnload: function() { 
    clearInterval(timer); 
  },

  getUserOrderFinish: function (status) {
    var that = this;
    wx.showLoading({
      title: '查询订单中...',
    })
    var userInfo = app.getUserInfo();
    // 提交数据
    Util.getUserOrderFinish(function (res) {
      wx.hideLoading();
      var code = res.data.code;
      if (code == "1") {
        // 数据成功
        that.setData({ jsDetailVos: res.data.content });
       if (status == '07') {
          that.setData({ jsDetailVosFive: res.data.content });
        }
      } else {
        wx.showToast({
          title: '查询订单失败！',
        })
      }
    }, userInfo.id)
  },
  getUserOrderNOPAY: function (status) {
    var that = this;
    wx.showLoading({
      title: '查询订单中...',
    })
    var userInfo = app.getUserInfo();
    // 提交数据
    Util.getUserOrderNOPAY(function (res) {
      wx.hideLoading();
      var code = res.data.code;
      if (code == "1") {
        // 数据成功
        that.setData({ jsDetailVos: res.data.content });
        if (status == '06') {
          that.setData({ jsDetailVosFour: res.data.content });
        } 
      } else {
        wx.showToast({
          title: '查询订单失败！',
        })
      }
    }, userInfo.id)
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
            console.log(res.data.content);
            _this.setData({ jsDetailVos: res.data.content });
            if (status == '04,02') {         
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
    var _this = this;
    var userInfo = app.getUserInfo();
    _this.setData({ jsDetailVos: []});
    if (!userInfo.id) {
      wx.showToast({
        title: '用户信息不正确或为空',
        duration: 3000
      });
      // 校验密码
    } else {
     
      // 获取订单详细
      app.request({
        url: "phone/js/orderview/getOrderViewTakingAll",
        data: {
          jsID: userInfo.id,
          serviceType: app.getUserInfo().service_types
        },
        method: 'GET',
        loading: true,
        loadingMsg: "正在查询订单...",
        successFn: function (res) {
          if (res.data.code == 1) {
            
            if ('不可接单状态' == res.data.content[0]) {
              wx.showModal({
                title: '提示',
                content: '当前为休息状态，不能接单',
                showCancel: false
              })
            } else {
                // console.log(res.data.content);
                // _this.setData({ jsDetailVos: res.data.content });
                // _this.setData({ jsDetailVosOne: res.data.content });
                _this.filterByDistance(res.data.content);
            }
          } else if (res.data.code == 2) {

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

  filterByDistance: function (list) {
 
    var that = this;
    var listTemp = new Array();
    var listShow = new Array();
    var listDispatch = new Array();

    var locObj = wx.getStorageSync('latObj');
    var latitude = locObj.latitude;
    var longitude = locObj.longitude;
    console.log('ctllll' + latitude + ' ' + longitude)
    for (var i = 0; i < list.length; i++) {
      var obj = list[i];
      if (obj.current_status == '01') {//只过滤抢单的
        listTemp.push(obj);
      } else {
        listDispatch.push(obj);
      }
    }
    var index = 0;
    for (var i = 0; i < listTemp.length; i++) {
      console.log(i+'sdsssss')
      var obj = listTemp[i];
      var addr = obj.popedom_name + obj.service_address;
        // qqmapsdk.geocoder({
        //   address: '贵州省贵阳市云岩区贵乌中路27号',
        //   success: function (res) {
           
        //     if (status == 0) {
          
        //       console.log('ct' + latitude + ' ' + longitude + ' ' + res.result.location.lat + ' ' + res.result.location.lng);
        //       var distance = parseInt(Util.getFlatternDistance(latitude, longitude, res.result.location.lat, res.result.location.lng));
        //       console.log('distance = ' + distance)

        //       wx.showToast({
        //         title: '进入',
        //         duration: 3000
        //       });

        //       if (distance < 1000) {//当半径大于2000米时，不允许抢单（不显示）
        //         console.log('来这里了')
        //         listShow.push(obj);          
        //       }
        //       // console.log(i + ' ' + listTemp.length)
        //       // console.log(index == listTemp.length - 1)
        //       if (index == listTemp.length - 1) {
        //         // console.log(' listDispatch.length = ' + listDispatch.length)
        //         listShow = listShow.concat(listDispatch); 
        //         that.setData({ jsDetailVos: listShow });
        //         that.setData({ jsDetailVosOne: listShow });
        //       }
        //     }
        //     index++;
        //   },
        //   fail: function (res) {
        //     console.log(res);
        //   },
        //   complete: function (res) {
        //     console.log(res);
        //   }
        // })
      Util.getLocationLatLonByAddr(addr, function (e) {
        if (!((typeof e === "undefined") || (e == null))) {
          console.log('ct' + latitude + ' ' + longitude + ' ' + e.location.lat + ' ' + e.location.lng + ' ');
          var distance = parseInt(Util.getFlatternDistance(latitude, longitude, e.location.lat, e.location.lng));
            console.log('distance = ' + distance)

            // wx.showToast({
            //   title: distance + '进入',
            //   duration: 3000
            // });

            if (distance < 1000) {//当半径大于2000米时，不允许抢单（不显示）
              console.log('来这里了')
              listShow.push(obj);          
            }
            if (index == listTemp.length - 1) {
              listShow = listShow.concat(listDispatch); 
              that.setData({ jsDetailVos: listShow });
              that.setData({ jsDetailVosOne: listShow });
            }
            index++;
        }
      })


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
    console.log(status);
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
      that.changeOrderTop(3);
    } else if (id == '02') {//点击抢单
      obj.process_stage = '02';
      that.changeOrderTop(2);
    } else if (id == '03') {//点击接单
      obj.process_stage = '04';
      that.changeOrderTop(2);
    }

    var jsonStr = JSON.stringify(obj);
    var jsonGoodsStr = JSON.stringify(goods);
    if (id == '05') {
      // 跳转
      var item = e.currentTarget.dataset.item;
      var jsonclStr = JSON.stringify(item);
      that.setData({ isCommitSuccess: false });
      wx.navigateTo({
        url: '../index/finishorder/finishorder?jsonclStr=' + jsonclStr + '&jsonStr=' + jsonStr,
      })
    
    } else {
      that.commitOrderViewStatus(jsonStr, id, jsonGoodsStr, payType);
      console.log(jsonStr)
    }
    
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
              _this.getOrderTaking();
              _this.getOrderListByStatus('04,02');
              _this.changeOrderTop(2);
            } else if (beforeStatus == '04'){
              _this.getOrderListByStatus('04,02');
              _this.getOrderListByStatus('05');
              _this.changeOrderTop(3);
            } else if (beforeStatus == '05') {           
              _this.getOrderListByStatus(beforeStatus);
              _this.getUserOrderNOPAY('06');
              // _this.changeOrderTop(3);
            }

            console.log('成功')
          } else if (res.data.code == -19) {
            wx.showToast({
              title: '对不起，别人抢先一步了',
              duration: 3000
            });
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

  }

  // getLocationInfo
})  
