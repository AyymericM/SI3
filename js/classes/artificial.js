import Player from './player.js'
import { ChampStats } from '../store/ChampStore.js'

const player = new Player()

export default class Artificial extends Player {
    constructor(Player) {
        super(Player)
    }

    launch() {
        setInterval(()=>{this.checkRealPlayer()},10)
    }

    checkRealPlayer(){
        let realPlayer = document.querySelector('#p1')
        let artificial = document.querySelector('#pIA')

        if ((artificial.offsetLeft+artificial.offsetWidth) < realPlayer.offsetLeft) {
            this.state.dir = 1
            this.flipRight(artificial)
        }
        else if (artificial.offsetLeft > (realPlayer.offsetLeft + realPlayer.offsetWidth)) {
            this.state.dir = 2
            this.flipLeft(artificial)
        }
    }
}
