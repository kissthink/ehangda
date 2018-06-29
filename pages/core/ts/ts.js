let app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book_list:[],
    list_show:'loading'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    let jy_info=wx.getStorageSync('jy_info')
    if(jy_info){
      this.set_jy(jy_info.list)
    }else{
      this.get_info()
    }
  },
  get_info:function(){
    this.setData({list_show:'loading'})
    
    let _this = this
    console.log(app.userInfo.tpassword)
    wx.request({
      url: app.globalData.SERVER + '/api/lib_info/', //仅为示例，并非真实的接口地址
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        'xh': app.userInfo.tsg_qz, 'psd': app.userInfo.tpassword
      },
      method: 'POST',
      success: function (res) {
        if (res.data.code == 200) {
          wx.setStorageSync('jy_info', { list: res.data.book_list, date: new Date().getTime() })
          let list = res.data.book_list
          if (list) {
            _this.set_jy(list)
          } else {
            _this.setData({
              'book_list': '',
              'list_show': '',
              ts_yj: 0,
              ts_yq: 0,
              ts_wyq: 0
            })
          }
        }

      }
    })
  },
  set_jy: function (list){
    let now = app.utils.getTodayDate()
    let length = list.length
    let book_list = []
    let yq = 0;
    let zts = 0
    for (let i = 0; i < length; i++) {
      let date = list[i].duedate.split(',')[0]
      let ts = app.utils.GetDateDiff(date, now)
      if (ts < 0) {
        zts += ts
        yq++
      }
      if (list[i].title.length>15){
        list[i].title = list[i].title.substring(0, 15)+'...'
      }
      book_list.push({
        'book_title': list[i].title,
        'book_duwtime': date,
        'book_warntime': ts,
      })
      this.setData({
        'book_list': book_list,
        'list_show': '',
        ts_yj: length,
        ts_yq: yq,
        ts_wyq: length - yq,
        count: (zts * 0.1).toFixed(2)
      })
    }
  },
  renew:function(){
    wx.showLoading({
      title: '正在续借中',
    })
    wx.request({
      url: app.globalData.SERVER + '/api/lib_renew/', //仅为示例，并非真实的接口地址
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        'xh': app.userInfo.tsg_qz, 'psd': app.userInfo.tpassword
      },
      method: 'POST',
      success: function (res) {
        wx.hideLoading()
        let toast=""
        if(res.data.renew_res=="err"){
          toast="续借失败，可能有已经逾期的书，或系统存在问题。"
        }else{
          toast = "续借成功，具体请以下拉刷新页面为准。"
        }
        wx.showModal({
          title: '续借提示',
          content: toast,
          showCancel:false
        })

      }
    })
  },
  onPullDownRefresh: function () {
    this.get_info()
    wx.stopPullDownRefresh();
  },
  
})
