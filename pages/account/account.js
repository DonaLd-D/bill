import request from '../../utils/request'
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
import {getYearMonth,getMonthDay,getHour,getPayType} from '../../utils/util'
let app=getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    //添加消费账单相关数据
    popupShow:false,
    showOutputTab:true,
    outputTab:[],
    incomeTab:[],
    outputActiveId:1,
    incomeActiveId:11,
    typeName:'餐饮',
    showTextarea:false,
    selectDate:false,
    currentYear:getYearMonth(new Date()),
    currentMonth:getMonthDay(new Date()),
    currentDate: new Date().getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } 
      if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },
    cashValue:null,
    textValue:null,
    //消费列表相关数据
    listTabShow:false,
    listTabId:0,
    listTabName:'全部类型',
    list:[],
    totalExpense:0,
    totalIncome:0
  },
  handleOpen(){
    this.setData({popupShow:true})
  },
  handleClose(){
    this.setData({popupShow:false})
  },
  //选择记账类型，支出还是收入
  handleTab(){
    this.setData({
      showOutputTab:!this.data.showOutputTab,
    },()=>{
      this.setData({
        typeName:this.data.showOutputTab?'餐饮':'工资'
      })
    })
  },
  //选择消费类型
  handleActive(e){
    const {id,type,name}=e.target.dataset
    if(type=='1'){
      this.setData({
        outputActiveId:id,
        typeName:name
      })
    }else if(type=='2'){
      this.setData({
        incomeActiveId:id,
        typeName:name
      })
    }
  },
  //展示选择日期弹出框
  handleDate(){
    this.setData({
      selectDate:!this.data.selectDate
    })
  },

  //每次选择日期时触发
  handleDateInput(e){
    // console.log(e)
    let {detail}=e
    if(this.data.popupShow){
      this.setData({
        currentDate: detail,
        currentMonth:getMonthDay(new Date(detail))
      });
    }else{
      this.setData({
        currentDate: detail,
        currentYear:getYearMonth(new Date(detail))
      })
    }
  },
  //确定选择日期
  handleDateConfirm(e){
    this.setData({
      selectDate:!this.data.selectDate
    },()=>{
      if(!this.data.popupShow){
        this.getList()
      }
    })
  },
  //取消选择日期
  handleDateCancel(){
    if(this.data.popupShow){
      this.setData({
        currentDate:new Date().getTime(),
        currentMonth:getMonthDay(new Date())
      })
    }else{
      this.setData({
        currentDate:new Date().getTime(),
        currentYear:getYearMonth(new Date())
      })
    }
    this.setData({
      selectDate:!this.data.selectDate
    })
  },
  //输入金额事件
  handleCash(e){
    // console.log(e)
    let {value}=e.detail
    if(value){
      this.setData({
        cashValue:Number(value)
      })
    }
  },
  //文本框输入事件
  handleText(e){
    // console.log(e)
    let {value}=e.detail
    if(value){
      this.setData({
        textValue:value
      })
    }
  },
  //发送记账信息至后端
  handleBtn(){
    if(!this.data.cashValue){
      Dialog.alert({
        message: '请输入收入或支出金额',
      })
    }
    request({
      url:'/api/bill/add',
      method:'POST',
      data:{
        amount:this.data.cashValue,
        type_id:this.data.showOutputTab?this.data.outputActiveId:this.data.incomeActiveId,
        type_name:this.data.typeName,
        date:this.data.currentDate,
        pay_type:this.data.showOutputTab?1:2,
        remark:this.data.textValue
      },
      header:{
        'content-type':'application/x-www-form-urlencoded',
        'Authorization':app.globalData.token
      }
    }).then(res=>{
      if(res.data.code==200){
        this.handleClose()
        this.setData({
          cashValue:null,
          textValue:null
        },()=>{
          this.getList()
        })
      }else{
        Dialog.alert({
          message: res.data.msg,
        })
      }
    })
  },
  //列表tab选择
  handleListTabShow(){
    this.setData({
      listTabShow:!this.data.listTabShow
    })
  },
  //列表的消费类型
  hanleListTab(e){
    console.log(e)
    let {id,name}=e.target.dataset
    this.setData({
      listTabId:Number(id),
      listTabName:name
    },()=>{
      this.getList()
    })
  },
  //获取数据列表
  getList(){
    request({
      url:'/api/bill/list',
      data:{
        date:this.data.currentYear,
        page:1,
        page_size:5,
        type_id:this.data.listTabId==0?'all':String(this.data.listTabId)
      },
      header:{
        'content-type':'application/x-www-form-urlencoded',
        'Authorization':app.globalData.token
      }
    }).then(res=>{
      console.log(res)
      if(res.data.code==200){
        let {list,totalExpense,totalIncome}=res.data.data
        list.forEach(i=>{
          if(i.bills&&i.bills.length){
            i.bills.map(j=>{
              if(!j.hasOwnProperty('hour')){
                j.hour=getHour(new Date(Number(j.date)))
              }
            })
          }
          if(!i.hasOwnProperty('output')){
            i.output=i.bills.filter(k=>{
              return k.pay_type==1
            }).reduce((total,l)=>{
              return total+Number(l.amount)
            },0).toFixed(2)
          }
          if(!i.hasOwnProperty('income')){
            i.income=i.bills.filter(k=>{
              return k.pay_type==2
            }).reduce((total,l)=>{
              return total+Number(l.amount)
            },0).toFixed(2)
          }
        })
        this.setData({
          list:list,
          totalExpense:totalExpense.toFixed(2),
          totalIncome:totalIncome.toFixed(2)
        })
      }else{
        Dialog.alert({
          message:res.data.msg
        })
      }
    })
  },
  //跳转至编辑页面
  handleEdit(e){
    let {id}=e.target.dataset
    wx.navigateTo({
      url: `/pages/edit/edit?id=${id}`,
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
      // console.log(res)
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
    this.getList()
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