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
   * 获取服务项目。
   */
  getServiceTypes: function () {
    var _this = this;

    app.request({
      url: "phone/js/user/service_types",
      method: 'GET',
      loading: true,
      loadingMsg: "正在加载个人信息",
      beforSendFn: function () {
        _this.serviceTypesFlag = 1;
      },
      successFn: function (res) {
        _this.serviceTypesFlag = 2;

        // 所有的服务项目
        var serviceTypes = [];
        // 技师已有的服务项目
        var myServiceTypes = [];

        if (app.isNotBlank(app.getUserInfo().service_types)) {
          myServiceTypes = app.getUserInfo().service_types.split(",");
        }

        // 构建所有的服务项目，用于显示
        for (var i = 0; i < res.data.content.length; i++) {
          var e = res.data.content[i];

          serviceTypes.push({
            name: e.data_name,
            value: e.data_code,
            order: e.data_order,
            checked: false
          });

          // 选中技师已有的服务项目
          for (var j = 0; j < myServiceTypes.length; j++) {
            var code = serviceTypes[i].value;
            var myCode = myServiceTypes[j];

            if (code == myCode) {
              serviceTypes[i].checked = true;

              // 退出二层循环，提高效率
              break;
            }
          }
        }

        // 升序排序
        serviceTypes = app.sortObjArray(serviceTypes, "order", "asc");

        _this.setData({
          serviceTypesItems: serviceTypes
        });
      },
      successFailFn: function () {
        _this.serviceTypesFlag = 3;
      },
      failFn: function () {
        _this.serviceTypesFlag = 3;
      }
    });
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
        _this.myFlag = 2;

        // 设置用户信息
        app.setUserInfo(res.data.content[0]);
        // 获取所有服务项目
        _this.getServiceTypes();
      },
      successFailFn: function () {
        _this.myFlag = 3;
      },
      failFn: function () {
        _this.myFlag = 3;
      }
    });
  },
  onReady: function () { // 初始化
    var _this = this;

    _this.getMy();
  }
});