import { getListeners } from '/@/utils/helper/tsxHelper';
import { defHttp } from '/@/utils/http/axios';
import { userPageParams } from './model/userModel';

enum Api {
  getList = '/user',
  setUserData = '/user/setUserData',
}

export function getUserList(params: userPageParams) {
  return defHttp.request({
    url: Api.getList,
    method: 'GET',
    params,
  });
}

export function setUserStatus(id: number, status: number) {
  return defHttp.request({
    url: Api.setUserData,
    method: 'PUT',
    params: { id, status },
  });
}
