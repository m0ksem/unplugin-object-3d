# unplugin-object-3d

Load whole 3d object while importing `.obj` files with mtllibs and textures as object or Three.js object.

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
Plugin load .obj, scan for mtl libs and trying to load them. From mtl plugin also trying to load textures. Plugin transform .obj files to [`OBJ`](./src/types.ts) type.

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
If `.obj` file require texture or mtl file that can not be found plugin will throw warning. 
> Make sure change absolute paths to relative in `.obj` and `.mtl`

You can turn off warnings by passing `warnings: false` in plugin options if you don't care about missing assets.

### Types
Make sure `obj.d.ts` included in your tsconfig.
<details>
<summary>tsconfig.json example</summary><br>

```ts
{
  "include": ["node_modules/unplugin-3d-object/obj.d.ts"],
  ...
}
```

<br></details>
