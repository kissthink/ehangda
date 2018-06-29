let app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    start:'开始日期',end:'结束日期',
    class_one: 'click',
    class_tow: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    let now_date = app.utils.getNowFormatDate()
    let start_date = app.utils.GetDateStr(-30)
    this.setData({
      now_date: now_date,
      start_date: start_date
    })
    this.get_wf(start_date,now_date)
    let _this=this
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo
        _this.setData({ tx_url: userInfo.avatarUrl, wl_info: wx.getStorageSync('wl_info') })
      }
    })
  },
  get_wf: function (start_date,end_date){
    let _this=this
    wx.showLoading({
      title: '正在查询中',
    })
    wx.request({
      url: app.globalData.SERVER + '/api/net_record/',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        'username': app.userInfo.username, 'password': app.userInfo.password,'type':'1',
        'start': start_date,'end':end_date
      },
      method: 'POST',
      success: function (res) {
        wx.hideLoading()
        for(var i in res.data.data.rows){
          res.data.data.rows[i].loginTime = _this.timestampToTime(res.data.data.rows[i].loginTime)
          res.data.data.rows[i].logoutTime = _this.timestampToTime(res.data.data.rows[i].logoutTime)
        }
        _this.setData({
          record_1:res.data.data
        })
        
      }
    })
   
  },
  get_cz: function (start_date,end_date) {
    wx.showLoading({
      title: '正在查询中',
    })
    let _this = this
    wx.request({
      url: app.globalData.SERVER + '/api/net_record/',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        'username': app.userInfo.username, 'password': app.userInfo.password, 'type': '2',
        'start': start_date, 'end': end_date
      },
      method: 'POST',
      success: function (res) {
        wx.hideLoading()
        for (var i in res.data.data.rows) {
          res.data.data.rows[i][0] = _this.timestampToTime(res.data.data.rows[i][0])
          res.data.data.rows[i][0] = _this.timestampToTime(res.data.data.rows[i][0])
        }
        _this.setData({
          record_2: res.data.data
        })

      }
    })

  },
  timestampToTime:function (timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = date.getDate() + ' ';
    let h = date.getHours() + ':';
    let m = date.getMinutes() + ':';
    let s = date.getSeconds();
    return Y+ M + D + h + m + s;
  },
  bindDateChange:function(e)
  {
    let types = e.currentTarget.id
    let data=this.data.date
    data[types] = e.detail.value
    this.setData({
      date: data
    })
   
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  change:function(e){
    let id = e.currentTarget.dataset.id
    if(id==1){
      this.setData({
        class_one: 'click',
        class_two:''
      })
    }else{
      this.setData({
        class_one: '',
        class_two: 'click'
      })
  
      if (this.data.record_2 ==undefined){
        
        this.get_cz(this.data.start_date, this.data.now_date)
      }
      
    }
   
  },
  bindDateChange:function(e){
    console.log(e)
    let id = e.currentTarget.id
    let value=e.detail.value
    if(id=="start"){
      this.setData({
        start: value
      })
    }else{
      this.setData({
        end: value
      })
    }
  },
  search:function(){
    if (this.data.class_one=="click"){
      this.get_wf(this.data.start, this.data.end)
    }else{
      this.get_cz(this.data.start, this.data.end)
    }
  },
  change_statu:function(){
    let _this = this
    wx.showLoading({
      title: '更改中',
    })
    wx.request({
      url: app.globalData.SERVER + '/api/net_statu/',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        'username': app.userInfo.username, 'password': app.userInfo.password
      },
      method: 'POST',
      success: function (res) {
        _this.setData({ wl_info:res.data})
        wx.hideLoading()
        wx.showToast({
          title: "无感知" + res.data.status,
          icon: 'none',
        })
      }
    })
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