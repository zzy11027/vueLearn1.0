<template>
	<div class="Describe">
		<h1>1:computed:(vm)=>{}写法、function(){}写法、</h1>
		<h1>2:watch:'obj.xxx':function(){}、 'obj.xxx': '方法名'、deep: true深度监测、immediate: true监听后立即调用。</h1>
		<h1>3:$attrs,$linstens实现嵌套层级过多时的组件通信。</h1>
		<h1>
			4:inheritAttrs: false, //将父组件传给子组件但是没有用props接收的值，从dom清除掉
			this.$attrs：父组件传递下来的但是在你调用的那组件（this）里没注册使用的，需要继续传递下去的所有
		</h1>
		<h1>5:父子通信bus方式：main.js---->vm原型上注册bus</h1>
		<h1>6:待更新____测试更改哦</h1>
	</div>
</template>

<script>
export default {
	name: 'Describe',
	props: {},
	data() {
		return {};
	},
	created() {},
	mounted() {
		this.$bus.$on('testBUS', (a) => {
			// console.log(a);
		});
	},
	methods: {},
	computed: {}
};
</script>
<style lang="scss" scope>
.Describe {
	h1 {
		font-weight: normal !important;
		color: #000 !important;
	}
}
</style>