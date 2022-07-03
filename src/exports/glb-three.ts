import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { AnimationMixer, Clock, Group } from 'three'

const gltfLoader = new GLTFLoader()
const clock = new Clock()

export const createThreeObjectFromGlb = (data: string) => {
  const binary = window.atob(data)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; ++i) { bytes[i] = binary.charCodeAt(i) }
  const buffer = bytes.buffer

  const object = new Group()

  gltfLoader.parse(buffer, '', ({ scene: model, animations }) => {
    if (animations) {
      const mixer = new AnimationMixer(model)
      animations.forEach((a) => { mixer.clipAction(a).play() })

      object.add(...model.children)
      ;(object as any).animationMixer = mixer

      object.children[0].onBeforeRender = () => {
        mixer.update(clock.getDelta())
      }
    }
  })

  return object
}
