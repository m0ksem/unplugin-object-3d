# unplugin-object-3d

Simply import 3d model as ThreeJS object.

## Install

```bash
npm i unplugin-object-3d
# or
yarn add unplugin-object-3d
# or
pnpm i unplugin-object-3d
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import Object3d from 'unplugin-object-3d/vite'

export default defineConfig({
  plugins: [
    Object3d({ /* options */ }),
  ],
})
```

Example: [`playground/`](./playground/)

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import Object3d from 'unplugin-object-3d/rollup'

export default {
  plugins: [
    Object3d({ /* options */ }),
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
    require('unplugin-object-3d/webpack')({ /* options */ })
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
    ['unplugin-object-3d/nuxt', { /* options */ }],
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
      require('unplugin-object-3d/webpack')({ /* options */ }),
    ],
  },
}
```

<br></details>


## How it works?
Plugin load .obj, scan for mtl libs and trying to load them. From mtl plugin also trying to load textures. Plugin return ThreeJS Object3d.

## Example
```js
import house from 'house.obj?three'
import car from 'car.glb?three'
// ...
scene.add(house).add(car)
//...
const render = () => {
  requestAnimationFrame(render)
  // ...
  car.animate()
}
```
Example: [`playground`](./playground/main.ts)

## Plugin options

| Option | Type | Description  |
|---|---|---|
|warnings | `boolean`  | If `.obj` file require texture or mtl file that can not be found plugin will throw warning. You can turn off warnings by passing `warnings: false` in plugin options if you don't care about missing assets.    |
|draco|`boolean`| Use draco loader for GLB and GLTF models |
|   |   |   |


> Make sure change absolute paths to relative in `.obj` and `.mtl`

## Concepts and extensions

For `.glb` and `.gltf` plugin uses [`Async3dObject`](./src/exports/async-3d-object.ts). To keep your code clean async model can be added to scene. You can also listen to load event. It also adds `animate` method, so you can simply call it in render function.
```ts
scene.add(car)

const render = () => {
  car.animate()
}

car.addEventListener('loaded', () => { /* ... */ })
```
`.obj` loads synchronously.

## Types
Make sure `files.d.ts` included in your tsconfig to have TS suggestion for imports.
<details>
<summary>tsconfig.json example</summary><br>

```ts
{
  "include": ["node_modules/unplugin-3d-object/files.d.ts"],
  ...
}
```

<br></details>
