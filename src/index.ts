import { createUnplugin } from 'unplugin'
import type { Options } from './types'
import * as loaders from './loaders'

const defaultOptions: Options = {
  missingFileWarning: true,
}

export default createUnplugin<Options>((options = defaultOptions) => ({
  name: 'unplugin-object-3d',
  transformInclude(id) {
    return Object.values(loaders).some(l => l.include(id))
  },
  transform(source, id) {
    const loader = Object.values(loaders).find(l => l.include(id))!

    return loader.transform.call(this, source, id, options)
  },
}))
