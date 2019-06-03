import axios from 'axios'

const REQ_HEADER = {
  headers: {
    'X-Parse-Application-Id': 'jingfree_android',
    'X-Parse-Master-Key': 'aa9YOWvTxxCY2RXT',
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
}

const parseService = {
  get (query) {
    let promise = new Promise((resolve, reject) => {
      axios
        .get(query, REQ_HEADER)
        .then(result => {
          if (result.data) {
            resolve(result.data)
          } else {
            reject(result)
          }
        })
        .catch(err => {
          reject(err)
        })
    })
    return promise
  },

  put (query, data) {
    let promise = new Promise((resolve, reject) => {
      axios
        .put(query, data, REQ_HEADER)
        .then(result => {
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
    return promise
  },

  post (url, data) {
    let promise = new Promise((resolve, reject) => {
      axios
        .post(url, data, REQ_HEADER)
        .then(result => {
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
    return promise
  }
}
export { parseService }
