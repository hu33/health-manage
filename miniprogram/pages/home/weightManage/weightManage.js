const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: 0,
    weight: 0,
    gender: null,
    genderData: ['男', '女'],
    age: 0,
    bmi: 0,
    bmiLevel : 0,
    perfectWeight: 0,
    bmiPerfectWeight: 0,
    lowRangeWeight: 0,
    highRangeWeight: 0,
    bmr: 0,
    mhr: 0,
    lowRangeBhr: 0,
    highRangeBhr: 0,
    heightFocus: true,
    weightFocus: false,
    genderFocus: false,
    ageFocus: false,
    showResult: false,
    showModal: false,
    modalTitle: '',
    modalContent: '',
    bmiLevelList: [{
      level: 0,
      value: '<=18.4',
      label: '轻体重',
      des:'属于偏瘦身材哦',
      color: '#ccff33',
      width: '22%'
    }, {
        level: 1,
        value: '18.5~23.9',
        label: '正常',
        des: '很标准的身材呢',
        color: '#8dc63f',
        width: '35%'
    }, {
        level: 2,
        label: '超重',
        des: '超重了哦',
        value: '24~27.9',
        color: '#cc6633',
        width: '29%'
    }, {
        level: 3,
        value: '>=28',
        label: '肥胖',
        des: '已经属于肥胖了哦',
        color: '#ff0000',
        width: '22%'
    }]
  },
  heightChange(e) {
    this.setData({
      height: Number(e.detail.value)
    })
  },
  weightChange(e) {
    this.setData({
      weight: Number(e.detail.value)
    })
  },
  genderChange(e) {
    const _genderData = this.data.genderData;
    const _gender = _genderData[e.detail.value];
    this.setData({
      gender: _gender
    })
  },
  ageChange(e) {
    this.setData({
      age: Number(e.detail.value),
      ageFocus: false
    })
  },

  weightAnalyze() {
    // 先判断信息是否填写且有效
    if(!this.infoEmptyAndValid()) {
      return;
    }

    const _data = this.data;
    // 计算BMI值
    const _bmi = (_data.weight / (_data.height * _data.height / 10000)).toFixed(1);
    
    // 计算BMILevel
    let _bmiLevel = 0;
    if (_bmi < 18.5) {
      _bmiLevel = 0;
    } else if(_bmi < 24) {
      _bmiLevel = 1;
    } else if(_bmi < 28) {
      _bmiLevel = 2;
    } else {
      _bmiLevel =3;
    }

    // 计算体重相关数据
    let _bmiPerfectWeight = 0;
    let _perfectWeight = 0;
    let _lowRangeWeight = 0;
    let _highRangeWeight = 0;
    let _bmr = 0;
    const _height = _data.height;
    if (_data.gender === '男') {
      _bmiPerfectWeight = (22.2 * _height * _height / 10000).toFixed(1);
      _perfectWeight = _height - 105;
      _bmr = this._getBmr('男', _data.height, _data.weight, _data.age);
    } else {
      _bmiPerfectWeight = (21.9 * _height * _height / 10000).toFixed(1);
      _perfectWeight = ((_height - 100) * 0.85).toFixed(1);
      _bmr = this._getBmr('女', _data.height, _data.weight, _data.age);
    }
    _lowRangeWeight = (18.5 * _height * _height / 10000).toFixed(1);
    _highRangeWeight = (23.9 * _height * _height / 10000).toFixed(1);
    const _bmiSug = this._getBmiSug(_bmiLevel);
    const _mhr = this._getMhr(_data.age);
    const _lowRangeBhr = Math.round(_mhr * 0.6);
    const _highRangeBhr = Math.round(_mhr * 0.75);
    console.log(_data);
    this.setData({
      bmi: _bmi,
      bmiLevel: _bmiLevel,
      bmiPerfectWeight: _bmiPerfectWeight,
      perfectWeight: _perfectWeight,
      lowRangeWeight: _lowRangeWeight,
      highRangeWeight: _highRangeWeight,
      bmiSug: _bmiSug,
      showResult: true,
      bmr: _bmr,
      mhr: _mhr,
      lowRangeBhr: _lowRangeBhr,
      highRangeBhr: _highRangeBhr
    })
  },

  // 判断基本信息是否填写完整且有效
  infoEmptyAndValid() {
    const _data = this.data;
    console.log('data', _data);
    // 如果身高不存在则要求填写，若存在则判断身高数值合法性
    if (!_data.height) {
      wx.showToast({
        title: '没填身高哦',
        icon: 'none',
        duration: 1500
      });
      this.formFocus('height');
      return false;
    } else {
      // 判断身高的合理性
      if (_data.height < 140 || _data.height > 200) {
        wx.showToast({
          title: '您填的身高真的木有问题吗？',
          icon: 'none',
          duration: 1500
        });
        this.formFocus('height');
        return false;
      }
    }
    if (!_data.weight) {
      wx.showToast({
        title: '没填体重哦',
        icon: 'none',
        duration: 1500
      });
      this.formFocus('weight');
      return false;
    } else {
      if (_data.weight < 20 || _data.weight > 150) {
        wx.showToast({
          title: '您这体重怕不是要吓屎我哦',
          icon: 'none',
          duration: 1500
        });
        this.formFocus('weight');
        return false;
      }
    }
    if (this.data.genderData.indexOf(this.data.gender) === -1){
      wx.showToast({
        title: '未选择性别',
        icon: 'none',
        duration: 1500
      });
      this.formFocus('gender');
      return false;
    }
    if (!_data.age) {
      wx.showToast({
        title: '没填年龄哦',
        icon: 'none',
        duration: 1500
      });
      this.formFocus('age');
      return false;
    } else {
      if (_data.age < 18 || _data.age > 65) {
        wx.showToast({
          title: '目前只支持年龄18~65的人群哦',
          icon: 'none',
          duration: 1500
        });
        this.formFocus('age');
        return false;
      }
    }
    return true;
  },

  _getBmiSug(bmiLevel) {
    let _bmiSug = '';
    switch (bmiLevel) {
      case 0:
        _bmiSug = '体重过轻容易营养不良哦，快快多吃点加强营养吧~';
        break;
      case 1:
        _bmiSug = '身材蛮标准的嘛，继续保持哦~';
        break;
      case 2:
        _bmiSug = '哦豁，超重了，要适当控制能量输入，增强体力活动呢~';
        break;
      case 3:
        _bmiSug = '已经是肥胖啦亲，很多慢性病都跟肥胖有关呢，还不赶快行动起来减肥！';
        break;
    }
    return _bmiSug;
  },

  // 计算bmr
  _getBmr(gender, height, weight, age) {
    let _bmr = 0;
    if (gender === '男') {
      _bmr = 9.99 * weight + 6.25 * height - 4.92 * age + 5;
    } else {
      _bmr = 9.99 * weight + 6.26 * height - 4.92 * age - 161;
    }
    return Math.round(_bmr);
  },

  // 计算mhr
  _getMhr(age) {
    return 220 - age;
  },

  // form元素聚焦
  formFocus(ele) {
    switch(ele) {
      case 'height':
        this.setData({
          heightFocus: true,
          weightFocus: false,
          genderFocus: false,
          ageFocus: false
        });
        break;
      case 'weight':
        this.setData({
          heightFocus: false,
          weightFocus: true,
          genderFocus: false,
          ageFocus: false
        });
        break;
      case 'gender':
        this.setData({
          heightFocus: false,
          weightFocus: false,
          genderFocus: true,
          ageFocus: false
        });
        break;
      case 'age':
        this.setData({
          heightFocus: false,
          weightFocus: false,
          genderFocus: false,
          ageFocus: true
        });
        break
    }
  },

  showModal(e){
    console.log('e.currentTarget.dataset:', e.currentTarget.dataset);
    this.setData({
      showModal: true
    })
  },

  hideModal(e){
    this.setData({
      showModal: false
    })
  }
})