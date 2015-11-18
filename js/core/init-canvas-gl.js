const ResizeRendererFn = require('./utils/resize-renderer-fn')
const StartResizeHandler = require('./utils/resize-handler')

function handleNewPoem( app ) {

	app.canvas = document.querySelector('canvas')
	
	app.gl = (
		app.canvas.getContext('webgl') ||
		app.canvas.getContext('webgl-experimental') ||
		app.canvas.getContext('experimental-webgl')
	)
	
	if(!app.gl) { throw new Error('Unable to initialize WebGL') }
	
	const resizeRenderer = ResizeRendererFn( app, app.canvas )

	
	StartResizeHandler( app, resizeRenderer )
	
}

module.exports = handleNewPoem