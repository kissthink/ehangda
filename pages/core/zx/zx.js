let app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bm_list: ['web开发部', '视觉设计部','新媒体部','网站运营部','平面设计部','影音部','组织部']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ avatarUrl: app.globalData.userInfo.avatarUrl, nickName: app.globalData.userInfo.nickName })
  },
  
  bindPickerChange1:function(e){
    console.log(e)
    this.setData({ bm1: this.data.bm_list[e.detail.value]})
  }  ,
  bindPickerChange2: function (e) {
    this.setData({ bm2: this.data.bm_list[e.detail.value] })
  },
  formSubmit:function(e){
    let data=e.detail.value
    data['bm1']=this.data.bm1
    data['bm2'] = this.data.bm2
    data['zwjs'] = this.data.zwjs
    data['xqah'] = this.data.xqah
    let is_ws=true
    for(var i in data){
      if (data[i] == '' || data[i] == 'undefined'){
        is_ws=false
        wx.showModal({
          title: '提示',
          content: '请完善所有信息再提交！',
        })
        break
      }
    }
    if (is_ws){
      let _this = this
      wx.showLoading({
        title: '操作中，请稍后',
      })
      wx.request({
        url: app.globalData.SERVER + '/api/zx_add/',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data,
        method: 'POST',
        success: function (res) {
          console.log(res)
          wx.hideLoading()
          wx.showModal({
            title: '提示',
            content: res.data.msg,
          })
        }
      })
    }
    
    console.log(data)
  },
  bindTextAreaBlur1:function(e){
    this.setData({ zwjs: e.detail.value })
  },
  bindTextAreaBlur2: function (e) {
    this.setData({ xqah: e.detail.value })
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