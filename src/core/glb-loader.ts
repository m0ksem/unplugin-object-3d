import { readFileSync } from 'fs'

export const loadGlb = (id: string) => {
  const content = readFileSync(id, { encoding: 'base64' })

  return `
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

  const gltfLoader = new GLTFLoader()

  const createThreeObjectFromGlb = () => {
    const binary = window.atob('${content}');
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; ++i) { bytes[i] = binary.charCodeAt(i); }
    const buffer = bytes.buffer;

    return new Promise((resolve) => {
      gltfLoader.parse(buffer, '', resolve);
    })
  }

  export default createThreeObjectFromGlb()
  `
}
