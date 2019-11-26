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
    name?: string[];
    status?: number | string;
    create_time?: string[];
}

interface IProductParams { // 添加商品入参
    id?: number | string;
    name: string;
    description?: string;
    publish_status: number | string;
    category_id?: number | string;
    pic_id?: number | string;
}

export default class extends think.Model {
    /**
     * @description 获取商品列表
     * @param {Object} params
     */
    async getProduct(params: IGetProductParams) {
        const data: IGetProductData = {};
        if (params.name) {
            data.name = ['like', '%' + params.name + '%'];
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
     * @description 添加商品
     * @param {Object} params 商品信息
     */
    async addProduct(params: IProductParams) {
        return this.add(params);
    }

    /**
     * @description 修改商品信息
     * @param {Object} params 商品信息
     */
    async updateProduct(params: IProductParams) {
        return this.where({
            id: params.id
        }).update(params);
    }

    /**
     * @description 删除商品
     * @param {Int} id 商品id
     */
    async deleteProduct(id: number | string) {
        return this.where({ id }).delete();
    }

    /**
     * @description 查找商品
     * @param id 商品id
     */
    async findSingleProduct(id: number | string) {
        return this.where({ id }).find();
    }

}