<template>
  <div class="select-area">
    <div class="select-area__head">请选择</div>
    <div class="select-area__body">
      <div class="select-area__search">
        <el-input v-model="searchVal" :placeholder="`搜索${selectVal}`">
          <el-select v-if="selectOps.length" v-model="selectVal" slot="prepend" placeholder="请选择">
            <el-option v-for="opt in selectOps" :key="opt" :value="opt" />
          </el-select>
        </el-input>
      </div>
      <div class="select-area__list">
        <ul class="list" v-if="firstLevelOps.length">
          <li
            v-for="item in firstLevelOps"
            :class="{ isActive: curFirstLevelItem.label === item.label }"
            :key="`${item.label}1`"
            @click="handleFirstLevel(item)"
          >
            <div>
              <el-checkbox
                v-if="'checked' in item"
                v-model="item.checked"
                :indeterminate="item.indeterminate"
                @change="() => handleFirstChange(item)"
              />
              {{ item.label }}
            </div>
            <span>{{ '>' }}</span>
          </li>
        </ul>
        <ul class="list" v-if="secondLevelOps.length">
          <li
            v-for="item in secondLevelOps"
            :class="{ isActive: curSecondLevelItem.label === item.label }"
            :key="`${item.label}2`"
            @click="handleSecondLevel(item)"
            @change="() => handleSecondChange(item)"
          >
            <span>
              <el-checkbox
                v-if="'checked' in item"
                v-model="item.checked"
                :indeterminate="item.indeterminate"
              />
              {{ item.label }}
            </span>
            <span>{{ '>' }}</span>
          </li>
        </ul>
        <ul class="list" v-if="thirdLevelOps.length">
          <li
            v-for="item in showThirdLevelOps"
            :class="{ isActive: curThirdLevelItem.label === item.label }"
            :key="`${item.label}3`"
            @click="handleThirdLevel(item)"
            @change="() => handleThirdChange(item)"
          >
            <div style="padding-left: 12px">
              <el-checkbox v-if="'checked' in item" v-model="item.checked" />
              {{ item.label }}
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { tree } from './static';
export default {
  name: 'select-area',
  props: {
    data: {
      type: Array,
      default: () => [],
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
      curCheckedItem: [],
      firstLevelOps: [],
      curFirstLevelItem: '',
      secondLevelOps: [],
      curSecondLevelItem: '',
      thirdLevelOps: [],
      oldThirdLevelOps: null,
      curThirdLevelItem: '',
    };
  },
  computed: {
    curCheckedItems() {
      if (this.thirdLevelOps.some((item) => item.checked)) {
        return this.thirdLevelOps.filter((item) => item.checked);
      }
      return (this.oldThirdLevelOps || []).filter((item) => item.checked);
    },
    showThirdLevelOps() {
      return this.thirdLevelOps.filter(item => item.label.includes(this.searchVal))
    }
  },
  watch: {
    treeData: {
      handler(newTree) {
        if (newTree.length) {
          this.firstLevelOps = newTree;
          this.curFirstLevelItem = this.firstLevelOps[0];
          this.secondLevelOps = this.curFirstLevelItem.children;
          this.curSecondLevelItem = this.secondLevelOps[0];
          this.thirdLevelOps = this.curSecondLevelItem.children;
        }
      },
      immediate: true,
    },
    data: {
      handler(newVal) {
        if (Array.isArray(newVal) && newVal.length) {
          const [first, second] = newVal[0].split('/');
          const preAddr = `${first}/${second}/`;
          this.curCheckedItems.forEach((item) => {
            if (!newVal.includes(`${preAddr}${item.label}`)) {
              item.checked = false;
            }
          });
        } else if (!newVal.length) {
          this.curCheckedItems.forEach((item) => {
            item.checked = false;
          });
        }
      },
      immediate: true,
    },
  },
  methods: {
    handleFirstLevel(item) {
      this.curFirstLevelItem = item;
      this.secondLevelOps = item.children;
      this.curSecondLevelItem = this.secondLevelOps[0];

      if (this.thirdLevelOps.some((item) => item.checked)) {
        this.oldThirdLevelOps = this.thirdLevelOps;
      }
      this.thirdLevelOps = this.curSecondLevelItem.children;
    },
    handleSecondLevel(item) {
      this.curSecondLevelItem = item;
      if (this.thirdLevelOps.some((item) => item.checked)) {
        this.oldThirdLevelOps = this.thirdLevelOps;
      }
      this.thirdLevelOps = item.children;
    },
    handleThirdLevel(item) {
      this.curThirdLevelItem = item;
    },
    handleThirdChange(item) {
      if (this.oldThirdLevelOps && !this.oldThirdLevelOps.includes(item)) {
        this.oldThirdLevelOps.forEach((item) => {
          item.checked = false;
        });
        this.oldThirdLevelOps = null;
      }
      const curCheckedOps = this.thirdLevelOps
        .filter((item) => item.checked)
        .map(
          (item) => `${this.curFirstLevelItem.label}/${this.curSecondLevelItem.label}/${item.label}`
        );
      this.$emit('update:data', curCheckedOps);
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
        & > li {
          justify-content: start;
        }
      }
      & > li {
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
