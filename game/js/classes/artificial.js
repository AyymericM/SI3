import Player from './player.js'
import { ChampStats } from '../store/ChampStore.js'

const player = new Player()

export default class Artificial extends Player {
    constructor(Player) {
        super(Player)
    }

    /*** Launch timers for ai ***/
    launch() {
        setInterval(()=>{this.checkRealPlayer()},10)
        setInterval(()=>{
            this.state.isMovingRight = true //Start by moving right
            setTimeout(()=>{
              this.state.isMovingRight = false //After some time move left
              this.state.isMovingLeft = true
            },2500)
            setTimeout(()=>{this.state.isMovingLeft = false},5000)
        },6000)
        setInterval(()=>{
            this.state.isShooting = true    // Shoot once in a while
            setTimeout(()=>{
                this.state.isShooting = false
            },1000)
        },3000)
        setInterval(()=>{
            this.state.isJumping = true  // Jump once in a while
            setTimeout(()=>{this.state.isJumping = false},10)
        },5000)
    }

    /***** Change shoot direction in accordance to the player position ***/
    checkRealPlayer(){
        let realPlayer = document.querySelector('#p1')
        let artificial = document.querySelector('#pIA')

        if ((artificial.offsetLeft+artificial.offsetWidth) < realPlayer.offsetLeft) {
            this.state.dir = 1
            this.flipRight(artificial) // Flip animation
        }
        else if (artificial.offsetLeft > (realPlayer.offsetLeft + realPlayer.offsetWidth)) {
            this.state.dir = 2
            this.flipLeft(artificial)
        }
    }
}
