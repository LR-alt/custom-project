<!-- 多选树组件 -->
<template>
  <div class="select-tree">
    <el-select
      v-model="selectList"
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
    event: 'change',
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
      isNeedSetNodes: true, // 是否需要重新设置节点树
    };
  },
  computed: {
    refTree() {
      return this.$refs.tree;
    },
  },
  watch: {
    value: {
      handler(newVal) {
        this.selectList = newVal;
      },
    },
  },
  mounted() {
    this.$watch(
      'selectList',
      (newList) => {
        this.$emit('change', newList);
        if (!this.isNeedSetNodes) {
          this.isNeedSetNodes = true;
          return;
        }
        this.$nextTick(() => {
          this.refTree?.setCheckedKeys(newList);
        });
      },
      { immediate: true }
    );
  },
  methods: {
    reset() {
      this.$emit('change', []);
    },
    handleChecked(curObj) {
      const curCheckedKey = curObj.label;
      const checkedKeys = this.refTree.getCheckedKeys(true);
      
      if (checkedKeys.length > this.selectList.length) {
        if (curCheckedKey === '全部') {
          return (this.selectList = ['全部']);
        } else if (checkedKeys.includes('全部')) {
          return (this.selectList = checkedKeys.filter((key) => key !== '全部'));
        }
      }
      this.selectList = checkedKeys;
      this.isNeedSetNodes = false;
    },
  },
};
</script>

<style lang="less" scoped>
.select-tree {
}
</style>
