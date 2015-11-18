module.exports = function SetResizeHandler( app, resize ) {
	
	window.addEventListener('resize', resize, false)
	app.on('destroy', function() {
		window.removeEventListener('resize', resize, false)
	})
	resize()
}
