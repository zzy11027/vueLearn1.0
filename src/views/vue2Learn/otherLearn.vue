<template>
	<div class="otherLearn">
		<div v-for="item in arr" :key="item" :ref="item">{{ item }}</div>
	</div>
</template>

<script>
// @ is an alias to /src
export default {
	name: 'otherLearn',
	data() {
		return {
			arr: [1, 2, 3, 4]
		};
	},
	created() {},
	mounted() {
		console.log('this.$refs :>> ', this.$refs);
	},
	methods: {},
	components: {}
};
</script>
<style lang="scss" scope>
</style>