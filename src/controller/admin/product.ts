import BaseRest from '../rest';
import ProductModel from '../../model/admin/product';
import ProductPicInfoModel from '../../model/admin/product_pic_info';

export default class extends BaseRest {
    /**
     * @description 获取商品列表
     */
    async getAction() {
        const model = this.model('admin/product') as ProductModel;
        const data = await model.getProduct(this.get());
        return this.success(data);
    }

    /**
     * @description 添加商品
     */
    async postAction() {
        const productPicInfoModel = this.model('admin/product_pic_info') as ProductPicInfoModel;
        const productModel = this.model('admin/product') as ProductModel;
        await productModel.addProduct({
            name: this.post('name'),
            description: this.post('description'),
            publish_status: this.post('publish_status'),
            category_id: this.post('category_id'),
            pic_id: await productPicInfoModel.addProductPic({ // 联动添加商品图片
                pic_url: this.post('pic_hash')
            })
        });
        return this.success(null, '添加成功');
    }

    /**
     * @description 修改商品
     */
    async putAction() {
        const productPicInfoModel = this.model('admin/product_pic_info') as ProductPicInfoModel;
        const model = this.model('admin/product') as ProductModel;
        // 获取当前商品数据
        const data: { pic_id: number, pic_url: string } = await model.findSingleProduct(this.id);
        // 商品pic_id联动修改图片链接
        await productPicInfoModel.updateProductPic({
            id: data.pic_id,
            pic_url: this.post('pic_hash')
        });
        await model.updateProduct({
            id: this.id,
            name: this.post('name'),
            description: this.post('description'),
            publish_status: this.post('publish_status'),
            category_id: this.post('category_id')
        });
        return this.success(null, '修改成功');
    }

    /**
     * @description 删除商品
     */
    async deleteAction() {
        const model = this.model('admin/product') as ProductModel;
        await model.deleteProduct(this.id);
        return this.success(null, '删除成功');
    }
}