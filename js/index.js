require('es6-promise').polyfill();

const manifests = require('../manifests');
const routing = require('./core/routing');
const ui = require('./core/ui')( manifests );

routing.start(
	require('./core/poem'),
	manifests
);