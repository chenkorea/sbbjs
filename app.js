//app.js---核心工具。

App({
  //----------[常量]----------//
  // 服务器地址
  serverAddr: "http://192.200.200.24:9000/sbb-web/",
  // 手机号正则表达式
  phoneRe: /^1[3-9]\d{9}$/i,
  // 验证码正则表达式
  checkCodeRe: /^\d{6}$/i,
  // 发送的 Ajax 总个数
  ajaxCount: 0,
  // 发送的显示等待框的 Ajax 总个数
  loadingAjaxCount: 0,
  //----------[/常量]----------//

  //----------[方法]----------//
  // onLaunch: function() {
  //   //调用API从本地缓存中获取数据
  //   var logs = wx.getStorageSync('logs') || []
  //   logs.unshift(Date.now())
  //   wx.setStorageSync('logs', logs)
  // },

  // getUserInfo: function(cb) {
  //   var that = this
  //   if (this.globalData.userInfo) {
  //     typeof cb == "function" && cb(this.globalData.userInfo)
  //   } else {
  //     //调用登录接口
  //     wx.getUserInfo({
  //       withCredentials: false,
  //       success: function(res) {
  //         that.globalData.userInfo = res.userInfo
  //         typeof cb == "function" && cb(that.globalData.userInfo)
  //       }
  //     })
  //   }
  // },

  // 判断变量为 null
  isNull: function(o) {
    try {
      if ((typeof o === "undefined") || (o == null)) {
        return true;
      }

      return false;
    } catch (e) {
      return true;
    }
  },

  // 判断变量不为空 null
  isNotNull: function(o) {
    var _this = this;

    return !_this.isNull(o);
  },

  // 判断字符串为空
  isBlank: function(str) {
    var _this = this;
    
    try {
      if ((typeof str === "undefined") || (str == null)) {
        return true;
      } else if ((typeof str === "number") || (typeof str === "boolean")) {
        return false;
      } else if (typeof str === "string") {
        str = str.replace(/(^\s*)|(\s*$)/g, "");

        if (str.length === 0) {
          return true;
        } else {
          return false;
        }
      }

      return true;
    } catch (e) {
      console.log(e);
      return true;
    }
  },

  // 判断字符串不为空
  isNotBlank: function(str) {
    var _this = this;

    return !_this.isBlank(str);
  },

  // 判断变量是否为对象
  isObject: function (o) {
    var _this = this;

    try {
      return _this.isNotNull(o);
    } catch (e) {
      return false;
    }
  },

  // 判断变量是否为数组
  isArray: function(arr) {
    var _this = this;

    try {
      return (_this.isNotNull(arr) && (arr instanceof Array));
    } catch (e) {
      return false;
    }
  },

  // 判断变量是否为数字
  isNumber: function(num) {
    var _this = this;

    try {
      return (typeof num === "number");
    } catch (e) {
      return false;
    }
  },

  // 判断变量是否为布尔值
  isBoolean: function (bl) {
    try {
      return (typeof bl === "boolean");
    } catch (e) {
      return false;
    }
  },

  // 判断变量是否为函数
  isFunction: function(fn) {
    try {
      return (typeof fn === "function");
    } catch (e) {
      return false;
    }
  },

  // 剔除字符串前后空格
  trim: function(str) {
    var _this = this;

    if (typeof str === "string") {
      return str.replace(/(^\s*)|(\s*$)/g, '');
    } else {
      return str;
    }
  },

  // 获取字符串
  getString: function(str) {
    var _this = this;

    return (_this.isBlank(str) ? "" : String(str));
  },

  // 获取数字
  getNumber: function(num) {
    var _this = this;

    return (_this.isNumber(num) ? Number(num) : 0);
  },

  // 获取布尔值
  getBoolean: function (bl) {
    var _this = this;

    return (_this.isBoolean(bl) ? Boolean(bl) : false);
  },

  // 发起请求
  request: function(o) {
    var _this = this;

    o.url = (_this.isBlank(o.url) ? "" : o.url);
    o.data = (_this.isNull(o.data) ? {} : o.data);
    o.method = (_this.isBlank(o.method) ? "GET" : o.method.toUpperCase());
    o.dataType = (_this.isBlank(o.dataType) ? "json" : o.dataType.toLowerCase());
    o.header = (_this.isNull(o.header) ? { "content-type": "application/x-www-form-urlencoded" } : o.header);
    o.loading = (_this.isBoolean(o.loading) ? o.loading : false);
    o.loadingMsg = (_this.isBlank(o.loadingMsg) ? "" : (o.loadingMsg + "…"));
    o.loadingMask = (_this.isBoolean(o.loadingMask) ? o.loadingMask : true);

    _this.ajaxCount++;

    if (o.loading) {
      _this.loadingAjaxCount++;

      if (_this.loadingAjaxCount === 1) {
        wx.showLoading({
          mask: o.loadingMask,
          title: o.loadingMsg,
        });
      }
    }

    // 发起请求之前执行
    if (_this.isFunction(o.beforeFn)) {
      o.beforeFn();
    }

    wx.request({
      url: o.url,
      data: o.data,
      header: o.header,
      method: o.method,
      dataType: o.dataType,
      complete: function (res) {
        // 请求完成执行
        if (_this.isFunction(o.completeFn)) {
          o.completeFn(res);
        }
      },
      success: function (res) { // 请求成功
        if (_this.ajaxCount > 0) {
          _this.ajaxCount--;
        }

        if (o.loading) {
          if (_this.loadingAjaxCount > 0) {
            _this.loadingAjaxCount--;
          }

          if (_this.loadingAjaxCount === 0) {
            wx.hideLoading();
          }
        }

        // 成功
        if (res.data.code == 1) {
          if (_this.isFunction(o.successFn)) {
            o.successFn(res);
          }

          // 失败
        } else {
          wx.showToast({
            title: res.data.errmsg,
            duration: 3000
          });

          if (_this.isFunction(o.successFailFn)) {
            o.successFailFn(res);
          }
        }
      },
      fail: function (res) { // 请求失败
        if (_this.ajaxCount > 0) {
          _this.ajaxCount--;
        }

        if (o.loading) {
          if (_this.loadingAjaxCount > 0) {
            _this.loadingAjaxCount--;
          }

          if (_this.loadingAjaxCount === 0) {
            wx.hideLoading();
          }
        }
        
        wx.showToast({
          title: "网络连接失败，稍后再试！",
          duration: 3000
        });

        if (_this.isFunction(o.failFn)) {
          o.failFn(res);
        }
      }
    })
  }
  //----------[/方法]----------//
});