/** @type {import('eslint').Linter.Config} */

export default {
	root: true,
	env: { browser: true, es2020: true, node: true, commonjs: true },
	extends: [
		"eslint:recommended",
		"plugin:react/jsx-runtime",
		"plugin:react/recommended",
		"plugin:react-hooks/recommended",
		"plugin:@typescript-eslint/recommended-type-checked",
		"plugin:@typescript-eslint/stylistic-type-checked",
		"plugin:@typescript-eslint/recommended",
		"plugin:prettier/recommended",
	],
	ignorePatterns: ["dist", ".eslintrc.cjs"],
	parser: "@typescript-eslint/parser",
	plugins: ["react", "jsx-a11y", "@typescript-eslint", "react-hooks", "prettier", "react-refresh"],
	rules: {
		indent: ["error", "tab"],
		quotes: ["error", "double"],
		semi: ["error", "always"],
		"react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
		"@typescript-eslint/no-unnecessary-condition": "error",
		"@typescript-eslint/prefer-nullish-coalescing": "error",
		"@typescript-eslint/no-namespace": "off",
		"linebreak-style": ["error", "unix"],
		"react/react-in-jsx-scope": "off",
	},
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
		project: ["./tsconfig.json", "./tsconfig.node.json"],
		tsconfigRootDir: __dirname,
		ecmaFeatures: { jsx: true, impliedStrict: true },
	},
	settings: {
		react: {
			version: "detect",
			createClass: "createReactClass",
			pragma: "React",
			fragment: "Fragment",
		},
		"import/resolver": {
			node: { extensions: [".js", ".ts", ".jsx", ".tsx"] },
		},
	},
	reportUnusedDisableDirectives: true,
	overrides: [
		{
			env: { node: true },
			files: [".eslintrc.js"],
			parserOptions: { sourceType: "script" },
		},
	],
};
