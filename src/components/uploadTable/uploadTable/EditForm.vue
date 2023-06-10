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
    // add
    addPropState(addArr) {
      addArr.forEach(item => {
        const rowState = this.createRowState(item, this.editProps);
        this.propMap.set(item, rowState);
        this.refArr.push(rowState);
      })
      return this;
    },
    // del
    delPropState(delArr) {
      delArr.forEach(item => {
        const rowState = this.propMap.get(item);
        const index = this.refArr.findIndex(it => it === rowState);
        this.propMap.delete(item);
        this.refArr.splice(index, 1);
      })
      return this;
    },
    // mod
    modPropState(addArr, delArr) {
      addArr.forEach((item, index) => {
        const preItem = delArr[index];
        const preRowState = this.propMap.get(preItem);
        const curRowState = this.createRowState(item, this.editProps, preRowState);
        this.propMap.set(item, curRowState).delete(preItem);
      })
    },
    // 取bigTable差集
    getDiffSet(bigTable, smallTable) {
      return bigTable.filter(item => !smallTable.includes(item));
    },
    // set prop state    
    setPropState(newTable) {
      const { oldTable } = this;
      if ((!newTable.length && !oldTable.length) || !this.editProps.length) return;
      // 取差值
      const diffLen = newTable.length - oldTable.length;
      // add
      if (diffLen > 0) {
        this.addPropState(this.getDiffSet(newTable, oldTable));
      } else if (diffLen < 0) {
        this.delPropState(this.getDiffSet(oldTable, newTable));
      } else {
        this.modPropState(this.getDiffSet(newTable, oldTable), this.getDiffSet(oldTable, newTable));
      }
      // cache
      this.oldTable = [...newTable];
    }
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