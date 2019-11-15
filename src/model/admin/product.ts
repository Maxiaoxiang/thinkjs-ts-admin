import { think } from 'thinkjs';

interface IGetProductParams { // 获取用户入参
    page?: number;
    limit?: number;
    name?: string;
    publish_status?: number | string;
    startDate?: string;
    endDate?: string;
}

interface IGetProductData { // 数据库查询字段
    username?: string[];
    status?: number | string;
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

export default class extends think.Model {
    /**
     * @description 获取商品列表
     * @param {Object} params
     */
    async getProduct(params: IGetProductParams) {
        const data: IGetProductData = {};
        if (params.name) {
            data.username = ['like', '%' + params.name + '%'];
        }
        if (params.publish_status) {
            data.status = params.publish_status;
        }
        if (params.startDate && params.endDate) {
            data['product.create_time'] = ['between', params.startDate + ',' + params.endDate];
        }
        return await this.join([
            'product_category ON product.category_id=product_category.id',
            'LEFT JOIN product_pic_info ON product.pic_id=product_pic_info.id'
          ]).field('product.*,category_name,pic_url').where(data).page(params.page, params.limit).countSelect();
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
