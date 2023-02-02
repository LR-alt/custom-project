<!-- 区域选择、省/市/县组件 -->
<template>
  <div class="subArea-select" :class="isVertical ? 'flex-vertical' : ''">
    <selectArea
      class="subArea-select__select"
      :checkedData="checkedData"
      :treeData="JSON.parse(JSON.stringify(tree))"
      v-bind="$attrs"
      @updateList="updateCheckedList"
    />
    <selectedLabels
      class="subArea-select__show"
      :class="isVertical ? mapWidths[areaType] : ''"
      v-bind="$attrs"
      :tagData="checkedData"
      @updateTags="updateTags"
      @deleteTag="deleteTag"
    />
  </div>
</template>

<script>
import selectArea from '../selectArea1.vue';
import selectedLabels from '../selectedLabels.vue';
export default {
  name: 'sub-area-select',
  inject: ['tree', 'getTags'],
  props: {
    isVertical: {
      type: Boolean,
      default: false,
    },
    areaType: {
      type: String,
      default: '',
    },
  },
  components: {
    selectArea,
    selectedLabels,
  },
  data() {
    return {
      // 默认回显数据
      checkedData: {
        prefix: '',
        list: [{ label: '' }, { label: '' }],
      },
      mapWidths: {
        省份: 'w-210',
        城市: 'w-250',
        区县: 'w-370',
      },
    };
  },
  mounted() {},
  watch: {},
  methods: {
    updateCheckedList(prefix, newCheckedList) {
      if (this.checkedData.prefix && this.checkedData.prefix !== prefix) {
        this.checkedData.list.forEach((item) => {
          item.checked = false;
        });
      }
      this.checkedData.prefix = prefix;
      this.checkedData.list = newCheckedList;
    },
    deleteTag(tag) {
      const prefix = this.checkedData.prefix.replace(/\//g, '');
      const curItem = this.checkedData.list.find((item) => tag === `${prefix}${item.label}`);
      curItem.checked = false;
    },
    updateTags(tags) {
      if (this.isVertical) {
        this.$emit('collectTags', tags);
      } else {
        this.getTags(tags);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.subArea-select {
  display: flex;
  &__select {
    margin-bottom: 8px;
  }
  &__show {
    width: 420px;
  }
}
.flex-vertical {
  flex-direction: column;
}
.w-210 {
  width: 210px;
}
.w-250 {
  width: 250px;
}
.w-370 {
  width: 370px;
}
</style>
