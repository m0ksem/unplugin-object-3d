const mtllibRegex = /^mtllib (.*)$/gm

export const parseObj = (code: string) => {
  const mtllibs = code.match(mtllibRegex)

  return {
    mtlPaths: mtllibs ? mtllibs.map(mtllib => mtllib.replace('mtllib ', '').trim()) : null,
  }
}
