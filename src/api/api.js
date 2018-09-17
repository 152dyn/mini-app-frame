import {
  wxRequest
} from '../utils/wxRequest'

import wepy from 'wepy'

// let env = '-test' // -dev 或者 -test
const apiMall = 'https://wechatmall.abctaotao.com/testapi'
// const apiMall = 'https://api.tangxinmao.com'
let data = {
  checkToken: '/user/session_status?token=',
}

/**
 * 微信登录
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
const wxLogin = (callback) => wepy.login({
  success: function (res) {
    console.log('wxLogin')
    console.log(res)
    if (typeof callback === 'function') {
      callback(res)
    }
  },
  fail: function (error) {
    if (typeof error === 'object') {
      console.log('登录失败：' + JSON.stringify(error))
    } else {
      console.log('登录失败：' + error)
    }
  }
})

// 提现
const postMyCash = (params, callback) => wxRequest(params, apiMall + data.getMyCash, callback, 'POST')
// 我的收支明细
module.exports = {
  postMyCash,
  wxLogin
}
