<template>
	<div class="page">

		<div class="test_iphone">750px</div>
		<div class="test_iphone2">375px</div>
		<div class="test_iphone3">100vw</div>
		<div class="test_iphone4">10rem</div>
		<button class="" @click="change_rem">转化rem基础单位</button>

	</div>
</template>

<!--  
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class test extends Vue {
	
	change_rem(){
		console.log('转化rem基础单位')
		
		// /* // 转化rem基础单位 
		(function (doc, win) {
			var docEl = doc.documentElement,
				resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
				recalc = function () {
					var clientWidth = docEl.clientWidth;
					if (!clientWidth) return;
					docEl.style.fontSize = 10 * (clientWidth / 100) + 'px';
					// if (clientWidth < 750) {
					//   docEl.style.fontSize = 200 * (clientWidth / 100) + 'px';
					//   docEl.style.fontSize = 10 * (clientWidth / 100) + 'px';
					// } else {
					//   docEl.style.fontSize = '200px';
					// }
				};
			if (!doc.addEventListener) return;
			win.addEventListener(resizeEvt, recalc, false);
			doc.addEventListener('DOMContentLoaded', recalc, false);
		})(document, window);
		// */
	}

}
</script>
-->

<script>
	export default {
		data() {
			return {
			};
		},



		methods: {
			
			change_rem(){
				console.log('转化rem基础单位');
				
				// /* // 转化rem基础单位 
				(function (doc, win) {
				    // console.log('转化rem基础单位 fn');
					var docEl = doc.documentElement,
						resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
						recalc = function () {
							var clientWidth = docEl.clientWidth;
				            // console.log('转化rem基础单位 fn clientWidth', clientWidth);
							if (!clientWidth) return;
							docEl.style.fontSize = 10 * (clientWidth / 100) + 'px';
							// if (clientWidth < 750) {
							//   docEl.style.fontSize = 200 * (clientWidth / 100) + 'px';
							//   docEl.style.fontSize = 10 * (clientWidth / 100) + 'px';
							// } else {
							//   docEl.style.fontSize = '200px';
							// }
						};
					if (!doc.addEventListener) return;
					win.addEventListener(resizeEvt, recalc, false);
                    doc.addEventListener('DOMContentLoaded', recalc, false);
                    recalc();
				})(document, window);
			},
		},


	}
</script>
<style scoped >
.test_iphone{
	width: 750px;
	height: 50px;
	background: red;
}
.test_iphone2{
	width: 375px;
	height: 50px;
	background: blue;
}
.test_iphone3{
	width: 100vw;
	height: 50px;
	background: skyblue;
}
.test_iphone4{
	width: 10rem;
	height: 50px;
	background: red;
}



</style>