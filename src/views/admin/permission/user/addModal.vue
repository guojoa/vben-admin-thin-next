<template>
  <BasicModal v-bind="$attrs" @ok="submitForm" @register="register" title="添加用户">
    <BasicForm @register="registerForm" method="post" :model="model" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  import { addUser } from '/@/api/admin/user';
  import { useMessage } from '/@/hooks/web/useMessage';

  const schemas: FormSchema[] = [
    {
      field: 'username',
      component: 'Input',
      label: '用户名',
      rules: [
        { required: true, message: '用户名必填' },
        { min: 3, max: 30, message: '用户名长度介于3至30' },
      ],
      //   colProps: {
      //     span: 12,
      //   },
    },
    {
      field: 'password',
      component: 'InputPassword',
      label: '密码',
      rules: [
        { required: true, message: '密码必填' },
        { min: 3, max: 30, message: '密码长度介于3至30' },
      ],
      //   colProps: {
      //     span: 12,
      //   },
    },
    {
      field: 'nickname',
      component: 'Input',
      label: '昵称',
      rules: [
        { required: true, message: '昵称必填' },
        { min: 3, max: 30, message: '昵长度介于3至30' },
      ],
      //   colProps: {
      //     span: 12,
      //   },
    },
    {
      field: 'mobile',
      component: 'Input',
      label: '手机号',
      rules: [
        { required: true, message: '手机号必填' },
        {
          pattern: /^1[3456789]\d{9}$/,
          message: '请输入正确的手机号',
        },
      ],
      //   colProps: {
      //     span: 12,
      //   },
    },
  ];
  export default defineComponent({
    components: { BasicModal, BasicForm },
    emits: ['formsub'],
    setup(_, { emit }) {
      const modelRef = ref({});
      const [
        registerForm,
        {
          validateFields,
          getFieldsValue,
          resetFields,
          // setFieldsValue,
          // setProps
        },
      ] = useForm({
        labelWidth: 120,
        schemas,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 24,
        },
      });

      const [register, { closeModal, changeLoading }] = useModalInner();
      const { createMessage } = useMessage();

      async function submitForm() {
        // console.log('model', getFieldsValue());

        try {
          const validate = await validateFields();
          console.log('validate', validate);
          changeLoading(true);
          const ret = await addUser(getFieldsValue());
          if (ret) {
            changeLoading(false);
            closeModal();
            resetFields();
            createMessage.success('添加成功');
            emit('formsub', true);
          } else {
            changeLoading(false);
          }
          //   setTimeout(() => {

          //   }, 2000);
        } catch (error) {
          console.log('error', error);
        }
        // closeModal();
      }

      //   const [register] = useModalInner((data) => {
      //     // 方式1
      //     // setFieldsValue({
      //     //   field2: data.data,
      //     //   field1: data.info,
      //     // });

      //     // 方式2
      //     modelRef.value = { field2: data.data, field1: data.info };

      //     // setProps({
      //     //   model:{ field2: data.data, field1: data.info }
      //     // })
      //   });
      return { register, submitForm, schemas, registerForm, model: modelRef };
    },
  });
</script>
