<template>
  <div class="p-4">
    <BasicTable @register="registerTable">
      <template #status="{ record }">
        <Tag :color="record.status ? 'green' : 'red'"> {{ record.status ? '正常' : '禁用' }} </Tag>
      </template>
      <template #toolbar>
        <a-button class="mr-2" type="primary" @click="userAdd">添加</a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '授权',
              onClick: handleRole.bind(null, record),
            },
            {
              label: record.status ? '禁用' : '启用',
              onClick: record.status
                ? confirmStatus.bind(null, record, 0)
                : confirmStatus.bind(null, record, 1),
            },
            {
              label: '重置密码',
              onClick: handleReset.bind(null, record),
            },
          ]"
        />
      </template>
    </BasicTable>
    <addModal @register="addregister" @formsub="formsub"></addModal>
    <roleModal @register="roleregister"></roleModal>
  </div>
</template>
<script lang="ts">
  import { defineComponent, unref } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getUserTableColumns, getUserFormConfig } from './userData';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { Tag } from 'ant-design-vue';
  import { getUserList, setUserStatus } from '/@/api/admin/user';
  import addModal from './addModal.vue';
  import roleModal from './roleModal.vue';
  import { useModal } from '/@/components/Modal';

  export default defineComponent({
    components: { BasicTable, TableAction, Tag, addModal, roleModal },
    setup() {
      const [registerTable, { reload }] = useTable({
        title: '用户列表',
        api: getUserList,
        useSearchForm: true,
        formConfig: getUserFormConfig(),
        columns: getUserTableColumns(),
        actionColumn: {
          width: 260,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
        showTableSetting: true,
      });
      const [addregister, { openModal: openadd }] = useModal();
      const [roleregister, { openModal: roleadd }] = useModal();
      const { createMessage, createConfirm } = useMessage();

      function handleRole(record: Recordable) {
        const { id } = unref(record);
        roleadd(true, { id });
      }
      function formsub(is: boolean) {
        console.log('is', is);
        reload({ page: 1 });
      }
      function confirmStatus(record, status) {
        const title = status ? '启用' : '禁用';
        const content = status ? '确实要启用这个用户吗' : '确实要禁用这个用户吗';
        createConfirm({
          iconType: 'warning',
          title,
          content,
          onOk: async () => {
            (await status) ? handleEnable(record) : handleDisable(record);
          },
        });
        console.log('status', status, record);
      }
      async function handleDisable(record: Recordable) {
        const { id } = unref(record);
        const res = await setUserStatus(id, 0);
        console.log('res', res);
        if (res.affected) {
          createMessage.success('修改成功');
          reload();
        }
      }
      async function handleEnable(record: Recordable) {
        const { id } = unref(record);
        const res = await setUserStatus(id, 1);
        console.log('res', res);
        if (res.affected) {
          createMessage.success('修改成功');
          reload();
        }
      }
      function handleReset(record: Recordable) {
        console.log('delete', unref(record));
      }
      function userAdd() {
        console.log('add');
        openadd();
      }
      return {
        registerTable,
        handleRole,
        handleReset,
        confirmStatus,
        userAdd,
        addregister,
        formsub,
        roleregister,
      };
    },
  });
</script>
