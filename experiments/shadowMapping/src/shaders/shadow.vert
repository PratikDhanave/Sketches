// basic.vert

precision highp float;
attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;
attribute vec3 aNormal;

uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;
uniform mat4 uShadowMatrix;
uniform vec3 uPosition;

varying vec2 vTextureCoord;
varying vec2 vScreenCoord;
varying vec3 vNormal;
varying vec4 vShadowCoord;

const mat4 biasMatrix = mat4( 0.5, 0.0, 0.0, 0.0,
							  0.0, 0.5, 0.0, 0.0,
							  0.0, 0.0, 0.5, 0.0,
							  0.5, 0.5, 0.5, 1.0 );

void main(void) {
	vec3 position = aVertexPosition + uPosition;
    gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(position, 1.0);
    vTextureCoord = aTextureCoord;

    vShadowCoord  = ( biasMatrix * uShadowMatrix ) * vec4(position, 1.0);;
    vNormal = aNormal;
    vScreenCoord = gl_Position.xy;
}