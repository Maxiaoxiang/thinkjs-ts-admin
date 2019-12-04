import { think } from 'thinkjs';

interface IGetRoleList { // 角色列表入参
    page?: number;
    limit?: number;
    name?: string;
    status?: number | string;
    startDate?: string;
    endDate?: string;
}

interface IGetRoleListData { // 数据库查询字段
    name?: string[];
    status?: number | string;
    create_time?: string[];
}

interface IRoleParams { // 添加修改角色接口
    id?: number | string;
    name: string;
    status?: number | string;
    create_user?: number | string;
    create_username?: string;
    update_user?: number | string;
    update_username?: string;
}

export default class extends think.Model {

    /**
     * @description 关联查询角色_权限表
     */
    get relation() {
        return {
            jurisdiction: {
                type: think.Model.MANY_TO_MANY,
                rModel: 'role_jurisdiction',
                rfKey: 'jurisdiction_id',
                field: 'id, title'
            }
        };
    }

    /**
     * @description 获取角色列表
     */
    async getRoleList(params: IGetRoleList) {
        const data: IGetRoleListData = {};
        if (params.name) {
            data.name = ['like', '%' + params.name + '%'];
        }
        if (params.status) {
            data.status = params.status;
        }
        if (params.startDate && params.endDate) {
            data['t_role.create_time'] = ['between', params.startDate + ',' + params.endDate];
        }
        return await this.field('t_role.*').where(data).page(params.page, params.limit).countSelect();
    }

    /**
     * @description 获取角色列表无分页
     */
    async getRoleListNoPage(params: IGetRoleList) {
        const data: IGetRoleListData = {};
        if (params.name) {
            data.name = ['like', '%' + params.name + '%'];
        }
        if (params.status) {
            data.status = params.status;
        }
        if (params.startDate && params.endDate) {
            data['t_role.create_time'] = ['between', params.startDate + ',' + params.endDate];
        }
        return await this.field('t_role.*').where(data).page(params.page, params.limit).select();
    }

    /**
     * @description 添加角色
     * @param {Object} params 角色
     */
    async addRole(params: IRoleParams) {
        return await this.add(params);
    }

    /**
     * @description 修改角色
     * @param {Object} params 角色
     */
    async updateRole(params: IRoleParams) {
        return this.where({
            id: params.id
        }).update(params);
    }

    /**
     * @description 删除角色
     * @param {Int} id 角色id
     */
    async deleteRole(id: number | string) {
        return this.where({ id }).delete();
    }

    /**
     * @description 查找角色
     * @param {String} name 角色名称
     * @returns {Promise<void>}
     */
    async findRole(name: string): Promise<void> {
        return this.where({ name }).find();
    }
}