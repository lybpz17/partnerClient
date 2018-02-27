<template>
	<div>
		<homehead ref='homehead' v-on:loginbeanChange="loginbeanChange"/>
		<el-row :gutter="20">
	  <el-col :span="3">&nbsp;</el-col>
	  <el-col :span="3">
	  	<leftmenu ref='leftmenu'/>
	  </el-col>
	  <el-col :span="12">
	  	<div v-if='flag==0' ref='mateList'>
	  		<el-form :model='form'>
		  	  <el-form-item label="显示模式">
			    <el-radio-group v-model="form.displaymode">
			      <el-radio label="地图" value='0'></el-radio>
			      <el-radio label="列表" value='1'></el-radio>
			    </el-radio-group>
			  </el-form-item>
			</el-form>
			<mapgaode v-on:geoComplete="geoComplete"/>
		</div>
		<mateinfo ref='minfo' v-if='flag==1'/>
	  </el-col>
	  <el-col :span="3">&nbsp;</el-col>
  </el-row>
	</div>
</template>
<script>
	import Header from '../common/Header';
	import LeftMenu from '../common/LeftMenu'
	import MapGaode from '../common/MapGaode'
	import {postHttp,getHttp} from '../../js/HttpServer.js'
	import MateInfo from './MateInfo'

	let thisa = null;

	export default {
		data(){
			thisa = this;
			return{
				role:0,
				form:{
					displaymode:'地图'
				},
				flag:0,
				mateid:0,
			};
		},
		components:{
			'homehead':Header,
			'leftmenu':LeftMenu,
			'mapgaode':MapGaode,
			'mateinfo':MateInfo,
		},
		mounted() {
	    },
		methods:{
			loginbeanChange:function(loginbean){
				thisa.role=loginbean.role;
				thisa.$refs.leftmenu.role = thisa.role;
			},
			geoComplete:function(map,position){
		        let url = '/restful/activity/getMates?lng='+position.getLng()+'&lat='+position.getLat();
		          getHttp(url,function(res){
		            let arr = res.data;
		            let len = arr.length;
		            for(let i=0;i<len;i++){
		                let marker = new AMap.Marker({                 
		                  map:map,                 
		                  position:new AMap.LngLat(arr[i].lng,arr[i].lat), 
		                  icon:"./static/imgs/mark_r.png",
		                  // icon:"http://webapi.amap.com/theme/v1.3/markers/n/mark_r.png"
		                 })
		                 marker.setLabel({  
		                          offset: new AMap.Pixel(-18, -21),  
		                          content: arr[i].atitle
		                 });
		                 marker.id=arr[i]['_id'];
		                 // marker.on('click', thisa.markerClick(arr[i]['_id']));
		                 AMap.event.addListener(marker,'click',thisa.markerClick);
		            }
		          });
		    },
		    markerClick:function(e){
		    	//alert(e.target.id);
		    	thisa.mateid=e.target.id;
		    	thisa.flag=1;
		    	//服务端取活动信息
		    	
		    	
		    },
		    callback:function(e){

		    }
		}
	}
</script>
<style scoped>
 .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
 </style>