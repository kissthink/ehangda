let app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    load:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync('cj_list')){
      this.setData({
        data: wx.getStorageSync('cj_list'),
        load: false
      })
    }else{
     this.cx()
    }
   
  },
  cx:function(){
    let _this = this
    wx.request({
      url: app.globalData.SERVER + '/api/edu_gpa/',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        'username': app.userInfo.username, 'password': app.userInfo.password
      },
      method: 'POST',
      success: function (res) {
        wx.stopPullDownRefresh()
        if (res.data.code == 200) {
          let list = res.data.gpa_list
          list.pjxfjd = list.pjxfjd.split('：')[1]
          wx.setStorageSync('cj_list', list)
          wx.setStorageSync('xxk', list.xxk)
          for(var i=0;i<list.data.length;i++){
            if (parseInt(list.data[i].xx)>0){
              list.data[i].kcmc = list.data[i].kcmc + "(重修" + list.data[i].xx+"分)"
            }
            if (parseInt(list.data[i].bkcj) > 0) {
              list.data[i].kcmc = list.data[i].kcmc + "(补考" + list.data[i].bkcj + "分)"
            }
          }
          _this.setData({
            data: list,
            load: false
          })
        } else {

          wx.navigateBack({
          })
          wx.showModal({
            showCancel: false,
            title: '失败',
            content: '查询失败，请重试，可能教务管理未开启此项查询',
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
    
    this.setData({ load:true})
    this.cx()
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