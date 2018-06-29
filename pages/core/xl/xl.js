let app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data:{
    xqj: ['一', '二', '三', '四', '五', '六', '日'],
    sj: [{ 'rq': 1, 'bz': '' }, { 'rq': '26', 'bz': '' }, { 'rq': '27', 'bz': '' }, { 'rq': '28', 'bz': '' }, { 'rq': '01', 'bz': '' }, { 'rq': '02', 'bz': '' }, { 'rq': '03', 'bz': '' }, { 'rq': '04', 'bz': '' }, { 'rq': 2, 'bz': '' }, { 'rq': '05', 'bz': '' }, { 'rq': '06', 'bz': '' }, { 'rq': '07', 'bz': '' }, { 'rq': '08', 'bz': '' }, { 'rq': '09', 'bz': '' }, { 'rq': '10', 'bz': '' }, { 'rq': '11', 'bz': '' }, { 'rq': 3, 'bz': '' }, { 'rq': '12', 'bz': '' }, { 'rq': '13', 'bz': '' }, { 'rq': '14', 'bz': '' }, { 'rq': '15', 'bz': '' }, { 'rq': '16', 'bz': '' }, { 'rq': '17', 'bz': '' }, { 'rq': '18', 'bz': '' }, { 'rq': 4, 'bz': '' }, { 'rq': '19', 'bz': '' }, { 'rq': '20', 'bz': '' }, { 'rq': '21', 'bz': '' }, { 'rq': '22', 'bz': '' }, { 'rq': '23', 'bz': '' }, { 'rq': '24', 'bz': '' }, { 'rq': '25', 'bz': '' }, { 'rq': 5, 'bz': '' }, { 'rq': '26', 'bz': '' }, { 'rq': '27', 'bz': '' }, { 'rq': '28', 'bz': '' }, { 'rq': '29', 'bz': '' }, { 'rq': '30', 'bz': '' }, { 'rq': '31', 'bz': '' }, { 'rq': '01', 'bz': '' }, { 'rq': 6, 'bz': '' }, { 'rq': '02', 'bz': '' }, { 'rq': '03', 'bz': '' }, { 'rq': '04', 'bz': '' }, { 'rq': '05', 'bz': '' }, { 'rq': '06', 'bz': '' }, { 'rq': '07', 'bz': '' }, { 'rq': '08', 'bz': '' }, { 'rq': 7, 'bz': '' }, { 'rq': '09', 'bz': '' }, { 'rq': '10', 'bz': '' }, { 'rq': '11', 'bz': '' }, { 'rq': '12', 'bz': '' }, { 'rq': '13', 'bz': '' }, { 'rq': '14', 'bz': '' }, { 'rq': '15', 'bz': '' }, { 'rq': 8, 'bz': '' }, { 'rq': '16', 'bz': '' }, { 'rq': '17', 'bz': '' }, { 'rq': '18', 'bz': '' }, { 'rq': '19', 'bz': '' }, { 'rq': '20', 'bz': '' }, { 'rq': '21', 'bz': '' }, { 'rq': '22', 'bz': '' }, { 'rq': 9, 'bz': '' }, { 'rq': '23', 'bz': '' }, { 'rq': '24', 'bz': '' }, { 'rq': '25', 'bz': '' }, { 'rq': '26', 'bz': '' }, { 'rq': '27', 'bz': '' }, { 'rq': '28', 'bz': '' }, { 'rq': '29', 'bz': '' }, { 'rq': 10, 'bz': '' }, { 'rq': '30', 'bz': '' }, { 'rq': '01', 'bz': '' }, { 'rq': '02', 'bz': '' }, { 'rq': '03', 'bz': '' }, { 'rq': '04', 'bz': '' }, { 'rq': '05', 'bz': '' }, { 'rq': '06', 'bz': '' }, { 'rq': 11, 'bz': '' }, { 'rq': '07', 'bz': '' }, { 'rq': '08', 'bz': '' }, { 'rq': '09', 'bz': '' }, { 'rq': '10', 'bz': '' }, { 'rq': '11', 'bz': '' }, { 'rq': '12', 'bz': '' }, { 'rq': '13', 'bz': '' }, { 'rq': 12, 'bz': '' }, { 'rq': '14', 'bz': '' }, { 'rq': '15', 'bz': '' }, { 'rq': '16', 'bz': '' }, { 'rq': '17', 'bz': '' }, { 'rq': '18', 'bz': '' }, { 'rq': '19', 'bz': '' }, { 'rq': '20', 'bz': '' }, { 'rq': 13, 'bz': '' }, { 'rq': '21', 'bz': '' }, { 'rq': '22', 'bz': '' }, { 'rq': '23', 'bz': '' }, { 'rq': '24', 'bz': '' }, { 'rq': '25', 'bz': '' }, { 'rq': '26', 'bz': '' }, { 'rq': '27', 'bz': '' }, { 'rq': 14, 'bz': '' }, { 'rq': '28', 'bz': '' }, { 'rq': '29', 'bz': '' }, { 'rq': '30', 'bz': '' }, { 'rq': '31', 'bz': '' }, { 'rq': '01', 'bz': '' }, { 'rq': '02', 'bz': '' }, { 'rq': '03', 'bz': '' }, { 'rq': 15, 'bz': '' }, { 'rq': '04', 'bz': '' }, { 'rq': '05', 'bz': '' }, { 'rq': '06', 'bz': '' }, { 'rq': '07', 'bz': '' }, { 'rq': '08', 'bz': '' }, { 'rq': '09', 'bz': '' }, { 'rq': '10', 'bz': '' }, { 'rq': 16, 'bz': '' }, { 'rq': '11', 'bz': '' }, { 'rq': '12', 'bz': '' }, { 'rq': '13', 'bz': '' }, { 'rq': '14', 'bz': '' }, { 'rq': '15', 'bz': '' }, { 'rq': '16', 'bz': '' }, { 'rq': '17', 'bz': '' }, { 'rq': 17, 'bz': '' }, { 'rq': '18', 'bz': '' }, { 'rq': '19', 'bz': '' }, { 'rq': '20', 'bz': '' }, { 'rq': '21', 'bz': '' }, { 'rq': '22', 'bz': '' }, { 'rq': '23', 'bz': '' }, { 'rq': '24', 'bz': '' }, { 'rq': 18, 'bz': '' }, { 'rq': '25', 'bz': '' }, { 'rq': '26', 'bz': '' }, { 'rq': '27', 'bz': '' }, { 'rq': '28', 'bz': '' }, { 'rq': '29', 'bz': '' }, { 'rq': '30', 'bz': '' }, { 'rq': '01', 'bz': '' }, { 'rq': 19, 'bz': '' }, { 'rq': '02', 'bz': '' }, { 'rq': '03', 'bz': '' }, { 'rq': '04', 'bz': '' }, { 'rq': '05', 'bz': '' }, { 'rq': '06', 'bz': '' }, { 'rq': '07', 'bz': '' }, { 'rq': '08', 'bz': '' }, { 'rq': 20, 'bz': '' }, { 'rq': '09', 'bz': '' }, { 'rq': '10', 'bz': '' }, { 'rq': '11', 'bz': '' }, { 'rq': '12', 'bz': '' }, { 'rq': '13', 'bz': '' }, { 'rq': '14', 'bz': '' }, { 'rq': '15', 'bz': '' }, { 'rq': 21, 'bz': '' }, { 'rq': '16', 'bz': '' }, { 'rq': '17', 'bz': '' }, { 'rq': '18', 'bz': '' }, { 'rq': '19', 'bz': '' }, { 'rq': '20', 'bz': '' }, { 'rq': '21', 'bz': '' }, { 'rq': '22', 'bz': '' }, { 'rq': 22, 'bz': '' }, { 'rq': '23', 'bz': '' }, { 'rq': '24', 'bz': '' }, { 'rq': '25', 'bz': '' }, { 'rq': '26', 'bz': '' }, { 'rq': '27', 'bz': '' }, { 'rq': '28', 'bz': '' }, { 'rq': '29', 'bz': '' }, { 'rq': 23, 'bz': '' }, { 'rq': '30', 'bz': '' }, { 'rq': '31', 'bz': '' }, { 'rq': '01', 'bz': '' }, { 'rq': '02', 'bz': '' }, { 'rq': '03', 'bz': '' }, { 'rq': '04', 'bz': '' }, { 'rq': '05', 'bz': '' }, { 'rq': 24, 'bz': '' }, { 'rq': '06', 'bz': '' }, { 'rq': '07', 'bz': '' }, { 'rq': '08', 'bz': '' }, { 'rq': '09', 'bz': '' }, { 'rq': '10', 'bz': '' }, { 'rq': '11', 'bz': '' }, { 'rq': '12', 'bz': '' }, { 'rq': 25, 'bz': '' }, { 'rq': '13', 'bz': '' }, { 'rq': '14', 'bz': '' }, { 'rq': '15', 'bz': '' }, { 'rq': '16', 'bz': '' }, { 'rq': '17', 'bz': '' }, { 'rq': '18', 'bz': '' }, { 'rq': '19', 'bz': '' }, { 'rq': 26, 'bz': '' }, { 'rq': '20', 'bz': '' }, { 'rq': '21', 'bz': '' }, { 'rq': '22', 'bz': '' }, { 'rq': '23', 'bz': '' }, { 'rq': '24', 'bz': '' }, { 'rq': '25', 'bz': '' }, { 'rq': '26', 'bz': '' }, { 'rq': 27, 'bz': '' }, { 'rq': '27', 'bz': '' }, { 'rq': '28', 'bz': '' }, { 'rq': '29', 'bz': '' }, { 'rq': '30', 'bz': '' }, { 'rq': '31', 'bz': '' }, { 'rq': '01', 'bz': '' }]

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
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})