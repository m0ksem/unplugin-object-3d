declare module '*.obj?three' {
  const mesh: import('three').Group
  export default mesh
}

declare module '*.glb?three' {
  const mesh: import('three').Group & {
    animationMixer: import('three').AnimationMixer
    isLoading: boolean
    animate: () => void
  }
  export default mesh
}

declare module '*.gltf?three' {
  const mesh: import('three').Group & {
    animationMixer: import('three').AnimationMixer
    isLoading: boolean
    animate: () => void
  }
  export default mesh
}
