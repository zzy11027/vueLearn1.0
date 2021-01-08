<template>
	<div class="Footer">
		<router-link to="/vue2/vue2Learn" tag="div">vue2Learn</router-link>
		<router-link to="/vue2/otherLearn" tag="div">Other</router-link>
	</div>
</template>

<script>
export default {
	name: 'Footer',
	props: {},
	data() {
		return {};
	},
	created() {},
	mounted() {
		// console.log('孙子组件已经拿到了$attrs :>> ', this.$attrs);
	},
	methods: {},
	computed: {}
};
</script>
<style lang="scss" scope>
.Footer {
	width: 100%;
	height: px2rem(100);
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: fixed;
	bottom: 0;
	background-color: #e6e6e6;
	div {
		width: 50%;
		text-align: center;
		font-weight: bold;
		font-size: px2rem(18);
		color: #000;
	}
}
</style>