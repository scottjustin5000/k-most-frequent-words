const MinHeap = require('../min-heap')
const HeapNode = require('../min-heap/node')
const TrieNode = require('./node')

class Trie {
  constructor (frequency) {
    this.root = null
    this.minHeap = null
    this.root = new TrieNode(' ')
    this.minHeap = new MinHeap()
    this.minHeap.nodes = new Array(frequency)
    this.minHeap.capacity = frequency
  }

  insert (s) {
    if (s == null || s.trim().length === 0) {
      return
    }
    let current = this.root
    for (let i = 0; i < s.length; i++) {
      const c = s.charAt(i)
      if (!current.isChildExist(c)) {
        const node = new TrieNode(c)
        this.put(current.nodes, c, node)
      }
      current = current.children(c)
    }
    if (current.is_end_of_string) {
      current.frequency++
    } else {
      current.frequency = 1
      current.is_end_of_string = true
    }
    this.insertInMinHeap(s, current)
  }

  put (m, k, v) {
    if (m.entries == null) { m.entries = [] }
    for (let i = 0; i < m.entries.length; i++) {
      if (m.entries[i].key && m.entries[i].key === k) {
        m.entries[i].value = v
        return
      }
    } m.entries.push({ key: k, value: v, getKey () { return this.key }, getValue () { return this.value } })
  }

  insertInMinHeap (s, current) {
    if (current.minHeapIndex !== -1) {
      this.minHeap.nodes[current.minHeapIndex].frequency++
      this.minheapify(current.minHeapIndex)
    } else if (this.minHeap.size < this.minHeap.capacity) {
      ++this.minHeap.size
      const node = new HeapNode()
      node.word = s
      node.frequency = current.frequency
      node.node = current
      node.node.minHeapIndex = this.minHeap.size - 1
      this.minHeap.nodes[this.minHeap.size - 1] = node
      this.buildHeap()
    } else if (current.frequency > this.minHeap.nodes[0].frequency) {
      this.minHeap.nodes[0].node.minHeapIndex = -1
      this.minHeap.nodes[0].node = current
      this.minHeap.nodes[0].frequency = current.frequency
      this.minHeap.nodes[0].word = s
      current.minHeapIndex = 0
      this.minheapify(0)
    }
  }

  buildHeap () {
    for (let i = ((this.minHeap.size - 1) / 2 | 0); i >= 0; i--) {
      this.minheapify(i)
    }
  }

  search (s) {
    if (s == null || s.trim().length === 0) {
      return false
    }
    let current = this.root
    for (let i = 0; i < s.length; i++) {
      const c = s.charAt(i)
      if (!current.isChildExist(c)) {
        return false
      }
      current = current.children(c)
    }
    return current.is_end_of_string
  }

  minheapify (node) {
    const left = (node << 1) + 1
    const right = (node << 1) + 2
    let smallest = node
    if (left < this.minHeap.size && this.minHeap.nodes[smallest].frequency > this.minHeap.nodes[left].frequency) {
      smallest = left
    }
    if (right < this.minHeap.size && this.minHeap.nodes[smallest].frequency > this.minHeap.nodes[right].frequency) {
      smallest = right
    }
    if (smallest !== node) {
      const index = this.minHeap.nodes[smallest].node.minHeapIndex
      this.minHeap.nodes[smallest].node.minHeapIndex = this.minHeap.nodes[node].node.minHeapIndex
      this.minHeap.nodes[node].node.minHeapIndex = index
      const temp = this.minHeap.nodes[smallest]
      this.minHeap.nodes[smallest] = this.minHeap.nodes[node]
      this.minHeap.nodes[node] = temp
      this.minheapify(smallest)
    }
  }

  display () {
    for (let i = 0; i < this.minHeap.size; i++) {
      console.info(`word\t:\t${this.minHeap.nodes[i].word}\t\t\t\tfrequency\t:\t${this.minHeap.nodes[i].frequency}`)
    }
  }
}

module.exports = Trie
