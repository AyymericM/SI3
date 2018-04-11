import { ChampStats } from '../store/ChampStore.js'
import Sound from './sounds.js'
import Game from './game.js'
import MagicBall from './magicBall.js'


const root = document.getElementById('root')
const game = new Game()
const sound = new Sound()
const ball = new MagicBall()

export default class Player extends Game {
    constructor(Game) {
        super(Game)
    }

    // TODO: Player stats and stuff (spawn ok)
    init(conf) {
        this.state.posX = parseInt(window.innerWidth / 4)
        this.state.posY = 0
        this.state.id = conf.id
        this.state.name = conf.hero
        // DEV CODE: A SUPPRIMER ET REMPLACER PAR LE CODE COMMENTÉ QUAND L'UI SERA FAITE
        this.state.champ = ChampStats[conf.hero]
        this.spawnPlayer()

        // if (this.state.champ !== undefined) {
        //     this.spawnPlayer()
        // } else {
        //     game.showSelectMenu()
        // }

        setInterval(() => {
            this.checkColision()
        }, 50)
    }

    spawnPlayer() {
        const player = document.createElement('div')
        player.classList.add('perso')
        player.classList.add(`${this.state.name}-static`)
        player.setAttribute('id',`p${this.state.id}`)
        root.appendChild(player)
        this.setPlayerPos()
    }

    setPlayerPos(player = document.querySelector('.perso')) {
        player.style.bottom = this.state.posY + 'px'
        player.style.left = this.state.posX + 'px'
    }

    getNewBullet() {
        const newBullet = document.createElement('div')
        if (this.state.bulletNumber%7==0 && this.state.bulletNumber!=0) {
            newBullet.classList.add('special')
        }
        else {
            newBullet.classList.add('bullet')
        }

        newBullet.setAttribute('id',`b${this.state.bulletNumber}`)
        newBullet.setAttribute('data-dmg', this.state.champ.atDmg)
        newBullet.setAttribute('data-dir', this.state.dir)

        if (this.state.dir === 1) {
            this.flipRight(newBullet)
        } else {
            this.flipLeft(newBullet)
        }

        root.appendChild(newBullet)
        sound.shoot()
        return document.querySelector(`#b${this.state.bulletNumber}`)
    }

    getAccuracy() {
        return (Math.floor(Math.random() * 10) * this.state.champ.atAccuracy) - 5
    }

    setBulletMovement(element) {
        let posXBullet = parseInt(element.offsetLeft)
        let posYBullet = parseInt(element.offsetTop)
        let bdir = parseInt(element.dataset.dir)
        let accuracy = this.getAccuracy()

        let timer = setInterval(() => {
            if (bdir === 1) {
                posXBullet += 10
            } else {
                posXBullet -= 10
            }

            if (posXBullet > window.innerWidth - element.offsetWidth || posXBullet < 0) {
                root.removeChild(element)
                let index = this.state.bullets.indexOf(element);
                if (index > -1) {
                    this.state.bullets.splice(index, 1);
                }
                clearInterval(timer)
            } else {
                element.style.left = posXBullet + 'px'
                element.style.top = (posYBullet - 10) + 'px'
            }
        }, 10)
    }

    shoot(player) {
        if (this.state.canShoot) {
            let player = document.querySelector(`#p${this.state.id}`)
            if (player.classList.contains(`${this.state.name}-move`)) {
              player.classList.remove(`${this.state.name}-move`)
            }
            if (player.classList.contains(`${this.state.name}-static`)) {
              player.classList.remove(`${this.state.name}-static`)
            }
            player.classList.add(`${this.state.name}-shoot`)
            setTimeout(()=>{
              player.classList.remove(`${this.state.name}-shoot`)
            },500)
            const newBulletDOM = this.getNewBullet()
            newBulletDOM.style.top = parseInt(player.offsetTop) + (player.offsetHeight / 6)  + 'px'
            newBulletDOM.style.left = parseInt(player.offsetLeft) + 'px'
            this.state.bullets.push(newBulletDOM)
            this.setBulletMovement(newBulletDOM)
            this.state.bulletNumber++
            this.state.canShoot = false
            setTimeout(() => {
                this.state.canShoot = true
            }, 1000 * this.state.champ.atSpeed)
        }
    }

    checkPlatformY(){
        let els = {
            hitbox: document.querySelector('.platformHitBox'),
            player: document.querySelector('.perso')
        }
        if (this.state.posX > (els.hitbox.offsetLeft-els.player.offsetWidth) && this.state.posX < (els.hitbox.offsetLeft+els.hitbox.offsetWidth)) {
            if (this.state.posY < els.hitbox.parentNode.offsetHeight - els.hitbox.offsetTop) {
                this.state.posY = els.hitbox.parentNode.offsetHeight - els.hitbox.offsetTop
                this.state.onPlatform = true
                setTimeout(()=>{
                    this.state.inAir = false
                  },200)
                clearInterval(this.state.unjump)
            }
        }
    }

