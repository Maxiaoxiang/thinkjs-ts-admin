import BaseRest from '../rest';
import LoginModel from '../../model/admin/login';
import { think } from 'thinkjs';

export default class extends BaseRest {
    /**
     * @description 登录
     */
    async postAction() {
        const model = this.model('admin/login') as LoginModel;
        const data = await model.getUser({
            username: this.post('username'),
            password: this.post('password')
        });
        if (think.isEmpty(data)) {
            return this.fail(1, '用户名或密码错误');
        }
        if (data.status === 0) {
            return this.fail(1, '该账号已禁用');
        }
        await this.session('userInfo', data);
        const token = think.md5(data.id.toString());
        this.cookie('token', token, {
            httpOnly: false,
            path: '/'
        });
        return this.success({
            token
        }, '登录成功');
    }
}