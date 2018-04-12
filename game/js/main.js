import { Player, Game, MagicBall, Sound, Ui, Artificial } from './classes/index.js';
import { keys, os } from './store/GameStore.js'
// Player movement and shooting


//CReate all objects
const player1 = new Player()
const player2 = new Player()
const game = new Game()
const magicBall = new MagicBall()
const artificial = new Artificial()
const sound = new Sound()
const ui = new Ui()


//Mute music, switch images
document.getElementById('btnMute').addEventListener('click', function() {
  sound.muteSound()
  if (sound.options.muted) {
    document.getElementById('btnMute').style.background = 'url(./img/ui/soundoff_icon.png)'
    document.getElementById('btnMute').style.backgroundSize = 'contain'
    document.getElementById('btnMute').style.backgroundRepeat = 'no-repeat'
  } else {
    document.getElementById('btnMute').style.background = 'url(./img/ui/soundon_icon.png)'
    document.getElementById('btnMute').style.backgroundSize = 'contain'
    document.getElementById('btnMute').style.backgroundRepeat = 'no-repeat'
  }
})


//Get stored value to initialize characters
if (localStorage.getItem('gameData')) {
  const gameData = JSON.parse(localStorage.getItem('gameData'))
  game.state.map = gameData.map
  if (gameData.mode == 1) {
    player1.init({
      id: 1,
      hero: gameData.skin
    })
    player2.init({
      id: 2,
      hero: getRandomPlayer()
    })
  } else {
    player1.init({
      id: 1,
      hero: gameData.skin
    })
    artificial.init({
      id: 'IA',
      hero: 'soldier'
    })
    artificial.launch()
  }
}

// get random player for player 2
function getRandomPlayer() {
  const rand = Math.floor(Math.random() * 3)
  switch (rand) {
    case 0:
      return 'sniper'
      break;
    case 1:
      return 'tank'
      break;
    case 2:
      return 'soldier'
      break;
    case 3:
      return 'soldier'
      break;
  }
}

//initialize ui, ball
game.init()
magicBall.init()
ui.init()


//get elements from DOM
const player1DOM = document.querySelector('#p1')
const player2DOM = document.querySelector('#p2')
const artificialDOM = document.querySelector('#pIA')
const platform = document.querySelector('.platform')

/**** COMMANDES

Joueur 1 : Q-D, saut avec Z, attaque avec G
Joueur 2 : Gauche-Droite, saut avec ":", attaque avec "!"


**********/
// quick fix
if (player2DOM == null) {
  player2.state.gameOver = true
}

if (artificialDOM == null) {
  artificial.state.gameOver = true
}


//Listen to keypress
window.addEventListener('keypress',(e)=>{press(e)})
function press(e){
  if (!player2.state.gameOver || !artificial.state.gameOver) { // check if game over
    if (e.keyCode === keys[os()].press.JUMP1  /* z */ && !player1.state.inAir) {
      player1.state.isJumping = true
    }
    if (e.keyCode === keys[os()].press.FIRE1  /* g */) {
      player1.state.isShooting = true
    }
    if (e.keyCode === keys[os()].press.BALL1 /* h */&& magicBall.ball.ownedByP1) {
      player1.state.usingBall = true
    }
  }

  if (!player1.state.gameOver && player2DOM != null) { //check if game over and if p2 exists
    if (e.keyCode === keys[os()].press.JUMP2 /* : */ && !player2.state.inAir) {
      player2.state.isJumping = true
    }
    if (e.keyCode === keys[os()].press.FIRE2 /* ! */) {
      player2.state.isShooting = true
    }

    if (e.keyCode === keys[os()].press.BALL2 /* ; */&& magicBall.ball.ownedByP2) {
      player2.state.usingBall = true
    }
  }

}

window.addEventListener('keydown',(e)=>{hold(e)}) //Moving
function hold(e){
  if (e.keyCode === keys[os()].down.RIGHT1 /* d */){
    player1.state.isMovingRight = true
  }
  if (e.keyCode === keys[os()].down.LEFT1 /* q */){
    player1.state.isMovingLeft = true
  }
  if (player2DOM != null) {
    if (e.keyCode === keys[os()].down.RIGHT2 /* m */){
      player2.state.isMovingRight = true
    }
    if (e.keyCode === keys[os()].down.LEFT2 /* k */){
      player2.state.isMovingLeft = true
    }
  }

}

window.addEventListener('keyup',(e)=>{release(e)})
function release(e){
  if (e.keyCode === keys[os()].up.RIGHT1 /* d */){
    player1.state.isMovingRight = false
  }
  if (e.keyCode === keys[os()].up.LEFT1 /* q */){
    player1.state.isMovingLeft = false
  }
  if (e.keyCode === keys[os()].up.JUMP1 /* z */) {
    player1.state.isJumping = false
  }
  if (e.keyCode === keys[os()].up.FIRE1  /* e */) {
    player1.state.isShooting = false
  }
  if (e.keyCode === keys[os()].up.BALL1 /* a */) {
    player1.state.usingBall = false
  }
  if (player2DOM != null) {
    if (e.keyCode === keys[os()].up.RIGHT2 /* m */){
      player2.state.isMovingRight = false
    }
    if (e.keyCode === keys[os()].up.LEFT2 /* k */){
      player2.state.isMovingLeft = false
    }
    if (e.keyCode === keys[os()].up.JUMP2  /* o */) {
      player2.state.isJumping = false
    }
    if (e.keyCode === keys[os()].up.FIRE2  /* i */) {
      player2.state.isShooting = false
    }
    if (e.keyCode === keys[os()].up.BALL2 /* p */) {
      player2.state.usingBall = false
    }
  }

}
function gameLoop(){
  if (artificialDOM != null && !player1.state.gameOver) {
    if (artificial.state.isMovingRight) {
      artificial.moveRight()
    }
    if (artificial.state.isMovingLeft) {
      artificial.moveLeft()
    }
    if (artificial.state.isShooting) {
      artificial.shoot(artificialDOM)
    }
    if (artificial.state.isJumping) {
      artificial.jump()
    }
    if (!artificial.state.isMovingLeft && !artificial.state.isMovingRight) {
      artificial.static()
    }
  }
  if (player1.state.isMovingRight){
    player1.moveRight()
  }
  if (player1.state.isMovingLeft){
    player1.moveLeft()
  }
  if (!player1.state.isMovingLeft && !player1.state.isMovingRight) {
    player1.static()
  }
  if (player1.state.isJumping) {
    player1.jump()
  }
  if (player1.state.isShooting) {
    player1.shoot(player1DOM)
  }
  if (player1.state.usingBall) {
    player1.useMagicBall()
  }
  if (player2DOM != null) {
    if (player2.state.isMovingRight){
      player2.moveRight()
    }
    if (player2.state.isMovingLeft){
      player2.moveLeft()
    }
    if (!player2.state.isMovingLeft && !player2.state.isMovingRight) {
      player2.static()
    }
    if (player2.state.isJumping) {
      player2.jump()
    }
    if (player2.state.isShooting  ) {
      player2.shoot(player2DOM)
    }

    if (player2.state.usingBall) {
      player2.useMagicBall()
    }
    player2.setPlayerPos(player2DOM)
  }


  player1.setPlayerPos()

  window.requestAnimationFrame(gameLoop)
}
window.requestAnimationFrame(gameLoop) // GOD
