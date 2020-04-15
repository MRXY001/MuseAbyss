// pages/line/line.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    currentMuseID: 0,
    isMySelfMuse: false,
    parentMuses: [],
    childMuses: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      // 如果之前已经获取到，那么自动打开
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
    // 手动点击按钮返回后获取到 UserInfo
    console.log("getUserInfo: function", e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });
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
    const museID = (wx.getStorageSync('line_muse_id') || -1);
    this.refreshLine(museID);
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

  refreshLine: function(museID) {
    const url = app.globalData.serverUrl + 'line';
    const data = {
      user_id: app.globalData.openid,
      nickname: app.globalData.nickname,
      muse_id: museID
    };
    wx.request({
      url: url,
      method: 'POST',
      data: data,
      success: (result) => {
        if (result.statusCode==200) {
          console.log('line', result.data.user_id == app.globalData.openid, result.data);
          this.setData({
            currentMuseID: museID,
            isMySelfMuse: result.data.user_id == app.globalData.openid,
            parentMuses : result.data.parents,
            childMuses : result.data.children || []
          });
        }
      },
    })
  },

  /**
   * 跳转到故事线
   */
  bindGoLineTap: function(e) {
    const museID = e.currentTarget.id;
    this.refreshLine(museID);
  },
  /**
   * 举报
   */
  bindGoReportTap: function(e) {
    const museID = e.currentTarget.id;
  },

  /**
   * 接力
   */
  formSubmit: function(e) {
    const content = e.detail.value.textarea;
    if (content.length < 30) {
      wx.showToast({
        title: '请输入30~300字的情节',
      });
      return ;
    }
    const url = app.globalData.serverUrl + 'relay';
    console.log(app.globalData.userInfo);
    const data = {
      user_id: app.globalData.openid,
      nickname: app.globalData.nickname,
      muse_id: this.data.currentMuseID,
      content: content
    };
    wx.request({
      url: url,
      method: 'POST',
      data: data,
      success(result) {
        if (result.statusCode==200) {
          wx.showToast({
            title: '发布成功',
          });
          if (result.data.result == true) {
            refreshLine(result.data.muse_id); // 加载新的情节线
          }
          else {
            wx.showToast({
              title: result.data.msg,
            });
          }
        }
      },
    })
  },
})