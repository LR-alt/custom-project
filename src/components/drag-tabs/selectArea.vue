<template>
  <div class="select-area">
    <div class="select-area__head">请选择{{ title || selectAreaType }}</div>
    <div class="select-area__body">
      <div class="select-area__search">
        <el-input v-model="searchVal" class="input-with-select" :placeholder="`搜索${selectLabel || selectAreaType}`">
          <el-select v-if="selectOps.length" v-model="selectVal" @change="handleSelect" slot="prepend"
            placeholder="请选择">
            <el-option v-for="opt in selectOps" :key="opt.label" :value="opt.value" :label="opt.label" />
          </el-select>
        </el-input>
      </div>
      <div class="select-area__list">
        <template v-for="(list, index) in listData">
          <ul v-if="index !== listData.length - 1" class="list" :key="index">
            <template v-if="index === 0 || curItemArr[index - 1]">
              <li v-for="(item, inx) in filterList(list, index)"
                :class="{ isActive: curItemArr[index] && curItemArr[index].label === item.label }"
                :key="`${item.label}${inx}`" @click="handleClkItem(item, index)">
                <span>{{ item.label }}</span>
                <span>{{ '>' }}</span>
              </li>
            </template>
          </ul>
          <el-checkbox-group v-else v-model="checkLists[index]" class="checklist" :key="`${index}-checkbox`">
            <template v-if="index === 0 || curItemArr[index - 1]">
              <el-checkbox v-for="(item, inx) in filterList(list, index)"
                :class="{ isActive: curItemArr[index] && curItemArr[index].label === item.label }" :label="item.label"
                :key="`${item.label}${inx}`" @click="handleClkItem(item, index)">
                <span>{{ item.label }}</span>
              </el-checkbox>
            </template>
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
    checkedData: {
      type: Object,
      default: () => ({
        prefix: '',
        list: [
          { label: '', checked: true },
          { label: '', checked: true },
        ],
      }),
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
      listData: [],
      checkLists: [],
      curItemArr: [],
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
      handler(value) {
        this.flatTree(this.treeData, [], Number(value));
      },
    },
  },
  methods: {
    initCheckData() {
      let { prefix, list } = this.checkedData;
      const tagArr = prefix.split('/');

      this.flatTree(
        this.treeData,
        tagArr,
        this.isAllowSelect ? this.selectVal : this.panelLevels - 1
      );

      const checkedList = list.map((item) => item.label).filter(Boolean);
      const lastList = this.listData[this.listData.length - 1];
      lastList.forEach((item) => {
        if (checkedList.includes(item.label)) {
          item.checked = true;
        }
      });
    },
    flatTree(newTree, tagArr, len) {
      let curData = newTree;
      let i = 0;
      this.listData = [];
      this.curItemArr = [];
      this.checkLists = [];
      while (curData.length && i <= len) {
        this.listData.push(curData);
        this.checkLists.push([]);
        const curItem = curData.find((item) => item.label === tagArr[i]);
        const nextData = curItem || curData[0];
        if (curItem && curItem.children && curItem.children.length) {
          this.curItemArr.push(nextData);
        }
        curData = nextData.children || [];
        i++;
      }
    },
    updateNextLists(item, index) {
      if (!item.children) return;
      let curData = item.children;
      const maxInx = this.listData.length - 1;
      while (curData.length && index <= maxInx) {
        this.listData.splice(index, 1, curData);
        curData = curData[0].children || [];
        index++;
      }
    },
    handleClkItem(item, index) {
      if (index === 0) {
        this.curItemArr = [item];
      } else {
        this.$set(this.curItemArr, index, item);
      }
      this.updateNextLists(item, index + 1);
    },
    handleItemChange(item, index) {
      this.$set(this.curItemArr, index, item);
      const prefix = this.curItemArr
        .slice(0, this.curItemArr.length - 1)
        .map((item) => item.label)
        .join('/');
      // 更换了前置类型
      this.$emit(
        'updateList',
        prefix,
        this.listData[index].filter((item) => item.checked)
      );
    },
    filterList(list, index) {
      if (index === this.listData.length - 1) {
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
