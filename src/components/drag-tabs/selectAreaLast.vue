<!-- 自定义类别组件 -->
<template>
	<span class="edit-tag" :class="{ active: isActive }">
		<el-tag
			:style="{ visibility: !isEdit ? 'visible' : 'hidden' }"
			class="tag"
			size="medium"
			closable
      @click="handleClkTag()"
			@dblclick.native="() => handleDblclick()"
      @close="delTag()"
			>{{ label }}</el-tag
		>
		<el-input
			v-focus
			v-show="isEdit"
			v-model="label"
			class="edit-input"
			size="mini"
			@blur="() => handleBlur()"
		/>
	</span>
</template>

<script>
	export default {
		name: 'edit-tag',
		model: {
			prop: 'value',
			event: 'input',
		},
		props: {
      value: {
        type: String,
        default: '',
        required: true,
      },
			isActive: {
				type: Boolean,
				default: false,
			},
		},
		data() {
			return {
        isEdit: false,
			};
		},
    computed: {
      label: {
        get() {
          return this.value;
        },
        set(newVal) {
          this.$emit('input', newVal);
        }
      }
    },
		directives: {
			focus: {
				// 指令的定义
				inserted(el) {
					el.querySelector('.el-input__inner').focus();
				},
			},
		},
		watch: {},
		methods: {
			handleBlur() {
				this.isEdit = !this.isEdit;
        this.$emit('blurTag');
			},
      handleClkTag(item) {
        this.$emit('clickTag', item);
      },
			handleDblclick() {
				this.isEdit = !this.isEdit;
        this.$emit('dblclickTag');
			},
      delTag () {
        this.$emit('delTag');
      }
		},
	};
</script>

<style lang="less" scoped>
	.edit-tag {
		position: relative;
		display: inline-block;
		min-width: 60px;
		border: 1.5px solid #d9ecff;
		&.active {
			border: 1.5px solid #66b1ff;
		}
		.tag {
			display: flex;
			padding: 0 8px;
			width: 100%;
			justify-content: end;
			align-items: center;
			border-radius: 0;
			border: none;
			color: #454545;
			background-color: #edf3ff;
			&:hover {
				cursor: pointer;
			}
			/deep/ .el-icon-close {
				top: 0;
				font-size: 16px;
			}
		}
		.edit-input {
			display: inline-block;
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			/deep/ .el-input__inner {
				padding: 0 8px;
				outline: none;
				border: none;
			}
		}
	}
</style>
