import BaseRest from '../rest';
import JurisdictionModel from '../../model/admin/jurisdiction';
import { think } from 'thinkjs';

export default class extends BaseRest {
    /**
     * @description 获取权限列表
     */
    async getAction() {
        const model = this.model('admin/jurisdiction') as JurisdictionModel;
        const data = this.get('limit') > 998 ? await model.getJurisdictionListNoPage(this.get()) : await model.getJurisdictionList(this.get());
        return this.success(data);
    }

    /**
     * @description 添加权限
     */
    async postAction() {
        const model = this.model('admin/jurisdiction') as JurisdictionModel;
        const userInfo: any = await this.session('userInfo');
        await model.addJurisdiction({
            status: this.post('status'),
            parent_id: this.post('parent_id'),
            title: this.post('title'),
            path: this.post('path'),
            remark: this.post('remark'),
            description: this.post('description'),
            icon: this.post('icon'),
            code: 'admin_element_' + think.md5(this.post('title') + new Date().getTime().toString()), // 生成唯一code
            order: this.post('order'),
            create_user: userInfo.id,
            create_username: userInfo.username,
            update_user: userInfo.id,
            update_username: userInfo.username
        });
        return this.success(null, '添加成功');
    }

    /**
     * @description 修改权限
     */
    async putAction() {
        const model = this.model('admin/jurisdiction') as JurisdictionModel;
        const userInfo: any = await this.session('userInfo');
        await model.updateJurisdiction({
            id: this.id,
            status: this.post('status'),
            parent_id: this.post('parent_id'),
            title: this.post('title'),
            path: this.post('path'),
            remark: this.post('remark'),
            description: this.post('description'),
            icon: this.post('icon'),
            order: this.post('order'),
            update_user: userInfo.id,
            update_username: userInfo.username
        });
        return this.success(null, '修改成功');
    }

    /**
     * @description 删除权限
     */
    async deleteAction() {
        const model = this.model('admin/jurisdiction') as JurisdictionModel;
        await model.deleteJurisdiction(this.id);
        return this.success(null, '删除成功');
    }
}