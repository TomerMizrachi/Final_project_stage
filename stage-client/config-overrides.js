var path = require('path');
const { alias } = require('react-app-rewire-alias')

module.exports = function override(config) {
	alias({
		'@actions': path.resolve(__dirname, 'src/actions'),
		'@assets': path.resolve(__dirname, 'src/assets'),
		'@config': path.resolve(__dirname, 'src/config'),
		'@components': path.resolve(__dirname, 'src/components'),
		'@containers': path.resolve(__dirname, 'src/containers'),
		'@router': path.resolve(__dirname, 'src/router'),
	})(config)

	return config;
};
