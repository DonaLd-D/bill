// pages/login/login.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    login:true,
    buttonText:'登录',
    account:'',
    password:''
  },
  handleLogin(){
    let bool=this.data.login
    this.setData({
      buttonText:bool==true?'注册':'登录',
      login:!bool
    })
  },
  handleAccount(e){
    const value=e.detail.value
    this.setData({
      account:value
    })
  },
  handlePassword(e){
    const value=e.detail.value
    this.setData({
      password:value
    })
  },
  handleComfirm(){

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