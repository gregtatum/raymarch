const glslify = require('glslify')
const CreateShader = require('gl-shader')
const CreateTriangle = require('gl-big-triangle')

const vertSource = glslify( __dirname + '/../../glsl-utils/big-triangle.vert')
const fragSource = glslify( __dirname + '/light-flicks.frag')

module.exports = function raymarchSphere( app, props ) {
	
	const triangle = CreateTriangle( app.gl )
	const shader = CreateShader( app.gl, vertSource, fragSource )
 
	app.on('draw',function(e) {
		
		shader.bind()
		shader.uniforms.resolution = [ app.width, app.height ]
		shader.uniforms.time = e.elapsed / 1000
		triangle.bind()
		triangle.draw()
	})
}