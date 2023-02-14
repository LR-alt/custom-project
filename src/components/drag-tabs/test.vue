
<template>
    <!-- <dragTab class="drag-tab" />     -->
    <div style="width: 300px;height:500px;border:1px solid #ccc; margin: 100px auto; padding: 20px;">
      <editTag v-model="value1" isActive @clickTag="handleClk({ test: 434 })" />
    </div>
</template>

<script>
// import dragTab from './dragTab.vue';
import editTag from './selectAreaLast.vue';
export default {
  name: 'drag-tab-test',
  components: {
    // dragTab,
    editTag
  },
  data() {
    return {
      value1: 'c测试开发流程es',
    }
  },
  methods: {
    handleClk(item) {
      console.log(item);
    }
  }
};
</script>

<style lang="less" scoped>
.drag-tab {
  height: 100%;
}
</style>
