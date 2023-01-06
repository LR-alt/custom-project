<!--
待定：将使用jsx去封装
-->
<template>
  <div class="text-overflow">
    <el-input-number
      v-model="num"
      label="描述文字"
    />
  </div>
</template>

<script>
export default {
  name: 'TestComp',

  data() {
    return {
      num: ''
    };
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped></style>
