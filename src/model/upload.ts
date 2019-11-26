import { think } from 'thinkjs';

interface IUploadFileParams { // 上传文件入参
    url: string;
}

export default class extends think.Model {

    /**
     * @description 上传文件
     * @param {Object} params
     */
    async uploadFile(params: IUploadFileParams) {
        return this.add(params);
    }
}