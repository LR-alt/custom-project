<!-- 多选树组件 -->
<template>
  <el-popover
    v-model="visible"
    class="custom-category"
    :append-to-body="false"
    :offset="0"
    placement="top"
    @hide="hidePopover"
  >
    <!-- 面板 -->
    <div class="custom-category__wrap">
      <!-- 头部标题 -->
      <div class="custom-category__wrap--head">
        <span class="title">添加自定义类别</span>
        <span class="close" @click="closeSelectPane">×</span>
      </div>
      <!-- 主体 -->
      <div class="custom-category__wrap--body">
        <!-- 添加栏 -->
        <div class="add">
          <el-input
            v-model="addValue"
            class="add__input"
            size="mini"
            @@keyup.enter.native="addCategory"
            clearable
          />
          <el-button type="primary" class="add__btn" size="mini" @click="addCategory"
            >添加</el-button
          >
        </div>
        <!-- 下拉列表 -->
        <ul :class="`list ${mapStatus[isExpand].className}`">
          <li v-for="item in checkList" class="item" :key="`${item}${new Date().getTime()}`">
            <span class="text">{{ item }}</span>
            <span class="del" @click="delCategory(item)">×</span>
          </li>
        </ul>
      </div>
      <!-- 展开/收起 -->
      <div v-if="checkList.length > 4" class="custom-category__wrap--footer">
        <span class="operate" @click="isExpand = !isExpand">
          {{ mapStatus[isExpand].text }}
          <i :class="mapStatus[isExpand].icon"></i>
        </span>
      </div>
    </div>
    <!-- 引用 -->
    <div class="custom-category__refer" slot="reference">
      <el-select
        v-model="checkList"
        class="custom-category__refer--select"
        ref="selectRef"
        size="small"
        multiple
        collapse-tags
        @visible-change="visibleType"
      />
      <el-tooltip class="item" effect="dark" :content="checkList.join('，')" placement="top">
        <el-tag class="custom-category__refer--add" size="small">+添加</el-tag>
      </el-tooltip>
    </div>
  </el-popover>
</template>

<script>
export default {
  name: 'custom-category',
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
  data() {
    return {
      checkList: [],
      addValue: '',
      visible: false,
      isExpand: false,
      mapStatus: {
        false: {
          text: '展开',
          className: 'is-fold',
          icon: 'el-icon-arrow-down',
        },
        true: {
          text: '收起',
          className: '',
          icon: 'el-icon-arrow-up',
        },
      },
    };
  },
  watch: {
    value: {
      handler(newVal) {
        if (Array.isArray(newVal)) {
          this.checkList = newVal;
        }
      },
      immediate: true,
    },
    checkList: {
      handler(newList) {
        this.$emit('change', newList);
      },
    },
  },
  methods: {
    closeSelectPane() {
      this.visible = false;
    },
    hidePopover() {
      console.log('hide popover');
    },
    visibleType() {
      this.$refs.selectRef.blur();
    },
    addCategory() {
      const addVal = this.addValue.trim();
      if (!addVal) {
        this.$message.warning('该类别为空，请重新添加');
        return;
      }
      if (this.checkList.includes(addVal)) {
        this.$message.warning('该类别已存在，请勿重复添加');
        return;
      }
      this.checkList.unshift(this.addValue);
      this.addValue = '';
    },
    delCategory(delItem) {
      this.checkList = this.checkList.filter((item) => item !== delItem);
    },
  },
};
</script>

<style lang="less" scoped>
.custom-category {
  position: relative;
  display: inline-block;
   min-width: 190px;
  /deep/ .el-popover {
    padding: 0;
    width: 100%;
  }
  &__wrap--head {
    display: flex;
    padding: 0 10px;
    height: 42px;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;

    .title {
      font-weight: bold;
    }

    .close {
      font-size: 22px;
      font-weight: 200;
      color: #888c93;

      &:hover {
        color: #454545;
        cursor: pointer;
      }
    }
  }

  &__wrap--body {
    padding: 0 10px;

    .add {
      position: relative;
      margin: 15px 0 8px 0;
      width: 100%;
      box-sizing: border-box;

      &__input {
        width: calc(100% - 54px);
        height: 24px;

        /deep/ .el-input__inner {
          padding: 0 10px;
          height: 24px;
          line-height: 24px;
        }
      }

      &__btn {
        position: absolute;
        padding: 5.5px 12px;
        right: 0;
      }
    }

    .list {
      list-style: none;
      padding: 0;
      transition: all 2s;

      .item {
        display: flex;
        margin-bottom: 8px;
        padding: 3px 6px;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        background-color: #f5f5f5;

        &:hover {
          background-color: #edf3ff;
          cursor: pointer;
        }

        .del {
          font-size: 18px;
          font-weight: 200;
          color: #888c93;

          &:hover {
            color: #000;
          }
        }
      }

      &.is-fold {
        height: 148px;
        overflow: hidden;
      }
    }
  }

  &__wrap--footer {
    height: 30px;
    text-align: center;
    font-size: 12px;
    color: #4c85fc;

    .operate {
      &:hover {
        cursor: pointer;
      }
    }
  }
  &__refer--add {
    position: absolute;
    top: 50%;
    right: 4px;
    transform: translateY(-50%);

    &:hover {
      cursor: pointer;
    }
  }
  &__refer--select {
    width: 100%;
  }
}
</style>
