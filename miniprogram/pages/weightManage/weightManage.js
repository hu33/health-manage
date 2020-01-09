const app = getApp();

Page({
  data: {
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

    console.log("体重管理 "+this.data.openId)

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
  }
})