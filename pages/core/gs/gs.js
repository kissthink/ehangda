let app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    pswrd:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  /*获取学号 */
  username:function(e){
    this.setData({
      username: e.detail.value
    })
  },
  /*获取卡密码 */
  pswrd: function (e) {
    this.setData({
      pswrd: e.detail.value
    })
  },
  gs: function (options) {
    var Xh=this.data.username
    var Psd = this.data.pswrd
    wx.showModal({
      title: '请确认',
      content: '你确定要挂失校园卡吗？',
      success:function(res){
        if (res.confirm){
          console.log(Xh,Psd)
          wx.showLoading({
            title: '挂失中',
          })
          wx.request({
            url: app.globalData.SERVER + '/api/card_lock/', //仅为示例，并非真实的接口地址
            header: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
              'xh':Xh, 'psd':Psd
            },
            method: 'POST',
            success: function (res) {
              if(res.data.code==200){
                wx.hideLoading()
                wx.showToast({
                  title: '挂失成功',
                })
              }else{
                wx.showToast({
                  title: '失败,请重试',
                  icon:"none"
                })
              }
            }
          })
        }
       
      }
    })
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
    
  }
})