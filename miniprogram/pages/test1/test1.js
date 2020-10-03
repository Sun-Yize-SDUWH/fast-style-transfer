// pages/test1/test1.js
import Notify from '../../@vant/weapp/notify/notify';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    proUrl: "/images/1.png",
    choose: false,
    show: false,
    showShare: false,
    options: [
      { name: '微信', icon: 'wechat', openType: 'share' },
      { name: '微博', icon: 'weibo' },
      { name: '复制链接', icon: 'link' },
      { name: '分享海报', icon: 'poster' },
    ],
  },


  onClick(event) {
    this.setData({ showShare: true });
  },

  onClose() {
    this.setData({ showShare: false });
  },

  onSelect(event) {
    Toast(event.detail.name);
    this.onClose();
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
              proUrl: "data:image/png;base64," + res.data
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
  },

  styleChange: function(res) {
    this.setData({
      blend_alpha: res.detail/100
    })
  },

  gotoShare: function() {
    this.setData({
      showShare: true,
    })
  }
})