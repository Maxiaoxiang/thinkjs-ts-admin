import BaseRest from '../rest';
import ProductModel from '../../model/www/product';
import {think} from 'thinkjs';

export default class extends BaseRest {
    /**
     * @description 获取商品列表
     */
    async getAction() {
        const config = this.config('qiniu');
        const product = this.model('www/product') as ProductModel;
        const result: any = await product.getProduct(this.get());
        result.data.forEach((item: { [x: string]: any; }) => {
            item.pic_url = 'http://' + config.domain + '/' + item.pic_url;
        });
        return this.success(result);
    }
}
