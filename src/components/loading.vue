<template>
	<div class="Loading">
		<h1>Loading页面{{ percent }}</h1>
	</div>
</template>

<script>
export default {
	name: 'Loading',
	props: {
		percent: {
			type: String,
			default() {
				return false;
			}
		}
	},
	data() {
		return {};
	},
	created() {},
	mounted() {
		this.$nextTick(() => {});
	},
	methods: {}
};
</script>
<style lang="scss" scope>
.Loading {
	border: 6px solid blue;
	font-size: px2rem(40);
	padding-top: px2rem(40);
	font-weight: bold;
	color: red;
	text-align: center;
}
</style>