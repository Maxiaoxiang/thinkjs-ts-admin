import BaseRest from '../rest';
import ArticleCategoryModel from '../../model/admin/article_category';
import { think } from 'thinkjs';

export default class extends BaseRest {
    /**
     * @description 获取分类列表
     */
    async getAction() {
        const model = this.model('admin/article_category') as ArticleCategoryModel;
        const data = this.get('limit') > 998 ? await model.getOtherCategoryList(this.get()) : await model.getArticleList(this.get());
        return this.success(data);
    }

    /**
     * @description 添加商品分类
     */
    async postAction() {
        const model = this.model('admin/article_category') as ArticleCategoryModel;
        const data = await model.findCategory(this.post('category_name'));
        if (!think.isEmpty(data)) {
            return this.fail(1, '分类名称已存在');
        }
        await model.addCategory({ // 添加新数据
            category_name: this.post('category_name'),
            parent_id: this.post('parent_id'),
            status: this.post('status')
        });
        return this.success(null, '添加成功');
    }

    /**
     * @description 修改用户
     */
    async putAction() {
        const model = this.model('admin/article_category') as ArticleCategoryModel;
        await model.updateInfo({
            id: this.id,
            category_name: this.post('category_name'),
            parent_id: this.post('parent_id'),
            status: this.post('status')
        });
        return this.success(null, '修改成功');
    }

    /**
     * @description 删除用户
     */
    async deleteAction() {
        const model = this.model('admin/article_category') as ArticleCategoryModel;
        await model.deleteCategory(this.id);
        return this.success(null, '删除成功');
    }
}