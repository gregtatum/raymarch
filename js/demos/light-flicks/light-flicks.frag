precision mediump float;

varying vec2 uv;
uniform float time;

float sdfDots(vec3 p);
float sdfSmallLightFlicks(vec3 p);

#pragma glslify: march = require('../../glsl-utils/march.glsl', map = sdfDots)
#pragma glslify: march2 = require('../../glsl-utils/march2.glsl', map = sdfSmallLightFlicks)
#pragma glslify: noise = require(glsl-noise/simplex/4d) 

float sdfDots(vec3 p) {
	vec3 q = fract(p) * 2.0 - 1.0;
	return length(q) - 0.10;
}

float sdfSmallLightFlicks(vec3 p) {
	vec3 q = fract(p) * 2.0 - 1.0;
	float theta = time + p.x + p.y + p.z;
	q.x += cos( theta * 5.0 ) * 0.2;
 	q.z += sin( theta * 5.0 ) * 0.2;
	q.x += cos( theta * 3.3 ) * 0.2;
 	q.y += sin( theta * 3.3 ) * 0.2;

	return length(q) - 0.02;
}


mat2 rotation( float amount ) {
	float theta = amount * (sin(time * 0.05) * 3.1415 + sin(time * 0.123) * 0.5);
	float s = sin(theta);
	float c = cos(theta);
	return mat2(c,-s,s,c);
}

vec3 colorDots( float dist ) {
	
	float yellow = 1.0 / (1.0 + dist * dist * dist * 0.1 );
	float blue   = 1.0 / (1.0 + dist * dist * 0.1 );
	
	return 0.9 * (vec3(1.0,1.0,0.2) * yellow + vec3(0.2,1.0,1.0) * blue);
}

vec3 colorLightFlicks( float dist ) {
	
	float brightness = 1.0 / (1.0 + dist * dist * 0.2 );
	
	return 0.9 * (vec3(0.6,0.6,1.0) * brightness);
}

void main() {
	
	float zoom = (sin( time * 0.5 ) + 2.0) * 0.5;
	vec3 origin = vec3(0,1.0,time * 0.2);
	vec3 ray = vec3(uv, zoom);
	ray.xz *= rotation(1.0);
	ray.xy *= rotation(0.2);
	float dist = march( origin, ray );
	// dist = 10000.0;
	float dist2 = march2( origin, ray);
	gl_FragColor = vec4( colorDots(dist) + colorLightFlicks(dist2), 1);
}