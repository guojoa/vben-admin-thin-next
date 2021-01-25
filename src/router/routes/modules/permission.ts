import type { AppRouteModule } from '/@/router/types';

import { getParentLayout, LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const permission: AppRouteModule = {
  path: '/permission',
  name: 'Permission',
  component: LAYOUT,
  redirect: '/permission/user/page',
  meta: {
    icon: 'carbon:user-role',
    title: t('routes.permission.permission'),
    permissions: 'admin.permissions',
  },

  children: [
    {
      path: 'user',
      name: 'PermissionUser',
      component: getParentLayout('PermissionUser'),
      meta: {
        title: t('routes.permission.user'),
      },
      children: [
        {
          path: 'page',
          name: 'FrontPageAuth',
          component: () => import('/@/views/admin/permission/user/index.vue'),
          meta: {
            title: t('routes.permission.list'),
          },
        },
      ],
    },
  ],
};

export default permission;
