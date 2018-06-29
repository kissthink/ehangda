let app=getApp()
Page({
  data: {
    score:'未计算',
    xb_list: [{ 'name': '1', 'value': '男生' }, { 'name': '2', value: '女生'}],
    nj_list: [{ 'name': '1', 'value': '一二' }, { 'name': '2', value: '三四' }],
    icon_list:[
      {'img':'../../../images/tc/sg.png','type':'身高','unit':'米','name':'sg',tip:"如：1.83"},
      { 'img': '../../../images/tc/tz.png', 'type': '体重', 'unit': '千克', 'name': 'tz', tip: "如：65"},
      { 'img': '../../../images/tc/ty.png', 'type': '立定跳远', 'unit': '厘米', 'name': 'ldty', tip: "如：245"},
      { 'img': '../../../images/tc/cp.png', 'type': '长跑', 'unit': '分秒', 'name': 'cp', tip: "如：3.47" },
      { 'img': '../../../images/tc/dp.png', 'type': '短跑', 'unit': '秒', 'name': '50m', tip: "如：6.8" },
      { 'img': '../../../images/tc/fhl.png', 'type': '肺活量', 'unit': '毫升', 'name': 'fhl', tip: "如：4500"},
      { 'img': '../../../images/tc/ywqz.png', 'type': '仰卧引体', 'unit': '个', 'name': 'ytyw', tip: "如：10" },
      { 'img': '../../../images/tc/tqq.png', 'type': '体前屈', 'unit': '厘米', 'name': 'zwtqq', tip: "如：20" },
    ]
  },
  
  formSubmit: function (e) {
    let _this=this
    var app=getApp()
    wx.request({
      url: app.globalData.SERVER + '/api/tc_calculate/', //仅为示例，并非真实的接口地址
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: e.detail.value,
      method: 'POST',
      success: function (res) {
        if(res.data.code==200){
          res.data.score = parseFloat(res.data.score).toFixed(2)
          _this.setData(
            {
              score:res.data.score
            }
           
          )
          app.globalData.tc_list_res = res.data
          app.globalData.tc_list_cj = e.detail.value
          
          console.log(app.globalData.tc_list_res)
        }
      },
      fail:function(){
        wx.showModal({
          title: '提示',
          content: "服务器请求错误，请重试",
          showCancel: false,
          success: function (res) {
          }
        })
      }
    })
    
  },
  to:function(){
    wx.navigateTo({
      url: './detail',
    })
  }
});