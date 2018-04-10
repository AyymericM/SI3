export default class Game {
    constructor() {
        const tileSize = 32

        this.constants = {
            MAP: { tw: 64, th: 48 },
            TILE: tileSize,
            METER: tileSize,
            GRAVITY: tileSize * 9.8 * 6,
            MAXDX: tileSize * 20,
            MAXDY: tileSize * 60,
            ACCEL: (tileSize * 20) * 2,
            FRICTION: (tileSize * 20) * 6,
            JUMP: tileSize * 1500,
            canvas: document.getElementById('canvas'),
            width: 64 * tileSize,
            height: 48 * tileSize,
            player: {
                x: 320,
                y: 320,
                dx: 0,
                dy: 0
            }
        }

        this.constants.canvas.width = this.constants.width
        this.constants.canvas.height = this.constants.height
        this.constants.ctx = this.constants.canvas.getContext('2d')

        this.utils = {
            t2p: (t) => {
                return t * this.constants.TILE
            },
            p2t: (p) => {
                return Math.floor(p/this.constants.TILE)
            }
        }
    }

    init() {

    }

    createPlatform() {
        
    }
}
