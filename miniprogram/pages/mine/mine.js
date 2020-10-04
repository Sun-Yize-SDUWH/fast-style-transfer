// miniprogram/pages/mine/mine.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    console.log(e)
    wx.cloud.callFunction({
      name: 'index',
      data: {
      },
      success: res => {
        console.log("hello")
        console.log(res)
        console.log(res.result.openid)
     
        //需要openid
       
        this.setData({
          userInfo: res.result.openid,

        })
        wx.setStorageSync('userInfo',res.result.openid)
      }
    })

  },
  gotoours:function(){
    wx.navigateTo({
      url: '../ours/ours',

    })
  },
  gotohistory:function(){
    let userInfo=this.data.userInfo
    console.log(userInfo)
    wx.navigateTo({
      url: '../history/history?openid=userInfo',

    })
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

  }
})