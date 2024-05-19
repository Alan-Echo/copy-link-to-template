import { runtime } from 'webextension-polyfill';
import { Utils } from '@/utils/utils';
import { storage } from 'wxt/storage';
import { Env } from '@/utils/env';
import { PluginConfig } from '@/model/pluginConfig';

export default defineContentScript({
	matches: ['<all_urls>'],
	main() {
		// 被右键点击的元素
		let clickedElement: HTMLElement;
		// 监听右键点击事件
		document.addEventListener(
			'contextmenu',
			event => {
				clickedElement = event.target as HTMLElement;
			},
			true
		);
		runtime.onMessage.addListener(async (request, sender, sendResponse) => {
			// console.log('clickedElement', clickedElement);
			if (request.action === `${browser.runtime.id}_getContent`) {
				const result = await storage.getItem(`local:${Env.pluginsName}`);
				let pluginConfig: PluginConfig = JSON.parse(String(result));
				if (!pluginConfig) {
					pluginConfig = {
						model: 'Markdown',
						disabled: true,
						template: '[${content}](${link})',
					};
				}
				let templateContent = pluginConfig.template;
				if (!templateContent || templateContent.length === 0) {
					templateContent = '[${content}](${link})';
				}
				if (templateContent.indexOf('${title}') > -1) {
					templateContent = templateContent.replaceAll('${title}', Utils.getElementTitle(clickedElement));
				}
				if (templateContent.indexOf('${content}') > -1) {
					templateContent = templateContent.replaceAll('${content}', Utils.getElementContent(clickedElement));
				}
				if (templateContent.indexOf('${link}') > -1) {
					templateContent = templateContent.replaceAll('${link}', Utils.getElementLink(clickedElement));
				}
				// 发送链接文本作为响应
				// sendResponse({ content: templateContent });
				await Utils.copyText(templateContent);
			}
		});
	},
});
