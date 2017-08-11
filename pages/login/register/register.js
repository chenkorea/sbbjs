//index.js

//获取应用实例
var app = getApp();
Page({
  data: {
    titleText: '',
    regusername:'',
    regpasswd:'',
    nickname:'',
    regverifycode:'',
    isagree:false,
    agreeBg:'agree-un-btn',
    register_btn:'register_un_btn'
  },
  //事件处理函数
  bindViewTap: function () {
    var verifycode = wx.getStorageSync('regverifycode');
    var that = this;
    if (that.data.isagree) {
      if (!app.phoneRe.test(that.data.regusername)) {
        wx.showModal({
          title: '提示',
          content: '手机号码格式有误',
          showCancel: false
        })
      } else if (app.isBlank(that.data.regpasswd) || (that.data.regpasswd.length < 6)){
        wx.showModal({
          title: '提示',
          content: '请设置至少六位登录密码',
          showCancel: false
        })
      } else if (that.data.regverifycode != verifycode) {
        wx.showModal({
          title: '提示',
          content: '验证码错误',
          showCancel: false
        })
      } else {
         app.request({
           url: "phone/js/user/reg",
           data: {
             phone: that.data.regusername,
             passwd: that.data.regpasswd,
             checkCode: that.data.regverifycode
           },
           loading: true,
           loadingMsg: "正在注册",
           method: 'POST',
           successFn: function (res) {
             wx.showModal({
               title: '提示',
               content: '恭喜，注册成功！',
               showCancel:false,
               success:function(e){
                 if(e.confirm){
                   app.setLoginFlag(false);
                   app.setLoginInfo({
                     phone: that.data.regusername,
                     passwd: ''
                   })
                   wx.reLaunch({
                     url: '../login',
                   })
                 }
               }
             })
           },
           fail: function () {
             wx.hideLoading();

             wx.showToast({
               title: '抱歉，注册失败，稍后再试！',
               duration: 3000
             });
           }
         });
       }
     } else {
       wx.showModal({
         title: '提示',
         content: '请先确认服务协议',
         showCancel:false
       })
     }
   },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    that.setData({
      nickname: app.getUserInfo().name
    })
  },
  getcode:function(){
    var that = this;
    if (!app.phoneRe.test(that.data.regusername)){
      wx.showToast({
        title: '手机号码格式有误',
      })
    }else{
      app.request({
        url: "/phone/userinfor/getverifycode",
        loading: true,
        loadingMsg: "正在获取",
        method: 'POST',
        successFn: function (res) {
          if (res.data.code == '1') {
          wx.setStorage({
            key: "regverifycode",
            data: res.data.content[0],
          });
          that.setData({
            regverifycode: res.data.content[0]
          });
        }
        }
      })
    }
  },

  getregname: function (e) {
    this.setData({
      regusername: e.detail.value
    })
  },
  getregpasswd: function (e) {
    this.setData({
      regpasswd: e.detail.value
    })
  },
  getverifycode: function (e) {
    this.setData({
      regverifycode: e.detail.value
    })
  },
  chooseagree: function () {
    var isagree = this.data.isagree;
    isagree = !isagree;
    this.setData({
      isagree: isagree
    });
    if(isagree){
      this.setData({
        agreeBg:'agree-en-btn',
        register_btn:'register_en_btn'
      })
    }else{
      this.setData({
        agreeBg: 'agree-un-btn',
        register_btn: 'register_un_btn'
      })
    }
  }
})
