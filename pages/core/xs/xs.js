let app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    cs:0
  },
  searchXX:function(e){
    wx.showLoading({
      title: '查询中',
    })
    let _this=this
    wx.request({
      url: app.globalData.SERVER + '/api/edu_xs/',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        'keyword': e.detail.value
      },
      method: 'POST',
      success: function (res) {
        wx.hideLoading()
        _this.setData({list:res.data.list,cs:1})
      }
    })
  }
})