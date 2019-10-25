const app = getApp();

Page({
  data: {
    pageCur: 'weightRecord',
    isDigitKbdShow: false,
    recordWeight: '0.0'
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
  }
})