import dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog'
import request from '../../utils/request'
import {getYearMonth,toPercent} from '../../utils/util'
let app=getApp()

Page({
  data: {
    date:getYearMonth(new Date()),
    popupShow:false,
    currentDate:new Date().getTime(),
    output_data:[],
    income_data:[],
    total_expense:0,
    total_income:0,
    progress_income_active:false,
    chart_income_active:false
  },

  handlePopup(){
    this.setData({
      popupShow:!this.data.popupShow
    })
  },
  //选择时间
  handleDateInput(e){
    this.setData({
      currentDate:e.detail
    },()=>{
      this.setData({
        date:getYearMonth(new Date(this.data.currentDate))
      })
    })
  },
  //确定选择时间
  handleDateConfirm(){
    this.setData({
      popupShow:!this.data.popupShow
    })
    this.getData()
  },
  //取消选择时间
  handleDateCancel(){
    this.setData({
      currentDate:new Date().getTime(),
      popupShow:false
    },()=>{
      this.setData({
        date:getYearMonth(new Date())
      })
    })
  },
  //根据月份获取列表数据
  getData(){
    request({
      url:'/api/bill/data',
      data:{
        date:this.data.date
      },
      header:{
        'content-type':'application/x-www-form-urlencoded',
        'Authorization':app.globalData.token
      }
    }).then(res=>{
      if(res.data.code==200){
        // console.log(res)
        let {total_data,total_expense,total_income}=res.data.data
        total_data.map(item=>{
          if(!item.hasOwnProperty('percentage')){
            if(item.pay_type==1){
              item.percentage=toPercent(item.number/total_expense)
            }else if(item.pay_type==2){
              item.percentage=toPercent(item.number/total_income)
            }
          }
        })
        this.setData({
          output_data:total_data.filter(item=>item.pay_type==1),
          income_data:total_data.filter(item=>item.pay_type==2),
          total_expense:total_expense,
          total_income:total_income
        })
        console.log(this.data)
      }else{
      dialog.alert({
          message:res.data.msg
        })
      }
    })
  },
  //tab切换
  handleTab(e){
    let {type,tab}=e.target.dataset
    if(type=='progress'){
      if(tab=='income'&&!this.data.progress_income_active){
        this.setData({
          progress_income_active:true
        })
      }else if(tab=='output'&&this.data.progress_income_active){
        this.setData({
          progress_income_active:false
        })
      }
    }else if(type=='chart'){
      if(tab=='income'&&!this.data.chart_income_active){
        this.setData({
          chart_income_active:true
        })
      }else if(tab=='output'&&this.data.chart_income_active){
        this.setData({
          chart_income_active:false
        })
      }
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
    this.getData()
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