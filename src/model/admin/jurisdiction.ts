import { think } from 'thinkjs';

interface IGetJurisdictionList { // 权限列表入参
    page?: number;
    limit?: number;
    name?: string;
    status?: number | string;
    startDate?: string;
    endDate?: string;
    jurisdictionIdList?: number[];
}

interface IGetJurisdictionListData { // 数据库查询字段
    id?: any[];
    name?: string[];
    status?: number | string;
    create_time?: string[];
}

interface IJurisdictionParams {
    id?: number | string;
    name?: string;
    parent_id: number | string;
    status?: number | string;
    title?: string;
    code?: string;
    path: string;
    remark?: string;
    description?: string;
    icon?: string;
    order: number;
    create_user?: number | string;
    create_username?: string;
    update_user?: number | string;
    update_username?: string;
}

interface IGetJurisdictionTreeItem { // 递归整理数据结构容器对象
    id: number;
    name?: string;
    parent_id: number;
    status?: number;
    create_time?: string;
    update_time?: string;
    children?: object[];
    value?: number | string;
    label?: string;
}

export default class extends think.Model {
    /**
     * @description 获取权限列表
     */
    async getJurisdictionList(params: IGetJurisdictionList) {
        const data: IGetJurisdictionListData = {};
        if (params.name) {
            data.name = ['like', '%' + params.name + '%'];
        }
        if (params.status) {
            data.status = params.status;
        }
        if (params.startDate && params.endDate) {
            data['t_jurisdiction.create_time'] = ['between', params.startDate + ',' + params.endDate];
        }
        if (params.jurisdictionIdList) {
            data.id = ['IN', params.jurisdictionIdList];
        }
        return this.reconsitutionTreeList(await this.field('t_jurisdiction.*').where(data).page(params.page, 9999).select());
    }

    /**
     * @description 重构权限列表数据结构
     * @param result 数据
     * @return {Array} 树型结构
     */
    reconsitutionTreeList(result: any): any[] {
        result.forEach((item: { [x: string]: any; }) => { // 取分类名称字段
            item.children = [];
            item.value = item.id;
            item.label = item.name;
        });
        const ancestors = result.filter((item: { [x: string]: number; }) => item.parent_id === 0); // 最上级
        /**
         * 递归整理数据结构
         * @param item 当前分类
         * @param id 分类id
         */
        function getLeafCountTree(item: IGetJurisdictionTreeItem, id: number) {
            if (id !== 0 && !result.some((i: { parent_id: number; }) => i.parent_id === id)) {
                return false;
            }
            result.forEach((obj: IGetJurisdictionTreeItem) => {
                if (obj.parent_id === id) {
                    item.children.push(obj);
                    getLeafCountTree(obj, obj.id);
                }
            });
        }
        ancestors.forEach((item: IGetJurisdictionTreeItem) => {
            getLeafCountTree(item, item.id);
        });
        return ancestors;
    }

    /**
     * @description 获取权限列表无分页无整理
     * @param params 入参
     */
    async getJurisdictionListNoPage(params: IGetJurisdictionList) {
        const data: IGetJurisdictionListData = {};
        if (params.name) {
            data.name = ['like', '%' + params.name + '%'];
        }
        if (params.status) {
            data.status = params.status;
        }
        if (params.startDate && params.endDate) {
            data['t_jurisdiction.create_time'] = ['between', params.startDate + ',' + params.endDate];
        }
        if (params.jurisdictionIdList) {
            data.id = ['IN', params.jurisdictionIdList];
        }
        return await this.field('t_jurisdiction.*').where(data).page(params.page, params.limit).select();
    }

    /**
     * @description 添加权限
     * @param {Object} params 权限
     */
    async addJurisdiction(params: IJurisdictionParams) {
        return this.add(params);
    }

    /**
     * @description 修改权限
     * @param {Object} params 权限
     */
    async updateJurisdiction(params: IJurisdictionParams) {
        return this.where({
            id: params.id
        }).update(params);
    }

    /**
     * @description 删除权限
     * @param {Int} id 权限id
     */
    async deleteJurisdiction(id: number | string) {
        return this.where({ id }).delete();
    }
}