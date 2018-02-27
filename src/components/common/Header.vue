<template>
	<div>
	<el-row :gutter="20">
	  <el-col :span="3">&nbsp;</el-col>
	  <el-col :span="18">
	  	<table width='100%'>
	  		<tr valign="bottom">
	  			<td width="135">
				  	<img src='../../assets/imgs/logo.jpg' width="96" height="72" />
				  	伙伴
				</td>
				<td align="center" width="600">
	  	<el-input placeholder="请输入搜索词" class="input-with-select">
	    	<el-button slot="append" icon="el-icon-search"></el-button>
	  	</el-input>
	  			</td>
	  			<td align="right">
	  				 <el-button type="primary" round  @click="dialogVisible=true" v-if="loginbean==null">登陆/注册</el-button>
	           <div v-if='loginbean!=null'>
	           		<table>
	           			<tr>
	           				<td>
	                你好,{{loginbean.nicheng}}
	                		</td>
	                		<td>
	                <router-link to="/">
	                	<el-button type="text" size="medium">
	                	首页
	                	</el-button>
	            	</router-link>
	            			</td>
	            			<td>
	                <router-link to="/privateHome">
	                	<el-button type="text" size="medium">
	                	个人空间
	                	</el-button>
	            	</router-link>
	            			</td>
	            			<td>
	                <el-button type="text" size="medium" @click="logout">注销</el-button>
	                		</td>
	                	</tr>
	                </table>
	           </div>
	  			</td>
	  		</tr>
	  	</table>
	  </el-col>
	  <el-col :span="3">&nbsp;</el-col>
  </el-row>
  <!--登陆弹出框-->
  <el-dialog
  title="登陆/注册"
  :visible.sync="dialogVisible"
  width="60%"
  style='top:0px'>
	  	<login/>
    </el-dialog>
   </div>
</template>
<script>
	import {getHttp,postHttp} from '../../js/HttpServer.js'
	import Login from '../user/Login'
	let thisa=null;
	export default {
	  data () {
	    thisa = this;
	    return {
	      dialogVisible: false,
	      loginbean:null,
	    }
	  },
	  mounted() {
      //-----获取session-------
      	getHttp('/restful/user/getSession',function(res){
      		if(res.data!=null&&res.data!=''){
	            thisa.loginbean=res.data;
	            thisa.$emit('loginbeanChange',thisa.loginbean);
	        }else{
	        	thisa.$router.push('/');
	        }

      	});
	   },
	   methods:{
	   	logout:function(){
	      getHttp('/restful/user/logout',function(res){
	          thisa.loginbean=null;
	          thisa.$router.push('/');
	      })
	    },
	    login:function(form){
	      postHttp('/restful/user/login',form,function(res){
	      	  if(res.data!=null&&res.data!=''){
	      	  	thisa.loginbean = res.data;
	          	thisa.dialogVisible=false;
	          	// console.log(thisa.$router)
	          	thisa.$router.push('/privateHome');
	      	  }else{
	      	  	alert('账号/密码错误');
	      	  }
	      })
	    },
	  	register:function(form){
	  		postHttp('/restful/user/register',form,function(res){
		        alert(res.data);
		    });
	  	},
	   },
	   components:{
	   	  'login':Login,
	   }
	}
</script>
