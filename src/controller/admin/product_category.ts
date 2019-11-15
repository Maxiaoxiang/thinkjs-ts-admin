import BaseRest from '../rest';
import ProductCategoryModel from '../../model/admin/product_category';
import { think } from 'thinkjs';

export default class extends BaseRest {
    /**
     * @description 获取分类列表
     */
    async getAction() {
        const model = this.model('admin/product_category') as ProductCategoryModel;
        const data = await model.getProduct(this.get());
        return this.success(data);
    }

    /**
     * @description 添加用户
     */
    async postAction() {
        const model = this.model('admin/product_category') as ProductCategoryModel;
        const data = await model.findUser(this.post('username'));
        if (!think.isEmpty(data)) {
            return this.fail(1, '用户名已存在');
        }
        await model.addUser({
            username: this.post('username'),
            password: this.post('password'),
            status: this.post('status')
        });
        return this.success(null, '添加成功');
    }

    /**
     * @description 修改用户
     */
    async putAction() {
        const model = this.model('admin/product_category') as ProductCategoryModel;
        await model.updateUserInfo({
            id: this.id,
            username: this.post('username'),
            password: this.post('password'),
            status: this.post('status')
        });
        return this.success(null, '修改成功');
    }

    /**
     * @description 删除用户
     */
    async deleteAction() {
        const model = this.model('admin/product_category') as ProductCategoryModel;
        if (Number(this.id) === 1) {
            return this.fail(1, '管理员不可删除');
        }
        await model.deleteUser(this.id);
        return this.success(null, '删除成功');
    }
}