import model from './model/mount.obj'

document.getElementById('app')!.innerHTML = model.mtl!

const texture = document.createElement('img')
texture.src = model.materials!.PlaneMaterial.map_Kd

document.body.appendChild(texture)
