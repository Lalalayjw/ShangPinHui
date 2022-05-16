// 对api进行统一管理
import requests from './requests.js'
import mockRequests from './mockAjax.js'
export const reqCategoryList = () => {
	// 三级联动数据接口
	return requests({url:'/api/product/getBaseCategoryList',method:'get'})
}

export const reqGetBannerList = () => mockRequests.get('/banner')

export const reqFloorList = () => mockRequests.get('/floor')

//api/list post

export const reqGetSearchInfo = (params) =>{
	return requests({url:"/api/list",data:params,method:"post"})
}
export const reqGoodsInfo = (skuId) => requests({url:`/api/item/${skuId}`,method:'get'})