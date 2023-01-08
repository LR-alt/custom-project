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
    };
  },
  computed: {

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
      this.$nextTick(() => {
        if (Array.isArray(newList)) {
          this.$refs.tree?.setCheckedKeys(newList);
        }
      })
    }, { immediate: true })
  },
  methods: {
    reset() {
      this.$emit('change', []);
    },
    handleChecked(curObj, checkedObj) {
      const flatNodes = this.flatNodeData(checkedObj.checkedNodes);
      console.log(flatNodes)
      this.selectList = flatNodes;
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
.select-tree {}
</style>
