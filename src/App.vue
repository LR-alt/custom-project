<!--
 * @Date: 2022-10-28 10:47:45
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-05-08 22:24:58
 * @FilePath: \webStormProjectse:\componyProject\element-comps\elementui-common-comps\src\App.vue
-->
<template>
  <div id="app">
    <Test taskType="templateTask" />
  </div>
</template>

<script>
// import HelloWorld from './components/check-detail.vue'
// import Test from './components/check-detail-comp/Test.vue'
// import Test from './components/text-expand-collapse/test.vue'
// import Test from './components/form-builder-comp/test.vue'
// import Test from './components/check-detail-comp/LastTest.vue'
// import Test from './components/check-detail-comp/Test1.vue'

// import Test from './components/multi-select-tree/test.vue';
// import Test from './components/custom-category/test.vue';
// import Test from './components/form-builder-comp/test.vue';
// import Test from './components/drag-tabs/test.vue'; 
// import Test from './components/test-cacsder/test.vue'
import Test from './components/check-details/test.vue'
// import Test from './components/uploadTable/test'
// import Test from './components/knowledgeManage/browse/index'
export default {
  name: 'App',
  components: {
    Test
  },
  data() {
    return {
      text: '王阳明王阳明'.repeat(30)
    }
  }
}
</script>

<style>
html,
body {
  margin: 0;
  height: 100%;
}

#app {
  height: 100%;
}
</style>
