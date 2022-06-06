import { existsSync, readFileSync } from 'fs'
import { dirname, isAbsolute, posix, resolve, sep } from 'path'

// TODO: not sure if fs can be used here

export enum FileLoaderErrorCode {
  ABSOLUTE_PATH = 1,
  ANY_OTHER = 2,
}

const toPosix = (path: string) => path.split(sep).join(posix.sep).replace(/\\/g, '/').replace(/\\\\/g, '/')

export const normalizePath = (path: string, source: string) => isAbsolute(path) ? toPosix(path) : resolve(dirname(source), toPosix(path))
/** Make sure to use `normalizePath` */
export const exists = (normalizedPath: string) => existsSync(normalizedPath)

/**
 * @param source where file loading from
 */
export const loadFile = (path: string, source: string) => {
  try {
    if (isAbsolute(path)) {
      return {
        // Force user to use relative path instead of absolute path,
        // becuase 3D programs can generate absolute path and we will not able to load it on another machine
        error: `Absolute file path detected in ${path}. Model files must use relative paths.`,
      }
    }

    const sourcePath = dirname(source)

    return {
      source: readFileSync(resolve(sourcePath, path), 'utf8'),
      path: resolve(sourcePath, path),
    }
  }
  catch (e: any) {
    return {
      error: e.message,
    }
  }
}
