import { ChampStats } from '../store/ChampStore.js'
import Sound from './sounds.js'
import Game from './game.js'
import MagicBall from './magicBall.js'
import Ui from './ui.js'


const root = document.getElementById('root')
const game = new Game()
const sound = new Sound()
let triggerInterval = null
const ball = new MagicBall()
const ui = new Ui()

export default class Player extends Game {
    constructor(Game) {
        super(Game)
    }

    init(conf) {
        this.state.posX = parseInt(window.innerWidth / 4)
        this.state.posY = 0
        this.state.id = conf.id
        this.state.name = conf.hero
        this.state.champ = ChampStats[conf.hero]
        this.spawnPlayer()

        setInterval(() => {
            this.checkColision()
        }, 10)
        ui.displayInfos(conf.id)
    }

    spawnPlayer() {
        const player = document.createElement('div')
        const hitbox = document.createElement('div')
        player.classList.add('perso')
        player.classList.add(`${this.state.name}-static`)
        player.setAttribute('id',`p${this.state.id}`)
        player.setAttribute('data-champ', this.state.champ.name)
        player.setAttribute('data-pv', this.state.champ.pv)
        hitbox.classList.add(`${this.state.name}-hitbox`)
        root.appendChild(player)
        player.appendChild(hitbox)
        this.setPlayerPos()
    }

    setPlayerPos(player = document.querySelector(`#p${this.state.id}`)) {
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
            newBullet.classList.add(`${this.state.name}-projectile`)
        }

        newBullet.setAttribute('id',`b${this.state.bulletNumber}`)
        newBullet.setAttribute('data-dmg', this.state.champ.atDmg)
        newBullet.setAttribute('data-dir', this.state.dir)
        newBullet.setAttribute('data-author', this.state.id)
        newBullet.setAttribute('data-hit', 0)

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

                let index = this.state.bullets.indexOf(element);
                if (index > -1) {
                    this.state.bullets.splice(index, 1);
                }
                clearInterval(timer)
                root.removeChild(element)
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

    checkEnds(){
        let hitbox = document.querySelector(`.${this.state.name}-hitbox`)
        if (this.state.posX+hitbox.offsetLeft < 0) {
            this.state.posX = -hitbox.offsetLeft
        }
        if (this.state.posX+hitbox.offsetLeft>root.clientWidth-hitbox.offsetWidth) {
            this.state.posX=root.clientWidth-hitbox.offsetWidth-hitbox.offsetLeft
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
            let player1 = document.querySelector('#p1')
            let player2 = document.querySelector('#p2')
            let artificial = document.querySelector('#pIA')
            let dmg = parseInt(this.state.bullets[i].dataset.dmg)
            let rightSideP1 = parseInt(player1.style.left) + parseInt(player1.offsetWidth)
            let rightSideP2
            let rightSideIA
            if (player2 != null) {
              rightSideP2 = parseInt(player2.style.left) + parseInt(player2.offsetWidth)
            }
            if (artificial != null) {
               rightSideIA = parseInt(artificial.style.left) + parseInt(artificial.offsetWidth)
            }


            let bullet = this.state.bullets[i]

            if (parseInt(bullet.style.left) > parseInt(player1.style.left)
            && parseInt(bullet.style.left) < rightSideP1
            && bullet.offsetTop > player1.offsetTop
            && bullet.offsetTop < (player1.offsetTop + player1.offsetWidth)
            && (bullet.dataset.author == 2 || bullet.dataset.author == 'IA')) {
                if (bullet.dataset.hit == 0) {
                    this.setDamage(player1, dmg)
                    document.getElementById(bullet.id).setAttribute('data-hit', 1)
                }
            }

            if (player2 != null) {
              if (parseInt(bullet.style.left) > parseInt(player2.style.left)
              && parseInt(bullet.style.left) < rightSideP2
              && bullet.offsetTop > player2.offsetTop
              && bullet.offsetTop < (player2.offsetTop + player2.offsetWidth)
              && bullet.dataset.author == 1) {
                  if (bullet.dataset.hit == 0) {
                      this.setDamage(player2, dmg)
                      document.getElementById(bullet.id).setAttribute('data-hit', 1)
                  }
              }
            }

            if (artificial != null) {
              if (parseInt(bullet.style.left) > parseInt(artificial.style.left)
              && parseInt(bullet.style.left) < rightSideIA
              && bullet.offsetTop > artificial.offsetTop
              && bullet.offsetTop < (artificial.offsetTop + artificial.offsetWidth)
              && bullet.dataset.author == 1) {
                  if (bullet.dataset.hit == 0) {

                      this.setDamage(artificial, dmg)
                      document.getElementById(bullet.id).setAttribute('data-hit', 1)
                  }
              }
            }
        }
    }

    setDamage(el, dmg) {
        let newPV = parseInt(el.dataset.pv)
        newPV -= dmg

        if (newPV > 0) {
            el.setAttribute('data-pv', newPV)
        } else {
            el.setAttribute('data-pv', 0)
            el.classList = `perso ${el.dataset.champ}-dead`
            this.gameOver()
        }
    }

    useMagicBall(){
        let player = document.querySelector(`#p${this.state.id}`)
        let otherPlayer
        let artificial
        if (this.state.id === 1) {
            otherPlayer = document.querySelector(`#p2`)
            artificial = document.querySelector('#pIA')
        }
        else {
            otherPlayer = document.querySelector(`#p1`)
        }
        let ball = document.querySelector('.magicBall')
        if (ball != null) {
          let eventRand = Math.floor(Math.random()*3)
          if (eventRand === 2) {
              /***** SWITCH DES PV ****/
              let switchImg = document.querySelector('#switch')
              switchImg.classList.add('switch-anim')
              setTimeout(()=>{
                switchImg.classList.add('switch-anim-reverse')
              },500)
              let temp = player.dataset.pv
              let tempMax = player.dataset.champ
              if (otherPlayer != null) {
                player.setAttribute('data-pv',otherPlayer.dataset.pv)
                player.setAttribute('data-champ',otherPlayer.dataset.champ)
                otherPlayer.setAttribute('data-pv',temp)
                otherPlayer.setAttribute('data-champ',tempMax)
              }
              else if (artificial != null) {
                player.setAttribute('data-pv',artificial.dataset.pv)
                artificial.setAttribute('data-pv',temp)
                artificial.setAttribute('data-champ',tempMax)
              }

          }
          else if (eventRand === 1) {
            /***** JOUEUR A 100% PV ****/
            player.setAttribute('data-pv',this.state.champ.pv)

          }
          else {
            /**** JOUEUR A 20% PV *******/
            this.setDamage(player,0.8*player.dataset.pv)
          }

          this.removeBall()
        }

    }

    removeBall(){
        let ball = document.querySelector('.magicBall')
        if (ball != null) {
          root.removeChild(ball)
          this.ball.ownedByP1 = false
          this.ball.ownedByP2 = false
        }

    }

}
