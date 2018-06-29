let app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
    ks_list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.set_ks(this.data.ks_list)
    let ks_info = wx.getStorageSync('ks_info')
    this.setData({ ks_list: ks_info.list })
    if (ks_info) {
      this.set_ks(ks_info.list)
    } else {
      this.getTestList()
    }
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
    this.getTestList()
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
  getTestList:function(){
    let _this = this
    this.setData({list_show:'loading'})
    wx.request({
      url: app.globalData.SERVER + '/api/edu_exam/', 
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        'username': app.userInfo.username, 'password': app.userInfo.password
      },
      method: 'POST',
      success: function (res) {
        let list = res.data.exam_list
       
        wx.setStorageSync('ks_info', { list:list, date: new Date().getTime() })
        _this.set_ks(list)
      }
    })
    
  },
  set_ks:function(list){
    var i, sy
    let now = app.utils.getTodayDate()
    let new_list = []
    for (i in list) {
      let now_kssj = list[i]['kssj']
      let ks_day1 = now_kssj.match(/\d{4}-\d{1,2}-\d{1,2}/)
      let ks_day2 = now_kssj.match(/\d{4}年\d{1,2}月\d{1,2}/)
      
      console.log(ks_day1)
      console.log(ks_day2)
      let ks_day
      if(ks_day1){
        ks_day=ks_day1[0]
      }else if(ks_day2){
        ks_day2 = ks_day2[0].replace(/年/g, "-").replace(/月/g, "-")
        ks_day = ks_day2
      }else{
        ks_day=0
      }
      if (ks_day) {
        sy = app.utils.GetDateDiff(ks_day, now)
        if (sy >= 0) {
          list[i]['sy'] = sy
          new_list.push(
            list[i]
          )
        }
      } else {
        list[i]['sy'] = "待定"
        new_list.push(
          list[i]
        )
      }
    }
    console.log(new_list)
    this.setData({ 'ks_list': new_list, length: new_list.length, list_show: '' })
    wx.stopPullDownRefresh()
  }
})