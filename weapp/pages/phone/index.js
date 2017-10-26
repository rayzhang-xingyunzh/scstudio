// pages/phone/index.js
const network = require('../../utils/network')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tel:""
  },

  onBlurTel: function(event){
    console.log(event);
    this.setData({
      tel:event.detail.value
    })
  },

  binding: function(event){
    console.log(this.data)
    if(this.data.tel.length > 0){
      wx.getStorage({
        key: 'user',
        success: (res)=> {
          console.log("id",res)
          network.bindingTel(res.data.id,this.data.tel,(err)=>{
            console.log("binding success")
            if(!err){
              wx.navigateTo({
                url: '/pages/reservation/index',
              })
            }else{
              console.log(err)
            }
          })
        },
      })
      
    }
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