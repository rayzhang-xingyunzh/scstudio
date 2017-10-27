// pages/reserve/index.js
const network = require('../../utils/network')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    resources:[],
    resource:{},
    targetDate:"2017-10-31",
    startTime:"9:00",
    endTime:"22:00"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    network.resources((err,res)=>{
      if(err){
        console.log(err)
      }else{
        console.log(res)
        this.setData({
          resources:res
        })
      }
      
    })
  },

  resourceChange:function(event){
    console.log(event)

    for(var i in this.data.resources){
      console.log(i)
      if (this.data.resources[i].id == event.detail.value){
        this.setData({
          resource: this.data.resources[i]
        })
      }
    }
    
  },

  startTimeChange:function(event){
    console.log(event)
    this.setData({
      startTime: event.detail.value
    })
  },

  targetDateChange: function (event) {
    console.log(event)
    this.setData({
      targetDate: event.detail.value
    })
  },

  endTimeChange: function (event) {
    console.log(event)
    this.setData({
      endTime: event.detail.value
    })
  },

  reserve:function(){
    wx.getStorage({
      key: 'user',
      success: (res)=> {
        console.log(this.data.resource)
        let reservation = {
          resourceId: this.data.resource.id,
          startTime: new Date(this.data.targetDate + " " + this.data.startTime),
          endTime: new Date(this.data.targetDate + " " + this.data.endTime),
          surety: this.data.resource.surety,
          userid:res.data.id
        }

        console.log(reservation)

        network.reserve(reservation, (err,res) => {
          if(err){
            wx.showModal({
              title: '失败',
              content: err,
              showCancel:false
            })
            console.log(err)
          }else{
            wx.showToast({
              title: '成功',
            })
            console.log(res)
          }
        })
      },
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