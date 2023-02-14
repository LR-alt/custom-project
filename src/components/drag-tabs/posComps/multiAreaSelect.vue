<!-- 区域对选择、省/市/县组件 -->
<template>
  <div class="multiArea-select">
    <div class="multiArea-select__area">
      <selectArea v-model="checkedList" :tags.sync="tags" :selectOps="selectAreaOps" :treeData="tree" />
    </div>
    <div class="multiArea-select__mall">
      <selectScene ref="selectSceneRef" :selectOps="selectOps" :options="selectList" v-model="checkedData"
        @handleSelect="updateSceneList" @sceneCheck="handleSceneChecked" />
    </div>
    <div class="multiArea-select__selected">
      <selectedLabels v-bind="$attrs" :selectTags="tags" @deleteTag="deleteTag" />
    </div>
  </div>
</template>

<script>
import selectArea from '../selectArea2.vue';
import selectScene from './selectScene.vue';
import selectedLabels from './selectSceneLabels.vue';

import { mallTree, baseTree } from '../static.js';

export default {
  name: 'multiArea-select',
  inject: ['tree', 'getTags'],
  props: {
    areaType: {
      type: String,
      default: '',
    },
  },
  components: {
    selectArea,
    selectScene,
    selectedLabels,
  },
  data() {
    return {

      selectList: [],
      mapPanelLevels: {
        省份: 1,
        城市: 2,
        区县: 3,
      },
      selectAreaOps: [
        { label: '地市', value: 1 },
        { label: '区县', value: 2 },
      ],
      // 默认回显数据
      checkedList: [],
      tags: [],
      checkedScenes: [],
      selectVal: '',
      checkedData: {
        '商场': [],
        '园区': [],
        '学校': [],
        '景区': [],
        '机场': [],
        def: []
      },
      selectOps: [
        { label: '商场', value: '商场' },
        { label: '园区', value: '园区' },
        { label: '学校', value: '学校' },
        { label: '景区', value: '景区' },
        { label: '机场', value: '机场' },
        { label: '高铁站', value: '高铁站' },
      ],
    };
  },
  mounted() { },
  watch: {
    checkedList: {
      handler(newList) {
        // 更新tags
        this.$nextTick(() => {
          this.updateSceneList(this.$refs.selectSceneRef.selectVal, newList);
        });
      },
      immediate: true,
    },
  },
  methods: {
    updateCheckedList(prefix, newCheckedList) {
      if (this.checkedList.prefix && this.checkedList.prefix !== prefix) {
        this.checkedList.list.forEach((item) => {
          item.checked = false;
        });
        this.checkedScenes = [];
      }
      this.checkedList.prefix = prefix;
      this.checkedList.list = newCheckedList;
      //
      this.updateSceneList(this.$refs.selectSceneRef.selectVal, this.checkedList);
    },
    handleSceneChecked(item) {
      if (item.checked) {
        if (item.label === '全部') {
          this.checkedScenes.push(
            ...this.selectList.filter((item) => !item.checked && item.label !== '全部')
          );
          this.selectList.forEach((item) => (item.checked = true));
        } else {
          this.checkedScenes.push(item);
        }
      } else {
        if (item.label === '全部') {
          this.selectList.forEach((item) => (item.checked = false));
        } else {
          const all = this.selectList.find((item) => item.label === '全部');
          if (all) {
            all.checked = false;
          }
        }
        this.checkedScenes = this.checkedScenes.filter((item) => item.checked);
      }
    },
    /* handleSelect(value) {
      this.updateSceneList(value);
    }, */
    deleteTag(tag) {
      const delItem = this.checkedScenes.find(
        (item) => tag === `${item.prefix.join('')}${item.label}`
      );
      if (delItem) {
        delItem.checked = false;
        this.checkedScenes = this.checkedScenes.filter((item) => item.checked);
      }
    },
    // invoke interface
    updateSceneList(value) {
      if (value === '商场') {
        this.selectList = mallTree;
      } else {
        this.selectList = baseTree;
      }
    },
  },
};
</script>
<style lang="less" scoped>
.multiArea-select {
  display: inline-flex;

  &__mall {
    margin-right: 6px;
  }

  &__selected {
    min-width: 300px;
  }
}
</style>
