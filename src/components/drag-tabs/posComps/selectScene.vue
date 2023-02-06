<template>
  <div class="select-scene">
    <div class="select-scene__head">请选择区域</div>
    <div class="select-scene__body">
      <el-form class="select-scene__search" size="mini" @submit.native.prevent>
        <el-input v-model="searchVal" class="input-with-select" :placeholder="`搜索`">
          <el-select v-model="selectVal" @change="handleSelect" slot="prepend" placeholder="请选择">
            <el-option
              v-for="opt in selectOps"
              :key="opt.label"
              :value="opt.value"
              :label="opt.label"
            />
          </el-select>
        </el-input>
      </el-form>
      <div class="select-scene__list">
        <el-checkbox-group v-model="checkedList" class="checklist">
          <el-checkbox
            v-for="(item, inx) in options"
            :label="item.label"
            :key="`${item.label}${inx}`"
            @change="() => handleChangeItem(item)"
          >
            <span>{{ item.label }}</span>
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'select-scene',
  props: {
    value: {
      type: Object,
      default: () => ({}),
      required: true,
    },
    checkedData: {
      type: Object,
      default: () => ({}),
    },
    selectOps: {
      type: Array,
      default: () => [],
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  model: {
    prop: 'value',
    event: 'change',
  },
  data() {
    return {
      searchVal: '',
      selectVal: '',
      // checkedList: [],
    };
  },
  watch: {
   /*  checkedData: {
      handler(newData) {
        if (!Object.keys(newData).length) return;
        this.checkedList = newData[this.selectVal || 'def'];
      },
      immediate: true,
    },
    checkedList: {
      handler() {
        this.checkedData[this.selectVal || 'def'] = this.checkedList;
      }
    } */
  },
  computed: {
    checkedList: {
      get() {
        console.log(this.value)
        return this.value[this.selectVal || 'def'];
      },
      set(val) {
        console.log(val)
        this.$emit('change', val);
      },
    },
  },
  created() {

  },
  methods: {
    handleClkItem(tag) {
      this.$emit('deleteTag', tag);
    },
    handleChangeItem(item) {
      this.$emit('sceneCheck', item);
    },
    handleSelect(value) {
      this.$emit('handleSelect', value);
    },
  },
};
</script>
<style lang="less" scoped>
.select-scene {
  display: inline-block;
  margin-right: 8px;
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
  }
  &__search {
    height: 40px;
    padding: 8px 8px 0;

    .el-select {
      width: 80px;
    }

    /deep/ .el-input-group__prepend {
      background-color: #fff;
    }
  }

  &__list {
    display: flex;
    height: calc(100% - 40px);
    padding: 8px 8px 0 8px;

    .checklist {
      margin: 0;
      padding-left: 0;
      display: flex;
      height: 192px;
      min-width: 120px;
      flex-direction: column;
      flex: 1;

      & > .el-checkbox {
        margin: 0 4px;
        display: flex;
        height: 32px;
        align-items: center;
        padding-left: 12px;

        &:hover {
          cursor: pointer;
          background-color: #f5f9ff;
        }

        &.isActive {
          background-color: #edf3ff;
        }
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
}
</style>
