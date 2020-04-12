// pages/mine/index.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    mineAfterMuses: [],
    afterMineMuses: [],
  },

  /**
   * 点击tab事件
   */
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
  },
  /**
   * 切换页面
   */
  swiperChange: function (e) {
    this.setData({
      currentTab: e.detail.current,
    })
  },

  /**
   * 生命周期函数--监听页面加载，仅一次
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   * 实测会在第一次 show 之后，仅触发一次
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.refreshMineAfterMuses();
    this.refreshAfterMineMuses();
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
  
  refreshMineAfterMuses: function() {
    const url = app.globalData.serverUrl + 'mine';
    const data = {
      user_id: app.globalData.openid,
      nickname: app.globalData.nickname
    };
    wx.request({
      url: url,
      method: 'POST',
      data: data,
      success: (result) => {
        if (result.statusCode==200) {
          console.log(result.data);
          this.setData({
            mineAfterMuses: result.data.data,  // 数组
          })
        }
      },
    })
  },
  refreshAfterMineMuses: function() {
    const url = app.globalData.serverUrl + 'relayMine';
    const data = {
      user_id: app.globalData.openid,
      nickname: app.globalData.nickname
    };
    wx.request({
      url: url,
      method: 'POST',
      data: data,
      success: (result) => {
        if (result.statusCode==200) {
          console.log(result.data);
          this.setData({
            afterMineMuses: result.data.data,  // 数组
          })
        }
      },
    })
  },
})