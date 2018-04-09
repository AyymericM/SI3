import { store, storeActions } from './store/GameStore.js'


// Store demo

storeActions.loadStore()
store.username = "Hello World"
storeActions.saveStore()