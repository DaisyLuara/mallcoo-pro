import md5 from 'js-md5'
import { Base64 } from 'js-base64'

/*
 ** randomWord 产生任意长度随机字母数字组合
 ** Flag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
 */
const randomWord = (Flag, min, max) => {
  let str = ''
  let range = min
  let arr = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z'
  ]

  // 随机产生
  if (Flag) {
    range = Math.round(Math.random() * (max - min)) + min
  }
  for (var i = 0; i < range; i++) {
    let pos = Math.round(Math.random() * (arr.length - 1))
    str += arr[pos]
  }
  return str
}

const access_key = 'x0OutMFdnkjzFwRa7flNs0lhCL9Ri1dp' // 服务端生成的 access_key
const secret_key = 'QAtdFu1yazOfv7c2a5e1GZGSHVruVZ4l' // 服务端生成的 secret_key

const timestamp = Date.parse(new Date()) / 1000
const echostr = randomWord(false, 32) // 32位随机数
const header = Base64.encode(
  JSON.stringify({
    alg: 'md5',
    type: 'jwt'
  })
)
const payload = Base64.encode(
  JSON.stringify({
    timestamp: timestamp,
    echostr: echostr,
    ak: access_key
  })
)

const signature_string = header + '.' + payload
function md5Sign (string, secret) {
  return md5(string + secret)
}

const apiToken = signature_string + '.' + md5Sign(signature_string, secret_key)

export { apiToken }
