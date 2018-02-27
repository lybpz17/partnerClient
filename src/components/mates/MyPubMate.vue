<template>
	<div>
		<homehead ref='homehead' v-on:loginbeanChange="loginbeanChange"/>
		<el-row :gutter="20">
	  <el-col :span="3">&nbsp;</el-col>
	  <el-col :span="3">
	  	<leftmenu ref='leftmenu'/>
	  </el-col>
	  <el-col :span="12">
	  	  <el-table
		    :data="tableData"
		    stripe
		    style="width: 100%">
		    <el-table-column
		      prop="atitle"
		      label="活动名称"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="adate"
		      label="活动时间"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="address"
		      label="活动地点">
		    </el-table-column>
		    <el-table-column
		      prop="signnum"
		      label="报名人数">
		    </el-table-column>
		    <el-table-column
		      label="操作">
		      <template slot-scope="scope">
		        <el-button
		          type="text" @click='cancelMate(scope.row)'>
		          取消结伴
		        </el-button>
		      </template>
		    </el-table-column>
		  </el-table>
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

	let thisa = null;

	export default {
		data(){
			thisa = this;
			return{
				role:0,
				tableData:[],
			};
		},
		components:{
			'homehead':Header,
			'leftmenu':LeftMenu,
			'mapgaode':MapGaode
		},
		mounted() {
	      //-----获取我发起的结伴列表-------
	      	getHttp('/restful/activity/mypubmate',function(res){
	      		let tableData = res.data;
	      		for(let data of tableData){
	      			data['adate'] = thisa.getLocalTime(parseInt(data['adate']));
	      		}
	      		thisa.tableData = tableData;
	      	});
	   },
		methods:{
			loginbeanChange:function(loginbean){
				thisa.role=loginbean.role;
				thisa.$refs.leftmenu.role = thisa.role;
			},
			getLocalTime(ns) {     
		       return new Date(ns).toLocaleString().replace(/\//g, "-");      
		    },
		    cancelMate(row){
		    	alert(row['_id']);
		    }
		}
	}
</script>