import {reqGetBannerList,reqFloorList} from '@/api'
// 仓库存放数据的地方
const state = {
	bannerList:[],
	floorList:[],
}
// 修改sate的唯一手段
const mutations = {
	GETBANNERLIST(state,bannerList){
		state.bannerList = bannerList
	},
	GETFLOORLIST(state,floorList){
		state.floorList = floorList
	}
}
// 写自己的业务逻辑，处理异步
const actions = {
	async getBannerList({commit}){
		let result = await reqGetBannerList()
		if(result.code == 200){
			commit('GETBANNERLIST',result.data)
		}
	},
	async getFloorList({commit}){
		let result = await reqFloorList()
		if(result.code == 200){
			commit('GETFLOORLIST',result.data)
		}
	}
}
// 理解为计算属性，用于简化仓库数据
const getters = {}

export default {state,mutations,actions,getters}