// pages/mine/index.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    currentTab: 0,
    mineAfterMuses: [],
    afterMineMuses: [],
    rankUsers: [],
    relayedCount: 0,
    myRank: 0,
    openid: null
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
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        openid: app.globalData.openid
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
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
    this.refreshRankUsers();
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
  refreshRankUsers: function() {
    const url = app.globalData.serverUrl + 'rank';
    const data = {
      user_id: app.globalData.openid,
    };
    wx.request({
      url: url,
      method: 'POST',
      data: data,
      success: (result) => {
        if (result.statusCode==200) {
          console.log(result.data);
          this.setData({
            relayedCount: result.data.mine,
            myRank: result.data.rank,
            rankUsers: result.data.users.data,  // 数组
          })
        }
      },
    })
  }
})