// 使用校验器
function useValidator(strategies, rules) {
  const cache = [];
  // 定义目标值、外层入参
  const outArgs = {
    file: undefined,
  };
  // 添加规则
  const addRule = (rules) => {
    rules.forEach(rule => {
      const { strategy, errMsg, ruleArgs, validator } = rule;
      cache.push(() => {
        if (typeof validator === 'function') {
          return validator(outArgs.file, outArgs);
        } else {
          return strategies[strategy](outArgs.file, errMsg, { ruleArgs, outArgs });
        }
      });
    })
  }
  // 开启验证
  const start = (argObj) => {
    // 初始化
    Object.assign(outArgs, argObj);
    // 遍历调用
    for (const validFn of cache) {
      const errMsg = validFn();
      if (errMsg) {
        return errMsg;
      }
    }
  }
  // 添加
  addRule(rules);
  return start;
}
// 设置表格参数
function useTableParams(tableData, uploadStateFns, idName = "uid") {
  if (!Array.isArray(tableData)) { return; }
  let newItem;
  // 添加表格项
  const addNewItem = function (item, curInx) { 
    if (Number.isFinite(curInx)) {
      newItem = { ...tableData[curInx] };
      tableData.splice(curInx, 1, newItem);
    } else {
      newItem = { ...{ [idName]: '' }, ...item };
      tableData.push(newItem);
    }
    return this;
  }
  // 设置表格项入参
  const setEffect = function (stateType, fileObj) {
    // debugger;
    const tarItem = (stateType in uploadStateFns) && uploadStateFns[stateType](fileObj);
    if (typeof tarItem !== 'object' || tarItem === null) return;
    if (stateType === 'onBefore') {
      Object.assign(newItem, tarItem);
    } else {
      const { file: { uid } } = fileObj;
      const oldItem = tableData.find(item => item[idName] === uid);
      oldItem && Object.assign(oldItem, tarItem);
    }
  }

  return {
    addNewItem,
    setEffect,
  }
}

// 实现可编辑表格(分离数据 与 行为状态)
class UsePropState {
  constructor(propMap, refArr, createRowState) {
    this.propMap = propMap;
    this.refArr = refArr;
    this.createRowState = createRowState;
    this.oldTable = [];
    this.editProps = [];
  }
  // diff set
  getDiffSet(bigTable, smallTable) {
    return bigTable.filter(item => !smallTable.includes(item));
  }
  // add
  addRowState(addArr) {
    addArr.forEach(item => {
      const rowState = this.createRowState(this.editProps, {});
      this.propMap.set(item, rowState);
      this.refArr.push(rowState);
    })
  }
  // del
  delRowState(delArr) {
    delArr.forEach(item => {
      const rowState = this.propMap.get(item);
      const index = this.refArr.findIndex(it => it === rowState);
      this.propMap.delete(item);
      this.refArr.splice(index, 1);
    })
  }
  // mod
  modRowState(addArr, delArr) {
    addArr.forEach((item, index) => {
      const preItem = delArr[index];
      const preRowState = this.propMap.get(preItem);
      const curRowState = this.createRowState(this.editProps, preRowState);
      this.propMap.set(item, curRowState).delete(preItem);
    })
  }
  // set prop state
  setRowState(newTable, curEditProps) {
    if (!curEditProps.length) return;
    // 缓存当前的可编辑属性列表
    this.editProps = [...curEditProps];
    const { oldTable } = this;
    // 取差值
    const diffLen = newTable.length - oldTable.length;
    // add
    if (diffLen > 0) {
      this.addRowState(this.getDiffSet(newTable, oldTable));
    } else if (diffLen < 0) {
      this.delRowState(this.getDiffSet(oldTable, newTable));
    } else {
      this.modRowState(this.getDiffSet(newTable, oldTable), this.getDiffSet(oldTable, newTable));
    }
    // cache
    this.oldTable = [...newTable];
  }
  // 更新单个属性的状态
  updatePropState(curEditProps) {
    // propMap为空时，添加行状态
    if(!this.propMap.size) {
      this.editProps = [...curEditProps];
      this.addRowState(this.oldTable);
    }
    // 更新属性状态
    const addProps = this.getDiffSet(curEditProps, this.editProps);
    const delProps = this.getDiffSet(this.editProps, curEditProps);
    if(!addProps.length && !delProps.length) return;

    for (const rowState of this.propMap.values()) {
      // add prop this.state.
      this.createRowState(addProps, rowState);
      // delete single prop
      delProps.forEach(prop => rowState[prop] = null);
    }
    // cache
    this.editProps = [...curEditProps];
  }
  // get single prop state
  getPropState(row, prop, opType) {
    return opType ? this.propMap.get(row)?.[prop]?.[opType] : this.propMap.get(row)?.[prop];
  }
  // set single prop state
  setPropState(row, prop, opType, val) {
    if (prop && opType) {
      this.propMap.get(row)[prop][opType] = val;
    }
  }
}

export {
  useValidator,
  useTableParams,
  UsePropState
}