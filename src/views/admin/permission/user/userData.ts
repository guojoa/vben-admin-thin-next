import { BasicColumn } from '/@/components/Table/src/types/table';
import { FormProps } from '/@/components/Table';

export function getUserTableColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      fixed: 'left',
      width: 200,
    },
    {
      title: '用户名',
      dataIndex: 'username',
      width: 150,
      filters: [
        { text: 'Male', value: 'male' },
        { text: 'Female', value: 'female' },
      ],
    },
    {
      title: '手机',
      dataIndex: 'mobile',
      width: 150,
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      width: 150,
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 150,
      slots: { customRender: 'status' },
    },
    {
      title: '创建时间',
      dataIndex: 'createDate',
      width: 150,
    },
    {
      title: '更新时间',
      dataIndex: 'updateDate',
      width: 150,
    },
  ];
}

export function getUserFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 100,
    schemas: [
      {
        field: 'id',
        label: '用户ID',
        component: 'Input',
        colProps: {
          xl: 12,
          xxl: 6,
        },
      },
      {
        field: 'status',
        label: '状态',
        component: 'Select',
        componentProps: {
          options: [
            {
              label: '正常',
              value: '1',
              key: '1',
            },
            {
              label: '禁用',
              value: '0',
              key: '0',
            },
          ],
        },
        colProps: {
          xl: 12,
          xxl: 6,
        },
      },
      {
        field: 'username',
        label: '用户名',
        component: 'Input',
        colProps: {
          xl: 12,
          xxl: 6,
        },
      },
      {
        field: 'nickname',
        label: '用户昵称',
        component: 'Input',
        colProps: {
          xl: 12,
          xxl: 6,
        },
      },
    ],
  };
}
