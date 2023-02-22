<!-- 自定义类别组件 -->
<template>
	<span class="edit-tag" :class="{ active: isEdit }">
		<el-tag
			:style="{ visibility: !isEdit ? 'visible' : 'hidden' }"
			class="tag"
			size="mini"
			type="info"
      @click="handleClkTag"
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
			isEdit: {
				type: Boolean,
				default: false,
			}
		},
		data() {
			return {
        
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
				// this.isEdit = !this.isEdit;
        this.$emit('blurTag');
			},
      handleClkTag(item) {
        this.$emit('clickTag', item);
      },

		},
	};
</script>

<style lang="less" scoped>
	.edit-tag {
		position: relative;
		display: inline-block;
		min-width: 60px;
		max-width: 300px;
		line-height: 24px;
		height: 24px;
		border: 1.5px solid transparent;
		&.active {
			border: 1.5px solid #409eff;
		}
		.tag {
			display: flex;
			padding: 0 8px;
			width: 100%;
			height: 100%;
			justify-content: end;
			align-items: center;
			border-radius: 0;
			border: none;
			color: #454545;
			&:hover {
				cursor: pointer;
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
				height: 100%;
				outline: none;
				border: none;
			}
		}
	}
</style>
