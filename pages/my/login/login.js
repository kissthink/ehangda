let app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
    tx_url:'',
    is_bks:false,
    info_list:[
      {name:'上网账号',input:'username',msg:'请输入上网账号',type:'text',is_psd:false},
      { name: '上网密码', input: 'password', msg: '请输入上网密码', type: 'text', is_psd: true},
      { name: '学号', input: 'xh', msg: '输入学号', type: 'number', is_psd: false},
      { name: '校园卡查询密码', input: 'epassword', msg: '默认身份证后6位密码', type: 'number', is_psd: true },
      { name: '图书馆借阅密码', input: 'tpassword', msg: '默认五个1', type: 'password', is_psd: false },
      { name: '教务处公众号成绩密码', input: 'jpassword', msg: '默认身份证后6位', type: 'password', is_psd: true },
      ],
    yz_res:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setStorageSync('qxyz', false)
    let _this=this
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo
        _this.setData({ tx_url: userInfo.avatarUrl})
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
    this.showTip()
  },

 
  showTip: function () {
    this.setData({ tip: 'true' })
  },
  closeTip: function () {
    this.setData({ tip: 'false' })
  },
  quit:function(){
    wx.showModal({
      title: '警告',
      content: '勾选此选项将极有可能导致程序不正常，请慎重',
      success: function (res) {
        if (res.confirm) {
          wx.setStorageSync('qxyz', true)
        } else if (res.cancel) {
          
        }
      }
    })
    
  },
  saveInfo:function(e){
    let xh = e.detail.value.xh
    if (xh.substring(0, 1) == 1 && xh.length>7){
      if (xh.substring(2, 3) == 8) {
        e.detail.value.tsg_qz = "R045K" + xh
      } else{
        e.detail.value.tsg_qz = "R045B" + xh
        this.setData({is_bks:true})
      }
    }else{
      if (parseInt(xh.substring(0, 4))>2016){
        e.detail.value.tsg_qz = "R045Y" + xh.substring(xh.length - 9, xh.length)
      }else{
        e.detail.value.tsg_qz = "R045Y00" + xh
      }
    }
    console.log(e.detail)
    if (!wx.getStorageSync('qxyz')){
      this.setData({ yz_res: [] })
      wx.showLoading({
        title: '正在验证中',
      })
      var _e = e
      let _this = this
      wx.request({
        url: app.globalData.SERVER + '/api/yz_sw/', //仅为示例，并非真实的接口地址
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
          'username': e.detail.value.username, 'password': e.detail.value.password
        },
        method: 'POST',
        success: function (res) {
          let statu = 0
          if (res.data.code == 200) {
            statu = 1
          }
          let yz_res = _this.data.yz_res
          yz_res.push({
            statu: statu,
            msg: '上网账号和密码不匹配！',
          })
          _this.setData({ yz_res: yz_res })
          _this.check(_e)
        }
      })
      wx.request({
        url: app.globalData.SERVER + '/api/yz_ts/', //仅为示例，并非真实的接口地址
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
          'xh': e.detail.value.tsg_qz, 'psd': e.detail.value.tpassword
        },
        method: 'POST',
        success: function (res) {
          let statu = 0
          if (res.data.code == 200) {
            statu = 1

          }
          let yz_res = _this.data.yz_res
          yz_res.push({
            statu: statu,
            msg: '图书馆借阅密码不正确',
          })
          _this.setData({ yz_res: yz_res })
          _this.check(_e)
        }
      })
      wx.request({
        url: app.globalData.SERVER + '/api/yz_xyk/', //仅为示例，并非真实的接口地址
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
          'xh': e.detail.value.xh, 'psd': e.detail.value.epassword
        },
        method: 'POST',
        success: function (res) {
          let statu = 0
          if (res.data.code == 200) {
            statu = 1
          }
          let yz_res = _this.data.yz_res
          yz_res.push({
            statu: statu,
            msg: '校园卡密码不正确',
          })
          _this.setData({ yz_res: yz_res })
          _this.check(_e)
        }
      })
    } else {
      this.tz(e)
    }
    
  },
  check:function(_e){
    let res=this.data.yz_res
    var i
    console.log(res)
    let yz_tg=true
    if(res.length==3){
      wx.hideLoading()
      for (i in res) {
        if (!res[i].statu) {
          yz_tg=false
          wx.showModal({
            title: '错误信息',
            content: res[i].msg,
          })
        }
      }
      if(yz_tg){
        this.tz(_e)
      }
    }
   
  },
  tz:function(_e){
    wx.clearStorageSync()
    let tip
    if (!this.data.is_bks){
      tip='但由于系统原因，非本科同学部分功能不能正常使用，请谅解'
    }
    wx.showToast({
      title: '账号验证成功！'+tip,
    })
    console.log(_e)
    wx.setStorageSync('userInfo', _e.detail.value)
    app.userInfo = wx.getStorageSync('userInfo')
    wx.setStorage({
      key: 'is_bd',
      data: true,
    })
    wx.reLaunch({
      url: '/pages/index/index?type=relogin'
    })
  }
})