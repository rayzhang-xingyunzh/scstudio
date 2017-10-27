// pages/reservation/index.js
import config from '../../etc/config'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    horizontalHeaders:[],
    verticalHeaders:[],
    // verticalHeadersWidth:650,
    verticalHeaderWidth:150,
    resources:[],
    offers:[],
    currentDate:new Date()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data.currentDate)
    console.log(new Date(this.data.currentDate))

    this.setData({
      horizontalHeaders: this.generateHorizontalHeaders()
    })

    wx.showLoading({
      title: '读取信息中...',
    })
    this.getResources(() => {
      wx.hideLoading()
      wx.showLoading({
        title: '读取预定中...',
      })
      this.refresh(()=>{
        wx.hideLoading()
      })
    })

  },

  refresh:function(callback){
    this.getResources(()=>{
      callback()
    })
  },

  getResources:function(callback){
    let res = ["res1", "res2", "res3", "res4", "res5", "res6", "res7", "res8"]
    this.setData({
      resources: res,
      verticalHeaders: res,
      verticalHeadersWidth:res.length * 100
    })
    callback()
  },

  generateHorizontalHeaders:function(){
    console.log(config)
    let hhs = [];
    let time = new Date(this.data.currentDate)

    time.setHours(config.startTime.hour)
    time.setMinutes(config.startTime.minute);

    while (!(time.getHours() >= config.endTime.hour
      && time.getMinutes() >= config.endTime.minute)) {
      console.log(time);
      hhs.push(new Date(time));

      time = new Date(time.getTime() + config.granularity * 60000)
    }

    return hhs
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