import { ChampStats } from '../store/ChampStore.js'
let playerDOM = document.querySelector('.perso')

export default class Player {
    constructor() {
        this.state = {
            keys: {},
            posX: 1,
            posY: 1,
            dir: 1,
            bulletNumber: 0,
            bullets: new Array,
            moveRight: undefined,
            moveLeft: undefined,
            jump: undefined,
            unjump: undefined,
            oldKey: undefined,
            onPlatform: false,
            inAir: false
        }
    }

    init(){
        this.state.posX = parseInt(playerDOM.offsetLeft)
        this.state.posY = 0 
    }

    setPlayerPos(){
        playerDOM.style.bottom = this.state.posY + 'px'
        playerDOM.style.left = this.state.posX + 'px'
    }

    getNewBullet() {
        const newBullet = document.createElement('div')
        newBullet.classList.add('bullet')
        newBullet.setAttribute('id',`b${this.state.bulletNumber}`)
        if (this.state.dir === 2) {
            newBullet.style.transform = 'scaleX(-1)'
        }
        document.querySelector('.game').appendChild(newBullet)
        return document.querySelector(`#b${this.state.bulletNumber}`)
    }

    setBulletMovement(element) {
        let posXBullet = parseInt(element.offsetLeft)
        if (this.state.dir === 1) {
            let timer = setInterval(() => {
                posXBullet += 10
                if (posXBullet > window.innerWidth - element.offsetWidth) {
                    clearInterval(timer)
                    document.querySelector('.game').removeChild(element)
                } else {
                    element.style.left = posXBullet + 'px'
                }
            }, 10)
        }
        if (this.state.dir == 2) {
            let timer = setInterval(() => {
                posXBullet -= 10
                if (posXBullet < 0) {
                    clearInterval(timer)
                    document.querySelector('.game').removeChild(element)
                } else {
                    element.style.left = posXBullet + 'px'
                }
            }, 10)
        }
    }

    shoot(player) {
        const newBulletDOM = this.getNewBullet()
        this.state.bullets.push(newBulletDOM)
        const top = player.offsetHeight/6
        this.state.bullets[this.state.bulletNumber].style.top = parseInt(player.offsetTop) + top  + 'px'
        this.state.bullets[this.state.bulletNumber].style.left = parseInt(player.offsetLeft) + 'px'
        this.setBulletMovement(this.state.bullets[this.state.bulletNumber])
        this.state.bulletNumber++
    }
}
