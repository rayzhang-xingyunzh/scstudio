// pages/payment/index.js
let network = require('../../utils/network')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    payment: null,
    reservation: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      reservation: options
    })
    wx.showLoading({
      title: '准备支付...',
    })

    wx.getStorage({
      key: 'user',
      success: (res)=> {
        console.log(res)
        let preperation = {
          ordernumber: options.ordernumber,
          fee: 1,
          body: "星云创新工作室-访问预定",
          openid:res.data.openid
        }

        network.preparePayment(preperation, (err, res) => {
          wx.hideLoading()

          if (err) {
            console.log(err)
            wx.navigateBack({
              delta: 1
            })
          } else {
            console.log(res)
            this.setData({
              payment: res
            })
          }
        })
      },
    })

  },

  cancelReservation: function () {
    // network.cancelReservation()
  },

  pay: function () {
    let payment = this.data.payment
    console.log(payment)
    network.pay(payment, (err, res) => {
      console.log(res)
      if (err) {
        console.log(err)
      } else {
        console.log(res)

        let options = {
          timeStamp: "" + res.timeStamp,
          nonceStr: res.nonceStr,
          "package": res.package,
          signType: res.signType,
          paySign: res.paySign,
          success: (res) => {
            console.log(res)
          },
          fail: (res) => {
            console.log(res)
          }
        }
        console.log(options)
        wx.requestPayment(options)
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