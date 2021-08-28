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

module.exports = {
  getYearMonth,
  getMonthDay
}
