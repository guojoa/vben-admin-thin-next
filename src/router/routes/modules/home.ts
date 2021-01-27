import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/welcome',
  name: 'Home',
  component: LAYOUT,
  redirect: '/welcome/index',
  meta: {
    icon: 'bx:bx-home',
    title: t('routes.dashboard.welcome'),
  },
  children: [
    {
      path: 'index',
      name: 'Welcome',
      component: () => import('/@/views/dashboard/welcome/index.vue'),
      meta: {
        title: t('routes.dashboard.welcome'),
        affix: true,
        icon: 'bx:bx-home',
      },
    },
  ],
};

export default dashboard;
