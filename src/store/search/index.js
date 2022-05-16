import {reqCategoryList} from '@/api'
// 仓库存放数据的地方
const state = {categoryList:[]}
// 修改sate的唯一手段
const mutations = {
	CATEGORYLIST(state,categoryList){
		state.categoryList = categoryList
	},
}
// 写自己的业务逻辑，处理异步
const actions = {
	async categoryList({commit}){
		let result = await reqCategoryList()
		if(result.code === 200){
			commit('CATEGORYLIST',result.data)
		}
	},
}
// 理解为计算属性，用于简化仓库数据
const getters = {}

// 报错[vuex] unknown action type: search/categoryList
// 不适用命名空间和createStore
export default {state,mutations,actions,getters}