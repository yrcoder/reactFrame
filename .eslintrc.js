module.exports = {
	env: {
		browser: true,
		es6: true,
	},
	extends: 'airbnb',
	parser: 'babel-eslint',
	globals: {
		document: false,
	},
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	plugins: ['react'],
	rules: {
		'class-methods-use-this': 'off',
		'import/no-extraneous-dependencies': 'off',
		'jsx-a11y/anchor-is-valid': 'off',
		'jsx-a11y/click-events-have-key-events': 'warn',
		'jsx-a11y/no-static-element-interactions': 'warn',
		'jsx-a11y/no-noninteractive-element-interactions': 'warn',
		'no-lonely-if': 'warn',
		'no-param-reassign': 'off',
		'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
		'no-undef': 'off',
		'no-underscore-dangle': 'warn',
		'no-unused-expressions': ['error', { allowShortCircuit: true }],
		'object-curly-newline': ['warn', { ObjectPattern: { consistent: true } }],
		'react/jsx-one-expression-per-line': 'off',
		'react/no-array-index-key': 'off',
		'react/no-did-mount-set-state': 'off',
		'react/no-multi-comp': 'off',
		'react/prefer-stateless-function': 'warn',
		'react/prop-types': 'off',
		'react/destructuring-assignment': 'off',
		'react/no-access-state-in-setstate': 'off',
		'import/no-unresolved': 'off',
		camelcase: 'off',
		'no-unreachable': 'off',
		'consistent-return': 'off',
		'no-return-assign': 'off',
		indent: ['off', 4],
		'react/jsx-indent': ['off', 4],
		'react/jsx-indent-props': ['off', 4],
		'array-callback-return': 'off',
		'no-tabs': 'off',
	},
};