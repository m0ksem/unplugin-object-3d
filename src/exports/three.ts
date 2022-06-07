import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js'
import { LoadingManager } from 'three'
import type { Obj } from './../types'

const objLoader = new OBJLoader()
const loadingManager = new LoadingManager()
const mtlLoader = new MTLLoader(loadingManager)
mtlLoader.manager = loadingManager

export const createThreeObject = (model: Obj) => {
  if (model.mtl) {
    model.mtl.forEach((mtl) => {
      loadingManager.setURLModifier((url) => {
        return mtl.paths[url] || url
      })
      const material = mtlLoader.parse(mtl.raw, '')
      objLoader.setMaterials(material)
    })
  }

  return objLoader.parse(model.obj)
}
