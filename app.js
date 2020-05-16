//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // const openIdUrl = 'https://api.weixin.qq.com/sns/jscode2session';
        wx.request({
          url: this.globalData.serverUrl + 'WXQQJSCODE2SESSION',
          data: res,
          success: (res) => {
            console.log('获取 openid 成功', res.data.openid, res);
            console.log(this.globalData.serverUrl + 'WXQQJSCODE2SESSION');
            this.globalData.openid = res.data.openid;
          },
          fail: (res) => {
            console.log('获取 openid 失败', res);
          }
        });
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              this.globalData.nickname = res.userInfo.nickName;
              console.log("获取到userInfo", res)
              
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    openid: null,
    unionid: null,
    nickname: null,
    serverUrl: 'https://writerfly.cn/muse/public/index.php/index/muse/',
  }
})