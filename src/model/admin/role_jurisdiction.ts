import { think } from 'thinkjs';

export default class extends think.Model {

    /**
     * @description 添加角色-权限关联列表
     * @param {Object} params 关联数据
     */
    async addRoleJurisdiction(params: object[]) {
        return await this.addMany(params);
    }

}