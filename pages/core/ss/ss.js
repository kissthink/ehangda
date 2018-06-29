let app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book_list:''
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
    if(this.data.book_list!=''){
      var _this = this
      wx.showLoading({ 'title': '正在加载中' })
      wx.request({
        url: app.globalData.SERVER + '/api/lib_search/', //仅为示例，并非真实的接口地址
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
          'view': _this.data.view, 'dation': _this.data.dation,'page':2
        },
        method: 'POST',
        success: function (res) {
          if (res.data.code == 200) {
            _this.setData(
              {
                book_list: _this.data.book_list.concat(res.data.book_list),
                dation: res.data.dation,
                view: res.data.view
              }

            )
            wx.hideLoading()
          }

        }
      })
    }
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  bindKeyWordInput: function (e) {
    this.setData({
      keyword: e.detail.value
    })
  },
  search:function(){
    var _this = this
    wx.showLoading({'title':'正在搜索中'})
    wx.request({
      url: app.globalData.SERVER + '/api/lib_search/', //仅为示例，并非真实的接口地址
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        'keyword': _this.data.keyword, 'page': '1'
      },
      method: 'POST',
      success: function (res) {
        if (res.data.code == 200) {
          _this.setData(
            {
              book_list: res.data.book_list,
              dation: res.data.dation,
              view: res.data.view,
              length: res.data.book_list.length
            }
            
          )
          wx.hideLoading()
        }

      }
    })
  }
})