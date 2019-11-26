import BaseRest from '../rest';
import BannerModel from '../../model/admin/banner';

export default class extends BaseRest {
    /**
     * @description 获取文章列表
     */
    async getAction() {
        const model = this.model('admin/banner') as BannerModel;
        const data = await model.getBannerList(this.get());
        return this.success(data);
    }

    /**
     * @description 添加文章
     */
    async postAction() {
        const model = this.model('admin/banner') as BannerModel;
        await model.addBanner({
            title: this.post('title'),
            url: this.post('url'),
            pic_url: this.post('pic_url'),
            publish_status: this.post('publish_status')
        });
        return this.success(null, '添加成功');
    }

    /**
     * @description 修改文章
     */
    async putAction() {
        const model = this.model('admin/banner') as BannerModel;
        await model.updateBanner({
            id: this.id,
            title: this.post('title'),
            url: this.post('url'),
            pic_url: this.post('pic_url'),
            publish_status: this.post('publish_status')
        });
        return this.success(null, '修改成功');
    }

    /**
     * @description 删除商品
     */
    async deleteAction() {
        const model = this.model('admin/banner') as BannerModel;
        await model.deleteBanner(this.id);
        return this.success(null, '删除成功');
    }
}