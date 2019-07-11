//index.js
const app = getApp()

Page({
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
