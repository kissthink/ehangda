

//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    colorArrays: ["#85B8CF", "#90C652", "#D8AA5A", "#FC9F9D", "#0A9A84", "#61BC69", "#12AEF3", "#E29AAD", "#7F6ED3", '#f3456d', '#f4d95b', '#f4eede', '#f49930', '#f26d26','#005e37', '#24a560', '#4cd964', '#3eb866', '#f7f7f7', '#5580a1', '#7299a7', '#aab9be', '#cad5d9', '#68a2a9','#f8e400', '#f26378', '#13dbad', '#ff7d48', '#a2ef54'],
    array: ['第1周', '第2周', '第3周', '第4周', '第5周', '第6周', '第7周', '第8周', '第9周', '第10周', '第11周', '第12周', '第13周', '第14周', '第15周', '第16周', '第17周', '第18周', '第19周', '第20周'],
    detail: false,
    show_zs:false
  },
  bindDateChange: function (e) {
    let date = e.detail.value
    app.globalData.now_week = parseInt(app.utils.GetDateDiff(date, wx.getStorageSync('xq_start_info').time) / 7) + 1
   
    this.onLoad()
  },
  onLoad: function () {
    let wlist=wx.getStorageSync('kc_list')
    var color_list=[]
    var color_count=0
    let colorArrays = this.data.colorArrays
    // 同一个课程同一个色块
    if(!('color' in wlist[0])){
      for (var i in wlist) {
        if (wlist[i].name in color_list){
          wlist[i].color = color_list[wlist[i].name]
        }else{
          wlist[i].color = colorArrays[color_count]
          color_list[wlist[i].name] = colorArrays[color_count]
          color_count++
        }
      }
    }
    wx.setStorageSync('kc_list', wlist)
    let now_week = app.globalData.now_week
    // let now_week = 4
    let new_list=[]
    for(var i in wlist){
      if (app.utils.kbCheck(now_week, wlist[i].dsz)){
        if ((now_week >= wlist[i].start_week) && (now_week <= wlist[i].end_week)){
          new_list.push(wlist[i])
        }
      }
    }
   
    // 将所有的课程节数变成数组
    for (var i in new_list){
      new_list[i].is_hc=false
      new_list[i].all_class = this.arr_create(new_list[i].start, new_list[i].js)
    }
    new_list = this.arrSort(new_list)
    let last_list=[]
    for (var i in new_list) {
      if (new_list[i].is_hc==false){
        let check_res = this.check_cf(new_list[i], new_list)
        // console.log(check_res)
        new_list = check_res[1]
        let sort_arr = this.arrSort(check_res[0])
        sort_arr[0].js_cf = check_res[2]
        last_list.push(sort_arr)
      }
    }
    console.log(last_list)

    this.setData({ wlist: last_list, now_week: now_week})
  },
  check_cf:function(now_arr,all_arr){
    var cf_list=[]
    var is_cf=false
    cf_list.push(now_arr)
    for (var i in all_arr){
      if (all_arr[i].day == now_arr.day){
        if (all_arr[i].name + all_arr[i].start_week != now_arr.name + now_arr.start_week){
          if (this.is_in_arr(all_arr[i].all_class, now_arr.all_class)) {
            cf_list.push(all_arr[i])
            all_arr[i].is_hc = true
            is_cf=true
          }
        }
      }
    }
 
    return [cf_list, all_arr, is_cf]
   
  },
  arrSort:function (arr) {
    var len = arr.length;
    for(var i = 0; i<len; i++) {
      for (var j = 0; j < len - 1 - i; j++) {
        if (arr[j].all_class.length < arr[j + 1].all_class.length) {        //相邻元素两两对比
          var temp = arr[j + 1];        //元素交换
          arr[j + 1] = arr[j];
          arr[j] = temp;
        }
      }
    }
 
    return arr;
  }
  ,
  arr_create:function(start,js){
    var arr=[]
    for(var i=start;i<(js+start);i++){
      arr.push(i)
    }
    return arr
  }
  ,
  is_in_arr:function(ar1,ar2){
    for(var i in ar1){
      if (ar2.indexOf(ar1[i])>=0){
        return true
      } 
      
    }
    return false
  },

  bindPickerChange: function (e) {
    let wlist = wx.getStorageSync('kc_list')
    let now_week = Number(e.detail.value) + 1
    let new_list = []
    for (var i in wlist) {
      if (app.utils.kbCheck(now_week, wlist[i].dsz)) {
        if ((now_week >= wlist[i].start_week) && (now_week <= wlist[i].end_week)) {
          new_list.push(wlist[i])
        }
      }
    }
    // 将所有的课程节数变成数组
    for (var i in new_list){
      new_list[i].is_hc=false
      new_list[i].all_class = this.arr_create(new_list[i].start, new_list[i].js)
    }
    let last_list=[]
    new_list = this.arrSort(new_list)
    for (var i in new_list) {
      if (new_list[i].is_hc==false){
        let check_res = this.check_cf(new_list[i], new_list)
        // console.log(check_res)
        new_list = check_res[1]
        let sort_arr = this.arrSort(check_res[0])
        sort_arr[0].js_cf = check_res[2]
        last_list.push(sort_arr)
      }
    }
    console.log(last_list)

    this.setData({
      wlist: last_list,
      index: e.detail.value,
      now_week: now_week,
      show_zs:false
    })
  },
  ckDetail:function(e){
    let index = e.currentTarget.dataset.id
    let wlist = this.data.wlist
    this.setData({
      now_detail_list: wlist[index],
      detail:true,
      sc_index: index
    })
  },
  delete_class:function(e){
    let _this=this
    wx.showModal({
      title: '请确认',
      content: '你确定要删除这节课吗？',
      success: function (res) {
        if (res.confirm) {
          let wlist = _this.data.wlist
          let now = wlist[_this.data.sc_index]
          let tag = now[0].name + now[0].day+now[0].place + now[0].start + now[0].start_week + now[0].end_week
          let slist = wx.getStorageSync('kc_list')
          let new_list = []
          for (var i = 0; i < slist.length; i++) {
            let tag_now = slist[i].name + slist[i].day + slist[i].place + slist[i].start + slist[i].start_week + slist[i].end_week
            console.log(tag)
            console.log(tag_now)
            if (tag_now != tag) {
              new_list.push(slist[i])
            }
          }
          // wlist.splice(this.data.sc_index, 1);
          wx.setStorageSync('kc_list', new_list)
          _this.onLoad()
        } 
      }
    })
   
  },
  hide:function(){
    this.setData({
      detail: false
    })
  },
  show_all:function(){
    let wlist = wx.getStorageSync('kc_list')
    let new_list = []
    for (var i in wlist) {
      new_list.push(wlist[i])
    }
    // 将所有的课程节数变成数组
    for (var i in new_list) {
      new_list[i].is_hc = false
      new_list[i].all_class = this.arr_create(new_list[i].start, new_list[i].js)
    }
    new_list = this.arrSort(new_list)
    let last_list = []
    for (var i in new_list) {
      if (new_list[i].is_hc == false) {
        let check_res = this.check_cf(new_list[i], new_list)
        // console.log(check_res)
        new_list = check_res[1]
        let sort_arr = this.arrSort(check_res[0])
        sort_arr[0].js_cf = check_res[2]
        last_list.push(sort_arr)
      }
    }
    console.log(new_list)

    this.setData({ wlist: last_list, show_zs: true, now_week:'全部课程'})
  },
  add: function () {
    wx.navigateTo({
      url: 'add',
    })
  }
})
