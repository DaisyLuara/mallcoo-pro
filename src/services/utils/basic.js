const isInWechat = () => {
  return /micromessenger/i.test(navigator.userAgent)
}

const randomIntNum = (minNum, maxNum) => {
  return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
}

const validatePhone = number => {
  if (/^1[345678]\d{9}$/.test(number)) {
    return true
  } else {
    return false
  }
}
// 转换日期格式 时间戳转换日期格式2018-11-10 00：00：00
const dateFormat = (date, fmt) => {
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return fmt
}

// 处理时间
const formatTimestamp = (data, flag) => {
  let nextDate = new Date(new Date(data).getTime() + 24 * 60 * 60 * 1000)
  if (flag) {
    nextDate = data
  }
  nextDate.setHours(0)
  nextDate.setMinutes(0)
  nextDate.setSeconds(0)
  nextDate.setMilliseconds(0)
  let todayStartTime = nextDate.getTime()
  return todayStartTime
}

export { isInWechat, randomIntNum, validatePhone, dateFormat, formatTimestamp }
