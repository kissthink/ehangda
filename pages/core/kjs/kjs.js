let app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    js_arr: ['第 1 节', '第 2 节', '第 3 节', '第 4 节', '第 5 节', '第 6 节', '第 7 节', '第 8 节', '第 9 节', '第 10 节', '第 11 节', '第 12 节'],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    var day2 = new Date();
    day2.setTime(day2.getTime());
    var s2 = day2.getFullYear() + "年" + (day2.getMonth() + 1) + "月" + day2.getDate() + "日";
    let day=[7,1,2 ,3, 4, 5, 6]
    let l = ["一", "二", "三", "四", "五", "六", "日"];
    var d = new Date().getDay();
    console.log(d)
    this.setData({
      date:s2,
      week: app.globalData.now_week,
      day: day[d],
      l:l
    })
    console.log(this.data)
  },
  change_js:function(e){
    let id = e.target.id
    let value=parseInt(e.detail.value)
   
    if(id=="start"){
      this.setData({
        start:value
      })
    }else{
        this.setData({
          end: value
        })
    }
    if (this.data.week != '' && this.data.day != '' && this.data.start >= 0 && this.data.end > 0 && (this.data.start < this.data.end) ){
      this.search()
    }

    console.log(this.data)
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
  search:function(){
    wx.showLoading({
      title: '查询中',
    })
    let _this = this
    wx.request({
      url: app.globalData.SERVER +'/api/kjs_search/',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        week: parseInt(_this.data.week), start: parseInt(_this.data.start) + 1, end: parseInt(_this.data.end) + 1, day: parseInt(_this.data.day)
      },
      method: 'POST',
      success: function (res) {
        wx.hideLoading()
        _this.setData({
          list:res.data.data
        })
      }

    })
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