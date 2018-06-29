
let app=getApp()
Page({
  data: {
    load:true
  },
  //获取拾卡信息
  onLoad: function () {
    var _this = this
    wx.request({
      url: app.globalData.SERVER + '/api/sw_list/',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data)
        var list = res.data.list
        for(var i in list){
          var date = new Date(list[i].date * 1000);
          var Y = date.getFullYear() + '-';
          var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
          var D = date.getDate() + ' ';
          list[i].date = Y + M + D
        }
        _this.setData({
          list:list,
          load:false
        })
      }
    })
  },
  search:function(e){
    console.log(e)
    let list=this.data.list
    var s_list=[]
    for(var i in list){
      if ((list[i].owner + list[i].student_id).indexOf(e.detail.value)>-1){
        s_list.push(list[i])
      }
    }
    this.setData({
      list:s_list
    })
  },
 
 //点击后提示
  showDetail:function(e){
    wx.showModal({
      title: '领取地址',
      content: e.currentTarget.dataset.info,
      showCancel:false
    })
  },
  onPullDownRefresh: function () {
    this.setData({
      load: true
    })
    this.onLoad()
    wx.stopPullDownRefresh();
  },
})
