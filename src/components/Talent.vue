<template>
	<div class="Talent">
		<slot></slot>
		<h2>这是子组件</h2>
		<Children v-bind="$attrs" v-on="$listeners" />
	</div>
</template>

<script>
import Children from '@c/children.vue';
export default {
	name: 'Talent',
	inheritAttrs: false, //将父组件传给子组件但是没有用props接收的值，从dom清除掉     this.$attrs：父组件传递下来的但是在你调用的那组件（this）里没注册使用的，需要继续传递下去的所有
	props: {
		dataList: {
			type: Number,
			default() {
				return false;
			}
		}
		// dataId: {}
	},
	data() {
		return {};
	},
	created() {
		// console.log('this.$attrs :>> ', this.$attrs);
		// console.log('this.$attrs :>> ', this.$listeners);
		// console.log('子组件created生命周期 :>> ', '子组件created生命周期');
	},
	mounted() {
		// console.log('子组件mounted生命周期 :>> ', '子组件mounted生命周期');
		this.$nextTick(() => {});
	},
	methods: {},
	computed: {},
	watch: {
		'time.Unix': function (newVal, oldVal) {},
		deep: true,
		immediate: true
	},
	components: {
		Children
	}
};
</script>
<style lang="scss" scope>
.Talent {
	border: 6px solid blue;
	font-size: px2rem(40);
	padding-top: px2rem(40);
	font-weight: bold;
	color: red;
	text-align: center;
}
</style>