<template>
	<table width="100%" style="background-color: black;color: #fff;font-size: 15px;height: 300px;" border="1">
        <tr><td>
        	<router-link to="/privateHome">
	                <el-button type="text" size="medium">
        				身份认证
        			</el-button>
	        </router-link>
    	</td></tr>
        <tr v-if='role==2'><td>
        	<router-link to="/findMate">
	                <el-button type="text" size="medium">
        				发起结伴
        			</el-button>
	        </router-link>
    	</td></tr>
        <tr><td>
            <router-link to="/mypubmate">
                    <el-button type="text" size="medium">
            我发起的结伴
                    </el-button>
            </router-link>
        </td></tr>
        <tr><td>
            <router-link to="/wantJoin">
                    <el-button type="text" size="medium">
                    我想参加结伴
                    </el-button>
            </router-link>
        </td></tr>
        <tr><td>我的结伴列表</td></tr>
        <tr><td>诚信积分</td></tr>
        <tr><td>投诉</td></tr>
      </table>
</template>
<script>
	export default {
		data(){
			return {
				role:0,
			}
		}
	}
</script>