import { store, storeActions } from './store/GameStore.js'
import { Champs } from './classes/champs.js'

// class demo

const champ = new Champs()
console.log(champ.test())

// Store demo

storeActions.loadStore()
store.username = "Hello World"
storeActions.saveStore()
