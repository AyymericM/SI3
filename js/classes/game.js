import { ChampStats } from '../store/ChampStore.js'
const root = document.getElementById('root')

export default class Game {
    constructor() {
        this.state = {
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
            id:0,
            isJumping: false,
            isShooting: false,
            isMovingRight: false,
            isMovingLeft: false
        }
    }

    init() {
        this.createPlatform()
    }

    createPlatform() {
        const platform = document.createElement('div')
        const platformBody = document.createElement('div')
        const hitbox = document.createElement('div')
        platform.classList.add('platform')
        platformBody.classList.add('platformBody')
        hitbox.classList.add('platformHitBox')
        root.appendChild(platform)
        root.appendChild(hitbox)
        root.appendChild(platformBody)
    }

    selectChamp(champ) {
        this.state.champ = ChampStats[champ]
    }

    showSelectMenu() {
        // TODO: Afficher le menu de départ
    }
}
