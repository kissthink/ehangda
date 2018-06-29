class utils {
  // 计算时间间隔
  GetDateDiff(startDate, endDate) {
  var startTime = new Date(Date.parse(startDate.replace(/-/g, "/"))).getTime();
  var endTime = new Date(Date.parse(endDate.replace(/-/g, "/"))).getTime();
  var dates = (startTime - endTime)/ (1000 * 60 * 60 * 24);
  return dates;
}
getTodayDate(){
  var day = new Date();
  day.setTime(day.getTime());
  return day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate();
}
kbCheck(zs,tj) {
  let dsz=""
  if(zs%2==0){
    dsz="双"
  }else{
    dsz="单"
  }
  if(tj==""){
    return true
  } else if (tj.indexOf(dsz)>-1){
    return true
  }else{
    return false
  }
}
convertHtmlToText(inputText) {
    var returnText = "" + inputText;
    returnText = returnText.replace(/<\/div>/ig, '\r\n');
    returnText = returnText.replace(/<\/li>/ig, '\r\n');
    returnText = returnText.replace(/<li>/ig, ' * ');
    returnText = returnText.replace(/<\/ul>/ig, '\r\n');
    //-- remove BR tags and replace them with line break
    returnText = returnText.replace(/<br\s*[\/]?>/gi, "\r\n");

    //-- remove P and A tags but preserve what's inside of them
    returnText = returnText.replace(/<p.*?>/gi, "\r\n");
    returnText = returnText.replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, " $2 ($1)");

    //-- remove all inside SCRIPT and STYLE tags
    returnText = returnText.replace(/<script.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/script>/gi, "");
    returnText = returnText.replace(/<style.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/style>/gi, "");
    //-- remove all else
    returnText = returnText.replace(/<(?:.|\s)*?>/g, "");

    //-- get rid of more than 2 multiple line breaks:
    returnText = returnText.replace(/(?:(?:\r\n|\r|\n)\s*){2,}/gim, "\r\n\r\n");

    //-- get rid of more than 2 spaces:
    returnText = returnText.replace(/ +(?= )/g, '');

    //-- get rid of html-encoded characters:
    returnText = returnText.replace(/ /gi, " ");
    returnText = returnText.replace(/&/gi, "&");
    returnText = returnText.replace(/"/gi, '"');
    returnText = returnText.replace(/</gi, '<');
    returnText = returnText.replace(/>/gi, '>');

    return returnText;
  }

GetDateStr(AddDayCount) {
  var dd = new Date();
  dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期    
  var y = dd.getFullYear();
  var m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1);//获取当前月份的日期，不足10补0    
  var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();//获取当前几号，不足10补0    
  return y + "-" + m + "-" + d;
}   
getNowFormatDate() {
  var date = new Date();
  var seperator1 = "-";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate;
  return currentdate;
}
get_gpa_origin(fs) {
  switch (fs) {
    case '优秀':
      return 4.00;
      break;
    case '良好':
      return 3.00;
      break;
    case '中等':
      return 2.00;
      break;
    case '及格':
      return 1.00;
      break;
    case '不及格':
      return 0.00;
      break;
    case '合格':
      return 2.00;
      break;
    case '不合格':
      return 0.00;
      break;
    default:
      if (fs >= 90) {
        return 4.00
      } else if (fs >= 85) {
        return 3.70
      } else if (fs >= 82) {
        return 3.30
      } else if (fs >= 78) {
        return 3.00
      } else if (fs >= 75) {
        return 2.70
      } else if (fs >= 72) {
        return 2.30
      } else if (fs >= 68) {
        return 2.00
      } else if (fs >= 66) {
        return 1.70
      } else if (fs >= 64) {
        return 1.50
      } else if (fs >= 60) {
        return 1.00
      } else {
        return 0
      }
  }
}
}


export default utils