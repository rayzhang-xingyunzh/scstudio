// pages/reservation/index.js
import config from '../../etc/config'
let network = require('../../utils/network')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    horizontalHeaders:[],
    verticalHeaders:[],
    // verticalHeadersWidth:650,
    horizontalHeaderWidth:150,
    horizontalHeaderHeight: 100,
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
    network.resources((err,res)=>{
      if (res.length * this.data.verticalHeaderWidth < 750 - this.data.horizontalHeaderWidth){
        console.log('bugou')
        this.setData({
          verticalHeaderWidth: (750 - this.data.horizontalHeaderWidth)/res.length
        })
      }

      this.setData({
        resources: res,
        verticalHeaders: res.map((item)=>{
          return item.name
        }),
        verticalHeadersWidth: res.length * this.data.verticalHeaderWidth
      })
      callback()
    })
    
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
      let hh = {
        date:new Date(time),
        label:time.getHours() + ':' + time.getMinutes()
      }
      hhs.push(hh);

      time = new Date(time.getTime() + config.granularity * 60000)
    }
    console.log(hhs);
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