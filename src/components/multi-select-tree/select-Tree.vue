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
      <el-option class="select-tree__option" value="empty">
        <el-tree
          :data="options"
          :props="defaultProps"
          default-expand-all
          node-key="label"
          show-checkbox
          @check="handleChecked"
          ref="tree"
        />
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'select-tree',
  props: {
    checkList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      options: [
        // { id: '全部', label: '全部' },
        {
          id: '1',
          label: '版纳',
          children: [
            { id: '1.1', label: '景洪分公司' },
            { id: '1.2', label: '勐海分公司' },
            { id: '1.3', label: '勐腊分公司' },
          ],
        },
        {
          id: '2',
          label: '保山',
          children: [
            { id: '2.1', label: '昌宁分公司' },
            { id: '2.2', label: '龙陵分公司' },
            { id: '2.3', label: '隆阳分公司' },
          ],
        },
      ],
      defaultProps: {
        children: 'children',
        label: 'label',
      },
      defKeys: ['景洪分公司', '隆阳分公司'],
      selectList: [],
    };
  },
  watch: {
   /*  checkList(newData) {
      this.selectList = newData;
    }, */
    checkList: {
      handler(newList) {
        if (newList && newList.length) {
          this.selectList = newList;
          console.log('checkList is executing!!!');
          // this.defKeys = ['']
        }
      },
      immediate: true,
    },
    selectList(newVal) {
      this.$emit('update:checkList', newVal);
    },
  },
  mounted() {
    this.$nextTick(() => {
      const all = this.options.find((item) => item.label === '全部');
      this.$refs.tree.setCheckedNodes(all ? [all] : this.options);
    });
  },
  methods: {
    reset() {
      this.$refs.tree.setCheckedNodes([]);
    },
    handleChecked(curObj, checkedObj) {
      console.log(curObj);
      console.log(checkedObj);
      const { checkedNodes } = checkedObj;
      const flatNodes = this.flatNodeData(checkedNodes);
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
.select-tree {
  &__option {
    padding: 0;
    padding-right: 0 !important;
    height: auto;
    width: auto;
  }
}
</style>
