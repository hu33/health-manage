// pages/weightManage/weightRecord/weightRecord.js
import * as echarts from '../../../ec-canvas/echarts';

const app = getApp();

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  let option = {
    color: ['#66cccc'],
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      left: '0',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    legend: {
      data: ['体重']
    },
    calculable: true,
    xAxis: [
      {
        show: false,
        type: 'category',
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        show: false,
        min: function (value) {
          return value.min - 5;
        },
        max: function (value) {
          return value.max;
        },
      }
    ],
    series: [
      {
        name: '今日体重',
        type: 'bar',
        data: [45.0, 45.45, 45.75, 45.75, 46, 46.25, 46.45],
        barWidth: '65%',
      },
    ]
  };

  chart.setOption(option);
  return chart;
}

Component({

  options: {
    addGlobalClass: true,
  },

  data: {
    ec: {
      onInit: initChart
    },
    customBar: app.globalData.CustomBar,
  },
  methods: {

  }
})
