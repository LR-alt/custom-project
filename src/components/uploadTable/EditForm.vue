<template>
  <div>
    <el-form :model="ruleForm" ref="validForm" size="mini">
      <slot></slot>
    </el-form>
  </div>
</template>

<script>
import { UsePropState } from "./util/common";
export default {
  name: 'EditForm',
  inheritAttrs: false,
  data() {
    return {
      refArr: [],
      oldTable: [],
    }
  },
  computed: {
    ruleForm({ tableData }) {
      return { ...tableData }
    },
    editProps({ requiredProps, optionalProps }) {
      return Array.from(new Set([...requiredProps, ...optionalProps]));
    }
  },
  // watch: {
  //   'tableData': {
  //     handler(newTable) {
  //       this.setPropState(newTable);
  //     },
  //     immediate: true,
  //   }
  // },
  created() {
    // 初始化
    const usePropState = new UsePropState(this.propMap, this.refArr, this.createRowState);
    // 监听
    this.$watch('tableData', (newTable) => {
      usePropState.setPropState(newTable, this.editProps)
    }, { immediate: true })
  },
  methods: {
   
  },
  props: {
    propMap: {
      type: Map,
      required: true
    },
    tableData: {
      type: Array,
      default: () => [],
    },
    requiredProps: {
      type: Array,
      default: () => [],
    },
    optionalProps: {
      type: Array,
      default: () => [],
    },
    createRowState: {
      type: Function,
      default: () => { },
    },
  },
}
</script>