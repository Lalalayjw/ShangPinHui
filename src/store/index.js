import {createStore} from 'vuex'
import home from './home'
import search from './search'
import searchInfo from './searchInfo.js'
import detail from './detail.js'
export default createStore({
	modules:{
		home,search,searchInfo,detail
	}
})