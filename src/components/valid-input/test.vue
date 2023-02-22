<template>
	<div class="valid-input">
		<el-input v-model="value" @input="handleInput" />
	</div>
</template>

<script>
	export default {
	  name: 'valid-input',
	  data() {
	    return {
	      value: ''
	    }
	  },
	  methods: {
	    handleInput(val) {
	      console.log(val);
	      this.value = val.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '');
	    }
	  }
	}
</script>
