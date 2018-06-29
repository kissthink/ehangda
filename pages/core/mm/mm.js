let app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tip:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  showTip:function(){
    this.setData({tip:'true'})
  },
  closeTip: function () {
    this.setData({ tip: 'false' })
  },
  changepsd:function(e){
    let _this = this
    let data=e.detail.value
   
    if (data.newPsdInput1 != data.newPsdInput2){
      wx.showModal({
        title: '提示',
        content:  "两次输入的密码不相同",
        showCancel: false,
        success: function (res) {
        }
      })
    }else{
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        url: app.globalData.SERVER + '/api/net_changepsd/',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
          'username': app.userInfo.username, 'old_password': data.oldPsdInput, 'new_password': data.newPsdInput1
        },
        method: 'POST',
        success: function (res) {
          if(res.data.code==200){
            _this.data.msg = res.data.msg
          }else{
            _this.data.msg = res.data.msg 
          }
         
        },
        fail:function(){
          _this.data.msg ="请求错误，请重试"
        },
        complete:function(){
          wx.hideLoading()

          wx.showModal({
            title: '提示',
            content: _this.data.msg ,
            showCancel: false,
            success: function (res) {
            }
          })
          if(_this.data.msg.indexOf('成功')>-1){
            app.userInfo.password = data.newPsdInput1
            wx.setStorageSync('userInfo', app.userInfo)
          }
        }
      })
    }
    
  }

})