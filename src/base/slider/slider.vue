<template>
	<div class="slider">
		<ul class = "images" id="slider" @touchstart="touchstart($event)" @touchend="touchend($event)" @touchmove="touchmove($event)">
			<li><img src="http://p3.music.126.net/s25q2x5QyqsAzilCurD-2w==/7973658325212564.jpg" alt=""></li>
			<li><img src="http://p4.music.126.net/V9-MXz6b2MNhEKjutoDWIg==/7937374441542745.jpg" alt=""></li>
			<li><img src="http://p4.music.126.net/CTU5B9R9y3XyYBZXJUXzTg==/2897213141428023.jpg" alt=""></li>
			<li><img src="http://p4.music.126.net/tGPljf-IMOCyPvumoWLOTg==/7987951976374270.jpg" alt=""></li>
			<li><img src="http://p4.music.126.net/mp2Y2n4ueZzIj6JSnUOdtw==/7875801790676538.jpg" alt=""></li>
			<li><img src="http://p3.music.126.net/e0gGadEhjur2UuUpDF9hPg==/7788940372125389.jpg" alt=""></li>	
		</ul>
		<ul class = "bullets">
			<li :class ="{'active': index === 0}" @click="moveTo(0)"></li>
			<li :class ="{'active': index === -1}" @click="moveTo(-1)"></li>
			<li :class ="{'active': index === -2}" @click="moveTo(-2)"></li>
			<li :class ="{'active': index === -3}" @click="moveTo(-3)"></li>
			<li :class ="{'active': index === -4}" @click="moveTo(-4)"></li>
			<li :class ="{'active': index === -5}" @click="moveTo(-5)"></li>
		</ul>
</div>
</template>

<script>
export default {
	data () {
		return {
			position : 0,
			fullWidth : 0,
			index: 0,
			startX: 0,
			endX: 0,
			autoPlay: '',
			imageNumber: 0
		}
	},
	computed: {
		slider(){
			return document.getElementById('slider')
		}
	},
	methods: {
		nextPic(){
			if(Math.abs(this.position - 375) < this.fullWidth){
				this.index -= 1
				this.position = 375*this.index
			}
			else{
				this.index = 0
				this.position = 0
			}
			this.slider.style.transform = `translateX(${this.position}px)`
		},
		lastPic(){
			if( this.position < 0){
				this.index += 1
				this.position = 375*this.index
				this.slider.style.transform = `translateX(${this.position}px)`
			}
			else{
				this.index = -(this.imageNumber - 1)
				this.position = 375*this.index
				this.slider.style.transform = `translateX(${this.position}px)`
			}
		},
		moveTo(index){
			this.index = index
			this.position = 375*this.index
			this.slider.style.transform = `translateX(${this.position}px)`
		},
		touchstart(e){
			this.startX = e.touches[0].pageX
			clearInterval(this.autoPlay)			
		},
		touchend(e){
			this.endX = e.changedTouches[0].pageX
			if(this.endX > this.startX) this.lastPic()
			if(this.endX < this.startX) this.nextPic()
			this.autoPlay = setInterval( () =>{
				this.nextPic()
			}, 1000)
		},
		touchmove(e){
			// let distance =  this.position - this.startX + e.changedTouches[0].pageX		
			// console.log(distance)
			// if( (this.index === 0 && (distance > 0)) || (this.index === (this.imageNumber - 1) && (distance < 0))){
			// 	return
			// }
			// else{
			// 	this.slider.style.transform = `translateX(${distance}px)`
			// }
		}
	},
  mounted() {
		this.imageNumber = this.slider.children.length
		this.fullWidth = this.imageNumber * 375
		this.slider.style.width = this.fullWidth + 'px'
		this.autoPlay = setInterval( () =>{
			this.nextPic()
		}, 5000)
  }
};
</script>

<style scoped>
  div.slider{
    position: relative;
    width: 375px;
		height: 148px;
    overflow: hidden;
    border-radius: 6px;
		padding-top: 88px;
  }
  div.slider ul.images{
    position: absolute;
		transition: 1s all;
  }
  div.slider ul.images:after{
    content: "";
    clear: both;
    display: block;
  }
  div.slider li{
    float:left;
    width: 375px;
  }
  div.slider li img{
    width: 375px;
  }
  ul.bullets{
    position: absolute;
    bottom: 10px;
    display: flex;
    justify-content: center;
    width: 100%;
    text-align: center;
  }
  ul.bullets li{
    width: 10px;
    height: 10px;
    border-radius: 50%;
		background-color: lightgrey;
    margin-left: 10px;
  }
  ul.bullets li.active{
    background-color: #f33;
  }
</style>
