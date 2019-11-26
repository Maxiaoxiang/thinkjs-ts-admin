import qiniu from 'qiniu';
import fs from 'fs';
import BaseRest from './rest';
import { think } from 'thinkjs';
import UploadModel from '../model/upload';

interface IConfig {
    useHttpsDomain?: boolean;
    useCdnDomain?: boolean;
    zone?: object | string | null;
    zoneExpire?: number | string;
}

module.exports = class extends BaseRest {

  /**
   * @description 上传文件
   * @returns {Promise<void>}
   */
  async postAction() {
    const model = this.model('upload') as UploadModel;
    const file = this.file();
    const brandFile = file[Object.keys(file)[0]];
    const qconfig = this.config('qiniu');
    const mac = new qiniu.auth.digest.Mac(qconfig.accessKey, qconfig.secretKey);
    const deadline = new Date().getTime() / 1000 + 600;
    const options = {
      scope: qconfig.bucket,
      deadline
    };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const uploadToken = putPolicy.uploadToken(mac);
    const config: IConfig = new qiniu.conf.Config();
    // 空间对应的机房
    config.zone = qiniu.zone.Zone_z2;
    const suffix = Object.keys(file)[0].split('.'); // 取.后面的后缀，eg:mp3
    const filename = think.uuid('32') + '.' + suffix[suffix.length - 1];
    const is = fs.createReadStream(brandFile.path);
    const os = fs.createWriteStream(think.ROOT_PATH + '/www/upload/' + filename);
    is.pipe(os);
    const localFile = is.path;
    const formUploader = new qiniu.form_up.FormUploader(config);
    const putExtra = new qiniu.form_up.PutExtra();
    const uploadQiniu = new Promise((resolve, reject) => {
      formUploader.putFile(uploadToken, filename, localFile, putExtra, (respErr: any, respBody: unknown, respInfo: { statusCode: number; }) => {
        if (respErr) {
          return reject(respErr);
        }
        if (respInfo.statusCode === 200) {
          return resolve(respBody);
        }
      });
    });
    const res: any = await uploadQiniu; // 七牛回调
    // 写入数据库
    if (res && res.key) {
      await model.uploadFile({
        url: res.key
      });
      return this.success(res.key, '上传成功');
    } else {
      return this.fail(1, '上传失败');
    }
  }
};
