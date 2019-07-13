const app = getApp();

Page({
  data: {
    pageCur: 'weightRecord'
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
  }
})