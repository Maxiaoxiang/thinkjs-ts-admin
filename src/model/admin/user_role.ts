import { think } from 'thinkjs';

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

}