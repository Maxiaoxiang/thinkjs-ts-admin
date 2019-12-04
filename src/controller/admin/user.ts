import BaseRest from '../rest';
import UserModel from '../../model/admin/user';
import UserRoleModel from '../../model/admin/user_role';
import { think } from 'thinkjs';

export default class extends BaseRest {
    /**
     * @description 获取用户列表
     */
    async getAction() {
        const model = this.model('admin/user') as UserModel;
        const data = await model.getUser(this.get());
        return this.success(data);
    }

    /**
     * @description 添加用户
     */
    async postAction() {
        const model = this.model('admin/user') as UserModel;
        const userAndRoleModel = this.model('admin/user_role') as UserRoleModel;
        const userInfo: any = await this.session('userInfo');
        const data = await model.findUser(this.post('username'));
        if (!think.isEmpty(data)) {
            return this.fail(1, '用户名已存在');
        }
        const userId = await model.addUser({
            username: this.post('username'),
            password: this.post('password'),
            status: this.post('status'),
            create_user: userInfo.id,
            create_username: userInfo.username,
            update_user: userInfo.id,
            update_username: userInfo.username
        });
        // 联动添加用户角色
        await userAndRoleModel.addUserRole({
            user_id: userId,
            role_id: this.post('role'),
            create_user: userInfo.id,
            create_username: userInfo.username,
            update_user: userInfo.id,
            update_username: userInfo.username
        });
        return this.success(null, '添加成功');
    }

    /**
     * @description 修改用户
     */
    async putAction() {
        const model = this.model('admin/user') as UserModel;
        const userInfo: any = await this.session('userInfo');
        await model.updateUserInfo({
            id: this.id,
            username: this.post('username'),
            password: this.post('password'),
            status: this.post('status'),
            update_user: userInfo.id,
            update_username: userInfo.username
        });
        return this.success(null, '修改成功');
    }

    /**
     * @description 删除用户
     */
    async deleteAction() {
        const model = this.model('admin/user') as UserModel;
        if (Number(this.id) === 1) {
            return this.fail(1, '管理员不可删除');
        }
        await model.deleteUser(this.id);
        return this.success(null, '删除成功');
    }
}