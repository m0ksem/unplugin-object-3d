import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { AnimationMixer, Clock } from 'three'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { Async3dObject } from './async-3d-object'

const gltfLoader = new GLTFLoader()
const clock = new Clock()

let dracoLoader: DRACOLoader | null = null

class Glb extends Async3dObject {
  animationMixer: AnimationMixer | null = null

  constructor() {
    super()
  }

  animate() {
    if (this.animationMixer) {
      this.animationMixer.update(clock.getDelta())
    }
  }
}

export const createThreeObjectFromGlb = (data: string, draco = false) => {
  const binary = window.atob(data)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; ++i) { bytes[i] = binary.charCodeAt(i) }
  const buffer = bytes.buffer

  if (draco) {
    dracoLoader = new DRACOLoader().setDecoderPath('https://raw.githubusercontent.com/google/draco/master/javascript/')
    gltfLoader.setDRACOLoader(dracoLoader)
  }

  const object = new Glb()

  object.isLoading = true

  gltfLoader.parse(buffer, '', ({ scene: model, animations }) => {
    const mixer = new AnimationMixer(model)
    animations.forEach((a) => { mixer.clipAction(a).play() })
    object.animationMixer = mixer

    object.$loaded(model)
    object.animations = animations

    object.isLoading = false
  })

  return object
}
