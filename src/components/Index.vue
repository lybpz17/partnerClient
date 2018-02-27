<template>
  <div>
  <homehead/>
  <el-row :gutter="20">
	  <el-col :span="3">&nbsp;</el-col>
	  <el-col :span="3">
	  	<table width="100%" style="background-color: black;color: #fff;font-size: 15px;height: 300px;" border="1">
        <tr><td>伙伴类别</td></tr>
        <tr><td>健身</td></tr>
        <tr><td>户外</td></tr>
        <tr><td>娱乐</td></tr>
        <tr><td>益智</td></tr>
        <tr><td>其他</td></tr>
      </table>
	  </el-col>
	  <el-col :span="12">
      <mapGaode v-on:geoComplete="geoComplete"/>
	  	<!-- <div id="mapcointainer">
  		</div> -->
	  </el-col>
	  <el-col :span="3">
	  	<table width="100%" style="background-color: black;color: #fff;font-size: 16px;height: 300px;" border="1">
	        <tr><td>最新推荐</td></tr>
	        <tr><td>aaaa</td></tr>
	        <tr><td>bbbb</td></tr>
	        <tr><td>cccc</td></tr>
	        <tr><td>dddd</td></tr>
	        <tr><td>eeee</td></tr>
	      </table>

	  </el-col>
	  <el-col :span="3">&nbsp;</el-col>
  </el-row>
  </div>
</template>
<script>
// import axios from 'axios';
import Header from './common/Header.vue'
import MapGaode from './common/MapGaode'
import {getHttp} from '../js/HttpServer.js'
// import { lazyAMapApiLoaderInstance } from 'vue-amap';
let thisa=null;
export default {
  data () {
    thisa = this;
    return {
    	
    }
  },
  methods:{
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
        alert(e.target.id);
    }
  },
  components:{
    'homehead':Header,
    'mapGaode':MapGaode
  },
  mounted() {
  
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
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>