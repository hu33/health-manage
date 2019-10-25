const app = getApp();

Page({
  data: {
    pageCur: 'weightRecord',
    isDigitKbdShow: false,
    recordWeight: '0.0',
    kbVal: ''
  },
  onLoad(options) {
    wx.showShareMenu({
      withShareTicket: true
    });
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
      isDigitKbdShow: false
    })
  },

  tapNum(e) {
    // 如果小数位数超过2就不做处理
    var kbVal = this.data.kbVal;
    var demicalLength = kbVal.length - (kbVal.indexOf('.') + 1);
    if (demicalLength > 1) {
      return;
    }
    var text = e.currentTarget.dataset.text;
    var val = kbVal + text;
    if (!this.checkKbVal(val)) {
      return;
    }
    this.setKbVal(val);
  },

  tapZero() {

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
  }
})