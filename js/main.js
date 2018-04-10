import { Player } from './classes/index.js';

// Player movement and shooting

const player = new Player()
player.init()

const playerDOM = document.querySelector('.perso')
const platform = document.querySelector('.platform')
let posYPlatform = platform.parentNode.offsetHeight - platform.offsetTop

window.addEventListener('keypress', (e) => {
    if (player.state.keys[e.keyCode]) {
        e.preventDefault()
    } else {
        if (e.keyCode === 122) {
            player.state.keys[122] = true
            if (!player.state.inAir) {
                player.state.jump = setInterval(()=>{
                    player.state.inAir = true
                    player.state.posY += 12
                    player.setPlayerPos()
                }, 10)
                setTimeout(()=>{
                    clearInterval(player.state.jump)
                    let maxY = player.state.posY
                    player.state.unjump = setInterval(()=>{
                        player.state.posY-=12
                        if (player.state.posX > (platform.offsetLeft-playerDOM.offsetWidth) && player.state.posX < (platform.offsetLeft+platform.offsetWidth)) {
                            if (maxY > posYPlatform && player.state.posY < posYPlatform) {
                                player.state.posY = posYPlatform
                                player.state.onPlatform = true
                            }
                        }
                        player.setPlayerPos()
                    },10)
                    setTimeout(()=>{
                        clearInterval(player.state.unjump)
                        player.state.inAir = false
                    },250)
                },250)
            }
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
            player.state.dir = 2
            playerDOM.style.transform = 'scaleX(-1)'
            player.state.moveLeft = setInterval(()=>{
                player.state.posX -=5
                if (player.state.posX < 0) {
                    player.state.posX = 0
                }
                if (player.state.posX < (platform.offsetLeft-playerDOM.offsetWidth) && player.state.onPlatform) {
                    let descent = setInterval(()=>{
                        player.state.posY-=2
                        if (player.state.posY<0) {
                            player.state.posY=0
                            player.state.onPlatform = false
                        }
                        player.setPlayerPos()
                        if (!player.state.onPlatform) {
                          clearInterval(descent)
                        }
                    },10)
                }
                player.setPlayerPos()
            },10)
        }
        if (e.keyCode == 68) {
            player.state.keys[68] = true
            player.state.dir = 1
            playerDOM.style.transform = 'scaleX(1)'
            player.state.moveRight = setInterval(()=>{
                player.state.posX +=5
                if (player.state.posX > (platform.offsetLeft+platform.offsetWidth) && player.state.onPlatform) {
                    let descent = setInterval(()=>{
                        player.state.posY-=2
                        if (player.state.posY<0) {
                            player.state.posY=0
                            player.state.onPlatform = false
                        }
                        player.setPlayerPos()
                        if (!player.state.onPlatform) {
                          clearInterval(descent)
                        }
                    },10)
                }
                if (player.state.posX>document.querySelector('.game').clientWidth-playerDOM.offsetWidth) {
                    player.state.posX=document.querySelector('.game').clientWidth-playerDOM.offsetWidth
                }
                player.setPlayerPos()
            },10)
            if (!player.state.onPlatform) {
              clearInterval(descent)
            }
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
