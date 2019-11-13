import { think } from 'thinkjs';

export default class extends think.Logic {
    postAction() {
        const rules: object = {
            username: {
                required: true,
                string: true,
                trim: true,
                method: 'POST',
                aliasName: '用户名'
            },
            password: {
                required: true,
                string: true,
                trim: true,
                method: 'POST',
                aliasName: '密码'
            }
        };
        const msgs: object = {
            required: '{name}不能为空'
        };
        if (!this.validate(rules, msgs)) { // 校验不通过
            const keys: string[] = Object.keys(this.validateErrors);
            const msg: string = this.validateErrors[keys[0]];
            return this.fail(1001, msg);
        }
    }
}
