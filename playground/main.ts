import { AmbientLight, PerspectiveCamera, PointLight, Scene, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import house from './house/house.obj?three'
import cube from './cube/cube.obj?three'
import car from './car/car.glb?three'

const canvas = document.createElement('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const renderer = new WebGLRenderer({ canvas, alpha: true })
const camera = new PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000)
const controls = new OrbitControls(camera, renderer.domElement)
const light = new PointLight(0xFFFFFF, 1)

const scene = new Scene()
  .add(new AmbientLight(0xFFFFFF, 0.5))
  .add(light)
  .add(house)
  .add(cube)
  .add(car)

camera.position.set(4, 2, 0)
light.position.set(0, 5, 0)
cube.position.set(-6, 2, -4)
car.position.set(-4, 0.6, 3)
car.scale.set(0.5, 0.5, 0.5)

const render = () => {
  requestAnimationFrame(render)
  controls.update()
  cube.rotateY(0.01)
  renderer.render(scene, camera)
  car.animate()
}
render()

document.body.appendChild(canvas)
