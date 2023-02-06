<template>
  <div class="select-area">
    <div class="select-area__head">请选择{{ title || selectAreaType }}</div>
    <div class="select-area__body">
      <el-form class="select-area__search" size="mini">
        <el-input
          v-model="searchVal"
          class="input-with-select"
          :placeholder="`搜索${selectLabel || selectAreaType}`"
          @submit.native.prevent
        >
          <el-select
            v-if="selectOps.length"
            v-model="selectVal"
            @change="handleSelect"
            slot="prepend"
            placeholder="请选择"
          >
            <el-option
              v-for="opt in selectOps"
              :key="opt.label"
              :value="opt.value"
              :label="opt.label"
            />
          </el-select>
        </el-input>
      </el-form>
      <div class="select-area__list">
        <template v-for="(list, index) in lists">
          <!-- 单项 -->
          <ul v-if="index !== levels" class="list" :key="index">
            <li
              v-for="(item, inx) in list"
              :class="{ isActive: curItemArr[index] && curItemArr[index].label === item.label }"
              :key="`${item.label}${inx}`"
              @click="handleClkItem(item, index)"
            >
              <span>{{ item.label }}</span>
              <i class="el-icon-arrow-right"></i>
            </li>
          </ul>
          <!-- 复选框 -->
          <el-checkbox-group
            v-else
            v-model="checkedList"
            class="checklist"
            :key="`${index}-checkbox`"
          >
            <el-checkbox
              v-for="(item, inx) in filterList(list)"
              :class="{ isActive: curItemArr[index] && curItemArr[index].label === item.label }"
              :label="formatLabel(item.value, index)"
              :key="`${item.label}${inx}`"
              @change="() => handleChangeItem(item, index)"
            >
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
    value: {
      type: Array,
      default: () => [],
      required: true,
    },
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
    tags: {
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
      selectVal: 1,
      curCheckedLabels: '',
      lists: [],
      curItemArr: [],
      mapCheckedList: {},
      mapAreaNames: ['省份', '地市', '区县'],
    };
  },
  computed: {
    levels() {
      return this.isAllowSelect ? this.selectVal : this.panelLevels - 1;
    },
    selectAreaType() {
      return this.mapAreaNames[this.levels];
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
    labelInx() {
      if (this.isAllowSelect) {
        return this.levels;
      }
      return this.levels ? this.levels - 1 : this.levels;
    },
    checkedList: {
      get() {
        return this.value;
      },
      set(val) {
        this.$nextTick(() => {
          this.$emit(
            'update:tags',
            val.map((value) => {
              return {
                value,
                label: this.mapCheckedList[value],
              };
            })
          );
        });
        this.$emit('change', val);
      },
    },
  },
  watch: {
    levels(newLevels) {
      this.lists = [this.treeData, [], []].slice(0, newLevels + 1);
      this.curItemArr.length = newLevels + 1;
    },
  },
  mounted() {
    this.lists = [this.treeData, [], []].slice(0, this.levels + 1);
  },
  methods: {
    handleClkItem(item, index) {
      this.lists = [...this.lists.slice(0, index + 1), item.children];
      this.$set(this.lists, index + 1, item.children);
      if (index === 0 && this.levels === 2) {
        this.$set(this.lists, index + 2, []);
      }
      this.$set(this.curItemArr, index, item);
    },
    handleChangeItem(item, index) {
      this.$set(this.curItemArr, index, item);
      const { labels, values } = this.getCurItemData(this.curItemArr);
      this.mapCheckedList[values.join('/')] = labels.join('');
      // 清空之前的项
      const curPrefix = labels.slice(0, this.labelInx).join('/');
      if (this.curCheckedLabels && this.curCheckedLabels !== curPrefix) {
        this.checkedList = [values.join('/')];
      }
      this.curCheckedLabels = curPrefix;
    },
    getCurItemData(curItemArr) {
      const labels = [],
        values = [];
      curItemArr.forEach((item) => {
        labels.push(item.label);
        values.push(item.value);
      });
      return { labels, values };
    },
    formatLabel(curVal, inx) {
      return this.curItemArr
        .slice(0, inx)
        .map((item) => item.value)
        .concat(curVal)
        .join('/');
    },
    filterList(list) {
      return list.filter((item) => item.label.includes(this.searchVal));
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

    .list {
      margin: 0;
      padding-left: 0;
      height: 192px;
      flex: 1;
      min-width: 120px;
      list-style: none;
      overflow: auto;
      border-right: 1px solid #ccc;

      & > li {
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
