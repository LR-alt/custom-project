<script>
import Attachment from './Attachment';
import FileTable from './FileTable';
import EditForm from './EditForm';
export default {
  name: 'UploadTable',
  inheritAttrs: false,
  components: {
    Attachment,
    FileTable,
    EditForm
  },
  computed: {
    attrData({ $attrs }) {
      return {
        props: $attrs,
      }
    },
    slotNames({ $attrs }) {
      return $attrs.showColumns.map(column => `tb_${column.prop}`);
    },
    scopedSlotSet({ $scopedSlots, slotNames }) {
      return {
        tb_ScopedSlots: {
          tb_op: this.getTbOpSlotFn($scopedSlots.tb_op),
          ...this.getTbDynamicSlot($scopedSlots, slotNames),
        }
      }
    }
  },
  methods: {
    // 插入上传文件组件
    insertFileCpn(fl_vNodes, index) {
      if (!Array.isArray(fl_vNodes)) return fl_vNodes;

      return fl_vNodes.map(vNode => {
        if (!vNode.tag) return vNode;
        if (vNode.data && vNode.data.slot === 'upload') {
          return <Attachment curIndex={index} {...this.attrData}>{vNode}</Attachment>;
        }
        const validVNode = vNode.componentOptions || vNode;
        if (validVNode) {
          validVNode.children = this.insertFileCpn(validVNode.children, index);
        }
        return vNode;
      })
    },
    // 获取文件上传节点
    getFileVNodes(fileSlotFn) {
      const fl_vNodes = fileSlotFn && fileSlotFn();
      if (fl_vNodes) {
        return this.insertFileCpn(fl_vNodes);
      }
      return (
        <Attachment {...this.attrData}>
          <el-button size="small">上传附件</el-button>
        </Attachment>
      )
    },
    // 获取按钮的作用域插槽
    getTbOpSlotFn(opSlotFn) {
      return ({ row, index }) => opSlotFn && this.insertFileCpn(opSlotFn({ row, index }), index);
    },
    // 获取动态插槽
    getTbDynamicSlot(scopedSlots, tb_columns) {
      const tb_dynamicSlots = {};
      tb_columns.forEach(tb_column => {
        tb_dynamicSlots[tb_column] = scopedSlots[tb_column];
      })
      return tb_dynamicSlots;
    },
  },
  render() {
    const { $scopedSlots, $slots, attrData, scopedSlotSet } = this;
    const { tb_ScopedSlots } = scopedSlotSet;

    return (
      <div class="upload-file">
        {/* 头部信息 */}
        <div class="topTitle">{$slots.default}</div>
        {/* 上传附件 */}
        <el-row>{this.getFileVNodes($scopedSlots.fl_def)}</el-row>
        {/* 附件表格 */}
        {
          this.isEditTable
            ? (
              <EditForm {...attrData} {...{ on: this.$listeners }}>
                <FileTable {...attrData} scopedSlots={tb_ScopedSlots} />
              </EditForm>
            )
            : (<FileTable {...attrData} scopedSlots={tb_ScopedSlots} />)
        }
      </div>
    )
  },
  props: {
    isEditTable: {
      type: Boolean,
      default: false,
    }
  }
}
</script>