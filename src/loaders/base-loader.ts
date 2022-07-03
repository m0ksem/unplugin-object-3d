import type { UnpluginContext } from 'unplugin'
import type { Options } from './../types'

export interface BaseLoader {
  include: (id: string) => boolean
  transform: (this: UnpluginContext, source: string, id: string, options: Options) => string
}
