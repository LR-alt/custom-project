<!-- 时间条件配置组件 -->
<template>
  <div class="position-condition">
    <div class="position-condition__title">
      <h3 class="title">第2步：输入地理条件配置</h3>
    </div>
    <div class="position-condition__body">
      <el-form ref="form" :model="form" label-width="90px" size="small">
        <el-form-item label="区域类型:">
          <el-radio-group v-model="form.areaType">
            <el-radio label="区域">区域</el-radio>
            <el-radio label="区域对">区域对</el-radio>
            <el-radio label="区域绘制">区域绘制</el-radio>
          </el-radio-group>
        </el-form-item>
        <template v-if="form.areaType !== '区域绘制'">
          <el-form-item label="区域设置:">
            <el-radio-group v-model="form.areaSetting">
              <el-radio
                v-for="(label, inx) in areaSettingOps[form.areaType]"
                :key="inx"
                :label="label"
                >{{ label }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
          <!-- 动态 -->
          <el-form-item v-if="form.areaSetting !== '无范围'" label="选择区域:">
            <Keep-alive>
              <component
                :key="curComp.name + curComp.type"
                :is="curComp.name"
                :areaType="curComp.type"
                :panelLevels="curComp.panelLevels"
                :selectTags="curComp.tags"
              />
            </Keep-alive>
          </el-form-item>
          <el-form-item v-else label="">
            <div class="noTime">
              <i class="el-icon-warning" style="color: #faad14"></i>
              无需输入地理维度信息，默认取最新的数据，如画像信息、职业标签等。
            </div>
          </el-form-item>
        </template>
        <!-- 区域绘制 -->
        <div v-else>地图绘制</div>
        <!-- 结果 -->
        <el-form-item label="">
          <div class="result" :title="result">已输入地理条件：{{ result }}</div>
        </el-form-item>
        <!-- 下一步 -->
        <el-form-item label="">
          <el-button type="primary">下一步</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import areaCompose from './areaCompose.vue';
import subAreaSelect from './posComps/subAreaSelect.vue';
import areaPairSelect from './posComps/areaPairSelect.vue';
import multiAreaSelect from './posComps/multiAreaSelect.vue';

import { tree, mallTree } from './static';

export default {
  name: 'position-condition',
  components: {
    areaCompose,
    subAreaSelect,
    areaPairSelect,
    multiAreaSelect,
  },
  provide() {
    return {
      tree,
      mallTree,
      getTags: (tags, type) => this.getTags(tags, type),
    };
  },
  data() {
    return {
      form: {
        areaType: '区域',
        areaSetting: '省份',
      },
      areaSettingOps: {
        区域对: ['省份', '城市', '区县'],
        区域: ['省份', '城市', '区县', '多边形区域', '位置点', '无范围'],
      },
      areaList: [],
      compData: {
        '区域-省份': {
          name: 'subAreaSelect',
          type: '省份',
          panelLevels: 1,
          tags: [],
          conclusion: '',
        },
        '区域-城市': {
          name: 'subAreaSelect',
          type: '城市',
          panelLevels: 2,
          tags: [],
          conclusion: '',
        },
        '区域-区县': {
          name: 'subAreaSelect',
          type: '区县',
          panelLevels: 3,
          tags: [],
          conclusion: '',
        },
        '区域-多边形区域': {
          name: 'multiAreaSelect',
          type: '多边形区域',
          tags: [],
          conclusion: '',
        },
        '区域-位置点': '',
        '区域-无范围': '',
        '区域对-省份': {
          name: 'areaPairSelect',
          type: '省份',
          panelLevels: 1,
          tags: [],
          conclusion: '',
        },
        '区域对-城市': {
          name: 'areaPairSelect',
          type: '城市',
          panelLevels: 2,
          tags: [],
          conclusion: '',
        },
        '区域对-区县': {
          name: 'areaPairSelect',
          type: '区县',
          panelLevels: 3,
          tags: [],
          conclusion: '',
        },
      },
      conclusion: '',
    };
  },
  computed: {
    selectLabel() {
      const { areaType, areaSetting } = this.form;
      return `${areaType}-${areaSetting}`;
    },
    result() {
      const { areaType, areaSetting } = this.form;
      return `${areaType}、${areaSetting}、${this.curComp.conclusion}`;
    },
    curComp() {
      return this.compData[this.selectLabel];
    }
  },
  watch: {},
  methods: {
    getTags(tags) {
      if (this.form.areaType !== '区域对') {
        this.curComp.conclusion = tags.join('、');
      } else {
        const [srcTags, tarTags] = tags;
        this.curComp.conclusion = `源${this.form.areaSetting}：${srcTags.join('、')}；目的${
          this.form.areaSetting
        }：${tarTags.join('、')}`;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.position-condition {
  &__title {
    .title {
      margin-bottom: 16px;
      padding-left: 18px;
      font-size: 20px;
      font-weight: bold;
    }
  }
  &__body {
    .el-form {
      .el-radio-group {
        display: inline-flex;
        padding: 0 10px;
        align-items: center;
        height: 32px;
        border: 1px solid #dedede;
        .el-radio {
          margin-bottom: 0;
        }
      }
      .el-date-editor {
        width: 190px;
      }
      .noTime {
        display: inline-block;
        padding: 0 12px;
        border: 1px solid #ffe58f;
        background-color: #fffbe6;
      }
      .result {
        display: inline-block;
        padding: 0 12px;
        max-width: 97%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        border: 1px solid #8db2fe;
        background-color: #edf3ff;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
