<!--
待定：将使用jsx去封装
-->
<template>
  <div class="task-info">
    <el-form :model="form" :rules="rules" size="small" inline>
      <el-row>
        <el-col :span="mapSpanInx.taskName">
          <el-form-item :label="isTemplateCreate ? '任务名称' : '模板名称' " prop="taskName">
            <el-input
              v-model="form.taskName"
              type="text"
              maxlength="50"
              placeholder=""
              show-word-limit
            />
          </el-form-item>
        </el-col>
        <el-col :span="mapSpanInx.classify">
          <el-form-item label="分类名称">
            <el-cascader
              v-model="form.classify"
              class="w-full"
              :options="classifyOps"
              :props="{ multiple: true }"
              collapse-tags
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col v-if="isTemplateCreate" :span="mapSpanInx.templateVisible">
          <el-form-item label="模板可见性">
            <el-select v-model="form.templateVisible" class="w-full">
              <el-option
                v-for="item in templateOps"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="mapSpanInx.customCategory">
          <el-form-item label="自定义类别">
            <customCategory v-model="form.customCategory" class="w-full" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col v-if="isTemplateCreate" :span="18">
          <el-form-item label="模板描述">
            <el-input
              v-model="form.description"
              type="text"
              maxlength="250"
              placeholder=""
              show-word-limit
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import customCategory from './customCategory.vue';
export default {
  name: 'task-info',
  components: {
    customCategory,
  },
  props: {
    taskType: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      form: {
        taskName: '',
        classify: [],
        templateVisible: '',
        customCategory: [
          'type one',
          'type two',
          'type three',
          'type four',
          'type five',
          'type six',
          'type seven',
          'type eight',
        ],
        description: '',
      },
      rules: {
        taskName: [{ required: true, message: '请输入', trigger: 'blur' }],
      },
      templateOps: [
        { label: '私有', value: '私有' },
        { label: '公共', value: '公共' },
        { label: '指定', value: '指定' },
      ],
      configProps: { multiple: true },
      classifyOps: [
        {
          value: 1,
          label: '东南',
          children: [
            {
              value: 2,
              label: '上海',
              children: [
                { value: 3, label: '普陀' },
                { value: 4, label: '黄埔' },
                { value: 5, label: '徐汇' },
              ],
            },
            {
              value: 7,
              label: '江苏',
              children: [
                { value: 8, label: '南京' },
                { value: 9, label: '苏州' },
                { value: 10, label: '无锡' },
              ],
            },
            {
              value: 12,
              label: '浙江',
              children: [
                { value: 13, label: '杭州' },
                { value: 14, label: '宁波' },
                { value: 15, label: '嘉兴' },
              ],
            },
          ],
        },
        {
          value: 17,
          label: '西北',
          children: [
            {
              value: 18,
              label: '陕西',
              children: [
                { value: 19, label: '西安' },
                { value: 20, label: '延安' },
              ],
            },
            {
              value: 21,
              label: '新疆维吾尔族自治区',
              children: [
                { value: 22, label: '乌鲁木齐' },
                { value: 23, label: '克拉玛依' },
              ],
            },
          ],
        },
      ],
    };
  },
  computed: {
    isTemplateCreate() {
      return this.taskType === 'templateTask';
    },
    mapSpanInx() {
      if (this.isTemplateCreate) {
        return {
          taskName: 8,
          classify: 6,
          templateVisible: 4,
          customCategory: 6,
        }
      }
      return {
          taskName: 10,
          classify: 7,
          customCategory: 7,
        }
    },
  },
};
</script>

<style lang="less" scoped>
.task-info {
  padding-left: 5px;
  padding-top: 12px;
  display: flex;
  align-items: center;
  // height: 54px;
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
  border-top: 1px solid #ccc;
  .el-form {
    width: 100%;
    .el-form-item {
      display: flex;
      margin-bottom: 12px;
    }
    /deep/ .el-form-item__label {
      margin-bottom: 0;
    }
    /deep/ .el-form-item__content {
      flex: 1;
    }
  }
}
.w-full {
  width: 100%;
}
</style>
