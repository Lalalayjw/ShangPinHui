import {reqGoodsInfo} from '@/api'
const state = {
	goodInfo:{},
}
const mutations = {
	GETGOODINFO(state,goodInfo){
		state.goodInfo = goodInfo
	}
}
const actions = {
	// params={},默认参数，没有传params的话就为空对象
	async getGoodInfo({commit},skuId){		
		let result = await reqGoodsInfo(skuId)
		console.log('result:',result)
		if(result.code == 200){
			commit('GETGOODINFO',result.data)
		}
	},
}
const getters = {
	categoryView(){
		return state.goodInfo.categoryView || {}
	},
	skuInfo(){
		return state.goodInfo.skuInfo|| {}
	}
}
export default {
	state,
	mutations,
	actions,
	getters,
}