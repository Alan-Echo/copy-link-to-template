import { defineConfig } from 'wxt';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';

// See https://wxt.dev/api/config.html
export default defineConfig({
	imports: {
		addons: {
			vueTemplate: true,
		},
	},
	manifest: {
		permissions: ['storage', 'contextMenus', 'tabs'],
	},
	vite: () => ({
		plugins: [vue(), eslintPlugin()],
		build: {
			// Enabling sourcemaps with Vue during development is known to cause problems with Vue
			sourcemap: false,
		},
	}),
});
