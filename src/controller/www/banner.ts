import BaseRest from '../rest';
import BannerModel from '../../model/www/banner';
import {think} from 'thinkjs';

export default class extends BaseRest {
    /**
     * @description 获取商品列表
     */
    async getAction() {
        const config = this.config('qiniu');
        const banner = this.model('www/banner') as BannerModel;
        const result: any = await banner.getBannerList(this.get());
        result.data.forEach((item: { [x: string]: any; }) => {
            item.pic_url = 'http://' + config.domain + '/' + item.pic_url;
        });
        return this.success(result);
    }
}
