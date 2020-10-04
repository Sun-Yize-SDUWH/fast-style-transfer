// pages/history/history.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: null,
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this=this
    var openid=wx.getStorageSync("userInfo");
    console.log(openid)
    this.setData({
      openid:openid
    })
    //1、引用数据库
    //const db = wx.cloud.database({ envs: "tjnk3u19"})
    const db = wx.cloud.database({});
    const cont = db.collection('history');
    //2、开始查询数据了  news对应的是集合的名称
    db.collection('history').where({
      _openid: openid,
    
    })
    .get({
      success: function(res) {
        console.log("hahaha")
        // res.data 是包含以上定义的两条记录的数组
        console.log(res.data[0])
        let list=res.data
        console.log("kanknalist")
        console.log(list)
        _this.setData({
          list:list,
        })
      }
    })
    let list=this.data.list
    console.log(list)
   

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