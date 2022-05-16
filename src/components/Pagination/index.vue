<template>
  <div class="pagination">
	<button :disabled="pageNo == 1" @click="emits('getPageNo',pageNo-1)">上一页</button>
    <button v-if="startNumAndEndNum.start>1" @click="emits('getPageNo',1)" :class="{active:pageNo==1}">1</button>
    <button v-if="startNumAndEndNum.start>2">···</button>
	<!-- v-for和v-if不要同时在一个标签上使用，如果有必要可以使用计算属性/template包裹一层 -->
	<template v-for="page in startNumAndEndNum.end" :key="page"><button v-if="page>=startNumAndEndNum.start" @click="emits('getPageNo',page)" :class="{active:pageNo==page}">{{page}}</button></template>
   
<!--    <button>{{startNumAndEndNum.end}}</button>
	<button v-for="(n,i) in pageSize" :key="n">{{n}}--{{i}}</button> -->
    <button v-if="startNumAndEndNum.end<totalPage - 1">···</button>
    <button v-if="startNumAndEndNum.end<totalPage" @click="emits('getPageNo',totalPage)" :class="{active:pageNo==1}">{{totalPage}}</button>
    <button :disabled="pageNo==totalPage" @click="emits('getPageNo',pageNo+1)">下一页</button>  
    <button style="margin-left: 30px">共{{totalPage}}条</button>
  </div>
</template>

<script setup>
	import {useRoute,useRouter} from 'vue-router'
	import {ref,reactive,onMounted,computed,onBeforeMount,watch} from 'vue'
	import {useStore,mapGetters} from 'vuex'
	const emits = defineEmits(['getPageNo'])
	let props = defineProps(['total','pageSize','pageNo','continues'])
	let total = ref(props.total)
	let pageSize = ref(props.pageSize)
	let pageNo = ref(props.pageNo)
	let continues = ref(props.continues)
	let totalPage = computed(()=>{
		return Math.ceil(total.value/pageSize.value)
	})
	let startNumAndEndNum = computed(()=>{
		let start = 0,end = 0
		if(continues.value>totalPage.value){
			start = 1
			end = totalPage
		}
		else{
			start = pageNo.value - parseInt(continues.value/2)
			end = pageNo.value + parseInt(continues.value/2)
		}
		// start数字为0、-1...时的情况
		if(start<1){
			start = 1
			end = continues.value
		}
		// end数字超过最大值的情况
		if(end > totalPage.value){
			end = totalPage.value
			start = totalPage.value - continues.value + 1
		}
		return {start,end}
	})
</script>

<style lang="less" scoped>
  .pagination {
	text-align: center;
	button {
	  margin: 0 5px;
	  background-color: #f4f4f5;
	  color: #606266;
	  outline: none;
	  border-radius: 2px;
	  padding: 0 4px;
	  vertical-align: top;
	  display: inline-block;
	  font-size: 13px;
	  min-width: 35.5px;
	  height: 28px;
	  line-height: 28px;
	  cursor: pointer;
	  box-sizing: border-box;
	  text-align: center;
	  border: 0;

	  &[disabled] {
		color: #c0c4cc;
		cursor: not-allowed;
	  }

	  &.active {
		cursor: not-allowed;
		background-color: #409eff;
		color: #fff;
	  }
    }
  }
  .active{
	  background-color: skyblue;
  }
</style>
