<template>
	<div class="swiperAll">
		<swiper class="swiper" ref="mySwiper" :options="swiperOptions">
			<swiper-slide>这是轮播组件 1</swiper-slide>
			<swiper-slide>这是轮播组件 2</swiper-slide>
			<swiper-slide>这是轮播组件 3</swiper-slide>
			<swiper-slide>这是轮播组件 4</swiper-slide>
			<swiper-slide>这是轮播组件 5</swiper-slide>
			<div class="swiper-pagination" slot="pagination"></div>
		</swiper>
	</div>
</template>

<script>
// @ is an alias to /src

export default {
	name: 'HomeSwiper',
	data() {
		return {
			swiperOptions: {
				pagination: {
					el: '.swiper-pagination'
				},
				observer: true,
				observeParents: true,
				loop: true,
				autoplay: {
					delay: 1000,
					stopOnLastSlide: false,
					disableOnInteraction: true
				}
				// Some Swiper option/callback...
			}
		};
	},
	created() {},
	mounted() {
		// console.log('Current Swiper instance object', this.swiper);
		// this.swiper.slideTo(3, 1000, false);
	},
	methods: {},
	computed: {
		swiper() {
			return this.$refs.mySwiper.$swiper;
		}
	}
};
</script>
<style lang="scss" scope>
.swiperAll {
	position: relative;
	border: 6px solid red;
	.swiper {
		width: 100%;
		height: px2rem(400);
		font-size: px2rem(30);
		font-weight: bold;
		text-align: center;
		color: red;
	}
}
</style>