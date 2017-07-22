//获取应用实例
var app = getApp();

Page({
  data: { // 页面的初始数据
    phone: '',
    phoneFocus: false,
    passwd: '',
    passwdFocus: false
  },
  bindPhoneInput: function (e) { // 设置手机号
    var _this = this;

    _this.setData({
      phone: e.detail.value
    });
  },
  bindPasswdInput: function (e) { // 设置密码
    var _this = this;

    _this.setData({
      passwd: e.detail.value
    });
  },
  bindForgetTap: function () { // 跳转至忘记密码界面
    wx.navigateTo({
      url: '../login/findpwd/findpwd'
    })
  },
  bindRegisterBtnTap: function () { // 跳转至注册界面
    wx.navigateTo({
      url: '../login/register/register'
    })
  },
  bindLoginBtnTap: function () { // 点击登录按钮
    var _this = this;

    // 校验手机号
    if (!app.phoneRe.test(_this.data.phone)) {
      wx.showToast({
        title: '手机号格式不正确',
        duration: 3000
      });

      _this.setData({
        phoneFocus: true
      });

      // 校验密码
    } else if (app.isBlank(_this.data.passwd) || (_this.data.passwd.length < 6)) {
      wx.showToast({
        title: '密码至少6个字符',
        duration: 3000
      });

      _this.setData({
        passwdFocus: true
      });

      // 登录
    } else {
      var _this = this;

      // 登录
      app.request({
        url: "phone/js/user/login",
        data: {
          phone: _this.data.phone,
          passwd: _this.data.passwd
        },
        method: 'POST',
        loading: true,
        loadingMsg: "正在登录",
        successFn: function (res) {
          // 设置登录信息
          app.setLoginInfo({
            phone: _this.data.phone,
            passwd: _this.data.passwd
          });
          // 设置用户信息
          app.setUserInfo(res.data.content[0]);
          // 设置已登录
          app.setLoginFlag(true);

          // 如果用户已登录，重定向到首页
          if (app.getLoginFlag()) {
            // 如果已完善用户信息，则重定向到首页
            if (app.isPerfectUserInfo()) {
              wx.redirectTo({
                url: "../index/index"
              });

              // 否则，重定向到完善用户用户信息界面
            } else {
              wx.redirectTo({
                url: "../userinfo/userinfo"
              });
            }
          }
        },
        successFailFn: function () {
          // 清空所有数据
          app.clearAll();
          // 设置未登录
          app.setLoginFlag(false);
        },
        failFn: function () {
          // 清空所有数据
          app.clearAll();
          // 设置未登录
          app.setLoginFlag(false);
        }
      });
    }
  },
  onLoad: function () { // 监听页面加载
    //app.setLoginFlag(false);

    // 如果用户已登录，重定向到首页
    if (app.getLoginFlag()) {
      // 如果已完善用户信息，则重定向到首页
      if (app.isPerfectUserInfo()) {
        wx.redirectTo({
          url: "../index/index"
        });

        // 否则，重定向到完善用户用户信息界面
      } else {
        wx.redirectTo({
          url: "../userinfo/userinfo"
        });
      }
    }
  },
  onReady: function () { // 监听页面初次渲染完成
    var _this = this;
    var loginInfo = app.getLoginInfo();

    // 回显手机号和密码
    _this.setData({
      phone: app.getString(loginInfo.phone),
      passwd: app.getString(loginInfo.passwd)
    });
  }
});