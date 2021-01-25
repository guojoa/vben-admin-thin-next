import { defHttp } from '/@/utils/http/axios';

import { getMenuListByIdParams, getMenuListByIdParamsResultModel } from './model/menuModel';

enum Api {
  GetMenuListById = '/getMenuListById',
  GetTree = '/menu/getTree',
}

/**
 * @description: Get user menu based on id
 */
export function getMenuListById(params: getMenuListByIdParams) {
  return defHttp.request<getMenuListByIdParamsResultModel>({
    url: Api.GetMenuListById,
    method: 'GET',
    params,
  });
}

export function getTree() {
  return defHttp.request<getMenuListByIdParamsResultModel>({
    url: Api.GetTree,
    method: 'GET',
  });
}
