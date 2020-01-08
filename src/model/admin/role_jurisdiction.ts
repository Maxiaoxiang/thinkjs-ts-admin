import { think } from 'thinkjs';

interface IGetRoleJurisdictionByListParams {
    role_id: number | string;
    jurisdiction_list: number[] | string[];
}

export default class extends think.Model {

    /**
     * @description 添加角色-权限关联列表
     * @param {Object} params 关联数据
     */
    async addRoleJurisdiction(params: object[]) {
        return this.addMany(params);
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

    /**
     * @description 根据id列表获取角色权限
     * @param {Array} params
     */
    async getRoleJurisdictionByList(params: IGetRoleJurisdictionByListParams) {
        return this.where({ role_id: params.role_id, jurisdiction_id: ['IN', params.jurisdiction_list] }).select();
    }

    /**
     * @description 删除权限
     * @param jurisdiction 权限数组
     */
    async deleteRoleJurisdiction(roleId: number | string, jurisdiction: number[]) {
        return this.where({ role_id: roleId, jurisdiction_id: ['IN', jurisdiction] }).delete();
    }

}