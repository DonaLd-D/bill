import request from '../../utils/request'
import {getFullTime} from '../../utils/util'
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
let app=getApp()
Page({
  data: {
    type_name:'',
    pay_type:'',
    amount:'',
    date:'',
    remark:'',
    id:''
  },
  //删除
  handleDelete(e){
    let {id}=e.target.dataset
    request({
      url:'/api/bill/delete',
      method:'POST',
      data:{id},
      header:{
        'content-type':'application/x-www-form-urlencoded',
        'Authorization':app.globalData.token
      }
    }).then(res=>{
      // console.log(res)
      if(res.data.code==200){
        wx.navigateBack({
          delta: 1,
        })
      }else{
        Dialog.alert({
          message:res.data.msg
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.id){
      let {id}=options
      request({
        url:'/api/bill/detail',
        data:{
          id
        },
        header:{
          'content-type':'application/x-www-form-urlencoded',
          'Authorization':app.globalData.token
        }
      }).then(res=>{
        // console.log(res)
        if(res.data.code==200){
          let {type_name,pay_type,amount,date,remark,id}=res.data.data
          this.setData({
            type_name:type_name,
            pay_type:pay_type,
            amount:amount,
            date:getFullTime(new Date(Number(date))),
            remark:remark,
            id:id
          })
        }else{
          Dialog.alert({
            message: res.data.msg,
          })
        }
      })
    }
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