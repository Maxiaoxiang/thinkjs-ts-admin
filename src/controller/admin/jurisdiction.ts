import BaseRest from '../rest';
import JurisdictionModel from '../../model/admin/jurisdiction';
import UserRoleModel from '../../model/admin/user_role';
import RoleJurisdictionModel from '../../model/admin/role_jurisdiction';
import {think} from 'thinkjs';

export default class extends BaseRest {
    /**
     * @description 获取用户关联的角色拥有的权限
     */
    async __before() {
        const userInfo: any = await this.session('userInfo');
        const urm = this.model('admin/user_role') as UserRoleModel;
        const rjm = this.model('admin/role_jurisdiction') as RoleJurisdictionModel;
        const roleId: number | string = await urm.getUserRole(userInfo.id);
        this.ctx.state.jurisdictionIdList = await rjm.getRoleJurisdiction(roleId);
    }

    /**
     * @description 获取权限列表
     */
    async getAction() {
        const model = this.model('admin/jurisdiction') as JurisdictionModel;
        const getParams: object = this.get('all') ? this.get() : Object.assign({}, this.get(), {
            jurisdictionIdList: this.ctx.state.jurisdictionIdList // 权限id列表
        });
        if (this.get('getSourceCode') && this.get('sourceCode')) { // 每次进入页面获取当前菜单下的资源code
            return this.success(await model.getSourceCodeList(this.get('sourceCode')));
        }
        if (this.get('sourceCode')) { // 获取资源code下的资源列表
            return this.success(await model.getSourceChildrenList(this.get('sourceCode')));
        } else {
            const data = this.get('limit') > 998 ? await model.getJurisdictionListNoPage(getParams) : await model.getJurisdictionList(getParams);
            return this.success(data);
        }
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
