<template>
	<v-card class="mx-auto" max-width="">
		<v-toolbar color="pink" dark>
			<v-toolbar-title>导航</v-toolbar-title>
		</v-toolbar>

		<v-list two-line>
			<v-list-item-group v-model="selected" active-class="pink--text" multiple>
				<template v-for="(item, index) in items">
					<v-list-item :key="item.title" @click="goRouter(item.navName)">
						<template v-slot:default="{ active }">
							<v-list-item-content>
								<v-list-item-title v-text="item.title"></v-list-item-title>

								<v-list-item-subtitle class="text--primary" v-text="item.navName"></v-list-item-subtitle>

								<v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
							</v-list-item-content>

							<v-list-item-action>
								<v-list-item-action-text v-text="item.action"></v-list-item-action-text>

								<v-icon v-if="!active" color="grey lighten-1"> mdi-star-outline </v-icon>

								<v-icon v-else color="yellow darken-3"> mdi-star </v-icon>
							</v-list-item-action>
						</template>
					</v-list-item>

					<v-divider v-if="index < items.length - 1" :key="index"></v-divider>
				</template>
			</v-list-item-group>
		</v-list>
		<router-view></router-view>
	</v-card>
</template>

<script>
// @ is an alias to /src
export default {
	name: 'Navs',
	data() {
		return {
			selected: [0],
			items: [
				{
					action: '',
					navName: '/vue2',
					subtitle: ``,
					title: 'vue2Learn'
				},
				{
					action: '',
					navName: '/apply-call',
					subtitle: ``,
					title: 'Apply Call 的使用'
				}
			]
		};
	},
	created() {},
	mounted() {},
	methods: {
		goRouter(name) {
			console.log('name :>> ', name);
			this.$router.push({ path: name });
		}
	},
	components: {}
};
</script>
<style lang="scss" scope>
</style>