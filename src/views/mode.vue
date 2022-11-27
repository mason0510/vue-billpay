<template>
	<div class="page">
		
		
	</div>
</template>

<script>
	import wjw_com_ts from '@/../public/common/wjw_uni/wjw_com_ts.js';

	export default {
		data() {
			return {
				search_value: '',

			};
		},



		methods: {
			...wjw_com_ts,

		    get_list() {
		        return false
		    },
		},


	}
</script>

<style scoped >
	/*padding: calc(40 / 750 * 100vw);*/
	/*background: #EEF0F4;*/
	.page{
	}
</style>