import request from '../../utils/request'
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
let app=getApp()
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
  handleInput(){
    //此方法只为取消报错
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
    if(this.data.account==''){
      Dialog.alert({
        message: '请输入账号',
      })
    }else if(this.data.password==''){
      Dialog.alert({
        message: '请输入密码',
      })
    }else if(!this.data.login){
      let data={
        username:this.data.account,
        password:this.data.password
      }
      request({
        url:'/api/user/register',
        method:'POST',
        data:data,
        header:{
          'content-type':'application/x-www-form-urlencoded'
        }
      }).then(res=>{
        console.log(res)
        if(res.data.code==200){
          let msg=res.data.msg
          Dialog.alert({
            message: msg,
          }).then(()=>{
            this.setData({
              account:'',
              password:''
            })
          })
        }else{
          Dialog.alert({
            message: res.data.msg,
          }).then(()=>{
            this.setData({
              account:''
            })
          })
        }
      })
    }else if(this.data.login){
      request({
        url:'/api/user/login',
        method:'POST',
        data:{
          username:this.data.account,
          password:this.data.password
        },
        header:{
          'content-type':'application/x-www-form-urlencoded'
        }
      }).then(res=>{
        console.log(res)
        if(res.data.code==200){
          app.globalData.token=res.data.data.token
          Dialog.alert({
            message: res.data.message,
          }).then(()=>{
            this.setData({
              account:'',
              password:''
            })
          })
        }else{
          Dialog.alert({
            message: res.data.message,
          }).then(()=>{
            this.setData({
              account:''
            })
          })
        }
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