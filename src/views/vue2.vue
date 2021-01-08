<template>
	<div class="containers">
		<router-view />
		<Footer />
	</div>
</template>

<script>
// @ is an alias to /src
import Footer from '@c/common/footer.vue';
export default {
	name: 'Home',
	data() {
		return {};
	},
	created() {},
	mounted() {},
	methods: {},
	components: {
		Footer
	}
};
</script>
<style lang="scss" scope>
.containers {
	// border: 10px solid #000000;
	h1 {
		font-size: px2rem(40);
		color: red;
		font-weight: bold;
		text-align: center;
	}
	position: relative;
}
</style>