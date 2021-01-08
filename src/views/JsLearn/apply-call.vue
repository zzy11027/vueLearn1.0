<template>
	<div>apply</div>
</template>

<script>
// @ is an alias to /src
import { Student } from '@/utils/learn/apply-call';

export default {
	name: 'apply-call',
	data() {
		return {};
	},
	created() {},
	mounted() {
		const student = new Student('李四', 23, '男');
		console.log('student :>> ', student);
	},
	methods: {},
	components: {}
};
</script>
<style lang="scss" scope>
</style>