// pages/mine/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
  },

  /**
   * 点击tab事件
   */
  swichNav: function (e) {
    console.log('switch:', e);
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
    console.log('change:', e);
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