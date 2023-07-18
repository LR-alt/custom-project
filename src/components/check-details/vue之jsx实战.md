<a name="b519f47e"></a>

### 1.JSX是什么

*   JSX是一个 JavaScript 的语法扩展，全称JavaScript xml，可以很好地描述 UI 应该呈现出它应有交互的本质形式，相较于模板，它具有 JavaScript 的全部功能。

<a name="bbeda487"></a>

### 2.为什么使用JSX

*   在处理一些较为灵活和动态的场景时，受限于vue中模板和脚本分离的限制，这时候可以使用jsx将两者结合在一起。
*   面对复杂逻辑时，可以充分发挥js的语法特性，避免模板语法的限制和冗余。
*   易于封装和创建组件。

<a name="9665c6bc"></a>

### 3.JSX的安装及使用

```bash
npm install @vue/babel-preset-jsx @vue/babel-helper-vue-jsx-merge-props
```

在 `babel.config.js`中添加如下配置:

```javascript
module.exports = {
    presets: ['@vue/babel-preset-jsx'],
}
```

<a name="57d03744"></a>

### 4.基本语法（[官方文档](https://github.com/vuejs/jsx-vue2#installation)）

```html
{/* 插值和属性绑定 */}
<td rowspan={rowspan}>{label}</td>
{/* 事件绑定 */}
<div onClick={() => this.handleClick('add')}>添加</div>
{/* 列表渲染 （类似v-for） */}
<table>{ this.columns.map((tds, inx) => <tr key={inx}>{tds}</tr>) }</table>;
{/* 自定义默认插槽 && 自定义具名插槽 && 作用域插槽 */}
<div class="cell">
  <span class="title">{this.$slots.default}</span>
  <span class="title">{this.$slots.title}</span>
  <myComp scopedSlots={{ title: ({text}) => <span>{text}</span> }}></myComp>
</div>
```

<a name="2d56e452"></a>

### 5.实际运用（[完整代码](https://gitee.com/oldSports/elementui-common-comps/blob/master/src/components/check-details/check-detailLast.vue)）

