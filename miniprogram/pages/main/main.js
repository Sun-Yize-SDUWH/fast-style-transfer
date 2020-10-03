Page({
  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    text:'\n\n风格简介',
    list: [
      {num:1,name:'风格1',proUrl:'../../images/11.png',des:"hhh1"},
      {num:2,name:'风格2',proUrl:'../../images/12.png',des:"hhh2"},
      {num:3,name:'风格3',proUrl: '../../images/5.png',des:"hhh3"},
      {num:4,name:'风格4',proUrl:'../../images/6.jpg',des:"hhh4"}, 
      {num:5,name:'风格5',proUrl:'../../images/1.png',des:"hhh5"},
      {num:6,name:'风格6',proUrl:'../../images/1.png',des:"hhh6"},
      {num:7,name:'风格7',proUrl:'../../images/1.png',des:"hhh7"}
    ],
    current: 0,
    animationData: {},
    animationData2: {}
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
  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
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
  }
})