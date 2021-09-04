import dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog'
import request from '../../utils/request'
import {getYearMonth,toPercent} from '../../utils/util'
import * as echarts from '../../ec-canvas/echarts';
let app=getApp()

let chart=null
//echart配置选项
function getOption(name,data){
  return {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'horizontal',
      left: 'center',
    },
    series:[{
      name: name,
      type: 'pie',
      radius: '50%',
      data:data,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  }
}
//echart初始化函数
function initChart(canvas, width, height, dpr){
    chart = echarts.init(canvas, null, {
      width: width,
      height: height,
      devicePixelRatio: dpr // 像素
    });
    canvas.setChart(chart);
  
    let option=getOption('',[])
    chart.setOption(option);
    return chart;
}

Page({
  data: {
    ec:{
      onInit:initChart
    },
    date:getYearMonth(new Date()),
    popupShow:false,
    currentDate:new Date().getTime(),
    output_data:[],
    income_data:[],
    ec_output:[],
    ec_income:[],
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
        },()=>{
          let ec_output=[]
          let ec_income=[]
          this.data.output_data.forEach(item=>{
            ec_output.push({value:item.number,name:item.type_name})
          })
          this.data.income_data.forEach(item=>{
            ec_income.push({value:item.number,name:item.type_name})
          })
          this.setData({
            ec_output:ec_output,
            ec_income:ec_income
          },()=>{
            this.updateChart()
          })
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
        },()=>{
          this.updateChart()
        })
      }else if(tab=='output'&&this.data.chart_income_active){
        this.setData({
          chart_income_active:false
        },()=>{
          this.updateChart()
        })
      }
    }
  },
  //更新echarts
  updateChart(){
    let {chart_income_active,ec_income,ec_output}=this.data
    let data=chart_income_active?ec_income:ec_output
    let name=chart_income_active?'收入构成':'支出构成'
    let option=getOption(name,data)
    chart.setOption(option)
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