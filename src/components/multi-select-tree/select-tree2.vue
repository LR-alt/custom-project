<!-- 多选树组件 -->
<template>
  <div class="select-tree">
    <el-select v-model="selectList" multiple clearable collapse-tags size="small" placeholder="请选择" @clear="reset">
      <el-option value="" style="display: none;" />
      <el-tree :data="options" :props="defaultProps" default-expand-all node-key="label" show-checkbox
        @check="handleChecked" ref="tree" />
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
      isManualSelect: false,
    };
  },
  computed: {
    refTree() {
      return this.$refs.tree;
    }
  },
  watch: {
    value: {
      handler(newVal) {
        this.selectList = newVal;
      },
    }
  },
  mounted() {
    // 外界传值
    this.$watch('selectList', (newList) => {
      this.$emit('change', newList);
      if (this.isManualSelect) {
        this.isManualSelect = false;
        return;
      }
      this.$nextTick(() => {
        if (Array.isArray(newList)) {
          this.refTree?.setCheckedKeys(newList);
        }
      })
    }, { immediate: true })
  },
  methods: {
    reset() {
      this.$emit('change', []);
    },
    handleChecked(curObj) {
      const curCheckedKeys = this.flatNodeKeys([curObj]);
      const checkedKeys = this.refTree.getCheckedKeys(true);
      // 选中状态
      if (checkedKeys.length > this.selectList.length) {
        if (curCheckedKeys.includes('全部')) {
          return this.selectList = ['全部'];
        } else if (checkedKeys.includes('全部')) {
          return this.selectList = checkedKeys.filter(key => key !== '全部');
        }
      }  
      // 取消状态
      this.selectList = checkedKeys;
      this.isManualSelect = true;
    },
    flatNodeKeys(tarData) {
      const res = [];
      for (const node of tarData) {
        if (node.children) {
          res.push(...this.flatNodeKeys(node.children));
        } else {
          res.push(node.label);
        }
      }
      return res;
    }
  },
};
</script>

<style lang="less" scoped>
.select-tree {}
</style>
