import { think } from 'thinkjs';

interface IGetUserParams { // 获取用户入参
    page?: number;
    limit?: number;
    username?: string;
    name?: string;
    status?: number | string;
    startDate?: string;
    endDate?: string;
}

interface IGetUserData { // 数据库查询字段
    username?: string[];
    name?: string[];
    status?: number | string;
    create_time?: string[];
}

interface IAddUserParams { // 添加用户入参
    username: string;
    name?: string;
    password: string;
    status: number | string;
    create_user?: number | string;
    create_username?: string;
    update_user?: number | string;
    update_username?: string;
}

interface IUpdateUserInfoParams { // 修改用户信息
    id: number | string;
    username: string;
    name?: string;
    password: string;
    status: number | string;
    update_user?: number | string;
    update_username?: string;
}

export default class extends think.Model {
    /**
     * @description 关联查询用户_角色表
     */
    get relation() {
        return {
            role: {
                type: think.Model.MANY_TO_MANY,
                rModel: 'user_role',
                rfKey: 'role_id',
                field: 'id,name'
            }
        };
    }
    /**
     * @description 获取用户
     * @param {Object} params
     */
    async getUser(params: IGetUserParams) {
        const data: IGetUserData = {};
        if (params.username) {
            data.username = ['like', '%' + params.username + '%'];
        }
        if (params.name) {
            data.name = ['like', '%' + params.name + '%'];
        }
        if (params.status) {
            data.status = params.status;
        }
        if (params.startDate && params.endDate) {
            data.create_time = ['between', params.startDate + ',' + params.endDate];
        }
        const result: any = await this.where(data).page(params.page, params.limit).countSelect();
        // 处理role_id层级结构
        result.data.forEach((item: { role_id: number, role: any, role_name: string }) => {
            item.role_id = item.role[0].id;
            item.role_name = item.role[0].name;
            delete item.role;
        });
        return result;
    }

    /**
     * @description 添加用户
     * @param {Object} params 用户信息
     */
    async addUser(params: IAddUserParams) {
        return this.add(params);
    }

    /**
     * @description 修改用户信息
     * @param {Object} params 用户信息
     */
    async updateUserInfo(params: IUpdateUserInfoParams) {
        return this.where({
            id: params.id
        }).update(params);
    }

    /**
     * @description 删除用户
     * @param {Int} id 用户id
     */
    async deleteUser(id: number | string) {
        return this.where({ id }).delete();
    }

    /**
     * @description 查找用户
     * @param {String} username 用户名称
     * @returns {Promise<void>}
     */
    async findUser(username: string): Promise<void> {
        return this.where({ username }).find();
    }

    /**
     * @description 根据token获取用户信息
     * @param {String} id token
     */
    async getUserInfoByToken(id: number) {
        return this.where({ id }).find();
    }
}
