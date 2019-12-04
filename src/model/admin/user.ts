import { think } from 'thinkjs';

interface IGetUserParams { // 获取用户入参
    page?: number;
    limit?: number;
    username?: string;
    status?: number | string;
    startDate?: string;
    endDate?: string;
}

interface IGetUserData { // 数据库查询字段
    username?: string[];
    status?: number | string;
    create_time?: string[];
}

interface IAddUserParams { // 添加用户入参
    username: string;
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
    password: string;
    status: number | string;
    update_user?: number | string;
    update_username?: string;
}

export default class extends think.Model {
    /**
     * @description 获取用户
     * @param {Object} params
     */
    async getUser(params: IGetUserParams) {
        const data: IGetUserData = {};
        if (params.username) {
            data.username = ['like', '%' + params.username + '%'];
        }
        if (params.status) {
            data.status = params.status;
        }
        if (params.startDate && params.endDate) {
            data.create_time = ['between', params.startDate + ',' + params.endDate];
        }
        return await this.field('id,username,status,create_time,update_time').where(data).page(params.page, params.limit).countSelect();
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
}
