let app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    colorArrays: ["#85B8CF", "#90C652", "#D8AA5A", "#FC9F9D", "#0A9A84", "#61BC69", "#12AEF3", "#E29AAD", '#8a8cb2', '#ff8c78', '#8cd6b5', '#ffd661', '#41c5c7', '#97ec71', '#db1977', '#de9dd6',"#7F6ED3", '#f3456d', '#f4d95b', '#f4eede', '#f49930', '#f26d26', '#005e37', '#24a560', '#4cd964', '#3eb866', '#f7f7f7', '#5580a1', '#7299a7', '#aab9be', '#cad5d9', '#68a2a9', '#f8e400', '#f26378', '#13dbad', '#ff7d48', '#a2ef54'],
    core_list:[
      { url: '/pages/core/kb/kb', icon: 'kb.png', title: '课表查询' },
      { url: "/pages/core/cj/cj", icon: 'cj.png', title: '成绩绩点', color:'#FAD97F'},
      { url: "/pages/core/sw/sw", icon: 'wl.png', title: '上网管理' },
      { url: "/pages/core/kjs/kjs", icon: 'kjs.png', title: '查空教室' },
      { url: '/pages/core/tc/tc', icon: 'tc.png', title: '体测计算' },
      { url: "/pages/core/ks/ks", icon: 'ks.png', title: '考试查询', color: '#2AA8E2' },
      { url: "/pages/core/st/st", icon: 'st.png', title: '查素拓分', color: '#00F0D4' },
      { url: '/pages/core/xyj/xyj', icon: 'xyj.png', title: '查洗衣机' },
      { url: "/pages/core/ts/ts", icon: 'jy.png', title:"借阅信息", color:'#1FABAA'},
      { url: '/pages/core/skxx/skxx', icon: 'skxx.png', title: '拾卡信息' },
      
     
    ],
    core_list2:[
      { url: "/pages/core/ss/ss", icon: 'ts.png', title: '图书检索', color: '#77B3D4' },
      { url: '/pages/core/gs/gs', icon: 'gs.png', title: '校卡挂失' },
      { url: "/pages/core/mm/mm", icon: 'mm.png', title: '密码修改', color: '#3D93BF' },
      { url: '/pages/core/zd/zd', icon: 'zd.png', title: '校卡账单' },
      { url: '/pages/core/xs/xs', icon: 'xs.png', title: '重要系数' },
      { url: "/pages/core/jd/jd", icon: 'gpa.png', title: '绩点计算' },
      { url: "/pages/core/xiaoli/xiaoli", icon: 'rl.png', title: '校历' },
      { url: "/pages/core/xxk/xxk", icon: 'xxk.png', title: '选修课', color: '#2AA8E2' },
      { url: "/pages/core/slj/slj", icon: 'slj.png', title: '查四六级', color: '#8BB7D7' },
      { url: '/pages/core/stjs/stjs', icon: 'btdz.png', title: '百团大战' },
      
    ],
    core_list3: [
    
     

    ],
    // 0为加载中 1为加载完成
    statu:{
      kb:0,wl:0,xyk:0
    },
    is_bd:false
  },
  onShow:function(o){
    
  },
  check:function(e){

    if(!this.data.is_bd){
      wx.showToast({
        icon:'none',
        title: '未绑定',
      })
    }else{
     
      wx.navigateTo({
        url: e.currentTarget.dataset.url,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onReady: function (options) {
    this.get_gg()
    let is_bd=wx.getStorageSync('is_bd')
    if(is_bd){
      app.globalData.gg_info=wx.getStorageSync('gg_info')
      this.setData({
        gg_show: app.globalData.gg_info
        })
      // if (!wx.getStorageSync('zx_ts')) {
      //   wx.showModal({
      //     title: '易航招新啦',
      //     content: '易航工作室（开发E航大、易航网）正面向全校招新，点进来看一看？',
      //     cancelText: '取消',
      //     success: function (res) {
      //       if (res.confirm) {
      //         wx.navigateTo({
      //           url: '/pages/core/zx/js',
      //         })
      //       }

      //       wx.setStorageSync('zx_ts', true)
      //     }
      //   })
      // }
      this.setData({ is_bd: true })
      if (!wx.getStorageSync('kc_list')) {
        this.get_kb()
      } else {
        // 考试与课表同时登陆教务系统会出现冲突，故不能同时进行
        let ks_last_date = wx.getStorageSync('ks_info').date
        if (((new Date().getTime() - ks_last_date) / 1000) > 3600 * 48 || !ks_last_date)        {
          this.get_ks()
        }
      }
      // 上次查询时间
      let jy_last_date = wx.getStorageSync('jy_info').date
      if (((new Date().getTime() - jy_last_date) / 1000) > 3600 * 12 || !jy_last_date){
        this.get_jy()
        this.get_gg()
      }
      this.get_xyk()
      this.get_wl() 
      let st_last_date = wx.getStorageSync('st_info').date
      if (((new Date().getTime() - st_last_date) / 1000) > 3600 * 12 || !st_last_date) {
        this.get_st()
      }
      let xq_start_info = wx.getStorageSync('xq_start_info').date
      this.set_kb()
    }else{
      wx.navigateTo({
        url: '/pages/my/login/login',
      })
    }
    
  },
  onPullDownRefresh: function () {
    this.setData({
      statu: {
        kb: 0, wl: 0, xyk: 0, is_bd: false
      }
      })
    this.onReady()
    wx.stopPullDownRefresh()
  },
  sx_kb:function(){
    this.setData({
      statu: {
        kb: 0, wl: 1, xyk: 1, is_bd: false
      }
    })
    this.get_kb()
  },
  arrSort: function (arr) {
    var len = arr.length;
    var minIndex, temp;
    for (var i = 0; i < len - 1; i++) {
      minIndex = i;
      for (var j = i + 1; j < len; j++) {
        if (parseInt(arr[j].js.substring(0, 1)) < arr[minIndex].js.substring(0, 1)) {     //寻找最小的数
          minIndex = j;                 //将最小数的索引保存
        }
      }
      temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;
    }
    return arr;



  },
  redirect:function(e){
    
    console.log(e)
    let url = e.currentTarget.dataset.url
    let types = e.currentTarget.dataset.type
    if(types==1){
      wx.navigateTo({
        url: url,
      })
    }else{
      wx.navigateToMiniProgram({
        appId: 'wx39d2d1bea2af209e',
        path: '',
        envVersion: 'develop',
        success(res) {
          console.log(res)
          // 打开成功
        }
      })
    }
  },
  get_gg:function(){
    wx.request({
      url: app.globalData.SERVER + '/api/get_gg/',
      method: 'GET',
      success: function (res) {
        if (res.data.code = 200) {
          wx.setStorageSync('gg_info', res.data.data)
        }
      }
    })
  },
  set_kb:function(){
    let now = app.utils.getTodayDate()
    app.globalData.now_week = parseInt(app.utils.GetDateDiff(now, wx.getStorageSync('xq_start_info').time) / 7) + 1
    let list = wx.getStorageSync('kc_list')
    console.log(app.globalData.now_week)
    let now_week = app.globalData.now_week
    var d = new Date().getDay();
    // var d = 6;
    
    // 大于八点显示第二天的课表
    var nows = new Date();
    var year = nows.getFullYear();       //年  
    var hh = nows.getHours();            //时  
    
    if(hh>19){
      if (d == 0) {
        now_week++
      }
      if (d == 6) {
        d=0
      }else{
        d += 1
      }
    }
    var l = [7, 1,2, 3, 4, 5, 6];
    var hz = ["日", "一", "二", "三", "四", "五", "六"];
    var i
    let today_kc=[]
    for(i in list){
      if ((list[i].start_week <= now_week) && (list[i].end_week >= now_week)){
        if (app.utils.kbCheck(now_week,list[i].dsz)){
          if (list[i].day == l[d]) {
            today_kc.push({
              js: list[i].start + "-" + (parseInt(list[i].start) + parseInt(list[i].js - 1)).toString(),
              kcmc: list[i].name,
              df: list[i].place
            })
          }
        }
      }
    }
    let statu=this.data.statu
    statu.kb=1
    today_kc = this.arrSort(today_kc)
    console.log(today_kc)
    this.setData({ today_kc: today_kc, xqj: hz[d], statu: statu})
  },
  get_xyk: function () {
    let _this = this
    wx.request({
      url: app.globalData.SERVER + '/api/card_info/',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        'xh': app.userInfo.xh, 'psd': app.userInfo.epassword
      },
      method: 'POST',
      success: function (res) {
        if (!wx.getStorageSync('xyk_no_ts')) {
          let ye = res.data.per.ye.replace(/元/, '')
          let xyk_ts_last = 
          wx.getStorageSync('xyk_ts_last')
          if (((new Date().getTime() - xyk_ts_last) / 1000) > 3600 * 12 || !xyk_ts_last) {
            if (Number(ye) < 10) {
              wx.showModal({
                title: '校园卡提醒',
                content: '校园卡余额低于10元,请尽快充值,12小时仅提示一次',
                cancelText: '不再提醒',
                success: function (res) {
                  wx.setStorageSync('xyk_ts_last', new Date().getTime())
                  if (res.cancel) {
                    wx.setStorageSync('xyk_no_ts', true)
                  }
                }
              })
            }
          }
        }
        let statu = _this.data.statu
        statu.xyk = 1
        _this.setData({ xyk_ye: res.data.per.ye.replace(/元/, ''),statu:statu})
        wx.setStorageSync('ecard_info', res.data)
      }
    })
  },
  get_wl: function () {
    let _this = this
    wx.request({
      url: app.globalData.SERVER + '/api/net_info/',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        'username': app.userInfo.username, 'password': app.userInfo.password
      },
      method: 'POST',
      success: function (res) {
        wx.setStorageSync('wl_info',res.data)
        let wl_ye=res.data.leftMoney
        // 网费提醒
        if(!wx.getStorageSync('wf_no_ts')){
          let wf_ts_last=wx.getStorageSync('wf_ts_last')
          if (((new Date().getTime() - wf_ts_last) / 1000) > 3600 * 12 || !wf_ts_last) {
            if (wl_ye < 5) {
              wx.showModal({
                title: '网费提醒',
                content: '余额低于五元,请尽快充值,12小时仅提示一次',
                cancelText: '不再提醒',
                success: function (res) {
                  wx.setStorageSync('wf_ts_last', new Date().getTime())
                  if (res.cancel) {
                    wx.setStorageSync('wf_no_ts', true)
                  }
                }
              })
            }
          }
        }
        var wl=[],i,icon="sj.png"
        let dev = res.data.dev
        for(i in dev){
          if (dev[i].terminalType.indexOf('PC')>-1){
            icon ="PC.png"
          }
          wl.push({
            icon:icon,
            dev_name: dev[i].terminalType,
            dev_ll: dev[i].downFlow,
            dev_id: dev[i].sessionId
          })
        }
        let statu = _this.data.statu
        statu.wl = 1
       
        _this.setData({
          wl_ye: wl_ye,
          wl_dev:wl,
          statu: statu
        })
        wx.setStorageSync('wl_info', res.data)
      }
    })
  },
  wl_zx:function(e){
    wx.showLoading({
      title: '正在注销中',
    })
    let _this = this
    wx.request({
      url: app.globalData.SERVER + '/api/net_logout/',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        'username': app.userInfo.username, 'password': app.userInfo.password, 'session_id': e.currentTarget.dataset.id
      },
      method: 'POST',
      success: function (res) {
        // app.userInfo.username
        wx.hideLoading()
        if(res.data.code=200){
          
          wx.showToast({
            title: '注销成功',
          })
          let statu = _this.data.statu
          statu.wl=0
          _this.setData({ statu: statu})
          _this.get_wl() 
        }
      }
    })
  },
  get_kb:function () {
    let _this = this
    wx.request({
      url: app.globalData.SERVER + '/api/edu_class/',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        'username': app.userInfo.username, 'password': app.userInfo.password
      },
      method: 'POST',
      success: function (res) {
        console.log(res)
        wx.setStorageSync('kc_list', res.data.class_list)
        wx.setStorageSync('xq_start_info', { time: res.data.xq_start})
        _this.set_kb()
      }
    })
  },
  get_jy:function(){
    wx.request({
      url: app.globalData.SERVER + '/api/lib_info/', 
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        'xh': app.userInfo.tsg_qz, 'psd': app.userInfo.tpassword
      },
      method: 'POST',
      success: function (res) {
        console.log(res)
        if (res.data.code == 200) {
          let list = res.data.book_list
          if (!wx.getStorageSync('jy_no_ts')) {
            if (list) {
              let now = app.utils.getTodayDate()
              let length = list.length
              wx.setStorageSync('jy_info', { list: list, date: new Date().getTime() })
              for (let i = 0; i < length; i++) {
                let date = list[i].duedate.split(',')[0]
                let ts = app.utils.GetDateDiff(date, now)
                if (ts < 5) {
                  wx.showModal({
                    title: '借阅提醒',
                    content: '有即将到期或者已经逾期书籍，是否立即查看',
                    success: function (res) {
                      if (res.confirm) {
                        wx.navigateTo({
                          url: '/pages/core/ts/ts',
                        })
                      }
                    }
                  })
                  break
                }
              }
            }
          }
         
        }

      }
    })
  },
  get_st:function(){
    wx.request({
      url: app.globalData.SERVER + '/api/xg_info/', 
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        'username': app.userInfo.username, 'password': app.userInfo.password,
      },
      method: 'POST',
      success: function (res) {
        if (res.data.code == 200) {
          var st_info = res.data
          wx.setStorageSync('st_info', { st_info: st_info, date: new Date().getTime()})
        }
      }
    })
  },
  get_ks:function(){
    wx.request({
      url: app.globalData.SERVER + '/api/edu_exam/', 
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        'username': app.userInfo.username, 'password': app.userInfo.password
      },
      method: 'POST',
      success: function (res) {
        let list = res.data.exam_list
        wx.setStorageSync('ks_info', { list: list, date: new Date().getTime() })
      }
    })
  },
  
  
})

