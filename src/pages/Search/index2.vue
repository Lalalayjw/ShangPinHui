<template>
	<TypeNav></TypeNav>
</template>

<script>
	import {useRoute,beforeRouteUpdate} from 'vue-router'
	import {ref,reactive} from 'vue'
	import TypeNav from '@/components/TypeNav'
	export default{
		name:'Search',
		setup(){
			const route = useRoute()
			let keyWord = ref(route.query.keyWord)
			return {
				keyWord
			}
		}
	}
</script>

<style>
</style>