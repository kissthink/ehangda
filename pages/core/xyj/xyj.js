let app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gy_info: ["南1", "南2", "南3", "南4", "南5", "南6",
      "南7", "南8", "南9", "南10", "南11", "南12",
      "南13", "南14", "南15", "南16", "南17", "南18",
      "南19", "南20", "南21", "南22", "南23", "院11",
      "北1", "北2", "北3", "北4", "北5", "北10", "北11", "北12", "北14", "北17", "北18", "北19", "北20", "北21", "北22", "北23", "北24", "北25", "北27"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this=this
    this.setData({'index':wx.getStorageSync('xyj_index')})
    wx.showLoading({
      title: '获取中',
    })
    wx.request({
      url: app.globalData.SERVER + '/api/xxj_data/', //仅为示例，并非真实的接口地址
      method: 'GET',
      success: function (res) {
        wx.hideLoading()
        _this.setData({
          'statu':res.data.data
        })
        _this.change(_this.data.index)
      }
    })
  },
  change_gy:function(e){
    var index = e.detail.value
    this.change(index)
    this.setData({
      index:index
    })
  
  },
  change:function(index){
    wx.setStorageSync('xyj_index', index)
    let list = this.data.statu
    if (!list) {
      this.onLoad()
    }
    let choice = this.data.gy_info[index]
    var new_list = []
    for (var i in list) {
      var now = list[i].MachineName
      var len = choice.length
      if (now.slice(0, len) == choice && isNaN(now.slice(len, len + 1))) {
        if (list[i].MachineState == 1) {
          list[i].statu = "空闲"
        } else {
          list[i].statu = "剩" + list[i].remainMinutes + "分钟"
        }
        new_list.push(list[i])
      }
    }
    this.setData({
      list: new_list
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