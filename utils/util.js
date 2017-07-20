
/** 手机号正则表达式 */
var phoneRe = /^1[3-9]\d{9}$/i;
/** 验证码正则表达式 */
var checkCodeRe = /^\d{6}$/i;

/**
 * 格式化时间。
 */
function formatTime(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();

  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':');
}

/**
 * 格式化数字。
 */
function formatNumber(n) {
  n = n.toString();

  return n[1] ? n : '0' + n;
}

module.exports = {
  formatTime: formatTime,
  phoneRe: phoneRe,
  checkCodeRe: checkCodeRe
};