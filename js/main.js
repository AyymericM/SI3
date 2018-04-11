import { Player } from './classes/index.js';
import { Game } from './classes/index.js'
import { MagicBall } from './classes/index.js'
// Player movement and shooting

const player1 = new Player()
const player2 = new Player()
const game = new Game()
const magicBall = new MagicBall()

player1.init({
  id: 1,
  hero: 'tank'
})
player2.init({
  id: 2,
  hero: 'flash'
})
game.init()
magicBall.init()

const player1DOM = document.querySelector('#p1')
const player2DOM = document.querySelector('#p2')
const platform = document.querySelector('.platform')

/**** COMMANDES

Joueur 1 : Q-D, saut avec Z, attaque avec G
Joueur 2 : Gauche-Droite, saut avec ":", attaque avec "!"


**********/


window.addEventListener('keypress',(e)=>{press(e)})
function press(e){
  if (e.keyCode === 122  /* z */ && !player1.state.inAir) {
    player1.state.isJumping = true
  }
  if (e.keyCode === 103  /* g */) {
    player1.state.isShooting = true
  }
  if (e.keyCode === 58  /* : */ && !player2.state.inAir) {
    player2.state.isJumping = true
  }
  if (e.keyCode === 33  /* ! */) {
    player2.state.isShooting = true
  }
}

window.addEventListener('keydown',(e)=>{hold(e)})
function hold(e){
  if (e.keyCode === 68 /* d */){
    player1.state.isMovingRight = true
  }
  if (e.keyCode === 81 /* q */){
    player1.state.isMovingLeft = true
  }
  if (e.keyCode === 39 /* fleche gauche */){
    player2.state.isMovingRight = true
  }
  if (e.keyCode === 37 /* fleche droite */){
    player2.state.isMovingLeft = true
  }

}
window.addEventListener('keyup',(e)=>{release(e)})
function release(e){
  if (e.keyCode === 68 /* d */){
    player1.state.isMovingRight = false
  }
  if (e.keyCode === 81 /* q */){
    player1.state.isMovingLeft = false
  }
  if (e.keyCode === 39 /* fleche droite */){
    player2.state.isMovingRight = false
  }
  if (e.keyCode === 37 /* fleche gauche */){
    player2.state.isMovingLeft = false
  }
  if (e.keyCode === 90 /* z */) {
    player1.state.isJumping = false
  }
  if (e.keyCode === 71  /* g */) {
    player1.state.isShooting = false
  }
  if (e.keyCode === 191 || 186  /* : */) {
    
    player2.state.isJumping = false
  }
  if (e.keyCode === 223  /* ! */) {
    player2.state.isShooting = false
  }
}
function gameLoop(){
  if (player1.state.isMovingRight){
    player1.moveRight()
  }
  if (player1.state.isMovingLeft){
    player1.moveLeft()
  }
  if (player2.state.isMovingRight){
    player2.moveRight()
  }
  if (player2.state.isMovingLeft){
    player2.moveLeft()
  }
  if (player1.state.isJumping) {
    player1.jump()
  }
  if (player1.state.isShooting) {
    player1.shoot(player1DOM)
  }
  if (player2.state.isJumping) {
    player2.jump()
  }
  if (player2.state.isShooting  ) {
    player2.shoot(player2DOM)
  }

  player1.setPlayerPos()
  player2.setPlayerPos(player2DOM)
  window.requestAnimationFrame(gameLoop)
}
window.requestAnimationFrame(gameLoop)
