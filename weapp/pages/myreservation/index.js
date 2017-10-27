// pages/myreservation/index.js

var network = require('../../utils/network')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    reservations:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'user',
      success: (res)=> {
        console.log(res)
        network.myReservation(res.data.id,(err,res)=>{
          if(err){
            console.log(err)
          }else{
            console.log(res)
            this.setData({
              reservations:res
            })
          }
        })
      },
      fail:(err)=>{
        console.log(err)
      }
    })
  },

  cancelReservation(event){
    let updates = {
      id:event.currentTarget.dataset.id,
      state:"cancelled"
    }
    console.log(updates)
    network.updateRerservation(updates,(err,res)=>{
      if (err) {
        console.log(err)
      } else {
        console.log(res)
      }
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