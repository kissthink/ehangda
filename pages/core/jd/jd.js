let app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xs:[1,1.2],
    xsz:[],
    jd:'未计算',
    load:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    wx.request({
      url: 'https://wtool.ehangopen.ourcauc.com/api/edu_gpa_js/',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        'gpausername': app.userInfo.xh, 'gpapassword': app.userInfo.jpassword
      },
      method: 'POST',
      success: function (res) {
        let list = res.data.list
        var i
        var xsz=[],jdz=[],xfz=[]
        for(i in list){
          let jd = app.utils.get_gpa_origin(list[i].cj)
          jdz.push(jd)
          xfz.push(list[i].xf)
          if(list[i].zyxs=='1'){
            xsz[i]=0
          }else{
            xsz[i] = 1
          }
        }
        _this.setData({ kc_list: list, xsz: xsz, jdz: jdz, xfz: xfz,load:false})
        _this.js()
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
    
  },
  bindPickerChange: function (e) {
    let id = e.currentTarget.dataset.id
    let data=this.data.xsz
    data[id] = Number(e.detail.value)
    this.setData({
      xsz: data
    })
    this.js()
  },
  js:function(){
    let xfz_list = this.data.xfz
    let xsz_list = this.data.xsz
    let jdz_list = this.data.jdz
    var i,j=0, xs, zxfsjj=0,zxf=0,jd_zz=[]
    for(i in xfz_list){
      if(xsz_list[j]==0)
        xs=1
      else
        xs=1.2
      let now_xf=Number(xfz_list[i])
      zxf +=now_xf
      zxfsjj += now_xf*jdz_list[j]* xs
      jd_zz.push((jdz_list[j] * xs).toFixed(2))
      j++
    }
    this.setData({ jd: (zxfsjj / zxf).toFixed(2), jd_zz: jd_zz})
  },
  bindInputChange:function(e){
    let id = e.currentTarget.dataset.id
    let data = this.data.xfz
    data[id] = Number(e.detail.value)
    this.setData({
      xfz: data
    })
    this.js()
  }
})