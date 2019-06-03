// 获得url中的参数
const GetParamsFromUrl = () => {
  let url = window.location.href.split('?')[1] // 获取url中"?"符后的字串
  let theRequest = {}
  if (url) {
    if (url.indexOf('?') === -1) {
      let str = url
      let strs = str.split('&')
      for (let i = 0; i < strs.length; i++) {
        theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
      }
    }
  }
  return theRequest
}

const getParamsMap = url => {
  if (!url) {
    url = location.href
  }
  let params = {}
  let param_start = url.indexOf('?')

  if (param_start > 0) {
    let search = url.substr(param_start + 1)

    let params_array = search.split('&')
    if (params_array.length > 0) {
      for (let i = 0, l = params_array.length; i < l; i++) {
        let param = params_array[i]
        if (typeof param === 'string' && param !== '') {
          let parts = param.split('=')
          if (parts.length > 0) {
            params[parts[0]] = parts[1]
          }
        }
      }
    }
  }
  return params
}

const getParameter = (key, url) => {
  if (!key) {
    return url
  }

  if (!url) {
    url = location.href
  }

  let params = getParamsMap(url)

  return params[key]
}

const setParameter = (key, value, url) => {
  if (!key) {
    return url
  }

  if (!url) {
    url = location.href
  }

  let result = url
  let params

  let param_start = url.indexOf('?')
  if (param_start > 0) {
    params = getParamsMap(url)
    result = url.substr(0, param_start)
  } else {
    params = {}
  }

  params[key] = value

  result = getUrl(result, params)

  return result
}

const getUrl = (base_url, params) => {
  let result = base_url
  let query_array = []

  for (let key in params) {
    query_array.push(key + '=' + params[key])
  }
  if (query_array.length > 0) {
    result = result + '?' + query_array.join('&')
  }
  return result
}

export { GetParamsFromUrl, getParamsMap, getParameter, setParameter, getUrl }
