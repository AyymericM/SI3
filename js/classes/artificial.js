import Player from './player.js'
import { ChampStats } from '../store/ChampStore.js'

const player = new Player()

export default class Artificial extends Player {
    constructor(Player) {
        super(Player)
    }

    launch() {
      this.moveLeft()
      console.log(this.checkEnds());
      if (this.checkEnds()) {
          this.moveRight()
      }
    }
}
