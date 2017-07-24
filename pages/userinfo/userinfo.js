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
    serviceTypesItemsTmp: [],
    idNumberImageItems: [],
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
  bindServiceTypesChange: function (e) { // 选择服务项目
    var _this = this;

    _this.setData({
      serviceTypesItems: e.detail.value
    });
  },
  bindIdNumberImageIconTap: function (e) { // 删除身份证照片
    var _this = this;
    var idNumberImageItemsTmp1 = _this.data.idNumberImageItems;
    // 取出数组索引
    var index = (e.currentTarget.dataset.index - 1);

    // 删除 index 指定的元素
    idNumberImageItemsTmp1.splice(index, 1);

    // 从新整理数组
    var idNumberImageItemsTmp2 = [];

    for (var i = 0; i < idNumberImageItemsTmp1.length; i++) {
      var eTmp = idNumberImageItemsTmp1[i];

      idNumberImageItemsTmp2.push({
        id: "",
        path: eTmp.path,
        size: eTmp.size,
        index: (i + 1),
        pathSize: "140rpx"
      });
    }

    _this.setData({
      idNumberImageItems: idNumberImageItemsTmp2
    });
  },
  bindUploadIdNumberImageTap: function (e) { // 上传身份证照片
    var _this = this;

    wx.chooseImage({
      count: 9,
      sizeType: ["original"],
      success: function (res) {
        var idNumberImageItemsTmp = _this.data.idNumberImageItems;

        for (var i = 0; i < res.tempFiles.length; i++) {
          var file = res.tempFiles[i];

          idNumberImageItemsTmp.push({
            id: "",
            path: file.path,
            size: file.size,
            index: (idNumberImageItemsTmp.length + 1),
            pathSize: "140rpx"
          });
        }

        _this.setData({
          idNumberImageItems: idNumberImageItemsTmp
        });
      }
    });
  },
  bindSaveTap: function (e) { // 保存
    var _this = this;

    // 校验姓名为空
    if (app.isBlank(_this.data.name)) {
      wx.showModal({
        title: '提示',
        content: '请输入姓名！',
        showCancel: false,
        complete: function (res) {
          _this.setData({
            nameFocus: true
          });
        }
      });

      // 校验身份证号为空
    } else if (app.isBlank(_this.data.idNumber)) {
      wx.showModal({
        title: '提示',
        content: '请输入身份证号！',
        showCancel: false,
        complete: function (res) {
          _this.setData({
            idNumberFocus: true
          });
        }
      });

      // 校验身份证号格式是否正确
    } else if (!app.checkIdNumber(_this.data.idNumber)) {
      wx.showModal({
        title: '提示',
        content: '身份证号格式不正确！',
        showCancel: false,
        complete: function (res) {
          _this.setData({
            idNumberFocus: true
          });
        }
      });

      // 校验是否选择服务项目
    } else if (!app.isArray(_this.data.serviceTypesItems) || (_this.data.serviceTypesItems.length == 0)) {
      wx.showModal({
        title: '提示',
        content: '至少选择一个服务项目！',
        showCancel: false
      });

      // 校验是否上传身份证照片
    } else if (!app.isArray(_this.data.idNumberImageItems) || (_this.data.idNumberImageItems.length == 0)) {
      wx.showModal({
        title: '提示',
        content: '至少上传一张身份证照片！',
        showCancel: false
      });
    } else {
      if (_this.data.myFlag == 1) {
        wx.showModal({
          title: '提示',
          content: '正在获取个人信息…',
          showCancel: false
        });
      } else if (_this.data.myFlag == 3) {
        wx.showModal({
          title: '提示',
          content: '获取个人信息失败，稍后再试！',
          showCancel: false
        });
      } else if (_this.data.serviceTypesFlag == 1) {
        wx.showModal({
          title: '提示',
          content: '正在获取服务项目…',
          showCancel: false
        });
      } else if (_this.data.serviceTypesFlag == 3) {
        wx.showModal({
          title: '提示',
          content: '获取服务项目失败，稍后再试！',
          showCancel: false
        });
      } else {
        // 上传身份证照片
        for (var i = 0; _this.data.idNumberImageItems.length; i++) {
          var idNumberImage = _this.data.idNumberImageItems[i];

          app.uploadFile({
            url: "/phone/openkeyuploadMobileFile",
            name: "file",
            loading: true,
            filePath: idNumberImage.path,
            formData: {
              parent_id: app.getUserInfo().id,
              file_type: "2"
            },
            loadingMsg: "正在上传身份证照片",
            completeAllFn: function () {
              // 保存
              console.log("保存");
            }
          });
        }
      }
    }
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
        _this.setData({
          serviceTypesFlag: 1
        });
      },
      successFn: function (res) {
        _this.setData({
          serviceTypesFlag: 2
        });

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
          serviceTypesItemsTmp: serviceTypes
        });
      },
      successFailFn: function () {
        _this.setData({
          serviceTypesFlag: 3
        });
      },
      failFn: function () {
        _this.setData({
          serviceTypesFlag: 3
        });
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
        _this.setData({
          myFlag: 1
        });
      },
      successFn: function (res) {
        _this.setData({
          myFlag: 2
        });

        // 设置用户信息
        app.setUserInfo(res.data.content[0]);
        // 获取所有服务项目
        _this.getServiceTypes();

        _this.setData({
          name: app.getUserInfo().name,
          idNumber: app.getUserInfo().id_number
        });
      },
      successFailFn: function () {
        _this.setData({
          myFlag: 3
        });
      },
      failFn: function () {
        _this.setData({
          myFlag: 3
        });
      }
    });
  },
  onReady: function () { // 初始化
    var _this = this;

    _this.getMy();
  }
});