let app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code_url: ''
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
  get_code:function(e){
    let kh = e.detail.value
    this.setData({kh:kh})
    if (kh.length==15){
      this.get_code_fun()
    }
  },
  get_code_fun:function(){
    let _this = this
    wx.request({
      url: app.globalData.SERVER + '/api/cet_yzm/', //仅为示例，并非真实的接口地址
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        'kh': _this.data.kh
      },
      method: 'POST',
      success: function (res) {
        var str = res.data.img;
        str = str.replace(/b'/g, '')
        str = str.replace(/'/g, '')
        _this.setData({
          code_url: "data:image/png;base64," + str,
          cookie: res.data.cookie
        })

      }
    })
  },
  search:function(e){
    let data=e.detail.value
    data['cookie'] = this.data.cookie.toString()
    let _this=this
    wx.request({
      url: app.globalData.SERVER + '/api/cet_cx/', //仅为示例，并非真实的接口地址
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: data,
      method: 'POST',
      success: function (res) {
        if (res.data.data.code == 0 || res.data.data.code==1){
          wx.showToast({
            title: res.data.data.msg,
            icon:'none'
          })
          _this.get_code_fun()
        }else{
          app.globalData.cet_list = res.data.data.msg
          wx.navigateTo({
            url: './detail',
          })
        }
        
      }
    })
  }
})