import BaseRest from '../rest';
const qiniu = require('qiniu');

module.exports = class extends BaseRest {
    /**
     * @description 获取七牛云token
     * @returns {Promise<any>}
     */
    async getAction(): Promise<any> {
        const qconfig = this.config('qiniu');
        const mac = new qiniu.auth.digest.Mac(qconfig.accessKey, qconfig.secretKey);
        const deadline = new Date().getTime() / 1000 + 600;
        const options = {
            scope: qconfig.bucket,
            deadline
        };
        const putPolicy = new qiniu.rs.PutPolicy(options);
        const uploadToken = putPolicy.uploadToken(mac);
        return this.success({ token: uploadToken });
    }
};
