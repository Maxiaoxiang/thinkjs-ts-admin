import { think } from 'thinkjs';

export default class extends think.Model {

    /**
     * @description 添加用户-角色关联
     * @param {Object} params 关联数据
     */
    async addUserRole(params: any) {
        return await this.add(params);
    }

}