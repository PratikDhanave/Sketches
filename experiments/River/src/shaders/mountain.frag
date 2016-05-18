// mountain.frag
#define SHADER_NAME SIMPLE_TEXTURE

precision highp float;
varying vec2 vTextureCoord;
varying vec3 vPosition;
uniform sampler2D texture;

float fogFactorExp(float dist, float density) {
	return 1.0 - clamp(exp(-density * dist), 0.0, 1.0);
}


float fogFactorExp2(const float dist, const float density) {
  const float LOG2 = -1.442695;
  float d = density * dist;
  return 1.0 - clamp(exp2(d * d * LOG2), 0.0, 1.0);
}


#define FOG_DENSITY 0.07
const vec3 fogColor = vec3(245.0/255.0, 223.0/255.0, 212.0/255.0);

void main(void) {

	float fogDistance = gl_FragCoord.z / gl_FragCoord.w;
	float fogAmount = fogFactorExp2(fogDistance, FOG_DENSITY);

	const float MIN_Y = 0.005;
	float opacity = smoothstep(0.0, MIN_Y, abs(vPosition.y));
    vec4 color = texture2D(texture, vTextureCoord);
    // color.rgb *= fogColor;
    color.rgb = mix(color.rgb, fogColor, fogAmount);
    color *= opacity;
    color.rgb *= opacity;
    // color.rgb = vec3(fogAmount);

    gl_FragColor = color;
}