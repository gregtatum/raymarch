var PoemMenu = require('poem-menu')
var ManifestToPoem = require('./manifest-to-poem')


module.exports = function startUI( manifests ) {
	
	var poem

	ManifestToPoem.emitter.on( 'load', function( e ) {
		poem = e.graph
	})
	
	const menu = PoemMenu( manifests, {
		top: "Raymarching",
	})
	
	menu.emitter.on( 'close', () => { if( poem ) poem.start() })
	menu.emitter.on( 'open',  () => { if( poem ) poem.stop()  })
}