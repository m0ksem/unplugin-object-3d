import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const gltfLoader = new GLTFLoader()

export const createThreeObjectFromGlb = (data: string) => {
  const binary = window.atob(data)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; ++i) { bytes[i] = binary.charCodeAt(i) }
  const buffer = bytes.buffer

  return new Promise((resolve) => {
    gltfLoader.parse(buffer, '', resolve)
  })
}
