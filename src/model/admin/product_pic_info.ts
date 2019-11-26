import { think } from 'thinkjs';

interface IProductPic { // 商品图片入参
    id?: number | string;
    pic_url: string;
}

export default class extends think.Model {
    /**
     * @description 获取商品图片
     * @param {String} id 图片ID
     */
    async getProductPic(id: string) {
        return this.where({ id }).select();
    }

    /**
     * @description 添加商品图片
     * @param {Object} 图片
     * @returns {Promise<void>}
     */
    async addProductPic(params: IProductPic) {
        return this.add(params);
    }

    /**
     * @description 更改商品图片
     * @param {Object} 图片
     * @returns {Promise<void>}
     */
    async updateProductPic(params: IProductPic) {
        return this.where({
            id: params.id
        }).update(params);
    }
}