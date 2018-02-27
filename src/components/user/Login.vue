<template>
	<table width="100%">
	  		<tr>
	  			<td align="center" valign="top" style='border: 1px solid #bbbbbb'>
	  				登陆
	  				<el-form label-position="right" label-width="80px" name='loginForm'>
					  <el-form-item label="账号:">
					    <el-input name="email"></el-input>
					  </el-form-item>
					  <el-form-item label="密码:">
					    <el-input name="pwd" type='password'></el-input>
					  </el-form-item>
					  <el-form-item label="验证码:">
					    <el-input name="yzm"></el-input>
					  </el-form-item>
					  <el-form-item>
					    <el-button type="primary" @click="login">登陆</el-button>
					  </el-form-item>
					</el-form>
	  			</td>
	  			<td align="center" style='border: 1px solid #bbbbbb'>
	  				注册
	  				<el-form label-position="right" label-width="80px" name='zhuceForm'>
					  <el-form-item label="账号:">
					    <el-input name="email"></el-input>
					  </el-form-item>
					  <el-form-item label="密码:">
					    <el-input name="pwd" type='password'></el-input>
					  </el-form-item>
					  <el-form-item label="密码:">
					    <el-input name="repwd" type='password'></el-input>
					  </el-form-item>
            <el-form-item label="昵称:">
              <el-input name="nicheng"></el-input>
            </el-form-item>
					  <el-form-item>
					    <el-button type="primary" @click='register'>注册</el-button>
					  </el-form-item>
					</el-form>
	  			</td>
	  		</tr>
	  	</table>
</template>
<script>
	let thisa=null;
	export default {
		mounted(){
			thisa = this;
		},
		methods:{
			login:function(){
				thisa.$parent.$parent.login(loginForm);
			},
			register:function(){
				if(zhuceForm.email.value==''){
					alert('账号不允许空');
					return;
				}
				if(zhuceForm.pwd.value==''){
					alert('密码不允许空');
					return;
				}
				if(zhuceForm.nicheng.value==''){
					alert('昵称不允许空');
					return;
				}
				
				thisa.$parent.$parent.register(zhuceForm);
			}
		}
	}
</script>