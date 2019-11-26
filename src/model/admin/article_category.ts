import { think } from 'thinkjs';

interface IGetCategoryParams { // 获取分类入参
    page?: number;
    limit?: number;
    category_name?: string;
    parent_id?: number;
    status?: number | string;
    startDate?: string;
    endDate?: string;
}

interface IGetProductData { // 数据库查询字段
    category_name?: string[];
    status?: number | string;
    parent_id?: number;
    create_time?: string[];
}

interface IAddCategoryParams { // 添加入参
    id?: number | string;
    category_name: string;
    parent_id?: string;
    status: number | string;
}

interface IGetLeafCountTreeItem { // 递归整理数据结构容器对象
    id: number;
    category_name?: string;
    parent_id: number;
    status?: number;
    create_time?: string;
    update_time?: string;
    parent_name?: string;
    children?: object[];
    category?: number[];
    value?: number | string;
    label?: string;
}

export default class extends think.Model {

    /**
     * 获取商品分类列表
     * @param {Object} params
     */
    async getArticleList(params: IGetCategoryParams) {
        const data: IGetProductData = {};
        if (params.category_name) {
            data.category_name = ['like', '%' + params.category_name + '%'];
        }
        if (params.status) {
            data.status = params.status;
        }
        if (params.startDate && params.endDate) {
            data.create_time = ['between', params.startDate + ',' + params.endDate];
        }
        return await this.field('id,category_name,parent_id,status,create_time,update_time').where(data).page(params.page, params.limit).countSelect();
    }

    /**
     * 其他model获取文章分类列表
     * @param {Object} params
     */
    async getOtherCategoryList(params: IGetCategoryParams) {
        const data: IGetProductData = {};
        if (params.category_name) {
            data.category_name = ['like', '%' + params.category_name + '%'];
        }
        data.status = 1; // 默认拉取启用状态的数据
        if (params.startDate && params.endDate) {
            data.create_time = ['between', params.startDate + ',' + params.endDate];
        }
        const result: any = await this.field('id,category_name,parent_id,status,create_time,update_time').where(data).page(params.page, params.limit).countSelect();
        result.data.forEach((item: { [x: string]: any; }) => { // 取分类名称字段
            item.children = [];
            item.category = [];
            item.value = item.id;
            item.label = item.category_name;
            const obj = result.data.find((i: { [x: string]: any; }) => item.parent_id === i.id);
            item.parent_name = obj && obj.hasOwnProperty('category_name') ? obj.category_name : null;
        });
        if (params.limit > 998) { // 整理为级联选择的数据结构，无分页等数据
            const ancestors = result.data.filter((item: { [x: string]: number; }) => item.parent_id === 0); // 最上级
            /**
             * 递归整理数据结构
             * @param item 当前分类
             * @param id 分类id
             */
            function getLeafCountTree(item: IGetLeafCountTreeItem, id: number) {
                if (id !== 0 && !result.data.some((i: { parent_id: number; }) => i.parent_id === id)) {
                    return false;
                }
                result.data.forEach((obj: IGetLeafCountTreeItem) => {
                    if (obj.parent_id === id) {
                        item.children.push(obj);
                        item.category.push(obj.id);
                        getLeafCountTree(obj, obj.id);
                    }
                });
            }
            ancestors.forEach((item: IGetLeafCountTreeItem) => {
                getLeafCountTree(item, item.id);
            });
            return ancestors;
        }
        return result;
    }

    /**
     * @description 添加分类
     * @param {Object} params 分类
     * @returns {Promise<void>}
     */
    async addCategory(params: IAddCategoryParams) {
        return this.add(params);
    }

    /**
     * @description 修改分类信息
     * @param {Object} params 用户信息
     */
    async updateInfo(params: IAddCategoryParams) {
        return this.where({
            id: params.id
        }).update(params);
    }

    /**
     * 删除分类
     * @param {Int} id 分类id
     */
    async deleteCategory(id: number | string) {
        return this.where({ id }).delete();
    }

    /**
     * 查找分类
     * @param category_name 分类名称
     * @returns {Promise<void>}
     */
    // tslint:disable-next-line: variable-name
    async findCategory(category_name: string): Promise<void> {
        return this.where({ category_name }).find();
    }
}
