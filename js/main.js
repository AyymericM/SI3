import { store, storeActions } from './store/GameStore.js'
import { Champions } from './classes/index.js'

// class demo

const champion = new Champions()
console.log(champion.test())

// Store demo

storeActions.loadStore()
store.username = "Hello World"
storeActions.saveStore()
