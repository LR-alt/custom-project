<template>
  <div class="select-tree">
    <!-- <selectTree v-model="checkList" /> -->
    <customCategory v-model="selectList" />
  </div>
</template>

<script>
// import selectTree from './select-Tree.vue';
// import customCategory from './temp.vue';
import customCategory from './customCategory.vue';
export default {
  name: 'test-comp',
  components: {
    // selectTree,
    customCategory,
  },
  data() {
    return {
      selectList: [
        'type one',
        'type two',
        'type three',
        'type four',
        'type five',
        'type six',
        'type seven',
        'type eight',
      ],
    };
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="less" scoped>
.select-tree {
}
</style>
