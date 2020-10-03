import Notify from '../../@vant/weapp/notify/notify';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    text:'\n\n风格简介',
    list: [
      {num:1,name:'风格1',proUrl:'../../images/11.png',des:"hhh1", choose:false, generate:false},
      {num:2,name:'风格2',proUrl:'../../images/12.png',des:"hhh2", choose:false, generate:false},
      {num:3,name:'风格3',proUrl: '../../images/5.png',des:"hhh3", choose:false, generate:false},
      {num:4,name:'风格4',proUrl:'../../images/6.jpg',des:"hhh4", choose:false, generate:false}, 
      {num:5,name:'风格5',proUrl:'../../images/1.png',des:"hhh5", choose:false, generate:false},
      {num:6,name:'风格6',proUrl:'../../images/1.png',des:"hhh6", choose:false, generate:false},
      {num:7,name:'风格7',proUrl:'../../images/1.png',des:"hhh7", choose:false, generate:false}
    ],
    current: 0,
    animationData: {},
    animationData2: {},
    changeStyle: false,
    choose: false,
    show: false,
    showShare: false,
    options: [
      { name: '微信', icon: 'wechat', openType: 'share' },
      { name: 'QQ', icon: 'qq' },
      { name: '保存图片', icon: '/images/img1.png' },
      { name: '分享海报', icon: 'poster' },
    ],
    modellist: ['starry_night', 'sduwh', 'des_glaneuses', 'la_muse', 'starry_night', 'udnie', 'la_muse_old', 'mirror', 'udnie_old', 'wave_crop']
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.stretch(350)
  },
  change(e){
    this.setData({
      current: e.detail.current
    })
    this.stretch(350)
    this.shrink(300)
  },
  // 收缩
  stretch(h){
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })
    this.animation = animation
    animation.height(h).step()
    this.setData({
      animationData: animation.export(),
    })
  },
  // 展开
  shrink(h){
    var animation2 = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })
    this.animation2 = animation2
    animation2.height(h).step()
    this.setData({
      animationData2: animation2.export()
    })
  },

  goToDescription1(){

    wx.navigateTo({
      url: '../pic1/pic1',
    })
  },
  goToDescription2(){

    wx.navigateTo({
      url: '../pic2/pic2',
    })
  },
  goToDescription3(){

    wx.navigateTo({
      url: '../pic3/pic3',
    })
  },
  goToDescription4(){

    wx.navigateTo({
      url: '../pic4/pic4',
    })
  },
  goToDescription5(){

    wx.navigateTo({
      url: '../pic5/pic5',
    })
  },
  goToDescription6(){

    wx.navigateTo({
      url: '../pic6/pic6',
    })
  },
  goToDescription7(){

    wx.navigateTo({
      url: '../pic7/pic7',
    })
  },

  chooseimg: function() {
    var _this = this
    wx.chooseImage({
      success (res) {
        var temp1 = 'list[' + _this.data.current + '].proUrl'
        var temp2 = 'list[' + _this.data.current + '].tempimg'
        var temp3 = 'list[' + _this.data.current + '].choose'
        _this.setData({
          [temp1]: res.tempFilePaths[0],
          [temp2]: res.tempFilePaths[0],
          [temp3]: true,
        })
        Notify({
          type: 'success',
          message: '选择成功',
          duration: 1000,
        });
      }
    })
  },

  generate: function() {
    var _this = this
    if(this.data.list[_this.data.current].choose==false){ 
      wx.showToast({
        title: '请选择图片',
        icon: 'none',
      })
    }else{
      var numvalue = _this.data.current
      wx.showLoading({
        title: '生成图片中...',
      })
      _this.setData({
        changeStyle: true,
      })
      wx.uploadFile({
        url: 'https://experimentforzcl.cn:8080',
        filePath: _this.data.list[_this.data.current].tempimg,
        name: 'file',
        formData:{'style': _this.data.modellist[_this.data.current],
            'original_color': Number(_this.data.original_color),
            'blend_alpha': Number(_this.data.blend_alpha)
          },
        success (res){
          if(res.statusCode==200){
            var temp1 = 'list[' + numvalue + '].proUrl'
            var temp2 = 'list[' + numvalue + '].generate'
            wx.hideLoading()
            _this.setData({
              [temp1]: "data:image/png;base64," + res.data,
              [temp2]: true,
              changeStyle: false,
            })
            wx.hideLoading(),
            Notify({
              type: 'success',
              message: '生成成功',
              duration: 1000,
            });
          }
        }
      })
    }
  },

  changeColor: function(res) {
    this.setData({
      original_color: res.detail/100
    })
    wx.showToast({
      icon: 'none',
      title: `颜色保留：${res.detail}%`,
    });
  },

  styleChange: function(res) {
    this.setData({
      blend_alpha: res.detail/100
    })
    wx.showToast({
      icon: 'none',
      title: `风格占比：${res.detail}%`,
    });
  },

  gotoShare: function() {
    this.setData({
      showShare: true,
    })
  },

  shareSelect(res) {
    var _this = this
    if(res.detail.index==2){
      if(_this.data.list[_this.data.current].generate==true){
        var number = Math.random();
        wx.getFileSystemManager().writeFile({
          filePath: wx.env.USER_DATA_PATH + '/pic' + number + '.png',
          data: _this.data.list[_this.data.current].proUrl.slice(22),
          encoding: 'base64',
          success: res => {
            wx.saveImageToPhotosAlbum({
              filePath: wx.env.USER_DATA_PATH + '/pic' + number + '.png',
              success: function (res) {
                wx.showToast({
                  title: '保存成功!',
                  icon: "none"
                })
              },
              fail: function (err) {
                wx.showToast({
                  title: '保存失败',
                  icon: "none"
                })
              }
            })
          },
        })
      }else{
        wx.showToast({
          title: '保存失败，请先生成图片',
          icon: 'none'
        })
      }
    }else if(res.detail.index==3){
      wx.navigateTo({
        url: '/pages/share/share',
      })
    }
    this.shareClose();
  },

  shareClose() {
    this.setData({
      showShare: false
    });
  },

})