export class Utils {
	static browserRuntimeId = '';

	static getElementTitle(element: HTMLElement): string {
		const title = element.getAttribute('title');
		if (title) {
			return title;
		}
		return '';
	}

	static getElementContent(element: HTMLElement): string {
		const currContentText = element.textContent;
		if (currContentText) {
			return currContentText.trim();
		}
		return '';
	}

	static getElementLink(element: HTMLElement): string {
		let currentHref = element.getAttribute('href');
		if (currentHref) {
			if (currentHref.startsWith('http://') || currentHref.startsWith('https://')) {
				return currentHref;
			} else if (currentHref.startsWith('/')) {
				currentHref = location.origin + currentHref;
			} else {
				currentHref = location.origin + '/' + currentHref;
			}
			return currentHref;
		}
		return element.parentElement != null ? this.getElementLink(element.parentElement) : '';
	}

	static async copyText(content: string) {
		if (content) {
			await navigator.clipboard.writeText(content);
		}
	}
}
