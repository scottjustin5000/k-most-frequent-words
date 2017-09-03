class Node {
  constructor (data) {
    this.frequency = 0
    this.minHeapIndex = -1
    this.data = data
    this.is_end_of_string = false
    this.nodes = ({})
  }

  children (data) {
    if (!this.nodes.entries || !this.nodes.entries.length) this.nodes.entries = []

    for (let i = 0; i < this.nodes.entries.length; i++) {
      let n = this.nodes.entries[i]
      if (n.key && n.key === data) {
        return n.value
      }
    }
  }

  isChildExist (c) {
    return this.children(c)
  }
}
module.exports = Node
