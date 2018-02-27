<template>
	<div>
		<homehead ref='homehead' v-on:loginbeanChange="loginbeanChange"/>
		<el-row :gutter="20">
	  <el-col :span="3">&nbsp;</el-col>
	  <el-col :span="3">
	  	<leftmenu ref='leftmenu'/>
	  </el-col>
	  <el-col :span="12">

	  	<el-form ref="form"  name="form" label-width="80px" v-if='mapflag==0'>
		  <el-form-item label="活动名称">
		    <el-input name='atitle' v-model='form.atitle'></el-input>
		  </el-form-item>
		  <el-form-item label="活动时间">
		    <el-col :span="11">
		      <el-date-picker type="date" placeholder="选择日期" v-model='form.date' style="width: 100%;" name='adate'></el-date-picker>
		    </el-col>
		    <el-col class="line" :span="2">-</el-col>
		    <el-col :span="11">
		      <el-time-picker type="fixed-time" placeholder="选择时间" v-model='form.time' style="width: 100%;" name='atime'></el-time-picker>
		    </el-col>
		  </el-form-item>
		  <el-form-item label="活动地点">
		    <el-input name='address' v-model='form.address'></el-input>
		    <el-button type="primary" @click='markToMap'>标记在地图上</el-button>
		    <span ref='latlngStr'>经度:{{lnglat.lat}},&nbsp;纬度:{{lnglat.lng}}&nbsp;</span>
		  </el-form-item>
		  <el-form-item label="活动类别" >
		    <el-select name='atype'  placeholder="请选择活动类别" v-model='form.atype'>
		    	<el-option label="体育" value="0"></el-option>
		    	<el-option label="休闲娱乐" value="1"></el-option>
		        <el-option label="户外" value="2"></el-option>
		        <el-option label="其他" value="3"></el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label="费用">
		    <el-input name='price' value='0' v-model='form.price' ></el-input>
		  </el-form-item>
		  <el-form-item label="人数限制">
		    <el-input name='limitnum' v-model='form.limitnum' value='0'></el-input> (0表无限制)
		  </el-form-item>
		  <el-form-item label="补充信息">
		    <el-input type="textarea"  name='otherinfo' v-model='form.otherinfo' rows='6'></el-input>
		  </el-form-item>
		  
		  <el-form-item>
		  	<input type='hidden' name='lat' :value='lnglat.lat'/>
		  	<input type='hidden' name='lng' :value='lnglat.lng'/>
		    <el-button type="primary" @click="subForm">发布活动</el-button>
		  </el-form-item>
		</el-form>
		<div v-if='mapflag==1' style='text-align: center'>
			<mapgaode ref='gaodemap' v-on:mapLoad='mapLoad'/>
			<el-button type="primary" @click='back'>返回</el-button>
		</div>
	  </el-col>
	  <el-col :span="3">&nbsp;</el-col>
  </el-row>
	</div>
</template>
<script>
	import Header from '../common/Header';
	import LeftMenu from '../common/LeftMenu'
	import MapGaode from '../common/MapGaode'
	import {postHttp} from '../../js/HttpServer.js'

	let thisa = null;

	export default {
		data(){
			thisa = this;
			return{
				role:0,
				mapflag:0,
				form:{
					atitle:'',
					address:'',
					date:'',
					time:'',
					atype:'',
					price:'0',
					limitnum:'0',
					otherinfo:''
				},
				// form: {
		  //         name: '',
		  //         region: '',
		  //         date1: '',
		  //         date2: '',
		  //         delivery: false,
		  //         type: [],
		  //         resource: '',
		  //         desc: ''
		  //       },
		        marker:null,
		        lnglat:{lat:'未定',lng:'未定'}
			};
		},
		components:{
			'homehead':Header,
			'leftmenu':LeftMenu,
			'mapgaode':MapGaode
		},
		methods:{
			loginbeanChange:function(loginbean){
				thisa.role=loginbean.role;
				thisa.$refs.leftmenu.role = thisa.role;
			},
			markToMap:function(e){
				thisa.mapflag=1;
			},
			back:function(e){
				thisa.mapflag=0;
			},
			eventHandler:function(e){
				thisa.lnglat = e.lnglat;
				let map = thisa.$refs.gaodemap.map;
				if(thisa.marker==null){
					thisa.marker = new AMap.Marker({                 
						  map:map,                 
						  position:thisa.lnglat, 
						  icon:"http://webapi.amap.com/images/0.png",
					   })
					   thisa.marker.setLabel({  
			                offset: new AMap.Pixel(-18, -21),  
			                content: "活动位置"  
			           });  
					   // thisa.marker.setMap(map);
					}else{
						thisa.marker.setPosition(thisa.lnglat);
					}
			},
			mapLoad:function(map){
				var listener = AMap.event.addListener(map,"click",thisa.eventHandler);
			},
			subForm:function(e){
				if(form.lat.value=='未定'){
					alert('请定位活动地点');
					return;
				}

				postHttp('/restful/activity/pubact',form,function(res){
			        if(res.data==1){
			        	thisa.$router.push('/mypubmate');
			        }
			    });

			}
		}
	}
</script>