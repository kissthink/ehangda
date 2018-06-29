let app = getApp()
var timestamp = Date.parse(new Date())
var date = new Date(timestamp);
//年  
var Y = date.getFullYear();
//月  
var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
//日  
var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();  
Page({
  data:{
    list:[{time:'无',place:'无',much:'无'}],
    yue:'0元',
    date:{start:'',end:''},
    zxf:'0元'
  },
  contInput: function (e) {
    this.setData({
      'date.start': e.detail.value
    })  
  },
   contInput1: function (e) {
    this.setData({
      'date.end': e.detail.value
    })
  },
  onLoad: function () {
    //默认查询当天
    this.setData({
      'date.start': Y + M + D,
      'date.end': Y + M + D,
    })

    let ecard_data = wx.getStorageSync('ecard_info'),m=0
    let lisT = ecard_data.day
    for (var i = 0; i < ecard_data.day.length; i++) {
      if (lisT[i].much < 0) {
        m = m + parseFloat(lisT[i].much)
      }
    }
    this.setData({
      yue: ecard_data.per.ye,
      list: ecard_data.day,
      zxf:m
    })
},
//查询特定时间消费
 cha:function(e){
   var _this = this
   console.log(this.data.date)
   wx.showLoading({
     title: '加载中',
   }),
     wx.request({
       //消费列表
     url: app.globalData.SERVER + '/api/card_zd/',
       header: {
         'Content-Type': 'application/x-www-form-urlencoded'
       },
       data: { 'xh': app.userInfo.xh, 'psd': app.userInfo.epassword, start: this.data.date.start, end: this.data.date.end},
       method: 'POST',
       success: function (res) {
         console.log(res)
         if(res.data=='err'){
           wx.hideLoading()
           wx.showModal({
             title: '没找到啊！',
             content: '试试重新搜索或刷新？',
           })
          }
         else {
           console.log(res)
           wx.showToast({
             title: '成功',
             icon: 'success',
           })
           var lisT = res.data.zd_list;
           console.log(lisT);
           _this.setData({
             list: lisT
           })
           var m = 0
           for (var i = 0; i < lisT.length; i++) {
             if (lisT[i].much < 0) {
               m = m + parseFloat(lisT[i].much)
             }
           }
           m = parseFloat(m).toFixed(2)
           _this.setData({
             zxf: m + '元'
           });}
       }
            })
 },
 //下拉刷新
 onPullDownRefresh() {
   console.log('--------下拉刷新-------')
   wx.showNavigationBarLoading() //在标题栏中显示加载
   //重新加载与数据导入
   var _this = this
   var lisT
   wx.request({
     //消费列表
     url: 'https://wtool.ehangopen.ourcauc.com' + '/api/card_zd/',
     header: {
       'Content-Type': 'application/x-www-form-urlencoded'
     },
     data: { 'psd': '222813', 'xh': '150441911', start: '20170901', end: '20170905' },
     method: 'POST',
     success: function (res) {
       lisT = res.data.zd_list;
       console.log(lisT);
       _this.setData({
         list: lisT
       });
       var m = 0
       for (var i = 0; i < lisT.length; i++) {

         if (lisT[i].much < 0) {
           m = m + parseFloat(lisT[i].much)

         }
       }
       m = parseFloat(m).toFixed(2)
       console.log(m)
       _this.setData({
         zxf: m + '元'
       });
     }
   })
   wx.hideNavigationBarLoading() //完成停止加载
   wx.stopPullDownRefresh() //停止下拉刷新
 },
 bindDateChange: function (e) {
   console.log('picker发送选择改变，携带值为', e.detail.value.replace(/[^0-9]/ig, ""))
   this.setData({
     'date.start': e.detail.value.replace(/[^0-9]/ig, "")
 })
 },
 bindDateChange2: function (e) {
   console.log('picker发送选择改变，携带值为', e.detail.value.replace(/[^0-9]/ig, ""))
   this.setData({
     'date.end': e.detail.value.replace(/[^0-9]/ig, "")
   })
 },
})