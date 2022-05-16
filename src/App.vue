<template>
	<Header></Header>
	<router-view></router-view>
	<Footer v-show="$route.meta.show"></Footer>
</template>

<script>
	import Header from './components/header'
	import Footer from './components/footer'
	import {useStore} from 'vuex'
	import {ref,reactive,toRefs,toRef,shallowReactive,shallowRef,readonly,shallowReadonly,customRef,onMounted} from 'vue'
	export default {
	  name: 'App',
	  components: {
		  Header,Footer
	  },
	  setup(){
		  const store = useStore()
		  onMounted(() => {
			  store.dispatch('categoryList')
			  store.dispatch('getFloorList')
		  })
	  }
	}
</script>

<style>
	
</style>
