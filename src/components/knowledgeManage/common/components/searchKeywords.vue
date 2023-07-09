<template>
  <div class="search-keywords">
    <span class="title">全局关键字搜索：</span>
    <el-input
      v-model="keywords"
      class="keywords"
      placeholder="请输入关键字"
      size="small"
    >
      <el-button slot="append" type="primary" size="small" @click="search">搜索</el-button>
    </el-input>
  </div>
</template>
<script>
export default {
  name: "search-keywords",
  data() {
    return {
        keywords: ''
    };
  },
  methods: {
    search() {
      this.$emit('searchKeywords', this.keywords);
    }
  }
};
</script>
<style lang="less" scoped>
.search-keywords {
    display: flex;
    width: 60%;
    height: 100%;
    align-items: center;
    title {
        flex-basis: 150px;
        font-weight: bold;
    }
    .keywords {
        flex: 1;
    }
}
</style>