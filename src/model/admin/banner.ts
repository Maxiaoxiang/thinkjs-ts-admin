import { think } from 'thinkjs';

interface IGetBannerListParams { // 列表查询入参
    page?: number;
    limit?: number;
    title?: string;
    publish_status?: number | string;
    startDate?: string;
    endDate?: string;
}

interface IGetBannerListData { // 查询sql
    title?: string[];
    publish_status?: number | string;
    create_time?: string[];
}

interface IAddBanner { // 添加/修改商品入参
    id?: number | string;
    title: string;
    url?: string;
    pic_url?: string;
    publish_status: number;
}

export default class extends think.Model {

    /**
     * @description 获取轮播图列表
     * @param {Object} params
     */
    async getBannerList(params: IGetBannerListParams) {
        const data: IGetBannerListData = {};
        if (params.title) {
            data.title = ['like', '%' + params.title + '%'];
        }
        if (params.publish_status) {
            data.publish_status = params.publish_status;
        }
        if (params.startDate && params.endDate) {
            data['t_banner.create_time'] = ['between', params.startDate + ',' + params.endDate];
        }
        return await this.field('t_banner.*').where(data).page(params.page, params.limit).countSelect();
    }

    /**
     * @description 添加
     * @param {Object} params 轮播图信息
     * @returns {Promise<void>}
     */
    async addBanner(params: IAddBanner) {
        return this.add(params);
    }

    /**
     * @description 修改文章信息
     * @param {Object} params 文章信息
     */
    async updateBanner(params: IAddBanner) {
        return this.where({
            id: params.id
        }).update(params);
    }

    /**
     * @description 删除文章
     * @param {Int} id 文章id
     */
    async deleteBanner(id: number | string) {
        return this.where({ id }).delete();
    }
}