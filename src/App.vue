<!--
 * @Date: 2022-10-28 10:47:45
 * @LastEditors: 刘荣 liurong@mastercom.cn
 * @LastEditTime: 2022-11-28 20:33:16
 * @FilePath: \common-project\elementui-component\src\App.vue
-->
<template>
  <div id="app">
    <Test labelId="exp" :text="text"/>
  </div>
</template>

<script>
// import HelloWorld from './components/check-detail.vue'
// import Test from './components/check-detail-comp/Test.vue'
// import Test from './components/text-expand-collapse/test.vue'
// import Test from './components/form-builder-comp/test.vue'
// import Test from './components/check-detail-comp/LastTest.vue'
// import Test from './components/check-detail-comp/Test1.vue'

import Test from './components/multi-select-tree/test.vue';

export default {
  name: 'App',
  components: {
    Test
  },
  data () {
    return {
      text: '王阳明王阳明'.repeat(30)
    }
  }
}
</script>

<style>
#app {
  
}
</style>
