var app=getApp()
Page({
  data:{
    list_show:'loading',
    zf:'待查询',
    score_list:[
      {'icon':'zq.png','name':'A：思想政治与道德修养','score':'0.8'},
      {'icon': 'zq.png', 'name': 'B：社会实践与志愿服务', 'score': '0.8'},
      { 'icon': 'zq.png', 'name': 'C、学术科技与创新创业', 'score': '0.8'},
      { 'icon': 'zq.png', 'name': 'D、文化艺术与身心发展', 'score': '0.8'},
      { 'icon': 'zq.png', 'name': 'E、社团活动与社会工作', 'score': '0.8'},
      { 'icon': 'zq.png', 'name': 'F、技能培训与其他相关', 'score': '0.8'},
    ]
  },
  onLoad: function () {
    let st_info=wx.getStorageSync('st_info')
    if (st_info){
      this.set_st(st_info.st_info)
    }else{
      this.get_st()
    }
    
  },
  get_st:function(){
    let _this = this
    wx.request({
      url: app.globalData.SERVER + '/api/xg_info/', //仅为示例，并非真实的接口地址
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        'username': app.userInfo.username, 'password': app.userInfo.password,
      },
      method: 'POST',
      success: function (res) {
        if (res.data.code == 200) {
          wx.setStorageSync('st_info', { st_info: res.data, date: new Date().getTime() })
          var list = res.data
          _this.set_st(list)
        }

      }
    })
  },
  set_st: function (st_info){
    let list = st_info.list
    var new_list = this.data.score_list
    for (var i = 0; i < 6; i++) {
      var now_score = list[i]
      if (parseFloat(now_score) < 1) {
        new_list[i].icon = 'jg.png'
      }
      new_list[i].score = now_score
    }
    new_list[4].icon = 'zq.png'
    this.setData(
      {
        score_list: new_list,
        list_show: '',
        zf: list[6]
      }
    )
    app.globalData.st_detail = st_info.detail
  },
  to:function(){
    wx.navigateTo({
      url: './detail',
    })
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
    if (this.data.list_show !="loading"){
      this.setData({ list_show: 'loading', })
      this.get_st()
    }
   
  },
})
