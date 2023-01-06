<!-- 多选树组件 -->
<template>
  <div class="select-tree">
    <el-select
      v-model="checkList"
      multiple
      clearable
      collapse-tags
      size="small"
      placeholder="请选择"
      @clear="reset"
    >
      <el-option value="" style="display: none" />
      <el-tree
        :data="options"
        :props="defaultProps"
        default-expand-all
        node-key="label"
        show-checkbox
        @check="handleChecked"
        ref="tree"
      />
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'select-tree',
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    value: {
      type: Array,
      default: () => [],
      required: true,
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'label',
      },
      selectList: [],
      isManualEmit: false,
    };
  },
  computed: {
    checkList: {
      get() {
        if (this.isManualEmit) {
          return this.selectList;
        }
        if (Array.isArray(this.value) && this.value.length) {
          return this.value;
        }
        const all = this.options.find((item) => item.label === '全部');
        return all ? [all.label] : this.flatNodeData(this.options);
      },
      set(val) {
        console.log('executing set');
        this.$emit('input', val);
      },
    },
  },
  watch: {
    value: {
      handler() {
        this.isManualEmit = false;
      },
      deep: true,
    },
  },
  mounted() {
    this.$watch(
      'checkList',
      (newList) => {
        this.$nextTick(() => {
          if (!this.isManualEmit) {
            this.$refs.tree?.setCheckedKeys(newList);
          }
        });
      },
      { immediate: true }
    );
  },
  methods: {
    reset() {
      this.$emit('change', []);
    },
    handleChecked(curObj, checkedObj) {
      console.log(curObj);
      const flatNodes = this.flatNodeData(checkedObj.checkedNodes);
      /* if (curObj.label === '全部') {
        this.selectList = ['全部'];
      } else {
        this.selectList = flatNodes.filter((node) => node !== '全部');
      } */
      this.selectList = flatNodes;
      this.checkList = this.selectList;
      this.isManualEmit = true;
    },
    flatNodeData(tarData) {
      const res = [];
      for (const item of tarData) {
        if (!item.children) {
          res.push(item.label);
        }
      }
      return res;
    },
  },
};
</script>

<style lang="less" scoped>
.select-tree {
}
</style>
