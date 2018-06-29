let app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    st_list:[
      ['大学生心理互助会', '大学生文化宣传中心', '自强社', '公寓协会', '环境保护协会', '医普会', '心蕊公益协会', '大学生就业导航协会', '东扬创业协会', '大学生安全协会', 'Enactus团队', '校园先锋队', '厦航白鹭实践社', '爱心社', '演讲实践协会', '⼤学⽣倡廉协会'],
      ['邓研会', '国防协会', '蓝天协会', '法知社', '经济协会', '辩论社', '模拟联合国协会', 'TED×CAUC', '法律协会'],
      ['绳毽协会', '⽻⽑球协会', '中国民航大学排球协会', 'CAUC跑团', '中国民航大学游泳协会', '中国民航大学足球协会', '田径协会', '网球协会', '中国民航大学健身健美协会', '中国民航大学乒乓球协会', '中国民航大学健美操协会', '中国民航大学散打协会', '台球协会', '轮滑协会', 'K-1自由搏击社', '武术协会', '篮球协会', '弓箭社', 'X-追梦协会'],
      ['学⽣科技协会', 'ERP协会', '外语天堂', 'CAUC⼩语种社', '航空航天学会', '现代舞协会', 'Animax动漫社', '枫桥⽂学社', '物理协会', '中国民航大学棋类协会', '魔术协会', '模型学社', '青年文学社', '书画艺术协会', '电子科技协会', '吉他社', ' 剪纸协会', '实用英语集训营', ' 单车游骑兵', '中国民航大学数学建模协会', "A-zone摄影协会", 'B-BOX协会', '爱乐者协会', '计算机爱好者协会', '科幻协会', '航苑书友会'],
      ['大学生记者团', '广播台', "大学生艺术团曲话团", '易航工作室',, '两航青年社', '电视台', '大学生艺术团合唱团', '大学生艺术团舞蹈团', '新媒体协会', '大学生艺术团民乐团', '大学生艺术团军乐团']
    ],
    is_detail:false,
    is_choice:false,
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    x:0,
    y:0,
    num:0,
    type_list: ['服务实践类', '思想政治类', '体育竞技类', '兴趣爱好类', '艺术传媒类']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  choiceType:function(e){
    this.setData({
      num: e.currentTarget.dataset.id,
      is_choice:false
    })
  },
  onLoad: function (options) {
    console.log(this.data.st_list)
    wx.startAccelerometer()
    let _this=this
    wx.request({
      url: app.globalData.SERVER + '/api/st/',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        console.log(res)
        _this.setData({
          list:res.data.list
        })
      }
    })
    
    wx.onAccelerometerChange(function (res) {
      _this.setData({
        x: res.x*50,
        y:-res.y*50,
        
      })
      
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
  out:function(){
    this.setData({is_detail:false})
  },
  showDtail:function(e){
    let st_name = this.data.st_list[this.data.num][e.currentTarget.dataset.id],now,tp
    console.log(st_name)
    for(var i in this.data.list){
      console.log(this.data.list[i].st_mc)
      if (this.data.list[i].st_mc == st_name){
        console.log(11)
        now = this.data.list[i]

        break
      }
    }
   
    this.setData({ is_detail: true ,now:now})
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    wx.stopAccelerometer()
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
  choice:function(){
    this.setData({is_choice:!this.data.is_choice})
  }
})