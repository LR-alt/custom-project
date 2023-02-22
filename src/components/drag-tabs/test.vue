<template>
  <dragTab />
</template>

<script>
import dragTab from './dragTab.vue';
// import editTag from './selectAreaLast.vue';
export default {
  name: 'drag-tab-test',
  components: {
    dragTab,
    // editTag
  },
  data() {
    return {
      value1: 'c测试开发流程es',
    };
  },
  methods: {
    handleClk(item) {
      console.log(item);
    },
  },
};
</script>

<style lang="less" scoped>
.drag-tab {
  height: 100%;
}
</style>
