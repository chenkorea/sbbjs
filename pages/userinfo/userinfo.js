// 获取工具实例
var util = require('../utils/util.js');
// 获取应用实例
var app = getApp();

Page({
  data: {
    name: '',
    nameFocus: false,
    idNumber: '',
    idNumberFocus: false,
    city: '',
    serviceTypesItems: [],
    myFlag: 1, // 获取个人信息的标记：1-获取中；2-获取成功；3-获取失败
    serviceTypesFlag: 1 // 获取服务项目的标记：1-获取中；2-获取成功；3-获取失败
  },
  bindNameInput: function (e) { // 设置姓名
    var _this = this;

    _this.setData({
      name: e.detail.value
    });
  },
  bindIdNumberInput: function (e) { // 设置身份证号
    var _this = this;

    _this.setData({
      idNumber: e.detail.value
    });
  },
  bindCityInput: function (e) {
    var _this = this;

    _this.setData({
      city: e.detail.value
    });
  },
  bindServiceTypesChange: function (e) {

  },

  /**
   * 获取个人信息。
   */
  getMy: function () {
    var _this = this;

    app.request({
      url: "phone/js/user/my",
      data: {
        id: app.getUserInfo().id
      },
      method: 'GET',
      loading: true,
      loadingMsg: "正在加载个人信息",
      beforSendFn: function () {
        _this.myFlag = 1;
      },
      successFn: function (res) {
        console.log("getMy--->" + JSON.stringify(res));

        _this.myFlag = 2;

        // 设置用户信息
        app.setUserInfo(res.data.content[0]);
      },
      successFailFn: function () {
        _this.myFlag = 3;
      },
      failFn: function () {
        _this.myFlag = 3;
      }
    });
  },

  /**
   * 获取服务项目。
   */
  getServiceTypes: function () {
    var _this = this;

    app.request({
      url: "phone/js/user/service_types",
      method: 'GET',
      loading: true,
      loadingMsg: "正在加载个人信息",
      beforSendFn: function() {
        _this.serviceTypesFlag = 1;
      },
      successFn: function (res) {
        console.log("getServiceTypes--->" + JSON.stringify(res));

        _this.serviceTypesFlag = 2;
      },
      successFailFn: function () {
        _this.serviceTypesFlag = 3;
      },
      failFn: function () {
        _this.serviceTypesFlag = 3;
      }
    });
  },
  onReady: function () { // 初始化
    var _this = this;

    _this.getMy();
    _this.getServiceTypes();
  }
});