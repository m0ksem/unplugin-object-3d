import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js'
import { LoadingManager } from 'three'

const objLoader = new OBJLoader()
const loadingManager = new LoadingManager()
const mtlLoader = new MTLLoader(loadingManager)
mtlLoader.manager = loadingManager

export const createThreeObject = (model) => {
  loadingManager.setURLModifier((url) => {
    return model.mtl?.paths[url] || url
  })
  if (model.mtl) {
    const m = mtlLoader.parse(model.mtl.raw, '')
    objLoader.setMaterials(m)
  }

  return objLoader.parse(model.obj)
}
