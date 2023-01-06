<template>
  <div class="text-overflow">
    <input :id="labelId" class="text-overflow__checked" type="checkbox" />
    <div class="text-overflow__content text" :line-clamp="lineClamp">
      <label class="text-overflow__tag btn" :for="labelId"></label>
      {{ text }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'textOverflow',
  props: {
    // 作为input的唯一标识
    labelId: { 
      type: String,
      default: 'exp',
      required: true,
    },
    text: {
      type: [String, Number],
      default: '',
    },
    // 截断行数，默认一行
    lineClamp: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.text-overflow {
  display: flex;
  height: 100%;
  width: 100%; // test
  overflow: hidden;
  &__content {
    position: relative;
    line-height: 1.2;
    text-align: justify;
    text-overflow: ellipsis;
    word-break: break-all;
    overflow: hidden;
    transition: 0.3s max-height;
    &::before {
      content: '';
      height: 100%;
      margin-bottom: -16px;
      float: right;
    }
    &::after {
      content: '';
      width: 999vw;
      height: 999vw;
      position: absolute;
      box-shadow: inset calc(100px - 999vw) calc(30px - 999vw) 0 0 #fff;
      margin-left: -100px;
    }
  }
  &__tag {
    position: relative;
    float: right;
    clear: both;
    margin-left: 18px;
    font-size: 12px;
    line-height: 1.4;
    color: #409eff;
    cursor: pointer;
    &::after {
      content: '展开';
    }
    &::before {
      content: '...';
      position: absolute;
      left: -5px;
      color: #333;
      transform: translateX(-100%);
    }
  }
  &__checked {
    display: none;
    &:checked + .text {
      max-height: none;
    }
    &:checked + .text::after {
      visibility: hidden;
    }
    &:checked + .text .btn::before {
      visibility: hidden;
    }
    &:checked + .text .btn::after {
      content: '收起';
    }
  }
}

[line-clamp='1'] {
  max-height: 1.2em;
}
[line-clamp='2'] {
  max-height: 2.4em;
}
[line-clamp='3'] {
  max-height: 3.6em;
}
[line-clamp='4'] {
  max-height: 4.8em;
}
[line-clamp='5'] {
  max-height: 6em;
}
</style>
