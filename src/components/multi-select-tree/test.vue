<template>
  <div class="select-tree">
    <!-- <selectTree v-model="checkList" /> -->
    <el-button type="primary" @click="changeOption">更改Options</el-button>
    <selectTree1 v-model="checkList" :options="options" />
  </div>
</template>

<script>
// import selectTree from './select-Tree.vue';
// import selectTree1 from './select-tree1.vue';
import selectTree1 from './select-tree2.vue';
export default {
  name: 'test-comp',
  components: {
    // selectTree,
    selectTree1
  },
  data() {
    return {
      checkList: ['景洪分公司', '勐海分公司', '勐腊分公司', '昌宁分公司', '龙陵分公司',],
      options: [
        { id: '全部', label: '全部' },
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
    };
  },
  mounted() {
    setTimeout(() => {
      // this.options = this.options.filter(option => option.label === '保山');
      this.checkList = ['勐腊分公司', '龙陵分公司']
    }, 2000);
  },
  methods: {
    changeOption() {
      this.checkList = ['龙陵分公司']
    }
  },
};
</script>

<style lang="less" scoped>
.select-tree {
}
</style>
