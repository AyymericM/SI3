import { Player } from './classes/index.js';
import { Game } from './classes/index.js'

// Player movement and shooting

const player = new Player()
const game = new Game()
player.init()
game.init()

const playerDOM = document.querySelector('.perso')
const platform = document.querySelector('.platform')

window.addEventListener('keypress', (e) => {
    if (player.state.keys[e.keyCode]) {
        e.preventDefault()
    } else {
        if (e.keyCode === 122) {
            player.state.keys[122] = true
            player.jump()

        }
        if (e.keyCode === 103) {
            player.state.keys[103] = true
            player.shoot(playerDOM)
        }
    }
},false
)

window.addEventListener('keydown', (e) => {
    if ((e.keyCode != 90) && (e.keyCode!=71) && (player.state.keys[e.keyCode] || player.state.keys[player.state.oldKey] || player.state.keys[122])) {
        e.preventDefault()
    } else {
        if (e.keyCode==81) {
            player.state.keys[81]=true
            player.moveLeft()
        }
        if (e.keyCode == 68) {
            player.state.keys[68] = true
            player.moveRight()
        }

    }
    player.state.oldKey = e.keyCode
})



window.addEventListener('keyup', (e) => {
    player.state.keys[e.keyCode] = false
    if (player.state.keys[81] === false) {
        clearInterval(player.state.moveLeft)
    }
    if (player.state.keys[68] === false) {
        clearInterval(player.state.moveRight)
    }
    if (player.state.keys[90] === false) {
        player.state.keys[122] = false

    }
    if (player.state.keys[71] === false) {
        player.state.keys[103] = false
    }
})
