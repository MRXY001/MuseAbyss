//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  goList: function() {
    wx.navigateTo({
      url: '../index/index'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      // 如果之前已经获取到，那么自动打开
      console.log('====onLoad0');
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log('====onLoad1');
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          console.log('====onLoad2');
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
  formSubmit: function(e) {
    const content = e.detail.value.textarea;
    if (content.length < 30) {
      wx.showToast({
        title: '请输入30~300字的情节',
      });
      return ;
    }
    const url = app.globalData.serverUrl + 'create';
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
            wx.switchTab({
              url: '../index/index'
            })
          }
          else {
            wx.showToast({
              title: result.data.msg,
            });
          }
        }
      },
    })
  }
})
