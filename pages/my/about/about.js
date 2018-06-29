let app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let xyk_ts=wx.getStorageSync('xyk_no_ts')
    let wf_ts = wx.getStorageSync('wf_no_ts')
    let jy_ts = wx.getStorageSync('jy_no_ts')
    this.setData({
      xyk_ts: xyk_ts,
      wf_ts:wf_ts,
      jy_ts: jy_ts
    })
  },
  changeStatu:function(e){
    let ts_type = e.currentTarget.dataset.type
    wx.setStorageSync(ts_type, !wx.getStorageSync(ts_type))
    
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
  clearStorage:function(){
    wx.showModal({
      title: '提示',
      content: '清楚后包括账号在内的信息都不再留存，需重新绑定，你确定吗？',
      success: function (res) {
        if (res.confirm) {
          try {
            wx.clearStorageSync()
            wx.showToast({
              title: '清除成功！',
            })
          } catch (e) {
            wx.showToast({
              title: '清除失败！',
              icon:'none'
            })
            // Do something when catch error
          }
        } 
      }
    })
    
  }
})