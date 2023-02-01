<template>
  <div class="area-select">
    <div class="area-select__body">
      <el-tag
        v-for="tag in dynamicTags"
        :key="tag"
        type="info"
        size="small"
        closable
        @close="handleClose(tag)"
        >{{ tag }}</el-tag
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'area-select',
  props: {
    selectTags: {
      type: Array,
      default: () => ['省份', '城市', '区县'],
    },
  },
  components: {},
  data() {
    return {
    };
  },
  watch: {},
  methods: {
    handleClose(tag) {
      const otherTags = this.selectTags.filter(label => label !== tag);
      this.$emit('update:tags', otherTags);
    },
  },
};
</script>
<style lang="less" scoped>
.area-select {
  display: inline-block;
  width: 520px;
  height: 280px;
  background-color: #ffffff;
  border-radius: 2px;
  border: 1px solid #d9d9d9;
  &__head {
    height: 32px;
    background-color: #f6f7fa;
    padding-left: 14px;
  }
  &__body {
    // padding: 4px;
    height: calc(100% - 32px);
    overflow: auto;
    .el-tag {
      margin: 6px;
    }
    &::-webkit-scrollbar {
      width: 10px;
      height: 1px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
      background: #f6f7fa;
    }

    &::-webkit-scrollbar-track {
      /* 滚动条里面轨道 */
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      background: transparent;
    }
  }
}
</style>
