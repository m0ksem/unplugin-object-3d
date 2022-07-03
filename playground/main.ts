import { AmbientLight, AnimationMixer, Clock, PerspectiveCamera, PointLight, Scene, WebGLRenderer } from 'three'
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

camera.position.set(4, 2, 0)
light.position.set(0, 5, 0)
cube.position.set(-6, 2, -4)

const scene = new Scene()
  .add(new AmbientLight(0xFFFFFF, 0.5))
  .add(light)
  .add(house)
  .add(cube)

const clock = new Clock()
let mixer: AnimationMixer | null = null
car.then(({ scene: model, animations }) => {
  scene.add(model)

  model.position.y = 2
  model.position.x = -4
  model.scale.set(0.5, 0.5, 0.5)
  mixer = new AnimationMixer(model)
  animations.forEach((a) => {
    mixer!.clipAction(a).play()
  })
})

const render = () => {
  requestAnimationFrame(render)
  controls.update()
  cube.rotateY(0.01)
  renderer.render(scene, camera)

  if (mixer) {
    mixer.update(clock.getDelta())
  }
}
render()

document.body.appendChild(canvas)
