// pages/line/line.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentMuseID: 0,
    parentMuses: [],
    childMuses: [],
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
          console.log('line', result.data);
          this.setData({
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