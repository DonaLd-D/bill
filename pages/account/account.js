import request from '../../utils/request'
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
let app=getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    showOutputTab:true,
    outputTab:[],
    incomeTab:[],
    outputActiveId:1,
    incomeActiveId:11,
    showTextarea:false
  },
  handleOpen(){
    this.setData({show:true})
  },
  handleClose(){
    this.setData({show:false})
  },
  handleTab(){
    this.setData({
      showOutputTab:!this.data.showOutputTab
    })
  },
  handleActive(e){
    const {id,type}=e.target.dataset
    if(type=='1'){
      this.setData({
        outputActiveId:id
      })
    }else if(type=='2'){
      this.setData({
        incomeActiveId:id
      })
    }
  },
  handleTextarea(){
    const status=!this.data.showTextarea
    this.setData({
      showTextarea:status
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    request({
      url:'/api/type/list',
      header:{
        'Authorization':app.globalData.token
      }
    }).then(res=>{
      console.log(res)
      if(res.data.code==200){
        const {list}=res.data.data
        this.setData({
          outputTab:list.slice(0,10),
          incomeTab:list.slice(10)
        })
      }else{
        Dialog.alert({
          message: res.data.msg,
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