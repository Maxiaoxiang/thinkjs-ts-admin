import BaseRest from '../rest';
import RoleModel from '../../model/admin/role';
import RoleJurisdictionModel from '../../model/admin/role_jurisdiction';
import { think } from 'thinkjs';

export default class extends BaseRest {
    /**
     * @description 获取角色列表
     */
    async getAction() {
        const model = this.model('admin/role') as RoleModel;
        const data = this.get('limit') > 998 ? await model.getRoleListNoPage(this.get()) : await model.getRoleList(this.get());
        return this.success(data);
    }

    /**
     * @description 添加角色分类
     */
    async postAction() {
        const model = this.model('admin/role') as RoleModel;
        const roleAndJurisdictionModel = this.model('admin/role_jurisdiction') as RoleJurisdictionModel;
        const userInfo: any = await this.session('userInfo');
        const data = await model.findRole(this.post('name'));
        if (!think.isEmpty(data)) {
            return this.fail(1, '角色名称已存在');
        }
        const roleId = await model.addRole({
            name: this.post('name'),
            status: this.post('status'),
            create_user: userInfo.id,
            create_username: userInfo.username,
            update_user: userInfo.id,
            update_username: userInfo.username
        });
        const jurisdiction = this.post('jurisdiction').map((jurisdictionId: number) => { // 关联表添加角色对应权限
            return {
                role_id: roleId,
                jurisdiction_id: jurisdictionId,
                create_user: userInfo.id,
                create_username: userInfo.username,
                update_user: userInfo.id,
                update_username: userInfo.username
            };
        });
        if (this.post('jurisdiction').length > 0) { // 有传权限时添加权限
            await roleAndJurisdictionModel.addRoleJurisdiction(jurisdiction);
        }
        return this.success(null, '添加成功');
    }

    /**
     * @description 修改角色
     */
    async putAction() {

    }

    /**
     * @description 删除角色
     */
    async deleteAction() {
        const model = this.model('admin/role') as RoleModel;
        await model.deleteRole(this.id);
        return this.success(null, '删除成功');
    }
}