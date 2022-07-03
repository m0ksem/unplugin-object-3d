declare module '*.obj?three' {
  const mesh: import('three').Object3D
  export default mesh
}

declare module '*.glb?three' {
  const mesh: import('three').Object3D & {
    animationMixer: import('three').AnimationMixer
    isLoading: boolean
    animate: () => void
  }
  export default mesh
}

declare module '*.gltf?three' {
  const mesh: import('three').Object3D & {
    animationMixer: import('three').AnimationMixer
    isLoading: boolean
    animate: () => void
  }
  export default mesh
}
