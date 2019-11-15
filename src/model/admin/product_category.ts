import { think } from 'thinkjs';

interface IGetCategoryParams { // 获取分类入参
    page?: number;
    limit?: number;
    category_name?: string;
    parent_id?: number;
    status?: number | string;
    startDate?: string;
    endDate?: string;
}

interface IGetProductData { // 数据库查询字段
    category_name?: string[];
    status?: number | string;
    parent_id?: number;
    create_time?: string[];
}

interface IAddUserParams { // 添加用户入参
    username: string;
    password: string;
    status: number | string;
}

interface IUpdateUserInfoParams { // 修改用户信息
    id: number | string;
    username: string;
    password: string;
    status: number | string;
}

interface IGetLeafCountTreeItem {
    id: number;
    category_name: string;
    parent_id: number;
    status: number;
    create_time: string;
    update_time: string;
    parent_name: string;
}

export default class extends think.Model {

    getLeafCountTree(item: IGetLeafCountTreeItem) {
        if (item.parent_id === 0) {
            return item;
        }
    }

    /**
     * @description 获取商品分类列表
     * @param {Object} params
     */
    async getProduct(params: IGetCategoryParams) {
        const data: IGetProductData = {};
        if (params.category_name) {
            data.category_name = ['like', '%' + params.category_name + '%'];
        }
        if (params.status) {
            data.status = params.status;
        }
        if (params.startDate && params.endDate) {
            data.create_time = ['between', params.startDate + ',' + params.endDate];
        }
        const result: any = await this.field('id,category_name,parent_id,status,create_time,update_time').where(data).page(params.page, params.limit).countSelect();
        result.data.forEach((item: { [x: string]: any; }) => { // 取分类名称字段
            const obj = result.data.find((i: { [x: string]: any; }) => item.parent_id === i.id);
            item.parent_name = obj && obj.hasOwnProperty('category_name') ? obj.category_name : null;
        });
        if (params.limit > 998) { // 整理为级联选择的数据结构，无分页等数据

        }
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
}
