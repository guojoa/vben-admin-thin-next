<template>
  <BasicModal v-bind="$attrs" @ok="submitRole" @register="register" title="添加用户">
    <div :style="{ borderBottom: '1px solid #E9E9E9' }">
      <Checkbox :checked="checkAll" :indeterminate="indeterminate" @change="onCheckAllChange">
        Check all
      </Checkbox>
    </div>
    <br />
    <CheckboxGroup :value="uservalues" :options="options" @change="onChange" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref, toRefs, watch } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { Checkbox } from 'ant-design-vue';
  import { getUserRole } from '/@/api/admin/user';
  import { useMessage } from '/@/hooks/web/useMessage';

  interface State {
    indeterminate: boolean;
    checkAll: boolean;
    uservalues: string[];
  }
  interface Options {
    label: string;
    value: string;
    fixed?: boolean | 'left' | 'right';
  }
  const plainOptions = ['Apple', 'Pear', 'Orange'];
  export default defineComponent({
    components: { BasicModal, Checkbox, CheckboxGroup: Checkbox.Group },
    setup() {
      const userid = ref(0);
      const options = ref<Options[]>([{ label: 'ddd', value: '2' }]);

      const state = reactive<State>({
        checkAll: false,
        indeterminate: false,
        uservalues: [],
      });

      async function getUser() {
        const userroles = await getUserRole(userid.value);
        const { allrole, uservalus } = userroles;
        // const uservalues = toRef(state, 'uservalues');
        // const indeterminate = toRef(state, 'indeterminate');

        state.uservalues = uservalus;
        state.indeterminate = state.uservalues.length > 0;
        const ret: Options[] = [];
        allrole.map((item) => {
          ret.push({
            label: item.roleName,
            value: item.id,
          });
        });
        options.value = ret;
      }

      watch(
        () => userid.value,
        (newvalue) => {
          console.log('userid', newvalue);
          getUser();
        }
      );

      const [register, { closeModal, changeLoading }] = useModalInner((data) => {
        console.log('data', data);
        userid.value = data.id;
        // getUrser();
      });

      const { createMessage } = useMessage();
      function submitRole() {
        console.log('userid', userid.value);
        console.log('userid', state.uservalues);
        changeLoading(true);
        setTimeout(() => {
          changeLoading(false);
          closeModal();
        }, 2000);
      }

      function onChange(uservalues) {
        // const checkAll = toRef(state, 'checkAll');
        // const indeterminate = toRef(state, 'indeterminate');
        state.indeterminate = !!uservalues.length && uservalues.length < options.value.length;
        state.checkAll = uservalues.length === options.value.length;
        state.uservalues = uservalues;
      }

      function onCheckAllChange(e) {
        console.log('e', e.target);
        const optionarr: string[] = options.value.map((op) => {
          return op.value;
        });
        state.checkAll = e.target.checked;
        state.uservalues = e.target.checked ? optionarr : [];
        state.indeterminate = false;
        //       Object.assign(this, {
        //     checkedList: e.target.checked ? plainOptions : [],
        //     indeterminate: false,
        //   });
      }

      return {
        register,
        submitRole,
        onChange,
        options,
        ...toRefs(state),
        onCheckAllChange,
      };
    },
  });
</script>
