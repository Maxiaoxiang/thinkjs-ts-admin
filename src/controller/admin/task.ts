import BaseRest from '../rest';
import {think} from 'thinkjs';
const cmd = require("node-cmd");

export default class extends BaseRest {
    async postAction() {
        cmd.get(`start /b e:\\github\\puppeteer-robot\\${this.post('task')}.bat`);
    }
}
