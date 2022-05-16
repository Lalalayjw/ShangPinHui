<template>
	<div class="type-nav">
		<div class="container">
			<div class="container" @mouseleave="leaveShow" @mouseenter="enterShow" style="width: 1500px;">
				<h2 class="all">全部商品分类</h2>
				<nav class="nav">
					<a href="###">服装城</a>
					<a href="###">美妆馆</a>
					<a href="###">尚品汇超市</a>
					<a href="###">全球购</a>
					<a href="###">闪购</a>
					<a href="###">团购</a>
					<a href="###">有趣</a>
					<a href="###">秒杀</a>
				</nav>

				<div class="sort" v-show="show">
					<!-- 事件委派 -->
					<div class="all-sort-list2" @click="goSearch">
						<div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryId"
							:class="{cur:currentIndex==index}">
							<h3 @mouseenter="changeIndex(index)">
								<a :data-categoryName="c1.categoryName"
									:data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
								<!-- 3级联动的声明导航式跳转会非常卡 -->
								<!-- <router-link to="/search">{{c1.categoryName}}</router-link> -->
							</h3>
							<div class="item-list clearfix" :style="{display:currentIndex == index ? 'block':'none'}">
								<div class="subitem" v-for="(c2,index2) in c1.categoryChild" :key="c2.categoryId">
									<dl class="fore">
										<dt>
											<a :data-categoryName="c2.categoryName"
												:data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
										</dt>
										<dd>
											<em v-for="(c3,index3) in c2.categoryChild" :key="c3.categoryId">
												<a :data-categoryName="c3.categoryName"
													:data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
											</em>
										</dd>
									</dl>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {onMounted,computed,ref} from 'vue'
	import {useStore,mapState} from 'vuex'
	// 引入路由
	// import router from '@/router'
	import {useRouter,useRoute} from 'vue-router'
	//  Single file component can contain only one <script> element,在script标签内引入也不生效
	import throttle from 'lodash/throttle.js'
	export default {
		name: 'TypeNav',
		setup() {
			let show = ref(true)
			const store = useStore()
			// store.dispatch('categoryList')
			let currentIndex = ref(-1)
			let categoryList = computed(() => {
				return store.state.search.categoryList
			})
			let changeIndex = throttle(function(index) {
				currentIndex.value = index
			}, 50)
			const router = useRouter()
			const route = useRoute()

			function leaveShow() {
				if (route.path != '/home')
					show.value = false
				currentIndex.value = -1
			}

			function enterShow() {
				show.value = true
			}

			function leaveIndex(index) {
				currentIndex.value = -1
			}
			
			function goSearch(event) {
				let element = event.target
				let {
					categoryname,
					category1id,
					category2id,
					category3id
				} = element.dataset
				if (categoryname) {
					let query = {
						categoryName: categoryname
					}
					let location = {
						name: "search"
					}
					if (category1id) {
						query.category1Id = category1id
					} else if (category2id) {
						query.category2Id = category2id
					} else if (category3id) {
						query.category3Id = category3id
					}
					if(route.query['keyword'])
						query['keyword'] = route.query['keyword']
					location.query = query
					// 使用name配置的话要在配置路由时加上name属性
					// 并且引入router(useRouter或者引入自己的@/router都行，但是useRouter需要在函数外定义)
					router.push(location)
					// router.push({name:'search',query:{c1:1}})
				}
			}
			onMounted(() => {
				const route = useRoute()
				if (route.path != '/home'){
					show.value = false
				}
			})
			return {
				currentIndex,
				categoryList,
				changeIndex,
				leaveIndex,
				goSearch,
				leaveShow,
				enterShow,
				show,
			}

		}
	}
</script>

<style scoped="" lang="less">
	.type-nav {
		border-bottom: 2px solid #e1251b;

		.container {
			width: 1200px;
			margin: 0 auto;
			display: flex;
			position: relative;

			.all {
				width: 210px;
				height: 45px;
				background-color: #e1251b;
				line-height: 45px;
				text-align: center;
				color: #fff;
				font-size: 14px;
				font-weight: bold;
			}

			.nav {
				a {
					height: 45px;
					margin: 0 22px;
					line-height: 45px;
					font-size: 16px;
					color: #333;
				}
			}

			.sort {
				position: absolute;
				left: 0;
				top: 45px;
				width: 210px;
				height: 461px;
				position: absolute;
				background: #fafafa;
				z-index: 999;

				.all-sort-list2 {
					.item {
						h3 {
							line-height: 30px;
							font-size: 14px;
							font-weight: 400;
							overflow: hidden;
							padding: 0 20px;
							margin: 0;

							a {
								color: #333;
							}
						}

						.item-list {
							display: none;
							position: absolute;
							width: 734px;
							min-height: 460px;
							background: #f7f7f7;
							left: 210px;
							border: 1px solid #ddd;
							top: 0;
							z-index: 9999 !important;

							.subitem {
								float: left;
								width: 650px;
								padding: 0 4px 0 8px;

								dl {
									border-top: 1px solid #eee;
									padding: 6px 0;
									overflow: hidden;
									zoom: 1;

									&.fore {
										border-top: 0;
									}

									dt {
										float: left;
										width: 54px;
										line-height: 22px;
										text-align: right;
										padding: 3px 6px 0 0;
										font-weight: 700;
									}

									dd {
										float: left;
										width: 415px;
										padding: 3px 0 0;
										overflow: hidden;

										em {
											float: left;
											height: 14px;
											line-height: 14px;
											padding: 0 8px;
											margin-top: 5px;
											border-left: 1px solid #ccc;
										}
									}
								}
							}
						}
					}

					.cur {
						background-color: skyblue;
					}
				}
			}

			// .sort-enter {
			// 	height: 0px;
			// 	overflow: hidden;
			// }

			// // .sort-enter-to{
			// // 	height: 461px;
			// // 	overflow: hidden;
			// // 	background-color: blue;
			// // }
			// .sort-enter-active {
			// 	transition: all 3.5s linear;
			// }
		}
	}
</style>
