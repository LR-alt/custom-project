<template>
  <div class="selected-labels">
    <div class="selected-labels__head">已选{{ title || mapAreaNames[panelLevels - 1] }}</div>
    <div class="selected-labels__body">
      <el-tag
        v-for="tag in tags"
        :key="tag.label"
        type="info"
        size="small"
        closable
        @close="handleClose(tag)"
        >{{ tag.label }}</el-tag
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'selected-labels',
  props: {
    tags: {
      type: Array,
      default: () => ([]),
    },
    title: {
      type: String,
      default: '',
    },
    panelLevels: {
      type: Number,
      default: 3,
    },
  },
  data() {
    return {
      mapAreaNames: ['省份', '地市', '区县'],
    };
  },
  methods: {
    handleClose(tag) {
      this.$emit('delTags', tag);
    },
  },
};
</script>
<style lang="less" scoped>
.selected-labels {
  display: inline-block;
  width: 100%;
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
