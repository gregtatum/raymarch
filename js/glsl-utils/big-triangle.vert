precision mediump float;

attribute vec2 position;
uniform vec2 resolution;
varying vec2 uv;

void main() {
  uv = position;
  uv.x *= resolution.x / resolution.y;
  gl_Position = vec4(position, 1, 1);
}