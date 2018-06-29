let app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let res = app.globalData.tc_list_res.dx
    let cj = app.globalData.tc_list_cj
    let score=[
      { 'zb': '体重指数', 'bx': (cj.tz/(cj.sg*cj.sg)).toFixed(2),df:res.BMI},
      { 'zb': '立定跳远', bx: cj.ldty, 'df': res.ldty },
      { 'zb': '长跑', bx: cj.cp, 'df': res.cp },
      { 'zb': '短跑', bx: cj['50m'], 'df': res['50m'] },
      { 'zb': '肺活量', bx: cj.fhl, 'df': res.fhl },
      { 'zb': '仰卧引体', bx: cj.ytyw, 'df': res.ytyw },
      { 'zb': '坐位体前屈', bx: cj.zwtqq, 'df': res.zwtqq },
      { 'zb': '总分', bx: '无', 'df': parseFloat(app.globalData.tc_list_res.score).toFixed(2) },
    ]
    this.setData({score:score})
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