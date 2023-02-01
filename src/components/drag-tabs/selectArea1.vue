<template>
  <div class="select-area">
    <div class="select-area__head">请选择</div>
    <div class="select-area__body">
      <div class="select-area__search">
        <el-input v-model="searchVal" :placeholder="`搜索${selectVal}`">
          <el-select v-if="selectOps.length" v-model="selectVal" slot="prepend" placeholder="请选择">
            <el-option v-for="opt in selectOps" :key="opt.label" :value="opt.value" :label="opt.label" />
          </el-select>
        </el-input>
      </div>
      <div class="select-area__list">
        <template v-for="(list, index) in listData">
          <ul v-if="list.length" class="list" :key="index">
            <template v-if="index === 0 || curItemArr[index - 1]">
              <li v-for="(item, inx) in filterList(list, index)"
                :class="{ isActive: curItemArr[index] && curItemArr[index].label === item.label }"
                :key="`${item.label}${inx}`" @click="handleClkItem(item, index)">
                <template v-if="index < listData.length - 1">
                  <span>{{ item.label }}</span>
                  <span>{{ '>' }}</span>
                </template>
                <div v-else style="padding-left: 12px">
                  <el-checkbox v-model="item.checked" @change="() => handleItemChange(item, index)" />
                  {{ item.label }}
                </div>
              </li>
            </template>
          </ul>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { tree } from './static';

export default {
  name: 'select-area',
  props: {
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
      default: () => tree,
    },
  },
  components: {},
  data() {
    return {
      searchVal: '',
      selectVal: '',
      listData: [],
      curItemArr: [],
    };
  },

  mounted() {
    this.initCheckData();
  },
  watch: {},
  methods: {
    initCheckData() {
      let { prefix, list } = this.checkedData;
      const tagArr = prefix.split('/');

      this.flatTree(this.treeData, tagArr);

      const checkedList = list.map((item) => item.label).filter(Boolean);
      const lastList = this.listData[this.listData.length - 1];
      lastList.forEach((item) => {
        if (checkedList.includes(item.label)) {
          item.checked = true;
        }
      });
    },
    flatTree(newTree, tagArr) {
      let curData = newTree;
      let i = 0;
      while (curData.length) {
        this.listData.push(curData);
        const curItem = curData.find((item) => item.label === tagArr[i])
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
        this.curItemArr = [item]
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
  },
};
</script>
<style lang="less" scoped>
.select-area {
  display: inline-block;
  width: 420px;
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
      width: 100px;
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
      list-style: none;
      overflow: auto;
      border-right: 1px solid #ccc;

      &:last-of-type {
        border-right: none;

        &>li {
          justify-content: start;
        }
      }

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
  }
}
</style>
