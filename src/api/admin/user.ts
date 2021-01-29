import { getListeners } from '/@/utils/helper/tsxHelper';
import { defHttp } from '/@/utils/http/axios';
import { userPageParams } from './model/userModel';

enum Api {
  user = '/user',
  setUserData = '/user/setUserData',
  userrole = '/user/userrole/',
}

export function getUserList(params: userPageParams) {
  return defHttp.request({
    url: Api.user,
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

export function addUser(params: any) {
  return defHttp.request({
    url: Api.user,
    method: 'POST',
    params,
  });
}

export function getUserRole(userid: number) {
  console.log('url', `${Api.userrole}${userid}`);
  return defHttp.request({
    url: `${Api.userrole}${userid}`,
    method: 'GET',
  });
}
