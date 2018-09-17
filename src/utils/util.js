import wepy from 'wepy'
function getCurrentTime() {
  var keep = '';
  var date = new Date();
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  var f = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  var rand = Math.round(Math.random() * 899 + 100);
  keep = y + '' + m + '' + d + '' + h + '' + f + '' + s;
  return keep; //20160614134947
}

// 时间格式转换
function fmtDate (date, fmtExp) {
  if (!date) {
    return
  }
  var dateTemp = new Date(+date)
  var o = {
    'M+': dateTemp.getMonth() + 1,
    'd+': dateTemp.getDate(),
    'h+': dateTemp.getHours(),
    'm+': dateTemp.getMinutes(),
    's+': dateTemp.getSeconds(),
    'q+': Math.floor((dateTemp.getMonth() + 3) / 3),
    'S': dateTemp.getMilliseconds()
  }
  if (/(y+)/.test(fmtExp)) {
    fmtExp = fmtExp.replace(RegExp.$1, (dateTemp.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmtExp)) {
      fmtExp = fmtExp.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmtExp
}

function objLength(input) {
  var type = toString(input);
  var length = 0;
  if (type != "[object Object]") {
    //throw "输入必须为对象{}！"
  } else {
    for (var key in input) {
      if (key != "number") {
        length++;
      }

    }
  }
  return length;
}
//验证是否是手机号码
function vailPhone(number) {
  let flag = false;
  let myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/;
  if (number.length != 11) {
    flag = flag;
  }else if (!myreg.test(number)) {
    flag = flag;
  }else{
    flag = true;
  }
  return flag;
}
//验证是否西班牙手机(6开头 9位数)
function ifSpanish(number) {
  let flag = false;
  let myreg = /^([6|7|9]{1}(\d+){8})$/;
  if (number.length != 9) {
    flag = flag;
  } else if (!myreg.test(number)) {
    flag = flag;
  } else {
    flag = true;
  }
  return flag;
}
//浮点型除法
function div(a, b) {
  var c, d, e = 0,
    f = 0;
  try {
    e = a.toString().split(".")[1].length;
  } catch (g) { }
  try {
    f = b.toString().split(".")[1].length;
  } catch (g) { }
  return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), mul(c / d, Math.pow(10, f - e));
}
//浮点型加法函数
function accAdd(arg1, arg2) {
  var r1, r2, m;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  return ((arg1 * m + arg2 * m) / m).toFixed(2);
}
//浮点型乘法
function mul(a, b) {
  var c = 0,
    d = a.toString(),
    e = b.toString();
  try {
    c += d.split(".")[1].length;
  } catch (f) { }
  try {
    c += e.split(".")[1].length;
  } catch (f) { }
  return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
}

// 遍历对象属性和值
function displayProp(obj) {
  var names = "";
  for (var name in obj) {
    names += name + obj[name];
  }
  return names;
}
// 去除字符串所有空格
function sTrim(text) {
  return text.replace(/\s/ig, '')
}
//去除所有:
function replaceMaohao(txt) {
  return txt.replace(/\:/ig, '')
}
//转换星星分数
function convertStarArray(score) {
  //1 全星,0 空星,2半星
  var arr = []
  for (var i = 1; i <= 5; i++) {
    if (score >= i) {
      arr.push(1)
    } else if (score > i-1 && score < i + 1) {
      arr.push(2)
    } else {
      arr.push(0)
    }
  }
  return arr
}

function getToken () {
  return wepy.getStorageSync('token')
}

// 转换变但  {2: r, 3:k} => 2:r, 3:k
function variantsToKey (variantsKV) {
  var variants = []
  for (var id in variantsKV) {
    variants.push({ id, value: variantsKV[id] })
  }
  variants.sort(function (a, b) {
    return parseInt(a.id) - parseInt(b.id)
  })
  var ret = ''
  for (var variant of variants) {
    ret = ret + ',' + variant.id + ':' + variant.value
  }
  ret = ret.slice(1, ret.length)
  return ret
}

function keyToVariantsMap (variantsKey) {
  let kvs = variantsKey.split(',')
  var ret = {}
  for (var kv of kvs) {
    let words = kv.split(':')
    ret[words[0]] = words[1]
  }
  return ret
}

function findValidVariantsKey(variantsKV, variantsKeyArray) {
  let simpleKey = variantsToKey(variantsKV)
  for (var key of variantsKeyArray) {
    if (key.indexOf(simpleKey) > 0) {
      return key
    }
  }
  return null
}

//强制保留2位小数，如：2，会在2后面补上00.即2.00
function toDecimal2(x) {
  var f = parseFloat(x);
  if (isNaN(f)) {
    return false;
  }
  var f = Math.round(x*100)/100;
  var s = f.toString();
  var rs = s.indexOf('.');
  if (rs < 0) {
    rs = s.length;
    s += '.';
  }
  while (s.length <= rs + 2) {
    s += '0';
  }
  return s;
}

// 数组去重
function qcArray (arr) {
  return Array.from(new Set(arr))
}

function getSystemInfo () {
  let that = this
  let windowHeight = wepy.getStorageSync('WINDOW_HEIGHT')
  let screenWidth = wepy.getStorageSync('SCREEN_WIDTH')
  let deviceInfo = wepy.getStorageSync('DEVICE_INFO')
  let SDKVersion = wepy.getStorageSync('SDK_VERSION') || ''
  if (!windowHeight || !screenWidth) {
    wepy.getSystemInfo({
      success: function (res) {
        windowHeight = res.windowHeight
        screenWidth = res.screenWidth
        deviceInfo = JSON.stringify(res)
        SDKVersion = res.SDKVersion
        wepy.setStorageSync('WINDOW_HEIGHT', windowHeight)
        wepy.setStorageSync('SCREEN_WIDTH', screenWidth)
        wepy.setStorageSync('DEVICE_INFO', deviceInfo)
        wepy.setStorageSync('SDK_VERSION', SDKVersion)
      }
    })
  }
  console.log('获取系统信息：')
  console.log('deviceInfo:')
  console.log(deviceInfo)
  console.log('windowHeight:' + windowHeight)
  console.log('screenWidth:' + screenWidth)
  return {
    windowHeight: windowHeight,
    screenWidth: screenWidth,
    deviceInfo: deviceInfo,
    SDKVersion: SDKVersion
  }
}

const mallVersion = '1.3'

module.exports = {
  getCurrentTime: getCurrentTime,
  fmtDate: fmtDate,
  objLength: objLength,
  displayProp: displayProp,
  sTrim: sTrim,
  replaceMaohao: replaceMaohao,
  vailPhone: vailPhone,
  ifSpanish: ifSpanish,
  div: div,
  mul: mul,
  accAdd: accAdd,
  convertStarArray: convertStarArray,
  getToken: getToken,
  variantsToKey: variantsToKey,
  keyToVariantsMap: keyToVariantsMap,
  toDecimal2: toDecimal2,
  findValidVariantsKey: findValidVariantsKey,
  qcArray: qcArray,
  getSystemInfo: getSystemInfo,
  mallVersion: mallVersion
}
