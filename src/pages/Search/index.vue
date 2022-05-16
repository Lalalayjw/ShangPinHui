<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="searchParams.categoryName">{{searchParams.categoryName}}<i @click="removeCategoryName">×</i></li>
			<li class="with-x" v-if="searchParams.keyword">{{searchParams.keyword}}<i @click="removeKeyword">×</i></li>
			<li class="with-x" v-if="searchParams.trademark">{{searchParams.trademark.split(':')[1]}}<i @click="removeTrademark">×</i></li>
			<li class="with-x" v-for="(attrValue,index) in searchParams.props" :key="index">{{attrValue.split(":")[1]}}<i @click="removeAttr(index)">×</i></li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkHandler="trademarkInfo" @attrInfo="attrInfo"/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active:isOne}" @click="changeOrder('1')">
                  <a>综合<span v-show="isAsc&&isOne">⬆</span><span v-show="isDesc&&isOne">⬇️</span></a>
                </li>
                <li :class="{active:isTwo}" @click="changeOrder('2')">
                  <a>价格<span v-show="isAsc&&isTwo">⬆</span><span v-show="isDesc&&isTwo">⬇️</span></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="(good,index) in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
					  <router-link :to="`/detail/${good.id}`"><img :src="good.defaultImg" /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{good.price}}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="good.title">{{good.title}}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>{{good.id}}</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <Pagination :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="searchList.total" :continues="5" @getPageNo="getPageNo"></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
   import SearchSelector from './SearchSelector/SearchSelector'
   import {useRoute,useRouter} from 'vue-router'
   import {ref,reactive,onMounted,computed,onBeforeMount,watch} from 'vue'
   import {useStore,mapGetters} from 'vuex'
	const route = useRoute()
	const router = useRouter()
	let keyWord = ref(route.query.keyWord)
	const store = useStore()
	let searchList = computed(() => {
		return store.state.searchInfo.searchList
	})
	let isOne = computed(() => {
		return searchParams.order.indexOf('1')!=-1
	})
	let isTwo = computed(()=>{
		return searchParams.order.indexOf('2')!=-1
	})
	let isAsc = computed(()=>{
		return searchParams.order.indexOf('asc')!=-1
	})
	let isDesc = computed(()=>{
		return searchParams.order.indexOf('desc')!=-1
	})
	let searchParams = reactive({
		"category1Id": "",
		"category2Id": "",
		"category3Id": "",
		"categoryName": "",
		"keyword": "",
		"order": "1:desc",
		"pageNo": 10,
		"pageSize": 5,
		"props": [],
		"trademark": "",
	})
	let goodsList = computed(() => {
		return store.getters.goodsList
	})
	function getPageNo(pageNo){
		searchParams.pageNo = pageNo
		getData()
	}
	function removeCategoryName(){
		// undefined的数据不会发送给服务器
		searchParams.categoryName = undefined
		searchParams.category1Id = undefined
		searchParams.category2Id = undefined
		searchParams.category3Id = undefined
		getData()
		if(route.query['keyword']){
			router.push({name:'search',query:{keyword:route.query['keyword']}})
		}
		else
			router.push({name:'search'})
	}
	function removeKeyword(){
		// undefined的数据不会发送给服务器
		searchParams.keyword = undefined
		getData()
		let query = route.query
		query.keyword = undefined
			router.push({name:'search',query})
	}
	function removeTrademark(){
		searchParams.trademark = undefined
		getData()
	}
	function removeAttr(index){
		searchParams.props.splice(index,1)
		getData()
	}
	watch(route,()=>{
		// 清空一次id,否则会累加
		searchParams.category1Id = ''
		searchParams.category2Id = ''
		searchParams.category3Id = ''
		Object.assign(searchParams,route.query)
		getData()
	})
	function getData(){
		store.dispatch('getSearchList',searchParams)
	}
	function trademarkInfo(trademark){
		searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
		getData()
	}
	function attrInfo(attr,attrValue){
		console.log(attr,attrValue)
		let props = `${attr.attrId}:${attrValue}:${attr.attrName}`
		if(searchParams.props.indexOf(props)==-1)
			searchParams.props.push(props)
		getData()
	}
	function changeOrder(flag){
		let originOrder = searchParams.order
		let originFlag = searchParams.order.split(":")[0]
		let originSort = searchParams.order.split(":")[1]
		let newOrder = ""
		if(flag == originFlag){
			newOrder = `${originFlag}:${originSort == 'desc' ? 'asc' : 'desc'}`
		}
		else{
			newOrder = `${flag}:desc`
		}
		searchParams.order = newOrder
		getData()
	}
	onBeforeMount(() => {
		//合并对象，es6新增
		// 待解决问题:点击搜索或跳转不会重新加载页面，点击搜索时页面加载的是上一次搜索的结果
		// x掉keyword时需要通知header清除keyword显示
		// 品牌面包屑通信searchSelector组件传递trademark到search（emit），需要写<scrpit setup>
		Object.assign(searchParams,route.query)
		
	})
	onMounted(() => {
		getData()	
	})
</script>

<style lang="less" scoped>
  .main {
    margin: 10px 0;

    .py-container {
      width: 1200px;
      margin: 0 auto;

      .bread {
        margin-bottom: 5px;
        overflow: hidden;

        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;

          li {
            display: inline-block;
            line-height: 18px;

            a {
              color: #666;
              text-decoration: none;

              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }

        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;

          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;

            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }

            &:hover {
              color: #28a3ef;
            }
          }
        }
      }

      .details {
        margin-bottom: 5px;

        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;

          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;

              li {
                float: left;
                line-height: 18px;

                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }

                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;
                  }
                }
              }
            }
          }
        }

        .goods-list {
          margin: 20px 0;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;

              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;

                  a {
                    color: #666;

                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }

                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    i {
                      margin-left: -5px;
                    }
                  }
                }

                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;

                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }

                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;

                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }

                .operate {
                  padding: 12px 15px;

                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }

                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;

                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }

                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;

                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }

        .page {
          width: 733px;
          height: 66px;
          overflow: hidden;
          float: right;

          .sui-pagination {
            margin: 18px 0;

            ul {
              margin-left: 0;
              margin-bottom: 0;
              vertical-align: middle;
              width: 490px;
              float: left;

              li {
                line-height: 18px;
                display: inline-block;

                a {
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  border: 1px solid #e0e9ee;
                  margin-left: -1px;
                  font-size: 14px;
                  padding: 9px 18px;
                  color: #333;
                }

                &.active {
                  a {
                    background-color: #fff;
                    color: #e1251b;
                    border-color: #fff;
                    cursor: default;
                  }
                }

                &.prev {
                  a {
                    background-color: #fafafa;
                  }
                }

                &.disabled {
                  a {
                    color: #999;
                    cursor: default;
                  }
                }

                &.dotted {
                  span {
                    margin-left: -1px;
                    position: relative;
                    float: left;
                    line-height: 18px;
                    text-decoration: none;
                    background-color: #fff;
                    font-size: 14px;
                    border: 0;
                    padding: 9px 18px;
                    color: #333;
                  }
                }

                &.next {
                  a {
                    background-color: #fafafa;
                  }
                }
              }
            }

            div {
              color: #333;
              font-size: 14px;
              float: right;
              width: 241px;
            }
          }
        }
      }
    }
  }
</style>