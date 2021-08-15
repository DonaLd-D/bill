let app=getApp()
import request from '../../utils/request'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    avatar:'',
    signature:''
  },
  toPersonal(){
    let avatar=this.data.avatar
    let signature=this.data.signature
    wx.navigateTo({
      url: `/pages/personal/personal?signature=${signature}&avatar=${avatar}`,
    })
  },
  handleLogout(){
    app.globalData.token=''
    app.globalData.username=''
    wx.redirectTo({
      url: '/pages/login/login',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    request({
      url:'/api/user/get_userinfo',
      header:{
        'Authorization':app.globalData.token
      }
    }).then(res=>{
      console.log(res)
      if(res.data.code==200){
        app.globalData.username=res.data.data.username
        this.setData({
          username:res.data.data.username,
          avatar:res.data.data.avatar,
          signature:res.data.data.signature
        })
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