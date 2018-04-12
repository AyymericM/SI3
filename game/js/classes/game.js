import Sound from './sounds.js'
import Ui from './ui.js'
import { ChampStats } from '../store/ChampStore.js'
const root = document.getElementById('root')
const sound = new Sound()
const ui = new Ui()

export default class Game {
    constructor() {
        this.state = {
            name: undefined,
            keys: {},
            posX: 1,
            posY: 1,
            dir: 1,
            jumpHeight: 200,
            bulletNumber: 0,
            bullets: new Array,
            canShoot: true,
            moveRight: undefined,
            moveLeft: undefined,
            jump: undefined,
            unjump: undefined,
            oldKey: undefined,
            onPlatform: false,
            inAir: false,
            champ: undefined,
            map: undefined,
            id:0,
            isJumping: false,
            isShooting: false,
            isMovingRight: false,
            isMovingLeft: false,
            usingBall: false,
            gameOver: false
        }

        this.ball = {
          initPosX: Math.floor(Math.random()*root.offsetWidth),
          initPosY: Math.floor(Math.random()*root.offsetHeight),
          currentPosX: undefined,
          currentPosY: undefined,
          nextPosX: 0,
          nextPosY: 0,
          speed: 200,
          spawnTime: 5000 + Math.floor(Math.random()*5000),
          moving: undefined,
          ownedByP1: false,
          ownedByP2: false
        }
    }

    init() {
        this.createPlatform()
        sound.playAmbiant()
        console.log(`url(./img/maps/${this.state.map}.png);`);
        
        root.setAttribute('style', `background-image: url(/game/img/maps/${this.state.map}.png);`)
        console.log(root.style);
        
    }

    createPlatform() {
        const platform = document.createElement('div')
        const platformBody = document.createElement('div')
        const hitbox = document.createElement('div')
        platform.classList.add('platform')
        platformBody.classList.add('platformBody')
        hitbox.classList.add('platformHitBox')
        platform.setAttribute('style', `background-image: url(/game/img/sprites/${this.state.map}_base.png);`)
        platformBody.setAttribute('style', `background-image: url(/game/img/sprites/${this.state.map}_forgrnd.png);`)
        root.appendChild(platform)
        root.appendChild(hitbox)
        root.appendChild(platformBody)
    }

    selectChamp(champ) {
        this.state.champ = ChampStats[champ]
    }

    selectMap(map) {
        this.state.map = map
    }

    showSelectMenu() {
        // TODO: Afficher le menu de départ
    }

    gameOver() {
        sound.gameOver()
        ui.displayGameOver()
        this.state.gameOver = true
        console.log(this.state.name + this.state.gameOver)
    }
}
