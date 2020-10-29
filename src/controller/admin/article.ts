import BaseRest from '../rest';
import ArticleModel from '../../model/admin/article';
import {think} from 'thinkjs';

export default class extends BaseRest {
    /**
     * @description 获取文章列表
     */
    async getAction() {
        const model = this.model('admin/article') as ArticleModel;
        const data = await model.getArticleList(this.get());
        return this.success(data);
    }

    /**
     * @description 添加文章
     */
    async postAction() {
        const model = this.model('admin/article') as ArticleModel;
        if (think.isArray(this.post())) { // 批量添加
            await model.addManyArticle(this.post());
        } else {
            await model.addArticle({
                title: this.post('title'),
                description: this.post('description'),
                content: this.post('content'),
                publish_status: this.post('publish_status'),
                category_id: this.post('category_id'),
                thumb: this.post('thumb')
            });
        }
        return this.success(null, '添加成功');
    }

    /**
     * @description 修改文章
     */
    async putAction() {
        const model = this.model('admin/article') as ArticleModel;
        await model.updateProduct({
            id: this.id,
            title: this.post('title'),
            description: this.post('description'),
            content: this.post('content'),
            publish_status: this.post('publish_status'),
            category_id: this.post('category_id'),
            thumb: this.post('thumb')
        });
        return this.success(null, '修改成功');
    }

    /**
     * @description 删除商品
     */
    async deleteAction() {
        const model = this.model('admin/article') as ArticleModel;
        await model.deleteArticle(this.id);
        return this.success(null, '删除成功');
    }
}
