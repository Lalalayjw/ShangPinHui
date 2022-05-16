import {reqGetSearchInfo} from '@/api'
const state = {
	searchList:{},
}
const mutations = {
	GETSEARCHLIST(state,searchList){
		state.searchList = searchList
	}
}
const actions = {
	// params={},默认参数，没有传params的话就为空对象
	async getSearchList({commit},params={}){
		let result = await reqGetSearchInfo(params)
		if(result.code == 200){
			commit('GETSEARCHLIST',result.data)
		}
	},
}
const getters = {
	goodsList(){
		return state.searchList.goodsList||[]
	},
	attrsList(){
		return state.searchList.attrsList||[]
	},
	trademarkList(){
		return state.searchList.trademarkList||[]
	},
}
export default {
	state,
	mutations,
	actions,
	getters,
}