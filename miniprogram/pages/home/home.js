//index.js
const app = getApp()

Component({
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
  }
})
