module.exports = function resizeRendererFn( app, canvas ) {

	return function resizeRenderer() {
		
		const w = 0.5 * window.innerWidth * window.devicePixelRatio
		const h = 0.5 * window.innerHeight * window.devicePixelRatio

		canvas.width = w
		canvas.height = h
		app.aspectRatio = w / h
		app.gl.viewport(0, 0, w, h);
		app.width = w
		app.height = h
	}
}