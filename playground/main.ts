import { AmbientLight, PerspectiveCamera, PointLight, Scene, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { createObject } from './object-loader'
import model from './house/casa.obj'

const canvas = document.createElement('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const renderer = new WebGLRenderer({ canvas })
const camera = new PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000)
camera.position.z = 6

const light = new PointLight(0xFFFFFF, 1)
light.position.y = 5

const scene = new Scene()
  .add(createObject(model))
  .add(new AmbientLight(0xFFFFFF, 0.5))
  .add(light)

const controls = new OrbitControls(camera, renderer.domElement)

const render = () => {
  requestAnimationFrame(render)
  controls.update()
  renderer.render(scene, camera)
}
render()

document.body.appendChild(canvas)
