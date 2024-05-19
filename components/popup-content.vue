<template>
	<div class="app-container">
		<el-form label-width="auto" :model="pluginConfig" style="max-width: 600px">
			<el-form-item label="Name">
				<template #label>
					<div class="form-item-label">
						<span>模式</span>
						<app-link-popover />
					</div>
				</template>
				<el-select
					v-model="pluginConfig.model"
					@change="modelChangeHandler"
					placeholder="请选择链接模式"
					style="width: 240px"
				>
					<el-option v-for="item in modelList" :key="item.value" :label="item.label" :value="item.value" />
				</el-select>
			</el-form-item>
			<el-form-item label="模板">
				<el-input
					v-model="pluginConfig.template"
					:disabled="pluginConfig.disabled"
					@change="templateChange"
					placeholder="请输入复制的模板"
					type="textarea"
					resize="none"
					rows="4"
				/>
			</el-form-item>
		</el-form>
	</div>
</template>

<script lang="ts" setup>
import { storage } from 'wxt/storage';
import { onMounted, ref } from 'vue';
import AppLinkPopover from '@/components/components/app-link-popover.vue';
import { Env } from '@/utils/env';
import { PluginConfig } from '@/model/pluginConfig';

const pluginConfig = ref<PluginConfig>(new PluginConfig());
const modelList = [
	{
		label: 'Markdown',
		value: 'Markdown',
		disabled: true,
		template: '[${content}](${link})',
	},
	{
		label: '自定义',
		value: 'Custom',
		disabled: false,
		template: '',
	},
];

onMounted(() => {
	initAppConfig();
});

const initAppConfig = async () => {
	try {
		const result = await storage.getItem(`local:${Env.pluginsName}`);
		console.log('result', result);
		if (result) {
			pluginConfig.value = JSON.parse(String(result));
		}
		savePluginConfig();
	} catch (e) {
		console.error(`插件[${Env.pluginsName}]数据初始化失败`, e);
	}
};

const modelChangeHandler = () => {
	const configs: any[] = modelList.filter(item => item.value === pluginConfig.value.model);
	if (configs.length > 0) {
		const config = configs[0];
		pluginConfig.value.template = config.template;
		pluginConfig.value.disabled = config.disabled;
		savePluginConfig();
	}
};

const templateChange = () => {
	savePluginConfig();
};

const savePluginConfig = () => {
	storage.setItem(`local:${Env.pluginsName}`, JSON.stringify(pluginConfig.value)).then();
};
</script>

<style scoped lang="css">
.form-item-label {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
