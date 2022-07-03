export const parseFileName = (fileName: string) => {
  const [path, query] = fileName.split('?')
  const [name, ext] = path.split('.')
  return { path, name, ext, query }
}
