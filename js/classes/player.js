import { ChampStats } from '../store/ChampStore.js'
<<<<<<< HEAD
let playerDOM = document.querySelector('.perso')
let platformDOM = document.querySelector('.platform')
=======
const root = document.getElementById('root')
>>>>>>> d9d73d5e64aaf971fb83f093f5c5d4e4c736a2db

export default class Player {
    constructor() {
        this.state = {
            keys: {},
            posX: 1,
            posY: 1,
            dir: 1,
            jumpHeight: 200,
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

<<<<<<< HEAD
    init(){
        this.state.posX = parseInt(playerDOM.offsetLeft)
        this.state.posY = 0
=======
    // TODO: Player stats and stuff (spawn ok)
    init() {
        this.state.posX = parseInt(window.innerWidth / 4)
        this.state.posY = 130
        this.spawnPlayer()
>>>>>>> d9d73d5e64aaf971fb83f093f5c5d4e4c736a2db
    }

    // ok
    spawnPlayer() {
        const player = document.createElement('div')
        player.classList.add('perso')
        root.appendChild(player)
        this.setPlayerPos()
    }

    // TODO: movements relative to bottom
    setPlayerPos(player = document.querySelector('.perso')) {
        player.style.bottom = this.state.posY + 'px'
        player.style.left = this.state.posX + 'px'
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

<<<<<<< HEAD
    checkPlatform(){
        if (this.state.posX > (platformDOM.offsetLeft-playerDOM.offsetWidth) && this.state.posX < (platformDOM.offsetLeft+platformDOM.offsetWidth+playerDOM.offsetWidth)) {
          if (this.state.posY < platformDOM.parentNode.offsetHeight - platformDOM.offsetTop) {
            this.state.posY = platformDOM.parentNode.offsetHeight - platformDOM.offsetTop
            clearInterval(this.state.unjump)
          }
        }
    }

    jumpAscend(){
        this.state.inAir = true
        this.state.jump = setInterval(()=>{
            this.state.posY += this.state.jumpHeight/10
            this.setPlayerPos()
        },10)
    }

    jumpDescend(){
        this.state.unjump = setInterval(()=>{
            this.checkPlatform()
            this.state.posY -=this.state.jumpHeight/10
            if (this.state.posY < 0) {
              this.state.posY = 0
              clearInterval(this.state.unjump)
            }
            this.state.inAir = false
            this.setPlayerPos()
        })
    }

    jump(){
      if (!this.state.inAir) {
        this.jumpAscend()
        setTimeout(()=>{
            clearInterval(this.state.jump)
            this.jumpDescend()
          },200)
      }
=======
    move() {

>>>>>>> d9d73d5e64aaf971fb83f093f5c5d4e4c736a2db
    }
}
