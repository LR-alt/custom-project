<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-04-30 19:16:00
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-05-05 22:37:21
 * @FilePath: \webStormProjectse:\componyProject\element-comps\elementui-common-comps\src\components\test-jsx\test.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<!-- <template>
  <div>
    <component :is="`h${tag}`">text</component>
    <el-button primary="success" @click="addTag">add tag</el-button>
  </div>
</template> -->

<script>
export default {
  name: 'test-jsx',
  data() {
    return {
      tag: ''
    }
  },
  methods: {
    addTag() {
      if (this.tag < 7) {
        this.tag++;
      } else {
        this.tag = 1;
      }
    },
  },
  render() {
      return (
        <div class="wrap">
          <span class="tag">我是tag标签</span>
          <span>我们需要抓住时代的红利</span>
        </div>
      )
    }
}
</script>