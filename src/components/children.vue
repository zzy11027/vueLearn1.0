<template>
	<div class="Children" @click="listen">这是孙子组件</div>
</template>

<script>
export default {
	name: 'Children',
	inheritAttrs: false, //将父组件传给子组件但是没有用props接收的值，从dom清除掉     this.$attrs：父组件传递下来的但是在你调用的那组件（this）里没注册使用的，需要继续传递下去的所有
	props: {},
	data() {
		return {};
	},
	created() {},
	mounted() {
		console.log('孙子组件已经拿到了$attrs :>> ', this.$attrs);
	},
	methods: {
		listen() {
			this.$emit('upRocket', '已经成功实现了父组件和孙子组件之间的通信，事件流是自内到外。');
			// this.$bus.$emit('testBUS', '测试bus总线,实现无关系的兄弟组件通信');
		}
	},
	computed: {}
};
</script>
<style lang="scss" scope>
.Children {
	color: #000;
	background: crimson;
}
</style>