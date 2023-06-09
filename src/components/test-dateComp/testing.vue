<template>
    <el-select
      v-model="value"
      multiple
      filterable
      remote
      collapse-tags
      reserve-keyword
      placeholder="请输入关键词"
      :remote-method="remoteMethod"
      :loading="loading"
      class="select-demo"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </template>

<script>
export default {
  data() {
    return {
      options: [],
      value: [],
      rootVal: "",
      rootList: [],
      curPromise: null,
      loading: false,
      states: [
        "0110A",
        "0110B",
        "0110C",
        "0110D",
        "0120K",
        "0120",
        "0120D",
        "0980",
        "0980H",
        "0980O",
        "0980A",
        "0980C",
      ],
    };
  },
  methods: {
    // 设置并获取对应的下拉项
    getOptions(rootList, query) {
      return rootList
        .filter((item) => item.toUpperCase().startsWith(query))
        .map((item) => ({ value: item, label: item }));
    },
    // 模拟接口调用
    getData() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(
            this.states.filter((item) => item.toUpperCase().startsWith(this.rootVal))
          );
        }, 800);
      });
    },
    // request data
    async remoteMethod(query) {
      query = query.trim().toUpperCase();
      // 根据根查询
      if (query.length >= 4) {
        this.loading = true;
        // 收集/更新根
        if (!this.rootVal || !query.startsWith(this.rootVal)) {
          this.rootVal = query.slice(0, 4);
          this.rootList = [];
          this.curPromise = this.getData()
        }
        // 判断是否需要等待上一次最新的请求结果
        if (!this.rootList.length) {
          this.rootList = await this.curPromise;
        }
        this.options = this.getOptions(this.rootList, query);
        this.loading = false;
      } else {
        this.options = [];
      }
    },
  },
};
</script>
