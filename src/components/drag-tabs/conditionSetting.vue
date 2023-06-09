<template>
  <el-tabs v-model="activeName" class="condition-setting" tab-position="left">
    <el-tab-pane
      v-for="tab in tabList"
      :key="tab.label"
      :name="tab.name"
      :disabled="Boolean(tab.icon)"
    >
      <!-- label -->
      <div slot="label">
        <div v-if="tab.icon" class="title text-left">
          <img class="img" :src="mapIcons[tab.icon]" />
          <span class="text">{{ tab.label }}</span>
        </div>
        <div v-else class="item text-left">
          <span class="cycle">{{ tab.order }}</span>
          <span class="custom-label">{{ tab.label }}</span>
        </div>
      </div>
      <!-- 各配置步骤组件 -->
      <!--  {{ tab.label }} -->
      <component :is="tab.comp"></component>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import enterIcon from './imgs/enter.png';
import outputIcon from './imgs/output.png';
import timeCondition from './timeCondition.vue';
import positionCondition from './positionCondition.vue';
export default {
  name: 'condition-setting',
  components: {
    timeCondition,
    positionCondition,
  },
  data() {
    return {
      mapIcons: {
        enter: enterIcon,
        output: outputIcon,
      },
      activeName: '1',
      tabList: [
        { label: '输入', icon: 'enter', status: 'stop', name: 'enter' },
        { label: '时间条件配置', name: '1', order: 1, status: 'pending', comp: 'positionCondition' },
        { label: '地理条件配置', name: '2', order: 2, status: 'notStarted' },
        { label: '人群条件配置', name: '3', order: 3, status: 'notStarted' },
        { label: '输出', icon: 'output', status: 'stop', name: 'output' },
        { label: '维度与指标配置', name: '4', order: 4, status: 'notStarted' },
      ],
    };
  },
};
</script>
<style lang="less" scoped>
.condition-setting {
  height: 100%;
  /deep/ .el-tabs__item {
    padding-left: 12px !important;
    padding-right: 0 !important;
    &.is-active {
       background-color: #edf3ff;
       .cycle {
          background-color: #3978fb;
          color: #fff;
       }
    }
  }
  /deep/ .el-tabs__nav-wrap {
    width: 200px;
  }

  .title {
    padding-left: 2px;
    .img {
      width: 16px;
      vertical-align: middle;
    }
    .text {
      padding-left: 4px;
      vertical-align: middle;
      color: #454545;
      font-weight: bold;
    }
  }

  .item {
    display: flex;
    align-items: center;
    .cycle {
      display: block;
      width: 20px;
      height: 20px;
      border-radius: 10px;
      text-align: center;
      line-height: 20px;
      font-size: 12px;
      color: #000;
      background-color: #f0f2f5;
    }
    .custom-label {
      padding-left: 8px;
    }
  }
}
.text-left {
  text-align: left;
}
</style>
