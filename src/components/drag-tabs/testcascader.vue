<template>
  <div class="select-area">
    <el-cascader-panel ref="selectPaneRef" v-model="selectList" :options="options" :props="{ multiple: true, }" @change="handleChange"
      @expand-change="handleExpandChange" size="mini">
      <template slot-scope="{ node, data }">
        <span v-if="node.isLeaf" @click="handleClick(node, data)">
          {{ data.label }}
        </span>
      </template>
    </el-cascader-panel>
  </div>
</template>

<script>
export default {
  name: 'select-area',
  props: {},
  components: {},
  data() {
    return {
      selectList: [],
      options: [
        {
          value: 'zhinan',
          label: '指南',
          // 
          children: [
            {
              value: 'shejiyuanze',
              label: '设计原则',
              // 
              children: [
                {
                  value: 'yizhi',
                  label: '一致',
                  multiple: true,
                },
                {
                  value: 'fankui',
                  label: '反馈',
                  multiple: true,
                },
                {
                  value: 'xiaolv',
                  label: '效率',
                  multiple: true,
                },
                {
                  value: 'kekong',
                  label: '可控',
                  multiple: true,
                },
              ],
            },
            {
              value: 'daohang',
              label: '导航',
              children: [
                {
                  value: 'cexiangdaohang',
                  label: '侧向导航',
                },
                {
                  value: 'dingbudaohang',
                  label: '顶部导航',
                },
              ],
            },
          ],
        },
        {
          value: 'zujian',
          label: '组件',

          children: [
            {
              value: 'basic',
              label: 'Basic',
              children: [
                {
                  value: 'layout',
                  label: 'Layout 布局',
                },
                {
                  value: 'color',
                  label: 'Color 色彩',
                },
                {
                  value: 'typography',
                  label: 'Typography 字体',
                },
                {
                  value: 'icon',
                  label: 'Icon 图标',
                },
                {
                  value: 'button',
                  label: 'Button 按钮',
                },
              ],
            },
            {
              value: 'form',
              label: 'Form',
              children: [
                {
                  value: 'radio',
                  label: 'Radio 单选框',
                },
                {
                  value: 'checkbox',
                  label: 'Checkbox 多选框',
                },
                {
                  value: 'input',
                  label: 'Input 输入框',
                },
                {
                  value: 'input-number',
                  label: 'InputNumber 计数器',
                },
                {
                  value: 'select',
                  label: 'Select 选择器',
                },
                {
                  value: 'cascader',
                  label: 'Cascader 级联选择器',
                },
                {
                  value: 'switch',
                  label: 'Switch 开关',
                },
                {
                  value: 'slider',
                  label: 'Slider 滑块',
                },
                {
                  value: 'time-picker',
                  label: 'TimePicker 时间选择器',
                },
                {
                  value: 'date-picker',
                  label: 'DatePicker 日期选择器',
                },
                {
                  value: 'datetime-picker',
                  label: 'DateTimePicker 日期时间选择器',
                },
                {
                  value: 'upload',
                  label: 'Upload 上传',
                },
                {
                  value: 'rate',
                  label: 'Rate 评分',
                },
                {
                  value: 'form',
                  label: 'Form 表单',
                },
              ],
            },
            {
              value: 'data',
              label: 'Data',
              children: [
                {
                  value: 'table',
                  label: 'Table 表格',
                },
                {
                  value: 'tag',
                  label: 'Tag 标签',
                },
                {
                  value: 'progress',
                  label: 'Progress 进度条',
                },
                {
                  value: 'tree',
                  label: 'Tree 树形控件',
                },
                {
                  value: 'pagination',
                  label: 'Pagination 分页',
                },
                {
                  value: 'badge',
                  label: 'Badge 标记',
                },
              ],
            },
            {
              value: 'notice',
              label: 'Notice',
              children: [
                {
                  value: 'alert',
                  label: 'Alert 警告',
                },
                {
                  value: 'loading',
                  label: 'Loading 加载',
                },
                {
                  value: 'message',
                  label: 'Message 消息提示',
                },
                {
                  value: 'message-box',
                  label: 'MessageBox 弹框',
                },
                {
                  value: 'notification',
                  label: 'Notification 通知',
                },
              ],
            },
            {
              value: 'navigation',
              label: 'Navigation',
              children: [
                {
                  value: 'menu',
                  label: 'NavMenu 导航菜单',
                },
                {
                  value: 'tabs',
                  label: 'Tabs 标签页',
                },
                {
                  value: 'breadcrumb',
                  label: 'Breadcrumb 面包屑',
                },
                {
                  value: 'dropdown',
                  label: 'Dropdown 下拉菜单',
                },
                {
                  value: 'steps',
                  label: 'Steps 步骤条',
                },
              ],
            },
            {
              value: 'others',
              label: 'Others',
              children: [
                {
                  value: 'dialog',
                  label: 'Dialog 对话框',
                },
                {
                  value: 'tooltip',
                  label: 'Tooltip 文字提示',
                },
                {
                  value: 'popover',
                  label: 'Popover 弹出框',
                },
                {
                  value: 'card',
                  label: 'Card 卡片',
                },
                {
                  value: 'carousel',
                  label: 'Carousel 走马灯',
                },
                {
                  value: 'collapse',
                  label: 'Collapse 折叠面板',
                },
              ],
            },
          ],
        },
        {
          value: 'ziyuan',
          label: '资源',

          children: [
            {
              value: 'axure',
              label: 'Axure Components',
            },
            {
              value: 'sketch',
              label: 'Sketch Templates',
            },
            {
              value: 'jiaohu',
              label: '组件交互文档',
            },
          ],
        },
      ],
      curRootPath: '',
      preCheckedRootPath: ''
    };
  },

  mounted() { },
  watch: {},
  methods: {
    handleChange() {
      if (this.preCheckedRootPath && this.preCheckedRootPath !== this.curRootPath) {
        // clear options and render transfer value
        // debugger;
        const nodes = this.$refs.selectPaneRef.getCheckedNodes();
        console.log(nodes);
        // this.selectList = val;
      }
      this.preCheckedRootPath = this.curRootPath;
      /* const lastItems = this.selectList[this.selectList.length - 1].join('/');
      const curItems = val. */
    },
    handleExpandChange (paths) {
      this.curRootPath = paths.join('/');
    },
    handleClick() {
      
    }
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

  .el-cascader-panel {
    width: 100%;

    /deep/ .el-cascader-menu {
      min-width: 100px;

      .el-cascader-node {
        padding-left: 8px;

      }

      &__wrap {
        .el-checkbox {
          display: none;
        }
      }

      &:nth-of-type(3) {
        .el-cascader-menu__wrap {
          .el-checkbox {
            display: block;
          }
        }
      }
    }
  }
}
</style>
