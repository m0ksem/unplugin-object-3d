# unplugin-3d-object

Load whole 3d object while importing .obj files.
## Things to-do
- [ ] Multiple mtl lib support;
- [ ] Parse MTL properties, not only maps;
- [x] Build-in three-loader support;
- [ ] Tests (file names, parsing, etc.);

## Install

```bash
npm i unplugin-3d-object
# or
yarn add unplugin-3d-object
# or
pnpm i unplugin-3d-object
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


## How it works?
Plugin load .obj, scan for mtl libs and trying to load them. From mtl plugin also trying to load textures. Plugin transform .obj files to [`OBJ`](./playground/main.ts) type.

### Example
```ts
import house from 'house/house.obj'
// ...
createObject(house.obj, house.mtl.toString(), house.mtl.paths)
```
### Example with three.js
```js
import house from 'house/house.obj?three'
// ...
scene.add(house)
```
Example: [`playground`](./playground/main.ts)

### Warnings
If .obj file require texture or mtl file that can not be found it will throw warning. 
> Make sure change absolute paths to relative in .obj and .mtl

You can turn off warnings by passing `warnings: false` in plugin options if you don't care about missing assets.