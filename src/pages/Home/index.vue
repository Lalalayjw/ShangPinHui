<template>
	<router-link :to="`/detail/29`"><button>detail</button></router-link>
	<TypeNav></TypeNav>
	<ListContainer></ListContainer>
	<Recommend></Recommend>
	<Rank></Rank>
	<Like></Like>
	<Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"></Floor>
	<Brand></Brand>
</template>

<script>
	import ListContainer from './ListContainer'
	import Recommend from './Recommend'
	import Rank from './Rank'
	import Like from './Like'
	import Floor from './Floor'
	import Brand from './Brand'
	import {computed,ref,onMounted} from 'vue'
	import {useStore} from 'vuex'
	export default{
		name:'',
		components:{ListContainer,Recommend,Rank,Like,Floor,Brand},
		setup(){
			const store = useStore()
			
			let floorList = computed(() => {
				return store.state.home.floorList
			})
			
			onMounted(() => {
				
			})
			return {
				floorList,
			}
		}
	}
</script>

<style>
</style>
