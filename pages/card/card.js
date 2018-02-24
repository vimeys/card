// pages/card/card.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      num:1,
      cardName:['腾讯大王卡','无限流量卡'],
      index:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  //切换卡种
    change:function (e) {
        this.data.num==1?this.setData({
                num:2,
                cardName:'无线流量卡'
            }):this.setData({
            num:1,
            cardName:'腾讯大王卡'
        })

    },
    //跳转申请页面
    click:function (e) {
        this.data.num==1?wx.navigateTo({
          url: '../index/index'
        }):wx.navigateTo({
            url:''
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