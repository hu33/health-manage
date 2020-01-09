//index.js
const app = getApp()
const db = wx.cloud.database()
const users = db.collection('user')

Page({
  data: {
    openId: '',
    nickName: '',
    gender: '',
    avatarUrl: null,
    language: '',
    country: '',
    province: '',
    city: '',
  },
  options: {
    addGlobalClass: true,
  },
  data: {
    elements: [{
      title: '体重管理',
      EnglishTitle: 'Weight Management',
      name: 'weightManage',
      color: 'cyan',
      icon: 'newsfill'
    },
    {
      title: '自动配餐',
      EnglishTitle: 'Food Recommendation',
      name: 'foodRecommend',
      color: 'blue',
      icon: 'colorlens'
    },
    {
      title: '风险评估',
      EnglishTitle: 'Risk Assessment',
      name: 'riskAssess',
      color: 'purple',
      icon: 'font'
    },
    {
      title: '其他',
      EnglishTitle: 'others',
      name: 'others',
      color: 'mauve',
      icon: 'icon'
    },
    ],
  },
  onLoad(options) {
    wx.showShareMenu({
      withShareTicket: true
    });
    wx.cloud.callFunction({
      name: 'login',
      complete: res => {
        console.log('callFunction test result: ', res)
        if (res.result != null) {
          this.setData({
            openId: res.result.openid
          })
        }
      }
    })
    let that=this;
    // 获取用户信息
    wx.getSetting({
      success(res) {
        // console.log("res", res)
        if (res.authSetting['scope.userInfo']) {
          console.log("已授权=====")
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              console.log("获取用户信息成功", res)
              that.setData({
                nickName: res.userInfo.nickName,
                gender: res.userInfo.gender,
                avatarUrl: res.userInfo.avatarUrl
              })
              users.where({
                _openid: that.data.openId
              })
                .limit(1)
                .get({
                  success:res=>{
                    // console.log(res.data)
                    // console.log(res.data.length)
                    if (res.data.length==0){
                      users.add({
                        data: {
                          nickName: that.data.nickName,
                          gender: that.data.gender,
                          avatarUrl: that.data.avatarUrl
                        },
                        success: function (res) {
                          console.log("添加用户信息成功"+res)
                        },
                        fail: console.error
                      
                      })
                    }
                  },
                  fail: console.error
                })
            },
            fail(res) {
              console.log("获取用户信息失败", res)
            }
          })
        } else {
          console.log("未授权=====")
          wx.showModal({
            title: '提示！',
            confirmText: '去设置',
            showCancel: false,
            content: "请授权",
            success: function (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/setting/setting',
                })
              }
            }
          })
        }
      }
    })



  },
  onShareAppMessage() {
    return {
      title: '快来管理一下您的健康吧~'
    }
  },
  foodRecTap() {
    wx.showToast({
      title: '敬请期待~',
      icon: 'none',
      duration: 1500
    })
  },
  riskAssTap() {
    wx.showToast({
      title: '敬请期待~',
      icon: 'none',
      duration: 1500
    })
  },
  othersTap() {
    wx.showToast({
      title: '还木有想好主题~',
      icon: 'none',
      duration: 1500
    })
  },
}
)
