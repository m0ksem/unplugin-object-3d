import { Group } from 'three'

export class Async3dObject extends Group {
  isLoading = true

  constructor() {
    super()
  }

  $loaded(model: Group) {
    this.add(...model.children)
    this.isLoading = false
    this.dispatchEvent({ type: 'loaded', target: this })
  }
}
