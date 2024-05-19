<template>
	<el-popover placement="top-start" title="变量" :width="400" trigger="hover">
		<template #reference>
			<el-icon><QuestionFilled /></el-icon>
		</template>
		<template #default>
			<el-row :gutter="2">
				<el-col :span="5">
					<el-text class="mx-1" type="primary"> ${title} </el-text>
				</el-col>
				<el-col :span="19">
					<span> 表示页面链接的title属性 </span>
				</el-col>
			</el-row>
			<el-row :gutter="2">
				<el-col :span="5">
					<el-text class="mx-1" type="primary"> ${content} </el-text>
				</el-col>
				<el-col :span="19">
					<span> 表示页面链接显示的内容 </span>
				</el-col>
			</el-row>
			<el-row :gutter="2">
				<el-col :span="5">
					<el-text class="mx-1" type="primary"> ${link} </el-text>
				</el-col>
				<el-col :span="19">
					<span> 表示页面链接所跳转的地址，即href属性 </span>
				</el-col>
			</el-row>
		</template>
	</el-popover>
</template>
<script setup lang="ts" name="app-link-popover">
import { QuestionFilled } from '@element-plus/icons-vue';
</script>

<style scoped></style>
