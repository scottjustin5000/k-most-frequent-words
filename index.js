const Trie = require('./src/trie')

const text = 'Eulers formal education started in Basel, where he was sent to live with his maternal grandmother. In 1720, aged thirteen, he enrolled at the University of Basel, and in 1723, he received a Master of Philosophy with a dissertation that compared the philosophies of Descartes and Newton. During that time, he was receiving Saturday afternoon lessons from Johann Bernoulli, who quickly discovered his new pupils incredible talent for mathematics. At that time Eulers main studies included theology, Greek, and Hebrew at his fathers urging in order to become a pastor, but Bernoulli convinced his father that Leonhard was destined to become a great mathematician.'

let k = 5
let t = new Trie(k)
let words = text.split(' ')
for (var i = 0; i < words.length; i++) {
  t.insert(words[i].replace(/\s{2,}/g, ' '))
}

t.display()
