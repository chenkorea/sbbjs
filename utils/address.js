
// 获取用户地址信息
function getUserAddress(callback, uid) {
  // http://192.200.200.21:9000/sbb-web/phone/openkey/getUserAddress
  var remoteUrl = getApp().globalData.serverIp + "openkey/getUserAddress?uid="+ uid;
  wx.request({
    url: remoteUrl,
    success: function (res) {
      console.log(res);
      callback(res);
    }
  })
}

// 保存用户地址信息
function addUserAddress(callback, uid, popedom, address, is_default) {
  // http://192.200.200.21:9000/sbb-web/phone/openkey/getUserAddress
  var remoteUrl = getApp().globalData.serverIp + "openkey/addUserAddress";
  // ?uid=" + uid + 
  // "&popedom=" + popedom + 
  // "&address=" + address +
  // "&is_default=" + is_default;"
  wx.request({
    url: remoteUrl,
    data: {
      uid: uid,
      popedom: popedom,
      address: address,
      is_default: is_default
    },
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      console.log(res);
      callback(res);
    }
  })
}

// 保存用户地址信息
function updateUserAddress(callback, uid, addressId) {
  // http://192.200.200.21:9000/sbb-web/phone/openkey/getUserAddress
  var remoteUrl = getApp().globalData.serverIp + "openkey/updateUserAddress";
  wx.request({
    url: remoteUrl,
    data: {
      uid: uid,
      addressId: addressId
    },
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      console.log(res);
      callback(res);
    }
  })
}

// 删除用户地址信息
function deleteUserAddress(callback, addressId) {
  // http://192.200.200.21:9000/sbb-web/phone/openkey/getUserAddress
  var remoteUrl = getApp().globalData.serverIp + "openkey/deleteUserAddress";
  wx.request({
    url: remoteUrl,
    data: {
      addressId: addressId
    },
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      console.log(res);
      callback(res);
    }
  })
}

// 获取服务类别信息
function getServiceType(callback, serviceType) {
  var remoteUrl = getApp().globalData.serverIp + "openkey/getServiceType";
  wx.request({
    url: remoteUrl,
    data: {
      serviceType: serviceType
    },
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      console.log(res);
      callback(res);
    }
  })
}


// 创建订单
function createUserOrder(callback, userOrder) {
  var remoteUrl = getApp().globalData.serverIp + "openkey/createUserOrder";
  wx.request({
    url: remoteUrl,
    data: userOrder,
    method: 'POST',
    header: { 'content-type': 'application/json' },
    success: function (res) {
      console.log(res);
      callback(res);
    }
  })
}

// 获取用户订单
function getUserOrders(callback, uid, status) {
  var remoteUrl = getApp().globalData.serverIp + "openkey/getUserOrders";
  wx.request({
    url: remoteUrl,
    data: {
      uid: uid,
      status: status
    },
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      console.log(res);
      callback(res);
    }
  })
}

// 用户支付订单更新状态
function updateOrderPayStatus(callback, uid, uname, orderId) {
  var remoteUrl = getApp().globalData.serverIp + "openkey/updateOrderPayStatus";
  wx.request({
    url: remoteUrl,
    data: {
      uid: uid,
      uname: uname,
      orderId: orderId
    },
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      console.log(res);
      callback(res);
    }
  })
}

// 评论
function addServiceComment(callback, uid, uname, orderId, dispatching_id, evaluate, content) {
  var remoteUrl = getApp().globalData.serverIp + "openkey/addServiceComment";
  wx.request({
    url: remoteUrl,
    data: {
      uid: uid,
      uname: uname,
      orderId: orderId,
      dispatching_id: dispatching_id,
      evaluate: evaluate,
      content: content
    },
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      console.log(res);
      callback(res);
    }
  })
}

// 用户查询订单流程
function getUserOrdersProcess(callback, orderId) {
  var remoteUrl = getApp().globalData.serverIp + "openkey/getUserOrdersProcess";
  wx.request({
    url: remoteUrl,
    data: {
      orderid: orderId
    },
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      console.log(res);
      callback(res);
    }
  })
}

// 师傅查询订单刘晨
function getUserShiFuOrdersProcess(callback, orderId) {
  var remoteUrl = getApp().globalData.serverIp + "openkey/getUserShiFuOrdersProcess";
  wx.request({
    url: remoteUrl,
    data: {
      orderid: orderId
    },
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      console.log(res);
      callback(res);
    }
  })
}

// 师傅查询订单图片
function getUserOrderPic(callback, orderId) {
  var remoteUrl = getApp().globalData.serverIp + "openkey/getUserOrderPic";
  wx.request({
    url: remoteUrl,
    data: {
      orderid: orderId
    },
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      console.log(res);
      callback(res);
    }
  })
}


// 完工订单
function finishOrder(callback, objStr, goodsStr, payType) {
  var remoteUrl = getApp().globalData.serverIp + "js/orderview/commitOrderViewStatus";
  wx.request({
    url: remoteUrl,
    data: {
      objStr: objStr,
      goodsStr: goodsStr,
      pay_type: payType
    },
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      console.log(res);
      callback(res);
    }
  })
}


module.exports = {
  getUserAddress: getUserAddress,
  addUserAddress: addUserAddress,
  updateUserAddress: updateUserAddress,
  deleteUserAddress: deleteUserAddress,
  getServiceType: getServiceType,
  createUserOrder: createUserOrder,
  getUserOrders: getUserOrders,
  updateOrderPayStatus: updateOrderPayStatus,
  addServiceComment: addServiceComment,
  getUserOrdersProcess: getUserOrdersProcess,
  getUserShiFuOrdersProcess: getUserShiFuOrdersProcess,
  getUserOrderPic: getUserOrderPic,
  finishOrder: finishOrder
} 