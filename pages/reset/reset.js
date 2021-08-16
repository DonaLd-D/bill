import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
import request from '../../utils/request'
let app=getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    origin:'',
    newPassword:'',
    comfirmPassword:''
  },
  handleInput(){
    //取消输入框的事件警告
  },
  handlePassword(e){
    let id=e.target.dataset.id
    let value=e.detail.value
    switch(id){
      case "origin":
        this.setData({origin:value})
        break
      case "newOne":
        this.setData({newPassword:value})
        break
      default:
        this.setData({comfirmPassword:value})
        break
    }
  },
  handleSubmit(){
    if(this.data.origin==''||this.data.newPassword==''||this.data.comfirmPassword==''){
      Dialog.alert({
        message: '请确认您的输入！'
      })
    }else{
      let data={
        old_pass:this.data.origin,
        new_pass:this.data.newPassword,
        new_pass2:this.data.comfirmPassword
      }
      request({
        url:'/api/user/modify_pass',
        method:'POST',
        data:data,
        header:{
          'Authorization':app.globalData.token
        }
      }).then(res=>{
        console.log(res)
        if(res.data.code==200){
          Dialog.alert({
            message: '修改密码成功'
          }).then(()=>{
            this.setData({
              origin:'',
              newPassword:'',
              comfirmPassword:''
            })
          })
        }else{
          Dialog.alert({
            message: res.data.msg
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