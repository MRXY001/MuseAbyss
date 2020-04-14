//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '写作天下之思绪深渊',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    currentTab: 0,
    latestMuses: [],
    maximumMuses: [],
    entranceMuses: []
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
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
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
  onShow: function() {
    this.refreshLatestMuses();
    this.refreshMaximumMuses();
    this.refreshEntranceMuses();
  },
  refreshLatestMuses: function() {
    const url = app.globalData.serverUrl + 'latest';
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
            latestMuses: result.data.data,  // 数组
          })
        }
      },
    })
  },
  /**
   * 联网获取列表
   */
  refreshMaximumMuses: function() {
    const url = app.globalData.serverUrl + 'maximum';
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
            maximumMuses: result.data.data,  // 数组
          })
        }
      },
    })
  },
  refreshEntranceMuses: function() {
    const url = app.globalData.serverUrl + 'entrance';
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
            entranceMuses: result.data.data,  // 数组
          })
        }
      },
    })
  },

  /**
   * 跳转到故事线
   */
  bindGoLineTap: function(e) {
    const museID = e.currentTarget.id;
    this.goLine(museID);
  },
  goLine: function(museID) {
    // 保存数据，在 line 的 onShow 里读取
    wx.setStorageSync('line_muse_id', museID);
    wx.navigateTo({
      url: '../line/line',
    })
  },

  /**
   * 举报
   */
  bindGoReportTap: function(e) {
    const museID = e.currentTarget.id;
  },
})
