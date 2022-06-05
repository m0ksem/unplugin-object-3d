const mtllibRegex = /^mtllib (.*)$/gm

export const parseObj = (code: string) => {
  const mtllib = code.match(mtllibRegex)

  return {
    // TODO: Obj file may use multiple mtllibs
    mtlPath: mtllib ? mtllib[0].replace('mtllib ', '').trim() : null,
  }
}
