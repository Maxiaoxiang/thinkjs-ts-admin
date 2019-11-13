import { think } from 'thinkjs';

interface IGetUserParams {
    username: string;
    password: string;
}

export default class extends think.Model {
    /**
     * @description 查询用户
     * @param {Object} params 用户信息
     */
    async getUser(params: IGetUserParams) {
        const model = this.model('admin/user');
        return model.where(params).find();
    }
}
