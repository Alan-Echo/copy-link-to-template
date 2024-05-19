import { contextMenus, tabs } from 'webextension-polyfill';

export default defineBackground(() => {
	contextMenus.create({
		id: browser.runtime.id,
		title: '根据模板复制',
		contexts: ['all'],
	});
	contextMenus.onClicked.addListener(function (info, tab) {
		if (info.menuItemId === browser.runtime.id) {
			tabs.sendMessage(
				Number(tab?.id),
				{
					action: `${browser.runtime.id}_getContent`,
					linkUrl: info.linkUrl,
				},
				{
					frameId: info.frameId,
				}
			).then();
		}
	});
});
