const app = getApp();
const db = wx.cloud.database()
// 用户信息表
const users = db.collection('user')
// 用户体重记录表
const weightRecords = db.collection('weight_record')

Page({
  data: {
    userId:'',
    openId:'',
    pageCur: 'weightRecord',
    isDigitKbdShow: false,
    kbVal: '',
    recordData: {
      todayWeight: '0.0'
    }
  },
  onLoad(options) {
    wx.showShareMenu({
      withShareTicket: true
    });
    this.setData(
      {
        openId: options.openId
      }
    )
    console.log("用户 openid： " + this.data.openId)

    // 查询用户信息(包含用户目标体重)
    users.where({
      _openid: this.data.openId
    }).limit(1).get({
      success: res => {
        console.log("用户信息")
        console.log(res)
        this.setData({
          userId:res.data._id
        })
      }
    })
    // 查询用户体重记录
    weightRecords.where({
      _openid: this.data.openId
    }).get({
      success: res => {
        console.log("用户体重记录")
        console.log(res)
      }
    })

   

  },
  onShareAppMessage() {
    return {
      title: '快来管理您的体重吧~'
    }
  },
  navChange(e) {
    this.setData({
      pageCur: e.currentTarget.dataset.cur
    })
  },

  showDigitKbd() {
    this.setData({
      isDigitKbdShow: true
    })
  },

  hideDigitKbd() {
    this.setData({
      isDigitKbdShow: false,
      kbVal: ''
    })
  },

  tapNum(e) {
    var kbVal = this.data.kbVal;
    var demicalLength = kbVal.length - (kbVal.indexOf('.') + 1);
    // 如果小数位数超过2就不做处理
    if ((kbVal.indexOf('.') != -1) && demicalLength > 1) {
      return;
    }
    var text = e.currentTarget.dataset.text;
    var val = kbVal + text;
    // 如果kbVal不符合要求，就不更新data中的值
    if (!this.checkKbVal(val)) {
      return;
    }
    // 如果点击的是“0”且kbVal为空，则不做处理
    if (text == '0' && !kbVal) {
      return;
    }
    this.setKbVal(val);
  },

  tapFloat() {
    var kbVal = this.data.kbVal;
    // 如果kbVal是空的，或者已经有小数点了，就不做处理
    if (kbVal == '' || kbVal.indexOf('.') != -1) {
      return;
    }
    var val = kbVal + '.';
    this.setKbVal(val);
  },

  tapDel() {
    var val = this.data.kbVal.substring(0, this.data.kbVal.length - 1);
    this.setKbVal(val);
  },

  checkKbVal(text) {
    var kbVal = parseFloat(text);
    if (kbVal > 200) {
      wx.showToast({
        title: '体重超过200kg了？',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    return true;
  },

  setKbVal(val) {
    this.setData({
      kbVal: val
    })
  },

  addWeight() {
    var kbVal = parseFloat(this.data.kbVal);
    this.setData({
      recordData: {
        todayWeight: kbVal.toString(),
      }
    }, function(){
      console.log("data.recordData: ", this.data.recordData);
    })   
    this.hideDigitKbd();
  },
  // 更新目标体重到数据库
  updateTargetWeightToDB(val){
    if(this.data.userId!=''){
      users.doc(this.data.userId).update({data:{
        target_weight:val
      }})
    }
  },
  // 添加体重记录到数据库
  addWeightRecordToDB(date,val){
    if(this.data.userId!=''){
      users.add({data:{
        date:date,
        value:val
      }})
    }
  }
})