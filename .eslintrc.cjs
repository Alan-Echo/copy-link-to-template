module.exports = {
	root: true,
	env: {
		node: true,
		browser: true,
		es6: true,
	},
	parser: 'vue-eslint-parser',
	parserOptions: {
		parser: '@typescript-eslint/parser',
		ecmaVersion: 'latest',
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
	extends: [
		'plugin:vue/vue3-essential',
		'eslint:recommended',
		'@vue/eslint-config-typescript',
		'@vue/eslint-config-prettier',
	],
	rules: {
		'no-console': 'off',
		'no-debugger': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'vue/multi-word-component-names': 'off',
	},
};