由于接触的PC项目中，几乎都涉及到如下图所示的业务场景，故需要封装一个查看详情/表单编辑组件。综合考虑还是使用jsx封装
![Alt text](image-2.png)
嵌套数据对应的DOM元素结构
![Alt text](image-1.png)
用于定义组件结构的数据如下，包括单行数据的结构和多行嵌套结构的数据。
```javascript
// json数据
const columns = [
  [
    { prop: 'creatorName', label: '创建人', colspan: 2 },
    { prop: 'createTime', label: '创建时间' },
    { prop: 'creator', label: 'creator' },
  ],
  [
    { prop: 'affairType', label: '事物类型', required: true },
  ],
  [
    { prop: 'isEffect', label: '是否立即失效' }
  ],
  [
    { prop: 'remindObject', label: '提醒对象' }
  ],
  [
    // 为了直观的表示嵌套类型的数据，对应的数据将使用树形结构。
    { 
      label: '详情1',
      grids: 5,
      children: [
        { prop: 'sub1' },
        {
          label: '详情1-2',
          children: [
            { label: '详情1-1-1', prop: 'tub1' },
            { label: '详情1-1-2', prop: 'tub2' },
          ]
        },
        { label: '详情1-3', prop: 'sub3' },
      ]
    },
    {
      label: '详情2',
      grids: 3,
      children: [
        { label: '详情2-1', prop: 'sub4', rowspan: 2 },
        { label: '详情2-2', prop: 'sub5', rowspan: 2 },
      ]
    },
  ],
  [
    { 
      prop: 'smsContent', 
      label: '短信内容', 
      rules: [{ required: true, message: '短信内容不能为空' }],
    }
  ],
]
```
组件的使用
```vue
<template>
  <checkDetail class="check-detail" :detail="detail" :columns="columns">
		<template #affairType>
			<el-input	v-model="detail.affairType" type="text" placeholder="请输入" />
		</template>
		<template #remindSize>
			<el-select v-model="detail.remindSize" class="w-full" placeholder="请选择">
				<el-option
					v-for="it in remindSizeOps"
					:key="it.value"
					:label="it.label"
					:value="it.value"
				/>
			</el-select>
		</template>
		<template #smsContent>
			<el-input v-model="detail.smsContent" type="textarea" :rows="4" placeholder="请输入" />
		</template>
	</checkDetail>
</template>
```
组件核心代码如下：
```jsx
{
  // 组件的UI层
  render() {
    return this.getForm(
      <div class="check-detail">
        <table
          class="detail"
          border="0"
          cellspacing="0"
          cellpadding="0"
          width="100%"
        >
          {this.columns.map((items, index) => {
            const isNest = items.some((item) => item.children?.length);
            // 是否为嵌套类型
            if (isNest) {
              const groupTds = items.map((item) => {
                const { result } = this.toFlat(item, item.grids);
                return result;
              });
              return this.mergeTds(groupTds).map((tds, inx) => (
                <tr key={`${index}${inx}`}>{tds}</tr>
              ));
            }
            // 计算每条数据所占单元格列数
            const averageGrids = this.getAverageGrids(this.baseGrids, items);
            return (
              <tr key={index}>
                {items
                  .map((it, i) => this.createTds(it, { cols: averageGrids[i] }))
                  .flat()}
              </tr>
            );
          })}
        </table>
      </div>
    );
  },
  methods: {
    // 使用jsx定义一个el-form外层组件，便于在表单需要检验的时候，套入组件最外层
    getForm(content) {
      if (this.isRequired) {
        return (
          <el-form
            ref="formRef"
            props={{
              model: this.detail,
              size: "small",
            }}
          >
            {content}
          </el-form>
        );
      }
      return content;
    },
    // 处理嵌套结构数据，并扁平化返回，同时获取每个父节点下的所有叶子节点数目
    toFlat(item, grids = this.baseGrids) {
      const result = [];
      const label = item.label;
      let count = 0;

      if (label) grids--;

      for (const subItem of this.getFullChild(item.children)) {
        const { prop, children } = subItem;
        if (prop) {
          count++;
          result.push(this.createTds(subItem, { cols: grids }));
        } else if (children) {
          const { result: subTds, count: subCount } = this.toFlat(subItem, grids);
          count += subCount;
          result.push(...subTds);
        } else {
          result.push(null);
        }
      }

      if (label && result?.length) {
        result[0].unshift(this.createTds(item, { rows: count }));
      }
      return { result, count };
    },
    // 将对应数据生成虚拟dom
    createTds(item, { cols, rows }) {
      const { label, prop, rowspan, colspan, rules } = item;
      const result = [];
      if (label) {
        const curRowspan = rowspan || rows || 1;
        result.push(
          <td class="tb_th" rowspan={curRowspan} colspan={1}>
            <div class={`cell ${this.isRequired && rules ? "isRequired" : ""}`}>
              {this.$scopedSlots[label]?.() || label}
            </div>
          </td>
        );
        if (cols) cols--;
      }
      if (prop) {
        const curColspan = colspan || cols || 1;
        result.push(
          <td class="tb_td" rowspan={rowspan} colspan={curColspan}>
            {this.getFormItem(
              item,
              <div class="cell">
                {this.$scopedSlots[prop]?.() || this.detail[prop]}
              </div>
            )}
          </td>
        );
      }
      return result ?? (result.length === 1 ? result[0] : result);
    },
    // 在表单项需要校验时，套上一层el-form-item组件
    getFormItem(item, content) {
      const { prop, rules } = item;
      if (this.isRequired && rules) {
        return (
          <el-form-item
            prop={prop}
            rules={rules}
            scopedSlots={{ // 自定义error提示样式
              error: ({ error }) => (
                <span
                  class="custom-error"
                  {...{ directives: [{ name: "hidden" }] }}
                >
                  {error}
                </span>
              ),
            }}
          >
            {content}
          </el-form-item>
        );
      }
      return content;
    },
  }
}
```

