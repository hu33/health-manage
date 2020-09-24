// pages/weightManage/weightRecord/weightRecord.js
import * as echarts from '../../../ec-canvas/echarts';

const app = getApp();

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    color: ["#66cccc"],
    legend: {
      // top: 50,
      left: 'center',
      backgroundColor: '#66cccc',
      z: 100
    },
    grid: {
      containLabel: true
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      // show: false
    },
    yAxis: {
      x: 'center',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
      // show: false
    },
    series: {
      type: 'line',
      smooth: true,
      data: [10, 30, 31, 50, 40, 20, 10]
    }
  };
  chart.setOption(option);
  return chart;
}

Component({

  options: {
    addGlobalClass: true,
  },

  properties: {
    recordData: {
      type: Object,
      value: {
        todayWeight: '0.0'
      },
      observer: function (newVal, oldVal) {
        console.log("newVal: ", newVal);
        console.log("oldVal: ", oldVal);
        // this._propertyChange(newVal, oldVal);
      } // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'

    }
  },

  data: {
    ec: {
      onInit: initChart
    },
    customBar: app.globalData.CustomBar,
    dailyWeights: [45,45.25,45.35,45.5,45.75,46,46.5],
    weekName: ['6.29','6.30','7.1','7.2','7.3','7.4','7.5','7.6','7.7','7.8','7.9','7.10']
  },
  methods: {
    _propertyChange: function(newVal, oldVal) {
      
    }
  },

})
