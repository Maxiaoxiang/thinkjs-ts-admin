// default config
module.exports = {
  workers: 1,
  errnoField: 'code', // errno字段
  errmsgField: 'msg', // errmsg字段
  defaultErrno: 0, // errcode字段
  validateDefaultErrno: 1,
  qiniu: {
    accessKey: 'CUJwV_o69CbDsXjeduHrnsWjXozU-kp4yjKfiegF',
    secretKey: 'FnbPPwLT0URDfnRJd1Re0bW4NZHxRuvy98GeY5LX',
    bucket: 'mss-admin-platform',
    domain: 'pic.maxiaoxiang.com'
  }
};