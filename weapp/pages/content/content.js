// pages/content/content.js
var network = require('../../utils/network')

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  gotoReservation:function(event){
    this.login(()=>{
      wx.getStorage({
        key: 'user',
        success: function(res) {
          if(!!res.data.tel){
            wx.navigateTo({
              url: '/pages/reservation/index',
            })
          }else{
            wx.navigateTo({
              url: '/pages/phone/index',
            })
          }
        },
        fail:function(){
          console.log("get user fail")
        }
      })
      
    })
  },

  login: function (callback) {

    var cacheUser = (err,user) => {
      if(err){
        console.log("login fail:",err);
      }else{
        wx.setStorage({
          key: 'user',
          data: user,
          success:(res)=>{
            console.log("store success:", res);
            callback()
          },
          fail:(err)=>{
            console.log("store fail:", err);
          }
        })
      }
    }

    wx.checkSession({
      success: () => {
        wx.getStorageInfo({
          success: (res) => {
            console.log(res)
            if (res.keys.indexOf('token') > -1) {
              callback();
            } else {
              network.login(cacheUser)
            }
          },
        })
      },
      fail: () => {
        network.login(cacheUser)
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