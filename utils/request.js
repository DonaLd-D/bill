/**
 * 主函数
 * 
 * @params
 * 参数 | 类型 | 默认值
 * config | Oject | {}
 */
const request = (config = {}) => {

  // 如果url开头没有http，加上基准路径
  // 字符串正则方法search https://www.runoob.com/jsref/jsref-search.html
  if (config.url.search(/^http/) === -1) {
    // 给链接添加url，加上基准路径
    config.url = request.defaults.baseURL + config.url;
  }

  // 返回一个promise
  // resolve是 .then 里面的函数，一般请求成功时候执行
  // reject 是 .catch 里面的函数，一般用于请求失败时候执行
  return new Promise((resolve, reject) => {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    // 发起请求
    wx.request({
      ...config,
      success(res) {
        resolve(res);
      },
      fail(res) {
        reject(res);
      },
      // 不管成功失败都会执行
      complete(res) {
        // 执行错误的兰截器
        request.errors(res);
        wx.hideLoading()
      }
    })
  })
}

/**
 * request的默认属性
 */
request.defaults = {
  // 基准路径
  baseURL: "http://api.chennick.wang"
}

/**
 * 存储错误的回调函数.默认是一个空的函数
 */
request.errors = () => { }

/**
 * request的错误拦截
 * 
 * @params
 * callback | 函数 
 */
request.onError = (callback) => {
  // 判断callback必须是一个函数
  if (typeof callback === "function") {
    // 如果是函数，保存到errors
    request.errors = callback
  }
}


// 对外暴露
export default request;