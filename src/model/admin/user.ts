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
     * @param {Object} userInfo 用户信息
     */
    async updateUserInfo(userInfo: object) {
        return this.where({
            // id: userInfo.id
        }).update(userInfo);
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
