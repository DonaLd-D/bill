//获取年和月
const getYearMonth = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month].map(formatNumber).join('-')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

//获取月和日
const getMonthDay=(date)=>{ 
  var strDay = date.getDate();  
  var strMonth = date.getMonth()+1;
  if(strMonth<10)  
  {  
     strMonth="0"+strMonth;  
  }
  if(strDay<10)  
  {  
     strDay="0"+strDay;  
  }
  return strMonth+"-"+strDay;
}

const getHour=(date)=>{
  let hour = date.getHours()
  let minute = date.getMinutes()
  if(hour<10){  
     hour="0"+hour;  
  }
  if(minute<10){  
     minute="0"+minute;  
  }
  return hour+":"+minute;
}

const getPayType=(n)=>{
  switch(n){
    case 1:
      return '餐饮'
    case 2:
      return '服饰'
    case 3:
      return '交通'
    case 4:
      return '日用'
    case 5:
      return '购物'
    case 6:
      return '学习'
    case 7:
      return '医疗'
    case 8:
      return '旅行'
    case 9:
      return '人情'
    case 10:
      return '其他'
    case 11:
      return '工资'
    case 12:
      return '奖金'
    case 13:
      return '转账'
    case 14:
      return '理财'
    case 15:
      return '退款'
    default:
      return '其他'
  }
}

module.exports = {
  getYearMonth,
  getMonthDay,
  getHour,
  getPayType
}
