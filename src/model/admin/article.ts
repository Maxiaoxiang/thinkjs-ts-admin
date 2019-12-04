import { think } from 'thinkjs';

interface IGetArticleListParams { // 列表查询入参
    page?: number;
    limit?: number;
    name?: string;
    publish_status?: number | string;
    startDate?: string;
    endDate?: string;
}

interface IGetArticleListData { // 查询sql
    name?: string[];
    publish_status?: number | string;
    create_time?: string[];
}

interface IAddArticle { // 添加/修改商品入参
    id?: number | string;
    title: string;
    description?: string;
    content?: string;
    publish_status: number;
    category_id?: number;
    thumb?: string;
}

export default class extends think.Model {

    /**
     * @description 获取文章列表
     * @param {Object} params
     */
    async getArticleList(params: IGetArticleListParams) {
        const data: IGetArticleListData = {};
        if (params.name) {
            data.name = ['like', '%' + params.name + '%'];
        }
        if (params.publish_status) {
            data.publish_status = params.publish_status;
        }
        if (params.startDate && params.endDate) {
            data['t_article.create_time'] = ['between', params.startDate + ',' + params.endDate];
        }
        return await this.join([
            't_article_category ON t_article.category_id=t_article_category.id',
        ]).field('t_article.*,category_name').where(data).page(params.page, params.limit).countSelect();
    }

    /**
     * @description 添加
     * @param {Object} params 文章信息
     * @returns {Promise<void>}
     */
    async addArticle(params: IAddArticle) {
        return this.add(params);
    }

    /**
     * @description 修改文章信息
     * @param {Object} params 文章信息
     */
    async updateProduct(params: IAddArticle) {
        return this.where({
            id: params.id
        }).update(params);
    }

    /**
     * @description 删除文章
     * @param {Int} id 文章id
     */
    async deleteArticle(id: number | string) {
        return this.where({ id }).delete();
    }
}