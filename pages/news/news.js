let app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    load:true,
    detail:false,
    colorArrays: [ '#f3456d', '#f4d95b', '#f49930', '#f26d26', '#005e37', '#24a560', '#4cd964', '#3eb866', '#5580a1', '#7299a7', '#aab9be', '#cad5d9', '#68a2a9', '#f8e400', '#f26378', '#13dbad', '#ff7d48', '#a2ef54'],


  },
  showDetail:function(e){
    var detail = this.data.list[e.currentTarget.dataset.id].detail 
    if(detail.length>150){
      app.globalData.st_detail = this.data.list[e.currentTarget.dataset.id]
      wx.navigateTo({
        url: './detail',
      })
    }else{
      this.setData({
        tz_detail:detail ,
        detail: true,
      })
    }
   
  },
  hide:function(){
    this.setData({
      detail:false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    wx.request({
      url: app.globalData.SERVER + '/api/tz/', //仅为示例，并非真实的接口地址
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        let list=res.data.list
        _this.setData({
          list: list,
          load: false
        })
        let new_list=list
        for (var i in new_list){
          if (new_list[i].title.length > 15) {
            new_list[i].title = list[i].title.substring(0, 15) + '...'
          }
        }
        _this.setData({
          news_list: new_list,
          load: false
        })
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