    jumpAscend(){
        this.state.inAir = true
        this.state.jump = setInterval(()=>{
            this.state.posY += this.state.jumpHeight/10
            this.state.onPlatform = false
            this.setPlayerPos()
        }, 10)
    }

    jumpDescend(){
        this.state.inAir = true
        this.state.unjump = setInterval(()=>{
            this.state.posY -=this.state.jumpHeight/10
            this.checkPlatformY()
            if (this.state.posY < 0) {
                this.state.posY = 0
                setTimeout(()=>{
                    this.state.inAir = false
                  },200)
                clearInterval(this.state.unjump)
            }

            this.setPlayerPos()
        },10)
    }

    jump(){
        if (!this.state.inAir) {
            let player = document.querySelector(`#p${this.state.id}`)
            if (player.classList.contains(`${this.state.name}-move`)) {
              player.classList.remove(`${this.state.name}-move`)
            }
            if (player.classList.contains(`${this.state.name}-static`)) {
              player.classList.remove(`${this.state.name}-static`)
            }
            player.classList.add(`${this.state.name}-jump`)
            setTimeout(()=>{
              player.classList.remove(`${this.state.name}-jump`)
            },500)
            this.jumpAscend()
            sound.jump()
            setTimeout(()=>{
                clearInterval(this.state.jump)
                this.jumpDescend()
            },200)
        }
    }

    flipLeft(element){
        element.style.transform = 'scaleX(-1)'
    }

    flipRight(element){
        element.style.transform = 'scaleX(1)'
    }

    checkPlatformX(){
        let els = {
            hitbox: document.querySelector('.platformHitBox'),
            player: document.querySelector('.perso')
        }
        if ((this.state.posX<(els.hitbox.offsetLeft-els.player.offsetWidth)||this.state.posX>(els.hitbox.offsetLeft + els.hitbox.offsetWidth))&&this.state.onPlatform) {
            if (this.state.posY == els.hitbox.parentNode.offsetHeight - els.hitbox.offsetTop ) {
              this.jumpDescend()
              this.state.onPlatform = false
            }
        }
    }

    checkEnds(element){
        if (this.state.posX < 0) {
            this.state.posX = 0
        }
        if (this.state.posX>root.clientWidth-document.querySelector('.perso').offsetWidth) {
            this.state.posX=root.clientWidth-document.querySelector('.perso').offsetWidth
        }
    }

    moveLeft() {
        let player = document.querySelector(`#p${this.state.id}`)
        let staticChar = document.querySelector(`.${this.state.name}-static`)
        if (staticChar != null) {
          player.classList.remove(`${this.state.name}-static`)
        }
        player.classList.add(`${this.state.name}-move`)
        this.state.dir = 2
        this.flipLeft(player)

        this.state.posX -= 10 * this.state.champ.mvSpeed
        this.checkEnds()
        this.checkPlatformX()
        this.setPlayerPos()
    }

    moveRight(){
        let player = document.querySelector(`#p${this.state.id}`)
        let staticChar = document.querySelector(`.${this.state.name}-static`)
        if (staticChar != null) {
          player.classList.remove(`${this.state.name}-static`)
        }
        player.classList.add(`${this.state.name}-move`)
        this.state.dir = 1
        this.flipRight(document.querySelector(`#p${this.state.id}`))

        this.state.posX += 10 * this.state.champ.mvSpeed
        this.checkEnds()
        this.checkPlatformX()
        this.setPlayerPos()

    }

    static(){
        let player = document.querySelector(`#p${this.state.id}`)
        let movingChar = document.querySelector(`.${this.state.name}-move`)
        if (movingChar != null) {
          player.classList.remove(`${this.state.name}-move`)
        }
        player.classList.add(`${this.state.name}-static`)
    }

    checkColision() {
        for (let i = 0; i < this.state.bullets.length; i++) {
            let player = document.querySelector('.perso')
            let dmg = parseInt(this.state.bullets[i].dataset.dmg)
            let rightSide = parseInt(player.style.left) + player.offsetWidth
            let bulletPos = this.state.bullets[i].style.left

            if ((parseInt(bulletPos) < (parseInt(player.style.left) + player.style.offsetWidth))
                && (parseInt(bulletPos) > parseInt(player.style.left))) {
                this.setDamage(dmg)
            }
        }
    }

    setDamage(dmg) {
        //console.log('hit');

        this.state.champ.pv - dmg
        if (this.state.champ.pv <= 0) {
            // TODO: game over
            // ex: game.gameOver()
        }
    }
}
