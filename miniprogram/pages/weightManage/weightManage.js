const app = getApp();
const db = wx.cloud.database()
// 用户信息表
const users = db.collection('user')
// 用户体重记录表
const weightRecords = db.collection('weight_record')
const NO_TARGET_TITLE = '请设置目标体重';

Page({
  data: {
    userId:'',
    openId:'',
    pageCur: 'weightRecord',
    // hasTargetWeight:  false,
    isDigitKbdShow: false,
    dkbTitle:'',
    kbVal: '',
    recordData: {
      todayWeight: '0.0',
      targetWeight: '0.0',
      diffWeight: '0.0'
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
        console.log("用户信息");
        console.log(res);
        // 如果没有目标体重，则弹出数字键盘
        if(!res.data[0].target_weight) {
          this.setData({
            isDigitKbdShow: true,
            dkbTitle: NO_TARGET_TITLE
          })
        } else {
          this.hideDigitKbd();
          this.setData({
            'recordData.targetWeight': res.data[0].target_weight
          });
        }
        if(res.data.length==1){
          this.setData({
            userId:res.data[0]._id
          })
        }
        //  *****************
        // 更新用户信息（身高、体重、性别、年龄）  示例
        // this.updateUserInfo(179,63,1,20)
        // ******************
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
      isDigitKbdShow: true,
      dkbTitle: '今天'
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

  updateTargetWeight(){
    this.setData({
      isDigitKbdShow: true,
      dkbTitle: NO_TARGET_TITLE
    })
  },

  // 点击数字键盘底下的“添加体重”按钮触发的方法
  addWeight() {
    if(this.data.dkbTitle === NO_TARGET_TITLE) {
      this.updateTargetWeightToDB(this.data.kbVal);
      this.setData({
        // recordData: {
        //   targetWeight: this.data.kbVal
        // }
        'recordData.targetWeight': this.data.kbVal
      })
    } else {
      this.setData({
        // recordData: {
        //   todayWeight: this.data.kbVal,
        // }
        'recordData.todayWeight': this.data.kbVal
      })
    }
      
    this.hideDigitKbd();
  },

  // 更新目标体重到数据库
  updateTargetWeightToDB(val){
    if(this.data.userId!=''){
      users.doc(this.data.userId).update({data:{
        target_weight:val
      }})
    }
    console.log("更新目标体重成功")
  },
  // 添加体重记录到数据库
  addWeightRecordToDB(date,val){
    if(this.data.userId!=''){
      users.add({data:{
        date:date,
        value:val
      }})
    }
  },
    // 更新用户的个人信息（身高、体重、性别、年龄）
    updateUserInfo(height,weight,sex,age){
      if(this.data.userId!=''){
        users.doc(this.data.userId).update({data:{
          height:height,
          weight:weight,
          gender:sex,
          age:age
        }})
      }
    }
})