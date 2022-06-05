# unplugin-3d-object

Load whole 3d object while importing .obj files
## Things to-do
- Multiple mtl lib support
- Build-in three-loader support (`import cat from 'cat.obj?three'` must return `Mesh`)
- Tree-shaking? (Convert object to esm exports)
- Tests

## Usage
- Place .obj, .mtl and textures somewhere in your project
- Import .obj file
```js
import cat from 'somewhere/cat.obj'
```
- Example usage with three.js
```js
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js'

// TODO: Ensure we can set textures so easily
const createObject = (obj, mtl, textures) => {
  const m = mtlLoader.parse(mtl, '')
  objLoader.setMaterials(m)
  objLoader.setMaterials(textures)
  return objLoader.parse(obj)
}

const cat = createObject(cat.obj, cat.mtl, cat.materials)
```

## Install

```bash
npm i unplugin-3d-object
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import loader3dObject from 'unplugin-3d-object/vite'

export default defineConfig({
  plugins: [
    loader3dObject({ /* options */ }),
  ],
})
```

Example: [`playground/`](./playground/)

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import loader3dObject from 'unplugin-3d-object/rollup'

export default {
  plugins: [
    loader3dObject({ /* options */ }),
  ],
}
```

<br></details>


<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('unplugin-3d-object/webpack')({ /* options */ })
  ]
}
```

<br></details>

<details>
<summary>Nuxt</summary><br>

```ts
// nuxt.config.js
export default {
  buildModules: [
    ['unplugin-3d-object/nuxt', { /* options */ }],
  ],
}
```

> This module works for both Nuxt 2 and [Nuxt Vite](https://github.com/nuxt/vite)

<br></details>

<details>
<summary>Vue CLI</summary><br>

```ts
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      require('unplugin-3d-object/webpack')({ /* options */ }),
    ],
  },
}
```

<br></details>
