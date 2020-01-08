import { think } from 'thinkjs';

interface IUpdateUserRoleParams { // 更新关联入参
    user_id: number | string;
    role_id: number | string;
    update_user?: number;
    update_username?: string;
}

interface IUpdateUserRoleData { // 更新关联入参
    user_id?: number | string;
    role_id?: number | string;
    update_user?: number;
    update_username?: string;
}

export default class extends think.Model {
    /**
     * @description 添加用户-角色关联
     * @param {Object} params 关联数据
     */
    async addUserRole(params: any) {
        return await this.add(params);
    }

    /**
     * @description 获取用户角色
     * @param {Number | String} 用户user_id
     */
    // tslint:disable-next-line: variable-name
    async getUserRole(user_id: number | string) {
        const data: { role_id: number | string } = await this.field('role_id').where({ user_id }).find();
        return data.role_id;
    }

    /**
     * @description 更新用户-角色关联
     * @param {Object} params 关联数据
     */
    async updateUserRole(params: IUpdateUserRoleParams) {
        const data: IUpdateUserRoleData = Object.assign({}, params);
        delete data.user_id;
        return this.where({ user_id: params.user_id }).update(data);
    }

}