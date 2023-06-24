### 1.JSX是什么
- JSX是一个 JavaScript 的语法扩展，全称JavaScript xml，可以很好地描述 UI 应该呈现出它应有交互的本质形式，相较于模板，它具有 JavaScript 的全部功能。
### 2.为什么使用JSX
- 有时候在处理一些较为灵活和动态的场景，受限于vue中模板和脚本分离的限制，这时候可以使用jsx将两者结合在一起。
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
### 4.基本语法( [使用文档](https://github.com/vuejs/jsx-vue2#installation))
```jsx
{/* 插值和属性绑定 */}
return <td rowspan={rowspan}>{label}</td>
{/* 事件绑定 */}
return <div onClick={() => this.handleClick('add')}>添加</div>
{/* 列表渲染 （类似于v-for） */}
return this.columns.map((tds, inx) => <tr key={inx}>{tds}</tr>);
{/* 插槽 */}
return <div class="cell">
  <span class="title">{this.$slots.title}</span>
  <span class="content">{this.$scopedSlots.title()}</span>
</div>
````
### 5.实际运用
- 基于表格封装一个查看详情 / 表单编辑组件，支持数据嵌套展示、自动计算单元格占位（[完整代码](https://gitee.com/oldSports/elementui-common-comps/blob/master/src/components/valid-input/check-detailLast.vue)）。
```jsx
{
    methods: {
        createTds({ label, prop, rowspan, colspan }, cols) {
            const result = [];
            if (label) {
                result.push(
                    <td class="tb_th" rowspan={rowspan} colspan={1}>
                        <div class="cell">
                            {this.$scopedSlots[label]?.() || label}
                        </div>
                    </td>
                );
                cols--;
            }
            if (prop) {
                const curColspan = colspan || cols; 
                result.push(
                    <td class="tb_td" rowspan={rowspan} colspan={curColspan}>
                        <div class="cell">
                            {this.$scopedSlots[prop]?.() || this.detail[prop]}
                        </div>
                    </td>
                );
            }
            return result ? (result.length === 1 ? result[0] : result) : null;
        },
        // 将嵌套类型数据扁平化
        toFlat(item, span = this.baseGrids) {
            const result = [];
            let preLabel = null;
            const { label, children, rowspan } = item;
            if (label) {
                preLabel = (
                    <td
                        class="tb_th"
                        rowspan={rowspan || this.getMaxRows(children)}
                        colspan={1}
                    >
                        <div class="cell">
                            {this.$scopedSlots[label]?.() || label}
                        </div>
                    </td>
                );
                span--;
            }

            for (const subItem of this.getFullChild(item.children)) {
                const { prop, children } = subItem;
                if (prop) {
                    const tds = [];
                    if (preLabel) {
                        tds.push(preLabel);
                        preLabel = null;
                    }
                    const subTds = this.createTds(subItem, span);
                    result.push(tds.concat(subTds));
                } else if (children) {
                    result.push(...this.toFlat(subItem, span));
                } else {
                    result.push(null);
                }
            }
            return result;
        },
    },
    render() {
        return (
            <div class="check-detail">
                <table class="detail" border="0" cellspacing="0" cellpadding="0" width="100%">
                    {this.columns.map((items, index) => {
                        const isNest = items.some((item) => item.children?.length);
                        if (isNest) {
                            const tds = items.map((item) => this.toFlat(item, item.span));
                            return this.mergeTds(tds).map((tds, inx) => <tr key={`${index}${inx}`}>{tds}</tr>);
                        }
                        const averageGrids = this.getAverageGrids(this.baseGrids, items);
                        return (
                            <tr key={index}>
                                {items.map((it, i) => this.createTds(it, averageGrids[i])).flat()}
                            </tr>
                        );
                    })}
                </table>
            </div>
        );
    }
}
```
