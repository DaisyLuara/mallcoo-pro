import axios from 'axios'
const getQRcodeUrl = id => {
  let requestUrl =
    process.env.VUE_APP_EXE_API + '/wxqrcode/?id=' + id + '&api=json'
  return new Promise((resolve, reject) => {
    axios
      .get(requestUrl)
      .then(r => {
        resolve(r)
      })
      .catch(e => {
        reject(e)
      })
  })
}
export { getQRcodeUrl }
