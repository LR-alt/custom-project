<!-- 区域选择、省/市/县组件 -->
<template>
  <div class="subArea-select" :class="isVertical ? 'flex-vertical' : ''">
    <selectArea
      class="subArea-select__select"
      v-model="checkedList"
      :tags.sync="tags"
      :treeData="JSON.parse(JSON.stringify(tree))"
      v-bind="$attrs"
    />
    <selectedLabels
      class="subArea-select__show"
      :class="isVertical ? mapWidths[areaType] : ''"
      v-bind="$attrs"
      :tags="tags"
      @delTags="delTags"
      @updateTags="updateTags"
    />
  </div>
</template>

<script>
import selectArea from '../selectArea2.vue';
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
      checkedList: [],
      tags: [],
      mapWidths: {
        省份: 'w-210',
        城市: 'w-250',
        区县: 'w-370',
      },
    };
  },
  watch: {
    tags(newTags) {
      if (Array.isArray(newTags)) {
        this.updateTags(newTags.map(tag => tag.label));
      }
    }
  },
  methods: {
    delTags(tag) {
      this.tags = this.tags.filter(item => item.label !== tag.label);
      this.checkedList = this.checkedList.filter(val => val !== tag.value);
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
