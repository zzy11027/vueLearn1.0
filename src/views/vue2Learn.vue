<template>
	<div class="vue2Learn">
		<Loading :percent="percent" v-if="renderLoading" />
		<h1>{{ a }}</h1>
		<!-- <h1 :data-id.prop="1" @click="test">{{ b }}</h1> -->
		<Swiper />
		<Talent :bar="testAttrs" :dataList.sync="typeOne" :data-id="123" @upRocket="testListens" v-if="!getLiveJson.length">
			<h3>123</h3>
		</Talent>
		<Describe />
	</div>
</template>

<script>
// @ is an alias to /src
import Talent from '@c/Talent.vue';
import Swiper from '@c/swiper.vue';
import Describe from '@c/describe.vue';
import Loading from '@c/loading.vue';
// 导入图片预加载方法以及图片列表
import { imgPreloader } from '@/utils/imgPreloader.js';
// import { imgPreloader, imgsPreloader } from '@/utils/imgPreloader.js';//此方式引入监测不到图片加载数量，改为下面方法
import imgPreloaderList from '@/utils/imgPreloaderList.js'; //将imgsPreloader引入内部await函数用来监测图片加载数量从而计算百分比
export default {
	name: 'vue2Learn',
	data() {
		return {
			getLiveJson: [], //ajax json数据
			isRender: false, //是否切换模块
			typeOne: 1,
			testAttrs: ['a', 'b', 'c', 'd'],
			renderLoading: true, //预加载loading组件是否应该渲染
			count: 0, //百分比,
			percent: '' //百分比
		};
	},
	created() {
		// console.log('父组件created生命周期 :>> ', '父组件created生命周期');
		this.getData();
		setInterval(() => {
			this.getData();
		}, 5000);
	},
	mounted() {
		console.log('this.vuetify :>> ', this.$vuetify);
		(async () => {
			const imageLength = await this.imgsPreloader(imgPreloaderList);
			//关闭加载弹框
			// console.log('imageLength :>> ', imageLength);
			if (imageLength.length != 0) {
				this.renderLoading = false;
			}
		})();
		// console.log('父组件mounted生命周期 :>> ', '父组件mounted生命周期');
		// console.log(
		// 	'所以说 :>> ',
		// 	'子组件比父组件先mounted，这也就是为啥在子组件的mounted钩子函数里面拿不到父组件传过来的异步数据'
		// );
		// this.wxshare(1);
	},
	methods: {
		imgsPreloader(imgs) {
			let promiseArr = [];
			imgs.forEach((element, index) => {
				imgPreloader(element).then((as) => {
					// console.log('as :>> ', as, index);
					this.count++;
					let percentNum = Math.floor((this.count / 15) * 100);
					this.percent = `${percentNum}%`;
				});
				promiseArr.push(imgPreloader(element));
			});
			return Promise.all(promiseArr);
		},
		test(e) {
			// console.log('e.target :>> ', e.target.dataset);
			// console.log('e.target :>> ', e.target.dataId);
		},
		testListens(params) {
			console.log('params :>> ', params);
		},
		getData() {
			this.HTTPS.fetchGet(`${this.baseURL.value}get-anchor`)
				.then((res) => {})
				.catch((res) => {});
		},
		wxshare(e) {
			this.wxConfig.wxShowMenu({
				titles: '宝藏天津  嘛都开心。',
				descs: '8月11日11:30-22:30，快来直播间一起探索天津的宝藏吧！',
				link: 'https://mbd.baidu.com/webpage?type=live&action=treasure',
				imgUrl: 'https://mbdp02.bdstatic.com/static/treasure/img/share.jpg',
				path: 'https://mbd.baidu.com/webpage?type=live&action=treasure'
				// path: window.location.href.split('#')[0]
			});
		}
	},
	components: {
		Talent,
		Swiper,
		Describe,
		Loading
	},
	filters: {
		multiple: function (value1, value2, value3) {
			// console.log('value1 :>> ', value1);
			return parseInt(value1 * 100) + '%';
		}
	},
	computed: {
		a: (vm) => {
			return '这是父组件，通过computed缓存';
			// console.log('vm :>> ', vm);
		},
		b: function () {
			// console.log('this :>> ', this);
			return 123;
		}
	},
	watch: {
		'future.Unix': function (val, vals) {
			// console.log('val,vals :>> ', val, vals);
		},
		typeOne: function (val, vals) {
			// console.log(this);
		}
	}
};
</script>
<style lang="scss" scope>
.vue2Learn {
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