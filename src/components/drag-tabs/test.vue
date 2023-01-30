<template>
    <dragTab class="drag-tab" />    
</template>

<script>
import dragTab from './dragTab.vue';
export default {
  name: 'drag-tab-test',
  components: {
    dragTab,
  },
  data() {
    return {
      value1: '',
    }
  }
};
</script>

<style lang="less" scoped>
.drag-tab {
  height: 100%;
}
</style>
