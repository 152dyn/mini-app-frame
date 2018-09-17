import wepy from 'wepy'
import util from './util'
import md5 from './md5'
import tip from './tip'

const API_SECRET_KEY = 'https://wechatmall.abctaotao.com/testapi'
const TIMESTAMP = util.getCurrentTime()
const SIGN = md5.hex_md5((TIMESTAMP + API_SECRET_KEY).toLowerCase())

var DeviceSystemInfo
const wxRequest = async(params = {}, url, callback, type) => {

  console.log('请求url: ')
  console.log(url)
  let reg = /\/items\/items/g
  if (reg.test(url)) {

  } else {
    tip.loading()
  }
  let data = params || {}
  let method = type || 'GET'
  let token = wepy.getStorageSync('token')
  console.log('req=====> token: ' + token)
  if (token) {
    data.token = token
  }
  if (DeviceSystemInfo) {
    data.device = DeviceSystemInfo
  } else {
     wx.getSystemInfo({success: function(res) {
        DeviceSystemInfo = JSON.stringify(res)
        console.log('设备信息 :' + DeviceSystemInfo)
      }})
  }
  if (util.mallVersion) {
    data.mallversion = util.mallVersion
  }

  data.sign = SIGN
  data.time = TIMESTAMP
  await wepy.request({
    url: url,
    method: method,
    data: data,
    header: { 'Content-Type': 'application/json' },
    success: function (res) {
      tip.loaded()
      if (res && res.status == 200 && res.headers.token) {
        //保存新的token
        wepy.setStorageSync('token', res.headers.token)
      }
      if (res && res.data && res.data.code == 401) {
        //需要重新登录,清空本地token
        wepy.removeStorage({
          key: 'token',
          success: function(res) {
            console.log('重新登录成功：')
            console.log(res.data)
          }
        })
      }
      if (typeof callback === 'function') {
        callback(res)
      }
    },
    fail: function (error) {
      tip.loaded()
      tip.alert(error)
    }
  })
}

module.exports = {
  wxRequest
}
