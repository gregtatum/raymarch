float march( vec3 rayOrigin, vec3 rayDirection ) {
	
	float unitAccumulate = 0.3;
	float accumulator = 0.0;
	
	for( int i=0; i < 32; i++ ) {
		
		float dist = map( rayOrigin + rayDirection * accumulator );
		accumulator += dist * unitAccumulate;
	}
	
	return accumulator;
}

#pragma glslify: export(march)