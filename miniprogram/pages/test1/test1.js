// pages/test1/test1.js
import Notify from '../../@vant/weapp/notify/notify';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    proUrl: "/images/1.png",
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
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  chooseimg: function() {
    var _this = this
    wx.chooseImage({
      success (res) {
        _this.setData({
          tempimg: res.tempFilePaths[0],
          choose: true,
        })
        _this.setData({
          proUrl: res.tempFilePaths[0],
          choose: true,
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
    if(this.data.choose==false){ 
      wx.showToast({
        title: '请选择图片',
        icon: 'none',
      })
    }else{
      wx.showLoading({
        title: '生成图片中...',
      })
      _this.setData({
        changeStyle: true,
      })
      wx.uploadFile({
        url: 'https://experimentforzcl.cn:8080',
        filePath: _this.data.tempimg,
        name: 'file',
        formData:{'style': 'la_muse_old',
            'original_color': Number(_this.data.original_color),
            'blend_alpha': Number(_this.data.blend_alpha)
          },
        success (res){
          if(res.statusCode==200){
            wx.hideLoading()
            _this.setData({
              proUrl: "data:image/png;base64," + res.data,
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
      var number = Math.random();
      wx.getFileSystemManager().writeFile({
        filePath: wx.env.USER_DATA_PATH + '/pic' + number + '.png',
        data: _this.data.proUrl.slice(22),
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