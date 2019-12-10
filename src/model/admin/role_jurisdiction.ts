import { think } from 'thinkjs';

export default class extends think.Model {

    /**
     * @description 添加角色-权限关联列表
     * @param {Object} params 关联数据
     */
    async addRoleJurisdiction(params: object[]) {
        return await this.addMany(params);
    }

    /**
     * @description 获取角色权限
     * @param {Number | String} role_id 角色role_id
     */
    // tslint:disable-next-line: variable-name
    async getRoleJurisdiction(role_id: number | string) {
        const data: any[] = await this.field('jurisdiction_id').where({ role_id }).select();
        return data.map((item: { jurisdiction_id: number | string }) => {
            return item.jurisdiction_id;
        });
    }

}