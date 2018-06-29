//app.js
import utils from './utils/index';

App({
  onLaunch: function () {
    
    // wx.setStorageSync('userInfo', { username: "ylli1_15", password: "22422X@s", xh: "150145123", epassword: "822422", tpassword: "11111", jpassword: "zaq12015" })
    // wx.setStorage({
    //   key: 'is_bd',
    //   data: true,
    // })    
    wx.showShareMenu({
      withShareTicket: true
    })
    this.utils = new utils()
    this.userInfo = wx.getStorageSync('userInfo')
    console.log(this.userInfo)
    // 获取用户信息
    var _this=this
    wx.getUserInfo({
      success: res => {
        // 可以将 res 发送给后台解码出 unionId
        _this.globalData.userInfo = res.userInfo
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        if (this.userInfoReadyCallback) {
          
          this.userInfoReadyCallback(res)
        }
      }
    })
    
  },
  userInfoReadyCallback:function(res){
    this.globalData.userInfo = res.userInfo
  },
  globalData: {
    userInfo: null,
    SERVER: 'http://127.0.0.1:8888',
  }
})
