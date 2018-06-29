// pages/core/kb/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    colorArrays: ["#85B8CF", "#90C652", "#D8AA5A", "#FC9F9D", "#0A9A84", "#61BC69", "#12AEF3", "#E29AAD", "#7F6ED3", '#f3456d', '#f4d95b', '#f4eede', '#f49930', '#f26d26', '#005e37', '#24a560', '#4cd964', '#3eb866', '#f7f7f7', '#5580a1', '#7299a7', '#aab9be', '#cad5d9', '#68a2a9', '#f8e400', '#f26378', '#13dbad', '#ff7d48', '#a2ef54'],
    array: ['周一','周二','周三','周四','周五','周六','周日'],
    start_array: ['第 1 节', '第 2 节', '第 3 节', '第 4 节', '第 5 节', '第 6 节', '第 7 节', '第 8 节', '第 9 节', '第 10 节', '第 11 节','第 12 节'],
    js_array:[1,2,3,4,5,6,7,8,9,10,11,12],
    week_array: ['第1周', '第2周', '第3周', '第4周', '第5周', '第6周', '第7周', '第8周', '第9周', '第10周', '第11周', '第12周', '第13周', '第14周', '第15周', '第16周', '第17周', '第18周', '第19周', '第20周'],
    dsz_arr:['单周','双周','无'],
   list:{color:"" ,
          day:"",
          dsz:"",
          end_week:"",
          js:"",
          name:"",
          place:"",
          start:"",
          start_week:"",
          teacher_name:"",
          xf:""},
    now_week:""
  },
  day: function (e) {
    let x = parseInt(e.detail.value) + 1
    this.setData({
      index0: e.detail.value,
      'list.day': x
    })
    console.log(x)
  },
  name: function (e) {
    this.setData({
      'list.name': e.detail.value
    })
  },
  place: function (e) {
    this.setData({
      'list.place': e.detail.value
    })
  },
  start: function (e) {
    let q = parseInt(e.detail.value) + 1
    console.log(e)
    this.setData({
      index4: e.detail.value,
      'list.start':q
    })
  },
  dsz: function (e) {
    let q = parseInt(e.detail.value) 
    console.log(e)
    var _this=this
    let value = _this.data.dsz_arr[q]
    if(q==2){
      value=""
    }
    this.setData({
      index6: e.detail.value,
      'list.dsz': value
    })
  },
  start_week: function (e) {
    let w = parseInt(e.detail.value) + 1
    this.setData({
      index1: e.detail.value,
      'list.start_week': w
    })
  },
  end_week: function (e) {
    let r = parseInt(e.detail.value) + 1
    this.setData({
      index2: e.detail.value,
      'list.end_week':r
  })
  },
  teacher_name: function (e) {
    this.setData({
      'list.teacher_name': e.detail.value
    })
  },
  xf: function (e) {
    this.setData({
      'list.xf': e.detail.value
    })
  },
  js: function (e) {
    let m = parseInt(e.detail.value) + 1
    
    this.setData({
      index3: e.detail.value,
      'list.js': parseInt(m) - parseInt(this.data.list.start) + 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let wlist=wx.getStorageSync('kc_list')
    console.log(wlist)
  },
  comfri:function(e){
    let _this=this
    let xlist = wx.getStorageSync('kc_list')
    var ylist=this.data.list
    if (ylist.start == "" || ylist.day == "" || ylist.start_week == "" || ylist.end_week == ""){
      wx.showModal({
        title: '有必填项目未填！',
        content: '上课时间，开始节数，课程节数，开始周，结束周 为必填项目！',
         showCancel:false
      })}
      else{
      var b = _this.data.colorArrays.length
      var random = Math.floor(Math.random() * b)
      var c = _this.data.colorArrays[random]
      _this.setData({
        'list.color': c
      }),
        xlist.push(ylist)
      console.log(xlist)
      wx.setStorageSync('kc_list', xlist)
      wx.navigateBack({
        delta: 1
      })
   
    }
   },  
  clear:function(){
    wx.showModal({
      title: '注意！',
      content: '确定后，所有已保存本地缓存都将清除！慎重！！！',
    success: function (res) {
      if (res.confirm) {
    wx.clearStorage()
      }
      else if (res.cancel) {
        console.log('用户点击取消')
      }
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
  
  }
})  