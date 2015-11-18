var CreateLoop = require('poem-loop')

function _startAfterPromisesFn( poem ) {
	
	return function() {
		var promisesUnfiltered = _.map( poem, function( component ) {
			return _.isObject( component ) ? component.promise : undefined
		})
		var promises = _.filter(promisesUnfiltered, function( component ) {
			return !_.isUndefined( component )
		})
	
		Promise.all( promises ).then(
			function() {
				poem.emitter.emit('promises')
				poem.loop.start()
			},
			console.log.bind(console)
		)
	}
}

module.exports = function createApp( manifest, loader ) {

	var loop = CreateLoop()
	var emitter = loop.emitter // Steal the emitter for the app
	
	emitter.setMaxListeners(0)

	var app = {
		loop : loop,
		start : loop.start,
		stop : loop.stop,
		emitter : emitter,
		on : emitter.on.bind(emitter),
		off : emitter.removeListener.bind(emitter),
	}
	
	require('./init-canvas-gl')( app )
	
	loader.once( 'load', _startAfterPromisesFn( app ) )
	loader.on( 'unload', function() {
		loop.stop()
		emitter.emit('destroy')
	})
	return app
}