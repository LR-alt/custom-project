<template>
  <div class="select-area">
    <div class="select-area__head">请选择{{ title || selectAreaType }}</div>
    <div class="select-area__body">
      <el-form class="select-area__search">
        <el-input v-model="searchVal" class="input-with-select" :placeholder="`搜索${selectLabel || selectAreaType}`"
          @submit.native.prevent>
          <el-select v-if="selectOps.length" v-model="selectVal" @change="handleSelect" slot="prepend"
            placeholder="请选择">
            <el-option v-for="opt in selectOps" :key="opt.label" :value="opt.value" :label="opt.label" />
          </el-select>
        </el-input>
      </el-form>
      <div class="select-area__list">
        <template v-for="(list, index) in lists">
          <!-- 单项 -->
          <ul v-if="index !== panelLevels - 1" class="list" :key="index">
            <li v-for="(item, inx) in filterList(list, index)"
              :class="{ isActive: curItemArr[index] && curItemArr[index].label === item.label }"
              :key="`${item.label}${inx}`" @click="handleClkItem(item, index)">
              <span>{{ item.label }}</span>
              <i class="el-icon-arrow-right"></i>
            </li>
          </ul>
          <!-- 复选框 -->
          <el-checkbox-group v-else v-model="curCheckedList" class="checklist" :key="`${index}-checkbox`">
            <el-checkbox v-for="(item, inx) in filterList(list, index)"
              :class="{ isActive: curItemArr[index] && curItemArr[index].label === item.label }" :label="item.value"
              :key="`${item.label}${inx}`" @change="(status) => handleChangeItem(item, index, status)">
              <span>{{ item.label }}</span>
            </el-checkbox>
          </el-checkbox-group>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'select-area',
  props: {
    title: {
      type: String,
      default: '',
    },
    selectOps: {
      type: Array,
      default: () => [],
    },
    treeData: {
      type: Array,
      default: () => [],
    },
    panelLevels: {
      type: Number,
      default: 3,
    },
  },
  components: {},
  data() {
    return {
      searchVal: '',
      selectVal: 1,
      lists: [],
      curItemArr: [],
      curPrefixes: '',
      checkedData: {},
      curCheckedList: [],
      mapAreaNames: ['省份', '地市', '区县'],
    };
  },
  computed: {
    selectAreaType() {
      return this.mapAreaNames[this.panelLevels - 1];
    },
    selectLabel() {
      const curSelectItem =
        this.selectOps.length && this.selectOps.find((item) => item.value === this.selectVal);
      if (!curSelectItem) {
        return '';
      }
      return curSelectItem.label;
    },
    isAllowSelect() {
      return Boolean(this.selectOps.length);
    },
  },
  mounted() {
    this.initCheckData();
  },
  watch: {
    selectVal: {
      handler() {
        // this.flatTree(this.treeData, [], Number(value));
      },
    },
  },
  methods: {
    initCheckData() {

      this.flatTree(
        this.treeData,
      );
    },
    // 根据数据的层级，渲染
    flatTree(tree) {
      this.lists.push(tree);
    },
    handleClkItem(item, index) {
      // 单选
      if (index < this.panelLevels - 1) {
        this.lists = [...this.lists.slice(0, index + 1), item.children];
      } else { // 多选
      }
      this.$set(this.curItemArr, index, item);
      const curPrefix = this.curItemArr.slice(0, index + 1).map(item => item.label).join('/');

      if (!this.checkedData[curPrefix]) {
        this.checkedData[curPrefix] = [];
      }
      this.curCheckedList = this.checkedData[curPrefix];
    },
    handleChangeItem(item, index, status) {
      this.$set(this.curItemArr, index, item);
      // debugger;
      const curPrefix = this.curItemArr.slice(0, index || 1).map(item => item.label).join('/');
      this.checkedData[curPrefix] = this.curCheckedList;
      /* if (!this.checkedData[curPrefix]) {
        this.checkedData[curPrefix] = this.curCheckedList;
      } */
      /* if (this.curPrefixes && this.curPrefixes !== curPrefix) {
        this.checkedData[this.curPrefixes] = this.curCheckedList;
      } */
    },

    filterList(list, index) {
      if (index === this.lists.length - 1) {
        return list.filter((item) => item.label.includes(this.searchVal));
      }
      return list;
    },
    handleSelect(value) {
      this.$emit('selectOption', value, this.selectLabel);
    },
  },
};
</script>
<style lang="less" scoped>
.select-area {
  margin-right: 8px;
  display: inline-block;
  // width: 100%;
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
    height: 32px;
    padding: 8px 8px 0;

    .el-select {
      width: 80px;
    }

    /deep/ .el-input__inner {
      // width: 100%;
    }

    /deep/ .el-input-group__prepend {
      background-color: #fff;
    }
  }

  &__list {
    display: flex;
    height: calc(100% - 48px);
    padding: 8px 4px 0 4px;

    .list {
      margin: 0;
      padding-left: 0;
      height: 192px;
      flex: 1;
      min-width: 120px;
      list-style: none;
      overflow: auto;
      border-right: 1px solid #ccc;

      &>li {
        margin: 0 4px;
        display: flex;
        align-items: center;
        justify-content: space-around;

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

    .checklist {
      display: flex;
      flex-direction: column;
      margin: 0;
      padding-left: 0;
      height: 192px;
      flex: 1;
      min-width: 120px;

      &>.el-checkbox {
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
